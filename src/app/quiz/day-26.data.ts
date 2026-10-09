import { QuizDefinition } from './quiz.models';

export const dayTwentySixQuiz: QuizDefinition = {
  id: 'day-26',
  day: 26,
  title: '裝飾器：從自訂函式到 Angular 的用法',
  estimatedMinutes: 12,
  questions: [
    {
      id: 'day-26-01',
      number: 1,
      kind: 'choice',
      learningGoal: '理解裝飾器函式的用途',
      prompt: '關於套用在類別上的裝飾器，哪個說法正確？',
      hint: '想想裝飾器函式在執行時可以做哪些事。',
      options: [
        {
          id: 'A',
          label: '它是函式，可以記錄資訊、提供設定，或改變類別的行為',
        },
        {
          id: 'B',
          label: '它只描述型別，編譯後整個裝飾器函式都會消失',
        },
        {
          id: 'C',
          label: '每次使用 new 建立實例，都會重新呼叫類別裝飾器',
        },
        {
          id: 'D',
          label: '裝飾器名稱都由 TypeScript 提供，不能自行定義',
        },
      ],
      correctAnswer: 'A',
      explanation:
        '裝飾器是函式，作用由實作內容決定。它會參與執行時的處理，例如記錄資訊；類別裝飾器在類別定義時執行。',
    },
    {
      id: 'day-26-02',
      number: 2,
      kind: 'choice',
      learningGoal: '分清類別裝飾器執行與建立實例的時機',
      prompt: '以下使用標準裝飾器的程式通過編譯後，執行時最後會印出什麼？',
      hint: '計算裝飾器函式被呼叫的次數，留意類別宣告與 new 的差別。',
      code: 'let count = 0;\n\nfunction CountClass(_target: Function, _context: ClassDecoratorContext): void {\n  count += 1;\n}\n\n@CountClass\nclass QuestionService {}\n\nnew QuestionService();\nnew QuestionService();\nconsole.log(count);',
      options: [
        {
          id: 'A',
          label: '0',
        },
        {
          id: 'B',
          label: '1',
        },
        {
          id: 'C',
          label: '2',
        },
        {
          id: 'D',
          label: '3',
        },
      ],
      correctAnswer: 'B',
      explanation:
        '執行到類別定義時，CountClass 被呼叫一次。後面的兩次 new 只建立實例，不會再次呼叫這個類別裝飾器，因此印出 1。',
    },
    {
      id: 'day-26-03',
      number: 3,
      kind: 'choice',
      learningGoal: '辨識裝飾器工廠必須回傳裝飾器函式',
      prompt:
        '想用設定物件控制列印的標籤，以下標準裝飾器寫法卻無法通過 TypeScript 編譯。主要問題是什麼？',
      hint: '檢查 @ 後面那個函式呼叫的結果，是否能被當成裝飾器使用。',
      code: 'function LogClass(options: { label: string }): void {\n  console.log(options.label);\n}\n\n@LogClass({ label: "題目服務" })\nclass QuestionService {}',
      options: [
        {
          id: 'A',
          label: '工廠函式的設定只能使用字串，不能使用物件',
        },
        {
          id: 'B',
          label: 'LogClass 沒有回傳裝飾器函式，呼叫結果是 undefined',
        },
        {
          id: 'C',
          label: '只有方法能加上裝飾器，類別宣告不能使用',
        },
        {
          id: 'D',
          label: '使用裝飾器以前，必須先建立一個類別實例',
        },
      ],
      correctAnswer: 'B',
      explanation:
        '@LogClass({...}) 會先呼叫 LogClass，再將回傳值作為裝飾器。這裡只有列印設定，沒有回傳函式；應回傳接收類別與裝飾資訊的內層函式。',
    },
    {
      id: 'day-26-04',
      number: 4,
      kind: 'exact-text',
      learningGoal: '理解裝飾器工廠的回傳值',
      prompt: '裝飾器工廠接收設定後，必須回傳哪一種值才能用在 @名稱({...})？請填兩個中文字。',
      hint: '這個值會在類別定義時接收裝飾對象與相關資訊。',
      acceptedAnswers: ['函式'],
      explanation: '裝飾器工廠必須回傳函式。外層接收使用端提供的設定，回傳的內層函式才是裝飾器。',
    },
    {
      id: 'day-26-05',
      number: 5,
      kind: 'code-fill',
      learningGoal: '辨認 Angular 服務使用的裝飾器',
      prompt: '補上從 Angular 匯入的裝飾器名稱，讓根層可以提供這個服務。只填名稱，不含 @ 或括號。',
      hint: '這裡設定的是服務的提供範圍，與元件的畫面範本不同。',
      code: 'import { Injectable } from "@angular/core";\n\n@____({ providedIn: "root" })\nexport class QuestionService {\n  getPrompt(): string {\n    return "哪個關鍵字宣告變數？";\n  }\n}',
      acceptedAnswers: ['Injectable'],
      explanation:
        '@Injectable({ providedIn: "root" }) 提供服務的設定，讓 Angular 的根層可以提供 QuestionService。',
    },
  ],
};
