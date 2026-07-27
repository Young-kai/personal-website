# 杨洋个人学术主页 — Design Specification

**Prepared for:** redesign of `https://yang-yang-resume.netlify.app/`
**Method:** frontend-design skill (subject-grounded design process) + taste-skill v2 principles (brief inference → design-system mapping → dark mode protocol → redesign/audit protocol → pre-flight check)
**Source material:** `华南理工大学_杨洋简历（QR版）v2.pdf` (ground truth for content) + live audit of the current Netlify site (ground truth for what must be preserved)

---

## 0. Brief inference

**Who:** 杨洋 (Yang Yang), PhD, postdoctoral researcher (助理研究员) at South China University of Technology (华南理工大学), School of Physics and Optoelectronics. Field: ultrafast optics / GHz mode-locked fiber lasers / dissipative solitons / real-time spectral measurement. Published first-author work in *Physical Review Letters*, *Laser & Photonics Reviews*, *APL Photonics*; 19 total co-authored papers; active national/provincial grant applicant.

**Audience:** primarily other physicists, potential collaborators, PhD/postdoc search committees, funding-agency reviewers, and students in nonlinear/fiber-laser optics — a technical, citation-literate audience that will scan for affiliations, journal tiers, impact factors, and project roles before reading prose.

**Single job of the page:** let a reader verify, in under a minute, who this person is, what they've published, and what research they currently lead or contribute to — then go deeper into any one thread (a paper, a project, the CV PDF) on demand.

**Mood/direction:** the subject itself — ultrashort optical pulses, real-time spectroscopy, oscilloscope/spectrum-analyzer readouts, solitons — is unusually rich material to design from. Rather than a generic "AI slop" resume template (soft SaaS gradients, big rounded cards, one accent color everywhere), the direction is **instrumentation-grade precision**: the visual language of a lab notebook and a scope trace, not a marketing landing page. This is a legitimate, brief-specific direction, not one of the three generic clusters (warm cream + serif + terracotta / near-black + single neon accent / broadsheet newspaper) — see §5 for how it differs.

---

## 1. Content inventory — what must survive the redesign

Per requirement, **all information currently live on the site must be preserved**, and the PDF's project-experience section must be **added** (it is not currently on the site). This is the audit-first pass (taste-skill §11).

### 1.1 Sections that already exist on the live site (preserve, don't drop)

Confirmed by anchor nav + live DOM: `#about`, `#works`, `#educations`, `#skill`, `#repre_articles`, `#all_articles`, `#contact`, plus a global theme switcher and a résumé-download link. Content values for several fields are populated client-side at runtime (not visible to static fetch); the notes below flag which fields the implementer must pull from the live site's own data source (not re-guess) versus which are fully specified by the PDF.

