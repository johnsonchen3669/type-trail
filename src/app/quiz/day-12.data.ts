import { QuizDefinition } from './quiz.models';

export const dayTwelveQuiz: QuizDefinition = {
  id: 'day-12',
  day: 12,
  title: '可辨識聯集：一個欄位決定要帶哪些資料',
  estimatedMinutes: 12,
  questions: [
    {
      id: 'day-12-01',
      number: 1,
      kind: 'choice',
      learningGoal: '理解可辨識聯集與多個獨立布林值的差異',
      prompt: '為什麼下面的 QuestionViewFlags 可能產生不符合畫面需求的狀態？',
      hint: '把三個欄位分開看，想想它們是否能同時為 true。',
      code: 'type QuestionViewFlags = {\n  isLoading: boolean;\n  hasQuestion: boolean;\n  hasError: boolean;\n};',
      options: [
        { id: 'A', label: '三個欄位都必填，所以無法表示尚未載入的畫面' },
        { id: 'B', label: '三個布林值彼此獨立，會接受同時載入中、有題目與發生錯誤的組合' },
        { id: 'C', label: '畫面先檢查 isLoading，就能讓矛盾組合在型別檢查時被拒絕' },
        { id: 'D', label: '把三個欄位設成 readonly，就能限制同時只有一個為 true' },
      ],
      correctAnswer: 'B',
      explanation:
        '每個布林值都可以獨立為 true 或 false，型別沒有表達狀態之間的互斥關係，因此會接受三者同時為 true。可辨識聯集用不同的 status 值，把狀態和所需欄位放在同一個分支。',
    },
    {
      id: 'day-12-02',
      number: 2,
      kind: 'choice',
      learningGoal: '依判別欄位縮小型別並讀取對應欄位',
      prompt: '執行以下 TypeScript 程式，describeQuestion 會回傳什麼？',
      hint: '先看 type 是否符合 if 條件，再計算實際執行分支用到的長度。',
      code: 'type Question =\n  | { type: "choice"; prompt: string; options: readonly string[] }\n  | { type: "fill"; prompt: string; answer: string };\n\nfunction describeQuestion(question: Question): string {\n  if (question.type === "choice") {\n    return `選擇題，共 ${question.options.length} 個選項`;\n  }\n\n  return `填空題，答案長度是 ${question.answer.length}`;\n}\n\ndescribeQuestion({\n  type: "fill",\n  prompt: "哪個關鍵字用來宣告常數？",\n  answer: "const",\n});',
      options: [
        { id: 'A', label: '選擇題，共 1 個選項' },
        { id: 'B', label: '填空題，答案長度是 5' },
        { id: 'C', label: '填空題，答案長度是 4' },
        { id: 'D', label: '編譯期錯誤，因為 question 可能是選擇題' },
      ],
      correctAnswer: 'B',
      explanation:
        '物件的 type 是 "fill"，因此略過選擇題分支。answer 是 "const"，長度為 5，回傳「填空題，答案長度是 5」。',
    },
    {
      id: 'day-12-03',
      number: 3,
      kind: 'choice',
      learningGoal: '辨識只限制狀態值、卻沒有綁定其他欄位的模型缺陷',
      prompt: '以下模型的主要問題是什麼？',
      hint: '檢查 status 的值和其他兩個欄位是否有被型別綁在一起。',
      code: 'type LooseState = {\n  status: "idle" | "loading" | "success" | "error";\n  data?: readonly string[];\n  error?: Error;\n};\n\nconst state: LooseState = {\n  status: "success",\n  error: new Error("載入失敗"),\n};',
      options: [
        { id: 'A', label: 'status 列出四種字面值，就會要求 success 一定搭配 data' },
        { id: 'B', label: 'data? 會讓 TypeScript 拒絕缺少資料的成功狀態' },
        { id: 'C', label: 'status、data、error 各自宣告，模型仍允許 success 沒有 data 或同時有 error' },
        { id: 'D', label: 'error? 會禁止錯誤資訊出現在成功狀態' },
      ],
      correctAnswer: 'C',
      explanation:
        '這個模型限制了 status 的值，卻沒有把每個狀態拆成不同的物件形式，因此 status: "success" 可以和 error 組合，也可以缺少 data。可辨識聯集會將 success 與 data、error 與錯誤資料分別放在不同分支。',
    },
    {
      id: 'day-12-04',
      number: 4,
      kind: 'exact-text',
      learningGoal: '辨識 RequestState 中用來區分聯集分支的欄位',
      prompt: '在下列 RequestState 中，哪個欄位用來區分狀態？只輸入欄位名稱。',
      hint: '找出每個分支都有、但值各不相同的欄位。',
      code: 'type RequestState =\n  | { status: "idle" }\n  | { status: "loading" }\n  | { status: "success"; data: readonly string[] }\n  | { status: "error"; error: Error };',
      acceptedAnswers: ['status'],
      explanation:
        '每個分支都有 status，分別使用 "idle"、"loading"、"success" 與 "error"。程式檢查 state.status 時，TypeScript 可以據此縮小型別。',
    },
    {
      id: 'day-12-05',
      number: 5,
      kind: 'code-fill',
      learningGoal: '讓判別欄位的值對應到選擇題的專屬欄位',
      prompt: '請填入引號內的題型值，讓函式在選擇題分支讀取 options。只輸入字串內容，不含引號。',
      hint: '找出宣告了 options 的分支，再看它的 type 值。',
      code: 'type Question =\n  | { type: "choice"; options: readonly string[] }\n  | { type: "fill"; answer: string };\n\nfunction choiceCount(question: Question): number {\n  if (question.type === "____") {\n    return question.options.length;\n  }\n\n  return 0;\n}',
      acceptedAnswers: ['choice'],
      explanation:
        '選擇題分支的 type 是 "choice"，補上後，TypeScript 才能在 if 中把 question 縮小成具有 options 的分支。',
    },
  ],
};
