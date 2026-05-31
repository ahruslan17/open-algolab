# OpenAlgoLab Curriculum

Date: 2026-06-01

## Goal

This document defines the planned learning path for OpenAlgoLab.

OpenAlgoLab is organized around **problem-solving patterns**, not around isolated algorithms. Each chapter should teach how to recognize a pattern, how its state moves, why it works, and how common variations change the implementation.

Every completed chapter must include at least one step-by-step trace.

Core rule:

```text
No topic is complete without a trace.
```

## Learning Order

The curriculum should move from simple state movement to more complex structures:

1. Arrays and pointers
2. Prefix-based state
3. Stacks and queues
4. Binary search
5. Hashing patterns
6. Trees
7. Graph traversal
8. Shortest paths and graph optimization
9. Heaps and priority queues
10. Intervals
11. Backtracking
12. Dynamic programming
13. Greedy algorithms
14. Union Find
15. Advanced patterns

The first public milestone should not try to cover everything. It should make the format excellent for a few foundational patterns.

## Milestone 1: Core Visual Patterns

Goal: prove the OpenAlgoLab format with simple, high-signal patterns.

### Chapter 1: Fixed-size Sliding Window

Core idea: maintain a contiguous window of fixed length and update its state in O(1) while it moves.

Primary trace:

- Maximum Sum Subarray of Size K

Topics:

- Window boundaries: `left`, `right`
- Running state: `window_sum`, `best`
- Valid window condition: `right - left + 1 == k`
- Slide operation: add new right value, remove old left value
- Why this avoids recomputing every window

Variations:

- Average of Subarrays of Size K
- Maximum Sum Subarray of Size K
- First Negative Number in Every Window
- Maximum Number of Vowels in a Substring of Given Length
- Permutation in String with fixed-size frequency window

Common mistakes:

- Updating answer before window reaches size `k`
- Removing `nums[left]` at the wrong time
- Off-by-one in window size
- Forgetting to handle `k > len(nums)`

Required visual type:

- Array renderer with `left`, `right`, highlighted window, state panel

### Chapter 2: Variable-size Sliding Window

Core idea: expand the right boundary and shrink the left boundary while maintaining a condition.

Primary trace:

- Longest Substring Without Repeating Characters

Topics:

- Expand/shrink loop
- Window validity condition
- Frequency map / set as window state
- When to update answer: before or after shrinking
- Difference between fixed-size and variable-size windows

Variations:

- Minimum Size Subarray Sum
- Longest Substring Without Repeating Characters
- Longest Substring with At Most K Distinct Characters
- Fruit Into Baskets
- Minimum Window Substring
- Max Consecutive Ones III

Common mistakes:

- Shrinking only once when a `while` loop is required
- Updating answer while the window is invalid
- Removing characters incorrectly from the frequency map
- Confusing "at most K" with "exactly K"

Required visual type:

- Array/string renderer with window highlight and frequency/state panel

### Chapter 3: Two Pointers

Core idea: use two indices that move according to a decision rule, usually to avoid nested loops.

Primary trace:

- Two Sum II: Input Array Is Sorted

Topics:

- Opposite-direction pointers
- Same-direction pointers
- Decision-based pointer movement
- Sorted input as a key precondition
- Why pointer movement does not miss answers

Variations:

- Two Sum II
- Valid Palindrome
- Remove Duplicates from Sorted Array
- Squares of a Sorted Array
- Container With Most Water
- 3Sum
- Trapping Rain Water

Common mistakes:

- Moving the wrong pointer
- Forgetting sorted-input assumptions
- Infinite loops when pointers are not advanced
- Mishandling duplicates in 3Sum-style problems

Required visual type:

- Array renderer with `left`, `right`, comparisons, and discarded regions

### Chapter 4: Prefix Sum

Core idea: precompute cumulative state so range queries can be answered in O(1), or use prefix differences to detect subarrays.

Primary trace:

- Subarray Sum Equals K

Topics:

- Prefix sum definition
- Range sum formula
- Prefix sum with hash map
- Difference between `prefix[j] - prefix[i]` and subarray sum
- Counting subarrays by previous prefix values

Variations:

- Range Sum Query Immutable
- Subarray Sum Equals K
- Continuous Subarray Sum
- Product Except Self as prefix/suffix pattern
- Pivot Index
- Difference Array for range updates

Common mistakes:

- Off-by-one in prefix array size
- Forgetting initial prefix `0`
- Updating prefix count before checking target
- Confusing index ranges with value ranges

Required visual type:

- Array renderer plus prefix table/state panel

## Milestone 2: Search And Monotonic Structures

Goal: cover patterns that are common in interviews and benefit strongly from visual state.

### Chapter 5: Binary Search

Core idea: repeatedly discard half of a sorted search space while preserving an invariant.

Primary trace:

- Classic Binary Search

Topics:

- `left`, `mid`, `right`
- Search invariants
- Inclusive vs exclusive boundaries
- Termination conditions
- Why half of the search space can be discarded

Variations:

- Classic Binary Search
- First Bad Version
- Search Insert Position
- First and Last Position of Element
- Search in Rotated Sorted Array
- Find Minimum in Rotated Sorted Array

Common mistakes:

- Infinite loop from wrong `mid` or boundary update
- Mixing inclusive and exclusive bounds
- Losing the answer candidate
- Incorrect handling of duplicates

Required visual type:

- Array renderer with `left`, `mid`, `right`, discarded ranges

### Chapter 6: Binary Search On Answer

Core idea: binary search over possible answers when feasibility is monotonic.

Primary trace:

- Koko Eating Bananas

Topics:

- Answer space vs array index space
- Monotonic predicate
- Feasibility check
- Minimizing valid answer / maximizing valid answer
- Preserving candidate answer

Variations:

- Koko Eating Bananas
- Capacity To Ship Packages Within D Days
- Split Array Largest Sum
- Minimum Number of Days to Make Bouquets
- Aggressive Cows
- Minimize Maximum Distance to Gas Station

Common mistakes:

- Defining a non-monotonic predicate
- Choosing wrong lower/upper bounds
- Returning invalid boundary
- Confusing minimize-valid and maximize-valid templates

Required visual type:

