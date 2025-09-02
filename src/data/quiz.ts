import { Quiz, QuizQuestion } from "@/types";

// Expanded JavaScript Questions Pool
export const javascriptQuestionsPool: QuizQuestion[] = [
  {
    id: "js-1",
    question: "What will this code output?",
    type: "multiple-choice",
    options: ["undefined", "5", "ReferenceError", "null"],
    correctAnswer: 0,
    explanation:
      "Due to hoisting, `var x` is declared but not initialized when the console.log runs, so it outputs `undefined`.",
    difficulty: "easy",
    techStack: "javascript",
    codeSnippet: "console.log(x);\nvar x = 5;",
  },
  {
    id: "js-2",
    question: "What is the correct way to create a function in JavaScript?",
    type: "multiple-choice",
    options: [
      "function myFunc() {}",
      "def myFunc() {}",
      "func myFunc() {}",
      "create function myFunc() {}",
    ],
    correctAnswer: 0,
    explanation:
      "In JavaScript, functions are declared using the `function` keyword followed by the function name and parentheses.",
    difficulty: "easy",
    techStack: "javascript",
    codeSnippet: 'function myFunc() {\n  return "Hello World";\n}',
  },
  {
    id: "js-3",
    question: "What will this code output?",
    type: "multiple-choice",
    options: ["null", "undefined", "object", "boolean"],
    correctAnswer: 2,
    explanation:
      'This is a well-known quirk in JavaScript. `typeof null` returns "object", which is considered a bug in the language but has been kept for backward compatibility.',
    difficulty: "medium",
    techStack: "javascript",
    codeSnippet: "console.log(typeof null);",
  },
  {
    id: "js-4",
    question: "What will this arrow function return?",
    type: "multiple-choice",
    options: ["undefined", "42", "function", "Error"],
    correctAnswer: 1,
    explanation:
      "Arrow functions with a single expression automatically return that expression without needing the `return` keyword.",
    difficulty: "easy",
    techStack: "javascript",
    codeSnippet: "const add = (a, b) => a + b;\nconsole.log(add(20, 22));",
  },
  {
    id: "js-5",
    question: "What will this code output?",
    type: "multiple-choice",
    options: ["[]", "[1, 2, 3]", "[0]", "undefined"],
    correctAnswer: 0,
    explanation:
      "Setting the length property of an array to 0 effectively empties the array. This is a quick way to clear an array in JavaScript.",
    difficulty: "medium",
    techStack: "javascript",
    codeSnippet: "let arr = [1, 2, 3];\narr.length = 0;\nconsole.log(arr);",
  },
  {
    id: "js-6",
    question: "What is the difference between `==` and `===` in JavaScript?",
    type: "multiple-choice",
    options: [
      "No difference",
      "== checks value only, === checks value and type",
      "== checks type only, === checks value only",
      "=== is used for assignment",
    ],
    correctAnswer: 1,
    explanation:
      "== performs type coercion and compares values, while === compares both value and type without coercion. === is generally preferred for precise comparisons.",
    difficulty: "easy",
    techStack: "javascript",
  },
  {
    id: "js-7",
    question: "What will this code output?",
    type: "multiple-choice",
    options: ["true", "false", "undefined", "Error"],
    correctAnswer: 1,
    explanation:
      "Due to floating-point precision issues, 0.1 + 0.2 equals 0.30000000000000004, not exactly 0.3. This is a common gotcha in JavaScript.",
    difficulty: "hard",
    techStack: "javascript",
    codeSnippet: "console.log(0.1 + 0.2 === 0.3);",
  },
  {
    id: "js-8",
    question: "What does this async function return?",
    type: "multiple-choice",
    options: ["A string", "A Promise", "undefined", "An object"],
    correctAnswer: 1,
    explanation:
      "The `async` keyword makes a function return a Promise. Even if you return a simple value, it gets wrapped in a resolved Promise.",
    difficulty: "medium",
    techStack: "javascript",
    codeSnippet: 'async function getData() {\n  return "Hello";\n}',
  },
  {
    id: "js-9",
    question: "What will this code output?",
    type: "multiple-choice",
    options: ["0 1 2", "3 3 3", "0 0 0", "Error"],
    correctAnswer: 1,
    explanation:
      "Due to closure and `var` hoisting, all functions capture the same variable `i` which has value 3 after the loop completes.",
    difficulty: "medium",
    techStack: "javascript",
    codeSnippet:
      "for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}",
  },
  {
    id: "js-10",
    question: "What is the result of this comparison?",
    type: "multiple-choice",
    options: ["true", "false", "undefined", "Error"],
    correctAnswer: 0,
    explanation:
      "JavaScript performs type coercion. The string '5' is converted to number 5, making the comparison true.",
    difficulty: "easy",
    techStack: "javascript",
    codeSnippet: "console.log(5 == '5');",
  },
  {
    id: "js-11",
    question: "What will this destructuring assignment do?",
    type: "multiple-choice",
    options: [
      "Create variables a=1, b=2",
      "Create variables a=1, b=2, c=3",
      "Error",
      "Create a=[1,2,3]",
    ],
    correctAnswer: 0,
    explanation:
      "Array destructuring assigns the first two elements to variables a and b. The rest parameter isn't used here.",
    difficulty: "easy",
    techStack: "javascript",
    codeSnippet: "const [a, b] = [1, 2, 3];\nconsole.log(a, b);",
  },
  {
    id: "js-12",
    question: "What does the spread operator do here?",
    type: "multiple-choice",
    options: [
      "Copies the array",
      "Creates a new array with all elements",
      "Merges arrays",
      "All of the above",
    ],
    correctAnswer: 3,
    explanation:
      "The spread operator (...) expands array elements. Here it creates a new array containing all elements from both arrays.",
    difficulty: "easy",
    techStack: "javascript",
    codeSnippet:
      "const arr1 = [1, 2];\nconst arr2 = [3, 4];\nconst combined = [...arr1, ...arr2];",
  },
  {
    id: "js-13",
    question: "What will this arrow function return?",
    type: "multiple-choice",
    options: ["undefined", "42", "{ value: 42 }", "Error"],
    correctAnswer: 1,
    explanation:
      "Arrow functions with a single expression automatically return that expression without needing the return keyword.",
    difficulty: "easy",
    techStack: "javascript",
    codeSnippet: "const getValue = () => 42;\nconsole.log(getValue());",
  },
  {
    id: "js-14",
    question: "What happens with this object method?",
    type: "multiple-choice",
    options: ["Prints 'Alice'", "Prints undefined", "Error", "Prints 'Bob'"],
    correctAnswer: 1,
    explanation:
      "When a method is assigned to a variable and called, `this` loses its context and becomes undefined (in strict mode).",
    difficulty: "medium",
    techStack: "javascript",
    codeSnippet:
      "const person = {\n  name: 'Alice',\n  getName() { return this.name; }\n};\nconst fn = person.getName;\nconsole.log(fn());",
  },
  {
    id: "js-15",
    question: "What will this Promise chain output?",
    type: "multiple-choice",
    options: ["10", "20", "30", "Error"],
    correctAnswer: 2,
    explanation:
      "Promise chains pass the resolved value to the next .then(). 10 + 10 = 20, then 20 + 10 = 30.",
    difficulty: "medium",
    techStack: "javascript",
    codeSnippet:
      "Promise.resolve(10)\n  .then(x => x + 10)\n  .then(x => x + 10)\n  .then(console.log);",
  },
  {
    id: "js-16",
    question: "What does this array method return?",
    type: "multiple-choice",
    options: ["[2, 4, 6]", "[1, 2, 3]", "[false, true, false]", "6"],
    correctAnswer: 0,
    explanation:
      "The map() method creates a new array by calling the provided function on every element and returning the results.",
    difficulty: "easy",
    techStack: "javascript",
    codeSnippet:
      "const numbers = [1, 2, 3];\nconst doubled = numbers.map(x => x * 2);",
  },
  {
    id: "js-17",
    question: "What will this filter operation return?",
    type: "multiple-choice",
    options: ["[2, 4]", "[1, 3]", "[true, false, true, false]", "4"],
    correctAnswer: 0,
    explanation:
      "The filter() method creates a new array with elements that pass the test. Even numbers (2, 4) pass the test.",
    difficulty: "easy",
    techStack: "javascript",
    codeSnippet:
      "const numbers = [1, 2, 3, 4];\nconst evens = numbers.filter(x => x % 2 === 0);",
  },
  {
    id: "js-18",
    question: "What is the result of this reduce operation?",
    type: "multiple-choice",
    options: ["10", "6", "24", "Error"],
    correctAnswer: 0,
    explanation:
      "Reduce accumulates values. Starting with 0: 0+1=1, 1+2=3, 3+3=6, 6+4=10.",
    difficulty: "medium",
    techStack: "javascript",
    codeSnippet:
      "const numbers = [1, 2, 3, 4];\nconst sum = numbers.reduce((acc, curr) => acc + curr, 0);",
  },
  {
    id: "js-19",
    question: "What will this template literal output?",
    type: "multiple-choice",
    options: ["Hello Alice!", "Hello ${name}!", "Hello undefined!", "Error"],
    correctAnswer: 0,
    explanation:
      "Template literals use ${} syntax to embed expressions. The variable name is interpolated into the string.",
    difficulty: "easy",
    techStack: "javascript",
    codeSnippet:
      "const name = 'Alice';\nconst greeting = `Hello ${name}!`;\nconsole.log(greeting);",
  },
  {
    id: "js-20",
    question: "What does this class constructor do?",
    type: "multiple-choice",
    options: [
      "Creates a person with name Alice",
      "Error",
      "Creates empty object",
      "Returns undefined",
    ],
    correctAnswer: 0,
    explanation:
      "The constructor method is called when creating a new instance with 'new'. It initializes the object's properties.",
    difficulty: "easy",
    techStack: "javascript",
    codeSnippet:
      "class Person {\n  constructor(name) {\n    this.name = name;\n  }\n}\nconst p = new Person('Alice');",
  },
  {
    id: "js-21",
    question: "What will this event loop example output?",
    type: "multiple-choice",
    options: ["1 2 3", "1 3 2", "3 2 1", "2 1 3"],
    correctAnswer: 1,
    explanation:
      "Synchronous code runs first (1, 3), then setTimeout callback runs after the current execution (2).",
    difficulty: "hard",
    techStack: "javascript",
    codeSnippet:
      "console.log(1);\nsetTimeout(() => console.log(2), 0);\nconsole.log(3);",
  },
  {
    id: "js-22",
    question: "What happens with this object property access?",
    type: "multiple-choice",
    options: ["Alice", "undefined", "Error", "null"],
    correctAnswer: 1,
    explanation:
      "Accessing a non-existent property returns undefined. JavaScript doesn't throw an error for missing properties.",
    difficulty: "easy",
    techStack: "javascript",
    codeSnippet: "const person = { name: 'Alice' };\nconsole.log(person.age);",
  },
  {
    id: "js-23",
    question: "What will this typeof check return?",
    type: "multiple-choice",
    options: ["'object'", "'array'", "'undefined'", "'null'"],
    correctAnswer: 0,
    explanation:
      "In JavaScript, typeof null returns 'object'. This is a known quirk/bug in the language.",
    difficulty: "medium",
    techStack: "javascript",
    codeSnippet: "console.log(typeof null);",
  },
  {
    id: "js-24",
    question: "What does this function declaration create?",
    type: "multiple-choice",
    options: [
      "A function that returns 5",
      "A function that returns undefined",
      "Error",
      "A variable",
    ],
    correctAnswer: 0,
    explanation:
      "Function declarations are hoisted and can be called before they're defined. This function returns 5.",
    difficulty: "easy",
    techStack: "javascript",
    codeSnippet:
      "function getValue() {\n  return 5;\n}\nconsole.log(getValue());",
  },
];

