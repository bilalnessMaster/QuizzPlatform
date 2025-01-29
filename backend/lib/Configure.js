import Qcm from "../models/Qcm.model.js";
export const data = [
    {
      "type": "radio",
      "question": "What is the correct syntax for a JavaScript arrow function?",
      "answers": [
        { "answer": "() => {}", "right": true },
        { "answer": "function => ()", "right": false },
        { "answer": "=> {} ()", "right": false },
        { "answer": "function {} => ()", "right": false }
      ],
      "category": "javascript",
      "language": "english",
      "level": "easy",
      "tags": ["javascript", "syntax", "arrow function"]
    },
    {
      "type": "checkbox",
      "question": "Which of the following are JavaScript frameworks?",
      "answers": [
        { "answer": "React", "right": true },
        { "answer": "Angular", "right": true },
        { "answer": "Vue.js", "right": true },
        { "answer": "Django", "right": false }
      ],
      "category": "javascript",
      "language": "english",
      "level": "medium",
      "tags": ["javascript", "frameworks", "frontend"]
    },
    {
      "type": "radio",
      "question": "What does PHP stand for?",
      "answers": [
        { "answer": "PHP: Hypertext Preprocessor", "right": true },
        { "answer": "Personal Hypertext Processor", "right": false },
        { "answer": "Private Home Page", "right": false },
        { "answer": "Public Hosting Platform", "right": false }
      ],
      "category": "php",
      "language": "english",
      "level": "easy",
      "tags": ["php", "definitions", "basics"]
    },
    {
      "type": "checkbox",
      "question": "Which of the following are Python data types?",
      "answers": [
        { "answer": "List", "right": true },
        { "answer": "Tuple", "right": true },
        { "answer": "Dictionary", "right": true },
        { "answer": "Lambda", "right": false }
      ],
      "category": "python",
      "language": "english",
      "level": "medium",
      "tags": ["python", "data types", "basics"]
    },
    {
      "type": "radio",
      "question": "What is the primary purpose of React?",
      "answers": [
        { "answer": "Building user interfaces", "right": true },
        { "answer": "Server-side scripting", "right": false },
        { "answer": "Database management", "right": false },
        { "answer": "Operating system development", "right": false }
      ],
      "category": "javascript",
      "language": "english",
      "level": "easy",
      "tags": ["react", "frontend", "javascript"]
    },
    {
      "type": "radio",
      "question": "What is the purpose of the Laravel framework?",
      "answers": [
        { "answer": "Web application development", "right": true },
        { "answer": "Mobile app development", "right": false },
        { "answer": "Operating system design", "right": false },
        { "answer": "Data science", "right": false }
      ],
      "category": "php",
      "language": "english",
      "level": "medium",
      "tags": ["laravel", "php", "framework"]
    },
    {
      "type": "checkbox",
      "question": "Which of the following are valid CSS properties?",
      "answers": [
        { "answer": "color", "right": true },
        { "answer": "font-size", "right": true },
        { "answer": "margin", "right": true },
        { "answer": "align-height", "right": false }
      ],
      "category": "css",
      "language": "english",
      "level": "easy",
      "tags": ["css", "frontend", "styling"]
    },
    {
      "type": "radio",
      "question": "What is the purpose of the Python 'def' keyword?",
      "answers": [
        { "answer": "Define a function", "right": true },
        { "answer": "Declare a variable", "right": false },
        { "answer": "Create a class", "right": false },
        { "answer": "Import a module", "right": false }
      ],
      "category": "python",
      "language": "english",
      "level": "easy",
      "tags": ["python", "functions", "syntax"]
    },
    {
      "type": "checkbox",
      "question": "Which of the following are valid HTML tags?",
      "answers": [
        { "answer": "<div>", "right": true },
        { "answer": "<span>", "right": true },
        { "answer": "<body>", "right": true },
        { "answer": "<style/>", "right": false }
      ],
      "category": "html",
      "language": "english",
      "level": "easy",
      "tags": ["html", "markup", "frontend"]
    },
    {
      "type": "radio",
      "question": "What is the use of the 'useState' hook in React?",
      "answers": [
        { "answer": "To manage state in functional components", "right": true },
        { "answer": "To fetch data from APIs", "right": false },
        { "answer": "To create a new component", "right": false },
        { "answer": "To handle lifecycle methods", "right": false }
      ],
      "category": "javascript",
      "language": "english",
      "level": "medium",
      "tags": ["react", "hooks", "state management"]
    },
    {
      "type": "checkbox",
      "question": "Which of the following are valid JavaScript array methods?",
      "answers": [
        { "answer": "map()", "right": true },
        { "answer": "filter()", "right": true },
        { "answer": "forEach()", "right": true },
        { "answer": "delete()", "right": false }
      ],
      "category": "javascript",
      "language": "english",
      "level": "medium",
      "tags": ["javascript", "arrays", "methods"]
    },
    {
      "type": "radio",
      "question": "What is the primary function of the 'Node.js' runtime?",
      "answers": [
        { "answer": "Run JavaScript on the server", "right": true },
        { "answer": "Run PHP scripts", "right": false },
        { "answer": "Manage databases", "right": false },
        { "answer": "Build CSS stylesheets", "right": false }
      ],
      "category": "javascript",
      "language": "english",
      "level": "hard",
      "tags": ["node.js", "backend", "javascript"]
    },
    {
      "type": "checkbox",
      "question": "Which of the following are relational database management systems?",
      "answers": [
        { "answer": "MySQL", "right": true },
        { "answer": "PostgreSQL", "right": true },
        { "answer": "MongoDB", "right": false },
        { "answer": "SQLite", "right": true }
      ],
      "category": "databases",
      "language": "english",
      "level": "medium",
      "tags": ["databases", "sql", "data management"]
    },
    {
      "type": "radio",
      "question": "What is the output of the Python expression '3 ** 2'?",
      "answers": [
        { "answer": "9", "right": true },
        { "answer": "6", "right": false },
        { "answer": "3", "right": false },
        { "answer": "None of the above", "right": false }
      ],
      "category": "python",
      "language": "english",
      "level": "easy",
      "tags": ["python", "expressions", "math"]
    },
    {
      "type": "checkbox",
      "question": "Which of the following are valid JavaScript variable declarations?",
      "answers": [
        { "answer": "let x = 10;", "right": true },
        { "answer": "const x = 10;", "right": true },
        { "answer": "var x = 10;", "right": true },
        { "answer": "int x = 10;", "right": false }
      ],
      "category": "javascript",
      "language": "english",
      "level": "easy",
      "tags": ["javascript", "variables", "syntax"]
    }
  ]
  
export const insert  = async () => { 
    try {
        const res = await Qcm.insertMany(data)
        if(res) console.log(res);
        
    } catch (error) {
        console.error("Error inserting data:", error);
    }
}