- Number-line renderer or array renderer for answer space

### Chapter 7: Monotonic Stack

Core idea: maintain a stack with monotonic order so each element is pushed and popped at most once.

Primary trace:

- Next Greater Element

Topics:

- Increasing vs decreasing stack
- Stack stores indices vs values
- Pop condition
- Current element as resolver of previous elements
- Why total complexity is O(n)

Variations:

- Next Greater Element
- Daily Temperatures
- Online Stock Span
- Largest Rectangle in Histogram
- Remove K Digits
- Sum of Subarray Minimums

Common mistakes:

- Storing values when indices are needed
- Wrong comparison: `<` vs `<=`
- Forgetting unresolved stack elements
- Not understanding why nested-looking pops are still O(n)

Required visual type:

- Array renderer + stack renderer

### Chapter 8: Queue And Deque Patterns

Core idea: use queues/deques to maintain processing order or a rolling optimum.

Primary trace:

- Sliding Window Maximum

Topics:

- FIFO queue

- Deque as monotonic structure
- Removing out-of-window indices
- Maintaining max/min candidates

Variations:

- Sliding Window Maximum
- Moving Average from Data Stream
- Recent Counter
- Shortest Subarray with Sum at Least K

Common mistakes:

- Removing values instead of indices
- Forgetting to evict out-of-window elements
- Wrong deque monotonic direction
- Returning max before window is valid

Required visual type:

- Array renderer + deque renderer

## Milestone 3: Hashing And Counting

Goal: teach state compression and fast lookup patterns.

### Chapter 9: Hash Map Lookup

Core idea: replace repeated searching with stored lookup state.

Primary trace:

- Two Sum

Topics:

- Complement lookup
- Store-before-check vs check-before-store
- Frequency map
- Index map

Variations:

- Two Sum
- Contains Duplicate
- Valid Anagram
- Group Anagrams
- Longest Consecutive Sequence

Common mistakes:

- Using the same element twice in Two Sum
- Losing indices when overwriting map values
- Confusing frequency maps and sets
- Sorting when hashing is more appropriate

Required visual type:

- Array renderer + map/state panel

### Chapter 10: Frequency Counting

Core idea: represent repeated elements as counts and compare/update count state.

Primary trace:

- Valid Anagram

Topics:

- Count map

- Fixed alphabet arrays
- Difference counts
- Frequency equality

Variations:

- Valid Anagram
- Ransom Note
- Find All Anagrams in a String
- Top K Frequent Elements
- Sort Characters by Frequency

Common mistakes:

- Forgetting to decrement counts
- Leaving zero-count keys in maps
- Comparing maps too often instead of tracking matched counts
- Using O(n log n) sort when O(n) counting is clearer

Required visual type:

- Frequency table renderer

## Milestone 4: Trees

Goal: make recursive and level-order state visible.

### Chapter 11: Tree DFS

Core idea: explore a tree by going deep first, using recursion or an explicit stack.

Primary trace:

- Maximum Depth of Binary Tree

Topics:

- Preorder, inorder, postorder
- Recursive call stack
- Base cases
- Returning values from subtrees
- Path state

Variations:

- Maximum Depth of Binary Tree
- Diameter of Binary Tree
- Balanced Binary Tree
- Path Sum
- Lowest Common Ancestor
- Validate Binary Search Tree

Common mistakes:

- Missing base case
- Confusing preorder/inorder/postorder timing
- Using global state incorrectly
- Forgetting to backtrack path state

Required visual type:

- Tree renderer + call stack panel

### Chapter 12: Tree BFS

Core idea: process tree nodes level by level using a queue.

Primary trace:

- Binary Tree Level Order Traversal

Topics:

- Queue state

- Level boundaries

- Processing children

- BFS vs DFS choice

Variations:

- Binary Tree Level Order Traversal
- Zigzag Level Order Traversal
- Minimum Depth of Binary Tree
- Right Side View
- Populating Next Right Pointers

Common mistakes:

- Losing level boundaries
- Mutating queue while iterating incorrectly
- Appending children in wrong order
- Confusing node count per level with total queue size

Required visual type:

- Tree renderer + queue renderer

## Milestone 5: Graphs

Goal: make traversal state, visited state, and frontier management explicit.

### Chapter 13: Graph BFS

Core idea: explore graph nodes by distance layers using a queue.

Primary trace:

- BFS Graph Traversal

Topics:

- Queue/frontier

- Visited set

- Current node and current edge

- Shortest path in unweighted graphs

- Multi-source BFS

Variations:

- Number of Islands
- Rotting Oranges
- Shortest Path in Binary Matrix
- Word Ladder
- Walls and Gates
- Open the Lock

Common mistakes:

- Marking visited too late
- Revisiting nodes
- Mixing level count with step count
- Forgetting boundary checks in grid BFS

Required visual type:

- Graph/grid renderer + queue renderer + visited panel

### Chapter 14: Graph DFS

Core idea: explore connected components and paths by going deep first.

Primary trace:

- Number of Connected Components

Topics:

- Recursive DFS

- Iterative DFS

- Visited set

- Component discovery

- Cycle detection basics

Variations:

- Number of Islands
- Clone Graph
- Course Schedule DFS cycle detection
- Surrounded Regions
- Pacific Atlantic Water Flow
- Reconstruct Itinerary

Common mistakes:

- Missing visited checks
- Stack overflow in deep recursion
- Confusing directed and undirected cycle detection
- Not backtracking when path-specific state is used

Required visual type:

- Graph/grid renderer + stack/call stack renderer

### Chapter 15: Topological Sort

Core idea: order directed graph nodes so dependencies come before dependents.

Primary trace:

- Course Schedule II

Topics:

- Directed acyclic graph

- In-degree

- Kahn's algorithm

- DFS postorder approach

- Cycle detection

Variations:

- Course Schedule
- Course Schedule II
- Alien Dictionary
- Minimum Height Trees
- Build Matrix With Conditions

Common mistakes:

- Reversing edge direction
- Forgetting to detect cycles
- Incorrect in-degree initialization
- Returning partial order as valid

Required visual type:

- Graph renderer + queue/in-degree table

## Milestone 6: Shortest Paths And Graph Optimization

