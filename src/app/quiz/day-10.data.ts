import { QuizDefinition } from './quiz.models';

export const dayTenQuiz: QuizDefinition = {
  id: 'day-10',
  day: 10,
  title: '字面值與聯集：用型別表達業務規則',
  estimatedMinutes: 12,
  questions: [
    {
      id: 'day-10-01',
      number: 1,
      kind: 'choice',
      learningGoal: '理解 literal union 對固定業務值的限制',
      prompt: '為什麼 type: "choice" | "fill" 比 type: string 更能表達題型規則？',
      hint: '比較兩種宣告對拼錯的題型文字會怎麼處理。',
      options: [
        { id: 'A', label: 'string 只能存一個值，union 可以存任意數量的值' },
        { id: 'B', label: 'literal union 列出允許的固定值，能在編譯期拒絕清單外的字串' },
        { id: 'C', label: 'literal union 會在 Runtime 把外部字串轉成合法題型' },
        { id: 'D', label: 'string 會自動檢查產品規則中的拼字' },
      ],
      correctAnswer: 'B',
      explanation:
        'string 接受所有字串，拼錯的題型也可能通過；literal union 只接受列出的值。這是編譯期規則，不會轉換外部資料。',
    },
    {
      id: 'day-10-02',
      number: 2,
      kind: 'choice',
      learningGoal: '辨識多個 boolean 允許的無效組合',
      prompt: '以下資料想表示題目只能是選擇題或填空題。哪一項描述最準確？',
      hint: '檢查兩個欄位是否互相限制，以及 true/true 表示什麼。',
      code: 'type QuestionFlags = {\n  isChoice: boolean;\n  isFill: boolean;\n};\n\nconst question: QuestionFlags = {\n  isChoice: true,\n  isFill: true,\n};',
      options: [
        { id: 'A', label: 'boolean 不能放在物件型別裡' },
        { id: 'B', label: '兩個欄位彼此獨立，型別會接受同時是兩種互斥題型的組合' },
        { id: 'C', label: 'TypeScript 會在 Runtime 自動把其中一個 true 改成 false' },
        { id: 'D', label: '只有 false/false 會造成編譯期錯誤' },
      ],
      correctAnswer: 'B',
      explanation:
        '兩個獨立的 boolean 會接受 true/true 與 false/false。若產品只允許一種題型，使用有名字的 union 能排除這兩種組合。',
    },
    {
      id: 'day-10-03',
      number: 3,
      kind: 'choice',
      learningGoal: '找出題型欄位沒有使用已宣告聯集的問題',
      prompt: '題型只允許選擇題或填空題。下面哪個地方讓拼錯的 "choise" 沒有被擋下？',
      hint: '檢查 Question 的 type 欄位實際使用了哪個型別。',
      code: 'type QuestionType = "choice" | "fill";\ntype Question = { type: string };\n\nconst question: Question = { type: "choise" };',
      options: [
        { id: 'A', label: 'QuestionType 寫在 Question 前面，型別檢查不會生效' },
        { id: 'B', label: 'Question.type 仍宣告為 string，沒有使用 QuestionType' },
        { id: 'C', label: 'type 欄位沒有加上 readonly，拼字錯誤就不會被檢查' },
        { id: 'D', label: 'question 使用 const，物件欄位就不會做型別檢查' },
      ],
      correctAnswer: 'B',
      explanation:
        '宣告 QuestionType 不會自動改變其他欄位的型別。把 Question.type 改成 QuestionType，編譯器才會擋下 "choise"。',
    },
    {
      id: 'day-10-04',
      number: 4,
      kind: 'exact-text',
      learningGoal: '辨識 union type 的連接符號',
      prompt: 'TypeScript 用哪一個符號連接 union type 的多個可能？只輸入一個符號。',
      hint: '看兩個固定值在型別宣告中間使用的運算子。',
      acceptedAnswers: ['|'],
      explanation: '| 連接 union 的成員，例如 "choice" | "fill" 表示值可以是其中一個。',
    },
    {
      id: 'day-10-05',
      number: 5,
      kind: 'code-fill',
      learningGoal: '在函式參數重用題型聯集',
      prompt: '請填入已宣告的型別名稱，讓函式只接受選擇題或填空題的名稱。',
      hint: '找出前面已經列出兩種合法題型的名稱。',
      code: 'type QuestionType = "choice" | "fill";\n\nfunction renderQuestion(prompt: string, type: ____) {\n  console.log(prompt, type);\n}\n\nrenderQuestion("哪個關鍵字用來匯出？", "choice");',
      acceptedAnswers: ['QuestionType'],
      explanation:
        '參數標成 QuestionType 後，函式只接受 "choice" 或 "fill"。傳入其他字串時，TypeScript 會在編譯期指出錯誤。',
    },
  ],
};
