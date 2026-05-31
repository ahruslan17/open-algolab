const trace = {
  version: "0.1",
  id: "sliding-window-max-sum-subarray-k",
  title: "Maximum Sum Subarray of Size K",
  pattern: "Sliding Window",
  visualType: "array-window",
  input: { nums: [2, 1, 5, 1, 3, 2], k: 3 },
  answer: 9,
  steps: [
    {
      step: 1,
      action: "Add nums[0] = 2; keep building the first full window.",
      state: { left: 0, right: 0, windowStart: 0, windowEnd: 0, window: [2], window_sum: 2, best: null, removed: null, highlights: [0] },
      decision: "Window size is 1, which is smaller than k = 3.",
      why: "A partial window cannot answer the problem because the required size is exactly k."
    },
    {
      step: 2,
      action: "Add nums[1] = 1; keep building the first full window.",
      state: { left: 0, right: 1, windowStart: 0, windowEnd: 1, window: [2, 1], window_sum: 3, best: null, removed: null, highlights: [1] },
      decision: "Window size is 2, which is smaller than k = 3.",
      why: "A partial window cannot answer the problem because the required size is exactly k."
    },
    {
      step: 3,
      action: "Evaluate window nums[0:3] and prepare to slide.",
      state: { left: 0, right: 2, windowStart: 0, windowEnd: 2, window: [2, 1, 5], window_sum: 8, best: 8, removed: 2, highlights: [0, 1, 2] },
      decision: "First complete window has sum 8, so best becomes 8.",
      why: "Now that the window has exactly k values, it is a valid candidate for the answer."
    },
    {
      step: 4,
      action: "Evaluate window nums[1:4] and prepare to slide.",
      state: { left: 1, right: 3, windowStart: 1, windowEnd: 3, window: [1, 5, 1], window_sum: 7, best: 8, removed: 1, highlights: [1, 2, 3] },
      decision: "Current window sum 7 does not beat best 8.",
      why: "Now that the window has exactly k values, it is a valid candidate for the answer."
    },
    {
      step: 5,
      action: "Evaluate window nums[2:5] and prepare to slide.",
      state: { left: 2, right: 4, windowStart: 2, windowEnd: 4, window: [5, 1, 3], window_sum: 9, best: 9, removed: 5, highlights: [2, 3, 4] },
      decision: "Current window sum 9 is better than previous best 8.",
      why: "Now that the window has exactly k values, it is a valid candidate for the answer."
    },
    {
      step: 6,
      action: "Evaluate window nums[3:6] and prepare to slide.",
      state: { left: 3, right: 5, windowStart: 3, windowEnd: 5, window: [1, 3, 2], window_sum: 6, best: 9, removed: 1, highlights: [3, 4, 5] },
      decision: "Current window sum 6 does not beat best 9.",
      why: "Now that the window has exactly k values, it is a valid candidate for the answer."
    }
  ]
};

let currentStepIndex = 0;

const elements = {
  title: document.getElementById("title"),
  traceTitle: document.getElementById("trace-title"),
  pattern: document.getElementById("pattern"),
  counter: document.getElementById("step-counter"),
  progress: document.getElementById("progress-track"),
  array: document.getElementById("array"),
  state: document.getElementById("state"),
  windowValues: document.getElementById("window-values"),
  bestAnswer: document.getElementById("best-answer"),
  action: document.getElementById("action"),
  decision: document.getElementById("decision"),
  why: document.getElementById("why"),
  prev: document.getElementById("prev"),
  next: document.getElementById("next"),
  reset: document.getElementById("reset")
};

function formatValue(value) {
  return value === null || value === undefined ? "—" : String(value);
}

function formatWindow(windowValues) {
  return `[${windowValues.join(", ")}]`;
}

function renderProgress() {
  elements.progress.innerHTML = trace.steps
    .map((step, index) => {
      const stateClass = index === currentStepIndex ? "current" : index < currentStepIndex ? "done" : "";
      return `<button class="progress-dot ${stateClass}" type="button" data-step="${index}" aria-label="Go to step ${step.step}">${step.step}</button>`;
    })
    .join("");

  elements.progress.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      currentStepIndex = Number(button.dataset.step);
      render();
    });
  });
}

function renderArray(step) {
  const state = step.state;
  const nums = trace.input.nums;
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

    if (state.best === state.window_sum && state.window.length === trace.input.k) {
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
    indexLabel.textContent = `index ${index}`;

    cell.append(pointerRow, number, indexLabel);
    elements.array.appendChild(cell);
  });
}

function renderState(step) {
  const state = step.state;
  const rows = [
    ["k", trace.input.k],
    ["left", state.left],
    ["right", state.right],
    ["window", formatWindow(state.window)],
    ["window_sum", state.window_sum],
    ["best", state.best],
    ["removed", state.removed],
    ["answer", trace.answer]
  ];

  elements.state.innerHTML = rows
    .map(([label, value]) => `<div class="state-card"><span>${label}</span><strong>${formatValue(value)}</strong></div>`)
    .join("");
}

function render() {
  const step = trace.steps[currentStepIndex];
  const state = step.state;

  elements.title.textContent = trace.title;
  elements.traceTitle.textContent = trace.title;
  elements.pattern.textContent = `${trace.pattern} · ${trace.visualType}`;
  elements.counter.textContent = `Step ${step.step} / ${trace.steps.length}`;
  elements.windowValues.textContent = formatWindow(state.window);
  elements.bestAnswer.textContent = formatValue(state.best);
  elements.action.textContent = step.action;
  elements.decision.textContent = step.decision;
  elements.why.textContent = step.why;

  renderProgress();
  renderArray(step);
  renderState(step);

  elements.prev.disabled = currentStepIndex === 0;
  elements.next.disabled = currentStepIndex === trace.steps.length - 1;
}

elements.prev.addEventListener("click", () => {
  currentStepIndex = Math.max(0, currentStepIndex - 1);
  render();
});

elements.next.addEventListener("click", () => {
  currentStepIndex = Math.min(trace.steps.length - 1, currentStepIndex + 1);
  render();
});

elements.reset.addEventListener("click", () => {
  currentStepIndex = 0;
  render();
});

render();
