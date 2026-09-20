import { QuizDefinition } from './quiz.models';

export const daySeventeenQuiz: QuizDefinition = {
  id: 'day-17',
  day: 17,
  title: 'Function Type：函式也是資料契約',
  estimatedMinutes: 12,
  questions: [
    {
      id: 'day-17-01',
      number: 1,
      kind: 'choice',
      learningGoal: '辨識函式型別所描述的契約',
      prompt: 'type AnswerChecker = (answer: string) => boolean 主要保證什麼？',
      hint: '分別看箭頭左側與右側描述的內容，不要推測函式內部如何判分。',
      options: [
        {
          id: 'A',
          label: '函式必須使用 answer 這個參數名稱，並正確判斷所有答案',
        },
        {
          id: 'B',
          label: '函式接收字串並回傳布林值，但不保證判分邏輯正確',
        },
        {
          id: 'C',
          label: '函式只能宣告成箭頭函式，不能使用一般函式',
        },
        {
          id: 'D',
          label: '函式會在 Runtime 自動驗證答案內容',
        },
      ],
      correctAnswer: 'B',
      explanation:
        '函式型別描述參數與回傳值。參數名稱不參與相容性判斷，型別也不會驗證內部業務邏輯；一個永遠回傳 true 的函式仍可能符合這份型別。',
    },
    {
      id: 'day-17-02',
      number: 2,
      kind: 'choice',
      learningGoal: '理解 callback 可以忽略呼叫端提供的額外參數',
      prompt: '以下程式通過 TypeScript 檢查後，會依序印出什麼？',
      hint: 'callback 可以不宣告自己用不到的參數；接著看陣列元素的順序。',
      code: 'type AnswerVisitor = (answer: string, index: number) => void;\n\nfunction visitAnswers(answers: string[], visit: AnswerVisitor): void {\n  answers.forEach((answer, index) => visit(answer, index));\n}\n\nvisitAnswers(["A", "B"], (answer) => {\n  console.log(answer);\n});',
      options: [
        { id: 'A', label: '先印出 A，再印出 B' },
        { id: 'B', label: '先印出 0，再印出 1' },
        { id: 'C', label: '編譯期錯誤，因為 callback 少了 index 參數' },
        { id: 'D', label: '兩次都印出 undefined' },
      ],
      correctAnswer: 'A',
      explanation:
        'visitAnswers 每次都提供 answer 與 index，但 callback 可以只接收自己需要的 answer。陣列依序走訪，因此輸出 A、B。',
    },
    {
      id: 'day-17-03',
      number: 3,
      kind: 'choice',
      learningGoal: '辨識 callback 選填參數代表呼叫端可能省略該值',
      prompt: '以下 callback 型別與用法的問題是什麼？',
      hint: 'index? 是給 callback 實作者的方便，還是呼叫端可以不傳的承諾？',
      code: 'type AnswerVisitor = (answer: string, index?: number) => void;\n\nconst showPosition: AnswerVisitor = (answer, index) => {\n  console.log(`${index.toFixed(0)}：${answer}`);\n};',
      options: [
        { id: 'A', label: 'answer 必須改成選填參數，才能和 index 搭配' },
        {
          id: 'B',
          label: 'index? 表示呼叫端可能省略索引，因此函式內不能直接呼叫 toFixed',
        },
        { id: 'C', label: 'Callback 不允許回傳 void' },
        { id: 'D', label: '選填參數只能使用在一般函式，不能出現在函式型別中' },
      ],
      correctAnswer: 'B',
      explanation:
        '選填參數表示呼叫端可以不提供該值，所以 index 的型別是 number | undefined。若流程每次都會提供索引，就應把它寫成必要參數；使用端仍可宣告只接收 answer 的 callback。',
    },
    {
      id: 'day-17-04',
      number: 4,
      kind: 'exact-text',
      learningGoal: '辨識沒有提供有意義回傳值的函式型別',
      prompt:
        '(answer: string) => ____ 中，若呼叫端不使用 callback 的回傳值，空格應填入哪個 TypeScript 型別？只填小寫英文。',
      hint: '文章的 AnswerVisitor 使用這個型別表示呼叫端不依賴回傳結果。',
      acceptedAnswers: ['void'],
      explanation:
        'void 表示呼叫端不使用這個函式的回傳值。AnswerVisitor 只負責處理每筆答案，因此型別寫成 (answer: string, index: number) => void。',
    },
    {
      id: 'day-17-05',
      number: 5,
      kind: 'code-fill',
      learningGoal: '使用剩餘參數接收數量不固定的字串',
      prompt:
        '請補上參數宣告，讓 joinFeedback 可以接收零到多個字串，並在函式內以 string[] 使用 messages。',
      hint: '使用三個點把後續引數收集進 messages 陣列。',
      code: 'function joinFeedback(____): string {\n  return messages.join("；");\n}\n\njoinFeedback("答對了", "繼續保持");',
      acceptedAnswers: ['...messages: string[]'],
      explanation:
        '剩餘參數 ...messages: string[] 會把呼叫端傳入的字串收集成陣列。它必須放在參數列表最後，並可接收零到多個值。',
    },
  ],
};
