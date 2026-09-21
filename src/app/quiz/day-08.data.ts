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
      learningGoal: '理解型別推論的發生階段與資訊來源',
      prompt: '下列哪一項最準確地描述 TypeScript 的型別推論？',
      hint: '想想編譯器何時閱讀原始碼，以及 JavaScript 何時處理實際值。',
      options: [
        { id: 'A', label: '型別推論會在執行時替外部資料建立驗證器' },
        { id: 'B', label: '型別推論會在編譯期根據初始值、使用情境或型別註記推導型別' },
        { id: 'C', label: '型別推論會把所有字串自動限制成產品允許的字串清單' },
        { id: 'D', label: '型別推論會在執行時把值轉換成 TypeScript 型別物件' },
      ],
      correctAnswer: 'B',
      explanation:
        '型別推論發生在編譯期，資訊可以來自初始值、使用情境或型別註記。執行時收到的外部資料仍須另行驗證；產品允許哪些值，也需要明確寫出規則。',
    },
    {
      id: 'day-08-02',
      number: 2,
      kind: 'choice',
      learningGoal: '判斷 const 與 let 對字面值拓寬的影響',
      prompt: '以下 TypeScript 程式的編譯期結果為何？',
      hint: '比較兩個變數宣告後能否重新指定，再看誰保留了只允許 "practice" 的型別。',
      code: 'const exactMode = "practice";\nlet changeableMode = "practice";\n\nif (Math.random() > 0.5) {\n  changeableMode = "review";\n}\n\nfunction acceptsOnlyPractice(value: "practice") {\n  return value;\n}\n\nacceptsOnlyPractice(exactMode);\nacceptsOnlyPractice(changeableMode);',
      options: [
        { id: 'A', label: '兩次呼叫都通過，因為兩個變數的初始值都是 "practice"' },
        { id: 'B', label: '第一個呼叫通過，第二個呼叫有編譯期錯誤，因為 let 的變數被推導成一般 string' },
        { id: 'C', label: '第一個呼叫有編譯期錯誤，第二個呼叫通過，因為只有 let 可以傳入函式' },
        { id: 'D', label: '兩次呼叫都要等到執行時才判斷是否符合 "practice"' },
      ],
      correctAnswer: 'B',
      explanation:
        'exactMode 保留了字面值型別 "practice"；changeableMode 可以重新指定，經過字面值拓寬後成為一般的 string。一般字串型別無法保證值就是 "practice"，因此第二次呼叫有編譯期錯誤。',
    },
    {
      id: 'day-08-03',
      number: 3,
      kind: 'choice',
      learningGoal: '辨識與情境式型別推論衝突的型別註記',
      prompt: '以下程式的問題最精確是什麼？',
      hint: '先看 points 的元素型別，再比較回呼函式參數手動寫上的型別。',
      code: 'const points = [10, 20];\n\nconst lengths = points.map((point: string) => {\n  return point.length;\n});',
      options: [
        { id: 'A', label: 'map 的回呼函式參數必須和回傳值使用相同型別，所以應改成回傳 string' },
        { id: 'B', label: '回呼函式參數被標成 string，但陣列元素是數字' },
        { id: 'C', label: 'map 不會替回呼函式推導參數型別，因此必須在參數上加型別註記' },
        { id: 'D', label: 'points 必須先標註成 number[]，TypeScript 才能讓回呼函式回傳數字' },
      ],
      correctAnswer: 'B',
      explanation:
        '陣列元素是數字，map 的回呼函式參數會依使用情境得到數字型別。手動寫上 string 與資料來源衝突，因此編譯期會報錯；移除錯誤的型別註記即可。',
    },
    {
      id: 'day-08-04',
      number: 4,
      kind: 'exact-text',
      learningGoal: '辨識字面值型別變成較寬型別的推論過程',
      prompt:
        'let mode = "practice" 可以再指定成其他字串。文章怎麼稱呼從特定字串推導成一般 string 的過程？',
      hint: '回想這個推論讓變數之後可以接收哪些值。',
      acceptedAnswers: ['字面值拓寬', 'literal widening'],
      explanation:
        'let 宣告的變數可以重新指定，編譯器把 "practice" 這個字面值型別放寬成一般 string，這個推論過程稱為字面值拓寬。',
    },
    {
      id: 'day-08-05',
      number: 5,
      kind: 'code-fill',
      learningGoal: '運用情境式型別推論處理字串陣列的回呼函式',
      prompt: '請補上函式呼叫，將每個選項轉成大寫。option 的型別由 map 的使用情境推導，不需要另外標註。',
      hint: '文章中的做法是對字串呼叫一個回傳大寫內容的方法。',
      code: 'const options = ["export", "import"];\nconst normalized = options.map((option) => ____);',
      acceptedAnswers: ['option.toUpperCase()'],
      explanation:
        'options 是字串陣列，map 會讓 option 從使用情境得到字串型別。填入 option.toUpperCase() 後，normalized 會是 ["EXPORT", "IMPORT"]。',
    },
  ],
};