Goal: teach weighted graph state and relaxation.

### Chapter 16: Dijkstra's Algorithm

Core idea: repeatedly finalize the nearest unvisited node using a priority queue.

Primary trace:

- Network Delay Time

Topics:

- Distance table

- Priority queue

- Edge relaxation

- Finalized nodes

- Why non-negative weights are required

Variations:

- Network Delay Time
- Path With Minimum Effort
- Cheapest Flights Within K Stops as modified shortest path
- Swim in Rising Water

Common mistakes:

- Using Dijkstra with negative edges
- Not skipping stale priority queue entries
- Marking visited too early in modified variants
- Confusing BFS and Dijkstra conditions

Required visual type:

- Weighted graph renderer + priority queue + distance table

### Chapter 17: Bellman-Ford And Relaxation

Core idea: relax every edge repeatedly to handle negative weights and detect negative cycles.

Primary trace:

- Cheapest Flights Within K Stops

Topics:

- Repeated relaxation

- Previous vs current distance arrays

- Negative edge handling

- Negative cycle detection

Variations:

- Cheapest Flights Within K Stops
- Detect Negative Cycle
- Single-source shortest path with negative weights

Common mistakes:

- Updating distances in-place when layer separation is required
- Wrong number of relaxation rounds
- Confusing stops with edges
- Not detecting negative cycles correctly

Required visual type:

- Edge list renderer + distance table

## Milestone 7: Heaps And Priority Queues

Goal: explain dynamic best-candidate selection.

### Chapter 18: Heap Basics And Top K

Core idea: use a heap to repeatedly access the smallest/largest candidate efficiently.

Primary trace:

- Top K Frequent Elements

Topics:

- Min-heap vs max-heap

- Heap size control

- Frequency + heap combination

- Streaming top-k

Variations:

- Kth Largest Element in an Array

- Top K Frequent Elements

- K Closest Points to Origin

- Find Median from Data Stream

- Merge K Sorted Lists

Common mistakes:

- Using full sort when heap is better

- Wrong heap direction

- Not controlling heap size

- Forgetting language-specific min-heap defaults

Required visual type:

- Heap renderer + array/map state

## Milestone 8: Intervals

Goal: teach sorting-based reasoning over ranges.

### Chapter 19: Interval Merging

Core idea: sort intervals and combine overlapping ranges.

Primary trace:

- Merge Intervals

Topics:

- Sorting by start

- Current merged interval

- Overlap condition

- Non-overlap flush

Variations:

- Merge Intervals

- Insert Interval

- Non-overlapping Intervals

- Meeting Rooms

- Meeting Rooms II


Common mistakes:

- Wrong overlap condition

- Forgetting to append the last interval

- Sorting by end when start is required

- Mutating intervals unexpectedly

Required visual type:

- Timeline/interval renderer

### Chapter 20: Sweep Line

Core idea: convert intervals/events into ordered boundary changes and scan them.

Primary trace:

- Meeting Rooms II

Topics:

- Start/end events

- Active count

- Tie-breaking rules

- Maximum overlap

Variations:

- Meeting Rooms II

- Car Pooling

- My Calendar I

- Employee Free Time

Common mistakes:

- Wrong event ordering for equal timestamps

- Forgetting to decrement active count

- Confusing inclusive/exclusive endpoints

Required visual type:

- Timeline renderer + active count panel

## Milestone 9: Backtracking

Goal: make decision trees and undo steps visible.

### Chapter 21: Subsets, Permutations, Combinations

Core idea: explore a decision tree while maintaining a partial solution.

Primary trace:

- Subsets

Topics:

- Decision tree

- Choose/explore/unchoose

- Path state

- Start index

- Duplicate handling

Variations:

- Subsets

- Subsets II

- Permutations

- Permutations II

- Combination Sum

- Combination Sum II

Common mistakes:

- Forgetting to backtrack

- Reusing elements when not allowed

- Mishandling duplicates

- Appending mutable path without copying

Required visual type:

- Decision tree renderer + recursion stack/path panel

### Chapter 22: Constraint Backtracking

Core idea: build candidates while pruning invalid partial solutions.

Primary trace:

- N-Queens

Topics:

- Validity checks

- Constraint sets

- Pruning

- Board state

Variations:

- N-Queens

- Sudoku Solver

- Word Search

- Generate Parentheses

Common mistakes:

- Checking constraints too late

- Forgetting to undo board changes

- Inefficient validity checks

- Confusing path state and global state

Required visual type:

- Grid/board renderer + recursion stack

## Milestone 10: Dynamic Programming

Goal: make recurrence, state, and dependency structure visible.

### Chapter 23: 1D Dynamic Programming

Core idea: solve a problem by storing answers to smaller subproblems in a one-dimensional state.

Primary trace:

- Climbing Stairs

Topics:

- State definition

- Transition formula

- Base cases

- Bottom-up vs top-down

- Space optimization

Variations:

- Climbing Stairs

- House Robber

- Min Cost Climbing Stairs

- Decode Ways

- Coin Change

- Longest Increasing Subsequence

Common mistakes:

- Weak state definition

- Missing base cases

- Wrong iteration order

- Premature space optimization before understanding recurrence

Required visual type:

- Array/table renderer + formula panel

### Chapter 24: 2D Dynamic Programming

Core idea: solve subproblems indexed by two dimensions and fill a table based on dependencies.

Primary trace:

- Unique Paths

Topics:

- Grid/table state

- Dependency cells

- Row-major fill order

- Boundary initialization

Variations:

- Unique Paths

- Minimum Path Sum

- Longest Common Subsequence

- Edit Distance

- Maximal Square

Common mistakes:

- Wrong table dimensions

- Incorrect boundary initialization

- Filling cells before dependencies exist

- Confusing substring and subsequence state

Required visual type:

- Table renderer with current cell and dependency highlights

### Chapter 25: Knapsack Patterns

Core idea: choose items under constraints while optimizing value or feasibility.

Primary trace:

- 0/1 Knapsack

Topics:

- Include/exclude decision

- Capacity dimension

- 0/1 vs unbounded choices

- Iteration direction for 1D optimization

Variations:

- 0/1 Knapsack

- Partition Equal Subset Sum

