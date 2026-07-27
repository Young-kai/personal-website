(function () {
  "use strict";

  var finePointer = window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!finePointer || reducedMotion) return;

  function createSpark(event) {
    if (event.button !== 0 || event.defaultPrevented) return;

    var spark = document.createElement("span");
    spark.className = "click-spark";
    spark.style.left = event.clientX + "px";
    spark.style.top = event.clientY + "px";
    spark.setAttribute("aria-hidden", "true");

    if (document.documentElement.getAttribute("data-theme") !== "dark") {
      spark.classList.add("is-on-light-surface");
    }

    for (var index = 0; index < 8; index += 1) {
      var ray = document.createElement("span");
      ray.className = "click-spark-ray";
      ray.style.setProperty("--spark-angle", (index * 45) + "deg");
      spark.appendChild(ray);
    }

    document.body.appendChild(spark);
    window.setTimeout(function () {
      spark.remove();
    }, 1140);
  }

  document.addEventListener("pointerdown", function (event) {
    if (event.pointerType === "mouse") createSpark(event);
  }, { passive: true });
}());
