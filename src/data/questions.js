const defaultQuestions = [
  { id: 1, q: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyperlinks Text Markup"], answer: 0 },
  { id: 2, q: "Which hook is used for state?", options: ["useEffect", "useState", "useRef"], answer: 1 },
  { id: 3, q: "What is JSX?", options: ["Java XML", "JavaScript XML", "JSON XML"], answer: 1 },
  { id: 4, q: "Which is NOT a JS framework?", options: ["React", "Angular", "Laravel"], answer: 2 },
  { id: 5, q: "What does CSS stand for?", options: ["Cascading Style Sheets", "Creative Style System", "Computer Style Sheet"], answer: 0 },
  { id: 6, q: "Which tag is used for video?", options: ["<media>", "<video>", "<movie>"], answer: 1 },
  { id: 7, q: "React is maintained by?", options: ["Google", "Facebook", "Microsoft"], answer: 1 },
  { id: 8, q: "Which command starts React?", options: ["npm start", "npm run dev", "react start"], answer: 1 },
  { id: 9, q: "What is MERN?", options: ["Mongo Express React Node", "MySQL Express React Node", "Mongo Ember React Node"], answer: 0 },
  { id: 10, q: "Which storage is persistent?", options: ["state", "props", "localStorage"], answer: 2 },
  { id: 11, q: "Which HTML attribute is used to define inline styles?", options: ["class", "style", "font"], answer: 1 },
  { id: 12, q: "Which HTTP method is commonly used to fetch data?", options: ["POST", "GET", "PUT"], answer: 1 },
  { id: 13, q: "Which JavaScript keyword is used to declare a constant?", options: ["var", "let", "const"], answer: 2 },
  { id: 14, q: "Which React hook is used for side effects?", options: ["useState", "useEffect", "useMemo"], answer: 1 },
  { id: 15, q: "Which database is used in the MERN stack?", options: ["MySQL", "MongoDB", "PostgreSQL"], answer: 1 },
];

export const getQuestions = () => {
  const saved = localStorage.getItem("questions");
  return saved ? JSON.parse(saved) : defaultQuestions;
};

export const saveQuestions = (questions) => {
  localStorage.setItem("questions", JSON.stringify(questions));
};
