import { QuizDefinition } from './quiz.models';

export const dayFourQuiz: QuizDefinition = {
  id: 'day-04',
  day: 4,
  title: 'Prototype、Class 與 this',
  estimatedMinutes: 10,
  questions: [
    {
      id: 'day-04-01',
      number: 1,
      kind: 'choice',
      learningGoal: '區分 prototype chain 與一般函式的 this 所處理的問題',
      prompt: '執行 firstQuestion.showPrompt() 時，下列哪一項描述最準確？',
      hint: '把「找到 showPrompt」與「決定以誰呼叫它」拆成兩個問題。',
      options: [
        {
          id: 'A',
          label:
            'Prototype chain 決定 showPrompt 在哪裡找到；呼叫時點號左邊的 firstQuestion 成為 this',
        },
        {
          id: 'B',
          label: 'Prototype chain 永久把 showPrompt 的 this 綁定為 firstQuestion',
        },
        {
          id: 'C',
          label: 'showPrompt 一定直接儲存在 firstQuestion 上，不需要沿 prototype chain 尋找',
        },
        { id: 'D', label: 'Class instance 的方法不需要 this 也能讀取 instance 欄位' },
      ],
      correctAnswer: 'A',
      explanation:
        'firstQuestion 本身沒有 showPrompt，所以屬性查找會沿 prototype chain 到 Question.prototype。找到函式後，呼叫時點號左邊的物件是 firstQuestion，因此 this 是 firstQuestion。',
    },
    {
      id: 'day-04-02',
      number: 2,
      kind: 'choice',
      learningGoal: '根據呼叫方式判斷一般方法中的 this',
      prompt: '以下 JavaScript 程式會輸出什麼？',
      hint: 'showTitle 函式雖然來自 quiz，實際呼叫時點號左邊是哪一個物件？',
      code: 'const quiz = {\n  title: "Day 4",\n  showTitle() {\n    console.log(this.title);\n  },\n};\n\nconst review = {\n  title: "複習題",\n  showTitle: quiz.showTitle,\n};\n\nreview.showTitle();',
      options: [
        { id: 'A', label: 'Day 4' },
        { id: 'B', label: '複習題' },
        { id: 'C', label: 'undefined' },
        { id: 'D', label: '一定發生 ReferenceError' },
      ],
      correctAnswer: 'B',
      explanation:
        '一般函式的 this 由呼叫方式決定。這次呼叫時點號左邊是 review，所以讀到 review.title 並輸出複習題。',
    },
    {
      id: 'day-04-03',
      number: 3,
      kind: 'choice',
      learningGoal: '辨識 class 方法作為回呼函式時遺失 this 的原因',
      prompt: '以下程式最後一行為什麼會發生 TypeError？',
      hint: '取得方法與呼叫方法是兩個動作；檢查最後一行是否仍保留 session.。',
      code: 'class QuizSession {\n  constructor(score) {\n    this.score = score;\n  }\n\n  showScore() {\n    console.log(this.score);\n  }\n}\n\nconst session = new QuizSession(3);\nconst callback = session.showScore;\n\ncallback();',
      options: [
        { id: 'A', label: 'Class 方法不能指定給變數' },
        { id: 'B', label: 'score 必須宣告在 prototype 上' },
        {
          id: 'C',
          label:
            'callback() 不是透過物件呼叫；class 方法在 strict mode 下執行時，this 是 undefined',
        },
        { id: 'D', label: 'Constructor 不能接收數字' },
      ],
      correctAnswer: 'C',
      explanation:
        'session.showScore 取得函式後，函式值被單獨保存。最後直接以 callback() 呼叫，不是透過 session 物件呼叫，所以 this 是 undefined，讀取 this.score 便發生 TypeError。',
    },
    {
      id: 'day-04-04',
      number: 4,
      kind: 'exact-text',
      learningGoal: '辨識用來建立固定 this 之新函式的方法',
      prompt:
        '文章使用哪一個函式方法，建立固定以 firstQuestion 作為 this 的新 callback？只輸入方法名稱。',
      hint: '這個方法不會立即執行原函式，而會回傳一個新函式。',
      acceptedAnswers: ['bind'],
      explanation:
        'firstQuestion.showPrompt.bind(firstQuestion) 會回傳新函式；新函式被呼叫時，使用指定的 firstQuestion 作為 this。',
    },
    {
      id: 'day-04-05',
      number: 5,
      kind: 'code-fill',
      learningGoal: '觀察 class instance 與 prototype 的關係',
      prompt: '填入一個 JavaScript 內建方法，取得 question 的 prototype，讓比較結果為 true。',
      hint: '文章用 Object 上一個以 get 開頭的方法觀察物件的 prototype。',
      code: 'class Question {\n  showPrompt() {}\n}\n\nconst question = new Question();\n\nconsole.log(\n  Object.__________(question) === Question.prototype,\n); // true',
      acceptedAnswers: ['getPrototypeOf'],
      explanation:
        'Object.getPrototypeOf(question) 取得 question 的 prototype；由 new Question() 建立的 instance 會連到 Question.prototype。',
    },
  ],
};