- Target Sum

- Coin Change

- Coin Change II


Common mistakes:

- Wrong iteration direction

- Confusing combinations and permutations

- Mixing 0/1 and unbounded transitions

- Incorrect base values for impossible states

Required visual type:

- Table renderer + include/exclude explanation

## Milestone 11: Greedy Algorithms

Goal: teach local-choice reasoning and proof intuition.

### Chapter 26: Greedy Choice

Core idea: make a locally optimal choice that can be proven safe.

Primary trace:

- Jump Game

Topics:

- Greedy invariant

- Current best reach

- Local choice vs global optimum

- Exchange argument intuition

Variations:

- Jump Game

- Jump Game II

- Gas Station

- Assign Cookies

- Queue Reconstruction by Height

- Task Scheduler

Common mistakes:

- Using greedy without a valid invariant

- Choosing locally obvious but globally wrong criteria

- Not proving why a choice is safe

Required visual type:

- Array/timeline renderer + invariant panel

### Chapter 27: Greedy Intervals

Core idea: sort by the right criterion and make safe interval selections.

Primary trace:

- Non-overlapping Intervals

Topics:

- Sort by end time

- Keep earliest finishing interval

- Count removals or selections

Variations:

- Non-overlapping Intervals

- Minimum Number of Arrows to Burst Balloons

- Activity Selection

- Meeting scheduling variants

Common mistakes:

- Sorting by start instead of end

- Wrong overlap condition

- Not preserving greedy invariant

Required visual type:

- Interval renderer

## Milestone 12: Union Find

Goal: explain dynamic connectivity and component merging.

### Chapter 28: Disjoint Set Union

Core idea: maintain connected components with efficient find and union operations.

Primary trace:

- Number of Connected Components in an Undirected Graph

Topics:

- Parent array

- Find operation

- Union operation

- Path compression

- Union by rank/size

Variations:

- Number of Connected Components

- Redundant Connection

- Accounts Merge

- Most Stones Removed

- Kruskal's Minimum Spanning Tree

Common mistakes:

- Forgetting path compression

- Unioning raw nodes instead of roots

- Incorrect component count updates

- Confusing directed graph problems with DSU problems

Required visual type:

- Forest/tree renderer + parent array table

## Advanced Topics

These topics should come only after the core curriculum is strong.

### Chapter 29: Tries

Primary trace:

- Implement Trie

Variations:

- Word Search II
- Design Add and Search Words Data Structure
- Replace Words
- Search Suggestions System

Required visual type:

- Tree/trie renderer

### Chapter 30: Bit Manipulation

Primary trace:

- Single Number

Variations:

- Counting Bits
- Sum of Two Integers
- Missing Number
- Subsets with bit masks

Required visual type:

- Bit row renderer + state panel

### Chapter 31: Segment Tree And Fenwick Tree

Primary trace:

- Range Sum Query Mutable

Variations:

- Fenwick Tree prefix sums
- Segment Tree range query
- Lazy propagation intro

Required visual type:

- Tree renderer + array/table state

### Chapter 32: Advanced Graphs

Primary trace:

- Minimum Spanning Tree with Kruskal

Variations:

- Prim's algorithm
- Tarjan bridges
- Strongly connected components
- Floyd-Warshall

Required visual type:

- Graph renderer + table/edge state

## Complete Reference Tracks

The initial curriculum focuses on practical interview patterns, but the long-term goal is to grow OpenAlgoLab into a broad algorithm reference.

These tracks extend the project beyond LeetCode-style preparation into classic computer science, competitive programming, applied systems algorithms, and selected mathematical algorithms.

The same quality rules still apply:

- Concepts should be explained visually and language-agnostically.
- Every completed topic needs a trace or visual walkthrough.
- Reference implementations can start in Python.
- Advanced topics should still explain state, invariants, decisions, and failure modes.

## Track A: Sorting Algorithms

Goal: explain how different sorting strategies move data and why their complexity differs.

### Chapter 33: Elementary Sorting

Primary trace:

- Insertion Sort

Algorithms:

- Bubble Sort
- Selection Sort
- Insertion Sort
- Shell Sort

Topics:

- Adjacent swaps
- Current sorted prefix
- Minimum selection
- Stability
- In-place sorting
- Best/worst/average complexity

Common mistakes:

- Wrong loop boundaries
- Confusing stable and unstable sorts
- Counting swaps instead of comparisons incorrectly

Required visual type:

- Array renderer + comparison/swap highlights

### Chapter 34: Divide And Conquer Sorting

Primary trace:

- Merge Sort

Algorithms:

- Merge Sort
- Quick Sort
- Randomized Quick Sort
- Intro Sort overview

Topics:

- Divide and conquer recursion tree
- Merge operation
- Partition operation
- Pivot choice
- Stability
- Worst-case quicksort behavior

Common mistakes:

- Incorrect partition boundaries
- Infinite recursion from wrong split
- Forgetting leftover elements in merge
- Assuming quicksort is always O(n log n)

Required visual type:

- Array renderer + recursion tree renderer

### Chapter 35: Heap And Linear Sorting

Primary trace:

- Heap Sort

Algorithms:

- Heap Sort
- Counting Sort
- Radix Sort
- Bucket Sort

Topics:

- Heapify
- Extract max/min
- Counting frequency array
- Digit-by-digit sorting
- Input constraints for linear-time sorting

Common mistakes:

- Using counting sort when value range is too large
- Breaking stability in radix sort
- Wrong heap child indices

Required visual type:

- Heap renderer + array/frequency renderer

## Track B: String Algorithms

Goal: explain pattern matching, text indexing, and string preprocessing visually.

### Chapter 36: Basic String Matching

Primary trace:

- Naive Pattern Matching

Algorithms:

- Naive Search
- Rabin-Karp
- Rolling Hash

Topics:

- Pattern alignment
- Hash window
- Hash collisions
- Rolling update

Common mistakes:

- Ignoring collision verification
- Wrong modulo handling
- Off-by-one in substring windows

Required visual type:

- String renderer + rolling window/hash panel

### Chapter 37: Prefix-Based String Matching

Primary trace:

- KMP Pattern Search

Algorithms:

