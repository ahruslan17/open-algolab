const locales = window.OPENALGOLAB_LOCALES || {};
const defaultLanguage = locales.en ? "en" : Object.keys(locales)[0];
let moduleRegistry = {};
const implementationCodeCache = new Map();
const traceDataCache = new Map();
const traceLoadState = new Map();
const traceErrorCache = new Map();
let currentLanguage = localStorage.getItem("openalgolab-language") || defaultLanguage;
let currentChapterId = localStorage.getItem("openalgolab-chapter") || "intro";
let currentTheme = localStorage.getItem("openalgolab-theme") || "light";
let currentCodeLanguage = localStorage.getItem("openalgolab-code-language") || "python";
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

function getTraceData() {
  const tracePath = getCurrentModule()?.trace;
  return tracePath ? traceDataCache.get(tracePath) : null;
}

function getCurrentModule() {
  return moduleRegistry[currentChapterId];
}

function getCurrentTracePath() {
  return getCurrentModule()?.trace;
}

function setText(element, value) {
  element.textContent = value;
}

async function loadModuleRegistry() {
  try {
    const response = await fetch("./modules.json");
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    moduleRegistry = Object.fromEntries(data.modules.map((module) => [module.id, module]));
  } catch (error) {
    console.warn("Could not load visualizer/modules.json", error);
    moduleRegistry = {};
  }
}

