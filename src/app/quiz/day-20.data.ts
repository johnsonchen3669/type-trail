import { QuizDefinition } from './quiz.models';

export const dayTwentyQuiz: QuizDefinition = {
  id: 'day-20',
  day: 20,
  title: 'Utility Types：從既有型別產生新型別',
  estimatedMinutes: 12,
  questions: [
    {
      id: 'day-20-01',
      number: 1,
      kind: 'choice',
      learningGoal: '理解 Pick 只保留指定欄位',
      prompt: '以下型別的物件必須包含哪些欄位？',
      hint: '查看 Pick 後方列出的鍵名。',
      code: `interface Question {
  id: string;
  prompt: string;
  type: "choice" | "fill";
  answer: string;
}

type Preview = Pick<Question, "id" | "prompt">;`,
      options: [
        { id: 'A', label: '只有 id 與 prompt' },
        { id: 'B', label: 'id、prompt、type 與 answer' },
        { id: 'C', label: '只有 type 與 answer' },
        { id: 'D', label: '任意字串鍵' },
      ],
      correctAnswer: 'A',
      explanation:
        'Pick<Question, "id" | "prompt"> 只取出列出的兩個欄位，其他欄位不在 Preview 中。',
    },
    {
      id: 'day-20-02',
      number: 2,
      kind: 'choice',
      learningGoal: '區分 Omit 與執行期欄位刪除',
      prompt: 'type NewQuestion = Omit<Question, "id"> 最準確的意思是什麼？',
      hint: '這是型別層的欄位集合變化，不是執行時的物件操作。',
      options: [
        { id: 'A', label: '執行時會從所有 Question 物件刪除 id' },
        { id: 'B', label: 'NewQuestion 保留 Question 除 id 以外的欄位' },
        { id: 'C', label: 'NewQuestion 的每個欄位都會變成可選' },
        { id: 'D', label: 'NewQuestion 只能包含 id' },
      ],
      correctAnswer: 'B',
      explanation: 'Omit 從既有型別排除指定鍵，並不會改變執行期物件，也不會自動改變欄位是否必填。',
    },
    {
      id: 'day-20-03',
      number: 3,
      kind: 'choice',
      learningGoal: '理解 Partial 允許空物件但不代表業務規則接受',
      prompt: '以下程式中，第二次呼叫為什麼可以通過型別檢查？',
      hint: 'Partial 如何改變 Question 的每個欄位？',
      code: `function updateQuestion(
  id: string,
  patch: Partial<Question>,
) {
  return { id, ...patch };
}

updateQuestion("q20", {});`,
      options: [
        { id: 'A', label: 'Partial 把所有欄位變成可選；是否允許空更新仍是函式的業務規則' },
        { id: 'B', label: 'Partial 會自動補上缺少欄位的預設值' },
        { id: 'C', label: 'Partial 會在執行期驗證 id' },
        { id: 'D', label: 'Partial 會把所有欄位改成 string' },
      ],
      correctAnswer: 'A',
      explanation:
        'Partial<Question> 使每個欄位都可省略，所以 {} 符合型別；它不會補值，也不會替函式實作業務驗證。',
    },
    {
      id: 'day-20-04',
      number: 4,
      kind: 'choice',
      learningGoal: '理解 Record 與 Readonly 在固定鍵表中的責任',
      prompt: '以下宣告中，Record<QuestionType, string> 主要保證什麼？',
      hint: '分開看 Record 的鍵和值，以及 Readonly 的限制。',
      code: `type QuestionType = "choice" | "fill";

const labels: Readonly<Record<QuestionType, string>> = {
  choice: "選擇題",
  fill: "填空題",
};`,
      options: [
        { id: 'A', label: '允許任意字串鍵，並在執行期凍結物件' },
        { id: 'B', label: '要求 choice 與 fill 都有字串值；Readonly 只提供編譯期重新指定限制' },
        { id: 'C', label: '會驗證 API 回傳的標籤內容' },
        { id: 'D', label: '會讓巢狀物件遞迴變成唯讀' },
      ],
      correctAnswer: 'B',
      explanation:
        'Record 依 QuestionType 建立固定鍵，值型別是 string；Readonly 是型別層的淺層限制，不等於執行期凍結或資料驗證。',
    },
    {
      id: 'day-20-05',
      number: 5,
      kind: 'code-fill',
      learningGoal: '組合 ReturnType 與 Awaited 取得非同步結果型別',
      prompt: '請補上工具型別，讓 LoadedQuestion 表示 loadQuestion 完成後的 Question。',
      hint: 'LoadPromise 還包著 Promise，要取得 await 後的型別。',
      code: `declare function loadQuestion(id: string): Promise<Question>;

type LoadPromise = ReturnType<typeof loadQuestion>;
type LoadedQuestion = ____<LoadPromise>;`,
      acceptedAnswers: ['Awaited'],
      explanation:
        'ReturnType 先取得 Promise<Question>，Awaited<LoadPromise> 再拆開 Promise，因此 LoadedQuestion 是 Question。',
    },
  ],
};
