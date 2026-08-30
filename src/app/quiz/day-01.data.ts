import { QuizDefinition } from './quiz.models';

export const dayOneQuiz: QuizDefinition = {
  id: 'day-01',
  day: 1,
  title: 'AI 都會寫程式了，為什麼還要學 TypeScript？',
  estimatedMinutes: 10,
  questions: [
    {
      id: 'day-01-01', number: 1, kind: 'choice', learningGoal: '理解 TypeScript 在 AI 生成程式碼中的角色',
      prompt: 'AI 已經能產生 TypeScript 程式碼後，開發者仍需要學習 TypeScript 的主要理由是什麼？',
      options: [
        { id: 'A', label: 'TypeScript 可以保證程式在 Runtime 絕對不會出錯' },
        { id: 'B', label: 'TypeScript 可以確認 AI 使用的每一個 API 都真實存在' },
        { id: 'C', label: '開發者可以先定義資料契約，讓 TypeScript 檢查 AI 是否遵守其中一部分規則' },
        { id: 'D', label: 'TypeScript 可以取代錯誤處理、測試與人工審查' },
      ],
      correctAnswer: 'C', explanation: 'TypeScript 能在編譯階段檢查已經被型別描述的規則，但不能取代 Runtime 驗證、測試或工程判斷。',
    },
    {
      id: 'day-01-02', number: 2, kind: 'choice', learningGoal: '區分合法 JavaScript 字串與合法 TypeScript 型別值',
      prompt: '以下程式在 TypeScript 檢查時會發生什麼事？',
      code: 'type QuestionType = "choice" | "fill";\nconst type: QuestionType = "text";',
      options: [
        { id: 'A', label: '通過檢查，因為 "text" 是合法字串' },
        { id: 'B', label: '型別錯誤，因為 "text" 不在 QuestionType 允許的值中' },
        { id: 'C', label: '只有執行到這一行時才會發生錯誤' },
        { id: 'D', label: 'TypeScript 會自動把 "text" 改成 "fill"' },
      ],
      correctAnswer: 'B', explanation: '"text" 在 JavaScript 語法上是合法字串，但不符合 QuestionType 描述的型別契約。',
    },
    {
      id: 'day-01-03', number: 3, kind: 'choice', learningGoal: '理解型別檢查不等於外部資料驗證',
      prompt: '以下函式最大的風險是什麼？',
      code: 'function loadQuestion(raw: string): Question {\n  return JSON.parse(raw);\n}',
      options: [
        { id: 'A', label: 'TypeScript 會在 Runtime 自動驗證 JSON 是否符合 Question' },
        { id: 'B', label: 'JSON.parse 不能解析字串' },
        { id: 'C', label: '外部 JSON 可能不符合 Question，但這段型別宣告本身沒有完成 Runtime 驗證' },
        { id: 'D', label: '函式不能宣告回傳型別' },
      ],
      correctAnswer: 'C', explanation: '型別宣告只描述開發者的預期，不會讓外部資料在 Runtime 自動通過驗證。系列後面會再介紹 Runtime Schema。',
    },
    {
      id: 'day-01-04', number: 4, kind: 'exact-text', learningGoal: '讀懂 Literal Union 允許的值',
      prompt: '文章中的 QuestionType 使用哪一個字串表示文字填空題？只輸入字串內容，不需要引號。',
      acceptedAnswers: ['fill'], explanation: '文章將題型限制為 "choice" | "fill"，其中文字填空題使用 "fill"。',
    },
    {
      id: 'day-01-05', number: 5, kind: 'code-fill', learningGoal: '辨識函式與資料契約的關係',
      prompt: '填入函式的回傳型別。',
      code: 'function createQuestion(): ______ {\n  return {\n    id: "day-01-01",\n    prompt: "TypeScript 會在什麼時候檢查型別？",\n    type: "fill",\n  };\n}',
      acceptedAnswers: ['Question'], explanation: '函式回傳的物件需要符合文章定義的 Question Interface。',
    },
  ],
};
