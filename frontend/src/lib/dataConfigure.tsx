import {
  ChartPie,
  ClipboardList,
  ClipboardType,
  Crown,
  House,
  Presentation,
  SlidersHorizontal,
} from "lucide-react";
interface languageType { 
  id : number , 
  language : string
}
export const links = [
  {
    name: "home",
    icon: <House strokeWidth={1.2}  />,
    href: "/user/home",
  },
  {
    name: "tests",
    icon: <ClipboardList strokeWidth={1.2}  />,
    href: "/user/tests",
  },
  {
    name: "setting",
    icon: <SlidersHorizontal strokeWidth={1.2} />,
    href: "/user/tests",
  },
  {
    name: "analytics",
    icon: <ChartPie strokeWidth={1.2} />,
    href: "/user/tests",
  },
  {
    name: "learn (coming soon)",
    icon: <Presentation strokeWidth={1.2}  />,
    href: "/user/tests",
  },
  {
    name: "leaderboard",
    icon: <Crown strokeWidth={1.2}  />,
    href: "/user/tests",
  },
  {
    name: "generate Qcm",
    icon: <ClipboardType strokeWidth={1.2} />,
    href: "/user/generate",
  },
];
export const category :languageType[]  = [
  {
    id: 1,
    language: "javascript",
  },
  {
    id: 2,
    language: "python",
  },
  {
    id: 3,
    language: "css",
  },
  {
    id: 4,
    language: "laravel",
  },
  {
    id: 5,
    language: "php",
  },
  {
    id: 6,
    language: "react",
  },
  {
    id: 6,
    language: "rust",
  },
];
export const language = [
  {
    id: 1 , 
    language : 'english'
  },
  {
    id: 2 , 
    language : 'french'
  }
]
export const level =  [
  {
    id: 1 , 
    level : 'easy'
  },
  {
    id: 2 , 
    level : 'medium'
  },
  {
    id: 3 , 
    level : 'hard'
  }
]
// hard code data for qcms
export const QcmsData = [
  {
    id: "qcm1",
    type: "radio",
    question: "What is the correct syntax to output 'Hello World' in PHP?",
    answers: [
      { answer: "echo 'Hello World';", right: true },
      { answer: "print('Hello World');", right: false },
      { answer: "console.log('Hello World');", right: false },
      { answer: "System.out.println('Hello World');", right: false },
    ],
    category: "php",
    language: "english",
    level: "easy",
    tags: ["php", "syntax", "basics"],
    createdBy: "admin",
  },
  {
    id: "qcm2",
    type: "checkbox",
    question: "Which of the following are JavaScript frameworks?",
    answers: [
      { answer: "React", right: true },
      { answer: "Angular", right: true },
      { answer: "Laravel", right: false },
      { answer: "Django", right: false },
    ],
    category: "javascript",
    language: "english",
    level: "medium",
    tags: ["javascript", "frameworks"],
    createdBy: "admin",
  },
  {
    id: "qcm3",
    type: "radio",
    question: "What does the `final` keyword do in Java?",
    answers: [
      { answer: "Prevents method overriding", right: true },
      { answer: "Allows multiple inheritance", right: false },
      { answer: "Stops code execution", right: false },
      { answer: "Declares an abstract method", right: false },
    ],
    category: "java",
    language: "english",
    level: "hard",
    tags: ["java", "keywords", "OOP"],
    createdBy: "admin",
  },
  {
    id: "qcm4",
    type: "radio",
    question:
      "Quel est le mot-clé utilisé pour définir une constante en JavaScript?",
    answers: [
      { answer: "let", right: false },
      { answer: "const", right: true },
      { answer: "var", right: false },
      { answer: "static", right: false },
    ],
    category: "javascript",
    language: "french",
    level: "easy",
    tags: ["javascript", "constantes"],
    createdBy: "admin",
  },
  {
    id: "qcm5",
    type: "checkbox",
    question: "Which of the following are Python data structures?",
    answers: [
      { answer: "List", right: true },
      { answer: "Tuple", right: true },
      { answer: "Array", right: false },
      { answer: "Dictionary", right: true },
    ],
    category: "python",
    language: "english",
    level: "medium",
    tags: ["python", "data structures"],
    createdBy: "admin",
  },
];