- Prefix Function
- Knuth-Morris-Pratt
- Z-Algorithm

Topics:

- Prefix/suffix overlap
- Failure links
- Avoiding repeated comparisons
- Z-box boundaries

Common mistakes:

- Incorrect fallback in KMP
- Confusing prefix function and Z-function
- Wrong indexing between pattern and text

Required visual type:

- String renderer + prefix/Z table

### Chapter 38: Advanced String Structures

Primary trace:

- Aho-Corasick Multi-Pattern Matching

Algorithms:

- Trie for strings
- Aho-Corasick
- Suffix Array
- LCP Array
- Suffix Tree overview
- Manacher's Algorithm

Topics:

- Trie transitions
- Failure links
- Suffix ordering
- Longest common prefix
- Palindrome radius expansion

Common mistakes:

- Building failure links incorrectly
- Confusing suffix array indices with suffix starts
- Mishandling even-length palindromes in Manacher

Required visual type:

- Trie/tree renderer + string/table renderer

## Track C: Advanced Graph Algorithms

Goal: cover graph algorithms beyond basic traversal and shortest paths.

### Chapter 39: Minimum Spanning Tree

Primary trace:

- Kruskal's Algorithm

Algorithms:

- Kruskal
- Prim

Topics:

- Cut property
- Edge sorting
- DSU integration
- Growing MST frontier

Common mistakes:

- Confusing MST with shortest path
- Adding cycle-forming edges
- Applying MST to directed graphs without checking assumptions

Required visual type:

- Weighted graph renderer + DSU/priority queue panel

### Chapter 40: All-Pairs Shortest Paths

Primary trace:

- Floyd-Warshall

Algorithms:

- Floyd-Warshall
- Johnson's Algorithm overview

Topics:

- Distance matrix
- Intermediate node `k`
- Negative cycle detection
- Sparse vs dense graph tradeoffs

Common mistakes:

- Wrong loop ordering in Floyd-Warshall
- Incorrect infinity handling
- Not detecting negative cycles

Required visual type:

- Matrix/table renderer + graph renderer

### Chapter 41: Strong Connectivity And Graph Decomposition

Primary trace:

- Tarjan's Strongly Connected Components

Algorithms:

- Kosaraju SCC
- Tarjan SCC
- Bridges
- Articulation Points
- Biconnected Components overview

Topics:

- Discovery time
- Low-link values
- DFS tree/back edges
- Component stack

Common mistakes:

- Confusing directed SCC with undirected components
- Incorrect low-link update
- Mishandling parent edge in bridge detection

Required visual type:

- Graph renderer + DFS stack/table panel

### Chapter 42: Eulerian And Hamiltonian Paths

Primary trace:

- Hierholzer's Algorithm

Algorithms:

- Eulerian Path/Circuit
- Hierholzer's Algorithm
- Hamiltonian Path backtracking overview

Topics:

- Degree conditions
- Edge usage state
- Path stitching
- NP-hardness intuition for Hamiltonian path

Common mistakes:

- Marking vertices instead of edges for Euler traversal
- Ignoring graph connectivity requirements
- Treating Hamiltonian path as easy because Euler path is easy

Required visual type:

- Graph renderer + path/edge-state panel

### Chapter 43: Matching And Flow

Primary trace:

- Edmonds-Karp Maximum Flow

Algorithms:

- Bipartite Matching via DFS augmenting paths
- Hopcroft-Karp overview
- Ford-Fulkerson
- Edmonds-Karp
- Dinic
- Min-Cost Max-Flow overview

Topics:

- Residual graph
- Augmenting path
- Bottleneck capacity
- Level graph
- Matching as flow

Common mistakes:

- Updating only forward edges in residual graph
- Forgetting reverse capacities
- Confusing capacity with flow
- Infinite loops with bad augmenting path handling

Required visual type:

- Flow graph renderer + residual capacity panel

## Track D: Advanced Dynamic Programming

Goal: cover DP families that require more explicit state design and optimization.

### Chapter 44: DP On Intervals

Primary trace:

- Burst Balloons

Algorithms/patterns:

- Interval DP
- Matrix Chain Multiplication
- Palindrome partition DP

Topics:

- Subarray interval state
- Length-based iteration
- Split point enumeration

Common mistakes:

- Wrong interval inclusivity
- Filling intervals before subintervals are ready
- Choosing the wrong last/first action

Required visual type:

- Table renderer + interval renderer

### Chapter 45: DP On Trees And DAGs

Primary trace:

- Tree Diameter DP

Algorithms/patterns:

- Tree DP
- Rerooting DP
- DP on DAG
- Longest path in DAG

Topics:

- Postorder state aggregation
- Parent/child transitions
- Topological order for DAG DP
- Rerooting contribution transfer

Common mistakes:

- Computing parent before children
- Mixing directed and undirected tree state
- Forgetting to exclude parent in tree traversal

Required visual type:

- Tree/graph renderer + state table

### Chapter 46: Bitmask And Digit DP

Primary trace:

- Traveling Salesman Bitmask DP

Algorithms/patterns:

- Bitmask DP
- Subset DP
- Digit DP
- SOS DP overview

Topics:

- Mask representation
- Transition over subsets
- Tight flag in digit DP
- Memoization dimensions

Common mistakes:

- Wrong bit operations
- Exploding state space accidentally
- Incorrect tight handling in digit DP

Required visual type:

- Bit renderer + table/state renderer

### Chapter 47: DP Optimizations

Primary trace:

- Divide And Conquer DP Optimization

Algorithms/patterns:

- Space optimization
- Monotonic queue optimization
- Divide and Conquer DP optimization
- Knuth optimization
- Convex Hull Trick

Topics:

- Optimization preconditions
- Monotonicity
- Quadrangle inequality intuition
- Lines and queries for CHT

Common mistakes:

- Applying optimization without required properties
- Breaking iteration dependencies during space optimization
- Incorrect line intersection handling

Required visual type:

- Table renderer + line/geometry renderer where needed

## Track E: Advanced Data Structures

Goal: cover query/update structures and balanced search structures.

### Chapter 48: Range Query Structures

Primary trace:

- Sparse Table Range Minimum Query

Algorithms/data structures:

