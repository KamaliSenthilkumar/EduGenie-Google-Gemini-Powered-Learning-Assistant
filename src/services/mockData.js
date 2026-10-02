// Mock data generator for EduGenie AI Learning Assistant
// Provides realistic EdTech responses when backend server is offline

export const INITIAL_USER = {
  id: 'usr_101',
  name: 'Alex Morgan',
  email: 'alex.morgan@stanford.edu',
  role: 'Computer Science Student',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
  joinedDate: 'January 2026',
  studyStreak: 12,
  completedQuizzes: 34,
  averageScore: 88,
  topicsStudied: 42,
  weeklyGoalHours: 15,
  completedHoursThisWeek: 11.5
};

export const INITIAL_STATS = {
  quizzesCompleted: { value: 34, trend: '+12%', label: 'Quizzes Completed', sublabel: 'vs last month' },
  averageScore: { value: '88%', trend: '+4.5%', label: 'Average Score', sublabel: 'Consistent high grade' },
  topicsStudied: { value: 42, trend: '+8', label: 'Topics Studied', sublabel: '5 new this week' },
  studyStreak: { value: '12 Days', trend: '🔥 Hot', label: 'Study Streak', sublabel: 'Personal record: 18' }
};

export const INITIAL_ACTIVITIES = [
  {
    id: 'act_1',
    type: 'Quiz',
    title: 'Completed Python Functions & OOP Quiz',
    topic: 'Python Programming',
    score: '90%',
    status: 'Completed',
    date: '2026-03-28 14:30',
    timeAgo: '2 hours ago',
    icon: 'Brain'
  },
  {
    id: 'act_2',
    type: 'Notes',
    title: 'Generated Notes for Deep Learning & Transformers',
    topic: 'Machine Learning',
    score: null,
    status: 'Saved',
    date: '2026-03-28 11:15',
    timeAgo: '5 hours ago',
    icon: 'FileText'
  },
  {
    id: 'act_3',
    type: 'AI Tutor',
    title: 'Asked AI Tutor about Backpropagation & Gradients',
    topic: 'Neural Networks',
    score: null,
    status: 'Completed',
    date: '2026-03-27 16:40',
    timeAgo: 'Yesterday',
    icon: 'MessageSquare'
  },
  {
    id: 'act_4',
    type: 'Evaluation',
    title: 'Evaluated SQL Indexing & Query Optimization Answer',
    topic: 'Database Systems',
    score: '85/100',
    status: 'Reviewed',
    date: '2026-03-27 10:20',
    timeAgo: 'Yesterday',
    icon: 'CheckCircle2'
  },
  {
    id: 'act_5',
    type: 'Study Plan',
    title: 'Generated 14-Day Full-Stack Web Development Schedule',
    topic: 'Web Development',
    score: null,
    status: 'In Progress',
    date: '2026-03-26 09:00',
    timeAgo: '3 days ago',
    icon: 'Calendar'
  }
];

export const WEEKLY_PROGRESS = [
  { day: 'Mon', score: 72, hours: 1.5, completed: 3 },
  { day: 'Tue', score: 85, hours: 2.2, completed: 5 },
  { day: 'Wed', score: 78, hours: 1.8, completed: 4 },
  { day: 'Thu', score: 92, hours: 3.0, completed: 7 },
  { day: 'Fri', score: 88, hours: 2.5, completed: 6 },
  { day: 'Sat', score: 95, hours: 3.5, completed: 8 },
  { day: 'Sun', score: 90, hours: 2.0, completed: 4 }
];

export const TOPIC_BREAKDOWN = [
  { name: 'Computer Science', count: 18, color: '#4F46E5', percentage: 42 },
  { name: 'Machine Learning', count: 12, color: '#0EA5E9', percentage: 28 },
  { name: 'Mathematics', count: 7, color: '#10B981', percentage: 17 },
  { name: 'System Design', count: 5, color: '#F59E0B', percentage: 13 }
];

