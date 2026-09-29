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
      learningGoal: '理解結構型別依目標所需欄位判斷相容性',
      prompt: '函式只需要讀取 prompt: string。以下哪個說法正確？',
      hint: '先列出函式真正會使用的欄位，再比較每個來源物件提供了什麼。',
      options: [
        { id: 'A', label: '來源物件必須明確寫成 interface，才能傳入函式' },
        { id: 'B', label: '來源物件只要有 prompt: string 就可能相容，多出的欄位不會妨礙這個函式使用' },
        { id: 'C', label: '來源物件只要多一個欄位，就一定不相容' },
        { id: 'D', label: '只有名稱完全相同的型別才能相容' },
      ],
      correctAnswer: 'B',
      explanation:
        'TypeScript 的結構型別會比較欄位。目標只要求 prompt 時，含有這個欄位的物件可以傳入；來源多出的欄位不會讓它失去相容性。兩份資料仍可能代表不同用途。',
    },
    {
      id: 'day-16-02',
      number: 2,
      kind: 'choice',
      learningGoal: '判斷具有額外欄位的物件變數是否能交給較小的目標結構',
      prompt: '以下程式在 TypeScript 編譯後執行，會印出什麼？',
      hint: '函式只會讀取哪一個欄位？先不要把來源的其他欄位當成錯誤。',
      code: 'function showPrompt(question: { prompt: string }): string {\n  return question.prompt;\n}\n\nconst question = {\n  id: "q16",\n  prompt: "保留哪些欄位？",\n  options: ["prompt"],\n};\n\nconsole.log(showPrompt(question));',
      options: [
        { id: 'A', label: 'q16' },
        { id: 'B', label: '保留哪些欄位？' },
        { id: 'C', label: 'prompt' },
        { id: 'D', label: '編譯期錯誤，因為 question 多了 options' },
      ],
      correctAnswer: 'B',
      explanation:
        'question 先存成變數後，結構型別只要求它具有 prompt: string。showPrompt 回傳的就是該欄位內容；id 與 options 不影響這次呼叫。',
    },
    {
      id: 'day-16-03',
      number: 3,
      kind: 'choice',
      learningGoal: "辨識型別相同但用途不同的欄位",
      prompt: "畫面要取得這一題的判分結果。以下程式有什麼問題？",
      hint: "比對判分結果時，應使用題目的哪一個欄位？",
      code: "interface QuestionSummary {\n  id: string;\n  prompt: string;\n}\n\ninterface QuestionResult {\n  questionId: string;\n  isCorrect: boolean;\n}\n\nfunction findQuestionResult(\n  results: QuestionResult[],\n  question: QuestionSummary,\n) {\n  return results.find((result) => result.questionId === question.prompt);\n}",
      options: [
        { id: 'A', label: "questionId 和 prompt 名稱不同，因此編譯期會報錯" },
        { id: 'B', label: "兩邊都是字串，編譯會通過，但應改成比對 question.id" },
        { id: 'C', label: "只要兩邊都是字串，就能保證找到正確的判分結果" },
        { id: 'D', label: "find 不能用來搜尋物件陣列" },
      ],
      correctAnswer: 'B',
      explanation: "questionId 和 prompt 都是字串，TypeScript 允許比較。要找到對應題目的判分結果，應比較 result.questionId === question.id；欄位型別相同無法保證使用方式符合商業邏輯。",
    },
    {
      id: 'day-16-04',
      number: 4,
      kind: 'exact-text',
      learningGoal: '辨認直接寫物件時的額外欄位檢查',
      prompt: 'formatSummary 的參數只要求 id 和 prompt。直接傳入的物件還寫了 type 和 options，TypeScript 因而報錯。這是哪一種檢查？只填中文名稱。',
      hint: '這項檢查會指出直接寫入的物件有哪些額外欄位。',
      acceptedAnswers: ['多餘屬性檢查'],
      explanation:
        '直接寫出的物件會接受多餘屬性檢查，因此 type、options 會被指出來。若先宣告符合 ChoiceQuestion 的變數，再傳給 formatSummary，則會依函式需要的欄位判斷相容性。',
    },
    {
      id: 'day-16-05',
      number: 5,
      kind: 'code-fill',
      learningGoal: "使用經過實際檢查的函式建立品牌型別",
      prompt: "填入已宣告的函式名稱，確認選取的 ID 存在於題目清單後，再回傳 QuestionId。",
      hint: "找出同時檢查題目清單、回傳 QuestionId 的函式。",
      code: "type QuestionId = string & { readonly __brand: \"QuestionId\" };\n\ninterface QuestionSummary {\n  id: string;\n  prompt: string;\n}\n\nfunction requireQuestionId(\n  value: string,\n  questions: QuestionSummary[],\n): QuestionId {\n  if (!questions.some((question) => question.id === value)) {\n    throw new Error(\"找不到對應的題目\");\n  }\n  return value as QuestionId;\n}\n\nfunction confirmSelection(\n  selectedId: string,\n  questions: QuestionSummary[],\n): QuestionId {\n  return ____(selectedId, questions);\n}",
      acceptedAnswers: ['requireQuestionId'],
      explanation: "requireQuestionId 用 some 比對清單中的 ID，找到相同的值才回傳 QuestionId。清單比對負責確認資料，as QuestionId 則告訴 TypeScript 後續使用這個型別。",
    },
  ],
};
