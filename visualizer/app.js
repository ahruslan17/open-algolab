const traceData = {
  version: "0.1",
  id: "sliding-window-max-sum-subarray-k",
  visualType: "array-window",
  input: { nums: [2, 1, 5, 1, 3, 2], k: 3 },
  answer: 9,
  steps: [
    { step: 1, state: { left: 0, right: 0, windowStart: 0, windowEnd: 0, window: [2], window_sum: 2, best: null, removed: null, highlights: [0] } },
    { step: 2, state: { left: 0, right: 1, windowStart: 0, windowEnd: 1, window: [2, 1], window_sum: 3, best: null, removed: null, highlights: [1] } },
    { step: 3, state: { left: 0, right: 2, windowStart: 0, windowEnd: 2, window: [2, 1, 5], window_sum: 8, best: 8, removed: 2, highlights: [0, 1, 2] } },
    { step: 4, state: { left: 1, right: 3, windowStart: 1, windowEnd: 3, window: [1, 5, 1], window_sum: 7, best: 8, removed: 1, highlights: [1, 2, 3] } },
    { step: 5, state: { left: 2, right: 4, windowStart: 2, windowEnd: 4, window: [5, 1, 3], window_sum: 9, best: 9, removed: 5, highlights: [2, 3, 4] } },
    { step: 6, state: { left: 3, right: 5, windowStart: 3, windowEnd: 5, window: [1, 3, 2], window_sum: 6, best: 9, removed: 1, highlights: [3, 4, 5] } }
  ]
};

const locales = window.OPENALGOLAB_LOCALES || {};
const defaultLanguage = locales.en ? "en" : Object.keys(locales)[0];
let currentLanguage = localStorage.getItem("openalgolab-language") || defaultLanguage;
let currentChapterId = localStorage.getItem("openalgolab-chapter") || "intro";
let currentTheme = localStorage.getItem("openalgolab-theme") || "light";
let currentStepIndex = 0;
let isLanguageMenuOpen = false;

const languageFlags = {
  en: "🇬🇧",
  ru: "🇷🇺"
};

if (!locales[currentLanguage]) {
  currentLanguage = defaultLanguage;
}

const elements = {
  brandSubtitle: document.getElementById("brand-subtitle"),
  themeToggle: document.getElementById("theme-toggle"),
  themeToggleIcon: document.getElementById("theme-toggle-icon"),
  themeToggleLabel: document.getElementById("theme-toggle-label"),
  languageTrigger: document.getElementById("language-trigger"),
  languageTriggerFlag: document.getElementById("language-trigger-flag"),
  languageTriggerLabel: document.getElementById("language-trigger-label"),
  languageMenu: document.getElementById("language-menu"),
  navLabel: document.getElementById("nav-label"),
  navItems: document.getElementById("nav-items"),
  sidebarNoteTitle: document.getElementById("sidebar-note-title"),
  sidebarNoteText: document.getElementById("sidebar-note-text"),
  lessonEyebrow: document.getElementById("lesson-eyebrow"),
  title: document.getElementById("title"),
  heroCopy: document.getElementById("hero-copy"),
  lessonKicker: document.getElementById("lesson-kicker"),
  lessonSections: document.getElementById("lesson-sections"),
  labCard: document.getElementById("lab-card"),
  labEyebrow: document.getElementById("lab-eyebrow"),
  traceTitle: document.getElementById("trace-title"),
  pattern: document.getElementById("pattern"),
  counter: document.getElementById("step-counter"),
  progress: document.getElementById("progress-track"),
  array: document.getElementById("array"),
  state: document.getElementById("state"),
  currentWindowLabel: document.getElementById("current-window-label"),
  bestAnswerLabel: document.getElementById("best-answer-label"),
  windowValues: document.getElementById("window-values"),
  bestAnswer: document.getElementById("best-answer"),
  actionLabel: document.getElementById("action-label"),
  decisionLabel: document.getElementById("decision-label"),
  whyLabel: document.getElementById("why-label"),
  action: document.getElementById("action"),
  decision: document.getElementById("decision"),
  why: document.getElementById("why"),
  prev: document.getElementById("prev"),
  next: document.getElementById("next"),
  reset: document.getElementById("reset")
};

