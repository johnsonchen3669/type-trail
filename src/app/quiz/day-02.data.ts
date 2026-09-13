import { QuizDefinition } from './quiz.models';

export const dayTwoQuiz: QuizDefinition = {
  id: 'day-02',
  day: 2,
  title: 'JavaScript 是動態型別，問題到底出在哪裡？',
  estimatedMinutes: 10,
  questions: [
    {
      id: 'day-02-01', number: 1, kind: 'choice', learningGoal: '理解 JavaScript 動態型別的意義',
      prompt: '下列哪一項最準確地描述 JavaScript 的動態型別？',
      hint: '觀察同一個變數先被指定數字、後被指定字串時，兩次 typeof 的結果。',
      options: [
        { id: 'A', label: 'JavaScript 的值沒有型別，只有變數有型別' },
        { id: 'B', label: '變數可以在程式執行期間先後指向不同型別的值' },
        { id: 'C', label: 'JavaScript 會在函式宣告時確認每個參數的型別' },
        { id: 'D', label: '動態型別表示所有運算都會自動得到符合需求的結果' },
      ],
      correctAnswer: 'B', explanation: 'JavaScript 的值有型別，但變數不會被固定在單一型別。例如先執行 let answer = 1，此時 typeof answer 是 "number"；接著執行 answer = "A"，typeof answer 就會變成 "string"。同一個變數在程式執行期間先後指向了不同型別的值。',
    },
    {
      id: 'day-02-02', number: 2, kind: 'choice', learningGoal: '判斷運算子觸發隱式型別轉換後的執行結果',
      prompt: '以下 JavaScript 程式依序會輸出什麼？',
      hint: '+ 也能做字串串接；- 則會嘗試把字串轉成數字後計算。',
      code: 'console.log("5" + 1);\nconsole.log("5" - 1);',
      options: [
        { id: 'A', label: '第一行輸出 6，第二行輸出 4' },
        { id: 'B', label: '第一行輸出 51，第二行輸出 4' },
        { id: 'C', label: '第一行輸出 51，第二行也輸出 51' },
        { id: 'D', label: '第一行與第二行都發生執行錯誤' },
      ],
      correctAnswer: 'B', explanation: '+ 在其中一邊是字串時會進行字串串接，因此得到 "51"；- 會嘗試把 "5" 轉成數字，因此得到 4。',
    },
    {
      id: 'day-02-03', number: 3, kind: 'choice', learningGoal: '辨識把假值直接當成「沒有資料」造成的需求錯誤',
      prompt: '型旅 TypeTrail 有一道數字題，0 是合法答案。以下函式最大的問題是什麼？',
      hint: '先單獨算出 Boolean(0)，再比較這個結果是否符合「0 是合法答案」的需求。',
      code: 'function hasAnswer(answer) {\n  return Boolean(answer);\n}',
      options: [
        { id: 'A', label: 'Boolean 只能接收字串，不能接收數字' },
        { id: 'B', label: 'Boolean(0) 會得到 true，所以所有數字都會被當成已作答' },
        { id: 'C', label: 'Boolean(0) 會得到 false，所以合法答案 0 會被誤判成未作答' },
        { id: 'D', label: '函式缺少 TypeScript 回傳型別，所以 JavaScript 無法執行' },
      ],
      correctAnswer: 'C', explanation: '數字 0 是假值。真值與假值是 JavaScript 的轉換規則，不等於產品定義的「有答案」與「沒有答案」。',
    },
    {
      id: 'day-02-04', number: 4, kind: 'exact-text', learningGoal: '辨識無法轉成數字時的結果',
      prompt: '執行 Number("five") 後會得到哪一個值？請輸入該值的程式碼表示法。',
      hint: 'JavaScript 有一個特殊的數值，用來表示這次數字轉換沒有得到有效數字。',
      acceptedAnswers: ['NaN'], explanation: '字串 "five" 無法轉成有效數字，因此 Number("five") 會得到 NaN。',
    },
    {
      id: 'day-02-05', number: 5, kind: 'code-fill', learningGoal: '使用顯式轉換表達要把字串當成數字處理的意圖',
      prompt: '填入文章使用的 JavaScript 內建轉換函式名稱，讓程式輸出數字 5。',
      hint: '文章使用一個以大寫 N 開頭的內建函式，把 rawScore 明確轉成數字。',
      code: 'const rawScore = "4";\nconst score = ______(rawScore);\n\nconsole.log(score + 1); // 5',
      acceptedAnswers: ['Number'], explanation: 'Number(rawScore) 明確把字串 "4" 轉成數字 4，再與數字 1 相加得到 5。',
    },
  ],
};
