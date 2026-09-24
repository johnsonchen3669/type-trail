import { QuizDefinition } from './quiz.models';

export const dayElevenQuiz: QuizDefinition = {
  id: 'day-11',
  day: 11,
  title: '型別縮小：讓條件判斷幫忙確認型別',
  estimatedMinutes: 12,
  questions: [
    {
      id: 'day-11-01',
      number: 1,
      kind: 'choice',
      learningGoal: '理解聯集與型別縮小的分工',
      prompt:
        'string | string[] 已經列出 answer 的可能型別。為什麼函式仍需要 typeof 或 Array.isArray 之類的判斷？',
      hint: '先區分「列出所有可能」和「目前這條程式路徑剩下哪一種」。',
      options: [
        { id: 'A', label: '因為聯集宣告後，就能直接呼叫所有成員的方法' },
        { id: 'B', label: '因為型別縮小會把陣列轉成字串' },
        { id: 'C', label: '因為聯集列出所有可能，判斷式才能讓 TypeScript 在目前分支排除不可能的型別' },
        { id: 'D', label: '因為 typeof 會改變呼叫者傳入的資料型別' },
      ],
      correctAnswer: 'C',
      explanation:
        '聯集列出兩種可能；條件判斷在執行時區分資料，TypeScript 才能在目前分支縮小型別。型別縮小不會轉換原本的值。',
    },
    {
      id: 'day-11-02',
      number: 2,
      kind: 'choice',
      learningGoal: '判斷 Array.isArray() 如何縮小聯集型別',
      prompt: '在以下函式的 if 分支中，TypeScript 會把 answer 視為哪一種型別？',
      hint: '先看 Array.isArray(answer) 成立時，聯集中的哪一種可能被排除。',
      code: 'function showAnswer(answer: string | string[]): string {\n  if (Array.isArray(answer)) {\n    return answer.join("、");\n  }\n\n  return answer.trim();\n}',
      options: [
        { id: 'A', label: 'string' },
        { id: 'B', label: 'string[]' },
        { id: 'C', label: 'string | string[]' },
        { id: 'D', label: 'string[] | undefined' },
      ],
      correctAnswer: 'B',
      explanation:
        'Array.isArray(answer) 成立時，TypeScript 會把 answer 從 string | string[] 縮小為 string[]。空陣列仍是陣列，不會讓 answer 變成 undefined。',
    },
    {
      id: 'day-11-03',
      number: 3,
      kind: 'choice',
      learningGoal: '辨識 typeof null === "object" 造成的型別縮小不足',
      prompt: '以下函式的 if 判斷為什麼不足？',
      hint: '回想 typeof null 的結果，再看 toISOString() 能否用在 null。',
      code: 'function dateLabel(value: Date | null): string {\n  if (typeof value === "object") {\n    return value.toISOString();\n  }\n\n  return "無日期";\n}',
      options: [
        { id: 'A', label: 'Date | null 中的 null 會在函式入口自動被排除' },
        { id: 'B', label: 'typeof value 對 Date 會回傳 "date"，所以條件不會成立' },
        { id: 'C', label: 'typeof null 也是 "object"，條件沒有排除 null' },
        { id: 'D', label: 'toISOString() 會回傳數字，與函式回傳型別衝突' },
      ],
      correctAnswer: 'C',
      explanation:
        'typeof null 是 "object"，所以這個條件仍可能讓 value 是 null。需要先排除 null，或改用 value instanceof Date 判斷實例。',
    },
    {
      id: 'day-11-04',
      number: 4,
      kind: 'exact-text',
      learningGoal: '辨識根據欄位是否存在進行型別縮小的運算子',
      prompt: '要檢查 question 是否有 options 欄位，文章使用哪一個 JavaScript 運算子？只輸入運算子名稱。',
      hint: '回看判斷式 "options" ____ question。',
      acceptedAnswers: ['in'],
      explanation:
        'in 會在執行時檢查物件本身或原型鏈上是否有指定欄位，TypeScript 也會利用結果縮小型別。',
    },
    {
      id: 'day-11-05',
      number: 5,
      kind: 'code-fill',
      learningGoal: '只排除 undefined，保留空字串',
      prompt: '空字串也算已提供答案。請填入 JavaScript 的缺值名稱，讓條件只排除未提供的答案。',
      hint: 'if (answer) 也會排除空字串；這裡只要排除型別中的缺值。',
      code: 'function displayAnswer(answer: string | undefined): string {\n  if (answer !== ____) {\n    return `答案：${answer}`;\n  }\n\n  return "尚未作答";\n}',
      acceptedAnswers: ['undefined'],
      explanation:
        'answer !== undefined 只排除未提供的情況。空字串仍會進入第一個分支，TypeScript 也會在該分支把 answer 視為字串。',
    },
  ],
};