async function initialize() {
  await loadModuleRegistry();
  applyTheme();
  renderStaticText(t());
  render();
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

  if (!chapter.code) {
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

    <div class="concept-strip" aria-label="${chapter.conceptStrip.ariaLabel}">
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

    ${renderCodePanel(chapter.code)}

    <section class="lesson-section insight-panel">
      <h2>${chapter.whatToNotice.title}</h2>
      <ul class="lesson-list check-list">
        ${chapter.whatToNotice.items.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </section>

    <section class="lesson-section">
      <h2>${chapter.edgeCases.title}</h2>
      <ul class="lesson-list edge-list">
        ${chapter.edgeCases.items.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </section>

    <section class="lesson-section">
      <h2>${chapter.mistakes.title}</h2>
      <div class="mistake-grid">
        ${chapter.mistakes.items.map(([title, text]) => `<article><strong>${title}</strong><p>${text}</p></article>`).join("")}
      </div>
    </section>

    <section class="lesson-section practice-panel">
      <h2>${chapter.practice.title}</h2>
      <p>${chapter.practice.intro}</p>
      <ul class="lesson-list">
        ${chapter.practice.items.map((item) => `<li>${item}</li>`).join("")}
      </ul>
      <h3>${chapter.practice.drillsTitle}</h3>
      <div class="drill-grid">
        ${chapter.practice.drills.map((drill) => `<code>${drill}</code>`).join("")}
      </div>
    </section>

    <div class="remember-box">
      <strong>${chapter.remember.title}</strong>
      <p>${chapter.remember.text}</p>
    </div>
  `;
}

function getCodeImplementations(code) {
  const module = getCurrentModule();

  if (code.implementations) {
    return code.implementations.map((implementation) => ({
      ...implementation,
      source: implementation.source || module?.implementations?.[implementation.id]
    }));
  }

  return [
    {
      id: "python",
      label: "Python",
      source: module?.implementations?.python,
      lines: code.lines || []
    }
  ];
}

function renderCodePanel(code) {
  const implementations = getCodeImplementations(code);

  if (!implementations.some((implementation) => implementation.id === currentCodeLanguage)) {
    currentCodeLanguage = implementations[0].id;
  }

  const activeImplementation = implementations.find((implementation) => implementation.id === currentCodeLanguage) || implementations[0];
  const codeText = getImplementationCode(activeImplementation);

  return `
    <section class="lesson-section code-panel">
      <div class="code-panel-header">
        <div>
          <h2>${code.title}</h2>
          <p>${code.intro}</p>
        </div>
        <div class="code-language-tabs" aria-label="Reference implementation language">
          ${implementations
            .map(
              (implementation) => `
                <button class="code-language-tab ${implementation.id === activeImplementation.id ? "active" : ""}" type="button" data-code-language="${implementation.id}" aria-pressed="${implementation.id === activeImplementation.id}">
                  ${implementation.label}
                </button>
              `
            )
            .join("")}
        </div>
      </div>
      <pre><code>${escapeHtml(codeText)}</code></pre>
    </section>
  `;
}

function getImplementationCode(implementation) {
  if (implementation.source) {
    if (implementationCodeCache.has(implementation.source)) {
      return implementationCodeCache.get(implementation.source);
    }
    return "Loading implementation source...";
  }

  if (implementation.lines) return implementation.lines.join("\n");
  return "Implementation source is unavailable. Run the visualizer through the local server.";
}

function loadActiveImplementationCode(code) {
  const activeImplementation = getCodeImplementations(code).find((implementation) => implementation.id === currentCodeLanguage);

  if (!activeImplementation?.source || implementationCodeCache.has(activeImplementation.source)) return;

  fetch(activeImplementation.source)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return response.text();
    })
    .then((source) => {
      implementationCodeCache.set(activeImplementation.source, source.trimEnd());
      if (getCurrentModule()?.implementations?.[currentCodeLanguage] === activeImplementation.source) {
        renderStaticText(t());
      }
    })
    .catch((error) => {
      implementationCodeCache.set(
        activeImplementation.source,
        `Could not load implementation source: ${error.message}\nRun the visualizer through the local server and check visualizer/modules.json.`
      );
      renderStaticText(t());
    });
}

function loadCurrentTraceData() {
  const tracePath = getCurrentTracePath();

  if (!tracePath || traceDataCache.has(tracePath) || traceLoadState.has(tracePath)) return;

  traceLoadState.set(tracePath, true);
  traceErrorCache.delete(tracePath);

  fetch(tracePath)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      return response.json();
    })
    .then((traceData) => {
      traceDataCache.set(tracePath, traceData);
      traceLoadState.delete(tracePath);
      if (getCurrentTracePath() === tracePath) {
        currentStepIndex = Math.min(currentStepIndex, traceData.steps.length - 1);
        render();
      }
    })
    .catch((error) => {
      traceLoadState.delete(tracePath);
      traceErrorCache.set(tracePath, error.message);
      if (getCurrentTracePath() === tracePath) {
        render();
      }
    });
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
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
    return {
      ...copy.lesson,
      hasTrace: true,
      summaryLabels: {
        current: copy.lab.currentWindow,
        answer: copy.lab.bestAnswer
      },
      trace: copy.trace
    };
  }
  if (currentChapterId === "two-pointers") return { ...copy.twoPointers, hasTrace: true };
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
  setText(elements.traceTitle, chapter.trace ? chapter.trace.title : "");
  setText(elements.currentWindowLabel, chapter.summaryLabels ? chapter.summaryLabels.current : copy.lab.currentWindow);
  setText(elements.bestAnswerLabel, chapter.summaryLabels ? chapter.summaryLabels.answer : copy.lab.bestAnswer);
  setText(elements.actionLabel, copy.lab.labels.action);
  setText(elements.decisionLabel, copy.lab.labels.decision);
  setText(elements.whyLabel, copy.lab.labels.why);
  setText(elements.prev, copy.lab.controls.previous);
  setText(elements.next, copy.lab.controls.next);
  setText(elements.reset, copy.lab.controls.reset);
  renderNavigation(copy);
  renderLessonSections(copy);
  bindCodeLanguageTabs();
  if (chapter.code) loadActiveImplementationCode(chapter.code);
  elements.labCard.hidden = !chapter.hasTrace;
}

function bindCodeLanguageTabs() {
  document.querySelectorAll("[data-code-language]").forEach((button) => {
    button.addEventListener("click", () => setCodeLanguage(button.dataset.codeLanguage));
  });
}

function renderProgress(copy) {
  const traceData = getTraceData();
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
  const traceData = getTraceData();
  const state = step.state;
  const nums = traceData.input.nums || traceData.input.numbers;
  const highlights = new Set(state.highlights || []);

  elements.array.innerHTML = "";

  nums.forEach((value, index) => {
    const cell = document.createElement("div");
    cell.className = "cell";

    if (traceData.visualType === "array-window" && index >= state.windowStart && index <= state.windowEnd) {
      cell.classList.add("in-window");
    }

    if (highlights.has(index)) {
      cell.classList.add("highlighted");
    }

    if (traceData.visualType === "array-window" && state.best === state.window_sum && state.window.length === traceData.input.k) {
      cell.classList.add("candidate-best");
    }

    const pointerRow = document.createElement("div");
    pointerRow.className = "pointers";

    if (index === state.left) {
      cell.classList.add("left-active");
      const left = document.createElement("span");
      left.className = "left-pointer";
      left.textContent = "L";
      pointerRow.appendChild(left);
    }

    if (index === state.right) {
      cell.classList.add("right-active");
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
  const traceData = getTraceData();
  const state = step.state;
  const rows = traceData.visualType === "two-pointers"
    ? [
        ["target", traceData.input.target],
        ["left_index", state.left],
        ["right_index", state.right],
        ["pair", formatWindow(state.pair)],
        ["current_sum", state.current_sum],
        ["move", state.move],
        ["answer_1based", formatWindow(traceData.answer)]
      ]
    : [
        ["k", traceData.input.k],
        ["left", state.left],
        ["right", state.right],
        ["window", formatWindow(state.window)],
        ["window_sum", state.window_sum],
        ["best", state.best],
        ["remove_next", state.removed],
        ["answer", traceData.answer]
      ];

  elements.state.innerHTML = rows
    .map(([label, value]) => `<div class="state-card"><span>${label}</span><strong>${formatValue(value)}</strong></div>`)
    .join("");
}

function renderTracePlaceholder(copy, message) {
  elements.labCard.classList.remove("trace-array-window", "trace-two-pointers");
  setText(elements.pattern, message);
  setText(elements.counter, "—");
  setText(elements.windowValues, "—");
  setText(elements.bestAnswer, "—");
  setText(elements.action, message);
  setText(elements.decision, "—");
  setText(elements.why, "—");
  elements.progress.innerHTML = "";
  elements.array.innerHTML = "";
  elements.state.innerHTML = "";
  elements.prev.disabled = true;
  elements.next.disabled = true;
  elements.reset.disabled = true;
  elements.labCard.hidden = false;
}

function render() {
  const copy = t();
  const chapter = getCurrentChapter(copy);
  const traceData = getTraceData();

  if (!chapter.hasTrace) {
    elements.labCard.hidden = true;
    return;
  }

  if (!traceData) {
    const tracePath = getCurrentTracePath();
    const error = tracePath ? traceErrorCache.get(tracePath) : null;
    const message = error ? `${copy.lab.traceLoadError}: ${error}` : copy.lab.loadingTrace;
    renderTracePlaceholder(copy, message);
    loadCurrentTraceData();
    return;
  }

  elements.reset.disabled = false;

  const step = traceData.steps[currentStepIndex];
  const localizedStep = chapter.trace.steps[currentStepIndex] || step;
  const state = step.state;

  elements.labCard.classList.remove("trace-array-window", "trace-two-pointers");
  elements.labCard.classList.add(`trace-${traceData.visualType}`);

  setText(elements.pattern, `${chapter.trace.pattern} · ${copy.lab.patternSuffixes[traceData.visualType]}`);
  setText(elements.counter, `${copy.lab.stepLabel} ${step.step} / ${traceData.steps.length}`);
  setText(elements.windowValues, traceData.visualType === "two-pointers" ? formatWindow(state.pair) : formatWindow(state.window));
  setText(elements.bestAnswer, traceData.visualType === "two-pointers" ? formatWindow(traceData.answer) : formatValue(state.best));
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

function setCodeLanguage(language) {
  currentCodeLanguage = language;
  localStorage.setItem("openalgolab-code-language", language);
  renderStaticText(t());
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
  currentStepIndex = Math.min(getTraceData().steps.length - 1, currentStepIndex + 1);
  render();
});

elements.reset.addEventListener("click", () => {
  currentStepIndex = 0;
  render();
});

initialize();