| Section | Live anchor | Elements to preserve | Value source |
|---|---|---|---|
| Header / nav | — | Logo/name, anchor links (基本资料 / 工作经历 / 教育经历 / 专业技能 / 代表性文章及简介 / 完整文章列表 / 联系方式), theme-switch control, "简历下载" link to the PDF | existing site |
| Hero / 基本资料 | `#about` | Profile photo (`images/2.jpg` equivalent), the personal couplet/motto ("青青子衿，悠悠我心 / 但为君故，沉吟至今 / 相遇即是缘分 / 很高兴见到你!"), basic-info field list (姓名/性别/政治面貌/出生日期/年龄/电话/邮箱/地址/期望岗位), "关于我" free-text bio | motto + field **labels** confirmed live; exact values for 电话/邮箱/期望岗位/关于我 must be pulled from the site's existing data file — cross-check against PDF fields that do overlap (姓名=杨洋, 政治面貌=中共党员, 出生日期=1996/09/17, 电话=15730625521, 学历=博士, 籍贯=重庆市开州区) |
| 工作经历 | `#works` | Postdoc position at 华南理工大学 | PDF: 2025/09–至今，博士后，华南理工大学物理与光电学院，电子科学与技术；职称：助理研究员（中级）；导师：韦小明 教授（杰青） |
| 教育经历 | `#educations` | Degree history | PDF: 博士 2019/09–2025/06 华南理工大学物理与光电学院 物理学\|理学博士（硕博连读，导师杨中民院士、韦小明教授杰青，25届学院优秀博士毕业生，学院仅5个）；本科 2015/06–2019/09 重庆理工大学电气与电子工程学院 光电信息科学与工程\|工学学士（2017年国家奖学金，学院仅5个） |
| 专业技能 | `#skill` | "技能描述" free text | PDF: 国家计算机二级（C语言）、英语CET-6；熟练 Pycharm(Python)、Matlab 用于数据处理分析；FPGA（Verilog）用于高速数据采集 |
| 代表性文章及简介 | `#repre_articles` | 3 highlighted papers with abstracts | PDF: PRL 2025 "Polarization symmetry breaking of GHz dissipative solitons"; L&PR 2026 "Collective dynamics of GHz dissipative solitons"; APL Photonics 2024 "Phase-encoding of loosely bound soliton molecules" — full descriptions in §1.3 |
| 完整文章列表 | `#all_articles` | Full publication list | PDF: 8 first/corresponding-author papers + 11 other-author papers = 19 total, with journal, IF, 中科院分区 — full list in §1.3 |
| 联系我 | `#contact` | Email contact form (with honeypot anti-spam field, Send button), 电话/邮箱/地址/QQ contact block | existing site; values to be pulled from live data (do not invent phone/QQ) |
| 访问统计 | `#contact` (footer widget) | 今日访问/本周/上周/本月/上月/今年/去年/累计 counters | existing site — keep as a live visitor-counter widget |
| Footer | — | "Copyright 2020–2030 OrinYoung All Rights Reserved" template attribution | existing site — preserve verbatim; flag to the user during implementation in case they want it replaced with their own name, but do not change unilaterally |

### 1.2 New section required — 项目经历 (not currently on the site)

The PDF's **"主要参与/申报项目"** section is the project-experience content that must be added as its own page section (recommended anchor: `#projects`, nav label "项目经历"), positioned after 教育经历 and before 专业技能 — chronologically it's the natural continuation of "what I've done since my degree," and it's the strongest evidence of independent research standing, so it should not be buried.

Three project cards, in reverse-chronological order by 申报时间:

1. **GHz基频锁模全光纤光频梳时频噪声特性与调控研究**
   国家自然科学基金 青年科学基金（C类） · 申报 2026/03 · 状态：评审结果待公示 · 本人角色：申请人
   摘要：构建融合多尺度动态增益的理论模型，厘清动态增益与孤子集体行为作用下的噪声产生机制；开发适用于GHz锁模脉冲的宽带噪声表征技术；结合器件色散调控、泵浦多维参数调控及腔外前馈技术，实现GHz全光纤光频梳的宽带噪声抑制与线宽调控。

2. **多维超快激光检测关键技术与装备研发**
   广东省重点领域研发计划项目 · 申报 2025/11 · 状态：评审结果待公示 · 项目主持：杨中民 院士 · 本人角色：主要研究开发人员（排第二），子课题"大动态范围实时光谱测量及多维融合"负责人
   摘要：解决高重频飞秒激光稳定产生、高动态范围实时光谱信息获取、高分辨高刷新率空域信息获取、多维度信息融合测量与系统集成等关键技术问题。

3. **时空频三域融合全场信息实时连续超快测量系统**
   国家自然科学基金 国家重大科研仪器研制项目 · 申报 2019/01 · 状态：已结题（2025/12） · 项目主持：杨中民 院士 · 本人角色：研究开发人员（负责时频同步超快测量模块）
   摘要：提出高时间分辨率实时连续成像新原理（时域分辨率≤50fs）；提出时空全息新技术实现时空域全场信息同步测量；提出频域高分辨实时成像新技术（频域分辨率≤1pm）；系统整体刷新率≥20亿赫兹。

Each card should show: title, funding body/program badge, 申报/结题 date, status badge (评审中 / 已结题, color-coded), role, PI (if not self), and a description that's visible by default for the current/active grant and collapsible for older ones (progressive disclosure keeps the section scannable rather than a wall of text).

