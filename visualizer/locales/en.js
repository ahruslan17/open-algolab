window.OPENALGOLAB_LOCALES = window.OPENALGOLAB_LOCALES || {};

window.OPENALGOLAB_LOCALES.en = {
  meta: {
    label: "English",
    htmlLang: "en"
  },
  sidebar: {
    brandSubtitle: "Local visual course",
    navLabel: "Core Patterns",
    items: [
      { number: "01", title: "Sliding Window", subtitle: "Maximum Sum Subarray of Size K", locked: false },
      { number: "02", title: "Two Pointers", subtitle: "Coming next", locked: true },
      { number: "03", title: "BFS", subtitle: "Coming next", locked: true }
    ],
    noteTitle: "How to study this",
    noteText: "Do not memorize the template. First understand what the window represents, then play the trace step by step."
  },
  lesson: {
    eyebrow: "Chapter 01 · Fixed-size Sliding Window",
    title: "Maximum Sum Subarray of Size K",
    hero: "Sliding Window is not a magic template. It is a way to avoid doing the same work again when neighboring segments overlap.",
    kicker: "Intuition before code",
    sections: [
      {
        title: "Start with the picture",
        paragraphs: [
          "Imagine the array as a tape of numbers, and imagine placing a small frame over three neighboring values. That frame is the window. In this problem the frame always has width k = 3.",
          "Your goal is not to choose any three numbers. Your goal is to inspect every group of three numbers that stand next to each other. Because the groups are contiguous, the frame can move one position at a time."
        ]
      },
      {
        title: "What problem are we solving here?",
        paragraphs: [
          "Given nums = [2, 1, 5, 1, 3, 2] and k = 3, we need the largest sum among all length-3 contiguous blocks. The possible blocks are [2, 1, 5], [1, 5, 1], [5, 1, 3], and [1, 3, 2].",
          "A brute-force solution would sum every block from scratch. That is correct, but it ignores the fact that two neighboring blocks mostly contain the same numbers."
        ]
      },
      {
        title: "The key observation",
        paragraphs: [
          "When the window moves from [2, 1, 5] to [1, 5, 1], we do not get a completely new group. The values 1 and 5 stay inside the frame. Only 2 leaves on the left, and a new 1 enters on the right.",
          "So we do not need to recompute the whole sum. If the old sum was 8, the new sum is 8 - 2 + 1 = 7. This is the whole point of Sliding Window: keep a summary of the current window, then update that summary when the boundaries move."
        ]
      },
      {
        title: "State model",
        stateModel: [
          ["left", "Where the current frame starts."],
          ["right", "Where the current frame ends."],
          ["window_sum", "The sum of the values currently inside the frame."],
          ["best", "The largest valid window sum found so far."]
        ]
      },
      {
        title: "The mental rule",
        paragraphs: [
          "Use Sliding Window when candidates are continuous segments and moving from one candidate to the next changes only a small part of the state.",
          "For fixed-size windows, the movement is simple: add the new right value, evaluate the window, remove the old left value, then slide forward."
        ]
      }
    ],
    conceptStrip: {
      oldLabel: "Current frame",
      oldWindow: "[2, 1, 5] sum = 8",
      newLabel: "After sliding",
      newWindow: "[1, 5, 1] sum = 8 - 2 + 1",
      explanation: "The middle values stay. Only the boundary values change. That is why the algorithm can update the sum in O(1) time instead of summing the whole window again."
    },
    example: {
      inputLabel: "Input",
      input: "nums = [2, 1, 5, 1, 3, 2], k = 3",
      answerLabel: "Answer",
      answer: "9 from the window [5, 1, 3]"
    },
    formula: "new_sum = old_sum - value_leaving_left + value_entering_right",
    remember: {
      title: "The concept in one sentence",
      text: "When neighboring contiguous candidates overlap, keep the useful state and update only what changed at the boundaries."
    }
  },
  lab: {
    eyebrow: "Interactive Trace",
    patternSuffix: "array-window",
    stepLabel: "Step",
    currentWindow: "Current window",
    bestAnswer: "Best answer",
    labels: {
      action: "Action",
      decision: "Decision",
      why: "Why"
    },
    controls: {
      previous: "Previous",
      next: "Next",
      reset: "Reset"
    },
    indexLabel: "index",
    progressAria: "Go to step"
  },
  trace: {
    title: "Maximum Sum Subarray of Size K",
    pattern: "Sliding Window",
    steps: [
      {
        action: "Put the frame over the first value: nums[0] = 2.",
        decision: "The frame is not full yet: it contains 1 value, but k = 3.",
        why: "We cannot compare this sum with the answer yet. The problem asks only for windows of exactly 3 values."
      },
      {
        action: "Extend the frame to include nums[1] = 1.",
        decision: "The frame still is not full: it contains 2 values, but k = 3.",
        why: "We are still building the first complete candidate window. No value leaves yet."
      },
      {
        action: "Add nums[2] = 5. The first full window is [2, 1, 5].",
        decision: "Its sum is 8, so best becomes 8. Before moving on, 2 will leave from the left.",
        why: "This is the first valid length-3 window, so it is the best answer seen so far."
      },
      {
        action: "Slide one step: remove 2, add nums[3] = 1. The window is now [1, 5, 1].",
        decision: "The sum is 7, which is worse than best = 8.",
        why: "The window is valid, but it does not improve the answer. We keep best unchanged."
      },
      {
        action: "Slide again: remove 1, add nums[4] = 3. The window is now [5, 1, 3].",
        decision: "The sum is 9, which is better than best = 8, so best becomes 9.",
        why: "The whole algorithm exists to compare every valid window while avoiding repeated summation. This window is the best so far."
      },
      {
        action: "Slide one last time: remove 5, add nums[5] = 2. The window is now [1, 3, 2].",
        decision: "The sum is 6, which does not beat best = 9.",
        why: "All length-3 windows have now been checked. The final answer is the best value we kept: 9."
      }
    ]
  }
};