- Sparse Table
- Disjoint Sparse Table overview
- Square Root Decomposition
- Mo's Algorithm

Topics:

- Static range queries
- Idempotent operations
- Block decomposition
- Query ordering

Common mistakes:

- Using sparse table for non-idempotent operations incorrectly
- Wrong block size intuition
- Incorrect add/remove operations in Mo's algorithm

Required visual type:

- Array/table renderer + block renderer

### Chapter 49: Segment Trees

Primary trace:

- Segment Tree Range Sum Query

Algorithms/data structures:

- Segment Tree
- Lazy Propagation
- Persistent Segment Tree
- Segment Tree Beats overview

Topics:

- Tree over ranges
- Query decomposition
- Point update
- Range update with lazy propagation
- Persistence via path copying

Common mistakes:

- Wrong child ranges
- Forgetting to push lazy values
- Incorrect neutral element
- Off-by-one in query bounds

Required visual type:

- Tree renderer + interval renderer

### Chapter 50: Fenwick Trees

Primary trace:

- Fenwick Tree Prefix Sum

Algorithms/data structures:

- Binary Indexed Tree
- Range update/range query variants
- 2D Fenwick Tree overview

Topics:

- Least significant bit
- Prefix accumulation
- Update propagation

Common mistakes:

- Mixing 0-indexed and 1-indexed implementations
- Wrong `i += i & -i` / `i -= i & -i`
- Confusing prefix and range queries

Required visual type:

- Array renderer + responsibility range highlights

### Chapter 51: Balanced Search Structures

Primary trace:

- Treap Insert And Rotate

Algorithms/data structures:

- AVL Tree
- Red-Black Tree overview
- Treap
- Splay Tree overview
- Skip List
- Ordered Set

Topics:

- Balance invariants
- Rotations
- Random priorities
- Expected height

Common mistakes:

- Broken rotation links
- Not updating subtree metadata
- Confusing BST order with heap priority in treaps

Required visual type:

- Tree renderer + invariant panel

### Chapter 52: Specialized Data Structures

Primary trace:

- LRU Cache

Data structures:

- LRU Cache
- LFU Cache
- Rope overview
- B-Tree overview
- Wavelet Tree overview
- Persistent Stack/Queue overview

Topics:

- Hash map + linked list composition
- Cache eviction policy
- Disk/page-oriented trees
- Persistence

Common mistakes:

- Updating map and linked list inconsistently
- Evicting wrong node
- Ignoring operation complexity guarantees

Required visual type:

- Linked structure renderer + map/state panel

## Track F: Math And Number Theory Algorithms

Goal: explain algorithmic math visually enough for practical problem solving.

### Chapter 53: GCD And Modular Arithmetic

Primary trace:

- Euclidean Algorithm

Algorithms:

- Euclidean GCD
- Extended Euclidean Algorithm
- Modular Exponentiation
- Modular Inverse
- Chinese Remainder Theorem

Topics:

- Remainder reduction
- Bezout coefficients
- Fast exponentiation by squaring
- Modular inverse existence

Common mistakes:

- Division under modulo without inverse
- Overflow in modular multiplication
- Applying inverse when numbers are not coprime

Required visual type:

- Number/state table renderer

### Chapter 54: Primes And Factorization

Primary trace:

- Sieve of Eratosthenes

Algorithms:

- Trial Division
- Sieve of Eratosthenes
- Linear Sieve
- Miller-Rabin Primality Test
- Pollard Rho overview

Topics:

- Composite marking
- Prime generation
- Probabilistic primality
- Factor discovery

Common mistakes:

- Starting sieve marking at wrong value
- Wrong integer overflow handling
- Treating probabilistic result as deterministic without caveats

Required visual type:

- Number grid renderer + factor table

### Chapter 55: Combinatorics

Primary trace:

- Pascal's Triangle

Algorithms/patterns:

- Factorial precomputation
- nCr modulo prime
- Pascal DP
- Inclusion-exclusion
- Stars and bars overview

Topics:

- Counting choices
- Precompute factorial and inverse factorial
- Recurrence-based counting

Common mistakes:

- Overcounting/undercounting
- Wrong modulo inverse preconditions
- Confusing permutations and combinations

Required visual type:

- Table renderer + formula panel

### Chapter 56: Linear Algebra And Transforms

Primary trace:

- Matrix Exponentiation for Fibonacci

Algorithms:

- Matrix Multiplication
- Fast Matrix Exponentiation
- Gaussian Elimination overview
- Fast Fourier Transform
- Number Theoretic Transform

Topics:

- Linear recurrence transformation
- Polynomial multiplication
- Divide and conquer over roots of unity

Common mistakes:

- Wrong matrix multiplication dimensions
- Floating-point precision in FFT
- Invalid modulus/root choice in NTT

Required visual type:

- Matrix/table renderer + recursion tree

## Track G: Computational Geometry

Goal: explain geometry algorithms with visual invariants and robust edge-case handling.

### Chapter 57: Geometry Primitives

Primary trace:

- Segment Intersection

Algorithms/primitives:

- Orientation / Cross Product
- Dot Product
- Line Intersection
- Segment Intersection
- Point In Polygon

Topics:

- Orientation sign
- Collinearity
- Bounding boxes
- Floating-point precision

Common mistakes:

- Mishandling collinear cases
- Direct float equality comparisons
- Wrong coordinate orientation assumption

Required visual type:

- 2D geometry renderer

### Chapter 58: Convex Hull And Closest Points

Primary trace:

- Monotonic Chain Convex Hull

Algorithms:

- Graham Scan
- Monotonic Chain
- Rotating Calipers
- Closest Pair of Points

Topics:

- Hull invariant
- Sorting points
- Removing non-left turns
- Divide and conquer geometry

Common mistakes:

- Keeping/removing collinear points incorrectly
- Wrong sort order
- Not handling duplicate points

Required visual type:

- 2D point/line renderer

### Chapter 59: Sweep Line Geometry

Primary trace:

- Line Segment Intersection Sweep

Algorithms:

- Sweep Line for Segment Intersections
- Rectangle Union Area overview
- Closest Pair sweep variant

Topics:

- Event ordering
- Active set
- Neighbor checks
- Coordinate compression

