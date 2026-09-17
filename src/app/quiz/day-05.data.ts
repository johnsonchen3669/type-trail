import { QuizDefinition } from './quiz.models';

export const dayFiveQuiz: QuizDefinition = {
  id: 'day-05',
  day: 5,
  title: 'Promise、async/await 與 Event Loop',
  estimatedMinutes: 12,
  questions: [
    {
      id: 'day-05-01',
      number: 1,
      kind: 'choice',
      learningGoal: '理解 await 對程式執行的影響',
      prompt: '下列哪一項最準確地描述 await？',
      hint: '分開考慮「目前的 async function」與「整個 JavaScript Runtime」。',
      options: [
        { id: 'A', label: 'await 會阻塞整個 JavaScript Runtime，直到 Promise 完成' },
        { id: 'B', label: 'await 會暫停目前 async function 的後續執行，其他工作仍可繼續' },
        { id: 'C', label: 'await 會把所有 Promise 改成同步回傳值' },
        { id: 'D', label: 'await 只能等待計時器，不能等待其他 Promise' },
      ],
      correctAnswer: 'B',
      explanation:
        'await 等待 Promise 完成時，只暫停目前 async function 的後續流程，並把控制權交還 Runtime。它沒有阻塞整個 JavaScript，也沒有移除 Promise。',
    },
    {
      id: 'day-05-02',
      number: 2,
      kind: 'choice',
      learningGoal: '依據同步程式、microtask 與 task 的順序判斷 Runtime 輸出',
      prompt: '以下 JavaScript 程式依序輸出什麼？',
      hint: '先完成目前的同步程式，再比較 Promise 處理函式與計時器回呼函式的執行順序。',
      code: 'console.log("A");\n\nsetTimeout(() => console.log("B"), 0);\n\nPromise.resolve().then(() => console.log("C"));\n\nconsole.log("D");',
      options: [
        { id: 'A', label: 'A、B、C、D' },
        { id: 'B', label: 'A、D、B、C' },
        { id: 'C', label: 'A、D、C、B' },
        { id: 'D', label: 'C、A、D、B' },
      ],
      correctAnswer: 'C',
      explanation:
        'A、D 是目前的同步程式；同步程式結束後先處理 Promise microtask，因此輸出 C；計時器回呼函式是後續 task，最後輸出 B。',
    },
    {
      id: 'day-05-03',
      number: 3,
      kind: 'choice',
      learningGoal: '辨識把 HTTP response 誤當成 API 成功的錯誤',
      prompt: '以下載入函式最大的問題是什麼？',
      hint: 'fetch 收到 404 或 500 response 時，回傳的 Promise 不一定 rejected。',
      code: 'async function loadQuestions() {\n  const response = await fetch("/api/questions");\n  return response.json();\n}',
      options: [
        { id: 'A', label: 'fetch 不能放在 async function 裡' },
        {
          id: 'B',
          label:
            '程式沒有先檢查 response.ok 或 response.status，可能把 HTTP 錯誤 response 當成成功資料處理',
        },
        { id: 'C', label: 'response.json() 一定會把內容驗證成 TypeScript 型別' },
        { id: 'D', label: '使用 await 後，所有網路錯誤都會被忽略' },
      ],
      correctAnswer: 'B',
      explanation:
        'fetch 在收到 HTTP 錯誤狀態時通常仍會 fulfilled，所以程式應先檢查 response.ok 或狀態碼。解析 JSON 與驗證資料內容又是另一個問題。',
    },
    {
      id: 'day-05-04',
      number: 4,
      kind: 'exact-text',
      learningGoal: '辨識 Promise 尚未完成時的狀態名稱',
      prompt:
        'Promise 尚未 fulfilled 或 rejected 時，處於哪一個狀態？請輸入文章使用的英文狀態名稱。',
      hint: '三種狀態中，另外兩個分別表示成功與失敗；本題要找「仍在等待」的狀態。',
      acceptedAnswers: ['pending'],
      explanation: 'Promise 建立後、尚未完成時處於 pending；之後可能變成 fulfilled 或 rejected。',
    },
    {
      id: 'day-05-05',
      number: 5,
      kind: 'code-fill',
      learningGoal: '使用 Promise 組合方式同時等待互不依賴的工作',
      prompt: '填入文章使用的方法名稱，讓兩個已啟動的工作一起被等待。',
      hint: '這個方法接收 Promise 陣列；如果其中一項 rejected，組合後的 Promise 也會 rejected。',
      code: 'const questionsPromise = loadQuestions();\nconst progressPromise = loadProgress();\n\nconst [questions, progress] = await Promise.____([\n  questionsPromise,\n  progressPromise,\n]);',
      acceptedAnswers: ['all'],
      explanation:
        'Promise.all([...]) 會等待輸入的 Promise 全部 fulfilled。兩個載入函式已先被呼叫，因此等待時間可以重疊。',
    },
  ],
};
