import { SprintDay } from '@/types';

export const INITIAL_SPRINT_DAYS: SprintDay[] = [
  {
    id: 1,
    title: "Mental Models & Flow: How Computers Actually Think",
    subtitle: "Stop memorizing code. Learn execution traces and state tracking like an architect.",
    estimatedTime: "25 mins",
    track: "both",
    dayCategory: "Foundational Logic",
    learn: {
      eli5: "A program is just a cooking recipe followed by an obedient robot. The robot only knows three moves: do this step, decide between two choices (if/else), or repeat until done (loop). It cannot guess or assume anything.",
      analogy: "Think of computer memory like a sheet of scratch paper with labelled boxes. When you write x = 5, the robot draws a box called 'x' and puts a 5 inside. When you do x = x + 1, it looks at the 5, adds 1 to get 6, and replaces the contents.",
      tanglishTip: "Simple-ah purinjukanum-na: Computer kitta common sense kedayadhu. Neenga sonna step-ah apdiye line by line execute pannum. Loop na 'tiffin thinnu mudikkira varaikkum spoon eduthu vai' maadhiri condition check!",
      keyTakeaways: [
        "Code execution is strictly deterministic and sequential.",
        "Variables are named containers with lifetime and scope.",
        "Tracing values on paper before typing saves 90% of debugging time in technical tests."
      ]
    },
    practice: {
      problemTitle: "Dry-Run & Trace: The Two-Pointer Counter",
      problemDescription: "Given an array of numbers [2, 7, 11, 15] and a target sum of 9, trace the step-by-step state of two indices (left starting at 0, right starting at 3) to find the indices that sum to 9 without using nested loops.",
      hints: [
        "Hint 1 (Mental Model): Notice the array is sorted. If the sum of left and right elements is too large, which pointer MUST move to make the sum smaller?",
        "Hint 2 (Edge Case): If nums[left] + nums[right] < target, moving right further left would only make it even smaller. So you must increment left.",
        "Hint 3 (Trace Flow): Step 1: left=0 (val 2), right=3 (val 15) -> Sum=17 > 9 -> right moves to 2. Step 2: left=0 (val 2), right=2 (val 11) -> Sum=13 > 9 -> right moves to 1. Step 3: left=0 (val 2), right=1 (val 7) -> Sum=9! Found!"
      ],
      sampleInput: "nums = [2, 7, 11, 15], target = 9",
      expectedOutput: "Indices [0, 1]"
    },
    verify: {
      prompt: "Explain in your own words: Why does the two-pointer technique only work when an array is sorted, and what would happen if you ran this on an unsorted array?",
      placeholder: "Explain the monotonic property: moving pointers has predictable increase/decrease only when sorted...",
      sampleGoodAnswer: "In a sorted array, moving the left pointer right always increases or keeps the sum equal, while moving the right pointer left always decreases or keeps it equal. This predictability allows O(N) time. In an unsorted array, we cannot guarantee direction, so we'd miss candidate pairs."
    },
    status: 'in_progress',
    earnedVelocity: 0
  },
  {
    id: 2,
    title: "Memory & Arrays: The Locker Analogy",
    subtitle: "Understand contiguous allocation, index calculations, and why arrays are O(1) random access.",
    estimatedTime: "30 mins",
    track: "dsa",
    dayCategory: "Data Structures",
    learn: {
      eli5: "An array is a row of adjacent locker boxes in a school corridor numbered 0, 1, 2, 3... Because they sit side-by-side, the computer can teleport to any locker instantly if it knows locker #0's address.",
      analogy: "If locker #0 starts at memory address 1000 and each integer takes 4 bytes, locker #4 is simply at 1000 + (4 * 4) = 1016. The CPU does one multiplication and jumps there directly. That is O(1) access!",
      tanglishTip: "Hostel room corridor maadhiri dhaan! Room 101 address therinja, Room 105 kandupடிக்க ellam room-aiyum open panni paaka theva illa. Direct-ah 4 rooms thalli poiruvom. Adhaan O(1) time!",
      keyTakeaways: [
        "Arrays require contiguous memory blocks.",
        "Reading by index is instant O(1), but inserting/deleting in the middle requires shifting elements (O(N)).",
        "Array indexing is 0-based because the index represents offset from the base address."
      ]
    },
    practice: {
      problemTitle: "In-Place Array Reversal",
      problemDescription: "Given an array of characters, reverse it in-place with O(1) extra memory. Do not allocate a second array.",
      hints: [
        "Hint 1 (Symmetry): The 1st element swaps with the last, the 2nd with second-last.",
        "Hint 2 (Pointers): Keep two pointers at start (i=0) and end (j=n-1). While i < j, swap and step inward.",
        "Hint 3 (Stop condition): Once i >= j, the entire array is reversed. No temp array needed."
      ],
      sampleInput: "['h','e','l','l','o']",
      expectedOutput: "['o','l','l','e','h']"
    },
    verify: {
      prompt: "Why is inserting an element at index 0 of an array an O(N) operation, while appending at the end is O(1) amortized?",
      placeholder: "Explain how every existing element must shift to the right to make room...",
      sampleGoodAnswer: "Inserting at index 0 requires shifting every existing element one slot to the right in memory to free up the first cell. Appending at the end simply writes into the next free contiguous block without shifting existing elements."
    },
    status: 'locked'
  },
  {
    id: 3,
    title: "HashMaps Demystified: The College Library Token",
    subtitle: "Master the most asked data structure in campus rounds: instant lookups and frequency maps.",
    estimatedTime: "30 mins",
    track: "dsa",
    dayCategory: "Data Structures",
    learn: {
      eli5: "A HashMap is like a coat check room or a library bag counter. You hand in your bag (key), they give you a token number (hash code), and your bag sits on that exact shelf (bucket).",
      analogy: "Instead of searching through 10,000 students one-by-one by roll number, a hash function calculates a numeric shelf index in 1 millisecond. When two students hash to the same shelf (collision), we store them in a tiny list.",
      tanglishTip: "Supermarket luggage counter token maadhiri: Bag kudutha token number kedaikkum. Thirumba token kudutha direct-ah unga bag kedaikkum, ellam bag-aiyum theda vendiya avasiyam illa!",
      keyTakeaways: [
        "Average search, insert, and delete are O(1).",
        "Essential for frequency counting, duplicate detection, and caching.",
        "Be prepared to explain hash collisions (Chaining vs Open Addressing) in technical interviews."
      ]
    },
    practice: {
      problemTitle: "First Non-Repeating Character",
      problemDescription: "Given a string 'campusplacement', find the first character that does not repeat. If all repeat, return '$'.",
      hints: [
        "Hint 1 (Pass 1): Loop through the string once and store each character's count in a HashMap or frequency array of size 26.",
        "Hint 2 (Pass 2): Loop through the string a second time in original order. Check the map for each char.",
        "Hint 3 (Return): The first character whose mapped count is exactly 1 is your answer! Time complexity O(N)."
      ],
      sampleInput: "'campusplacement'",
      expectedOutput: "'u' (c, a, m, p repeat)"
    },
    verify: {
      prompt: "Explain how a HashMap handles collisions when two different string keys produce the same hash code.",
      placeholder: "Explain Separate Chaining (linked lists or balanced trees at the bucket index)...",
      sampleGoodAnswer: "Through Separate Chaining, each bucket stores a linked list (or balanced BST in Java 8+). When keys collide into the same bucket, the new entry is appended to that bucket's list. When retrieving, it scans that small list comparing keys with .equals()."
    },
    status: 'locked'
  },
  {
    id: 4,
    title: "Two Pointers & Sliding Windows: Visualizing Search",
    subtitle: "Cut O(N^2) nested loops down to sleek O(N) linear time for subarray and string problems.",
    estimatedTime: "35 mins",
    track: "dsa",
    dayCategory: "Algorithms",
    learn: {
      eli5: "Imagine looking at an endless train through a magnifying window that expands to the right and shrinks from the left as needed.",
      analogy: "If you want to find consecutive days where total rainfall was under 50mm, you slide a window across the calendar. When the sum exceeds 50, you slide the left day forward until it's valid again.",
      tanglishTip: "Bus window seat view maadhiri! Oru periya queue-la continuous-ah irukkura items-ah track panna, left pointer expand/shrink pannite right pointer munnadi pogum.",
      keyTakeaways: [
        "Sliding window turns quadratic O(N^2) subarray problems into linear O(N).",
        "Two pointers either move inward (opposite ends) or in tandem (same direction).",
        "Always define the invariant condition that triggers left-pointer shrink."
      ]
    },
    practice: {
      problemTitle: "Maximum Sum Subarray of Size K",
      problemDescription: "Given an array of integers [2, 1, 5, 1, 3, 2] and k=3, find the maximum sum of any contiguous subarray of size 3.",
      hints: [
        "Hint 1 (Avoid recalculating): Don't loop over 3 elements every time. Calculate the sum of the first 3 elements first.",
        "Hint 2 (Slide): To move the window right by 1, subtract the element leaving from the left and add the new element entering from the right.",
        "Hint 3 (Track max): max_sum = Math.max(max_sum, current_window_sum). Overall time: O(N)."
      ],
      sampleInput: "arr = [2, 1, 5, 1, 3, 2], k = 3",
      expectedOutput: "9 (subarray [5, 1, 3])"
    },
    verify: {
      prompt: "What is the key difference between Fixed-size Sliding Window vs Variable-size Sliding Window?",
      placeholder: "Explain fixed window width vs condition-driven dynamic window width...",
      sampleGoodAnswer: "A fixed-size window maintains a constant length K, sliding right by adding 1 and dropping 1. A variable-size window expands the right boundary until a condition is violated, then shrinks the left boundary until the condition is restored."
    },
    status: 'locked'
  },
  {
    id: 5,
    title: "Recursion & Call Stack: The Russian Nesting Dolls",
    subtitle: "Overcome fear of recursion by visualizing stack frames and base cases clearly.",
    estimatedTime: "30 mins",
    track: "both",
    dayCategory: "Foundational Logic",
    learn: {
      eli5: "Recursion is delegating a task to a clone of yourself who does one smaller piece, until the smallest clone solves the easiest possible case without delegating.",
      analogy: "Like opening Russian Matryoshka nesting dolls: you open doll 5, which contains doll 4, down to doll 1. Doll 1 is solid wood (the base case). Once you reach doll 1, you close them back up one-by-one (unwinding the call stack).",
      tanglishTip: "Cinema flashback kulla flashback maadhiri! Climax reach aana dhaan (Base case), flashback-la irundhu original story-ku thirumba vara mudiyum.",
      keyTakeaways: [
        "Every recursive function requires: 1) Base Case, 2) Work towards Base Case, 3) Recursive Call.",
        "Each call pushes a stack frame in RAM; missing base cases trigger StackOverflowError.",
        "Recursive solutions often mirror inductive mathematical reasoning."
      ]
    },
    practice: {
      problemTitle: "Factorial & State Unwinding Trace",
      problemDescription: "Write and trace the call stack for factorial(4). Specify the order of pushes and pops on the stack.",
      hints: [
        "Hint 1: Base case: if n <= 1 return 1.",
        "Hint 2: Recursive step: return n * factorial(n - 1).",
        "Hint 3: Pushes: fact(4)->fact(3)->fact(2)->fact(1). Pops: fact(1)=1 -> fact(2)=2 -> fact(3)=6 -> fact(4)=24."
      ],
      sampleInput: "n = 4",
      expectedOutput: "24"
    },
    verify: {
      prompt: "What is a Stack Overflow error, and how does the call stack limit in modern runtimes protect your operating system?",
      placeholder: "Explain stack memory exhaustion due to unbounded recursive calls...",
      sampleGoodAnswer: "A Stack Overflow occurs when recursive calls continue infinitely without hitting a base case, exhausting the dedicated thread stack memory. Runtimes enforce a call stack depth limit to prevent infinite loops from crashing the entire host OS memory."
    },
    status: 'locked'
  },
  {
    id: 6,
    title: "Web & API Architecture: The Restaurant Analogy",
    subtitle: "Demystify Client, Server, Database, HTTP Verbs, and Status Codes for fresher rounds.",
    estimatedTime: "30 mins",
    track: "general",
    dayCategory: "System & Web",
    learn: {
      eli5: "When you visit a website, your browser asks a computer thousands of miles away for data using standard polite English words (GET, POST, PUT, DELETE).",
      analogy: "Customer = Browser (Frontend). Waiter = API / HTTP Request. Chef in the kitchen = Server (Backend Logic). Cold storage pantry = Database (PostgreSQL / MongoDB).",
      tanglishTip: "Hotel-la sapda porom: Neenga client, waiter API. Waiter kitta order kodukrom (POST request). Kitchen chef cook panni waiter moolama thararu (Response 200 OK). Sapadu illa-na 404 Not Found!",
      keyTakeaways: [
        "GET retrieves data, POST creates data, PUT updates data, DELETE removes data.",
        "Status codes: 2xx Success, 3xx Redirect, 4xx Client Error (your fault), 5xx Server Error (their fault).",
        "JSON is the universal language exchanged between waiter and customer."
      ]
    },
    practice: {
      problemTitle: "API Flow Design: College Attendance Submission",
      problemDescription: "Design the HTTP request method, URL endpoint, request body JSON, and expected response code for submitting daily student attendance.",
      hints: [
        "Hint 1 (Verb): Creating new attendance records should use POST, not GET.",
        "Hint 2 (Endpoint): RESTful nouns: `/api/v1/attendance`",
        "Hint 3 (Status): On successful creation, return 201 Created with `{ success: true, recordedCount: 45 }`."
      ],
      sampleInput: "Submit 50 students attendance",
      expectedOutput: "POST /api/attendance with 201 Created"
    },
    verify: {
      prompt: "Explain the critical difference between 401 Unauthorized and 403 Forbidden in web applications.",
      placeholder: "Explain authentication (who you are) vs authorization (what you're allowed to do)...",
      sampleGoodAnswer: "401 Unauthorized means the server does not know who you are (missing or invalid credentials/token). 403 Forbidden means the server knows who you are, but your account lacks permission to access that specific resource."
    },
    status: 'locked'
  },
  {
    id: 7,
    title: "SQL & Relational Thinking: Beyond Excel",
    subtitle: "Understand relational tables, Foreign Keys, and master the JOIN mental model.",
    estimatedTime: "30 mins",
    track: "general",
    dayCategory: "Data & Databases",
    learn: {
      eli5: "A database is like a spreadsheet where rows are records and columns are fields, but with super-fast indexes and strict rules preventing typos.",
      analogy: "Instead of copying a student's full name, department, and phone number into 50 different fee receipt sheets, you give the student an ID (Primary Key) and reference that ID (Foreign Key) on the receipt. JOIN merges them together when needed.",
      tanglishTip: "College ID Card number dhaan Primary Key! Exam hall ticket, library card, bus pass ellathulayum unga ID number dhaan irukum. Adha vechu ellathaiyum connect pannalaam (JOIN).",
      keyTakeaways: [
        "Primary Key uniquely identifies a row; Foreign Key links to a Primary Key.",
        "INNER JOIN gives matching records in both tables; LEFT JOIN keeps all left records even if right has no match.",
        "WHERE filters rows before grouping; HAVING filters aggregated groups."
      ]
    },
    practice: {
      problemTitle: "Write the Query: Students with No Placed Offers",
      problemDescription: "Given `Students (student_id, name)` and `Offers (offer_id, student_id, company)`, write a query to find all students who have zero offers.",
      hints: [
        "Hint 1: Use a LEFT JOIN from Students to Offers so students without offers still appear with NULL in offer columns.",
        "Hint 2: Filter with `WHERE Offers.offer_id IS NULL`.",
        "Hint 3: Query: `SELECT s.name FROM Students s LEFT JOIN Offers o ON s.student_id = o.student_id WHERE o.offer_id IS NULL;`"
      ],
      sampleInput: "Students table & Offers table",
      expectedOutput: "Names of unplaced students"
    },
    verify: {
      prompt: "Why should you never use `WHERE COUNT(*) > 5` and must use `HAVING COUNT(*) > 5` instead?",
      placeholder: "Explain execution order: WHERE evaluates row by row before GROUP BY...",
      sampleGoodAnswer: "The WHERE clause filters individual rows before any grouping or aggregation takes place. Aggregate functions like COUNT(*) only exist after rows are grouped by GROUP BY, which is why post-aggregation filtering must be done in the HAVING clause."
    },
    status: 'locked'
  },
  {
    id: 8,
    title: "Trees & Hierarchies: The College Org Chart",
    subtitle: "Navigate hierarchical data, binary trees, and conquer Breadth-First vs Depth-First Search.",
    estimatedTime: "35 mins",
    track: "dsa",
    dayCategory: "Data Structures",
    learn: {
      eli5: "A tree is like a family tree or college hierarchy: Principal at the top (Root), who manages HODs (Children), who manage Professors (Leaves).",
      analogy: "BFS (Level-Order) explores the college floor by floor: all ground-floor classrooms first, then all 1st-floor classrooms. DFS explores one entire staircase straight to the terrace before coming back to check the second staircase.",
      tanglishTip: "College org chart: Principal (Root) -> Dept HODs -> Faculty. Level by level paatha BFS (Queue use pannuvom). Oru pathway-ah end varaikum poi thirumba vandha DFS (Stack / Recursion use pannuvom).",
      keyTakeaways: [
        "Trees have no cycles and exactly N-1 edges for N nodes.",
        "BFS uses a Queue data structure (FIFO).",
        "DFS uses Recursion or a Stack (LIFO)."
      ]
    },
    practice: {
      problemTitle: "Maximum Depth of Binary Tree",
      problemDescription: "Find the length of the longest path from the root node down to the farthest leaf node.",
      hints: [
        "Hint 1 (Recursion): The depth of any node is 1 + max(depth of left child, depth of right child).",
        "Hint 2 (Base case): If node == null, depth is 0.",
        "Hint 3: One-line logic: `return root == null ? 0 : 1 + Math.max(maxDepth(root.left), maxDepth(root.right));`"
      ],
      sampleInput: "[3, 9, 20, null, null, 15, 7]",
      expectedOutput: "3"
    },
    verify: {
      prompt: "When would you prefer BFS over DFS when searching for the shortest path in an unweighted tree or graph?",
      placeholder: "Explain how BFS explores nearest neighbors first in expanding waves...",
      sampleGoodAnswer: "BFS explores nodes in expanding concentric layers (distance 1, then distance 2, etc.). Therefore, the very first time BFS encounters the target node, it is guaranteed to be the shortest path in an unweighted graph. DFS might wander down an extremely long path first."
    },
    status: 'locked'
  },
  {
    id: 9,
    title: "Object-Oriented Design: Modeling Real Systems",
    subtitle: "Explain Encapsulation, Abstraction, Inheritance, and Polymorphism without textbook clichés.",
    estimatedTime: "25 mins",
    track: "both",
    dayCategory: "Architecture",
    learn: {
      eli5: "OOP is bundling data and the functions that manipulate that data into self-contained gadgets, so one broken gadget doesn't set the entire factory on fire.",
      analogy: "A car steering wheel: You don't need to know how the hydraulic steering rack works underneath (Abstraction). The engine wires are sealed under the bonnet (Encapsulation). An EV inherits wheels and brakes from standard Car (Inheritance), but implements its own accelerate() sound (Polymorphism).",
      tanglishTip: "Car driving example: Neenga accelerator amukkuna vandi pogum (Abstraction). Engine mechanics ungalukku theriya theva illa. EV car and Petrol car rendume accelerate pannum, aana internal logic vera (Polymorphism)!",
      keyTakeaways: [
        "Encapsulation protects internal state via private fields and getters/setters.",
        "Polymorphism allows treating different subclasses through a common parent interface.",
        "Prefer composition over deep inheritance trees in modern development."
      ]
    },
    practice: {
      problemTitle: "Design a Payment Gateway Interface",
      problemDescription: "Create a clean OOP contract `PaymentProcessor` with an `executePayment(amount)` method, implemented by `UpiProcessor` and `CardProcessor`.",
      hints: [
        "Hint 1: Define an interface or abstract base class with `executePayment(double amount): boolean`.",
        "Hint 2: Subclasses implement specific validation (UPI checks VPA, Card checks CVV).",
        "Hint 3: Client checkout code depends only on `PaymentProcessor`, allowing plug-and-play addition of new methods."
      ],
      sampleInput: "Payment request of 500 via UPI",
      expectedOutput: "Payment successful via UPI"
    },
    verify: {
      prompt: "What does 'Programming to an interface, not an implementation' mean in a technical interview?",
      placeholder: "Explain decoupling, modularity, and dependency injection...",
      sampleGoodAnswer: "It means high-level business code should depend on abstract contracts (interfaces) rather than concrete classes. This allows swapping implementations (e.g. switching from PayPal to Stripe, or substituting mock data in unit tests) without modifying core business logic."
    },
    status: 'locked'
  },
  {
    id: 10,
    title: "System Design for Freshers: The URL Shortener",
    subtitle: "Show interviewers you think like a software engineer: Caching, Database choices, and Capacity.",
    estimatedTime: "30 mins",
    track: "general",
    dayCategory: "System & Web",
    learn: {
      eli5: "A URL shortener (like bit.ly) maps a giant 100-character URL to a short 7-character code, saves the pair in a database, and redirects visitors instantly.",
      analogy: "Like a luggage token counter at a railway station: instead of carrying a massive 50kg trunk into every shop, you leave it in the cloakroom and carry a tiny slip with ticket #A92X. Whenever you show the slip, you get your trunk.",
      tanglishTip: "Railway cloakroom token maadhiri dhaan! Periya suitcase-ah vachitu chinnatha oru token vaangikrom. Token potta suitcase tharuvanga. URL shortener also does the same key-value redirection.",
      keyTakeaways: [
        "Base62 encoding (a-z, A-Z, 0-9) allows billions of unique 7-character URLs.",
        "Read-heavy systems (100 reads per 1 write) benefit massively from an in-memory Redis cache.",
        "Always clarify scale requirements (DAU, storage needs, latency SLAs) first."
      ]
    },
    practice: {
      problemTitle: "Design the 3-Layer Schema & Flow",
      problemDescription: "Outline the database schema (columns, types, indexes) and Redis caching strategy for a shortener handling 10 million daily clicks.",
      hints: [
        "Hint 1 (DB Schema): Table `urls`: `id (BIGINT PK)`, `short_code (VARCHAR 7 UNIQUE INDEX)`, `long_url (TEXT)`, `created_at`.",
        "Hint 2 (Cache): When a user visits `short.ly/xyz`, check Redis `GET xyz`. If cache hit, redirect immediately (sub-5ms).",
        "Hint 3 (Cache Miss): If miss, fetch from PostgreSQL, write to Redis with 24-hr TTL, then redirect."
      ],
      sampleInput: "Shorten https://myuniversity.edu/placements/2026/notice-board",
      expectedOutput: "short.ly/k9Z2w"
    },
    verify: {
      prompt: "Why is Redis or Memcached so much faster than querying a traditional SQL database on disk?",
      placeholder: "Explain in-memory RAM storage vs mechanical/SSD disk I/O...",
      sampleGoodAnswer: "Redis stores all data entirely in RAM (random access memory), eliminating disk I/O seek times and complex SQL query parsing. RAM operations run at nanosecond speeds compared to millisecond disk latency."
    },
    status: 'locked'
  },
  {
    id: 11,
    title: "Git & Team Collaboration: The Time Machine",
    subtitle: "How to answer git questions confidently and explain branch workflows without hesitation.",
    estimatedTime: "25 mins",
    track: "general",
    dayCategory: "Engineering Practices",
    learn: {
      eli5: "Git is a video game save-point system for code. Whenever your code works, you save a checkpoint (commit). If you break something later, you can rewind time in one second.",
      analogy: "Branches are parallel universes: you can build a new rocket engine in universe 'feature/rocket' without disturbing universe 'main'. When it works, you merge the universes together.",
      tanglishTip: "Game save point maadhiri! Boss fight munnadi save pannuvom la? Adhan commit. Thothutom na thirumba anga irundhu start pannalaam. Git reset is your rewind button!",
      keyTakeaways: [
        "Commit messages should explain 'why', not just 'what'.",
        "Merge conflicts happen when two teammates edit the exact same line in different ways.",
        "Always pull before pushing to avoid out-of-sync branches."
      ]
    },
    practice: {
      problemTitle: "Resolving a Merge Conflict Scenario",
      problemDescription: "You and a teammate both changed the API base URL in `config.js`. Explain step-by-step how you inspect, choose, and finalize the merge.",
      hints: [
        "Hint 1: Git inserts conflict markers: `<<<<<<< HEAD` (your changes) and `>>>>>>> teammate-branch`.",
        "Hint 2: Open the file, consult with the teammate or project spec, delete the conflict markers, and keep the correct production URL.",
        "Hint 3: Run `git add config.js` and `git commit -m 'resolve merge conflict in config'`."
      ],
      sampleInput: "Conflict markers in config.js",
      expectedOutput: "Clean resolved file and merge commit"
    },
    verify: {
      prompt: "What is the difference between `git merge` and `git rebase`?",
      placeholder: "Explain preserving original branch history vs linear replaying of commits...",
      sampleGoodAnswer: "Git merge combines branches by creating a new merge commit, preserving the exact historical timeline of both branches. Git rebase moves the base of your feature branch to the tip of main by replaying your commits on top, creating a clean linear history."
    },
    status: 'locked'
  },
  {
    id: 12,
    title: "STAR Behavioral Masterclass: Turn Mini-Projects into Offers",
    subtitle: "Structure answers for HR and managerial rounds: Situation, Task, Action, Result.",
    estimatedTime: "30 mins",
    track: "both",
    dayCategory: "Interview Mastery",
    learn: {
      eli5: "The STAR technique is storytelling formula for engineers. Never give a dry answer like 'Yes I did a project'. Tell a mini movie with a problem, your role, the hard work, and the measurable win.",
      analogy: "Like a superhero movie: Situation (Gotham is in danger), Task (Stop the bank robbery), Action (Batman deploys the batmobile and disarms the bombs), Result (All hostages saved and bank secured 100%).",
      tanglishTip: "Cinema trailer maadhiri dhaan: Problem enna (Situation), neenga enna pannanum (Task), neenga enna coding/action edutheenga (Action), and adhanala enna impact aachu (Result - e.g. 30% faster!).",
      keyTakeaways: [
        "Spend 70% of your time on Action (what YOU specifically coded or decided).",
        "Always quantify the Result with metrics (e.g. reduced load time by 30%, handled 500 college registrations).",
        "Be ready with 3 stories: a technical challenge, a conflict with a teammate, and a time you failed."
      ]
    },
    practice: {
      problemTitle: "Frame a College Project with the STAR Formula",
      problemDescription: "Transform 'I made an online bookstore website in college' into a high-impact 4-line STAR pitch.",
      hints: [
        "Hint 1 (Situation): Our college department library faced huge physical queues during semester exam weeks.",
        "Hint 2 (Task & Action): I built a responsive web portal using React and Node.js with indexed search and real-time availability status.",
        "Hint 3 (Result): Reduced book checkout wait times from 25 minutes to under 2 minutes for 400+ department students."
      ],
      sampleInput: "Basic library website project",
      expectedOutput: "High-impact STAR narrative with metrics"
    },
    verify: {
      prompt: "How would you handle an interviewer asking: 'Tell me about a time you had a serious conflict with a team member in a project'?",
      placeholder: "Focus on de-escalation, listening, data-driven decisions, and project success...",
      sampleGoodAnswer: "Focus on task-based disagreements (not personal egos). Describe listening actively to their viewpoint, proposing an objective benchmark or proof-of-concept to compare approaches with data, and aligning on what best served the project deadline."
    },
    status: 'locked'
  },
  {
    id: 13,
    title: "Handling Tricky Questions: The Corporate Pivot Playbook",
    subtitle: "Never say 'I don't know' and freeze. Learn graceful corporate pivots that interviewers love.",
    estimatedTime: "25 mins",
    track: "both",
    dayCategory: "Interview Mastery",
    learn: {
      eli5: "Interviewers do not expect freshers to know every technology under the sun. They test how you react when you don't know something: do you panic, pretend, or demonstrate structured learning?",
      analogy: "If a doctor is asked about a brand-new experimental drug, they don't guess. They say: 'While I haven't prescribed that specific molecule yet, based on its pharmaceutical class, it works on receptor X, and here is how I would evaluate it safely.'",
      tanglishTip: "Oru question therila-na 'therila sir' nu blank aagara koodadhu. 'Indha specific tool naan innum use pannala, aana idhoda underlying concept idhu dhaan nu enakku theriyum' nu confidence-ah pivot pannanum!",
      keyTakeaways: [
        "Never guess or bluff; senior engineers spot guessing in 5 seconds.",
        "Acknowledge the question with enthusiasm.",
        "Bridge to foundational knowledge you DO know (The Pivot Formula).",
        "Show curiosity and explain how you would quickly verify it."
      ]
    },
    practice: {
      problemTitle: "Execute the Pivot: 'Have you used Kafka in production?'",
      problemDescription: "As a college fresher, an interviewer asks if you've deployed Kafka clusters. Craft the safe pivot response without lying.",
      hints: [
        "Hint 1 (Acknowledge honestly): 'I haven't deployed Kafka in a high-volume production environment yet...'",
        "Hint 2 (Bridge to fundamentals): '...however, I understand that Kafka operates as a distributed publish-subscribe event log with partitioned topics for horizontal scale.'",
        "Hint 3 (Relate to experience): 'In my college project, I handled asynchronous decoupling using simple job queues with BullMQ, and I am excited to scale up to Kafka-level systems.'"
      ],
      sampleInput: "'Do you have Kafka production experience?'",
      expectedOutput: "Safe corporate pivot statement"
    },
    verify: {
      prompt: "Give the 3-step corporate pivot formula you will use if asked an unfamiliar framework or cloud service.",
      placeholder: "1) Transparent acknowledgment, 2) Fundamental principle mapping, 3) Related hands-on bridge...",
      sampleGoodAnswer: "1. Transparent Acknowledgment: 'I haven't worked with that specific tool in production yet.' 2. Architectural Mapping: 'However, my understanding is that its core purpose is X (e.g. distributed caching / event streaming).' 3. Hands-on Bridge: 'In my recent project, I solved a similar requirement using Y, and because the mental models match, I can quickly ramp up on this.'"
    },
    status: 'locked'
  },
  {
    id: 14,
    title: "The Offer Pitch: Final Capstone & Readiness Review",
    subtitle: "Put all 13 days together: technical agility, clean articulation, and confident offer delivery.",
    estimatedTime: "30 mins",
    track: "both",
    dayCategory: "Offer Capstone",
    learn: {
      eli5: "You are not selling code; you are demonstrating that you are a dependable, fast-learning engineer who will be a net positive to the team from Day 1.",
      analogy: "Like a pilot finishing flight simulator training: you've practiced normal takeoff, turbulence, engine checks, and safe landings. Now you step into the real cockpit with calm confidence.",
      tanglishTip: "14 days hard work-oda climax! Neenga expert aaga theva illa, train panna ready-ah irukura energetic engineer nu kaatinalae campus placement confirm!",
      keyTakeaways: [
        "Review your Readiness Radar: celebrate your Personal Velocity (+14% to +40%).",
        "Ask intelligent closing questions at the end of every interview.",
        "Keep your GitHub and Day-0 profile clean and accessible."
      ]
    },
    practice: {
      problemTitle: "Reverse Interviewing: 3 Smart Questions to Ask the Interviewer",
      problemDescription: "Draft 3 thoughtful, non-generic questions to ask the interviewer when they say 'Do you have any questions for me?'",
      hints: [
        "Hint 1 (Engineering culture): 'What does the onboarding process look like for a graduate engineer during the first 90 days?'",
        "Hint 2 (Architecture): 'What is the most interesting technical bottleneck the team solved in the last quarter?'",
        "Hint 3 (Growth): 'What qualities distinguish freshers who ramp up and make an impact fastest in this role?'"
      ],
      sampleInput: "'Do you have any questions for us?'",
      expectedOutput: "3 high-impact reverse interview questions"
    },
    verify: {
      prompt: "Why is asking questions at the end of the interview just as important as answering their technical questions?",
      placeholder: "Demonstrates genuine engagement, active listening, and engineering maturity...",
      sampleGoodAnswer: "It proves you are not passively looking for any job, but actively evaluating the engineering environment. It leaves a lasting final impression of curiosity, critical thinking, and professional maturity."
    },
    status: 'locked'
  }
];
