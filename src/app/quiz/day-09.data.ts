import { QuizDefinition } from './quiz.models';

export const dayNineQuiz: QuizDefinition = {
  id: 'day-09',
  day: 9,
  title: 'Object Type：從資料結構開始建模',
  estimatedMinutes: 12,
  questions: [
    {
      id: 'day-09-01',
      number: 1,
      kind: 'choice',
      learningGoal: '理解 required property 與 optional property 的差異',
      prompt: '以下哪一項最準確地描述 explanation?: string？',
      hint: '注意 property 名稱後面的 ?，再想想物件是否可以完全省略這個欄位。',
      options: [
        { id: 'A', label: 'explanation 必須存在，而且 Runtime 會自動把缺少的值填成空字串' },
        { id: 'B', label: 'explanation 可以不出現在物件中，讀取時要處理它可能沒有值的情況' },
        { id: 'C', label: 'explanation 只能被指定一次，之後不能修改' },
        { id: 'D', label: 'explanation 可以是任意型別，因為 optional property 不會檢查值' },
      ],
      correctAnswer: 'B',
      explanation:
        '? 表示 optional property，可以省略該欄位；它不是自動填值，也不會讓 property 失去原本的 string 型別規則。使用它時要處理欄位不存在的可能性。',
    },
    {
      id: 'day-09-02',
      number: 2,
      kind: 'choice',
      learningGoal: '讀取 optional property 時處理缺少欄位的結果',
      prompt: '以下程式在 Runtime 會輸出什麼？',
      hint: '建立 question 時沒有提供 explanation，先判斷 if 條件是否成立。',
      code: 'type Question = {\n  prompt: string;\n  explanation?: string;\n};\n\nconst question: Question = {\n  prompt: "哪個關鍵字用來匯出？",\n};\n\nfunction displayExplanation(question: Question) {\n  if (question.explanation === undefined) {\n    return "尚未提供解析";\n  }\n\n  return question.explanation;\n}\n\nconsole.log(displayExplanation(question));',
      options: [
        { id: 'A', label: 'undefined' },
        { id: 'B', label: '空字串' },
        { id: 'C', label: '尚未提供解析' },
        { id: 'D', label: '編譯通過，但呼叫函式時一定會拋出 TypeError' },
      ],
      correctAnswer: 'C',
      explanation:
        'explanation 是 optional property，而這個物件沒有提供它，所以讀到的是 undefined。函式先進入 if，回傳並輸出尚未提供解析。',
    },
    {
      id: 'day-09-03',
      number: 3,
      kind: 'choice',
      learningGoal: '區分 readonly property 與陣列內容是否可變',
      prompt: '開發者想讓 options 完全不能修改，以下型別與程式最需要修正的地方是什麼？',
      hint: '分開判斷「替換 options property」與「修改 property 指向的陣列」這兩個操作。',
      code: 'type Question = {\n  readonly options: string[];\n};\n\nconst question: Question = {\n  options: ["export", "import"],\n};\n\nquestion.options = ["import"]; // 編譯期錯誤\nquestion.options.push("default");',
      options: [
        { id: 'A', label: 'readonly 只限制 property 被換成另一個陣列，string[] 的內容仍可修改' },
        { id: 'B', label: 'readonly 會讓整個陣列在 Runtime 自動凍結，因此兩行都一定在 Runtime 拋錯' },
        { id: 'C', label: 'readonly 只能用在字串，不能用在陣列 property' },
        { id: 'D', label: '只要把 question 宣告成 const，就能讓陣列內容不可修改' },
      ],
      correctAnswer: 'A',
      explanation:
        'readonly options 不允許重新指定 options，但 string[] 本身仍是可變陣列，所以 push 可以通過編譯期檢查。若要同時限制陣列內容，應使用 readonly string[]；const 也只限制 binding，不會凍結陣列。',
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
        'import type { Question } from "./question-types.js" 明確宣告只匯入型別；編譯後整行消失，也不會載入並執行來源模組。',
    },
    {
      id: 'day-09-05',
      number: 5,
      kind: 'code-fill',
      learningGoal: '用 array type 描述只包含字串的選項',
      prompt: '請補上 options 的型別，讓它表示由字串組成的陣列。',
      hint: '文章使用「元素型別加上方括號」表示陣列，例如一組只包含字串的值。',
      code: 'type Question = {\n  prompt: string;\n  options: ____;\n};',
      acceptedAnswers: ['string[]'],
      explanation:
        'string[] 表示元素型別為 string 的陣列，因此 options 可以放入 "export"、"import" 等字串，但不能放入數字。',
    },
  ],
};