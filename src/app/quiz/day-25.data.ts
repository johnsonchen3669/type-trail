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
        '題目存在，但使用者填的答案不正確；另一筆作答的題目已不存在。哪個描述符合本文的結果契約？',
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
        '題目存在時可以完成判分，答錯仍是成功的判分結果；題目不存在時無法判分，應回傳明確失敗。',
    },
    {
      id: 'day-25-02',
      number: 2,
      kind: 'choice',
      learningGoal: '判斷拋出錯誤後的執行流程',
      prompt: '使用本文的 gradeOrThrow，題目陣列是空的。這段程式依序印出什麼？',
      hint: '發生 throw 後，程式會跳到哪裡？離開 catch 後還有哪些程式？',
      code: 'const questions: QuestionEntity[] = [];\n\ntry {\n  gradeOrThrow({ questionId: "q25", answer: "const" }, questions);\n  console.log("完成");\n} catch (error) {\n  console.log("失敗");\n}\n\nconsole.log("結束");',
      options: [
        {
          id: 'A',
          label: '完成、結束',
        },
        {
          id: 'B',
          label: '失敗、結束',
        },
        {
          id: 'C',
          label: '完成、失敗、結束',
        },
        {
          id: 'D',
          label: '只有失敗',
        },
      ],
      correctAnswer: 'B',
      explanation:
        '找不到題目時，gradeOrThrow 拋出錯誤，跳過「完成」並進入 catch 印出「失敗」。這裡的 catch 沒有再次拋出錯誤，因此後面繼續印出「結束」。',
    },
    {
      id: 'day-25-03',
      number: 3,
      kind: 'choice',
      learningGoal: '辨識 null 無法表達失敗原因',
      prompt:
        '某個判分函式在題目不存在或題目尚未開放作答時，都回傳 null。只看下面的回傳型別，呼叫端會遇到什麼問題？',
      hint: '呼叫端只拿到 null，能否知道下一步該顯示什麼？',
      code: 'type GradeFunction = (questionId: string, answer: string) => boolean | null;',
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
      learningGoal: '建立結果型別中的失敗分支',
      prompt: '使用本文的 GradeResult，補上找不到題目時的 ok 值。',
      hint: '這次判分是否已經完成？應回傳哪一種分支？',
      code: 'if (!question) {\n  return {\n    ok: ____,\n    error: { code: "QUESTION_NOT_FOUND", message: "找不到這道題目" },\n  };\n}',
      acceptedAnswers: ['false'],
      explanation: '失敗分支使用 ok: false，並提供錯誤資訊，讓呼叫端先判斷分支再讀取原因。',
    },
  ],
};