export function getMockExplanation(subject, topic, difficulty) {
  return {
    subject: subject || 'Computer Science',
    topic: topic || 'Recursion',
    difficulty: difficulty || 'Intermediate',
    simpleExplanation: `Recursion is a programming technique where a function solves a problem by calling a smaller instance of itself. Think of it like a set of Russian Matryoshka nesting dolls: to reach the tiny wooden doll inside (the base case), you must unpack each doll one by one. Once you hit the smallest doll, you work your way back up.`,
    keyConcepts: [
      {
        title: 'Base Case',
        description: 'The termination condition that stops the recursion from running infinitely. Without it, you get a Stack Overflow error.'
      },
      {
        title: 'Recursive Step',
        description: 'The step where the function calls itself with a reduced or simpler input, getting closer to the base case.'
      },
      {
        title: 'Call Stack Memory',
        description: 'Each recursive call allocates a new frame on the system call stack, storing local parameters and execution states.'
      }
    ],
    example: {
      title: 'Calculating Factorial (n!)',
      code: `function factorial(n) {\n  // 1. Base Case: factorial of 0 or 1 is 1\n  if (n <= 1) return 1;\n  \n  // 2. Recursive Step: n * factorial(n - 1)\n  return n * factorial(n - 1);\n}\n\nconsole.log(factorial(5)); // Output: 120`,
      explanation: 'factorial(5) calls 5 * factorial(4), which waits for 4 * factorial(3)... down to factorial(1) = 1. Then answers resolve backwards: 1 * 2 * 3 * 4 * 5 = 120.'
    },
    importantPoints: [
      'Always guarantee that the recursive step moves closer to the base condition.',
      'Recursion makes complex tree and graph traversals (like DFS) clean and elegant.',
      'Be mindful of stack depth; for huge inputs, iterative solutions or tail-call optimization are preferred.',
      'Divide-and-Conquer algorithms (Merge Sort, Quick Sort) heavily rely on recursive paradigms.'
    ],
    quickSummary: `Recursion breaks complex problems into simpler sub-problems by calling itself until a stopping condition (base case) is reached. It trades memory stack space for algorithmic clarity.`
  };
}

export function getMockNotes(subject, topic, instructions) {
  return {
    title: `Comprehensive Study Notes: ${topic || 'Data Structures & Algorithms'}`,
    subject: subject || 'Computer Science',
    topic: topic || 'Binary Search Trees',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    overview: `A Binary Search Tree (BST) is a hierarchical node-based data structure where each node has at most two children. The fundamental invariant is that all nodes in the left subtree possess keys strictly less than the parent node, and all nodes in the right subtree possess keys greater than the parent node.`,
    keyConcepts: [
      'BST Invariant: Left Child < Root < Right Child for every subtree.',
      'In-Order Traversal (Left, Root, Right) always outputs elements in sorted non-decreasing order.',
      'Time Complexity: Average search, insertion, and deletion are O(log n); worst case degrades to O(n) for degenerate unbalanced trees.',
      'Balanced BST variants like AVL Trees and Red-Black Trees guarantee O(log n) worst-case performance.'
    ],
    definitions: [
      { term: 'Height of Tree (h)', definition: 'The maximum length of a path from the root node to a leaf node. Determines operations complexity.' },
      { term: 'In-order Successor', definition: 'The node with the smallest key strictly greater than the given node key (leftmost child of right subtree).' },
      { term: 'Tree Rotation', definition: 'An O(1) pointer adjustment operation used in self-balancing trees to rebalance tree height without violating BST ordering.' }
    ],
    examples: [
      {
        scenario: 'Inserting values: 50, 30, 70, 20, 40, 60, 80',
        detail: '50 is root. 30 goes left of 50. 70 goes right of 50. 20 goes left of 30. 40 goes right of 30. 60 goes left of 70. 80 goes right of 70. The resulting tree is perfectly balanced.'
      }
    ],
    importance: `BSTs form the core architectural foundation for associative arrays, database B-Tree index caches, filesystem directory lookups, and symbol tables in modern compilers.`,
    quickRevision: [
      'Search/Insert/Delete: Average O(log n), Worst O(n).',
      'In-order traversal = Sorted sequence.',
      'Deletion has 3 cases: leaf node (delete directly), 1 child (bypass node), 2 children (replace with in-order successor).'
    ]
  };
}

