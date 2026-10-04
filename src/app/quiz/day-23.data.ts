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
      learningGoal: '分辨型別斷言與執行時驗證',
      prompt: '執行 payload as Question 時，實際發生什麼事？',
      hint: '想想這個寫法影響編譯器，還是會讀取執行時資料。',
      options: [
        {
          id: 'A',
          label: '執行時逐一檢查 Question 的欄位',
        },
        {
          id: 'B',
          label: 'TypeScript 依 Question 檢查後續程式，執行時不會檢查資料',
        },
        {
          id: 'C',
          label: '自動替缺少的欄位補上預設值',
        },
        {
          id: 'D',
          label: '把數字欄位轉成字串',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'as Question 是型別斷言，只影響 TypeScript 編譯期的型別判斷；JavaScript 執行時不會因這行檢查或修改物件。',
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
          label: 'false，因為 safeParse 只接受 JSON 字串',
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
          label: 'data 是 JSON 字串，必須先 JSON.parse',
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