Common mistakes:

- Wrong tie-breaking for events
- Not updating active order after crossings
- Precision and degeneracy issues

Required visual type:

- 2D sweep-line renderer + active set panel

## Track H: Randomized And Probabilistic Algorithms

Goal: explain algorithms that use randomness or probabilistic data structures.

### Chapter 60: Random Sampling And Randomized Algorithms

Primary trace:

- Reservoir Sampling

Algorithms:

- Fisher-Yates Shuffle
- Reservoir Sampling
- Randomized QuickSort
- Randomized Select
- Monte Carlo Estimation overview

Topics:

- Uniform randomness
- Probability of selection
- Expected complexity

Common mistakes:

- Biased shuffle
- Incorrect reservoir replacement probability
- Confusing expected and worst-case guarantees

Required visual type:

- Array/state renderer + probability panel

### Chapter 61: Probabilistic Data Structures

Primary trace:

- Bloom Filter Insert And Query

Data structures:

- Bloom Filter
- Count-Min Sketch
- HyperLogLog overview

Topics:

- False positives
- Hash functions
- Space/accuracy tradeoff
- Cardinality estimation

Common mistakes:

- Expecting deletion from a basic Bloom filter
- Ignoring false positives
- Using too few/many hash functions

Required visual type:

- Bit array renderer + hash/state panel

## Track I: Compression Algorithms

Goal: explain how data can be encoded more compactly.

### Chapter 62: Basic Compression

Primary trace:

- Run-Length Encoding

Algorithms:

- Run-Length Encoding
- Huffman Coding
- Arithmetic Coding overview

Topics:

- Symbol frequency
- Prefix-free codes
- Encoding/decoding process
- Compression ratio

Common mistakes:

- Non-prefix-free code assignment
- Ignoring metadata overhead
- Assuming compression always reduces size

Required visual type:

- String renderer + tree/code table

### Chapter 63: Dictionary Compression

Primary trace:

- LZW Compression

Algorithms:

- LZ77
- LZ78
- LZW

Topics:

- Sliding dictionary
- Back references
- Dictionary growth

Common mistakes:

- Wrong dictionary synchronization between encoder and decoder
- Mishandling first unseen phrase
- Ignoring window limits

Required visual type:

- String/window renderer + dictionary table

## Track J: Cryptographic And Hashing Algorithms

Goal: explain core cryptographic ideas at an educational level without presenting them as production security guidance.

### Chapter 64: Hashing And Merkle Structures

Primary trace:

- Merkle Tree Construction

Algorithms/data structures:

- Cryptographic Hash Function concept
- Merkle Tree
- Consistent hashing is covered in systems track

Topics:

- Hash chaining
- Tamper evidence
- Inclusion proof

Common mistakes:

- Treating non-cryptographic hashes as secure
- Ignoring collision resistance requirements
- Misunderstanding what Merkle proofs prove

Required visual type:

- Tree renderer + hash panel

### Chapter 65: Public-Key Cryptography Concepts

Primary trace:

- RSA Toy Example

Algorithms/concepts:

- RSA toy model
- Diffie-Hellman key exchange toy model
- Digital signatures concept

Topics:

- Public/private keys
- Modular exponentiation
- Shared secret derivation
- Signing vs encrypting

Common mistakes:

- Using toy examples as real security
- Confusing encryption and signatures
- Ignoring padding/protocol requirements

Required visual type:

- Number/state flow renderer

## Track K: Optimization Algorithms

Goal: cover search and optimization techniques outside standard discrete algorithms.

### Chapter 66: Search-Based Optimization

Primary trace:

- Ternary Search On Unimodal Function

Algorithms:

- Ternary Search
- Hill Climbing
- Simulated Annealing overview
- Genetic Algorithms overview

Topics:

- Unimodality
- Local vs global optimum
- Temperature schedule
- Population/crossover/mutation

Common mistakes:

- Applying ternary search to non-unimodal functions
- Getting stuck in local optimum
- Treating heuristics as guaranteed exact algorithms

Required visual type:

- Function plot renderer + state panel

### Chapter 67: Continuous Optimization Basics

Primary trace:

- Gradient Descent On A Simple Quadratic

Algorithms:

- Gradient Descent
- Stochastic Gradient Descent overview
- Newton's Method overview
- Linear Programming concept
- Simplex Method overview

Topics:

- Gradient direction

- Learning rate

- Convexity intuition
- Constraints and feasible region

Common mistakes:

- Too large learning rate

- Confusing local/global minima in non-convex settings
- Ignoring scaling and convergence criteria

Required visual type:

- Function/contour renderer + iteration state

## Track L: Systems And Applied Algorithms

Goal: cover algorithms used in backend systems, distributed systems, caching, scheduling, and infrastructure.

### Chapter 68: Caching And Eviction

Primary trace:

- LRU Cache Operations

Algorithms/data structures:

- LRU Cache
- LFU Cache
- CLOCK page replacement overview

Topics:

- Recency
- Frequency
- Hash map + linked list
- Eviction policy tradeoffs

Common mistakes:

- Not updating recency on get
- Evicting before capacity check
- Inconsistent map/list state

Required visual type:

- Linked list renderer + map/cache panel

### Chapter 69: Rate Limiting

Primary trace:

- Token Bucket

Algorithms:

- Token Bucket

- Leaky Bucket

- Fixed Window Counter

- Sliding Window Log

- Sliding Window Counter

Topics:

- Burst handling

- Refill rate

- Window boundary effects
- Memory/accuracy tradeoffs

Common mistakes:

- Fixed-window boundary burst problem
- Incorrect refill calculation
- Not handling clock drift or time precision

Required visual type:

- Timeline/bucket renderer

### Chapter 70: Consistent Hashing And Load Distribution

Primary trace:

- Consistent Hash Ring Add Node

Algorithms:

- Consistent Hashing
- Rendezvous Hashing
- Weighted Round Robin
- Least Connections overview

Topics:

- Hash ring

- Virtual nodes

- Minimal remapping

- Load distribution

Common mistakes:

- Too few virtual nodes

- Ignoring hot keys

- Assuming perfect balance automatically

Required visual type:

- Ring renderer + key/node mapping panel

