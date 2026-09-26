import { QuizDefinition } from './quiz.models';

export const dayThirteenQuiz: QuizDefinition = {
  id: 'day-13',
  day: 13,
  title: 'any、unknown、never：處理未知資料與遺漏分支',
  estimatedMinutes: 12,
  questions: [
    {
      id: 'day-13-01',
      number: 1,
      kind: 'choice',
      learningGoal: '分辨 any 與 unknown 對編譯期檢查的不同態度',
      prompt: '如果資料來源的型別尚未確認，為什麼文章通常建議使用 unknown 而不是 any？',
      hint: '比較兩者在讀取欄位前，是否要求程式先檢查資料。',
      options: [
        { id: 'A', label: 'unknown 會在執行時自動驗證整份資料' },
        { id: 'B', label: '讀取 unknown 的欄位只會得到 undefined，不會有編譯期錯誤' },
        { id: 'C', label: 'unknown 保留不確定性，讀取欄位或呼叫方法前必須先檢查' },
        { id: 'D', label: 'any 和 unknown 都必須先用 typeof 判斷才能讀取欄位' },
      ],
      correctAnswer: 'C',
      explanation:
        'any 會略過這個值的型別檢查，讓任意欄位存取通過；unknown 可以接收任何值，但要求程式先透過 typeof、instanceof 等條件確認可用的操作。這些檢查不會自動驗證整份資料。',
    },
    {
      id: 'day-13-02',
      number: 2,
      kind: 'choice',
      learningGoal: '依執行時檢查讀取 unknown 的欄位',
      prompt: '執行以下 TypeScript 程式，answerLength({ answer: "const" }) 會回傳什麼？',
      hint: '先確認物件與 answer 欄位通過檢查，再計算字串長度。',
      code: 'function answerLength(value: unknown): number {\n  if (typeof value !== "object" || value === null) {\n    return 0;\n  }\n\n  if (!("answer" in value) || typeof value.answer !== "string") {\n    return 0;\n  }\n\n  return value.answer.length;\n}\n\nanswerLength({ answer: "const" });',
      options: [
        { id: 'A', label: '0' },
        { id: 'B', label: '5' },
        { id: 'C', label: '編譯期錯誤，因為 unknown 不能讀取欄位' },
        { id: 'D', label: '執行時拋出 TypeError' },
      ],
      correctAnswer: 'B',
      explanation:
        '傳入的是物件，answer 也是字串，因此兩道檢查都通過。TypeScript 在最後一行知道 value.answer 是字串，執行時讀到 "const" 的長度 5。',
    },
    {
      id: 'day-13-03',
      number: 3,
      kind: 'choice',
      learningGoal: '辨識例外值為 unknown 時不能直接假設有 message',
      prompt: '下面的錯誤處理有什麼問題？',
      hint: '想想 JavaScript 的 throw 可以丟出哪些值。',
      code: 'function messageFromError(error: unknown): string {\n  return error.message;\n}',
      options: [
        { id: 'A', label: 'error: unknown 會在執行時把例外轉成字串' },
        { id: 'B', label: '參數命名為 error，TypeScript 就會把它視為 Error' },
        { id: 'C', label: '尚未透過 instanceof Error 或其他條件縮小型別，不能直接讀取 error.message' },
        { id: 'D', label: '函式回傳型別是 string，所以 error.message 一定是字串' },
      ],
      correctAnswer: 'C',
      explanation:
        'error 是 unknown，TypeScript 不允許程式直接假設它有 message。可以先用 error instanceof Error 縮小型別；其他值則回傳明確的未知錯誤訊息。改成 any 只會略過檢查。',
    },
    {
      id: 'day-13-04',
      number: 4,
      kind: 'exact-text',
      learningGoal: '辨識一定丟出例外的函式回傳型別',
      prompt:
        '如果一個函式一定會丟出例外，不會正常回到呼叫端，文章建議使用哪一個 TypeScript 型別作為回傳型別？只輸入型別名稱。',
      hint: '這個函式沒有正常回傳值；undefined 本身仍是一個值。',
      acceptedAnswers: ['never'],
      explanation:
        'never 表示沒有值可以正常回傳。一定丟出例外的函式可以標成 (): never；undefined 則是執行時可能出現的值。',
    },
    {
      id: 'day-13-05',
      number: 5,
      kind: 'code-fill',
      learningGoal: '用 never 檢查聯集是否漏掉狀態',
      prompt:
        '請填入引號內缺少的狀態值，讓 default 分支只剩 never。只輸入字串內容，不含引號。',
      hint: '比較 State 列出的值與目前已處理的 case。',
      code: 'type State =\n  | "idle"\n  | "loading"\n  | "done";\n\nfunction assertNever(value: never): never {\n  throw new Error("出現未處理的狀態");\n}\n\nfunction label(state: State): string {\n  switch (state) {\n    case "idle":\n      return "尚未開始";\n\n    case "____":\n      return "請稍候";\n\n    case "done":\n      return "已完成";\n\n    default:\n      return assertNever(state);\n  }\n}',
      acceptedAnswers: ['loading'],
      explanation:
        'State 列出 "idle"、"loading" 與 "done"。補上 "loading" 後，default 的 state 才只剩 never；若漏掉它，傳給 assertNever 時會產生編譯期錯誤。',
    },
  ],
};
