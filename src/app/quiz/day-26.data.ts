import { QuizDefinition } from './quiz.models';

export const dayTwentySixQuiz: QuizDefinition = {
  id: 'day-26',
  day: 26,
  title: '類別、裝飾器與依賴注入：讀懂 Angular 的程式結構',
  estimatedMinutes: 12,
  questions: [
    {
      id: 'day-26-01',
      number: 1,
      kind: 'choice',
      learningGoal: '分清類別、裝飾器與依賴注入的工作',
      prompt: '在本文 Angular 例子裡，哪個敘述最準確？',
      hint: '分別看類別裡的方法、@Component 的設定，以及 inject 的呼叫。',
      options: [
        {
          id: 'A',
          label: '類別負責組織資料與方法；裝飾器提供框架設定；依賴注入讓框架提供依賴',
        },
        {
          id: 'B',
          label: '類別會自動驗證 API 資料；裝飾器只影響 TypeScript 排版；依賴注入會修改方法回傳型別',
        },
        {
          id: 'C',
          label: '裝飾器負責判分；類別只負責 HTML；依賴注入只負責匯入檔案',
        },
        {
          id: 'D',
          label: '三者都只在 TypeScript 編譯期存在，執行時沒有作用',
        },
      ],
      correctAnswer: 'A',
      explanation:
        '類別可組織狀態與方法；Angular 裝飾器提供元件與服務設定；注入器依 provider 提供依賴。',
    },
    {
      id: 'day-26-02',
      number: 2,
      kind: 'choice',
      learningGoal: '讀懂 Angular 服務如何被元件取得',
      prompt: '以下元件中的 service 由誰依註冊資料提供？',
      hint: 'inject 的參數是查找依賴的 token。',
      code: '@Injectable({ providedIn: "root" })\nclass QuestionService {}\n\n@Component({ selector: "app-question", template: "" })\nclass QuestionComponent {\n  service = inject(QuestionService);\n}',
      options: [
        {
          id: 'A',
          label: 'TypeScript 型別推論直接建立服務實例',
        },
        {
          id: 'B',
          label: 'Angular 注入器依 provider 取得服務實例',
        },
        {
          id: 'C',
          label: 'HTML 範本建立服務實例',
        },
        {
          id: 'D',
          label: 'selector 字串建立服務實例',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'providedIn: "root" 提供註冊方式，Angular 注入器依 QuestionService token 取得實例。',
    },
    {
      id: 'day-26-03',
      number: 3,
      kind: 'choice',
      learningGoal: '辨識型別介面不能單獨作為執行時注入 token',
      prompt: '下列程式想用 TypeScript interface 當 Angular 的依賴識別值，問題在哪裡？',
      hint: 'TypeScript 編譯後，interface 還是 JavaScript 的值嗎？',
      code: 'interface QuestionReader {\n  getPrompt(): string;\n}\n\nconst reader = inject(QuestionReader);',
      options: [
        {
          id: 'A',
          label: 'getPrompt 必須回傳數字',
        },
        {
          id: 'B',
          label: 'interface 編譯後沒有執行時的值，不能直接當注入 token',
        },
        {
          id: 'C',
          label: 'inject 只能在 HTML 中呼叫',
        },
        {
          id: 'D',
          label: 'interface 一定要寫成 type',
        },
      ],
      correctAnswer: 'B',
      explanation:
        '介面只描述編譯期的形狀，不能作為執行時查找的值；可使用類別或 InjectionToken 等 token。',
    },
    {
      id: 'day-26-04',
      number: 4,
      kind: 'exact-text',
      learningGoal: '辨識 Angular 類別裝飾器提供的資料名稱',
      prompt: '@Component 中的 selector 與 template，本文合稱為元件的什麼資料？請填英文術語。',
      hint: '這個詞指框架讀取的設定資料。',
      acceptedAnswers: ['metadata'],
      explanation: 'selector 與 template 是元件的 metadata，Angular 依它們處理元件。',
    },
    {
      id: 'day-26-05',
      number: 5,
      kind: 'code-fill',
      learningGoal: '使用 Angular 取得已註冊的服務',
      prompt: '補上本文示範的函式名稱，讓元件向 Angular 取得 QuestionService，不含括號。',
      hint: '這個函式以服務類別作為查找 token。',
      code: '@Component({ selector: "app-question", template: "" })\nclass QuestionComponent {\n  service = ____(QuestionService);\n}',
      acceptedAnswers: ['inject'],
      explanation: 'inject(QuestionService) 讓 Angular 注入器依 token 提供已註冊的服務。',
    },
  ],
};
