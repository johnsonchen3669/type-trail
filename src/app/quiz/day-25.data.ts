import { QuizDefinition } from './quiz.models';

export const dayTwentyFiveQuiz: QuizDefinition = {
  id: 'day-25',
  day: 25,
  title: '錯誤也是型別：讓判分失敗有明確結果',
  estimatedMinutes: 12,
  questions: [
    {
      id: 'day-25-01',
      number: 1,
      kind: 'choice',
      learningGoal: '區分答錯與判分失敗',
      prompt:
        '使用者選了有效選項，但答案不正確；另一筆作答的題目已不存在。哪個描述符合本文的結果契約？',
      hint: '判分有沒有完成，是判斷這兩種情況的起點。',
      options: [
        {
          id: 'A',
          label: '兩者都回傳 correct: false',
        },
        {
          id: 'B',
          label: '答錯回傳 ok: true, correct: false；找不到題目回傳失敗代碼',
        },
        {
          id: 'C',
          label: '兩者都回傳 null',
        },
        {
          id: 'D',
          label: '找不到題目回傳 ok: true, correct: false',
        },
      ],
      correctAnswer: 'B',
      explanation:
        '有效選項已完成判分，答錯仍是成功的判分結果；題目不存在時無法判分，應回傳明確失敗。',
    },
    {
      id: 'day-25-02',
      number: 2,
      kind: 'choice',
      learningGoal: '依結果聯集辨識可用欄位',
      prompt: '以下 result.ok 為 false。TypeScript 在 else 分支允許直接讀取哪個欄位？',
      hint: 'ok 會把結果縮小到哪個分支？',
      code: 'type GradeResult =\n  | { ok: true; correct: boolean }\n  | { ok: false; error: { code: "INVALID_OPTION" } };\n\nfunction show(result: GradeResult) {\n  if (result.ok) return result.correct;\n  return result.____;\n}',
      options: [
        {
          id: 'A',
          label: 'correct',
        },
        {
          id: 'B',
          label: 'error.code',
        },
        {
          id: 'C',
          label: 'options.length',
        },
        {
          id: 'D',
          label: 'message',
        },
      ],
      correctAnswer: 'B',
      explanation: 'ok: false 分支有 error.code；correct 只存在於成功分支。',
    },
    {
      id: 'day-25-03',
      number: 3,
      kind: 'choice',
      learningGoal: '辨識 null 無法表達失敗原因',
      prompt: '下列函式可能因題目不存在、選項無效而回傳 null。呼叫端最直接遇到什麼問題？',
      hint: '呼叫端只拿到 null，能否知道下一步該顯示什麼？',
      code: 'function gradeAnswer(answer: AnswerInput): boolean | null {\n  // 題目不存在或選項無效時都回傳 null\n  return null;\n}',
      options: [
        {
          id: 'A',
          label: 'TypeScript 會自動替 null 補上錯誤代碼',
        },
        {
          id: 'B',
          label: '呼叫端無法從 null 區分兩種失敗',
        },
        {
          id: 'C',
          label: 'null 一定會使 TypeScript 編譯失敗',
        },
        {
          id: 'D',
          label: 'boolean 無法表示答對或答錯',
        },
      ],
      correctAnswer: 'B',
      explanation: '兩種失敗共用 null，呼叫端無法選擇不同處理方式；結果聯集可提供不同錯誤代碼。',
    },
    {
      id: 'day-25-04',
      number: 4,
      kind: 'exact-text',
      learningGoal: '辨識題目不存在的錯誤代碼',
      prompt: '本文判分結果中，題目編號找不到時使用哪個錯誤代碼？',
      hint: '看失敗分支中代表「無法取得題目」的穩定值。',
      acceptedAnswers: ['QUESTION_NOT_FOUND'],
      explanation: 'QUESTION_NOT_FOUND 讓呼叫端辨識題目不存在，無需解析訊息文字。',
    },
    {
      id: 'day-25-05',
      number: 5,
      kind: 'code-fill',
      learningGoal: '對選項索引執行整數檢查',
      prompt: '依本文做法，補上檢查選項位置是否為整數的方法名稱，不含括號。',
      hint: 'number 型別仍可能包含非整數。',
      code: 'if (!Number.____(answer.optionIndex)) {\n  return { ok: false, error: { code: "INVALID_OPTION", message: "選項位置無效" } };\n}',
      acceptedAnswers: ['isInteger'],
      explanation: 'Number.isInteger 在執行時檢查值是否為整數；仍需另外檢查它是否落在選項範圍內。',
    },
  ],
};
