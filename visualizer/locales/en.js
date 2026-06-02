window.OPENALGOLAB_LOCALES = window.OPENALGOLAB_LOCALES || {};

window.OPENALGOLAB_LOCALES.en = {
  meta: {
    label: "English",
    htmlLang: "en"
  },
  sidebar: {
    brandSubtitle: "Local visual course",
    modes: [
      { id: "core", label: "Core Patterns" },
      { id: "practice", label: "Practice" }
    ],
    navLabel: "Core Patterns",
    items: [
      { id: "intro", number: "00", title: "Introduction", subtitle: "What OpenAlgoLab is", locked: false },
      { id: "sliding-window", number: "01", title: "Sliding Window", subtitle: "Maximum Sum Subarray of Size K", locked: false },
      { id: "two-pointers", number: "02", title: "Two Pointers", subtitle: "Two Sum II", locked: false },
      { id: "bfs", number: "03", title: "BFS", subtitle: "Coming next", locked: true }
    ],
    noteTitle: "How to study this",
    noteText: "Do not memorize the template. First understand what the window represents, then play the trace step by step."
  },
  practiceCatalog: {
    navLabel: "Practice",
    chapterSubtitle: "Practice set",
    eyebrow: "Practice · Curated problem list",
    title: "Practice by Pattern",
    hero: "Use this catalog after the core explanations. Pick a task, name the pattern signal, then solve it on the linked platform when available.",
    kicker: "Problem catalog",
    sectionEyebrow: "Pattern practice",
    tasksEyebrow: "Task list",
    tasksTitle: "Practice tasks",
    problemCountLabel: "practice tasks",
    statsAria: "Practice catalog stats",
    labels: {
      platform: "Platform",
      difficulty: "Difficulty",
      group: "Group",
      signal: "Pattern signal:",
      focus: "Focus:"
    }
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
      ariaLabel: "Sliding window movement",
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
      implementations: [
        {
          id: "python",
          label: "Python"
        },
        {
          id: "cpp",
          label: "C++"
        }
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
      title: "Practice",
      intro: "OpenAlgoLab does not host submissions. Use this section to understand the pattern, then solve on the linked platform when available.",
      howTitle: "How to practice this pattern",
      howItems: [
        "Identify what enters the window when right moves.",
        "Identify what leaves when the window reaches size k.",
        "Keep a small state that can be updated in O(1).",
        "Update the answer only when the window is valid."
      ],
      tableHeaders: {
        problem: "Problem",
        platform: "Platform",
        difficulty: "Difficulty",
        signal: "Pattern signal",
        focus: "Focus"
      },
      guidedTitle: "Guided problems",
      guidedProblems: [
        {
          name: "Maximum Sum Subarray of Size K",
          url: "../patterns/sliding-window/max-sum-subarray-k/",
          platform: "OpenAlgoLab",
          difficulty: "Beginner",
          signal: "Contiguous subarray with exactly k elements.",
          focus: "Maintain window_sum, remove the left value at the right time, and initialize best safely."
        }
      ],
      practiceOnlyTitle: "More problems",
      practiceOnlyProblems: [
        {
          name: "Contains Duplicate II",
          url: "https://leetcode.com/problems/contains-duplicate-ii/",
          platform: "LeetCode 219",
          difficulty: "Easy",
          signal: "Need to know whether equal values appear within a distance of k.",
          focus: "Keep only the last k values in the window and update membership as the window moves."
        },
        {
          name: "Maximum Number of Vowels in a Substring of Given Length",
          url: "https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length/",
          platform: "LeetCode 1456",
          difficulty: "Medium",
          signal: "Fixed-length substring, maximize a count.",
          focus: "Replace window_sum with vowel_count and update it when characters enter or leave."
        },
        {
          name: "Find All Anagrams in a String",
          url: "https://leetcode.com/problems/find-all-anagrams-in-a-string/",
          platform: "LeetCode 438",
          difficulty: "Medium",
          signal: "Fixed-length substring plus character frequencies.",
          focus: "Track frequency differences and record every window that matches the target counts."
        },
        {
          name: "Permutation in String",
          url: "https://leetcode.com/problems/permutation-in-string/",
          platform: "LeetCode 567",
          difficulty: "Medium",
          signal: "Fixed-length substring asks whether a permutation exists.",
          focus: "Use the same frequency-map idea as anagrams, but return as soon as a match appears."
        }
      ]
    },
    remember: {
      title: "The concept in one sentence",
      text: "When neighboring contiguous candidates overlap, keep the useful state, evaluate each valid window exactly once, and update only what changed at the boundaries."
    }
  },
  twoPointers: {
    eyebrow: "Chapter 02 · Opposite-direction Two Pointers",
    title: "Two Sum II",
    hero: "Two Pointers uses the sorted order of an array to turn one comparison into a safe movement decision.",
    kicker: "Sorted order creates direction",
    summaryLabels: {
      current: "Current pair",
      answer: "Answer indexes"
    },
    sections: [
      {
        title: "Start with the two ends",
        paragraphs: [
          "Imagine the sorted array as a line of numbers. Put one pointer at the smallest value and one pointer at the largest value.",
          "The current pair gives a sum. Because the array is sorted, that sum tells us which side can move safely.",
          "If the sum is too small, we need a larger value, so left moves right. If the sum is too large, we need a smaller value, so right moves left."
        ]
      },
      {
        title: "What problem are we solving here?",
        paragraphs: [
          "Given numbers = [1, 2, 4, 6, 10] and target = 8, we need two values that add up to 8.",
          "A brute-force solution checks every pair. That is correct, but it ignores sorted order.",
          "Two Pointers reduces O(n^2) pair checking to O(n) by discarding many impossible pairs after each comparison."
        ]
      },
      {
        title: "The key observation",
        paragraphs: [
          "Start with 1 + 10 = 11. The sum is too large. Keeping 10 cannot help because moving left rightward would only make the sum larger, so right must move left.",
          "Then 1 + 6 = 7. The sum is too small. Keeping 1 cannot help because moving right leftward would only make the sum smaller, so left must move right.",
          "Finally 2 + 6 = 8. The target is found."
        ]
      },
      {
        title: "State model",
        stateModel: [
          ["left", "Index of the smaller current candidate."],
          ["right", "Index of the larger current candidate."],
          ["current_sum", "numbers[left] + numbers[right]."],
          ["target", "The sum we need to reach."],
          ["invariant", "If a valid pair still exists, it is inside [left, right]."]
        ]
      },
      {
        title: "The mental rule",
        paragraphs: [
          "Use opposite-direction Two Pointers when sorted order makes a pointer move safe.",
          "For pair sums, too small means move left rightward; too large means move right leftward.",
          "The algorithm is not guessing. Each move discards only pairs that cannot be the answer."
        ]
      }
    ],
    conceptStrip: {
      ariaLabel: "Two pointers movement",
      oldLabel: "Too large",
      oldWindow: "1 + 10 = 11 > 8, move right",
      newLabel: "Too small",
      newWindow: "1 + 6 = 7 < 8, move left",
      explanation: "Sorted order gives direction. When the sum is too high, decrease the larger side. When the sum is too low, increase the smaller side."
    },
    example: {
      inputLabel: "Input",
      input: "numbers = [1, 2, 4, 6, 10], target = 8",
      answerLabel: "Answer",
      answer: "[2, 4] in 1-based indexing because numbers[1] + numbers[3] = 2 + 6"
    },
    formula: "current_sum = numbers[left] + numbers[right]",
    code: {
      title: "Reference implementation",
      intro: "The code follows the trace: compare the current pair, then move the pointer that can safely discard impossible pairs.",
      implementations: [
        {
          id: "python",
          label: "Python"
        },
        {
          id: "cpp",
          label: "C++"
        }
      ]
    },
    whatToNotice: {
      title: "What to notice in the trace",
      items: [
        "The pointers start at opposite ends to test the widest pair.",
        "Every comparison discards a group of impossible pairs.",
        "If the sum is too large, right moves left.",
        "If the sum is too small, left moves right.",
        "The classic problem returns 1-based indexes, not 0-based indexes."
      ]
    },
    edgeCases: {
      title: "Edge cases",
      items: [
        "Exactly two numbers: the first comparison decides the answer.",
        "Negative numbers still work if the array is sorted.",
        "Duplicate values are valid if they live at different indexes.",
        "Some variants do not guarantee an answer, so handle the not-found case."
      ]
    },
    mistakes: {
      title: "Common mistakes",
      items: [
        ["Forgetting sorted order", "The movement logic only works because the input is sorted."],
        ["Moving the wrong pointer", "Too small moves left rightward; too large moves right leftward."],
        ["Returning 0-based indexes", "The classic problem expects 1-based indexes."],
        ["Continuing after found", "Return as soon as current_sum equals target."],
        ["Using nested loops by habit", "Sorted order lets one comparison discard many pairs."]
      ]
    },
    practice: {
      title: "Practice",
      intro: "OpenAlgoLab does not host submissions. Use this section to understand pointer movement, then solve on the linked platform.",
      howTitle: "How to practice this pattern",
      howItems: [
        "Check whether the input is sorted or can be sorted safely.",
        "Ask what the current comparison proves.",
        "Move only the pointer that cannot discard a valid answer.",
        "Watch how duplicates change the implementation."
      ],
      tableHeaders: {
        problem: "Problem",
        platform: "Platform",
        difficulty: "Difficulty",
        signal: "Pattern signal",
        focus: "Focus"
      },
      guidedTitle: "Guided problems",
      guidedProblems: [
        {
          name: "Two Sum II - Input Array Is Sorted",
          url: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/",
          platform: "LeetCode 167",
          difficulty: "Medium",
          signal: "Sorted array, find one pair with a target sum.",
          focus: "Use the sum comparison to prove whether left or right can move safely."
        }
      ],
      practiceOnlyTitle: "More problems",
      practiceOnlyProblems: [
        {
          name: "Valid Palindrome",
          url: "https://leetcode.com/problems/valid-palindrome/",
          platform: "LeetCode 125",
          difficulty: "Easy",
          signal: "Compare matching characters from both ends.",
          focus: "Move inward after each valid comparison and skip ignored characters carefully."
        },
        {
          name: "Squares of a Sorted Array",
          url: "https://leetcode.com/problems/squares-of-a-sorted-array/",
          platform: "LeetCode 977",
          difficulty: "Easy",
          signal: "Sorted input, largest square may be at either end.",
          focus: "Compare absolute values and fill the output from right to left."
        },
        {
          name: "Container With Most Water",
          url: "https://leetcode.com/problems/container-with-most-water/",
          platform: "LeetCode 11",
          difficulty: "Medium",
          signal: "Two ends form a candidate, width shrinks each step.",
          focus: "Move the pointer at the smaller height and understand why the other move cannot help."
        },
        {
          name: "3Sum",
          url: "https://leetcode.com/problems/3sum/",
          platform: "LeetCode 15",
          difficulty: "Medium",
          signal: "Sort, fix one value, then find pairs in the remaining range.",
          focus: "Avoid duplicate triplets and reuse the Two Sum II movement inside each fixed range."
        }
      ]
    },
    remember: {
      title: "The concept in one sentence",
      text: "When sorted order makes one side provably too small or too large, move the pointer that safely discards impossible pairs."
    },
    trace: {
      title: "Two Sum II",
      pattern: "Two Pointers",
      steps: [
        {
          action: "Compare numbers[0] + numbers[4] = 1 + 10.",
          decision: "The sum is 11, which is greater than target = 8, so right moves left.",
          why: "Keeping 10 cannot help because moving left rightward would only make the sum larger or equal."
        },
        {
          action: "Compare numbers[0] + numbers[3] = 1 + 6.",
          decision: "The sum is 7, which is smaller than target = 8, so left moves right.",
          why: "Keeping 1 cannot help because moving right leftward would only make the sum smaller or equal."
        },
        {
          action: "Compare numbers[1] + numbers[3] = 2 + 6 using 0-based pointer indexes.",
          decision: "The sum is 8, so the target is found.",
          why: "The pointer indexes are [1, 3] in 0-based form, so the returned 1-based answer is [2, 4]."
        }
      ]
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
    patternSuffixes: {
      "array-window": "array-window",
      "two-pointers": "opposite-direction"
    },
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
    loadingTrace: "Loading trace data...",
    traceLoadError: "Could not load trace.json. Run the visualizer through the local server and check visualizer/modules.json",
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
