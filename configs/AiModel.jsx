const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};


export const GenerateCourseLayout_AI = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                { text: "Generate A Course Tutorial on Following detail With field as Course Name, Description, Along with Chapter Name, about, Duration: Category: 'Programming', Topic: Python, level: Basic, Duration: 1 hours, No of Chapters: 5, in JSON format" },
            ],
        },
        {
            role: "model",
            parts: [
                { text: "```json\n{\n  \"CourseName\": \"Python Fundamentals: A Beginner's Guide\",\n  \"Description\": \"This course provides a comprehensive introduction to Python programming. You'll learn the core concepts, syntax, and best practices for writing clean, efficient, and functional Python code. No prior programming experience is required.  This course focuses on practical application and hands-on exercises to solidify your understanding.\",\n  \"Category\": \"Programming\",\n  \"Topic\": \"Python\",\n  \"Level\": \"Basic\",\n  \"Duration\": \"5 hours\",\n  \"NoOfChapters\": 5,\n  \"Chapters\": [\n    {\n      \"ChapterName\": \"Chapter 1: Introduction to Python\",\n      \"About\": \"This chapter introduces you to the world of Python.  We'll cover the history of Python, its uses in various industries, and how to set up your development environment (including installing Python and a code editor).  You'll also write and execute your first Python program (the classic 'Hello, World!').\",\n      \"Duration\": \"1 hour\"\n    },\n    {\n      \"ChapterName\": \"Chapter 2: Data Types, Variables, and Operators\",\n      \"About\": \"This chapter dives into fundamental Python data types: integers, floats, strings, and booleans. You'll learn how to declare variables, assign values, and perform basic arithmetic and logical operations. We will also cover the concepts of variables and constants in python\",\n      \"Duration\": \"1 hour\"\n    },\n    {\n      \"ChapterName\": \"Chapter 3: Control Flow: Conditionals and Loops\",\n      \"About\": \"This chapter covers the essential control flow statements that allow your programs to make decisions and repeat actions. You'll learn how to use `if`, `elif`, and `else` statements for conditional logic and `for` and `while` loops for iteration. We will also cover examples of loop control statements like break and continue\",\n      \"Duration\": \"1 hour\"\n    },\n    {\n      \"ChapterName\": \"Chapter 4: Functions: Organizing Your Code\",\n      \"About\": \"This chapter introduces the concept of functions, a key building block for modular and reusable code. You'll learn how to define your own functions, pass arguments, return values, and understand the scope of variables. We will also cover the basics of recursion\",\n      \"Duration\": \"1 hour\"\n    },\n    {\n      \"ChapterName\": \"Chapter 5: Lists and Strings: Working with Sequences\",\n      \"About\": \"This chapter explores two important sequence data types in Python: lists and strings. You'll learn how to create, access, modify, and manipulate lists and strings using various built-in methods and operators.  We'll also cover list comprehensions for concise data manipulation.  This will be a crucial foundation for more advanced data structures.\",\n      \"Duration\": \"1 hour\"\n    }\n  ]\n}\n```" },
            ],
        },
    ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());
