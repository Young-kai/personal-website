(function () {
  "use strict";

  var root = document.documentElement;
  var toggle = document.getElementById("language-toggle");
  var STORAGE_KEY = "yy-language";

  var EN_TEXT = {
    "跳转到主要内容": "Skip to main content",
    "基本资料": "Profile",
    "工作经历": "Experience",
    "教育经历": "Education",
    "项目经历": "Projects",
    "专业技能": "Skills",
    "代表性文章": "Selected Papers",
    "完整文章列表": "Publications",
    "（IF 选取文章发表对应年份的数据）": "(IF values are taken from the corresponding publication year.)",
    "联系方式": "Contact",
    "简历下载": "Download CV",
    "杨洋": "Yang Yang",
    "这是我的学术主页，很高兴见到你！": "Welcome to my academic profile.",
    "博士后研究人员 · 超快光子学": "Postdoctoral Researcher · Ultrafast Photonics",
    "GHz光纤激光器": "GHz Fiber Lasers",
    "实时超快光学测量": "Real-time Ultrafast Optical Measurement",
    "耗散孤子动力学": "Dissipative Soliton Dynamics",
    "文章条目": "Publications",
    "一作/通讯条目": "First/Corresponding",
    "主持/核心参与项目": "Led/Core Projects",
    "基本信息": "Personal Information",
    "姓名": "Name",
    "学历": "Highest Degree",
    "博士": "Ph.D.",
    "性别": "Gender",
    "男": "Male",
    "政治面貌": "Political Affiliation",
    "中共党员": "CPC Member",
    "出生日期": "Date of Birth",
    "年龄": "Age",
    "籍贯": "Hometown",
    "重庆市开州区": "Kaizhou District, Chongqing",
    "电话": "Phone",
    "邮箱": "Email",
    "地址": "Address",
    "广州市天河区五山路": "Wushan Road, Tianhe District, Guangzhou",
    "期望岗位": "Target Positions",
    "教学/光电工程师/军队文职": "Teaching / Photonics Engineer / Civilian Defense Position",
    "关于我": "About Me",
    "2025 / 09 — 至今": "Sep 2025 — Present",
    "博士后 · 华南理工大学": "Postdoctoral Researcher · South China University of Technology",
    "物理与光电学院 · 电子科学与技术": "School of Physics and Optoelectronics · Electronic Science and Technology",
    "职称：助理研究员（中级）": "Position: Assistant Researcher (Intermediate)",
    "合作导师：韦小明 教授（青A/原国家杰青）": "Collaborating Supervisor: Prof. Xiaoming Wei (NSFC Young Scientists Fund, Category A / formerly the National Science Fund for Distinguished Young Scholars)",
    "博士 · 华南理工大学": "Ph.D. · South China University of Technology",
    "物理与光电学院 · 物理学 ｜ 理学博士": "School of Physics and Optoelectronics · Physics | Ph.D. in Science",
    "硕博连读，导师：杨中民 教授（中国工程院院士）、韦小明 教授（青A）": "Combined M.Sc.–Ph.D. program; supervisors: Prof. Zhongmin Yang (CAE Member) and Prof. Xiaoming Wei (NSFC Young Scientists Fund, Category A)",
    "2025届学院优秀博士毕业生（学院仅5个名额）": "Outstanding Ph.D. Graduate of the School, Class of 2025 (five recipients)",
    "本科 · 重庆理工大学": "B.Eng. · Chongqing University of Technology",
    "电气与电子工程学院 · 光电信息科学与工程 ｜ 工学学士": "School of Electrical and Electronic Engineering · Optoelectronic Information Science and Engineering | B.Eng.",
    "获2017年国家奖学金（学院仅5个名额）": "National Scholarship, 2017 (five recipients in the school)",
    "主要参与 / 申报的科研项目，按申报时间倒序排列。": "Research projects led or substantially contributed to, listed by application date.",
    "GHz基频锁模全光纤光频梳时频噪声特性与调控研究": "Time–Frequency Noise Characteristics and Control of GHz Fundamental Mode-Locked All-Fiber Frequency Combs",
    "评审结果待公示": "Decision Pending",
    "多维超快激光检测关键技术与装备研发": "Key Technologies and Instrumentation for Multidimensional Ultrafast-Laser Measurement",
    "进行中 · 2026/01-2028/12": "Ongoing · Jan 2026–Dec 2028",
    "时空频三域融合全场信息实时连续超快测量系统": "Real-Time Continuous Ultrafast Full-Field Measurement Across Time, Space, and Frequency",
    "已结题 · 2024/12": "Completed · Dec 2024",
    "本人角色：": "Role: ",
    "展开摘要": "Show abstract",
    "收起摘要": "Hide abstract",
    "竞赛项目": "Competition Projects",
    "国家级": "National",
    "省部级": "Provincial",
    "语言与证书": "Languages and Certifications",
    "国家计算机二级（C语言）": "National Computer Rank Examination Level 2 (C)",
    "英语 CET-6": "English CET-6",
    "编程与数据处理": "Programming and Data Processing",
    "数据处理与分析": "Data Processing and Analysis",
    "硬件": "Hardware",
    "高速数据采集": "High-Speed Data Acquisition",
    "代表性文章及其简介": "Selected Publications and Highlights",
    "中科院1区 TOP": "CAS Q1 TOP",
    "中科院1区": "CAS Q1",
    "全部 · 19": "All · 19",
    "一作 / 通讯 · 8": "First / Corresponding · 8",
    "其它 · 11": "Other · 11",
    "1区 TOP": "Q1 TOP",
    "1区": "Q1",
    "2区": "Q2",
    "3区": "Q3",
    "联系我": "Contact Me",
    "邮件联系我": "Send Me a Message",
    "您的邮箱": "Your Email",
    "留言": "Message",
    "发送留言": "Send Message",
    "小红书": "RedNote",
    "回到顶部 ↑": "Back to Top ↑",
    "切换为浅色主题": "Switch to light theme",
    "切换为深色主题": "Switch to dark theme",
    "打开菜单": "Open menu",
    "关闭菜单": "Close menu",
    "留言表单尚未接入邮件服务，请暂时通过邮箱直接联系我。": "The message form is not yet connected to an email service. Please contact me directly by email for now."
  };

  var RICH_TRANSLATIONS = {
    ".about-text": "Yang Yang holds a Ph.D. in Science and is currently a postdoctoral researcher at the School of Physics and Optoelectronics, South China University of Technology. His primary research interests are ultrafast fiber optics, parameter control, and the stable generation of mode-locked pulses. He previously contributed to one National Major Scientific Instrument Development Project; participated as the second core R&amp;D member in an application for one Guangdong Key-Area Research and Development Program project; and submitted an application to the 2026 NSFC Young Scientists Fund (Category C). He has published <strong>17 academic papers</strong> in leading journals including <em>Physical Review Letters</em>, <em>Light: Science &amp; Applications</em>, <em>Laser &amp; Photonics Reviews</em>, and <em>APL Photonics</em>, including <strong>seven</strong> as first or corresponding author.",
    ".project-card:nth-child(1) > .project-meta": "National Natural Science Foundation of China · Young Scientists Fund (Category C) &nbsp;·&nbsp; Submitted Mar 2026 &nbsp;·&nbsp; <span class=\"project-role\"><strong class=\"project-role-label\">Role:</strong> Principal Investigator</span>",
    "#project-summary-frequency-comb": "<p>Develop a theoretical model incorporating multiscale dynamic gain to clarify noise-generation mechanisms arising from the interaction between dynamic gain and collective soliton behavior. Based on space–time duality and interferometric principles, develop broadband noise-characterization techniques for GHz mode-locked pulses, validate the model, and diagnose noise sources. Combine dispersion engineering, multidimensional pump control, and extra-cavity feed-forward techniques to suppress broadband noise and regulate linewidth in GHz all-fiber frequency combs, providing theoretical and technical foundations for low-noise, highly reliable GHz-repetition-rate systems.</p>",
    ".project-card:nth-child(2) > .project-meta.mono": "Guangdong Key-Area Research and Development Program &nbsp;·&nbsp; Submitted Nov 2025 &nbsp;·&nbsp; Project Lead: Prof. Zhongmin Yang, CAE Member",
    ".project-card:nth-child(2) > .project-meta.project-role": "<strong class=\"project-role-label\">Role:</strong> Core R&amp;D member (second-ranked); lead of the subproject “Large-Dynamic-Range Real-Time Spectroscopy and Multidimensional Fusion”",
    "#project-summary-ultrafast": "<p>Address major needs for multidimensional ultrafast-laser measurement and instrumentation in advanced laser manufacturing. The project targets stable high-repetition-rate femtosecond-laser generation, high-dynamic-range real-time spectroscopy, high-resolution and high-refresh-rate spatial information acquisition, multidimensional information fusion, and system integration. Its goal is to overcome temporal, spatial, and spectral bottlenecks and deliver an integrated multidimensional ultrafast-laser instrumentation platform.</p>",
    ".project-card:nth-child(3) > .project-meta.mono": "National Natural Science Foundation of China · Major Research Instrument Development Project &nbsp;·&nbsp; Submitted Jan 2019 &nbsp;·&nbsp; Project Lead: Prof. Zhongmin Yang, CAE Member",
    ".project-card:nth-child(3) > .project-meta.project-role": "<strong class=\"project-role-label\">Role:</strong> Research developer responsible for the synchronized time–frequency ultrafast-measurement module",
    "#project-summary-three-domain": "<p>Ultrafast lasers can reproduce multiscale physical scenarios and emulate phenomena under extreme conditions in the laboratory. This project introduced a real-time continuous-imaging principle with temporal resolution ≤50&nbsp;fs, a space–time holography method for synchronized real-time acquisition of full-field information, and a high-resolution real-time spectral-imaging method with spectral resolution ≤1&nbsp;pm. It delivered a synchronized time–space–frequency ultrafast-measurement system with a refresh rate of at least two billion frames per second for laser-dynamics and detonation-physics research.</p>",
    ".award-list .award-item:nth-child(1) .award-text": "7th China International College Students’ “Internet+” Innovation and Entrepreneurship Competition, National Final · <strong>Silver Award</strong>",
    ".award-list .award-item:nth-child(2) .award-text": "17th “Challenge Cup” Guangdong College Students’ Extracurricular Academic Science and Technology Competition · <strong>First Prize</strong>",
    ".award-list .award-item:nth-child(3) .award-text": "Guangdong “Climbing Program” Key Project · Funding: CNY 60,000",
    ".feature-card:nth-child(1) .feature-desc": "A four-field coupling model for bidirectional propagation in an ultrashort linear-cavity laser was established using coupled generalized nonlinear Schrödinger equations. A complete Stokes-measurement technique was developed to characterize polarization-evolution dynamics in GHz vector optical pulses, providing approximately 0.04&nbsp;nm real-time spectral resolution.",
    ".feature-card:nth-child(2) .feature-desc": "An all-fiber time-lens technique was developed for simultaneous time- and frequency-domain measurement of GHz pulses, achieving approximately 766&nbsp;fs temporal resolution and 0.43&nbsp;nm spectral resolution. The technique captured transient phenomena in GHz mode-locked pulses and revealed how coupled gain dynamics influence collective GHz-soliton behavior.",
    ".feature-card:nth-child(3) .feature-desc": "A Mach–Zehnder interferometer combined with dispersive time stretching was used to study the real-time evolution of dynamic gain in loosely bound soliton molecules. Their continuously diverging phase evolution was then used to demonstrate a phase-encoding application.",
    ".pub-row:nth-child(18) .pub-authors": "Zhu, Z., Wang, L., Chen, X., Lin, W., <strong>Yang, Y.</strong>, Zhang, J.*, Liu, T., Wei, X.*, &amp; Yang, Z. (2024)",
    ".pub-row:nth-child(18) .pub-title": "<a href=\"https://doi.org/10.3788/AOS231583\" target=\"_blank\" rel=\"noopener noreferrer\">High-speed center-wavelength tuning and pulse reconstruction in a narrowband passively mode-locked fiber laser</a>"
  };

  var ATTRIBUTE_TRANSLATIONS = [
    [".nav-links", "aria-label", "Primary navigation"],
    [".hero-photo", "alt", "Illustrated portrait of Yang Yang"],
    [".research-topics", "aria-label", "Research interests"],
    [".research-stats", "aria-label", "Academic output statistics"],
    ["[data-stat-filter='all']", "aria-label", "View all 19 publications"],
    ["[data-stat-filter='first']", "aria-label", "View 8 first- or corresponding-author publications"],
    [".research-stats a[href='#repre_articles']", "aria-label", "View 3 selected publications"],
    [".research-stats a[href='#projects']", "aria-label", "View 3 led or core-contribution projects"],
    [".filter-row", "aria-label", "Filter publications by authorship role"]
  ];

  var originalTitle = document.title;
  var descriptionMeta = document.querySelector('meta[name="description"]');
  var originalDescription = descriptionMeta ? descriptionMeta.getAttribute("content") : "";
  var richOriginals = [];
  var textNodes = [];

  function normalize(value) {
    return value.replace(/\s+/g, " ").trim();
  }

  Object.keys(RICH_TRANSLATIONS).forEach(function (selector) {
    var element = document.querySelector(selector);
    if (!element) return;
    element.setAttribute("data-i18n-rich", "");
    richOriginals.push({ element: element, html: element.innerHTML, english: RICH_TRANSLATIONS[selector] });
  });

  var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode: function (node) {
      var parent = node.parentElement;
      if (!parent || parent.closest("script, style, [data-i18n-rich]")) return NodeFilter.FILTER_REJECT;
      return normalize(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  });

  while (walker.nextNode()) {
    var currentNode = walker.currentNode;
    textNodes.push({ node: currentNode, original: currentNode.nodeValue });
  }

  var attributeOriginals = ATTRIBUTE_TRANSLATIONS.map(function (entry) {
    var element = document.querySelector(entry[0]);
    return element ? { element: element, attribute: entry[1], original: element.getAttribute(entry[1]), english: entry[2] } : null;
  }).filter(Boolean);

  function preferredLanguage() {
    var queryLanguage = null;
    try { queryLanguage = new URL(window.location.href).searchParams.get("lang"); } catch (error) { /* invalid URL */ }
    if (queryLanguage === "en" || queryLanguage === "zh") return queryLanguage;
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "en" || stored === "zh") return stored;
    } catch (error) { /* storage unavailable */ }
    return "zh";
  }

  var currentLanguage = preferredLanguage();

  function translateTextNode(item, language) {
    if (language === "zh") {
      item.node.nodeValue = item.original;
      return;
    }
    var original = item.original;
    var key = normalize(original);
    var translated = EN_TEXT[key];
    if (!translated) return;
    var leading = original.match(/^\s*/)[0];
    var trailing = original.match(/\s*$/)[0];
    item.node.nodeValue = leading + translated + trailing;
  }

  function updateAddressBar(language) {
    try {
      var url = new URL(window.location.href);
      if (language === "en") url.searchParams.set("lang", "en");
      else url.searchParams.delete("lang");
      window.history.replaceState(null, "", url.href);
    } catch (error) { /* file URL or history unavailable */ }
  }

  function applyLanguage(language, updateUrl) {
    currentLanguage = language === "en" ? "en" : "zh";
    root.lang = currentLanguage === "en" ? "en" : "zh-CN";

    richOriginals.forEach(function (item) {
      item.element.innerHTML = currentLanguage === "en" ? item.english : item.html;
    });
    textNodes.forEach(function (item) { translateTextNode(item, currentLanguage); });
    attributeOriginals.forEach(function (item) {
      if (currentLanguage === "en") item.element.setAttribute(item.attribute, item.english);
      else if (item.original === null) item.element.removeAttribute(item.attribute);
      else item.element.setAttribute(item.attribute, item.original);
    });

    document.title = currentLanguage === "en" ? "Yang Yang · Academic Profile" : originalTitle;
    if (descriptionMeta) {
      descriptionMeta.setAttribute("content", currentLanguage === "en"
        ? "Yang Yang, postdoctoral researcher at the School of Physics and Optoelectronics, South China University of Technology. Research interests include GHz mode-locked pulses, ultrafast optical measurement, and dissipative soliton dynamics."
        : originalDescription);
    }

    if (toggle) {
      toggle.querySelector("span").textContent = currentLanguage === "en" ? "中" : "EN";
      toggle.setAttribute("aria-label", currentLanguage === "en" ? "切换至中文版" : "Switch to English");
      toggle.setAttribute("title", currentLanguage === "en" ? "中文版" : "English version");
    }

    try { localStorage.setItem(STORAGE_KEY, currentLanguage); } catch (error) { /* storage unavailable */ }
    if (updateUrl) updateAddressBar(currentLanguage);
    document.dispatchEvent(new CustomEvent("yy:languagechange", { detail: { language: currentLanguage } }));
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      applyLanguage(currentLanguage === "en" ? "zh" : "en", true);
    });
  }

  window.yyI18n = {
    get language() { return currentLanguage; },
    t: function (chinese) {
      return currentLanguage === "en" && EN_TEXT[chinese] ? EN_TEXT[chinese] : chinese;
    },
    setLanguage: function (language) { applyLanguage(language, true); }
  };

  applyLanguage(currentLanguage, false);
})();