// Expanded Python Questions Pool
export const pythonQuestionsPool: QuizQuestion[] = [
  {
    id: "py-1",
    question: "What will this Python code output?",
    type: "multiple-choice",
    options: ["Hello", "Error", "None", "hello"],
    correctAnswer: 0,
    explanation:
      "Python functions are defined with the `def` keyword. This function returns the string 'Hello' when called.",
    difficulty: "easy",
    techStack: "python",
    codeSnippet: 'def greet():\n    return "Hello"\n\nprint(greet())',
  },
  {
    id: "py-2",
    question: "What is the difference between a list and a tuple in Python?",
    type: "multiple-choice",
    options: [
      "Lists are mutable, tuples are immutable",
      "Lists are immutable, tuples are mutable",
      "There is no difference",
      "Lists can only store numbers, tuples can store any data type",
    ],
    correctAnswer: 0,
    explanation:
      "Lists are mutable (can be changed after creation) while tuples are immutable (cannot be changed after creation). This makes tuples useful for data that should not change.",
    difficulty: "easy",
    techStack: "python",
    codeSnippet:
      "my_list = [1, 2, 3]  # Mutable\nmy_tuple = (1, 2, 3)  # Immutable",
  },
  {
    id: "py-3",
    question: "What will this code output?",
    type: "multiple-choice",
    options: ["[1, 2, 3, 4]", "[1, 2, 3]", "Error", "4"],
    correctAnswer: 0,
    explanation:
      "The `append()` method adds an element to the end of a list. After appending 4, the list becomes [1, 2, 3, 4].",
    difficulty: "easy",
    techStack: "python",
    codeSnippet: "my_list = [1, 2, 3]\nmy_list.append(4)\nprint(my_list)",
  },
  {
    id: "py-4",
    question: "What does `*args` allow you to do in Python?",
    type: "multiple-choice",
    options: [
      "Pass a variable number of arguments to a function",
      "Pass keyword arguments to a function",
      "Make arguments optional",
      "Pass arguments by reference",
    ],
    correctAnswer: 0,
    explanation:
      "`*args` allows a function to accept any number of positional arguments. The arguments are collected into a tuple.",
    difficulty: "medium",
    techStack: "python",
    codeSnippet:
      "def my_func(*args):\n    return sum(args)\n\nprint(my_func(1, 2, 3, 4))",
  },
  {
    id: "py-5",
    question: "What will this code output?",
    type: "multiple-choice",
    options: ["True", "False", "Error", "None"],
    correctAnswer: 1,
    explanation:
      "Strings in Python are immutable. Once created, they cannot be changed. You cannot modify individual characters of a string.",
    difficulty: "easy",
    techStack: "python",
    codeSnippet:
      'text = "Hello"\n# Can we change text[0]?\n# text[0] = "h"  # This would cause an error',
  },
  {
    id: "py-6",
    question: "What is a Python decorator?",
    type: "multiple-choice",
    options: [
      "A way to add metadata to functions",
      "A function that modifies or extends another function",
      "A way to create private methods",
      "A type of comment",
    ],
    correctAnswer: 1,
    explanation:
      "A decorator is a function that takes another function as an argument and extends or modifies its behavior without explicitly modifying the function itself.",
    difficulty: "medium",
    techStack: "python",
    codeSnippet:
      "def my_decorator(func):\n    def wrapper():\n        print('Before')\n        func()\n        print('After')\n    return wrapper",
  },
  {
    id: "py-7",
    question: "What will this list comprehension create?",
    type: "multiple-choice",
    options: [
      "[0, 1, 4, 9, 16]",
      "[1, 2, 3, 4, 5]",
      "[0, 1, 2, 3, 4]",
      "Error",
    ],
    correctAnswer: 0,
    explanation:
      "This list comprehension creates a list of squares. For each number from 0 to 4, it calculates x**2 (x squared).",
    difficulty: "medium",
    techStack: "python",
    codeSnippet: "squares = [x**2 for x in range(5)]\nprint(squares)",
  },
  {
    id: "py-8",
    question: "What is the correct way to handle exceptions in Python?",
    type: "multiple-choice",
    options: ["try/catch", "try/except", "catch/finally", "handle/error"],
    correctAnswer: 1,
    explanation:
      "Python uses `try/except` blocks to handle exceptions, unlike some other languages that use `try/catch`.",
    difficulty: "easy",
    techStack: "python",
    codeSnippet:
      "try:\n    result = 10 / 0\nexcept ZeroDivisionError:\n    print('Cannot divide by zero!')",
  },
  {
    id: "py-9",
    question: "What will this list comprehension create?",
    type: "multiple-choice",
    options: ["[0, 2, 4, 6, 8]", "[1, 3, 5, 7, 9]", "[0, 1, 2, 3, 4]", "Error"],
    correctAnswer: 0,
    explanation:
      "List comprehension creates a new list. This generates even numbers from 0 to 8 (x*2 for x in range(5)).",
    difficulty: "easy",
    techStack: "python",
    codeSnippet: "evens = [x * 2 for x in range(5)]\nprint(evens)",
  },
  {
    id: "py-10",
    question: "What does this dictionary method return?",
    type: "multiple-choice",
    options: [
      "['name', 'age']",
      "dict_keys(['name', 'age'])",
      "('name', 'age')",
      "Error",
    ],
    correctAnswer: 1,
    explanation:
      "The keys() method returns a dict_keys object containing all the keys from the dictionary.",
    difficulty: "easy",
    techStack: "python",
    codeSnippet: "person = {'name': 'Alice', 'age': 30}\nprint(person.keys())",
  },
  {
    id: "py-11",
    question: "What will this string method output?",
    type: "multiple-choice",
    options: [
      "['Hello', 'World']",
      "['Hello', ' ', 'World']",
      "Hello World",
      "Error",
    ],
    correctAnswer: 0,
    explanation:
      "The split() method divides a string into a list. By default, it splits on whitespace.",
    difficulty: "easy",
    techStack: "python",
    codeSnippet: "text = 'Hello World'\nwords = text.split()\nprint(words)",
  },
  {
    id: "py-12",
    question: "What does this lambda function do?",
    type: "multiple-choice",
    options: [
      "Squares each number",
      "Adds 1 to each number",
      "Filters even numbers",
      "Multiplies by 2",
    ],
    correctAnswer: 0,
    explanation:
      "Lambda functions are anonymous functions. This one takes x and returns x squared (x**2).",
    difficulty: "easy",
    techStack: "python",
    codeSnippet:
      "numbers = [1, 2, 3, 4]\nsquared = list(map(lambda x: x**2, numbers))",
  },
  {
    id: "py-13",
    question: "What will this range function produce?",
    type: "multiple-choice",
    options: ["[1, 2, 3, 4, 5]", "[1, 3, 5]", "[0, 2, 4]", "range(1, 6, 2)"],
    correctAnswer: 1,
    explanation:
      "range(start, stop, step) generates numbers from 1 to 5 (exclusive) with step 2: 1, 3, 5.",
    difficulty: "easy",
    techStack: "python",
    codeSnippet: "numbers = list(range(1, 6, 2))\nprint(numbers)",
  },
  {
    id: "py-14",
    question: "What does this set operation return?",
    type: "multiple-choice",
    options: ["{1, 2}", "{3, 4}", "{1, 2, 3, 4}", "{2, 3}"],
    correctAnswer: 3,
    explanation:
      "The intersection (&) operator returns elements that are common to both sets: 2 and 3.",
    difficulty: "medium",
    techStack: "python",
    codeSnippet: "set1 = {1, 2, 3}\nset2 = {2, 3, 4}\nresult = set1 & set2",
  },
  {
    id: "py-15",
    question: "What will this tuple unpacking do?",
    type: "multiple-choice",
    options: ["a=1, b=2, c=3", "a=(1,2,3)", "Error", "a=1, b=(2,3)"],
    correctAnswer: 0,
    explanation:
      "Tuple unpacking assigns each element of the tuple to the corresponding variable.",
    difficulty: "easy",
    techStack: "python",
    codeSnippet: "data = (1, 2, 3)\na, b, c = data\nprint(a, b, c)",
  },
  {
    id: "py-16",
    question: "What does this enumerate function return?",
    type: "multiple-choice",
    options: [
      "[(0, 'a'), (1, 'b'), (2, 'c')]",
      "[0, 1, 2]",
      "['a', 'b', 'c']",
      "Error",
    ],
    correctAnswer: 0,
    explanation:
      "enumerate() returns an iterator of tuples containing index and value pairs.",
    difficulty: "easy",
    techStack: "python",
    codeSnippet: "letters = ['a', 'b', 'c']\nresult = list(enumerate(letters))",
  },
  {
    id: "py-17",
    question: "What will this zip function create?",
    type: "multiple-choice",
    options: [
      "[(1, 'a'), (2, 'b'), (3, 'c')]",
      "[1, 2, 3, 'a', 'b', 'c']",
      "Error",
      "[[1, 'a'], [2, 'b'], [3, 'c']]",
    ],
    correctAnswer: 0,
    explanation:
      "zip() combines elements from multiple iterables into tuples, pairing them by position.",
    difficulty: "easy",
    techStack: "python",
    codeSnippet:
      "numbers = [1, 2, 3]\nletters = ['a', 'b', 'c']\nresult = list(zip(numbers, letters))",
  },
  {
    id: "py-18",
    question: "What does this class inheritance do?",
    type: "multiple-choice",
    options: [
      "Creates a dog that can bark",
      "Error",
      "Creates empty class",
      "Overrides Animal",
    ],
    correctAnswer: 0,
    explanation:
      "Class inheritance allows Dog to inherit methods from Animal. Dog gets the speak method and can be instantiated.",
    difficulty: "medium",
    techStack: "python",
    codeSnippet:
      "class Animal:\n    def speak(self):\n        return 'Sound'\n\nclass Dog(Animal):\n    def speak(self):\n        return 'Woof'\n\ndog = Dog()",
  },
  {
    id: "py-19",
    question: "What will this file operation do?",
    type: "multiple-choice",
    options: [
      "Reads entire file",
      "Reads first line",
      "Writes to file",
      "Error",
    ],
    correctAnswer: 1,
    explanation:
      "The readline() method reads a single line from the file. It's different from read() which reads the entire file.",
    difficulty: "easy",
    techStack: "python",
    codeSnippet:
      "with open('file.txt', 'r') as f:\n    line = f.readline()\n    print(line)",
  },
  {
    id: "py-20",
    question: "What does this generator function yield?",
    type: "multiple-choice",
    options: ["[0, 1, 2]", "A generator object", "0, then 1, then 2", "Error"],
    correctAnswer: 1,
    explanation:
      "Functions with 'yield' return generator objects. The values are produced lazily when iterated over.",
    difficulty: "medium",
    techStack: "python",
    codeSnippet:
      "def count_up_to(n):\n    i = 0\n    while i < n:\n        yield i\n        i += 1\n\ngen = count_up_to(3)",
  },
  {
    id: "py-21",
    question: "What will this decorator do?",
    type: "multiple-choice",
    options: [
      "Prints function name before calling",
      "Returns None",
      "Error",
      "Doubles the result",
    ],
    correctAnswer: 0,
    explanation:
      "Decorators modify function behavior. This decorator prints the function name before executing the original function.",
    difficulty: "hard",
    techStack: "python",
    codeSnippet:
      "def my_decorator(func):\n    def wrapper():\n        print(f'Calling {func.__name__}')\n        return func()\n    return wrapper\n\n@my_decorator\ndef greet():\n    return 'Hello'",
  },
  {
    id: "py-22",
    question: "What does this list slicing return?",
    type: "multiple-choice",
    options: ["[3, 2, 1]", "[1, 2, 3]", "[2, 3]", "Error"],
    correctAnswer: 0,
    explanation:
      "List slicing with [::-1] reverses the list. It starts from the end and goes to the beginning.",
    difficulty: "easy",
    techStack: "python",
    codeSnippet:
      "numbers = [1, 2, 3]\nreversed_nums = numbers[::-1]\nprint(reversed_nums)",
  },
  {
    id: "py-23",
    question: "What will this boolean operation return?",
    type: "multiple-choice",
    options: ["True", "False", "None", "Error"],
    correctAnswer: 1,
    explanation:
      "In Python, empty containers (like empty lists) are considered False in boolean context.",
    difficulty: "easy",
    techStack: "python",
    codeSnippet: "empty_list = []\nresult = bool(empty_list)\nprint(result)",
  },
  {
    id: "py-24",
    question: "What does this string formatting do?",
    type: "multiple-choice",
    options: [
      "Hello Alice, you are 25",
      "Hello {name}, you are {age}",
      "Error",
      "Hello Alice you are 25",
    ],
    correctAnswer: 0,
    explanation:
      "f-strings (formatted string literals) allow embedding expressions inside strings using {} syntax.",
    difficulty: "easy",
    techStack: "python",
    codeSnippet:
      "name = 'Alice'\nage = 25\nmessage = f'Hello {name}, you are {age}'\nprint(message)",
  },
];

