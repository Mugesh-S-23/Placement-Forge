import { StudyMaterialItem } from '@/types';

export const STUDY_MATERIALS: StudyMaterialItem[] = [
  // 1. Full-Stack Web Dev
  {
    id: 'mat-fs-1',
    title: 'Client-Server & REST API Architecture: Complete Primer',
    roleTarget: 'Full-Stack Web Dev',
    category: 'Real-World Systems',
    readTime: '12 mins',
    summary: 'The end-to-end mental model of how modern web applications communicate. Covers HTTP methods, request headers, status codes, CORS, and JSON data contracts without textbooks.',
    analogy: 'The Restaurant Model: Client = Customer ordering food. API Request = The Waiter carrying the order slip. Server = The Kitchen Chef preparing the dish. Database = The Pantry/Fridge where ingredients are stored.',
    tanglishSummary: 'Client na browser, server na kitchen chef, API na waiter. Waiter kitta order tharom (POST request). Chef cook panni waiter moolama delivery pandraaru (Response 200 OK). Sapadu illana 404 Not Found!',
    keyConcepts: [
      'HTTP Verbs: GET (Read), POST (Create), PUT/PATCH (Update), DELETE (Remove).',
      'Status Code Families: 2xx (Success), 3xx (Redirect), 4xx (Client fault - e.g. 401 unauthenticated, 404 not found), 5xx (Server fault - e.g. 500 internal error).',
      'Statelessness: Each request contains all credentials (e.g. JWT Bearer token) needed for the server to process it.',
      'CORS (Cross-Origin Resource Sharing): A browser security rule preventing rogue domains from reading your private API responses.'
    ],
    codeCheatSheet: `// Express.js REST API Endpoint Anatomy
app.post('/api/v1/orders', async (req, res) => {
  try {
    const { itemId, quantity } = req.body;
    if (!itemId || quantity <= 0) {
      return res.status(400).json({ error: 'Invalid order input' });
    }
    const order = await db.orders.create({ itemId, quantity, status: 'CONFIRMED' });
    return res.status(201).json({ success: true, orderId: order.id });
  } catch (err) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});`,
    interviewQuestions: [
      {
        question: 'What is the difference between PUT and PATCH in REST APIs?',
        idealAnswer: 'PUT replaces the entire resource with the payload sent in the request, meaning missing fields are wiped. PATCH updates only the specific fields supplied, leaving other existing properties intact.',
        corporatePivot: 'While I have used PUT in my college project forms, I understand PATCH is optimal for partial updates like updating just a user profile bio to save network bandwidth.'
      },
      {
        question: 'What is CORS and why does it only happen in web browsers?',
        idealAnswer: 'CORS is a browser-enforced security sandbox. Mobile apps or Postman can call any API directly, but browsers block cross-origin script responses unless the API returns Access-Control-Allow-Origin headers.',
        corporatePivot: 'I have configured CORS middleware in Express.js by whitelisting our frontend domain to securely exchange JSON payloads.'
      }
    ]
  },

  // 2. Data Analyst & BI (SQL/Python)
  {
    id: 'mat-da-1',
    title: 'SQL & Relational Analytics: Master JOINs, Aggregations & Window Functions',
    roleTarget: 'Data Analyst & BI (SQL/Python)',
    category: 'Fundamentals',
    readTime: '15 mins',
    summary: 'A complete, self-contained cheat sheet for campus SQL rounds. Explains execution order, GROUP BY pitfalls, INNER vs LEFT JOIN, and window functions like ROW_NUMBER().',
    analogy: 'College Marksheets: Table A has Student Info (ID, Name, Branch). Table B has Exam Marks (ID, Subject, Score). An INNER JOIN gives students who wrote exams. A LEFT JOIN keeps all students, filling missing marks with NULL.',
    tanglishSummary: 'College ID card number vechu library passbook-aiyum exam marksheet-aiyum join pandrom. INNER JOIN rendulayum irukardha mattum kaatum, LEFT JOIN student list-ah full-ah maintain pannum.',
    keyConcepts: [
      'SQL Execution Order: FROM -> JOIN -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT.',
      'WHERE vs HAVING: WHERE filters raw rows BEFORE grouping; HAVING filters aggregated groups AFTER GROUP BY.',
      'Window Functions: ROW_NUMBER() OVER (PARTITION BY dept ORDER BY salary DESC) ranks items inside each department without collapsing rows.'
    ],
    codeCheatSheet: `-- Top 2nd Highest Salary per Department (Classic Interview Query)
WITH RankedSalaries AS (
  SELECT 
    emp_name, 
    department, 
    salary,
    DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) as rank_num
  FROM Employees
)
SELECT emp_name, department, salary
FROM RankedSalaries
WHERE rank_num = 2;`,
    interviewQuestions: [
      {
        question: 'Why does WHERE COUNT(*) > 5 cause a syntax error in SQL?',
        idealAnswer: 'Because WHERE evaluates row-by-row before any aggregation has happened. Aggregate functions like COUNT(*) only exist after GROUP BY, so filtering on count must be placed in the HAVING clause.',
        corporatePivot: 'In my database lab, whenever I needed to filter active customer cohorts with multiple purchases, I always structured it using GROUP BY customer_id HAVING count(order_id) >= 2.'
      },
      {
        question: 'What is the difference between RANK() and DENSE_RANK()?',
        idealAnswer: 'If two employees tie for 1st place, RANK() gives the next person 3rd place (skips rank 2). DENSE_RANK() does not skip numbers and assigns the next person 2nd place.',
        corporatePivot: 'I use DENSE_RANK() when calculating placement cutoffs to ensure grade tiers remain continuous.'
      }
    ]
  },

  // 3. Core Engineering & Embedded Systems (ECE/EEE/Mech)
  {
    id: 'mat-core-1',
    title: 'Embedded Systems & Hardware Logic: C, Registers, Protocols & State Machines',
    roleTarget: 'Core Engineering & Embedded (ECE/EEE/Mech)',
    category: 'Core Domain',
    readTime: '14 mins',
    summary: 'Tailored for Electrical, Electronics, and Mechanical engineers. Master bit manipulation, volatile keywords, UART vs I2C vs SPI communication, and finite state machines.',
    analogy: 'Light Switchboard with Binary Levers: Each pin on a microcontroller is a tiny transistor gate. When you set bit 3 to 1, you flip switch #3 to ON. Writing directly to registers bypasses high-level software for microsecond control.',
    tanglishSummary: 'Microcontroller pins-ah control panna binary bits use pandrom. Bit 1 na 5V High, bit 0 na 0V Ground. Sensor kooda communicate panna I2C / SPI protocols use pandrom. Room light switch board maadhiri dhaan!',
    keyConcepts: [
      'Bit Manipulation: Setting bit `REG |= (1 << n)`, Clearing bit `REG &= ~(1 << n)`, Toggling bit `REG ^= (1 << n)`.',
      'The `volatile` Keyword: Tells the compiler that a variable can change outside normal program control (e.g. by hardware ISR / sensor interrupt), preventing compiler optimization.',
      'Protocols Comparison: UART (Asynchronous, 2 wires: TX/RX), I2C (Synchronous, 2 wires: SDA/SCL, multi-device addressing), SPI (Synchronous, 4 wires: MOSI/MISO/SCK/SS, fastest speed).'
    ],
    codeCheatSheet: `// Embedded C: Bit Manipulation & ISR Register Control
#define PIN_LED 3

void turnOnLed(volatile uint8_t *PORT) {
  *PORT |= (1 << PIN_LED); // Set bit 3 to HIGH (1)
}

void turnOffLed(volatile uint8_t *PORT) {
  *PORT &= ~(1 << PIN_LED); // Clear bit 3 to LOW (0)
}

void toggleLed(volatile uint8_t *PORT) {
  *PORT ^= (1 << PIN_LED); // Invert bit 3
}`,
    interviewQuestions: [
      {
        question: 'Why is the "volatile" keyword crucial in embedded C programs?',
        idealAnswer: 'Without volatile, an optimizing compiler might cache a memory location in a CPU register and assume it never changes inside a loop. If that variable represents a hardware pin or interrupt flag, the loop would freeze. Volatile forces the CPU to re-read the actual RAM/hardware address every single time.',
        corporatePivot: 'In my microcontroller lab project with an ultrasonic distance sensor, declaring the timer capture flag as volatile was essential to ensure the main loop recognized the interrupt completion.'
      },
      {
        question: 'Compare I2C vs SPI: When would you pick one over the other?',
        idealAnswer: 'I2C uses only 2 wires (SDA & SCL) and supports dozens of slave devices on a shared bus via 7-bit addresses, saving PCB traces. SPI uses 4 wires per device but offers full-duplex transmission and much higher clock speeds (up to 50MHz vs I2C\'s 400kHz/1MHz).',
        corporatePivot: 'For display modules and high-speed flash memory, I use SPI; for reading multiple slow temperature and humidity sensors on a compact board, I prefer I2C.'
      }
    ]
  },

  // 4. IT Services & Campus Aptitude (TCS, Infosys, CTS, Wipro, Zoho)
  {
    id: 'mat-its-1',
    title: 'TCS NQT & IT Services Fast-Track: Mental Math & Code Tracing',
    roleTarget: 'IT Services & Campus Aptitude (TCS/Infosys/CTS)',
    category: 'Interview Cheat Sheet',
    readTime: '12 mins',
    summary: 'Designed for students from all departments (ECE, Mech, Civil, Biotech, CSE) appearing for mass recruitment campus drives. Shortcuts for Speed-Time, Percentages, and dry-run code tracing.',
    analogy: 'Train Crossing a Platform: When a train crosses a standing person, distance = Train Length. When a train crosses a 200m platform, distance = Train Length + Platform Length. Speed is constant, so cross-multiplication solves it in 15 seconds.',
    tanglishSummary: 'TCS NQT aptitude la formula mug up panna theva illa! Ratio and unitary method vechu time, speed, distance and work-time problems 30 seconds-la solve pannalaam.',
    keyConcepts: [
      'Aptitude Speed Multiplier: Speed in m/s = (Speed in km/h) * (5 / 18). Speed in km/h = (Speed in m/s) * (18 / 5).',
      'Work & Time: If A does a job in X days and B does it in Y days, together they take (X * Y) / (X + Y) days.',
      'C Loop & Pre/Post-Increment Tracing: `int a = 5; int b = a++;` sets b=5, a=6. `int c = ++a;` sets a=7, c=7.',
      'Handling Constraints: Campus coding tests test corner cases: Array size = 0, negative values, and numbers > 2^31 (use `long long` in C++ / BigInt in JS).'
    ],
    codeCheatSheet: `// TCS NQT Standard Pattern: Array Frequency Count without Map
#include <stdio.h>

void printFrequency(int arr[], int n) {
  int freq[1001] = {0}; // frequency bucket array
  for (int i = 0; i < n; i++) {
    freq[arr[i]]++;
  }
  for (int i = 0; i < 1001; i++) {
    if (freq[i] > 0) {
      printf("Element %d appears %d times\\n", i, freq[i]);
    }
  }
}`,
    interviewQuestions: [
      {
        question: 'What happens if you declare an array of size 10 and access index 10 in C/C++?',
        idealAnswer: 'Arrays in C/C++ are 0-indexed, so valid indices are 0 to 9. Accessing index 10 is an out-of-bounds memory read (Undefined Behavior). It does not automatically throw an error like Java, but might read garbage data or trigger a Segmentation Fault.',
        corporatePivot: 'In all my campus coding practice, I strictly bound loop conditions to `i < n` instead of `i <= n` to prevent buffer overflow vulnerabilities.'
      },
      {
        question: 'How do you determine if a number is prime in O(sqrt(N)) time instead of O(N)?',
        idealAnswer: 'Factors always appear in pairs (e.g. for 36: 1*36, 2*18, 3*12, 4*9, 6*6). If no factor divides N up to its square root, no larger factor can exist. Thus checking divisibility up to sqrt(N) guarantees prime status.',
        corporatePivot: 'I used this O(sqrt(N)) optimization in the TCS NQT coding round to ensure our solution passed within the 1.0-second compiler execution limit.'
      }
    ]
  },

  // 5. Software Development Engineer (Campus SDE)
  {
    id: 'mat-sde-1',
    title: 'SDE Core Foundations: Time Complexity & Memory Layout',
    roleTarget: 'Software Development Engineer (Campus SDE)',
    category: 'Fundamentals',
    readTime: '13 mins',
    summary: 'Deep-dive into Big-O notation, Heap vs Stack memory, reference semantics, and how CPUs read cache lines for top product and tier-1 campus SDE hiring.',
    analogy: 'Stack vs Heap: Stack memory is like a stack of cafeteria plates—super fast, automatically reclaimed when function ends. Heap memory is like booking a hotel room—you can request any size, but you must remember the room key (pointer) and check out when done.',
    tanglishSummary: 'Stack memory local variables ku instant allocation. Function mudinjudha stack frame clear aayidum. Heap memory la periya objects store aagum, garbage collector free pannum.',
    keyConcepts: [
      'Big-O Hierarchy: O(1) < O(log N) < O(N) < O(N log N) < O(N^2) < O(2^N).',
      'Memory: Stack is fixed-size and thread-local; Heap is dynamic and shared.',
      'Pass by Value vs Reference: Primitive values (int, float) pass copies; Objects pass memory reference addresses.'
    ],
    codeCheatSheet: `// SDE Two Pointers Palindrome Check O(N) Time O(1) Space
function isPalindrome(str) {
  let left = 0;
  let right = str.length - 1;
  while (left < right) {
    if (str[left] !== str[right]) return false;
    left++;
    right--;
  }
  return true;
}`,
    interviewQuestions: [
      {
        question: 'Why is an array faster than a linked list for sequential iteration?',
        idealAnswer: 'Arrays store data in contiguous RAM blocks, which allows the CPU hardware to load an entire cache line (64 bytes) into L1/L2 cache ahead of time (Spatial Locality). Linked lists scatter nodes randomly in memory, causing frequent CPU cache misses.',
        corporatePivot: 'While linked lists provide O(1) insertions, in practical production applications arrays frequently outperform them due to modern CPU cache prefetching.'
      }
    ]
  }
];
