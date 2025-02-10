import { Client } from "../lib/openai.js";
const data=  {
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
  }
export const getGeneratedQuizzAi = async (req, res) => {
  try {
    const {topic} = req.body
    const prompt = `
    Create an array of QCM (Multiple Choice Questions) based on the following object:
    ${JSON.stringify(data)}

    Topic: ${topic}

    Instructions:
    1. Return only the array of QCM objects in JSON format.
    2. Do not include any additional text or explanations.
    3. Ensure the array follows the same structure as the provided object.
    4. Randomize the order of the answers within each question to ensure the correct answer is n
    5. type object can be either "radio" or "checkbox"
    Example output format:
    [
      {
        "type": "",
        "question": "Question text here",
        "answers": [
          
          { "answer": "Option 1", "right": true },
          { "answer": "Option 2", "right": false },
          { "answer": "Option 3", "right": false },
          { "answer": "Option 4", "right": false }
        ],
        "category": "category here",
        "language": "language here",
        "level": "difficulty level here",
        "tags": ["tag1", "tag2"]
      }
    ]
  `;
    const completion = await Client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { 
          role: "user",
         content: prompt
        }
      ],
    });

    res.json({
        qcms : JSON.parse(completion?.choices[0]?.message?.content),
    });
  } catch (error) {
    console.log("error occured while getGeneratedQuizzAi " + error);
    if (error.response && error.response.status === 429) {
      return res.status(429).json({
        success: false,
        message: "Rate limit exceeded. Please try again later.",
      });
    }
    return res.status(500).json({
      success: false,
      message: "internal error",
    });
  }
};
