import { MockInterviewQuestion } from '@/types';

export const MOCK_INTERVIEW_QUESTIONS: MockInterviewQuestion[] = [
  {
    id: 'mock-1',
    category: 'System Flow',
    question: 'Walk me through what happens under the hood when a user types a URL (like google.com) and presses Enter.',
    context: 'Standard campus technical round question tested at TCS Digital, Zoho, Infosys, and Cognizant to evaluate end-to-end mental models.',
    interviewerTone: 'Friendly Technical Lead',
    trickyAspect: 'Candidates often jump straight to HTML/CSS rendering without mentioning DNS lookup, TCP 3-way handshake, or HTTP request/response cycles.',
    corporatePivotPhrase: 'While I haven\'t managed enterprise DNS servers myself, I understand the core sequence: browser checks local/DNS cache for the IP, initiates a TCP 3-way handshake with the server, sends an HTTP GET request, receives the HTML payload, and then constructs the DOM and CSSOM trees to paint the screen.',
    mentorExplanation: 'Do not panic trying to name every networking protocol. The interviewer is checking if you have an organized 4-part mental model: 1) Address resolution (DNS), 2) Connection (TCP handshake), 3) Exchange (HTTP Request & Response), and 4) Client Rendering (DOM/CSSOM).',
    idealKeypoints: [
      'DNS resolution (browser cache -> OS -> ISP resolver -> IP address)',
      'TCP 3-way handshake (SYN, SYN-ACK, ACK)',
      'HTTP/HTTPS GET request sent with headers',
      'Server processes and responds with HTTP status code and HTML body',
      'Browser parses HTML to DOM, CSS to CSSOM, executes scripts, and paints the pixels'
    ]
  },
  {
    id: 'mock-2',
    category: 'Technical Foundation',
    question: 'What is a Database Index, how does it speed up queries, and why shouldn\'t we just put an index on every single column?',
    context: 'Frequent question in SQL / Backend interviews at Zoho, Cognizant, and product firms.',
    interviewerTone: 'Product Architect',
    trickyAspect: 'Candidates understand that indexes speed up SELECTs, but forget that every INSERT, UPDATE, and DELETE becomes slower because the index B-Tree must be rewritten, plus it consumes extra disk space.',
    corporatePivotPhrase: 'An index is like the index at the back of a textbook: it allows rapid O(log N) lookups without scanning every single page sequentially. While it significantly boosts SELECT performance, we avoid indexing every column because every write operation (INSERT/UPDATE/DELETE) has to keep that B-tree updated, which degrades write throughput.',
    mentorExplanation: 'Always mention the trade-off! Engineering in real life is about trade-offs. An index trades disk space and write speed to gain lightning-fast read speed.',
    idealKeypoints: [
      'Index functions like an alphabetical book index (usually B-Tree or Hash in SQL)',
      'Changes full table scans (O(N)) into logarithmic searches (O(log N))',
      'Trade-off 1: Slows down INSERT, UPDATE, and DELETE operations',
      'Trade-off 2: Consumes additional storage space on disk and memory'
    ]
  },
  {
    id: 'mock-3',
    category: 'Technical Foundation',
    question: 'Have you implemented Redis in-memory caching and Apache Kafka event streams in high-throughput production environments?',
    context: 'A deliberate "stretch / pressure test" question often asked to freshers to see if they will bluff or demonstrate honest foundational reasoning.',
    interviewerTone: 'Product Architect',
    trickyAspect: 'Interviewers know 95% of freshers have not configured production Kafka clusters. If you fake it, they will ask detailed partitioning questions and catch you.',
    corporatePivotPhrase: 'While I have not yet deployed Kafka or Redis in an enterprise production cluster, my understanding is that Redis acts as an in-memory key-value cache to eliminate repeated database disk reads, and Kafka decouples microservices asynchronously via distributed topic logs. In my college project, I achieved a similar decoupling using asynchronous queues, and because I understand the core pub-sub architecture, I am eager to ramp up on Redis and Kafka on your team.',
    mentorExplanation: 'Notice the 3-step pivot formula: 1) Honest transparency, 2) Accurate fundamental definition, and 3) Practical bridge to what you built in your coursework or mini-project. This transforms an unknown into an impressive show of engineering integrity!',
    idealKeypoints: [
      'Transparent admission without panic',
      'Clear definition of Redis (in-memory caching for low latency)',
      'Clear definition of Kafka (distributed event streaming for asynchronous message queues)',
      'Bridge to college project or foundational message queues',
      'Enthusiastic ramp-up readiness'
    ]
  },
  {
    id: 'mock-4',
    category: 'Project Deep-Dive',
    question: 'Tell me about the most difficult bug you encountered in your main project and how you systematically tracked it down.',
    context: 'Campus interviewers love debugging stories because it proves the candidate actually built the code themselves rather than copying a YouTube tutorial.',
    interviewerTone: 'Friendly Technical Lead',
    trickyAspect: 'Candidates often say "I had a syntax error" or "I restarted my computer and it worked". Interviewers want to see scientific diagnosis: reproduction, isolation, hypothesis, and resolution.',
    corporatePivotPhrase: 'In my project, we had an intermittent issue where API requests would occasionally hang and time out under concurrent form submissions. Rather than guessing, I isolated the issue by reproducing it locally, added structured logging at each middleware boundary, and discovered an unclosed database connection pool in an error-handling catch block. Fixing that connection leak brought response times down to under 120ms.',
    mentorExplanation: 'Use the Detective structure: 1) The symptom (what was failing?), 2) The hypothesis (what did you suspect?), 3) The investigation tool (logs, debugger, network tab), and 4) The root cause fix + lesson learned.',
    idealKeypoints: [
      'Specific symptom described clearly',
      'Methodical reproduction instead of random guessing',
      'Use of debugging tools (browser DevTools, console logging, network inspector)',
      'Root cause identified and permanently fixed',
      'Preventive measure or unit test added'
    ]
  },
  {
    id: 'mock-5',
    category: 'HR & Behavioral',
    question: 'Why our company? Many candidates apply to 20 different campus drives at once. What specifically makes you want to build your career here?',
    context: 'HR and Managerial round staple at TCS, Infosys, Zoho, Cognizant, and Accenture.',
    interviewerTone: 'HR Director',
    trickyAspect: 'Candidates often give hollow praise like "Your company is a leading MNC and has good brand value". Interviewers want to hear specific engineering culture, product focus, or learning opportunities.',
    corporatePivotPhrase: 'What excites me about your team is your strong engineering culture and emphasis on internal innovation—for example, your proprietary product suite and focus on training freshers through rigorous early project assignments. Given my foundational skills in web architecture and my commitment to rapid learning, I want to start my career in an environment that rewards problem solvers and engineering discipline.',
    mentorExplanation: 'Reference 1 specific real aspect of the company (e.g. Zoho\'s bootstrapped culture and in-house tools; TCS\'s global training infrastructure; product scale) and connect it directly to your personal learning velocity.',
    idealKeypoints: [
      'Specific knowledge of company focus and culture',
      'Connection between your technical foundation and their business needs',
      'Demonstrated enthusiasm for continuous learning and dependable execution',
      'Positive long-term perspective'
    ]
  }
];