**Adjacent content also in the PDF but not yet on the site** — recommended as sub-content within or beside the new 项目经历 section (not mandated by the brief, but leaving it out would waste real signal already paid for by the audit):

- **竞赛项目 (awards/competitions)**: 国家级 — 第七届"互联网+"大学生创新创业大赛银奖 (2021/10)，第十七届"挑战杯"广东赛区一等奖 (2022/3)；省部级 — 广东省"攀登计划"重点计划 (2022/12，资助6万元). Suggest a compact badge/timeline strip rather than a full card grid, since these are shorter entries than the funded projects.

### 1.3 Full publication data (for `#repre_articles` and `#all_articles`)

Use the PDF verbatim for authorship marks, journal, volume/issue, year, and 中科院分区/IF tags — this is precise bibliographic data that must not be paraphrased or reformatted lossily. Two lists:

- **一作/通讯 (first or corresponding author), 8 entries** — PRL 134(21):213803 (2025); L&PR 20(3):e00912 (2026); APL Photonics 9(3):031305 (2024); IEEE JSTQE 32(5):1–8 (2026); Light: Sci. & Appl. (minor revision, 2026); Optics Letters 51(10):2940–2943 (2026); L&PR e71469 (2026); L&PR (under review).
- **其它 (co-author), 11 entries** — Optics and Lasers in Engineering 175:108034 (2024); Optics Express 33(4):8129 (2025); Chinese Optics Letters 22(11):111903 (2024); J. Lightwave Technology 41(5):1559–1565 (2023); Light: Sci. & Appl. 13(1) (2024); Light: Sci. & Appl. 14(1) (2025); Applied Physics Letters 123(17) (2023); IEEE Photonics Technology Letters 38(10):679–682 (2026); Optics Express 34(4):7085 (2026); Acta Optica Sinica 44(5):0514001 (2024, Chinese-authored); Optica (under review, 2026).

Each entry: authors (bold self-name, † co-first markers preserved), title, journal + vol/issue/page, year, 中科院分区 badge + IF number. Recommend rendering 中科院1区TOP as a distinct high-contrast badge (this is the strongest signal a reviewer scans for) and IF as a small numeric chip.

---

## 2. Design-system mapping (taste-skill §2)

The content is dense, tabular, bilingual (Chinese-primary, English journal/paper titles), and citation-heavy — closer to a technical publication list than a marketing site. This calls for **restrained, native, content-first CSS** rather than a heavy component framework: no Material/Fluent/Bootstrap look. A light custom design-token system (below) implemented in plain CSS custom properties, optionally with Tailwind utility classes if the existing codebase already uses them — but the visual identity must not read as "shadcn default" or "Bootstrap card grid."

---

## 3. Token system

### 3.1 Color — "Lab Daylight" (light theme) / "Oscilloscope Night" (dark theme)

Two accent hues share the same family across themes for brand continuity (taste-skill §8: dual-mode by default, contrast/hierarchy parity), but shift lightness/saturation so each theme has correct contrast on its own background.

**Light — Lab Daylight** (evokes journal paper + daylight lab bench)

| Token | Hex | Use |
|---|---|---|
| `--paper` | `#F7F5F0` | page background — warm paper white, not stark #FFF |
| `--ink` | `#1A1D29` | primary text |
| `--ink-muted` | `#5B6270` | secondary text, captions, metadata |
| `--soliton-teal` | `#0F7A73` | primary accent — links, active nav, primary CTA, section rule |
| `--pulse-amber` | `#955A19` | secondary accent — status badges, highlight marks, IF chips (darkened from initial `#C97A22` draft to clear WCAG AA 4.5:1 on `--paper`, verified at 5.13:1) |
| `--hairline` | `#DDD8CC` | borders, dividers, table rules |
| `--surface` | `#FFFFFF` | card/panel background (slightly lifted off paper) |

**Dark — Oscilloscope Night** (evokes a scope/spectrum-analyzer screen)

