import { QuizDefinition } from './quiz.models';

export const dayNineQuiz: QuizDefinition = {
  id: 'day-09',
  day: 9,
  title: '物件型別：從資料結構開始建模',
  estimatedMinutes: 12,
  questions: [
    {
      id: 'day-09-01',
      number: 1,
      kind: 'choice',
      learningGoal: '理解必要屬性與可選屬性的差異',
      prompt: '以下哪一項最準確地描述 explanation?: string？',
      hint: '注意屬性名稱後面的 ?，再想想物件是否可以完全省略這個欄位。',
      options: [
        { id: 'A', label: 'explanation 必須存在，而且執行時會自動把缺少的值填成空字串' },
        { id: 'B', label: 'explanation 可以不出現在物件中，讀取時要處理它可能沒有值的情況' },
        { id: 'C', label: 'explanation 只能被指定一次，之後不能修改' },
        { id: 'D', label: 'explanation 可以是任意型別，因為可選屬性不會檢查值' },
      ],
      correctAnswer: 'B',
      explanation:
        '? 表示可選屬性，可以省略該欄位；它不會自動填值，提供欄位時仍要符合 string 型別。讀取時要處理欄位不存在的可能性。',
    },
    {
      id: 'day-09-02',
      number: 2,
      kind: 'choice',
      learningGoal: '讀取巢狀物件中的陣列資料',
      prompt: '以下程式在 JavaScript 執行時會輸出什麼？',
      hint: '先從 metadata 找到 tags，再看陣列索引 1 對應哪個元素。',
      code: 'type Question = {\n  metadata: {\n    source: string;\n    tags: string[];\n  };\n};\n\nconst question: Question = {\n  metadata: { source: "day-09", tags: ["module", "typescript"] },\n};\n\nconsole.log(question.metadata.tags[1]);',
      options: [
        { id: 'A', label: 'day-09' },
        { id: 'B', label: 'module' },
        { id: 'C', label: 'typescript' },
        { id: 'D', label: 'undefined' },
      ],
      correctAnswer: 'C',
      explanation:
        'metadata 是巢狀物件，tags 是其中的字串陣列。陣列索引從 0 開始，因此 [1] 讀到第二個元素 "typescript"。',
    },
    {
      id: 'day-09-03',
      number: 3,
      kind: 'choice',
      learningGoal: '區分唯讀屬性與唯讀陣列',
      prompt: '題庫希望 TypeScript 同時阻止更換 options 屬性指向的陣列，以及透過該屬性增刪選項。下面的型別應如何修正？',
      hint: '檢查 readonly 要放在哪兩個位置，才能分別限制屬性重新指定與陣列內容修改。',
      code: 'type Question = {\n  readonly options: string[];\n};\n\nconst question: Question = {\n  options: ["export", "import"],\n};\n\nquestion.options.push("default");',
      options: [
        { id: 'A', label: 'readonly options: readonly string[]' },
        { id: 'B', label: 'readonly options: string[]' },
        { id: 'C', label: 'options: readonly string[]' },
        { id: 'D', label: 'options: string[]' },
      ],
      correctAnswer: 'A',
      explanation:
        '目前的 readonly 只限制重新指定 options，仍可透過 push 修改陣列。加上陣列前的 readonly，才能在編譯期同時限制這兩種操作；它不會在執行時凍結陣列。',
    },
    {
      id: 'day-09-04',
      number: 4,
      kind: 'exact-text',
      learningGoal: '明確表達只參與編譯期檢查的型別匯入',
      prompt:
        'main.ts 要從 ./question-types.js 匯入 Question 型別，並讓整行匯入不出現在編譯後的 JavaScript。import 後面要加哪個關鍵字？只輸入關鍵字。',
      hint: '文章用這個關鍵字宣告匯入的名稱只參與編譯期檢查。',
      acceptedAnswers: ['type'],
      explanation:
        'import type { Question } from "./question-types.js" 明確宣告只匯入型別；編譯後整行消失，不會因這行去載入來源模組。',
    },
    {
      id: 'day-09-05',
      number: 5,
      kind: 'code-fill',
      learningGoal: '用方括號語法描述字串陣列',
      prompt: '請使用「元素型別後接 []」的寫法，補上 options 的型別，讓它表示由字串組成的陣列。',
      hint: '先決定每個選項的元素型別，再加上題目指定的陣列寫法。',
      code: 'type Question = {\n  prompt: string;\n  options: ____;\n};',
      acceptedAnswers: ['string[]'],
      explanation:
        'string[] 表示元素型別為 string 的陣列，符合題目指定的方括號寫法。',
    },
  ],
};