// Function to randomly select questions from a pool
export function getRandomQuestions(
  questionPool: QuizQuestion[],
  count: number = 8
): QuizQuestion[] {
  // Create a copy of the pool to avoid mutating the original
  const shuffled = [...questionPool];

  // Fisher-Yates shuffle algorithm
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Return the first 'count' questions
  return shuffled.slice(0, count);
}

// Function to get a balanced mix of questions by difficulty
export function getBalancedRandomQuestions(
  questionPool: QuizQuestion[],
  count: number = 8
): QuizQuestion[] {
  const easy = questionPool.filter((q) => q.difficulty === "easy");
  const medium = questionPool.filter((q) => q.difficulty === "medium");
  const hard = questionPool.filter((q) => q.difficulty === "hard");

  // Aim for roughly 50% easy, 30% medium, 20% hard
  const easyCount = Math.ceil(count * 0.5);
  const mediumCount = Math.ceil(count * 0.3);
  const hardCount = count - easyCount - mediumCount;

  const selectedQuestions: QuizQuestion[] = [
    ...getRandomQuestions(easy, easyCount),
    ...getRandomQuestions(medium, mediumCount),
    ...getRandomQuestions(hard, hardCount),
  ];

  // Shuffle the final selection
  return getRandomQuestions(selectedQuestions, selectedQuestions.length);
}