| Token | Hex | Use |
|---|---|---|
| `--trace-black` | `#0B0D12` | page background |
| `--mist` | `#E7E9EE` | primary text — soft white, not pure #FFF |
| `--mist-muted` | `#8A90A0` | secondary text, captions, metadata |
| `--phosphor-cyan` | `#4FD6C4` | primary accent — links, active nav, primary CTA, section rule |
| `--pulse-amber-d` | `#F0B15A` | secondary accent — status badges, highlight marks, IF chips |
| `--hairline-d` | `#232733` | borders, dividers, table rules |
| `--surface-d` | `#12151C` | card/panel background (slightly lifted off trace-black) |

Both themes keep the **highest-signal badge** (中科院1区TOP) on a filled amber chip with dark/paper text respectively, so it reads as "important" identically in both modes. Verify all text/background pairs meet WCAG AA (4.5:1 body, 3:1 large text) in both themes before shipping — this is a hard gate, not a suggestion.

### 3.2 Typography

Content is Simplified Chinese-primary with embedded English (journal names, DOIs, author lists) and numerals (dates, impact factors) — the type stack must have full CJK coverage for body/display and can use a Latin-only mono for pure-data fields.

- **Display** (name, section headers): **Noto Serif SC**, used at restrained weight (600) and larger optical size only for `<h1>`/`<h2>` — a serif gives the page the gravity of a printed journal masthead without borrowing a generic sans SaaS look. Fallback: `"Source Han Serif SC", serif`.
- **Body**: **Noto Sans SC**, weight 400/500 — high legibility at small sizes for dense publication lists. Fallback: `"PingFang SC", "Microsoft YaHei", sans-serif`.
- **Utility/mono** (dates, DOIs, impact factors, volume/issue numbers, status codes): **IBM Plex Mono**, weight 400/500 — reinforces the "instrument readout" motif from §0 and makes numeric data scannable/tabular. Fallback: `"JetBrains Mono", ui-monospace, monospace`.

Type scale (fluid, `clamp()`-based): display 2.75rem→4rem, h2 1.75rem→2.25rem, h3 1.25rem, body 1rem/1.6 line-height, caption/mono 0.8125rem.

### 3.3 Layout concept

Single long-scroll page, same information architecture as the current site (anchor nav preserved) but with a **compact sticky top nav** that condenses to a slim bar with active-section highlighting on scroll — familiar to the returning audience, not a full IA rewrite (taste-skill §11: preserve navigation patterns users already know on a redesign).

```
┌─────────────────────────────────────────────┐
│ 杨洋            about works edu projects ... │  <- sticky, condenses on scroll
├─────────────────────────────────────────────┤
│                                               │
│   [photo]   杨洋                             │
│             博士 · 华南理工大学 物理与光电学院  │
│             ~~~/\/\/\~~~ (pulse-train motif) │  <- signature element, see §5
│             关于我 + basic info fields        │
│                                               │
├─── 工作经历 ──────────────────────────────────┤
│  │  2025/09–至今  博士后 华南理工大学 ...      │  <- vertical timeline, left rail
│                                               │
├─── 教育经历 ──────────────────────────────────┤
│  │  2019–2025  博士 ...                      │
│  │  2015–2019  本科 ...                      │
│                                               │
├─── 项目经历 (NEW) ────────────────────────────┤
│  [card] 青年科学基金 · 申请人 · 评审中          │
│  [card] 攀登计划子课题 · 排第二 · 评审中        │
│  [card] 国家重大科研仪器 · 研发人员 · 已结题    │
│  竞赛项目: 银奖 · 一等奖 · 攀登计划 (badge row)│
│                                               │
├─── 专业技能 ──────────────────────────────────┤
│  [tag chips grouped: 语言/软件/硬件]           │
│                                               │
├─── 代表性文章 ─────────────────────────────────┤
│  [3 featured cards w/ abstract]              │
│                                               │
├─── 完整文章列表 ───────────────────────────────┤
│  filter: [一作/通讯] [其它]   table/list       │
│                                               │
├─── 联系我 ─────────────────────────────────────┤
│  form (honeypot preserved) | 电话/邮箱/QQ      │
│  访问统计 strip                                │
├─────────────────────────────────────────────┤
│ © 2020–2030 OrinYoung ...   theme toggle      │
└─────────────────────────────────────────────┘
```

