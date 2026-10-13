import { QuizDefinition } from './quiz.models';

export const dayThirtyQuiz: QuizDefinition = {
  id: 'day-30',
  day: 30,
  title: '回頭看，TypeScript 幫我們解決了什麼？',
  estimatedMinutes: 12,
  questions: [
    {
      kind: 'choice',
      learningGoal: '區分型別檢查與實際資料驗證',
      prompt: '收到外部資料後，想確認數量實際上是不是數字，應該怎麼做？',
      hint: '想想檢查的是程式宣告，還是執行時收到的值。',
      options: [
        {
          id: 'A',
          label: '把資料斷言成 CartDraft',
        },
        {
          id: 'B',
          label: '用 Zod 或驗證程式檢查實際值',
        },
        {
          id: 'C',
          label: '只替接收變數標註型別',
        },
        {
          id: 'D',
          label: '只執行 ESLint',
        },
      ],
      correctAnswer: 'B',
      explanation: 'Zod 或驗證程式檢查實際資料；型別標註與斷言無法代替這一步。',
      id: 'day-30-01',
      number: 1,
    },
    {
      kind: 'choice',
      learningGoal: '理解型別斷言與執行結果的差異',
      prompt: '執行下面程式，印出什麼？',
      hint: '斷言之後，原本的值有沒有被轉成數字？',
      code: 'const quantity: unknown = "3";\nconst assumed = quantity as number;\nconsole.log(assumed + 1);',
      options: [
        {
          id: 'A',
          label: '數字 4',
        },
        {
          id: 'B',
          label: '字串 "31"',
        },
        {
          id: 'C',
          label: '字串 "4"',
        },
        {
          id: 'D',
          label: '因為 as 而拋出錯誤',
        },
      ],
      correctAnswer: 'B',
      explanation: 'as number 沒有轉換字串，JavaScript 會把 "3" 與 1 串接成 "31"。',
      id: 'day-30-02',
      number: 2,
    },
    {
      kind: 'choice',
      learningGoal: '辨認略過驗證的修改',
      prompt: 'AI 把原本的輸入驗證換成以下程式。這個修改有什麼問題？',
      hint: '找出尚未確認的資料在哪一步被當成可使用的資料。',
      code: 'function preview(raw: unknown) {\n  const cart = raw as CartDraft;\n  return summarizeCart(cart);\n}',
      options: [
        {
          id: 'A',
          label: '直接採用 CartDraft，跳過實際輸入驗證',
        },
        {
          id: 'B',
          label: 'unknown 已驗證所有欄位，不需要 CartDraft',
        },
        {
          id: 'C',
          label: 'summarizeCart 會自動執行原本的輸入驗證',
        },
        {
          id: 'D',
          label: 'as CartDraft 會自動把字串數量轉成數字',
        },
      ],
      correctAnswer: 'A',
      explanation: 'raw 尚未驗證，as CartDraft 只指定編譯器採用的型別；應先確認欄位與數量規則。',
      id: 'day-30-03',
      number: 3,
    },
    {
      kind: 'exact-text',
      learningGoal: '表達尚未確認的資料',
      prompt: '收到尚未確認的資料，想讓 TypeScript 要求先檢查才能使用欄位，應使用哪個型別？',
      hint: '回想資料入口的型別如何保留不確定性。',
      acceptedAnswers: ['unknown'],
      explanation: 'unknown 能接收各種值，使用欄位前需要先縮小型別或完成驗證。',
      id: 'day-30-04',
      number: 4,
    },
    {
      kind: 'code-fill',
      learningGoal: '判斷成功狀態後使用結果欄位',
      prompt: '補上狀態字串，讓 TypeScript 確認這個分支有 summary。請使用雙引號。',
      hint: '查看哪個分支宣告了 summary。',
      code: 'type SummaryResult =\n  | { status: "success"; summary: { total: number } }\n  | { status: "not_found" };\n\nfunction message(result: SummaryResult): string {\n  if (result.status === ____) return String(result.summary.total);\n  return "找不到餐點";\n}',
      acceptedAnswers: ['"success"'],
      explanation: '判斷 status 為 success 後，TypeScript 縮小為有 summary 的成功分支。',
      id: 'day-30-05',
      number: 5,
    },
  ],
};
