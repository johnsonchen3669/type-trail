import { QuizDefinition } from './quiz.models';

export const dayEightQuiz: QuizDefinition = {
  id: 'day-08',
  day: 8,
  title: '型別推論：讓 TypeScript 自己理解程式',
  estimatedMinutes: 12,
  questions: [
    {
      id: 'day-08-01',
      number: 1,
      kind: 'choice',
      learningGoal: '理解 type inference 的發生階段與資訊來源',
      prompt: '下列哪一項最準確地描述 TypeScript 的 type inference？',
      hint: '先分辨「編譯器理解原始碼」與「JavaScript Runtime 執行實際值」是哪兩件事。',
      options: [
        { id: 'A', label: 'Type inference 會在 Runtime 替外部資料建立驗證器' },
        { id: 'B', label: 'Type inference 會在編譯期根據值、上下文或 annotation 推導型別' },
        { id: 'C', label: 'Type inference 會把所有字串自動限制成產品允許的字串清單' },
        { id: 'D', label: 'Type inference 會把 JavaScript Runtime 的值轉換成 TypeScript 型別物件' },
      ],
      correctAnswer: 'B',
      explanation:
        'Type inference 是編譯期對原始碼的推導，資訊可以來自初始值、周圍使用情境或明確 annotation。它不會自動變成 Runtime 驗證，也不會自行理解完整的商業規則。',
    },
    {
      id: 'day-08-02',
      number: 2,
      kind: 'choice',
      learningGoal: '判斷 const 與 let 對 literal widening 的影響',
      prompt: '以下 TypeScript 程式的編譯期結果為何？',
      hint: '比較兩個變數是否可能在宣告後被重新指定，再判斷哪一個保留了特定的字串 literal。',
      code: 'const exactMode = "practice";\nlet changeableMode = "practice";\n\nfunction acceptsOnlyPractice(value: "practice") {\n  return value;\n}\n\nacceptsOnlyPractice(exactMode);\nacceptsOnlyPractice(changeableMode);',
      options: [
        { id: 'A', label: '兩次呼叫都通過，因為兩個變數目前的值都是 "practice"' },
        { id: 'B', label: '第一個呼叫通過，第二個呼叫有編譯期錯誤，因為 let 的變數被推導成一般 string' },
        { id: 'C', label: '第一個呼叫有編譯期錯誤，第二個呼叫通過，因為只有 let 可以傳入函式' },
        { id: 'D', label: '兩次呼叫都要等到 Runtime 才判斷是否符合 "practice"' },
      ],
      correctAnswer: 'B',
      explanation:
        'const exactMode 可以保留成 literal type "practice"；let changeableMode 因為可能重新指定其他字串，會發生 literal widening，被推導成 string。一般 string 不保證就是 "practice"，因此第二次呼叫不符合函式參數的型別。',
    },
    {
      id: 'day-08-03',
      number: 3,
      kind: 'choice',
      learningGoal: '辨識與 contextual typing 衝突的多餘 annotation',
      prompt: '以下程式的問題最精確是什麼？',
      hint: '先看 answerOptions 的元素型別，再比較 callback 參數手動寫上的型別。',
      code: 'const answerOptions = ["export", "import"];\n\nconst normalizedOptions = answerOptions.map((option: number) => {\n  return option * 2;\n});',
      options: [
        { id: 'A', label: 'map 只能處理數字陣列，所以陣列必須改成 number[]' },
        { id: 'B', label: 'callback 參數被標成 number，但周圍情境表示它會收到字串' },
        { id: 'C', label: 'TypeScript 不允許在 callback 裡使用 return' },
        { id: 'D', label: 'JavaScript Runtime 會自動把 "export" 轉成數字 0' },
      ],
      correctAnswer: 'B',
      explanation:
        '陣列元素是字串，map 的 callback 參數應該依上下文視為字串。手動指定 number 與這個情境衝突，因此在編譯期被拒絕；拿掉錯誤的 annotation，讓 contextual typing 發揮作用即可。',
    },
    {
      id: 'day-08-04',
      number: 4,
      kind: 'exact-text',
      learningGoal: '辨識 literal 變成較寬基本型別的推導過程',
      prompt:
        '從較精確的 literal 推導成較寬的 string、number 或 boolean 型別，文章將這個過程稱為什麼？請輸入英文術語。',
      hint: '這個術語包含 literal，以及「放寬」的英文動名詞。',
      acceptedAnswers: ['literal widening'],
      explanation:
        '當 let mode = "practice" 因為之後可能被指定成其他字串，而被推導成 string 時，這個從 literal 到較寬型別的過程稱為 literal widening。',
    },
    {
      id: 'day-08-05',
      number: 5,
      kind: 'code-fill',
      learningGoal: '使用 contextual typing 處理字串陣列的 callback',
      prompt: '請補上函式呼叫，將每個選項轉成大寫。option 的型別由 map 的使用情境推導，不需要另外標註。',
      hint: '文章中的做法是對字串呼叫一個回傳大寫內容的方法。',
      code: 'const options = ["export", "import"];\nconst normalized = options.map((option) => ____);',
      acceptedAnswers: ['option.toUpperCase()'],
      explanation:
        'options 是字串陣列，因此 option 會被 contextual typing 成字串。填入 option.toUpperCase() 後，normalized 會是 ["EXPORT", "IMPORT"]。',
    },
  ],
};