---

## 4. Component specs

- **Nav**: sticky, translucent surface with backdrop-blur, condenses in height after ~80px scroll; active-section indicator is a short underline in `--soliton-teal`/`--phosphor-cyan`, not a filled pill (keeps it quiet). Theme toggle rendered as a small sun/scope-trace icon switch, right-aligned, always visible.
- **Hero**: two-column on desktop (photo left, identity block right), stacked on mobile. The personal couplet renders in display serif, italic, smaller and muted — a quiet personal touch, not the loudest thing on the page (the name and role are the loudest).
- **Timeline (工作经历/教育经历)**: left vertical rule in hairline color with small filled-circle nodes in the primary accent at each entry; date in mono utility face; institution/role in body face, bold for institution.
- **Project cards (项目经历)**: bordered surface panel, 1px hairline, no heavy shadow. Top row: title (h3) + status badge (amber outline for 评审中, muted filled for 已结题). Second row: funding body · date · role, in mono/caption style. Body: abstract, clamped to ~3 lines with a "展开" (expand) toggle for older/completed projects; the current 评审中 grant application is shown expanded by default since it's the most current signal.
- **Publication cards/rows**: dense table-like rows on desktop (author list · title · journal/vol/page · badges), collapsing to stacked cards on mobile. 中科院分区 badge uses filled amber for 1区TOP, outline for lower tiers, so the eye sorts by importance instantly. Toggle/filter chips at the top of `#all_articles` for 一作/通讯 vs 其它 (client-side filter, no page reload).
- **Skill chips**: grouped under three quiet subheads (语言与工具 / 编程与数据处理 / 硬件), rendered as small outlined pills, not colorful badges — this section is supporting evidence, not a highlight.
- **Contact form**: preserve the existing honeypot field (hidden, `aria-hidden`, tabindex -1) for spam protection; visible fields only email + message + Send, styled to match the token system. Contact block (电话/邮箱/地址/QQ) as a simple labeled list beside or below the form.
- **Visitor stats strip**: 8 numbers (今日/本周/上周/本月/上月/今年/去年/累计) in a horizontal strip of mono numerals with small caption labels underneath — treat it like a data readout, consistent with the instrumentation motif, not a row of gradient stat cards.
- **Footer**: preserve copyright line as-is; theme toggle may optionally be duplicated here for long-scroll convenience.

---

## 5. Signature element & how this direction avoids generic defaults

The frontend-design skill flags three current AI-design defaults to avoid unless the brief calls for them: (1) warm cream + serif + terracotta, (2) near-black + single neon accent, (3) broadsheet/newspaper hairline grid. This spec's dark theme is *adjacent* to cluster (2) — near-black with a bright cyan accent — so the differentiation has to be deliberate and justified, not incidental:

