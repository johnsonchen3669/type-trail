import { QuizDefinition } from './quiz.models';

export const dayTwelveQuiz: QuizDefinition = {
  id: 'day-12',
  day: 12,
  title: 'Discriminated Union：不要用三個 Boolean 表達狀態',
  estimatedMinutes: 12,
  questions: [
    {
      id: 'day-12-01',
      number: 1,
      kind: 'choice',
      learningGoal: '理解 Discriminated Union 與多個獨立 Boolean 的差異',
      prompt: '為什麼下面的 QuestionViewFlags 可能產生不符合畫面需求的狀態？',
      hint: '把三個欄位分開看，再想想它們是否能同時為 true。',
      code: 'type QuestionViewFlags = {\n  isLoading: boolean;\n  hasQuestion: boolean;\n  hasError: boolean;\n};',
      options: [
        { id: 'A', label: 'Boolean 不能用來描述畫面狀態' },
        { id: 'B', label: '三個 Boolean 彼此獨立，會接受同時 loading、有題目與發生錯誤的組合' },
        { id: 'C', label: '只有 status 才能在 JavaScript Runtime 存取' },
        { id: 'D', label: 'TypeScript 會把三個 Boolean 自動合併成一個字串' },
      ],
      correctAnswer: 'B',
      explanation:
        '每一個 Boolean 都可以獨立為 true 或 false，型別沒有表達三種狀態彼此互斥，因此會接受同時為 true 的矛盾組合。使用帶有不同 literal status 的 union，才能把狀態和欄位關係放在一起。',
    },
    {
      id: 'day-12-02',
      number: 2,
      kind: 'choice',
      learningGoal: '根據 discriminant narrowing 到對應的 object shape',
      prompt: '執行以下 TypeScript 程式，describeQuestion 會回傳什麼？',
      hint: '先看 type 的值決定哪個分支，再計算該分支的 options.length。',
      code: 'type Question =\n  | { type: "choice"; prompt: string; options: readonly string[] }\n  | { type: "fill"; prompt: string; answer: string };\n\nfunction describeQuestion(question: Question): string {\n  if (question.type === "choice") {\n    return `選擇題，共 ${question.options.length} 個選項`;\n  }\n\n  return `填空題，答案長度是 ${question.answer.length}`;\n}\n\ndescribeQuestion({\n  type: "choice",\n  prompt: "哪個關鍵字用來匯出？",\n  options: ["export", "import"],\n});',
      options: [
        { id: 'A', label: '選擇題，共 1 個選項' },
        { id: 'B', label: '選擇題，共 2 個選項' },
        { id: 'C', label: '填空題，答案長度是 2' },
        { id: 'D', label: '編譯期錯誤，因為 question 可能是填空題' },
      ],
      correctAnswer: 'B',
      explanation:
        '物件的 type 是 "choice"，因此進入第一個分支。options 有 "export" 與 "import" 兩個元素，length 是 2，回傳「選擇題，共 2 個選項」。',
    },
    {
      id: 'day-12-03',
      number: 3,
      kind: 'choice',
      learningGoal: '辨識只限制 discriminant 值、卻沒有綁定其他欄位的模型缺陷',
      prompt: '以下模型的主要問題是什麼？',
      hint: '檢查 status 的值和其他兩個 property 是否有被型別綁在一起。',
      code: 'type RequestState<T> = {\n  status: "idle" | "loading" | "success" | "error";\n  data?: T;\n  error?: Error;\n};\n\nconst state: RequestState<string[]> = {\n  status: "success",\n  error: new Error("載入失敗"),\n};',
      options: [
        { id: 'A', label: 'status 不能使用四個字串 literal' },
        { id: 'B', label: 'string[] 不能作為 RequestState 的資料型別' },
        { id: 'C', label: 'status、data、error 各自宣告，模型仍允許 success 沒有 data 或同時有 error' },
        { id: 'D', label: 'optional property 一律會在 Runtime 被 TypeScript 移除' },
      ],
      correctAnswer: 'C',
      explanation:
        '這個模型雖然限制了 status 的文字值，但沒有把每個狀態拆成不同 object shape，因此 status: "success" 仍可和 error 組合，且可以缺少 data。Discriminated Union 應將 success 與 data、error 與錯誤資料分別放在不同 union member。',
    },
    {
      id: 'day-12-04',
      number: 4,
      kind: 'exact-text',
      learningGoal: '辨識 RequestState<T> 中用來區分 union member 的 property',
      prompt: '在文章的 RequestState<T> 中，哪一個 property 是 discriminant？只輸入 property 名稱。',
      hint: '找出每個 object shape 都有、但 literal 值各不相同的 property。',
      code: 'type RequestState<T> =\n  | { status: "idle" }\n  | { status: "loading" }\n  | { status: "success"; data: T }\n  | { status: "error"; error: Error };',
      acceptedAnswers: ['status'],
      explanation:
        '每個 union member 都有 status，但分別使用 "idle"、"loading"、"success" 與 "error"。程式檢查 state.status 時，TypeScript 可以據此 narrowing 到對應的 object shape。',
    },
    {
      id: 'day-12-05',
      number: 5,
      kind: 'code-fill',
      learningGoal: '用 discriminant 判斷後安全讀取特定 union member 的 property',
      prompt: '請補上一行判斷式，讓函式在 question 是選擇題時讀取 options。',
      hint: '條件要比較共同 property type 的 literal 值，讓 TypeScript 在分支中知道這是 choice member。',
      code: 'type Question =\n  | { type: "choice"; options: readonly string[] }\n  | { type: "fill"; answer: string };\n\nfunction choiceCount(question: Question): number {\n  if (____) {\n    return question.options.length;\n  }\n\n  return 0;\n}',
      acceptedAnswers: ['question.type === "choice"', "question.type === 'choice'"],
      explanation:
        'question.type === "choice" 會在 Runtime 判斷目前的狀態，也會讓 TypeScript 在 if 分支把 question narrowing 成具有 options 的 object shape，因此可以讀取 question.options.length。',
    },
  ],
};