// Generate random questions for JavaScript
export function getJavaScriptQuiz(): Quiz {
  return {
    id: "javascript-assessment",
    title: "JavaScript Skills Assessment",
    description:
      "Test your JavaScript knowledge with practical coding questions and scenarios.",
    questions: getBalancedRandomQuestions(javascriptQuestionsPool, 8),
    timeLimit: 20, // 20 minutes
    passingScore: 60, // 60% to pass
  };
}

// Generate random questions for Python
export function getPythonQuiz(): Quiz {
  return {
    id: "python-assessment",
    title: "Python Skills Assessment",
    description:
      "Evaluate your Python programming skills with hands-on coding challenges.",
    questions: getBalancedRandomQuestions(pythonQuestionsPool, 8),
    timeLimit: 20, // 20 minutes
    passingScore: 60, // 60% to pass
  };
}

// Legacy exports for backward compatibility (now generate random questions)
export const javascriptQuiz: Quiz = getJavaScriptQuiz();
export const pythonQuiz: Quiz = getPythonQuiz();

// Default quiz (will be replaced based on user selection)
export const codersdenQuiz = javascriptQuiz;

// Track selection options
export const trackOptions = [
  {
    id: "javascript",
    title: "JavaScript Track",
    description: "Frontend and backend development with JavaScript",
    icon: "🟨",
    quiz: javascriptQuiz,
    getQuiz: getJavaScriptQuiz,
  },
  {
    id: "python",
    title: "Python Track",
    description: "Backend development and data science with Python",
    icon: "🐍",
    quiz: pythonQuiz,
    getQuiz: getPythonQuiz,
  },
];

export const learningGoalsOptions = [
  "Learn JavaScript fundamentals",
  "Master React and frontend development",
  "Learn Python programming",
  "Data science and analytics",
  "Backend development with Node.js",
  "Full-stack web development",
  "Mobile app development",
  "DevOps and deployment",
  "Open source contribution",
  "Career transition to tech",
  "Interview preparation",
  "Building personal projects",
];

export const currentSkillsOptions = [
  "HTML/CSS",
  "JavaScript",
  "React",
  "Vue.js",
  "Angular",
  "Node.js",
  "Python",
  "Django/Flask",
  "Java",
  "C#/.NET",
  "PHP",
  "Ruby",
  "Go",
  "Rust",
  "SQL/Databases",
  "Git/Version Control",
  "AWS/Cloud Services",
  "Docker/Containers",
  "No programming experience",
];

export const availabilityOptions = [
  "Weekday evenings (6-9 PM)",
  "Weekend mornings (9 AM-12 PM)",
  "Weekend afternoons (1-5 PM)",
  "Weekend evenings (6-9 PM)",
  "Flexible schedule",
  "Only specific events",
  "Very limited availability",
];
