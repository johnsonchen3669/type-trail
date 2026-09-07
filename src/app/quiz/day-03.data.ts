import { QuizDefinition } from './quiz.models';

export const dayThreeQuiz: QuizDefinition = {
  id: 'day-03',
  day: 3,
  title: 'Scope 與 Closure：函式如何記住外部狀態？',
  estimatedMinutes: 10,
  questions: [
    {
      id: 'day-03-01',
      number: 1,
      kind: 'choice',
      learningGoal: '理解 lexical scope 如何決定名稱查找範圍',
      prompt: 'JavaScript 函式可以使用哪些外部變數，主要由什麼決定？',
      hint: '比較函式「寫在哪裡」與「在哪裡被呼叫」這兩個位置。',
      options: [
        { id: 'A', label: '函式每次被呼叫的位置' },
        { id: 'B', label: '函式定義時在程式中的巢狀位置' },
        { id: 'C', label: '函式名稱的長度' },
        { id: 'D', label: '呼叫函式時傳入的參數數量' },
      ],
      correctAnswer: 'B',
      explanation:
        'JavaScript 使用 lexical scope。函式會從自己的 scope 沿著定義位置的外層 scope 查找名稱，不會因為在另一個函式裡被呼叫，就取得呼叫端的區域變數。',
    },
    {
      id: 'day-03-02',
      number: 2,
      kind: 'choice',
      learningGoal: '判斷 closure 保存獨立狀態後的 Runtime 輸出',
      prompt: '以下 JavaScript 程式依序會輸出什麼？',
      hint: '每次執行 createCounter() 都會建立一個新的 count；同一個回傳函式則會繼續存取自己的那一個 count。',
      code: 'function createCounter() {\n  let count = 0;\n\n  return function () {\n    count += 1;\n    return count;\n  };\n}\n\nconst first = createCounter();\nconst second = createCounter();\n\nconsole.log(first());\nconsole.log(first());\nconsole.log(second());',
      options: [
        { id: 'A', label: '1、2、1' },
        { id: 'B', label: '1、2、3' },
        { id: 'C', label: '0、1、0' },
        { id: 'D', label: '三次都發生 ReferenceError' },
      ],
      correctAnswer: 'A',
      explanation:
        'first 的兩次呼叫共享第一個 closure 中的 count，所以得到 1、2。second 來自另一次 createCounter() 呼叫，具有獨立的 count，第一次呼叫得到 1。',
    },
    {
      id: 'day-03-03',
      number: 3,
      kind: 'choice',
      learningGoal: '辨識 var 的 function scope 在迴圈 callback 中造成的共享變數',
      prompt: '以下程式原本希望三個函式分別輸出 0、1、2，實際上卻都輸出 3。最精確的原因是什麼？',
      hint: '檢查三個 callback 讀到的是三個不同變數，還是同一個在迴圈結束後已變成 3 的變數。',
      code: 'const printers = [];\n\nfor (var index = 0; index < 3; index += 1) {\n  printers.push(function () {\n    console.log(index);\n  });\n}\n\nprinters[0]();\nprinters[1]();\nprinters[2]();',
      options: [
        { id: 'A', label: 'Callback 一律只能在迴圈執行期間呼叫' },
        { id: 'B', label: 'var 沒有為每次迭代建立新的 block-scoped index，三個函式讀到同一個變數' },
        { id: 'C', label: 'Closure 會把所有數字自動加一' },
        { id: 'D', label: '陣列不能儲存函式' },
      ],
      correctAnswer: 'B',
      explanation:
        'var 不會替每次迴圈迭代建立新的 block-scoped index，所以三個 callback 共享同一個 binding。函式真正執行時，迴圈已結束，index 已是 3。改用 let 可讓每次迭代取得對應的 block-scoped binding。',
    },
    {
      id: 'day-03-04',
      number: 4,
      kind: 'exact-text',
      learningGoal: '辨識限制 let 與 const 可見範圍的作用域名稱',
      prompt:
        'let 與 const 宣告在 if 的大括號內時，這種限制名稱可見範圍的作用域稱為什麼？請輸入文章使用的英文術語。',
      hint: '答案由 block 加上一個表示「作用域」的英文單字組成。',
      acceptedAnswers: ['block scope'],
      explanation:
        'let 與 const 具有 block scope，因此在 if block 內宣告的名稱，離開大括號後不能直接存取。',
    },
    {
      id: 'day-03-05',
      number: 5,
      kind: 'code-fill',
      learningGoal: '使用 closure 更新並保留外層狀態',
      prompt: '填入一行程式，讓每次呼叫 addScore 都先把 points 加到外層的 score，再回傳累積結果。',
      hint: '使用加法指定運算子更新 score，右側是函式收到的參數。',
      code: 'function createScoreTracker() {\n  let score = 0;\n\n  return function addScore(points) {\n    ______\n    return score;\n  };\n}',
      acceptedAnswers: ['score += points;', 'score += points'],
      explanation:
        '內層函式透過 closure 存取外層的 score。score += points 會更新同一個變數，因此累積結果能延續到下一次呼叫。',
    },
  ],
};
