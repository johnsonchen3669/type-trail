import { QuizDefinition } from './quiz.models';

export const dayEighteenQuiz: QuizDefinition = {
  id: 'day-18',
  day: 18,
  title: '泛型：保留輸入與輸出的關係',
  estimatedMinutes: 12,
  questions: [
    {
      id: 'day-18-01',
      number: 1,
      kind: 'choice',
      learningGoal: '理解泛型保留輸入與輸出之間的型別關係',
      prompt:
        'function first<T>(items: T[]): T | undefined 中，同一個 T 出現在參數與回傳值，主要表達什麼？',
      hint: '比較傳入 number[] 與 string[] 時，回傳型別會如何改變。',
      options: [
        { id: 'A', label: '函式只接受名為 T 的 JavaScript 類別' },
        { id: 'B', label: '函式會在執行時檢查陣列元素' },
        {
          id: 'C',
          label: '傳入哪一種元素的陣列，回傳值就保留該元素型別，並可能是 undefined',
        },
        { id: 'D', label: '所有呼叫都固定回傳 unknown' },
      ],
      correctAnswer: 'C',
      explanation:
        'T 是型別參數。TypeScript 會依每次呼叫決定 T，並把同一個型別帶到回傳位置；空陣列仍可能讓 JavaScript 回傳 undefined。',
    },
    {
      id: 'day-18-02',
      number: 2,
      kind: 'choice',
      learningGoal: '判斷泛型函式的推論結果',
      prompt: '以下程式中，result 的推論型別是什麼？',
      hint: '先從引數 [true, false] 推論 T，再代入回傳型別。',
      code: 'function first<T>(items: T[]): T | undefined {\n  return items[0];\n}\n\nconst result = first([true, false]);',
      options: [
        { id: 'A', label: 'string | undefined' },
        { id: 'B', label: 'boolean | undefined' },
        { id: 'C', label: 'unknown' },
        { id: 'D', label: 'T[]' },
      ],
      correctAnswer: 'B',
      explanation:
        '陣列引數讓 TypeScript 推論 T 為 boolean，因此 T | undefined 成為 boolean | undefined。',
    },
    {
      id: 'day-18-03',
      number: 3,
      kind: 'choice',
      learningGoal: '辨識泛型約束的最低要求',
      prompt: '以下呼叫無法通過型別檢查，精確原因是什麼？',
      hint: '查看 T extends ... 規定每個元素至少要提供哪個欄位。',
      code: 'function findById<T extends { id: string }>(\n  items: T[],\n  id: string,\n): T | undefined {\n  return items.find((item) => item.id === id);\n}\n\nfindById([{ prompt: "泛型約束" }], "q18");',
      options: [
        { id: 'A', label: '泛型函式不能接收物件陣列' },
        { id: 'B', label: 'prompt 必須是數字' },
        { id: 'C', label: '陣列元素缺少約束要求的 id: string' },
        { id: 'D', label: '第二個參數不能使用字串' },
      ],
      correctAnswer: 'C',
      explanation:
        'T extends { id: string } 要求 T 至少具有字串 id。傳入的物件只有 prompt，不符合約束，因此錯誤發生在呼叫處。',
    },
    {
      id: 'day-18-04',
      number: 4,
      kind: 'exact-text',
      learningGoal: '辨識泛型宣告中的型別參數',
      prompt:
        'function first<T>(items: T[]): T | undefined 中，哪個識別字是型別參數？只填一個英文字母。',
      hint: '它出現在函式名稱後方的角括號內，並連接參數與回傳型別。',
      acceptedAnswers: ['T'],
      explanation: 'T 是這個函式的型別參數。每次呼叫可以推論或明確指定 T 的型別。',
    },
    {
      id: 'day-18-05',
      number: 5,
      kind: 'code-fill',
      learningGoal: '指定泛型介面中資料欄位的型別',
      prompt: '補上型別，讓 response.data 必須是題目陣列。使用已宣告的 Question 搭配陣列語法 []。',
      hint: '角括號內的型別會套用到 data，注意它包含的是一筆資料還是一組資料。',
      code: 'interface Question {\n  id: string;\n  prompt: string;\n}\n\ninterface ApiResponse<T> {\n  data: T;\n  requestId: string;\n}\n\nconst response: ApiResponse<____> = {\n  data: [{ id: "q19", prompt: "泛型介面" }],\n  requestId: "req-19",\n};',
      acceptedAnswers: ['Question[]'],
      explanation:
        'ApiResponse 的 data 使用型別參數 T。指定 Question[] 後，data 就必須符合題目陣列的型別，requestId 仍維持 string。',
    },
  ],
};
