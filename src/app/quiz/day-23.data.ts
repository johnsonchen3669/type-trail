import { QuizDefinition } from './quiz.models';

export const dayTwentyThreeQuiz: QuizDefinition = {
  id: 'day-23',
  day: 23,
  title: 'API 傳來的資料，TypeScript 知道嗎？',
  estimatedMinutes: 12,
  questions: [
    {
      number: 1,
      kind: 'choice',
      learningGoal: '理解執行時資料驗證的用途',
      prompt: '程式已經有 TypeScript 型別宣告，為什麼還要用 Zod 驗證 API 回應？',
      hint: '想想型別檢查與 API 資料到達程式的時間點。',
      options: [
        { id: 'A', label: 'Zod 會將 TypeScript 程式編譯成 JavaScript' },
        { id: 'B', label: 'Zod 在執行時檢查實際回應，讓程式在使用資料前處理格式錯誤' },
        { id: 'C', label: 'Zod 會自動重試失敗的 API 請求' },
        { id: 'D', label: 'Zod 會確認題目答案的內容正確' },
      ],
      correctAnswer: 'B',
      explanation:
        'TypeScript 檢查程式如何使用資料，Zod 則檢查實際收到的值是否符合 Schema。程式可以先處理驗證失敗，再將符合規則的資料交給後續流程。',
      id: 'day-23-01',
    },
    {
      number: 2,
      kind: 'choice',
      learningGoal: '判斷 Zod Schema 驗證的結果',
      prompt: '以下 result.success 的值是什麼？',
      hint: '依序核對欄位型別，以及 type 允許的選項。',
      options: [
        {
          id: 'A',
          label: 'true，因為三個欄位都是字串',
        },
        {
          id: 'B',
          label: 'false，因為 essay 不在 type 允許的選項中',
        },
        {
          id: 'C',
          label: 'true，因為 Zod 會將 essay 改成 choice',
        },
        {
          id: 'D',
          label: 'false，因為 id 必須至少有三個字元',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'type 只允許 choice 或 fill，essay 不符合規則。因此驗證失敗，result.success 為 false。',
      code: 'const QuestionSchema = z.object({\n  id: z.string().min(1),\n  prompt: z.string().trim().min(1),\n  type: z.enum(["choice", "fill"]),\n});\n\nconst result = QuestionSchema.safeParse({\n  id: "q-2",\n  prompt: "請解釋型別推論",\n  type: "essay",\n});',
      id: 'day-23-02',
    },
    {
      number: 3,
      kind: 'choice',
      learningGoal: '在成功分支使用 safeParse 的資料',
      prompt: '沿用文章的 QuestionSchema，以下程式無法通過型別檢查，問題在哪裡？',
      hint: 'safeParse 同時可能回傳成功與失敗結果。',
      options: [
        {
          id: 'A',
          label: 'safeParse 不能接收 unknown',
        },
        {
          id: 'B',
          label: 'console.log 只能接受數字',
        },
        {
          id: 'C',
          label: '尚未判斷 success，就讀取只有成功分支才有的 data',
        },
        {
          id: 'D',
          label: 'safeParse 直接回傳題目物件，應改成 result.prompt',
        },
      ],
      correctAnswer: 'C',
      explanation:
        '失敗結果具有 error，成功結果才具有 data。先判斷 result.success，才能在成功分支讀取資料。',
      code: 'function showPayload(payload: unknown): void {\n  const result = QuestionSchema.safeParse(payload);\n  console.log(result.data.prompt);\n}',
      id: 'day-23-03',
    },
    {
      number: 4,
      kind: 'exact-text',
      learningGoal: '選擇以結果處理驗證失敗的方法',
      prompt:
        '要讓 Zod 在驗證失敗時回傳 success: false 與 error，應呼叫 Schema 的哪個方法？只填方法名稱。',
      hint: '比較文章中兩種驗證方法的失敗處理方式。',
      acceptedAnswers: ['safeParse'],
      explanation: 'safeParse 回傳成功或失敗結果；parse 驗證失敗時會拋出 ZodError。',
      id: 'day-23-04',
    },
    {
      number: 5,
      kind: 'code-fill',
      learningGoal: '從 Zod Schema 推導 TypeScript 型別',
      prompt: '補上 Zod 提供的型別工具名稱，讓 Question 從 Schema 推導而來。',
      hint: '泛型內的 typeof QuestionSchema 先取得 Schema 的型別。',
      acceptedAnswers: ['infer'],
      explanation:
        'z.infer<typeof QuestionSchema> 取得驗證成功後的資料型別。Schema 供執行時驗證，推導出的型別供編譯期檢查。',
      code: 'type Question = z.____<typeof QuestionSchema>;',
      id: 'day-23-05',
    },
  ],
};