- The near-black in Oscilloscope Night is chosen because it's literally what the subject looks at all day (an oscilloscope/spectrum-analyzer screen), not a generic "premium dark mode" choice — and the light theme is not the inverse trick of black-on-cream; it's a distinct "lab daylight/journal paper" mode with its own accent-lightness recalibration (§3.1), which cluster-2 sites don't bother doing.
- **Signature element**: a thin, animated **pulse-train motif** — an SVG line drawing a periodic train of narrow Gaussian-ish pulses (literally: a mode-locked laser's output train), used in exactly two places: (a) a subtle looping trace beneath the hero identity block (slow "breathing" amplitude animation, respecting `prefers-reduced-motion`), and (b) as the horizontal rule/divider between major sections, replacing a plain `<hr>`. This is the one place the design takes a visible risk, and it's directly derived from the subject's actual research (GHz dissipative solitons), not a decorative flourish borrowed from an unrelated domain.
- 中科院分区/IF badges styled as small instrument-readout chips (mono numerals, thin outline) rather than colorful marketing-style pills — reinforces the motif without adding a second competing visual language.
- No numbered 01/02/03 markers anywhere except where content is genuinely sequential (the work/education timeline, which is real chronology) — publication and project lists are NOT artificially numbered badges, since order there is by date/tier, not a narrative sequence.

---

## 6. Dark/light theme protocol

- Toggle control persists preference in `localStorage`; on first visit, default to `prefers-color-scheme` media query result.
- Theme switch cross-fades background/text/accent colors over ~150ms (`transition: background-color, color, border-color`), no layout shift.
- Every token pair in §3.1 must be checked for AA contrast independently — do not assume dark-mode contrast is "close enough" because light mode passed.
- Images (profile photo) and the pulse-train SVG accent color both need theme-aware variants (SVG stroke bound to the CSS custom property, not hardcoded).
- Badge semantics (1区TOP amber, 评审中 outline, 已结题 muted) must keep the same relative hierarchy in both themes even though absolute hex values differ.

---

## 7. Motion

Deliberate, not decorative, per frontend-design skill guidance:

- Hero pulse-train: slow continuous loop (~4s cycle), low amplitude — ambient, not attention-grabbing.
- Section reveal on scroll: a single subtle fade+8px-rise on first entry into viewport, staggered slightly across cards within a section (project cards, publication cards) — one orchestrated moment per section, not per element.
- Nav active-state underline: animates width/position on section change (~200ms ease).
- Hover on project/publication cards: 1px border color shift to accent + 2px translateY, no drop-shadow bloom.
- Respect `prefers-reduced-motion: reduce` globally — disable the pulse-train loop and scroll reveals, keep only theme cross-fade.

---

## 8. Accessibility & responsive floor

- Mobile-first responsive down to 360px; timeline and publication table collapse to stacked cards below 720px.
- Visible keyboard focus ring on all interactive elements (nav links, theme toggle, form fields, expand/collapse toggles, filter chips) using the accent color at 2px outline.
- Semantic heading order (h1 name → h2 per section → h3 per entry), landmark roles (`nav`, `main`, `footer`), form labels associated to inputs, honeypot field properly hidden from assistive tech (not just visually).
- Publication/project badges carry text, not color alone (e.g. "1区TOP" as visible text, not just a colored dot).

---

## 9. Content/writing notes

- Keep all bibliographic and project text in the register it already has in the PDF — this is a technical CV, precision matters more than "friendly" copy. Do not paraphrase paper titles, journal names, or grant titles.
- New UI-only copy (e.g. "展开"/"收起" toggles, filter chip labels "一作/通讯" vs "其它", empty/loading states for the visitor-counter widget if it fails to load) should be short, plain, active-voice, consistent with the section labels already established on the site.
- If the visitor counter or contact form has no data/fails silently today, give it an explicit state ("统计加载中" / "发送失败，请重试") rather than a blank gap — per frontend-design skill guidance on treating empty/error states as design moments, not accidents.

---

## 10. Pre-flight checklist (taste-skill §14 — must all be true before build is called done)

- [ ] Every section currently on `yang-yang-resume.netlify.app` (基本资料/工作经历/教育经历/专业技能/代表性文章/完整文章列表/联系方式/访问统计/footer/简历下载) is present on the new site.
- [ ] New 项目经历 section is present with all 3 funded/applied projects from the PDF, plus 竞赛项目 badges.
- [ ] Full 19-entry publication list matches PDF exactly (authors, journal, vol/issue/page, year, 分区/IF).
- [ ] Both Lab Daylight and Oscilloscope Night themes implemented, toggle persists via localStorage, defaults to system preference.
- [ ] All text/background pairs pass WCAG AA in both themes.
- [ ] Pulse-train signature element present in hero + as section dividers, respects `prefers-reduced-motion`.
- [ ] Responsive to 360px; keyboard focus visible everywhere; contact form honeypot preserved and accessible-hidden.
- [ ] No generic-default tells shipped unexamined (unjustified 01/02/03 numbering, gradient stat cards, default shadcn card look, cream+terracotta or plain neon-on-black without the theme-specific rationale in §5).
- [ ] Footer copyright line preserved verbatim; flagged to user, not silently changed.
