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
      learningGoal: '辨識兩個字串欄位放反後的執行結果',
      prompt: '以下程式能通過 TypeScript 型別檢查嗎？執行時會輸出什麼？',
      hint: 'id 和 prompt 都接受字串。再看 console.log 讀取哪個欄位。',
      code: 'type Question = {\n  id: string;\n  prompt: string;\n};\n\nconst question: Question = {\n  id: "哪個關鍵字用來匯出？",\n  prompt: "day-09-02",\n};\n\nconsole.log(question.prompt);',
      options: [
        { id: 'A', label: 'TypeScript 會指出型別錯誤' },
        { id: 'B', label: '哪個關鍵字用來匯出？' },
        { id: 'C', label: 'day-09-02' },
        { id: 'D', label: 'undefined' },
      ],
      correctAnswer: 'C',
      explanation:
        'id 和 prompt 都是字串，交換內容仍符合型別。程式讀取 question.prompt，因此輸出 "day-09-02"。',
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
      learningGoal: '判斷只有型別用途時該怎麼匯入',
      prompt:
        'Question 只用來標註函式參數。要從另一個檔案匯入它，import 後面該加哪個關鍵字？只輸入關鍵字。',
      hint: '想想 Question 在函式中是當成型別使用，還是當成可以呼叫的值。',
      acceptedAnswers: ['type'],
      explanation:
        'Question 只用在參數的型別位置，所以寫成 import type { Question } from "./question-types.js"。要匯入程式執行時會呼叫的函式，就用一般的 import。',
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