function t() {
  return locales[currentLanguage];
}

function formatValue(value) {
  return value === null || value === undefined ? "—" : String(value);
}

function formatWindow(windowValues) {
  return `[${windowValues.join(", ")}]`;
}

function setText(element, value) {
  element.textContent = value;
}

function applyTheme() {
  const isDark = currentTheme === "dark";
  document.documentElement.dataset.theme = currentTheme;
  elements.themeToggleIcon.textContent = isDark ? "☀" : "☾";
  elements.themeToggleLabel.textContent = isDark ? "Switch to light theme" : "Switch to dark theme";
  elements.themeToggle.setAttribute("aria-label", elements.themeToggleLabel.textContent);
}

function toggleTheme() {
  currentTheme = currentTheme === "dark" ? "light" : "dark";
  localStorage.setItem("openalgolab-theme", currentTheme);
  applyTheme();
}

function renderNavigation(copy) {
  setText(elements.brandSubtitle, copy.sidebar.brandSubtitle);
  setText(elements.navLabel, copy.sidebar.navLabel);
  setText(elements.sidebarNoteTitle, copy.sidebar.noteTitle);
  setText(elements.sidebarNoteText, copy.sidebar.noteText);

  elements.navItems.innerHTML = copy.sidebar.items
    .map((item) => {
      const classes = ["nav-item", item.id === currentChapterId ? "active" : "", item.locked ? "locked" : ""].filter(Boolean).join(" ");
      const disabled = item.locked ? 'aria-disabled="true"' : "";
      return `
        <button class="${classes}" type="button" data-chapter="${item.id}" ${disabled}>
          <span>${item.number}</span>
          <strong>${item.title}</strong>
          <small>${item.subtitle}</small>
        </button>
      `;
    })
    .join("");

  elements.navItems.querySelectorAll(".nav-item:not(.locked)").forEach((button) => {
    button.addEventListener("click", () => setChapter(button.dataset.chapter));
  });

  renderLanguageSwitcher();
}

function getLanguageFlag(language) {
  return languageFlags[language] || language.toUpperCase().slice(0, 2);
}

function renderLanguageSwitcher() {
  const currentLocale = locales[currentLanguage];
  const currentLabel = currentLocale.meta.label;

  elements.languageTriggerFlag.textContent = getLanguageFlag(currentLanguage);
  elements.languageTriggerLabel.textContent = currentLabel;
  elements.languageTrigger.setAttribute("aria-label", currentLabel);
  elements.languageTrigger.setAttribute("aria-expanded", String(isLanguageMenuOpen));
  elements.languageMenu.hidden = !isLanguageMenuOpen;

  elements.languageMenu.innerHTML = Object.entries(locales)
    .map(([language, locale]) => {
      const active = language === currentLanguage;
      return `
        <button class="language-option ${active ? "active" : ""}" type="button" data-lang="${language}" aria-pressed="${active}">
          <span class="language-option-flag" aria-hidden="true">${getLanguageFlag(language)}</span>
          <span>${locale.meta.label}</span>
        </button>
      `;
    })
    .join("");

  elements.languageMenu.querySelectorAll(".language-option").forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.lang));
  });
}

