import { QuizDefinition } from './quiz.models';

export const dayTenQuiz: QuizDefinition = {
  id: 'day-10',
  day: 10,
  title: 'Literal 與 Union：用型別表達業務規則',
  estimatedMinutes: 12,
  questions: [
    {
      id: 'day-10-01',
      number: 1,
      kind: 'choice',
      learningGoal: '理解 string 與 literal union 對業務值的限制差異',
      prompt: '為什麼 type: "choice" | "fill" 比 type: string 更能表達型旅的題型規則？',
      hint: '比較兩種宣告對拼錯字串 "choise" 的處理方式。',
      options: [
        { id: 'A', label: 'union 會在 Runtime 自動把所有字串轉成合法題型' },
        { id: 'B', label: 'string 只能放一個值，而 union 可以放任意數量的值' },
        { id: 'C', label: 'literal union 列出允許的固定值，能在編譯期拒絕不在清單內的字串' },
        { id: 'D', label: 'literal union 會讓 JavaScript 產生一個可在 Runtime 使用的 QuestionType 物件' },
      ],
      correctAnswer: 'C',
      explanation:
        'string 允許所有字串，因此拼錯的 "choise" 也可能通過；"choice" | "fill" 只允許列出的兩個 literal。這是編譯期規則，不會自動產生 Runtime 物件或轉換值。',
    },
    {
      id: 'day-10-02',
      number: 2,
      kind: 'choice',
      learningGoal: '判斷 union type 接受與拒絕哪些指定值',
      prompt: '以下 TypeScript 程式中，哪一行會造成編譯期錯誤？',
      hint: '逐一比較每次指定的字串是否出現在 QuestionType 的兩個 literal 中。',
      code: 'type QuestionType = "choice" | "fill";\n\nlet type: QuestionType = "choice";\ntype = "fill";\ntype = "essay";',
      options: [
        { id: 'A', label: '宣告 type 的那一行' },
        { id: 'B', label: 'type = "fill";' },
        { id: 'C', label: 'type = "essay";' },
        { id: 'D', label: '三行都會等到 Runtime 才判斷，編譯期不會報錯' },
      ],
      correctAnswer: 'C',
      explanation:
        'QuestionType 只允許 "choice" 或 "fill"。前兩次指定符合 union；"essay" 不在允許值集合中，因此在編譯期被拒絕。',
    },
    {
      id: 'day-10-03',
      number: 3,
      kind: 'choice',
      learningGoal: '辨識 boolean blindness 允許的無效組合',
      prompt: '以下資料想表示題目只能是選擇題或填空題，但模型最大的問題是什麼？',
      hint: '列出兩個 boolean 的四種組合，再檢查「兩個狀態同時成立」是否符合互斥題型的規則。',
      code: 'type QuestionFlags = {\n  isChoice: boolean;\n  isFill: boolean;\n};\n\nconst question: QuestionFlags = {\n  isChoice: true,\n  isFill: true,\n};',
      options: [
        { id: 'A', label: 'boolean 不能放在 object type 裡' },
        { id: 'B', label: '兩個旗標彼此獨立，型別會接受同時是選擇題與填空題的組合' },
        { id: 'C', label: 'true 只能表示選擇題，不能表示填空題' },
        { id: 'D', label: 'TypeScript 會在 Runtime 自動把其中一個 true 改成 false' },
      ],
      correctAnswer: 'B',
      explanation:
        '兩個獨立的 boolean 會接受 true/true 與 false/false 等組合，無法表達「剛好是其中一種」的規則。使用 "choice" | "fill" 這種有名字的 union，模型會更接近題型的實際語意。',
    },
    {
      id: 'day-10-04',
      number: 4,
      kind: 'exact-text',
      learningGoal: '辨識 union type 的連接運算子',
      prompt: 'TypeScript 使用哪一個符號連接 union type 的多個可能？只輸入一個符號。',
      hint: '回看 "choice" | "fill"，它位於兩個 literal type 中間。',
      acceptedAnswers: ['|'],
      explanation: '| 代表 union，表示一個值符合列出的其中一個型別即可，例如 "choice" | "fill"。',
    },
    {
      id: 'day-10-05',
      number: 5,
      kind: 'code-fill',
      learningGoal: '用狀態 union 判斷可執行的送出時機',
      prompt: '只有測驗進行中才能送出，請補上允許送出的狀態值。',
      hint: '文章中的規則是 not-started 不能送出，in-progress 才可以。',
      code: 'type QuizStatus = "not-started" | "in-progress" | "submitted";\n\nfunction canSubmit(status: QuizStatus) {\n  return status === ____;\n}',
      acceptedAnswers: ['"in-progress"', 'in-progress'],
      explanation:
        'canSubmit 應該比較 status 是否為 "in-progress"。union 先限制狀態名稱的集合，函式中的條件再表達哪一個狀態允許送出。',
    },
  ],
};