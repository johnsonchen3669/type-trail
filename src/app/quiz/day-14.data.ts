import { QuizDefinition } from './quiz.models';

export const dayFourteenQuiz: QuizDefinition = {
  id: 'day-14',
  day: 14,
  title: '型別斷言：as 為什麼可能只是在欺騙自己？',
  estimatedMinutes: 12,
  questions: [
    {
      id: 'day-14-01',
      number: 1,
      kind: 'choice',
      learningGoal: '辨認有具體依據的局部斷言',
      prompt: '以下哪一種情況，最能支持使用 as HTMLInputElement？',
      hint: '找出哪些資訊在程式執行前已有明確保證，以及這個保證由誰維護。',
      options: [
        { id: 'A', label: 'API 欄位叫做 input，所以它必定是瀏覽器輸入元素' },
        { id: 'B', label: '專案維護固定 HTML，確保唯一 ID 對應已建立的 input 元素，並記錄這個前提' },
        { id: 'C', label: '編譯器沒有報錯，所以斷言已通過 Runtime 驗證' },
        { id: 'D', label: 'AI 建議這樣修改，因此不必確認元素種類或執行時機' },
      ],
      correctAnswer: 'B',
      explanation:
        '固定頁面、元素種類與執行時機提供了型別宣告以外的具體依據。斷言本身仍不驗證資料，維護者必須維持這些前提；頁面若可能變動，可以改用 instanceof HTMLInputElement 檢查。',
    },
    {
      id: 'day-14-02',
      number: 2,
      kind: 'choice',
      learningGoal: '區分斷言後的編譯期型別與實際值',
      prompt: '以下程式可以通過 TypeScript 檢查。執行時，兩次 console.log 依序輸出什麼？',
      hint: '先想像移除型別標註與斷言後，剩下的 JavaScript 會取得哪個值。',
      code: 'const raw: unknown = "8";\nconst count = raw as number;\n\nconsole.log(typeof count);\nconsole.log(count + 1);',
      options: [
        { id: 'A', label: 'number、9' },
        { id: 'B', label: 'string、9' },
        { id: 'C', label: 'string、81' },
        { id: 'D', label: '執行 as number 時就拋出 TypeError，沒有任何輸出' },
      ],
      correctAnswer: 'C',
      explanation:
        'as number 不改變值。count 實際仍是字串 "8"，typeof 得到 "string"；字串加上數字 1 得到字串 "81"。若要轉換，需要執行 Number 等轉換操作。',
    },
    {
      id: 'day-14-03',
      number: 3,
      kind: 'choice',
      learningGoal: '辨識非 null 斷言掩蓋的查找失敗',
      prompt: '以下程式呼叫 readPrompt([]) 時，問題出在哪裡？',
      hint: '沿著空陣列的查找結果往下看，確認驚嘆號是否會新增一筆題目或中止執行。',
      code: 'type Question = {\n  id: string;\n  prompt: string;\n};\n\nfunction readPrompt(questions: Question[]): string {\n  const question = questions.find((item) => item.id === "q14");\n  return question!.prompt;\n}\n\nreadPrompt([]);',
      options: [
        { id: 'A', label: '空陣列不能作為 Question[] 傳入，因此必定發生編譯期錯誤' },
        { id: 'B', label: 'find 找不到時會回傳空物件，所以 prompt 只是空字串' },
        { id: 'C', label: '! 會在找不到資料時自動拋出「找不到題目」的錯誤' },
        { id: 'D', label: 'find 回傳 undefined，! 沒有執行檢查，讀取 prompt 時會拋出 TypeError' },
      ],
      correctAnswer: 'D',
      explanation:
        '空陣列是合法輸入，但沒有符合條件的題目。非 null 斷言只改變型別，執行時仍會讀取 undefined.prompt。應明確判斷查找結果，再依需求丟錯或回傳提示。',
    },
    {
      id: 'day-14-04',
      number: 4,
      kind: 'exact-text',
      learningGoal: '理解雙重斷言沒有改變 Runtime 型別',
      prompt: '執行下列程式時，console.log 輸出的型別名稱是什麼？只填小寫名稱，不加引號。',
      hint: '兩次斷言之間，有沒有任何真正執行的資料轉換？',
      code: 'const count = "14" as unknown as number;\nconsole.log(typeof count);',
      acceptedAnswers: ['string'],
      explanation:
        '雙重斷言繞過直接斷言的限制，但兩個 as 都會被移除。實際值仍是字串 "14"，所以 typeof 的結果是 "string"。',
    },
    {
      id: 'day-14-05',
      number: 5,
      kind: 'code-fill',
      learningGoal: '用 Runtime 元素檢查取代沒有依據的斷言',
      prompt:
        '以下程式在瀏覽器中執行。請補上「檢查是否為指定建構函式的實例」的運算子，讓不存在或不是輸入元素的值進入錯誤分支。只填一個關鍵字。',
      hint: '這個判斷必須在 Runtime 檢查元素種類，並讓 TypeScript 能縮小後續的型別。',
      code: 'const input = document.getElementById("answer-input");\n\nif (!(input ____ HTMLInputElement)) {\n  throw new Error("找不到作答輸入框，或元素種類不正確");\n}\n\nconsole.log(input.value);',
      acceptedAnswers: ['instanceof'],
      explanation:
        'input instanceof HTMLInputElement 檢查值是否為輸入元素實例。null 或其他元素不符合條件，會走到丟錯分支；通過後才能讀取 input.value。範例與文章一樣，假設元素與程式位於同一個瀏覽器頁面環境。',
    },
  ],
};