function renderLessonSections(copy) {
  const chapter = getCurrentChapter(copy);

  if (currentChapterId !== "sliding-window") {
    elements.lessonSections.innerHTML = `
      ${chapter.sections.map(renderGenericSection).join("")}
      <div class="remember-box">
        <strong>${chapter.remember.title}</strong>
        <p>${chapter.remember.text}</p>
      </div>
    `;
    return;
  }

  const [intro, problem, invariant, stateModel, recognition] = chapter.sections;

  elements.lessonSections.innerHTML = `
    <section class="lesson-section">
      <h2>${intro.title}</h2>
      ${intro.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("")}
    </section>

    <div class="concept-strip" aria-label="Sliding window movement">
      <div>
        <span>${chapter.conceptStrip.oldLabel}</span>
        <code>${chapter.conceptStrip.oldWindow}</code>
      </div>
      <div class="arrow">→</div>
      <div>
        <span>${chapter.conceptStrip.newLabel}</span>
        <code>${chapter.conceptStrip.newWindow}</code>
      </div>
    </div>
    <p>${chapter.conceptStrip.explanation}</p>

    <section class="lesson-section">
      <h2>${problem.title}</h2>
      ${problem.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("")}
    </section>

    <div class="example-box">
      <span>${chapter.example.inputLabel}</span>
      <code>${chapter.example.input}</code>
      <span>${chapter.example.answerLabel}</span>
      <code>${chapter.example.answer}</code>
    </div>

    <section class="lesson-section">
      <h2>${invariant.title}</h2>
      <p>${invariant.paragraphs[0]}</p>
      <div class="formula-card"><code>${chapter.formula}</code></div>
      <p>${invariant.paragraphs[1]}</p>
    </section>

    <section class="lesson-section">
      <h2>${stateModel.title}</h2>
      <dl class="state-model">
        ${stateModel.stateModel
          .map(([name, description]) => `<div><dt><code>${name}</code></dt><dd>${description}</dd></div>`)
          .join("")}
      </dl>
    </section>

    <section class="lesson-section">
      <h2>${recognition.title}</h2>
      ${recognition.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("")}
    </section>

    <div class="remember-box">
      <strong>${chapter.remember.title}</strong>
      <p>${chapter.remember.text}</p>
    </div>
  `;
}

function renderGenericSection(section) {
  const paragraphs = section.paragraphs ? section.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("") : "";
  const bullets = section.bullets
    ? `<ul class="lesson-list">${section.bullets.map((bullet) => `<li>${bullet}</li>`).join("")}</ul>`
    : "";
  return `
    <section class="lesson-section">
      <h2>${section.title}</h2>
      ${paragraphs}
      ${bullets}
    </section>
  `;
}

function getCurrentChapter(copy) {
  if (currentChapterId === "sliding-window") {
    return { ...copy.lesson, hasTrace: true };
  }
  return copy.chapters[currentChapterId] || copy.chapters.intro;
}

function renderStaticText(copy) {
  const chapter = getCurrentChapter(copy);
  document.documentElement.lang = copy.meta.htmlLang;
  setText(elements.lessonEyebrow, chapter.eyebrow);
  setText(elements.title, chapter.title);
  setText(elements.heroCopy, chapter.hero);
  setText(elements.lessonKicker, chapter.kicker);
  setText(elements.labEyebrow, copy.lab.eyebrow);
  setText(elements.traceTitle, copy.trace.title);
  setText(elements.currentWindowLabel, copy.lab.currentWindow);
  setText(elements.bestAnswerLabel, copy.lab.bestAnswer);
  setText(elements.actionLabel, copy.lab.labels.action);
  setText(elements.decisionLabel, copy.lab.labels.decision);
  setText(elements.whyLabel, copy.lab.labels.why);
  setText(elements.prev, copy.lab.controls.previous);
  setText(elements.next, copy.lab.controls.next);
  setText(elements.reset, copy.lab.controls.reset);
  renderNavigation(copy);
  renderLessonSections(copy);
  elements.labCard.hidden = !chapter.hasTrace;
}

function renderProgress(copy) {
  elements.progress.innerHTML = traceData.steps
    .map((step, index) => {
      const stateClass = index === currentStepIndex ? "current" : index < currentStepIndex ? "done" : "";
      return `<button class="progress-dot ${stateClass}" type="button" data-step="${index}" aria-label="${copy.lab.progressAria} ${step.step}">${step.step}</button>`;
    })
    .join("");

  elements.progress.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      currentStepIndex = Number(button.dataset.step);
      render();
    });
  });
}

