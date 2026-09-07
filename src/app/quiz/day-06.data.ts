import { QuizDefinition } from './quiz.models';

export const daySixQuiz: QuizDefinition = {
  id: 'day-06',
  day: 6,
  title: 'ES Module：現代 JavaScript 專案的邊界',
  estimatedMinutes: 12,
  questions: [
    {
      id: 'day-06-01',
      number: 1,
      kind: 'choice',
      learningGoal: '理解 module scope 與匯出邊界',
      prompt:
        'grade.js 在頂層宣告 const points = 10，但沒有匯出它。另一個 ES Module 要如何理解這個變數？',
      hint: '想想「檔案內有宣告」與「對外提供名稱」之間還差哪一步。',
      options: [
        { id: 'A', label: '只要在同一個資料夾，就能直接使用 points' },
        { id: 'B', label: '匯入 grade.js 的任何函式後，就能直接使用 points' },
        { id: 'C', label: 'points 留在來源模組的 scope，其他模組不能直接以具名匯入取得它' },
        { id: 'D', label: '沒有匯出的變數，連 grade.js 裡的函式都不能使用' },
      ],
      correctAnswer: 'C',
      explanation:
        '模組內宣告不會自動成為全域名稱，也不會自動匯出。來源模組內的函式仍能依 scope 規則使用它。',
    },
    {
      id: 'day-06-02',
      number: 2,
      kind: 'choice',
      learningGoal: '理解匯入會反映來源綁定的更新',
      prompt: '以下兩個檔案在文章設定的 Node.js ESM 環境中，執行 main.js 會依序輸出什麼？',
      hint: '檢查函式更新的是哪一個變數，再判斷匯入是否只保留初始數字。',
      code: '// counter.js\nexport let count = 2;\n\nexport function increment() {\n  count += 1;\n}\n\n// main.js\nimport { count, increment } from "./counter.js";\n\nconsole.log(count);\nincrement();\nconsole.log(count);',
      options: [
        { id: 'A', label: '2、2' },
        { id: 'B', label: '2、3' },
        { id: 'C', label: '3、3' },
        { id: 'D', label: '2，然後因為來源不能更新已匯出的變數而拋出錯誤' },
      ],
      correctAnswer: 'B',
      explanation:
        'ESM 的匯入會反映來源綁定目前的值。increment() 在來源模組更新 count，第二次讀取就會得到 3。',
    },
    {
      id: 'day-06-03',
      number: 3,
      kind: 'choice',
      learningGoal: '辨識具名匯出與預設匯入不匹配',
      prompt: '以下程式在 Node.js ESM 環境中無法正常載入，問題在哪裡？',
      hint: '比對來源提供的匯出形式，以及使用端有沒有大括號。',
      code: '// grade.js\nexport function gradeAnswer(input, expected) {\n  return input === expected ? 10 : 0;\n}\n\n// main.js\nimport gradeAnswer from "./grade.js";\n\nconsole.log(gradeAnswer("export", "export"));',
      options: [
        { id: 'A', label: '函式一定要使用 export default 才能匯出' },
        { id: 'B', label: '相對匯入不能包含 .js 副檔名' },
        { id: 'C', label: 'gradeAnswer 必須先改成 async function 才能跨檔案呼叫' },
        { id: 'D', label: '使用端要求預設匯出，但來源只提供具名匯出' },
      ],
      correctAnswer: 'D',
      explanation:
        '應改為 import { gradeAnswer } from "./grade.js"，才能對應來源的具名匯出。函式可以透過具名或預設方式匯出，兩端需要匹配。',
    },
    {
      id: 'day-06-04',
      number: 4,
      kind: 'exact-text',
      learningGoal: '辨識 Node.js 明確指定 .js 使用 ESM 的套件設定',
      prompt:
        '依文章的 package.json 範例，要明確讓套件範圍內的 .js 使用 ESM，"type" 欄位應填入哪個字串值？只輸入值，不含引號。',
      hint: '本題問的是 JavaScript 模組格式設定，不是套件名稱或副檔名。',
      acceptedAnswers: ['module'],
      explanation:
        '"type": "module" 明確指定這個套件範圍內的 .js 採用 ESM；.mjs 則是另一種以副檔名明確標示的方法。',
    },
    {
      id: 'day-06-05',
      number: 5,
      kind: 'code-fill',
      learningGoal: '明確表達只參與 TypeScript 型別檢查的匯入',
      prompt:
        'Question 只用來描述參數，不需要執行時匯入。請補上一個關鍵字，明確讓整行成為會被移除的型別匯入。路徑沿用文章先編譯為 JavaScript ESM 的情境。',
      hint: '空格決定這行匯入是否只供型別檢查使用。',
      code: 'import ____ { Question } from "./question-types.js";\n\nexport function showQuestion(question: Question) {\n  console.log(question.prompt);\n}',
      acceptedAnswers: ['type'],
      explanation:
        'import type 明確標示只匯入型別，整行不會留在 JavaScript 輸出中，也不會用來執行來源模組的初始化程式。',
    },
  ],
};
