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
      hint: '先分開想「按照規則產生程式」與「定義並驗收規則」是誰的責任。',
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
      hint: '查看 QuestionType 等號右邊列出的兩個允許值，再比較指定的字串。',
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
      id: 'day-01-03', number: 3, kind: 'choice', learningGoal: '理解型別正確不等於符合產品需求',
      prompt: '型旅 TypeTrail 規定答對得 10 分、答錯得 0 分。以下函式通過 TypeScript 型別檢查，但最大的問題是什麼？',
      hint: '分別代入 true 與 false，再把回傳值和題目規定的分數比較。',
      code: 'function gradeAnswer(isCorrect: boolean): number {\n  return isCorrect ? 0 : 10;\n}',
      options: [
        { id: 'A', label: 'boolean 不能作為函式參數型別' },
        { id: 'B', label: '函式回傳的分數邏輯寫反了；型別正確仍可能不符合產品需求' },
        { id: 'C', label: 'TypeScript 會在 Runtime 自動把 true 改成 10' },
        { id: 'D', label: '回傳型別必須改成 Question' },
      ],
      correctAnswer: 'B', explanation: '這段程式的參數與回傳值都符合型別，但答對時回傳 0、答錯時回傳 10，與題目規定相反。TypeScript 能檢查已描述的型別關係，不會自行理解產品的判分規則。',
    },
    {
      id: 'day-01-04', number: 4, kind: 'exact-text', learningGoal: '讀懂 QuestionType 允許的值',
      prompt: '文章中的 QuestionType 使用哪一個字串表示文字填空題？只輸入字串內容，不需要引號。',
      hint: '回到 QuestionType 的兩個字串值，其中一個代表選擇題，另一個代表填空題。',
      acceptedAnswers: ['fill'], explanation: '文章將題型限制為 "choice" | "fill"，其中文字填空題使用 "fill"。',
    },
    {
      id: 'day-01-05', number: 5, kind: 'code-fill', learningGoal: '辨識函式與資料契約的關係',
      prompt: '填入函式的回傳型別。',
      hint: '往上找列出 id、prompt、type 三個欄位的那段定義；空格要填那段定義前面的名稱。',
      code: 'function createQuestion(): ______ {\n  return {\n    id: "day-01-01",\n    prompt: "TypeScript 會在什麼時候檢查型別？",\n    type: "fill",\n  };\n}',
      acceptedAnswers: ['Question'], explanation: '函式回傳的物件需要符合文章中定義的 Question 型別。',
    },
  ],
};