export function getMockQuiz(subject, topic, difficulty, count = 5) {
  const sampleBank = [
    {
      id: 1,
      question: `What is the worst-case time complexity of searching for an element in an unbalanced Binary Search Tree?`,
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
      correctAnswer: 2, // O(n)
      explanation: 'In the worst case, items are inserted in sorted order, causing the tree to degenerate into a linked list of height n, yielding O(n) lookup time.'
    },
    {
      id: 2,
      question: `Which tree traversal order visits nodes in ascending sorted sequence in a Binary Search Tree?`,
      options: ['Pre-order', 'In-order', 'Post-order', 'Level-order'],
      correctAnswer: 1, // In-order
      explanation: 'In-order traversal visits Left subtree, current Node, then Right subtree, which naturally sorts the keys.'
    },
    {
      id: 3,
      question: `In Python, which built-in data structure provides average O(1) lookup, insertion, and deletion?`,
      options: ['List', 'Tuple', 'Dictionary / Set', 'Deque'],
      correctAnswer: 2, // Dictionary / Set
      explanation: 'Python dictionaries and sets are implemented as hash tables with open addressing, giving expected amortized O(1) performance.'
    },
    {
      id: 4,
      question: `What is the primary role of a loss function in training a Neural Network?`,
      options: [
        'To initialize weights randomly',
        'To measure the discrepancy between model predictions and ground truth labels',
        'To speed up CPU clock frequency',
        'To normalize the dataset dimensions'
      ],
      correctAnswer: 1,
      explanation: 'The loss function quantifies prediction error; backpropagation computes gradients of this loss with respect to weights to optimize parameters.'
    },
    {
      id: 5,
      question: `What is the purpose of the base case in a recursive algorithm?`,
      options: [
        'To allocate extra memory heap',
        'To terminate the recursive chain and prevent infinite recursion',
        'To invert the input array',
        'To trigger parallel multithreading'
      ],
      correctAnswer: 1,
      explanation: 'Without a base case, recursion executes until system call stack exhaustion occurs, resulting in a StackOverflow error.'
    },
    {
      id: 6,
      question: `In relational databases, which SQL clause is used to filter records resulting from an aggregate GROUP BY?`,
      options: ['WHERE', 'HAVING', 'FILTER BY', 'ORDER BY'],
      correctAnswer: 1, // HAVING
      explanation: 'WHERE filters rows before aggregation, while HAVING filters aggregated group metrics.'
    },
    {
      id: 7,
      question: `Which HTTP response status code indicates that the requested resource was not found?`,
      options: ['200 OK', '401 Unauthorized', '403 Forbidden', '404 Not Found'],
      correctAnswer: 3,
      explanation: 'HTTP 404 indicates the origin server could not find a current representation for the target resource.'
    },
    {
      id: 8,
      question: `What is the time complexity of Merge Sort in all cases (best, average, worst)?`,
      options: ['O(n^2)', 'O(n log n)', 'O(log n)', 'O(n)'],
      correctAnswer: 1,
      explanation: 'Merge sort divides the array in halves (log n levels) and performs O(n) linear work merging each level, yielding O(n log n) uniformly.'
    },
    {
      id: 9,
      question: `Which Git command creates and switches to a new branch in a single step?`,
      options: ['git branch new-feature', 'git checkout -b new-feature', 'git merge new-feature', 'git push --new new-feature'],
      correctAnswer: 1,
      explanation: '`git checkout -b <name>` or `git switch -c <name>` creates the branch and immediately points HEAD to it.'
    },
    {
      id: 10,
      question: `In React, which Hook is used to perform side effects such as data fetching or DOM mutations?`,
      options: ['useState', 'useMemo', 'useEffect', 'useCallback'],
      correctAnswer: 2,
      explanation: 'useEffect lets you synchronize a component with external systems, timers, subscriptions, or network fetch calls.'
    }
  ];

  // Slice exactly requested count
  const requestedCount = Math.min(count, sampleBank.length);
  const selectedQuestions = sampleBank.slice(0, requestedCount).map((q, idx) => ({
    ...q,
    id: idx + 1,
    topic: topic || 'Computer Science'
  }));

  return {
    quizId: 'qz_' + Date.now(),
    subject: subject || 'General Science',
    topic: topic || 'Core Fundamentals',
    difficulty: difficulty || 'Medium',
    totalQuestions: selectedQuestions.length,
    timeLimitMinutes: Math.max(5, selectedQuestions.length * 1.5),
    questions: selectedQuestions
  };
}

