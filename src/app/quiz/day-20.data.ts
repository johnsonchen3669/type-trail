import { QuizDefinition } from './quiz.models';

export const dayTwentyQuiz: QuizDefinition = {
  id: 'day-20',
  day: 20,
  title: '工具型別：從既有型別產生新型別',
  estimatedMinutes: 12,
  questions: [
    {
      number: 1,
      kind: 'choice',
      learningGoal: '區分 Pick 與 Omit 的用途',
      prompt: '要從既有型別保留指定欄位，應選擇哪種寫法？',
      hint: '比較兩個工具如何使用指定的鍵名。',
      options: [
        {
          id: 'A',
          label: 'Omit<T, K> 保留 K 指定的欄位',
        },
        {
          id: 'B',
          label: 'Pick<T, K> 保留 K 指定的欄位',
        },
        {
          id: 'C',
          label: 'Partial<T> 只保留必填欄位',
        },
        {
          id: 'D',
          label: 'Required<T> 只保留選填欄位',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'Pick 取出指定欄位；Omit 排除指定欄位。Partial 與 Required 調整是否必填，不會用來選擇欄位。',
      id: 'day-20-01',
    },
    {
      number: 2,
      kind: 'choice',
      learningGoal: '判斷 Required 產生的欄位要求',
      prompt: 'ReadyInput 的欄位要求是什麼？',
      hint: '查看來源的選填符號，再判斷工具如何改變它。',
      options: [
        {
          id: 'A',
          label: 'prompt 與 answer 都可省略',
        },
        {
          id: 'B',
          label: 'prompt 與 answer 都必填，型別維持 string',
        },
        {
          id: 'C',
          label: 'prompt 必填，answer 可省略',
        },
        {
          id: 'D',
          label: 'prompt 與 answer 都會自動取得空字串',
        },
      ],
      correctAnswer: 'B',
      explanation:
        'Required 移除選填設定，兩個欄位都必須提供；值型別仍是 string，工具不會補上預設值。',
      code: 'interface FormInput {\n  prompt?: string;\n  answer?: string;\n}\n\ntype ReadyInput = Required<FormInput>;',
      id: 'day-20-02',
    },
    {
      number: 3,
      kind: 'choice',
      learningGoal: '辨識固定鍵名對應表缺少欄位',
      prompt: '以下程式無法通過型別檢查，原因是什麼？',
      hint: 'Record 的第一個型別參數列出哪些鍵？',
      options: [
        {
          id: 'A',
          label: 'string 不能用來當作 Record 的值型別',
        },
        {
          id: 'B',
          label: 'choice 的值必須是布林值',
        },
        {
          id: 'C',
          label: '缺少 QuestionType 要求的 fill 欄位',
        },
        {
          id: 'D',
          label: 'Record 只能接收任意字串鍵，不能接收聯集',
        },
      ],
      correctAnswer: 'C',
      explanation:
        'Record<QuestionType, string> 要求 choice 與 fill 都有字串欄位。物件只有 choice，因此缺少 fill。',
      code: 'type QuestionType = "choice" | "fill";\n\nconst labels: Record<QuestionType, string> = {\n  choice: "選擇題",\n};',
      id: 'day-20-03',
    },
    {
      number: 4,
      kind: 'exact-text',
      learningGoal: '選擇限制欄位重新指定的工具型別',
      prompt: '要讓來源物件型別的所有欄位變成唯讀，應使用哪個工具型別？只填名稱，保留大小寫。',
      hint: '這個工具限制透過該型別重新指定欄位。',
      acceptedAnswers: ['Readonly'],
      explanation: 'Readonly<T> 將來源型別的所有欄位設為唯讀，限制透過該型別重新指定欄位。',
      id: 'day-20-04',
    },
    {
      number: 5,
      kind: 'code-fill',
      learningGoal: '組合 ReturnType 與 Awaited 取得非同步結果型別',
      prompt: '補上工具型別，讓 LoadedQuestion 表示 await loadQuestion() 的結果型別。',
      hint: 'ReturnType 取得的型別仍包含 Promise，需要取得 await 後的型別。',
      acceptedAnswers: ['Awaited'],
      explanation: 'ReturnType 取得函式回傳的 Promise 型別；Awaited 取得 await 後的資料型別。',
      code: 'async function loadQuestion() {\n  return { id: "q20", prompt: "哪個工具取得回傳型別？" };\n}\n\ntype LoadPromise = ReturnType<typeof loadQuestion>;\ntype LoadedQuestion = ____<LoadPromise>;',
      id: 'day-20-05',
    },
  ],
};
