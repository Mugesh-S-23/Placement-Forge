import { DSATrackItem } from '@/types';

export const DSA_TRACK_ITEMS: DSATrackItem[] = [
  {
    id: 'dsa-1',
    title: 'Two Sum: From O(N²) to O(N)',
    difficulty: 'Easy (Freshers)',
    topic: 'HashMaps',
    frequencyCompany: 'TCS Digital, Zoho, Infosys, CTS',
    timeComplexity: 'O(N) Time | O(N) Space',
    analogy: 'Imagine entering a dance hall looking for a partner with weight W. Instead of walking up to all N people repeatedly, you write each person\'s weight on a whiteboard. For person with weight X, you just check if (Target - X) is already on the board!',
    hints: [
      'Avoid the naive nested loop (i from 0 to N, j from i+1 to N) which is O(N²).',
      'For each number `num`, calculate `complement = target - num`.',
      'Check if `complement` is already in your Map. If yes, you found the pair in O(1) lookup!'
    ],
    codeSnippet: `function twoSum(nums, target) {
  const map = new Map(); // value -> index
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`
  },
  {
    id: 'dsa-2',
    title: 'Valid Parentheses: The Cafeteria Tray Stack',
    difficulty: 'Easy (Freshers)',
    topic: 'Stack/Queue',
    frequencyCompany: 'Zoho Round 2, Cognizant GenC Next, TCS NQT',
    timeComplexity: 'O(N) Time | O(N) Space',
    analogy: 'Think of a stack of dinner plates in a hostel mess. The last clean plate put on top must be the first one taken off (LIFO). Whenever an opening bracket appears, push it. Whenever a closing bracket appears, the top of the stack MUST be its matching mate.',
    hints: [
      'Every time you see \'(\', \'{\', or \'[\', push it onto your stack.',
      'When you see a closing bracket, check if the stack is empty (invalid!).',
      'If not empty, pop the top element and verify it matches the current closing bracket.',
      'At the very end, the stack must be completely empty.'
    ],
    codeSnippet: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (const char of s) {
    if (char in map) {
      if (stack.length === 0 || stack.pop() !== map[char]) {
        return false;
      }
    } else {
      stack.push(char);
    }
  }
  return stack.length === 0;
}`
  },
  {
    id: 'dsa-3',
    title: 'Maximum Subarray (Kadane\'s Algorithm)',
    difficulty: 'Medium (Core Drive)',
    topic: 'Arrays',
    frequencyCompany: 'Zoho, TCS Digital, Wipro Turbo',
    timeComplexity: 'O(N) Time | O(1) Space',
    analogy: 'Imagine carrying a luggage bag along a road. Each shop gives you either money (+) or a debt (-). If your bag\'s balance becomes negative, you throw it away and start fresh with an empty bag at the next shop!',
    hints: [
      'Keep track of `currentSum` and `maxSum`.',
      'At each number, decide: is it better to add `nums[i]` to `currentSum`, or start a brand new subarray with `nums[i]` alone?',
      'If `currentSum < 0`, reset `currentSum = 0` because a negative sum will only hurt any future elements.'
    ],
    codeSnippet: `function maxSubArray(nums) {
  let maxSum = nums[0];
  let currentSum = 0;
  for (const num of nums) {
    currentSum += num;
    maxSum = Math.max(maxSum, currentSum);
    if (currentSum < 0) currentSum = 0;
  }
  return maxSum;
}`
  },
  {
    id: 'dsa-4',
    title: 'Best Time to Buy and Sell Stock (One Pass)',
    difficulty: 'Easy (Freshers)',
    topic: 'Arrays',
    frequencyCompany: 'Infosys SP/DSE, TCS Digital, Accenture',
    timeComplexity: 'O(N) Time | O(1) Space',
    analogy: 'Walk through time remembering the lowest valley you ever stood on. Each day you stand on a peak, calculate the profit if you had bought at that lowest valley. Keep updating your record profit.',
    hints: [
      'Maintain `minPriceSoFar` initialized to Infinity.',
      'Maintain `maxProfit` initialized to 0.',
      'For each price, update `minPriceSoFar = Math.min(minPriceSoFar, price)`.',
      'Calculate potential profit `price - minPriceSoFar` and update `maxProfit`.'
    ],
    codeSnippet: `function maxProfit(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;
  for (const price of prices) {
    if (price < minPrice) minPrice = price;
    else maxProfit = Math.max(maxProfit, price - minPrice);
  }
  return maxProfit;
}`
  },
  {
    id: 'dsa-5',
    title: 'Binary Search: The Dictionary Halving Intuition',
    difficulty: 'Easy (Freshers)',
    topic: 'Searching',
    frequencyCompany: 'TCS NQT, CTS, Zoho, Campus SDE',
    timeComplexity: 'O(log N) Time | O(1) Space',
    analogy: 'Looking for a word in an Oxford dictionary: You open right in the middle (page 500). If the word starts with \'T\' and middle is \'M\', you discard all pages 1 to 500 instantly. In just 10 flips, you can search 1,000 pages!',
    hints: [
      'Array MUST be sorted.',
      'Maintain `low = 0`, `high = nums.length - 1`.',
      'Calculate `mid = low + Math.floor((high - low) / 2)` to avoid integer overflow in languages like Java/C++.',
      'If `nums[mid] === target`, return mid. Else adjust low or high.'
    ],
    codeSnippet: `function binarySearch(nums, target) {
  let low = 0, high = nums.length - 1;
  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`
  },
  {
    id: 'dsa-6',
    title: 'Valid Palindrome: Two Pointers inward',
    difficulty: 'Easy (Freshers)',
    topic: 'Two Pointers',
    frequencyCompany: 'Zoho, TCS, Cognizant, Wipro',
    timeComplexity: 'O(N) Time | O(1) Space',
    analogy: 'Checking if a string reads the same backwards: place your left finger at the first character and right finger at the last character. Tap inwards together comparing characters while ignoring spaces and punctuation.',
    hints: [
      'Convert to lowercase and skip non-alphanumeric characters.',
      'Set `left = 0` and `right = s.length - 1`.',
      'Compare `s[left]` and `s[right]`. If unequal, return false immediately.'
    ],
    codeSnippet: `function isPalindrome(s) {
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0, right = clean.length - 1;
  while (left < right) {
    if (clean[left] !== clean[right]) return false;
    left++;
    right--;
  }
  return true;
}`
  }
];
