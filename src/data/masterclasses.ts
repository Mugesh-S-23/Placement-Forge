import { MasterclassItem } from '@/types';

export const MASTERCLASSES: MasterclassItem[] = [
  {
    id: 'mc-1',
    title: 'The Non-CS Student\'s Playbook for Campus Tech Placements',
    category: 'Alumni Placement Secrets',
    speaker: 'Siddharth M.',
    speakerRole: 'Software Engineer @ Zoho (Ex-Mechanical Engg)',
    duration: '18 mins',
    summary: 'How non-computer science students can bridge the syllabus gap, build 2 credible full-stack projects, and clear round 1 & 2 coding tests with high confidence.',
    takeaways: [
      'Focus on 3 core pillars: Arrays/HashMaps, Basic SQL JOINs, and 1 clean GitHub project with a live link.',
      'How to explain your branch transition positively: Frame your core engineering background as analytical discipline.',
      'The exact 60-day calendar used to crack Zoho Round 2 (Advanced Programming).'
    ],
    videoUrl: 'https://www.youtube-nocookie.com/embed/8mAITcNt710',
    youtubeId: '8mAITcNt710'
  },
  {
    id: 'mc-2',
    title: 'Cracking TCS NQT & Cognizant GenC: Aptitude & Coding Strategy',
    category: 'Alumni Placement Secrets',
    speaker: 'Priya R.',
    speakerRole: 'Digital SDE @ TCS (Batch of 2025)',
    duration: '22 mins',
    summary: 'Deep-dive into the latest TCS NQT test pattern, coding section edge cases, and time management strategies to qualify for the high-package Digital band.',
    takeaways: [
      'Always test code against boundary values: negative inputs, empty strings, and large numbers (10^9).',
      'The 20-minute aptitude shortcut: prioritize ratio/proportion and series completion before advanced permutation.',
      'How the automated test compiler checks memory limits and hidden test cases.'
    ],
    videoUrl: 'https://www.youtube-nocookie.com/embed/RBSGKlAvoiM',
    youtubeId: 'RBSGKlAvoiM'
  },
  {
    id: 'mc-3',
    title: 'De-Escalating Tough Questions: The Senior Engineer Mindset',
    category: 'HR Rounds & Communication',
    speaker: 'Arvind Swaminathan',
    speakerRole: 'VP of Engineering & Campus Placement Assessor',
    duration: '15 mins',
    summary: 'What campus interviewers are actually looking for when they ask questions outside your college syllabus: emotional stability, logic pivots, and curiosity.',
    takeaways: [
      'Never say "I don\'t know" and stop talking; always pivot using foundational principles.',
      'Show your thought process aloud: interviewers grade the path to the solution, not just the final return value.',
      'How to turn an academic gap year or backlogs into a compelling story of resilience.'
    ],
    videoUrl: 'https://www.youtube-nocookie.com/embed/M2b_9fP1uuo',
    youtubeId: 'M2b_9fP1uuo'
  },
  {
    id: 'mc-4',
    title: 'Zero-to-One Web Architecture: The Mental Model That Won My Offer',
    category: 'Zero-to-One Tech Foundations',
    speaker: 'Kavitha S.',
    speakerRole: 'Full-Stack Developer @ Freshworks',
    duration: '24 mins',
    summary: 'A visual walkthrough of how browsers, DNS, reverse proxies, Node.js servers, and relational databases work in unison.',
    takeaways: [
      'The restaurant analogy: Frontend is the table, HTTP is the waiter, Backend is the kitchen, DB is the pantry.',
      'Understanding synchronous blocking vs asynchronous event loops in single-threaded JavaScript.',
      'How drawing this simple architecture on the interview whiteboard immediately sets you apart from 90% of candidates.'
    ],
    videoUrl: 'https://www.youtube-nocookie.com/embed/fN3jGZp_23M',
    youtubeId: 'fN3jGZp_23M'
  },
  {
    id: 'mc-5',
    title: 'The STAR Method Blueprint: Pitching Projects Like a Pro',
    category: 'HR Rounds & Communication',
    speaker: 'Rahul Nambiar',
    speakerRole: 'Lead Technical Recruiter & Career Coach',
    duration: '16 mins',
    summary: 'Transforming simple college mini-projects into irresistible business-value stories that capture hiring manager attention.',
    takeaways: [
      'The 70-30 rule: Spend 70% of your time on Action (what YOU specifically coded and decided).',
      'Always quantify results: "reduced loading time by 35%" sounds 10x more credible than "made it fast".',
      'How to handle the "Tell me about a team conflict" question without sounding unprofessional.'
    ],
    videoUrl: 'https://www.youtube-nocookie.com/embed/M2b_9fP1uuo',
    youtubeId: 'M2b_9fP1uuo'
  },
  {
    id: 'mc-6',
    title: 'Core Embedded Systems & Hardware Logic: Campus Interview Essentials',
    category: 'Core & Non-CS Transitions',
    speaker: 'Dinesh Kumar',
    speakerRole: 'Senior Platform Engineer (Ex-ECE)',
    duration: '28 mins',
    summary: 'How ECE and Electrical students can clear core hardware and embedded roles at Bosch, Texas Instruments, and Qualcomm.',
    takeaways: [
      'Master bitwise register operations (masking, setting, clearing bits in C).',
      'Understand communication bus trade-offs: UART vs I2C vs SPI.',
      'Explain ADC conversion steps and timer interrupt service routines (ISR).'
    ],
    videoUrl: 'https://www.youtube-nocookie.com/embed/41IO4v491Tk',
    youtubeId: '41IO4v491Tk'
  }
];
