import { QuizDefinition } from './quiz.models';

export const daySixteenQuiz: QuizDefinition = {
  id: 'day-16',
  day: 16,
  title: '結構型別：長得一樣就可能相容',
  estimatedMinutes: 12,
  questions: [
    {
      id: 'day-16-01',
      number: 1,
      kind: 'choice',
      learningGoal: '理解結構型別依目標所需成員判斷相容性',
      prompt: '函式只需要讀取 prompt: string。以下哪個說法正確？',
      hint: '先列出函式真正會使用的成員，再比較每個來源物件提供了什麼。',
      options: [
        { id: 'A', label: '來源物件必須明確寫成 interface，才能傳入函式' },
        { id: 'B', label: '來源物件只要有 prompt: string 就可能相容，多出的欄位不會妨礙這個函式使用' },
        { id: 'C', label: '來源物件只要多一個欄位，就一定不相容' },
        { id: 'D', label: '只有名稱完全相同的型別才能相容' },
      ],
      correctAnswer: 'B',
      explanation:
        'TypeScript 的結構型別會比較成員。目標只要求 prompt 時，含有這個欄位的物件可以傳入；來源多出的欄位不會讓它失去相容性。這不代表兩份資料在產品語意上相同。',
    },
    {
      id: 'day-16-02',
      number: 2,
      kind: 'choice',
      learningGoal: '判斷具有額外欄位的物件變數是否能交給較小的目標結構',
      prompt: '以下程式在 TypeScript 編譯後執行，會印出什麼？',
      hint: '函式只會讀取哪一個欄位？先不要把來源的其他欄位當成錯誤。',
      code: 'function showPrompt(question: { prompt: string }): string {\n  return question.prompt;\n}\n\nconst choiceQuestion = {\n  id: "q16",\n  prompt: "保留哪些欄位？",\n  options: ["prompt"],\n};\n\nconsole.log(showPrompt(choiceQuestion));',
      options: [
        { id: 'A', label: 'q16' },
        { id: 'B', label: '保留哪些欄位？' },
        { id: 'C', label: 'prompt' },
        { id: 'D', label: '編譯期錯誤，因為 choiceQuestion 多了 options' },
      ],
      correctAnswer: 'B',
      explanation:
        'choiceQuestion 先存成變數後，結構型別只要求它具有 prompt: string。showPrompt 回傳的就是該欄位內容；id 與 options 不影響這次呼叫。',
    },
    {
      id: 'day-16-03',
      number: 3,
      kind: 'choice',
      learningGoal: '辨識 excess property checking 對直接物件字面值的檢查',
      prompt: '以下程式的編譯期問題是什麼？',
      hint: '這次傳入的是直接寫出的物件字面值，不是先存進變數的完整題目。',
      code: 'interface QuestionSummary {\n  id: string;\n  prompt: string;\n}\n\nfunction summarize(question: QuestionSummary): string {\n  return question.prompt;\n}\n\nsummarize({\n  id: "q16",\n  prompt: "結構相容",\n  difficulty: "basic",\n});',
      options: [
        { id: 'A', label: 'prompt 的型別是 string，所以缺少必要欄位' },
        { id: 'B', label: 'difficulty 不在 QuestionSummary 宣告中，直接傳入物件字面值會觸發 excess property checking' },
        { id: 'C', label: '結構型別禁止所有來源多出欄位' },
        { id: 'D', label: 'summarize 必須回傳 QuestionSummary 物件，不能回傳字串' },
      ],
      correctAnswer: 'B',
      explanation:
        '結構相容性本身不要求來源欄位數量完全相同，但直接傳入物件字面值時，TypeScript 會另外檢查未宣告的欄位。這裡應確認 difficulty 是拼字錯誤，或把真正需要的欄位補進型別。',
    },
    {
      id: 'day-16-04',
      number: 4,
      kind: 'exact-text',
      learningGoal: '辨識用來區分相同基本型別用途的 branded type 名稱',
      prompt: '在文章的範例中，用來區分題目 ID 與使用者 ID 的 branded type 是哪一個？只填型別名稱。',
      hint: '回到區分題目 ID 和使用者 ID 的範例，找出題目 ID 使用的型別名稱。',
      acceptedAnswers: ['QuestionId'],
      explanation:
        'QuestionId 是加上品牌後的題目 ID 型別；UserId 則代表另一種用途。兩者底層都以字串表示，但編譯期不能互相替代。',
    },
    {
      id: 'day-16-05',
      number: 5,
      kind: 'code-fill',
      learningGoal: '使用建立 branded QuestionId 的函式，而不是直接把一般字串交給需要品牌的函式',
      prompt: '請補上一行，讓 id 通過 loadBrandedQuestion 的 QuestionId 參數要求。createQuestionId 會先檢查格式。',
      hint: '一般字串要先經過哪個專門建立題目 ID 的函式，才能取得品牌？',
      code: 'type QuestionId = string & { readonly __brand: "QuestionId" };\n\nconst rawId = "q-16";\n\nfunction createQuestionId(value: string): QuestionId {\n  if (!value.startsWith("q-")) {\n    throw new Error("題目 ID 格式錯誤");\n  }\n\n  return value as QuestionId;\n}\n\nfunction loadBrandedQuestion(id: QuestionId): string {\n  return "載入題目：" + id;\n}\n\nconst id = ____;\nloadBrandedQuestion(id);',
      acceptedAnswers: ['createQuestionId(rawId)'],
      explanation:
        'createQuestionId(rawId) 會依範例中的格式規則檢查字串，並回傳 QuestionId。直接寫 rawId 仍然只是一般 string，不能當成帶有 QuestionId 品牌的值。',
    },
  ],
};
