import { QuizDefinition } from './quiz.models';

export const dayTwentyEightQuiz: QuizDefinition = {
  id: 'day-28',
  day: 28,
  title: '讓 AI 依規格寫 TypeScript：用 Zod 與測試驗收',
  estimatedMinutes: 12,
  questions: [
    {
      kind: 'choice',
      learningGoal: '用 Prompt 明確描述程式契約',
      prompt: '希望 AI 產生指定的 validateCart，哪份要求最方便驗收？',
      hint: '看哪份要求能對照函式輸入、回傳格式與資料規則。',
      options: [
        {
          id: 'A',
          label: '請用 TypeScript 寫得完整一點',
        },
        {
          id: 'B',
          label: '接收 unknown，數量 1～10，成功回傳 ok 與 cart，失敗回傳 ok 與 errors',
        },
        {
          id: 'C',
          label: '請多寫一些型別，結果由你決定',
        },
        {
          id: 'D',
          label: '測試通過就可以修改原本的欄位名稱',
        },
      ],
      correctAnswer: 'B',
      explanation: '明確的輸入、資料規則與回傳格式可以對照生成的程式與測試。',
      id: 'day-28-01',
      number: 1,
    },
    {
      kind: 'choice',
      learningGoal: '依指定規則驗收函式行為',
      prompt: '依本文的驗證要求，執行下面程式，result.ok 是什麼？',
      hint: '對照 quantity 要接受的型別。',
      options: [
        {
          id: 'A',
          label: 'true',
        },
        {
          id: 'B',
          label: 'false',
        },
        {
          id: 'C',
          label: 'undefined',
        },
        {
          id: 'D',
          label: '因為值可轉成數字，所以由函式自行決定',
        },
      ],
      correctAnswer: 'B',
      explanation: 'Prompt 要求數量是 number，字串 "2" 應驗證失敗。',
      code: 'const result = validateCart({\n  pizzaId: "margherita", quantity: "2", note: "",\n});\nconsole.log(result.ok);',
      id: 'day-28-02',
      number: 2,
    },
    {
      kind: 'choice',
      learningGoal: '核對生成結果是否遵守失敗契約',
      prompt: 'AI 寫出的失敗分支如下，與本文契約有什麼落差？',
      hint: '對照失敗時必須提供的資訊。',
      options: [
        {
          id: 'A',
          label: '缺少 errors 欄位',
        },
        {
          id: 'B',
          label: 'ok 應改成 true',
        },
        {
          id: 'C',
          label: '失敗也一定要提供 cart',
        },
        {
          id: 'D',
          label: '應直接把輸入斷言為 CartDraft',
        },
      ],
      correctAnswer: 'A',
      explanation: '失敗契約是 { ok: false, errors: string[] }，需要提供錯誤文字。',
      code: 'return { ok: false };',
      id: 'day-28-03',
      number: 3,
    },
    {
      kind: 'exact-text',
      learningGoal: '指定驗證函式的輸入契約',
      prompt: '本文 Prompt 要求 validateCart 的 raw 使用哪個型別？只填型別名稱。',
      hint: '輸入尚未完成驗證。',
      acceptedAnswers: ['unknown'],
      explanation: 'raw 接收 unknown，再由 Schema 與驗證規則確認資料。',
      id: 'day-28-04',
      number: 4,
    },
    {
      kind: 'code-fill',
      learningGoal: '遵守成功結果的使用規則',
      prompt: '依本文的 ValidationResult，補上用來區分成功與失敗的欄位。',
      hint: '查看兩個分支中值不同的欄位。',
      acceptedAnswers: ['ok'],
      explanation: 'ok 為 true 時，成功分支提供 cart。',
      code: 'if (result.____) {\n  console.log(result.cart);\n}',
      id: 'day-28-05',
      number: 5,
    },
  ],
};
