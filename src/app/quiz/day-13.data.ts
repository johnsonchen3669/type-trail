import { QuizDefinition } from './quiz.models';

export const dayThirteenQuiz: QuizDefinition = {
  id: 'day-13',
  day: 13,
  title: 'any、unknown、never：三種不同的不確定性',
  estimatedMinutes: 12,
  questions: [
    {
      id: 'day-13-01',
      number: 1,
      kind: 'choice',
      learningGoal: '分辨 any 與 unknown 對編譯期檢查的不同態度',
      prompt: '如果資料來源的型別尚未確認，為什麼文章通常建議使用 unknown 而不是 any？',
      hint: '比較兩者在直接讀取 property 前，是否要求程式先提供證據。',
      options: [
        { id: 'A', label: 'unknown 會在 Runtime 自動把資料驗證成正確 object' },
        { id: 'B', label: 'any 只能接收字串，unknown 才能接收其他型別' },
        { id: 'C', label: 'unknown 保留不確定性，使用 property 或 method 前必須先 narrowing' },
        { id: 'D', label: 'any 和 unknown 的編譯期行為完全相同，只是名稱不同' },
      ],
      correctAnswer: 'C',
      explanation:
        'any 會讓 TypeScript 放棄附近的型別檢查，因此任意 property 存取可能通過；unknown 可以接收任何值，但要求程式先透過 typeof、instanceof 或其他條件取得證據。這些條件也不等於完整 Runtime Schema。',
    },
    {
      id: 'day-13-02',
      number: 2,
      kind: 'choice',
      learningGoal: '理解 unknown 經過 narrowing 後的 Runtime 結果',
      prompt: '執行以下 TypeScript 程式，showValue(42) 會回傳什麼？',
      hint: '先判斷 typeof 42 是否等於 "string"，再看函式的另一個分支。',
      code: 'function showValue(value: unknown): string {\n  if (typeof value === "string") {\n    return value.toUpperCase();\n  }\n\n  return "不是字串";\n}\n\nshowValue(42);',
      options: [
        { id: 'A', label: '"42"' },
        { id: 'B', label: '"不是字串"' },
        { id: 'C', label: '編譯期錯誤，因為 unknown 不能傳入函式' },
        { id: 'D', label: 'Runtime 拋出 TypeError' },
      ],
      correctAnswer: 'B',
      explanation:
        '42 的 Runtime 型別不是字串，因此不會進入 if。函式回傳第二個分支的 "不是字串"。unknown 本身允許接收這個值，限制的是尚未 narrowing 前的操作。',
    },
    {
      id: 'day-13-03',
      number: 3,
      kind: 'choice',
      learningGoal: '辨識例外值為 unknown 時不能直接假設有 message',
      prompt: '下面的錯誤處理有什麼問題？',
      hint: 'unknown 只表示值存在，不保證它是 Error 或具有某個 property。',
      code: 'function messageFromError(error: unknown): string {\n  return error.message;\n}',
      options: [
        { id: 'A', label: 'unknown 不能作為函式參數' },
        { id: 'B', label: 'message 只能在陣列上使用' },
        { id: 'C', label: '尚未透過 instanceof Error 或其他條件 narrowing，不能直接讀取 error.message' },
        { id: 'D', label: 'Error 必須改成 any 才能讀取 property' },
      ],
      correctAnswer: 'C',
      explanation:
        'error 是 unknown，TypeScript 不允許程式直接假設它有 message。可以先使用 error instanceof Error narrowing；若不是 Error，就回傳明確的未知錯誤訊息。把它改成 any 只會關閉檢查。',
    },
    {
      id: 'day-13-04',
      number: 4,
      kind: 'exact-text',
      learningGoal: '辨識一定丟出例外或不正常返回的函式回傳型別',
      prompt:
        '如果一個函式一定會丟出例外，不會正常回到呼叫端，文章建議使用哪一個 TypeScript 型別作為回傳型別？只輸入型別名稱。',
      hint: '它表示沒有任何正常值可以出現，不是代表回傳 undefined。',
      acceptedAnswers: ['never'],
      explanation:
        'never 表示沒有正常值可以出現。一定丟出例外的函式可以標成 (): never；這和回傳一個 Runtime 的 undefined 不同。',
    },
    {
      id: 'day-13-05',
      number: 5,
      kind: 'code-fill',
      learningGoal: '使用 never 支援 union 的 exhaustive checking',
      prompt:
        '請補上呼叫 assertNever 時傳入的值，讓所有已知狀態都處理後，default 分支可以檢查是否有新增狀態。',
      hint: '把目前 switch 中的狀態變數傳入，讓 TypeScript 檢查它在 default 是否已經沒有可能。',
      code: 'type State =\n  | "idle"\n  | "done";\n\nfunction assertNever(value: never): never {\n  throw new Error("出現未處理的狀態");\n}\n\nfunction label(state: State): string {\n  switch (state) {\n    case "idle":\n      return "尚未開始";\n\n    case "done":\n      return "已完成";\n\n    default:\n      return assertNever(____);\n  }\n}',
      acceptedAnswers: ['state'],
      explanation:
        '所有 State member 都已經在 case 處理後，default 中的 state 會被 narrowing 成 never，因此可以傳給 assertNever。若日後在 union 加入新狀態，這裡的型別檢查會提醒我們補上對應分支。',
    },
  ],
};