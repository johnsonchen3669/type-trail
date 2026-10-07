import { QuizDefinition } from './quiz.models';

export const dayTwentyFourQuiz: QuizDefinition = {
  id: 'day-24',
  day: 24,
  title: 'API 型別設計：一份題目需要幾種資料？',
  estimatedMinutes: 12,
  questions: [
    {
      id: 'day-24-01',
      number: 1,
      kind: 'choice',
      learningGoal: '根據建立、保存與回應的用途分開資料契約',
      prompt: '管理者建立題目、伺服器保存資料、作答者讀題時，哪種設計最符合各處的欄位需求？',
      hint: '先看誰產生編號，以及誰可以知道答案。',
      options: [
        { id: 'A', label: '共用一份所有欄位都可選的 Question，讓各處自行決定要填什麼' },
        { id: 'B', label: '分別定義建立請求、內部實體與回應 DTO，讓每份資料只包含該處需要的欄位' },
        { id: 'C', label: '直接把內部實體回傳給作答者，由前端自行忽略答案' },
        { id: 'D', label: '只定義回應 DTO，再拿它當作建立請求與保存資料' },
      ],
      correctAnswer: 'B',
      explanation: '建立請求不需要伺服器產生的編號，內部實體保存答案，回應給作答者時要省略答案。三處的欄位契約應分開描述。',
    },
    {
      id: 'day-24-02',
      number: 2,
      kind: 'choice',
      learningGoal: '判斷內部日期與 API 回應日期的型別差異',
      prompt: '以下只列出相關欄位。這段指派在 TypeScript 編譯期會發生什麼事？',
      hint: '比較兩個型別的 createdAt，不要只看欄位名稱。',
      code: `type QuestionEntity = { createdAt: Date; answer: string };
type QuestionResponseDto = { createdAt: string };

function prepareResponse(question: QuestionEntity): QuestionResponseDto {
  const response: QuestionResponseDto = question;
  return response;
}`,
      options: [
        { id: 'A', label: '通過；兩個型別都有 createdAt 欄位' },
        { id: 'B', label: '報錯；內部的 createdAt 是 Date，回應要求 string' },
        { id: 'C', label: '報錯；內部實體多出 answer 欄位' },
        { id: 'D', label: '通過；TypeScript 會自動轉換日期並移除答案' },
      ],
      correctAnswer: 'B',
      explanation: '回應 DTO 要求 createdAt: string，不能直接用內部的 Date。映射函式需要建立新物件並明確轉換日期；多出的欄位也不會因型別標註而在執行時消失。',
    },
    {
      id: 'day-24-03',
      number: 3,
      kind: 'choice',
      learningGoal: '辨識直接以 Partial 製作更新請求的風險',
      prompt: '這次操作只允許修改題目文字。下列更新型別留下什麼問題？',
      hint: 'Partial 會改變選填狀態，會移除不允許修改的欄位嗎？',
      code: `interface QuestionEntity {
  id: string;
  prompt: string;
  answer: string;
  createdAt: Date;
}

type UpdateQuestionInput = Partial<QuestionEntity>;

const update: UpdateQuestionInput = {
  id: "another-id",
};`,
      options: [
        { id: 'A', label: 'Partial 會強制同時提供所有建立欄位' },
        { id: 'B', label: '連系統產生的 id 也可以傳入，超出這次操作的需求' },
        { id: 'C', label: 'Partial 會把 id 的型別轉成 number' },
        { id: 'D', label: 'TypeScript 會自動忽略 id，只更新 prompt' },
      ],
      correctAnswer: 'B',
      explanation: 'Partial<QuestionEntity> 保留所有欄位，只將它們改成選填。只允許修改題目文字時，應定義只含 prompt 的更新型別。',
    },
    {
      id: 'day-24-04',
      number: 4,
      kind: 'exact-text',
      learningGoal: '判斷內部實體與回應資料的欄位差異',
      prompt: '本文的題目實體中，哪個欄位不應回傳給作答者？請填欄位名稱。',
      hint: '找出保存答案的欄位。',
      acceptedAnswers: ['answer'],
      explanation: 'answer 保存答案。回應 DTO 保留作答者需要的題目文字，答案留在伺服器內。',
    },
    {
      id: 'day-24-05',
      number: 5,
      kind: 'code-fill',
      learningGoal: '在回應映射中將日期轉為字串',
      prompt: '回應 DTO 的 createdAt 要是字串。依本文做法，填入 Date 的方法名稱，不含括號。',
      hint: '回看映射函式如何處理內部的 Date，只填方法名稱。',
      code: `function toQuestionResponseDto(question: QuestionEntity): QuestionResponseDto {
  return {
    id: question.id,
    prompt: question.prompt,
    createdAt: question.createdAt.____(),
  };
}`,
      acceptedAnswers: ['toISOString'],
      explanation: 'toISOString() 會把有效的 Date 轉成字串，讓回應符合 createdAt: string 的契約。轉換函式也明確列出對外傳送的欄位。',
    },
  ],
};
