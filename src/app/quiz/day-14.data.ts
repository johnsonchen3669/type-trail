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
      prompt: '以下哪一種情況，最能支持把 getElementById 的結果斷言為 HTMLInputElement？',
      hint: '找出哪些資訊在程式執行前已有明確保證，以及這個保證由誰維護。',
      options: [
        { id: 'A', label: '開發者工具目前看得到輸入框，但程式可能在它建立前執行' },
        { id: 'B', label: '專案維護固定頁面，程式只會在 answer-input 輸入框建立後執行' },
        { id: 'C', label: '編譯器沒有報錯，所以斷言已通過 Runtime 驗證' },
        { id: 'D', label: '程式會在不同頁面共用，而相同 ID 可能對應其他種類的元素' },
      ],
      correctAnswer: 'B',
      explanation:
        '固定頁面的元素種類與程式執行時機提供了型別宣告以外的具體依據。斷言本身仍不驗證資料；頁面若可能變動，可以改用 instanceof HTMLInputElement 檢查。',
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
      prompt: '以下程式呼叫 readPrompt 後，問題出在哪裡？',
      hint: '比較傳入的 ID 與陣列中那筆題目的 ID，再看 ! 是否會改變查找結果。',
      code: 'type Question = {\n  id: string;\n  prompt: string;\n};\n\nfunction readPrompt(questions: Question[], id: string): string {\n  const question = questions.find((item) => item.id === id);\n  return question!.prompt;\n}\n\nreadPrompt([{ id: "q15", prompt: "另一題" }], "q14");',
      options: [
        { id: 'A', label: '陣列有一筆題目，find 一定會回傳它，程式正常結束' },
        { id: 'B', label: 'find 會回傳第一筆題目，不會比較 id' },
        { id: 'C', label: '! 會在找不到資料時自動拋出「找不到題目」的錯誤' },
        { id: 'D', label: '沒有符合 id 的題目，! 沒有執行檢查，讀取 prompt 時會拋出 TypeError' },
      ],
      correctAnswer: 'D',
      explanation:
        '陣列雖然有題目，但它的 id 是 q15，查找 q14 會得到 undefined。非 null 斷言只改變型別，執行時仍會讀取 undefined.prompt；應明確判斷查找結果。',
    },
    {
      id: 'day-14-04',
      number: 4,
      kind: 'exact-text',
      learningGoal: '辨識雙重斷言用來繞過直接斷言限制的中間型別',
      prompt: '直接寫 "14" as number 會被 TypeScript 標錯。依文章示範，且不使用 any，空格應填哪個中間型別？只輸入型別名稱。',
      hint: '這個中間型別可以先接收字串，第二個 as 再指定目標型別。',
      code: 'const count = "14" as ____ as number;',
      acceptedAnswers: ['unknown'],
      explanation:
        '先斷言成 unknown，再斷言成 number，能繞過字串直接斷言成數字的限制。兩個 as 都不會檢查或轉換資料，執行時仍是字串 "14"。',
    },
    {
      id: 'day-14-05',
      number: 5,
      kind: 'code-fill',
      learningGoal: '用執行時元素檢查取代沒有依據的斷言',
      prompt:
        '頁面可能找不到輸入框，或同一個 ID 改放了其他元素。請填入一個運算子，讓程式只在實際取得輸入元素時讀取 value。',
      hint: '條件式需要比較實際取得的元素與右側的建構函式；檢查通過後，TypeScript 才能縮小型別。',
      code: 'const element = document.getElementById("answer-input");\nif (element ____ HTMLInputElement) {\n  console.log(element.value);\n} else {\n  throw new Error("找不到作答輸入框");\n}',
      acceptedAnswers: ['instanceof'],
      explanation:
        'element instanceof HTMLInputElement 會在執行時檢查元素種類；null 或其他元素會進入錯誤分支。檢查通過後，TypeScript 也能確認 element 有 value 屬性。',
    },
  ],
};
