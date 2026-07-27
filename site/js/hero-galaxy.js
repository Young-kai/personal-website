(function () {
  "use strict";

  var root = document.documentElement;
  var hero = document.getElementById("about");
  var container = document.getElementById("about-galaxy");
  if (!hero || !container) return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var canvas = document.createElement("canvas");
  var gl = canvas.getContext("webgl", {
    alpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    premultipliedAlpha: false,
    preserveDrawingBuffer: false
  });

  container.appendChild(canvas);
  if (!gl) {
    container.classList.add("hero-galaxy--fallback");
    return;
  }

  var vertexSource = [
    "attribute vec2 aPosition;",
    "void main(){",
    "  gl_Position = vec4(aPosition, 0.0, 1.0);",
    "}"
  ].join("\n");

  var fragmentSource = [
    "precision highp float;",
    "uniform vec2 uResolution;",
    "uniform float uTime;",
    "uniform vec2 uMouse;",
    "uniform float uMouseInfluence;",
    "#define PI 3.14159265359",
    "float hash21(vec2 p){",
    "  p = fract(p * vec2(123.34, 456.21));",
    "  p += dot(p, p + 45.32);",
    "  return fract(p.x * p.y);",
    "}",
    "vec2 hash22(vec2 p){",
    "  float n = hash21(p);",
    "  return vec2(n, hash21(p + n + 17.17));",
    "}",
    "mat2 rotate2d(float angle){",
    "  float c = cos(angle);",
    "  float s = sin(angle);",
    "  return mat2(c, -s, s, c);",
    "}",
    "vec3 starLayer(vec2 uv, float layer, float time){",
    "  vec2 cell = floor(uv);",
    "  vec2 grid = fract(uv) - 0.5;",
    "  vec3 color = vec3(0.0);",
    "  for(int y = -1; y <= 1; y++){",
    "    for(int x = -1; x <= 1; x++){",
    "      vec2 offset = vec2(float(x), float(y));",
    "      vec2 id = cell + offset + layer * 71.31;",
    "      float seed = hash21(id);",
    "      vec2 position = offset + (hash22(id) - 0.5) * 0.72;",
    "      float distanceToStar = length(grid - position);",
    "      float size = mix(0.008, 0.035, seed * seed);",
    "      float core = smoothstep(size, 0.0, distanceToStar);",
    "      float glow = size * 0.085 / max(distanceToStar, 0.012);",
    "      glow *= smoothstep(0.38, 0.0, distanceToStar);",
    "      float twinkle = 0.68 + 0.32 * sin(time * (0.8 + seed * 1.7) + seed * 24.0);",
    "      vec3 starColor = vec3(1.0);",
    "      color += (core + glow * 0.38) * twinkle * starColor;",
    "    }",
    "  }",
    "  return color;",
    "}",
    "void main(){",
    "  vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y;",
    "  vec2 mouse = (uMouse * uResolution.xy - 0.5 * uResolution.xy) / uResolution.y;",
    "  vec2 delta = uv - mouse;",
    "  float mouseDistance = length(delta);",
    "  uv += normalize(delta + vec2(0.0001)) * (0.018 / (mouseDistance + 0.075)) * uMouseInfluence;",
    "  uv = rotate2d(uTime * 0.018) * uv;",
    "  vec3 color = vec3(0.0);",
    "  for(int i = 0; i < 4; i++){",
    "    float layer = float(i);",
    "    float depth = fract(layer * 0.247 + uTime * 0.012);",
    "    float scale = mix(28.0, 4.5, depth);",
    "    float fade = smoothstep(0.0, 0.18, depth) * smoothstep(1.0, 0.72, depth);",
    "    color += starLayer(uv * scale + layer * 41.7, layer, uTime) * fade;",
    "  }",
    "  float vignette = 1.0 - smoothstep(0.38, 1.05, length(uv));",
    "  color *= mix(1.35, 2.15, vignette);",
    "  float brightness = max(max(color.r, color.g), color.b);",
    "  float alpha = smoothstep(0.012, 0.16, brightness) * 0.96;",
    "  gl_FragColor = vec4(color, alpha);",
    "}"
  ].join("\n");

  var program;
  var uniforms = {};
  var frameId = 0;
  var isVisible = true;
  var isDark = root.getAttribute("data-theme") === "dark";
  var targetMouse = { x: 0.5, y: 0.5 };
  var smoothMouse = { x: 0.5, y: 0.5 };
  var targetInfluence = 0;
  var smoothInfluence = 0;

  function compile(type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      throw new Error(gl.getShaderInfoLog(shader) || "Hero galaxy shader failed to compile");
    }
    return shader;
  }

  function buildProgram() {
    var vertex = compile(gl.VERTEX_SHADER, vertexSource);
    var fragment = compile(gl.FRAGMENT_SHADER, fragmentSource);
    var nextProgram = gl.createProgram();
    gl.attachShader(nextProgram, vertex);
    gl.attachShader(nextProgram, fragment);
    gl.linkProgram(nextProgram);
    if (!gl.getProgramParameter(nextProgram, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(nextProgram) || "Hero galaxy program failed to link");
    }
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);
    return nextProgram;
  }

  function resize() {
    var rect = container.getBoundingClientRect();
    var dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    canvas.style.width = rect.width + "px";
    canvas.style.height = rect.height + "px";
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.useProgram(program);
    gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
  }

  function shouldRenderContinuously() {
    return isDark && isVisible && !document.hidden && !reduceMotion.matches;
  }

  function requestRender() {
    if (!frameId && isDark && isVisible && !document.hidden) {
      frameId = window.requestAnimationFrame(render);
    }
  }

  function cancelRender() {
    if (frameId) window.cancelAnimationFrame(frameId);
    frameId = 0;
  }

  function render(time) {
    frameId = 0;
    if (!isDark || !isVisible || document.hidden) return;

    smoothMouse.x += (targetMouse.x - smoothMouse.x) * 0.065;
    smoothMouse.y += (targetMouse.y - smoothMouse.y) * 0.065;
    smoothInfluence += (targetInfluence - smoothInfluence) * 0.085;

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform1f(uniforms.time, reduceMotion.matches ? 0 : time * 0.001);
    gl.uniform2f(uniforms.mouse, smoothMouse.x, smoothMouse.y);
    gl.uniform1f(uniforms.mouseInfluence, reduceMotion.matches ? 0 : smoothInfluence);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    if (shouldRenderContinuously()) frameId = window.requestAnimationFrame(render);
  }

  function updateThemeState() {
    isDark = root.getAttribute("data-theme") === "dark";
    targetInfluence = 0;
    if (isDark) requestRender();
    else cancelRender();
  }

  function updatePointer(event) {
    if (!isDark || event.target.closest("[data-galaxy-block]")) {
      targetInfluence = 0;
      return;
    }

    var rect = container.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    targetMouse.x = (event.clientX - rect.left) / rect.width;
    targetMouse.y = 1 - (event.clientY - rect.top) / rect.height;
    targetInfluence = targetMouse.x >= 0 && targetMouse.x <= 1 && targetMouse.y >= 0 && targetMouse.y <= 1 ? 1 : 0;
  }

  function init() {
    var buffer;
    var position;

    program = buildProgram();
    gl.useProgram(program);
    uniforms.resolution = gl.getUniformLocation(program, "uResolution");
    uniforms.time = gl.getUniformLocation(program, "uTime");
    uniforms.mouse = gl.getUniformLocation(program, "uMouse");
    uniforms.mouseInfluence = gl.getUniformLocation(program, "uMouseInfluence");

    buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    position = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);

    resize();
    updateThemeState();
  }

  hero.addEventListener("pointermove", updatePointer, { passive: true });
  hero.addEventListener("pointerleave", function () { targetInfluence = 0; }, { passive: true });
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) cancelRender();
    else requestRender();
  });
  window.addEventListener("resize", function () {
    resize();
    requestRender();
  });
  reduceMotion.addEventListener("change", requestRender);

  new MutationObserver(updateThemeState).observe(root, {
    attributes: true,
    attributeFilter: ["data-theme"]
  });

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      isVisible = entries[0] ? entries[0].isIntersecting : true;
      if (isVisible) requestRender();
      else cancelRender();
    }, { threshold: 0.01 }).observe(hero);
  }

  try {
    init();
  } catch (error) {
    cancelRender();
    container.classList.add("hero-galaxy--fallback");
    if (window.console && window.console.warn) window.console.warn(error);
  }
}());