export function getMockEvaluation(question, answer) {
  const answerLength = (answer || '').trim().length;
  const score = answerLength > 200 ? 92 : answerLength > 100 ? 84 : 70;
  
  return {
    score: score,
    total: 100,
    correctness: score >= 85 ? 'Strong Understanding' : 'Good Understanding with Minor Gaps',
    badgeVariant: score >= 85 ? 'success' : 'warning',
    strengths: [
      'Accurately identified the core definition and fundamental mechanism.',
      'Clear, logical flow of thought with domain-specific terminology.',
      'Good practical perspective on why the concept matters.'
    ],
    missingPoints: [
      'Could have explicitly mentioned edge cases (e.g., handling null inputs or boundary values).',
      'Briefly discussing time or space trade-offs would make the answer comprehensive for technical interviews.'
    ],
    correctExplanation: `The ideal explanation covers definition, underlying operational steps, constraints, and real-world application. For instance, explaining the mechanism step-by-step with complexity analysis (O-notation) provides full technical rigor.`,
    improvementSuggestions: [
      'Include a short 2-line code snippet or concrete example to substantiate abstract points.',
      'Structure longer answers using bullet points for readability.',
      'Explicitly state assumptions and limitations.'
    ]
  };
}

export function getMockStudyPlan(subject, topics, days = 7, dailyHours = 2, goal = 'Exam Preparation') {
  const daysCount = parseInt(days, 10) || 7;
  const topicList = (topics || 'Introduction, Fundamentals, Intermediate concepts, Advanced topics, Review & Practice')
    .split(',')
    .map(t => t.trim())
    .filter(Boolean);

  const planDays = [];
  for (let i = 1; i <= daysCount; i++) {
    const topic = topicList[(i - 1) % topicList.length] || `Topic Module ${i}`;
    planDays.push({
      dayNumber: i,
      title: `Day ${i}: ${topic}`,
      objective: `Master the foundational theory and practical implementation of ${topic}.`,
      estimatedTime: `${dailyHours} Hours`,
      completed: i === 1, // first day completed for preview
      tasks: [
        { id: `d${i}_t1`, task: `Read core concept overview on ${topic}`, done: i === 1 },
        { id: `d${i}_t2`, task: `Generate concise study notes using EduGenie AI`, done: i === 1 },
        { id: `d${i}_t3`, task: `Complete a 5-question practice quiz to test recall`, done: false },
        { id: `d${i}_t4`, task: `Review weak areas and ask AI Tutor for code walkthrough`, done: false }
      ]
    });
  }

  return {
    planId: 'sp_' + Date.now(),
    subject: subject || 'Computer Science',
    goal: goal || 'Mastery and Exam Prep',
    durationDays: daysCount,
    dailyHours: `${dailyHours} hrs/day`,
    progressPercentage: Math.round((1 / daysCount) * 100),
    days: planDays
  };
}
