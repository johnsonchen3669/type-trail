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
      learningGoal: '根據建立、判分與回應的用途分開資料契約',
      prompt: '管理者建立題目、伺服器判分、作答者讀題時，哪種設計最符合各處的欄位需求？',
      hint: '先看誰產生編號，以及誰可以知道正確選項。',
      options: [
        { id: 'A', label: '共用一份所有欄位都可選的 Question，讓各處自行決定要填什麼' },
        { id: 'B', label: '分別定義建立請求、內部實體與回應 DTO，讓每份資料只包含該處需要的欄位' },
        { id: 'C', label: '直接把內部實體回傳給作答者，由前端自行忽略正確選項' },
        { id: 'D', label: '只定義回應 DTO，再拿它當作建立請求與判分資料' },
      ],
      correctAnswer: 'B',
      explanation: '建立請求不需要伺服器產生的編號，內部實體需要正確選項來判分，回應給作答者時要省略正確選項。三處的欄位契約應分開描述。',
    },
    {
      id: 'day-24-02',
      number: 2,
      kind: 'choice',
      learningGoal: '判斷內部日期與 API 回應日期的型別差異',
      prompt: '以下只列出相關欄位。這段指派在 TypeScript 編譯期會發生什麼事？',
      hint: '比較兩個型別的 createdAt，不要只看欄位名稱。',
      code: `type QuestionEntity = { createdAt: Date; correctOptionIndex: number };
type QuestionResponseDto = { createdAt: string };

function prepareResponse(question: QuestionEntity): QuestionResponseDto {
  const response: QuestionResponseDto = question;
  return response;
}`,
      options: [
        { id: 'A', label: '通過；兩個型別都有 createdAt 欄位' },
        { id: 'B', label: '報錯；內部的 createdAt 是 Date，回應要求 string' },
        { id: 'C', label: '報錯；內部實體多出 correctOptionIndex 欄位' },
        { id: 'D', label: '通過；TypeScript 會自動轉換日期並移除正確選項' },
      ],
      correctAnswer: 'B',
      explanation: '回應 DTO 要求 createdAt: string，不能直接用內部的 Date。映射函式需要建立新物件並明確轉換日期；多出的欄位也不會因型別標註而在執行時消失。',
    },
    {
      id: 'day-24-03',
      number: 3,
      kind: 'choice',
      learningGoal: '辨識直接以 Partial 製作更新請求的風險',
      prompt: '更新題目的選項與正確位置必須保持對應。下列更新型別留下什麼問題？',
      hint: 'Partial 會讓哪些欄位可以個別省略？',
      code: `interface CreateQuestionInput {
  prompt: string;
  options: string[];
  correctOptionIndex: number;
}

type UpdateQuestionInput = Partial<CreateQuestionInput>;

const update: UpdateQuestionInput = {
  options: ["新的 A", "新的 B"],
};`,
      options: [
        { id: 'A', label: 'Partial 會強制同時提供所有建立欄位' },
        { id: 'B', label: '可以只更新選項，卻沒要求同時更新正確選項位置' },
        { id: 'C', label: 'Partial 會把選項陣列轉成字串' },
        { id: 'D', label: 'TypeScript 會自動檢查正確位置是否在新選項範圍內' },
      ],
      correctAnswer: 'B',
      explanation: 'Partial<CreateQuestionInput> 讓 options 和 correctOptionIndex 各自可省略，無法要求它們成對更新。應依更新操作的需求定義欄位，並在執行時驗證索引範圍。',
    },
    {
      id: 'day-24-04',
      number: 4,
      kind: 'exact-text',
      learningGoal: '辨識 API 對外資料格式的名稱',
      prompt: '本文將 API 與使用端約定的資料傳輸物件縮寫為哪三個英文字母？',
      hint: '回看回應資料那一節首次介紹的術語。',
      acceptedAnswers: ['DTO', 'dto', 'Dto'],
      explanation: 'DTO 是資料傳輸物件的縮寫；本文的回應 DTO 只包含作答畫面需要的欄位。',
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
    options: question.options,
    createdAt: question.createdAt.____(),
  };
}`,
      acceptedAnswers: ['toISOString'],
      explanation: 'toISOString() 會把有效的 Date 轉成字串，讓回應符合 createdAt: string 的契約。回應仍須明確挑出可對外傳送的欄位。',
    },
  ],
};
