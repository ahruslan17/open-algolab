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
      { id: "intro", number: "00", title: "Introduction", subtitle: "What OpenAlgoLab is", locked: false },
      { id: "sliding-window", number: "01", title: "Sliding Window", subtitle: "Maximum Sum Subarray of Size K", locked: false },
      { id: "two-pointers", number: "02", title: "Two Pointers", subtitle: "Coming next", locked: true },
      { id: "bfs", number: "03", title: "BFS", subtitle: "Coming next", locked: true }
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
          "Your goal is not to choose any three numbers. Your goal is to inspect every group of three numbers that stand next to each other. Because the groups are contiguous, the frame can move one position at a time.",
          "That word, contiguous, is the reason this pattern works. If candidates did not sit next to each other, there would be no simple frame to slide."
        ]
      },
      {
        title: "What problem are we solving here?",
        paragraphs: [
          "Given nums = [2, 1, 5, 1, 3, 2] and k = 3, we need the largest sum among all length-3 contiguous blocks. The possible blocks are [2, 1, 5], [1, 5, 1], [5, 1, 3], and [1, 3, 2].",
          "A brute-force solution would sum every block from scratch. That is correct, but it ignores the fact that two neighboring blocks mostly contain the same numbers.",
          "With n numbers and window size k, brute force costs O(n * k). Sliding Window reduces that to O(n) by reusing the previous sum."
        ]
      },
      {
        title: "The key observation",
        paragraphs: [
          "When the window moves from [2, 1, 5] to [1, 5, 1], we do not get a completely new group. The values 1 and 5 stay inside the frame. Only 2 leaves on the left, and a new 1 enters on the right.",
          "So we do not need to recompute the whole sum. If the old sum was 8, the new sum is 8 - 2 + 1 = 7. This is the whole point of Sliding Window: keep a summary of the current window, then update that summary when the boundaries move.",
          "For this problem, the summary is only window_sum. In harder fixed-size window problems, the summary might be a count, a frequency map, or a small queue."
        ]
      },
      {
        title: "State model",
        stateModel: [
          ["left", "Where the current frame starts."],
          ["right", "Where the current frame ends."],
          ["window_sum", "The sum of the values currently inside the frame."],
          ["best", "The largest valid window sum found so far."],
          ["invariant", "window_sum must always match the values currently inside the frame."]
        ]
      },
      {
        title: "The mental rule",
        paragraphs: [
          "Use Sliding Window when candidates are continuous segments and moving from one candidate to the next changes only a small part of the state.",
          "For fixed-size windows, the movement is simple: add the new right value, evaluate the window, remove the old left value, then slide forward.",
          "The safe order is add right, evaluate a full window, remove left, then move left. Evaluating too early or removing too early is the most common bug."
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
    code: {
      title: "Reference implementation",
      intro: "The code follows the same movement as the trace: add right, evaluate a full window, remove left, then move left.",
      lines: [
        "def max_sum_subarray_k(nums, k):",
        "    if k <= 0 or k > len(nums):",
        "        raise ValueError(\"invalid window size\")",
        "",
        "    window_sum = 0",
        "    best = None",
        "    left = 0",
        "",
        "    for right, value in enumerate(nums):",
        "        window_sum += value",
        "",
        "        if right - left + 1 == k:",
        "            best = window_sum if best is None else max(best, window_sum)",
        "            window_sum -= nums[left]",
        "            left += 1",
        "",
        "    return best"
      ]
    },
    whatToNotice: {
      title: "What to notice in the trace",
      items: [
        "Steps 1 and 2 build the first complete window, so they do not update best.",
        "From step 3 onward, every step evaluates exactly one full size-k window.",
        "Neighboring windows overlap; only the boundary values change.",
        "best changes only when the current full window beats the previous best.",
        "The answer is not the last window sum. It is the best value preserved across all valid windows."
      ]
    },
    edgeCases: {
      title: "Edge cases",
      items: [
        "k == 1: every single value is a valid window.",
        "k == len(nums): the whole array is the only valid window.",
        "Negative numbers: best must not start at 0.",
        "k <= 0 or k > len(nums): no valid fixed-size window exists."
      ]
    },
    mistakes: {
      title: "Common mistakes",
      items: [
        ["Updating best too early", "Only windows with exactly k values are valid candidates."],
        ["Removing left too soon", "Evaluate the full window before subtracting nums[left]."],
        ["Initializing best to 0", "This fails when all valid window sums are negative."],
        ["Returning the last window", "The last checked window is not necessarily the best one."],
        ["Mixing fixed and variable windows", "This problem does not need a shrink-until-valid while loop."]
      ]
    },
    practice: {
      title: "Practice next",
      intro: "Use the same shape with different state.",
      items: [
        "Average of Subarrays of Size K",
        "Maximum Number of Vowels in a Substring of Given Length",
        "First Negative Number in Every Window of Size K",
        "Find All Anagrams in a String",
        "Permutation in String"
      ],
      drillsTitle: "Mini drills",
      drills: [
        "[5], k = 1 -> 5",
        "[1, 2, 3], k = 3 -> 6",
        "[-5, -2, -7], k = 2 -> -7",
        "[4, 1, 1, 9, 1], k = 2 -> 10"
      ]
    },
    remember: {
      title: "The concept in one sentence",
      text: "When neighboring contiguous candidates overlap, keep the useful state, evaluate each valid window exactly once, and update only what changed at the boundaries."
    }
  },
  chapters: {
    intro: {
      hasTrace: false,
      eyebrow: "Chapter 00 · Introduction",
      title: "Welcome to OpenAlgoLab",
      hero: "OpenAlgoLab is a free and open-source project for learning algorithms visually, from first principles, and without memorizing templates.",
      kicker: "About the project",
      sections: [
        {
          title: "What is this project?",
          paragraphs: [
            "OpenAlgoLab is a local visual course for algorithms and problem-solving patterns. It combines textbook-style explanations with step-by-step interactive traces, so you can see not only the final code, but the movement of the algorithm.",
            "The project starts with interview-core patterns, such as Sliding Window, Two Pointers, BFS, Binary Search, and Dynamic Programming. Over time, it is intended to grow into a broader algorithm reference."
          ]
        },
        {
          title: "Why does it exist?",
          paragraphs: [
            "Many algorithm resources show a finished solution too quickly. That can make you memorize code without understanding why the algorithm works.",
            "OpenAlgoLab takes the opposite route: first the idea, then the state model, then the trace, and only after that the implementation. The goal is to make algorithms feel inspectable rather than mysterious."
          ]
        },
        {
          title: "How to use it",
          paragraphs: [
            "Read the chapter first. Try to understand what state the algorithm keeps and why it is enough.",
            "Then use the interactive trace. Move step by step and ask: what changed, what stayed the same, what decision did the algorithm make, and why is that decision safe?"
          ]
        },
        {
          title: "Who made it?",
          paragraphs: [
            "OpenAlgoLab was started by Ruslan as a free and open-source learning project. The purpose is to create algorithm explanations that are understandable, visual, and useful for self-study.",
            "The project is designed for contributors: new topics, translations, traces, examples, and better explanations should be easy to add without changing the whole app."
          ]
        },
        {
          title: "Project principles",
          bullets: [
            "Free and open-source by default.",
            "Understand the concept before memorizing code.",
            "Every complete algorithm topic should have a trace.",
            "Every trace step should explain what happened and why.",
            "The learning content should be language-agnostic; implementations can be added in multiple languages."
          ]
        }
      ],
      remember: {
        title: "Main promise",
        text: "After a good OpenAlgoLab chapter, you should understand what the algorithm is doing at every step, not just remember which template to paste."
      }
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