function renderArray(step, copy) {
  const state = step.state;
  const nums = traceData.input.nums;
  const highlights = new Set(state.highlights || []);

  elements.array.innerHTML = "";

  nums.forEach((value, index) => {
    const cell = document.createElement("div");
    cell.className = "cell";

    if (index >= state.windowStart && index <= state.windowEnd) {
      cell.classList.add("in-window");
    }

    if (highlights.has(index)) {
      cell.classList.add("highlighted");
    }

    if (state.best === state.window_sum && state.window.length === traceData.input.k) {
      cell.classList.add("candidate-best");
    }

    const pointerRow = document.createElement("div");
    pointerRow.className = "pointers";

    if (index === state.left) {
      const left = document.createElement("span");
      left.className = "left-pointer";
      left.textContent = "L";
      pointerRow.appendChild(left);
    }

    if (index === state.right) {
      const right = document.createElement("span");
      right.className = "right-pointer";
      right.textContent = "R";
      pointerRow.appendChild(right);
    }

    const number = document.createElement("strong");
    number.textContent = value;

    const indexLabel = document.createElement("small");
    indexLabel.textContent = `${copy.lab.indexLabel} ${index}`;

    cell.append(pointerRow, number, indexLabel);
    elements.array.appendChild(cell);
  });
}

function renderState(step) {
  const state = step.state;
  const rows = [
    ["k", traceData.input.k],
    ["left", state.left],
    ["right", state.right],
    ["window", formatWindow(state.window)],
    ["window_sum", state.window_sum],
    ["best", state.best],
    ["removed", state.removed],
    ["answer", traceData.answer]
  ];

  elements.state.innerHTML = rows
    .map(([label, value]) => `<div class="state-card"><span>${label}</span><strong>${formatValue(value)}</strong></div>`)
    .join("");
}

function render() {
  const copy = t();
  const chapter = getCurrentChapter(copy);

  if (!chapter.hasTrace) {
    renderStaticText(copy);
    return;
  }

  const step = traceData.steps[currentStepIndex];
  const localizedStep = copy.trace.steps[currentStepIndex];
  const state = step.state;

  setText(elements.pattern, `${copy.trace.pattern} · ${copy.lab.patternSuffix}`);
  setText(elements.counter, `${copy.lab.stepLabel} ${step.step} / ${traceData.steps.length}`);
  setText(elements.windowValues, formatWindow(state.window));
  setText(elements.bestAnswer, formatValue(state.best));
  setText(elements.action, localizedStep.action);
  setText(elements.decision, localizedStep.decision);
  setText(elements.why, localizedStep.why);

  renderProgress(copy);
  renderArray(step, copy);
  renderState(step);

  elements.prev.disabled = currentStepIndex === 0;
  elements.next.disabled = currentStepIndex === traceData.steps.length - 1;
}

function setLanguage(language) {
  if (!locales[language]) return;
  currentLanguage = language;
  isLanguageMenuOpen = false;
  localStorage.setItem("openalgolab-language", language);
  renderStaticText(t());
  render();
}

function toggleLanguageMenu() {
  isLanguageMenuOpen = !isLanguageMenuOpen;
  renderLanguageSwitcher();
}

function closeLanguageMenu() {
  if (!isLanguageMenuOpen) return;
  isLanguageMenuOpen = false;
  renderLanguageSwitcher();
}

function setChapter(chapterId) {
  const copy = t();
  const item = copy.sidebar.items.find((navItem) => navItem.id === chapterId);
  if (!item || item.locked) return;

  currentChapterId = chapterId;
  currentStepIndex = 0;
  localStorage.setItem("openalgolab-chapter", chapterId);
  renderStaticText(copy);
  if (getCurrentChapter(copy).hasTrace) {
    render();
  }
}

elements.languageTrigger.addEventListener("click", (event) => {
  event.stopPropagation();
  toggleLanguageMenu();
});

elements.languageMenu.addEventListener("click", (event) => {
  event.stopPropagation();
});

elements.themeToggle.addEventListener("click", toggleTheme);

document.addEventListener("click", closeLanguageMenu);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLanguageMenu();
    elements.languageTrigger.focus();
  }
});

elements.prev.addEventListener("click", () => {
  currentStepIndex = Math.max(0, currentStepIndex - 1);
  render();
});

elements.next.addEventListener("click", () => {
  currentStepIndex = Math.min(traceData.steps.length - 1, currentStepIndex + 1);
  render();
});

elements.reset.addEventListener("click", () => {
  currentStepIndex = 0;
  render();
});

applyTheme();
renderStaticText(t());
render();
