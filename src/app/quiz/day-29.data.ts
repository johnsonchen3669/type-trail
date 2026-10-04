import { QuizDefinition } from './quiz.models';

export const dayTwentyNineQuiz: QuizDefinition = {
  id: 'day-29',
  day: 29,
  title: '工具呼叫：讓 AI 透過程式完成操作',
  estimatedMinutes: 12,
  questions: [
    {
      number: 1,
      kind: 'choice',
      learningGoal: '理解工具呼叫的執行責任',
      prompt: '模型回傳 get_question 的名稱與參數後，查詢題庫的操作由誰執行？',
      hint: '分開看提出要求與實際存取資料的責任。',
      options: [
        {
          id: 'A',
          label: '模型在產生參數時已完成查詢',
        },
        {
          id: 'B',
          label: '應用程式檢查要求後，呼叫對應的工具函式',
        },
        {
          id: 'C',
          label: '參數 Schema 會自行查詢資料庫',
        },
        {
          id: 'D',
          label: '呼叫識別碼會自動啟動查詢',
        },
      ],
      correctAnswer: 'B',
      explanation: '模型提出工具呼叫要求；應用程式負責分派工具、檢查輸入與權限，再執行函式。',
      id: 'day-29-01',
    },
    {
      number: 2,
      kind: 'choice',
      learningGoal: '判斷工具查詢的失敗結果',
      prompt: '沿用文章的 executeGetQuestion，題庫只有 q29。以下呼叫會回傳哪個狀態？',
      hint: '先檢查輸入格式，再檢查權限與題目是否存在。',
      options: [
        {
          id: 'A',
          label: 'found',
        },
        {
          id: 'B',
          label: 'invalid_input',
        },
        {
          id: 'C',
          label: 'forbidden',
        },
        {
          id: 'D',
          label: 'not_found',
        },
      ],
      correctAnswer: 'D',
      explanation:
        'q99 是非空字串，輸入符合規則；使用者有權限，但題庫沒有這個編號，因此回傳 not_found。',
      code: 'const result = executeGetQuestion(\n  { questionId: "q99" },\n  { canReadQuestions: true },\n);',
      id: 'day-29-02',
    },
    {
      number: 3,
      kind: 'choice',
      learningGoal: '辨識權限資訊不能由模型自行提供',
      prompt: '以下是工具入口的片段，modelArguments 是收到的模型參數。把其中的權限交給執行函式，主要問題是什麼？',
      hint: '檢查權限的來源是否可信。',
      options: [
        {
          id: 'A',
          label: '模型可以自行宣稱有讀取權限',
        },
        {
          id: 'B',
          label: '布林值不能出現在函式參數',
        },
        {
          id: 'C',
          label: '工具結果必須是字串',
        },
        {
          id: 'D',
          label: '工具名稱不能包含底線',
        },
      ],
      correctAnswer: 'A',
      explanation:
        '權限應來自已驗證的登入資訊。把模型參數當成權限來源，會讓模型自行決定能否讀取資料。',
      code: 'const ModelInput = z.object({\n  questionId: z.string(),\n  canReadQuestions: z.boolean(),\n});\n\nconst input = ModelInput.parse(modelArguments);\nexecuteGetQuestion(\n  { questionId: input.questionId },\n  { canReadQuestions: input.canReadQuestions },\n);',
      id: 'day-29-03',
    },
    {
      number: 4,
      kind: 'exact-text',
      learningGoal: '辨識工具入口的輸入失敗狀態',
      prompt:
        '依文章的 executeGetQuestion，questionId 傳入數字時會回傳哪個 status？只填狀態字串，不加引號。',
      hint: '查看輸入 Schema 與第一個失敗分支。',
      acceptedAnswers: ['invalid_input'],
      explanation: '參數 Schema 要求 questionId 是字串，數字不符合規則，工具回傳 invalid_input。',
      id: 'day-29-04',
    },
    {
      number: 5,
      kind: 'code-fill',
      learningGoal: '依工具結果狀態安全讀取資料',
      prompt:
        '補上成功狀態字串，讓分支內可以讀取 result.question。沿用文章的 ToolResult，請使用雙引號。',
      hint: '只有帶有題目資料的分支可以讀取 question。',
      acceptedAnswers: ['"found"'],
      explanation:
        'found 分支具有 question 欄位。先判斷狀態，再使用題目資料，其他失敗分支不會進入這段程式。',
      code: 'function showToolResult(result: ToolResult): void {\n  if (result.status === ____) {\n    console.log(result.question.prompt);\n  }\n}',
      id: 'day-29-05',
    },
  ],
};
