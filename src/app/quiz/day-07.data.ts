import { QuizDefinition } from './quiz.models';

export const daySevenQuiz: QuizDefinition = {
  id: 'day-07',
  day: 7,
  title: '從 JavaScript 到 TypeScript：編譯時與執行時',
  estimatedMinutes: 12,
  questions: [
    {
      id: 'day-07-01',
      number: 1,
      kind: 'choice',
      learningGoal: '理解 type erasure 與 Runtime 驗證的差異',
      prompt: 'TypeScript 編譯完成後，型別註記通常會發生什麼事？',
      hint: '想想輸出的程式最後是由哪一個 Runtime 執行，以及輸出範例中哪些文字消失了。',
      options: [
        { id: 'A', label: '型別註記會被保留，JavaScript Runtime 依它自動驗證每個參數' },
        { id: 'B', label: '型別註記通常會被移除；它協助編譯期檢查，但不會自動成為 Runtime 驗證' },
        { id: 'C', label: '型別註記會把錯誤的輸入自動轉換成宣告的型別' },
        { id: 'D', label: '型別註記只用來顯示編輯器提示，編譯器不會用它檢查呼叫端' },
      ],
      correctAnswer: 'B',
      explanation:
        'type erasure 會移除型別註記。TypeScript 可以提早指出已知的型別錯誤，但輸出的 JavaScript 不會因為原本有註記就自動驗證實際值。',
    },
    {
      id: 'day-07-02',
      number: 2,
      kind: 'choice',
      learningGoal: '區分編譯期錯誤與忽略錯誤後的 Runtime 行為',
      prompt:
        '以下程式在編譯期會發生什麼事？再假設把 : string 移除，將其餘程式當作 JavaScript 執行，會發生什麼事？',
      hint: '先檢查函式宣告的參數型別，再檢查 Runtime 會對實際傳入的值呼叫哪個方法。',
      code: 'function upper(text: string) {\n  return text.toUpperCase();\n}\n\nconst result = upper(42);',
      options: [
        { id: 'A', label: '編譯通過；執行 JavaScript 後，result 會是 42' },
        { id: 'B', label: '編譯指出參數型別不符；執行 JavaScript 時會拋出 TypeError' },
        { id: 'C', label: '編譯指出參數型別不符；執行 JavaScript 時會自動把 42 轉成字串' },
        { id: 'D', label: '編譯指出參數型別不符；執行 JavaScript 後，result 會是 undefined' },
      ],
      correctAnswer: 'B',
      explanation:
        'upper 需要 string，但呼叫傳入 number，所以編譯器能先指出問題。移除 : string 後，Runtime 仍會對數字呼叫 toUpperCase()，因此拋出 TypeError；TypeScript 不會自動轉換值。',
    },
    {
      id: 'day-07-03',
      number: 3,
      kind: 'choice',
      learningGoal: '區分全域與專案安裝的 TypeScript 編譯器',
      prompt:
        '開發者在專案中執行以下命令，看到版本號後，便認定它一定來自這個專案安裝的 TypeScript。這個判斷有什麼問題？',
      hint: '比較文章中全域安裝與專案安裝分別使用的版本確認命令。',
      code: 'npm install --save-dev typescript@7.0\ntsc --version',
      options: [
        {
          id: 'A',
          label: 'tsc 可能找到 npm 全域環境中的編譯器；應使用 npx tsc --version 確認專案安裝的版本',
        },
        { id: 'B', label: 'tsc --version 一定會讀取專案 lockfile，因此不可能取得全域版本' },
        { id: 'C', label: 'npx tsc 每次都只會下載最新版，不能使用專案中的 TypeScript' },
        { id: 'D', label: '安裝專案版本時，npm 會同步更新全域版，所以 tsc --version 和 npx tsc --version 一定相同' },
      ],
      correctAnswer: 'A',
      explanation:
        '直接執行 tsc 可能取得全域安裝的編譯器，不能只靠它判斷目前專案使用的版本。專案已將 TypeScript 安裝在 devDependencies 時，使用 npx tsc --version 可以執行專案依賴提供的編譯器。',
    },
    {
      id: 'day-07-04',
      number: 4,
      kind: 'exact-text',
      learningGoal: '辨識避免錯誤輸出進入下一步的編譯設定',
      prompt:
        '若要在有編譯錯誤時不輸出 JavaScript，tsconfig.json 中應使用哪個選項名稱？只輸入選項名稱，不含引號。',
      hint: '本題問的是「發生錯誤時是否仍產生輸出」，不是「完全不產生輸出」的命令列旗標。',
      acceptedAnswers: ['noEmitOnError'],
      explanation:
        'noEmitOnError: true 會在有編譯錯誤時停止輸出；noEmit 則是即使沒有錯誤也只檢查、不產生輸出，兩者用途不同。',
    },
    {
      id: 'day-07-05',
      number: 5,
      kind: 'code-fill',
      learningGoal: '在判分函式的參數上建立基本的編譯期契約',
      prompt: '請補上一個型別名稱，讓 input 和 expected 都表示字串。',
      hint: '兩個參數都會和使用者輸入或標準答案文字比較；本題只需要補一個基本型別名稱。',
      code: 'export function gradeAnswer(input: ____, expected: string) {\n  return input === expected ? 10 : 0;\n}',
      acceptedAnswers: ['string'],
      explanation:
        '填入 string 後，編譯器可以檢查呼叫端傳入的值是否符合判分函式對 input 的要求。這只是編譯期檢查，並不會替 Runtime 收到的外部資料做驗證。',
    },
  ],
};