### Chapter 71: Distributed Coordination

Primary trace:

- Raft Leader Election

Algorithms/concepts:

- Leader Election

- Raft overview

- Paxos concept overview

- Gossip Protocols

- Vector Clocks

- Lamport Clocks

- CRDT basics

Topics:

- Consensus

- Quorum

- Term/epoch

- Causality

- Eventual consistency

Common mistakes:

- Treating eventual consistency as immediate consistency

- Confusing logical clocks with wall-clock time

- Ignoring split-brain cases

Required visual type:

- Distributed timeline renderer + node state panel

### Chapter 72: Scheduling And Queuing

Primary trace:

- Round Robin Scheduling

Algorithms:

- FIFO Scheduling

- Round Robin

- Priority Scheduling

- Shortest Job First

- Exponential Backoff

- Retry with Jitter

Topics:

- Fairness

- Starvation

- Latency/throughput tradeoff

- Backoff under contention

Common mistakes:

- Starving low-priority work

- Synchronized retries without jitter

- Optimizing throughput while ignoring tail latency

Required visual type:

- Timeline/queue renderer

## Track M: Machine Learning And Data Algorithms

Goal: optionally cover widely used ML/data algorithms through visual intuition, not as a replacement for ML theory.

### Chapter 73: Clustering

Primary trace:

- K-Means Iteration

Algorithms:

- K-Means

- DBSCAN overview

- Hierarchical Clustering overview

Topics:

- Centroids

- Assignment step

- Update step

- Density-based clusters

Common mistakes:

- Bad initialization assumptions

- Choosing wrong `k`

- Not scaling features

Required visual type:

- 2D point renderer + centroid/state panel

### Chapter 74: Graph And Ranking Algorithms

Primary trace:

- PageRank Iteration

Algorithms:

- PageRank

- HITS overview

- Personalized PageRank overview

Topics:

- Rank propagation

- Damping factor

- Iterative convergence

Common mistakes:

- Ignoring dangling nodes

- Misinterpreting rank as absolute quality

- Stopping before convergence

Required visual type:

- Graph renderer + score table

### Chapter 75: Recommendation Basics

Primary trace:

- User-Item Collaborative Filtering Toy Example

Algorithms:

- User-based Collaborative Filtering

- Item-based Collaborative Filtering

- Matrix Factorization overview

Topics:

- Similarity

- Sparse matrices

- Latent factors

Common mistakes:

- Ignoring cold-start problem

- Data leakage in evaluation

- Confusing similarity metrics

Required visual type:

- Matrix/table renderer + similarity panel

## Complete Reference Index

This index lists the broad algorithm families OpenAlgoLab should eventually cover.

- Arrays and pointers
- Sliding window
- Prefix sums and difference arrays
- Hash maps and frequency counting
- Sorting algorithms
- Binary search and search-on-answer
- Stacks, queues, deques
- Monotonic structures
- Linked lists
- Trees and binary search trees
- Tries and string trees
- Graph traversal
- Shortest paths
- Minimum spanning trees
- Strong connectivity and graph decomposition
- Matching and flow
- Union Find
- Heaps and priority queues
- Intervals and sweep line
- Backtracking and constraint search
- Dynamic programming
- Greedy algorithms
- Range query data structures
- Balanced search structures
- Persistent data structures
- String matching and text indexing
- Number theory
- Combinatorics
- Linear algebra and transforms
- Computational geometry
- Randomized algorithms
- Probabilistic data structures
- Compression algorithms
- Cryptographic concepts
- Optimization algorithms
- Systems algorithms
- Distributed algorithms
- ML/data algorithms

This is intentionally broad. Implementation should still proceed incrementally, with quality over breadth.

## Recommended First 10 Modules

The first 10 modules should prioritize clarity, visual impact, and interview usefulness:

1. Sliding Window: Maximum Sum Subarray of Size K
2. Sliding Window: Longest Substring Without Repeating Characters
3. Two Pointers: Two Sum II
4. Prefix Sum: Subarray Sum Equals K
5. Binary Search: Classic Binary Search
6. Binary Search on Answer: Koko Eating Bananas
7. Monotonic Stack: Daily Temperatures
8. BFS: Graph Traversal
9. BFS Grid: Rotting Oranges
10. DP 1D: Climbing Stairs

## Required Topic Template

Every completed topic should have this structure:

```text
patterns/<pattern>/<example>/
  README.md
  intuition.md
  trace.json
  trace.md
  common-mistakes.md
  problems.md
  implementations/
    python.py
```

Optional future files:

```text
  implementations/
    javascript.js
    typescript.ts
    cpp.cpp
    java.java
  code-map.json
  tests/
    test_python.py
```

## Topic Quality Checklist

Before a topic is considered complete:

- It explains the pattern in language-agnostic terms.
- It explains when to recognize and use the pattern.
- It defines the algorithm state clearly.
- It includes at least one `trace.json`.
- Every trace step has `action`, `state`, `decision`, and `why`.
- It includes a GitHub-readable `trace.md`.
- It includes common mistakes and edge cases.
- It includes practice problems and variations.
- It includes at least one clean reference implementation.
- It avoids clever code in beginner-facing examples.

## Visual Renderer Roadmap

The curriculum implies these reusable renderers:

1. `ArrayRenderer`
2. `StringRenderer`
3. `StateRenderer`
4. `MapRenderer`
5. `StackRenderer`
6. `QueueRenderer`
7. `DequeRenderer`
8. `GraphRenderer`
9. `TreeRenderer`
10. `TableRenderer`
11. `GridRenderer`
12. `IntervalRenderer`
13. `HeapRenderer`
14. `TimelineRenderer`
15. `BitRenderer`

Renderers should be reusable. A new algorithm should not require a new visualizer unless it introduces a new visual structure.

## Language Strategy

The curriculum is language-agnostic.

The first reference implementation language is Python.

Principle:

```text
The concept is language-agnostic.
The first implementation is Python.
The visualization is trace-driven.
```

Trace semantics must not depend on programming language syntax.

## Final Priority

The highest priority is not breadth. The highest priority is one excellent module that makes users think:

```text
Now I finally understand how this algorithm works.
```

After that, expand pattern by pattern.
