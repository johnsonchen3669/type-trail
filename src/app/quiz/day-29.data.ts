import { QuizDefinition } from './quiz.models';

export const dayTwentyNineQuiz: QuizDefinition = {
  id: 'day-29',
  day: 29,
  title: '擴充專案：用 ESLint 檢查 AI 寫的程式',
  estimatedMinutes: 12,
  questions: [
    {
      kind: 'choice',
      learningGoal: '區分程式寫法與資料結果的檢查',
      prompt: '新增菜單查詢後，想自動找出程式中的 any 與非空斷言，應使用哪項檢查？',
      hint: '對照本文各工具負責的事情。',
      options: [
        {
          id: 'A',
          label: '用 Zod 驗證使用者資料',
        },
        {
          id: 'B',
          label: '用 ESLint 執行設定好的規則',
        },
        {
          id: 'C',
          label: '只執行建置',
        },
        {
          id: 'D',
          label: '只測試總額是否正確',
        },
      ],
      correctAnswer: 'B',
      explanation: 'ESLint 依本專案規則檢查 any 與非空斷言。',
      id: 'day-29-01',
      number: 1,
    },
    {
      kind: 'choice',
      learningGoal: '理解非空斷言的執行結果',
      prompt: '下列程式在 JavaScript 執行時印出什麼？',
      hint: '! 改變編譯器看待型別的方式，取值仍由 find 決定。',
      options: [
        {
          id: 'A',
          label: 'undefined',
        },
        {
          id: 'B',
          label: '{ id: "margherita" }',
        },
        {
          id: 'C',
          label: 'not_found',
        },
        {
          id: 'D',
          label: '執行時會因為 ! 而拋出錯誤',
        },
      ],
      correctAnswer: 'A',
      explanation: 'find 沒有找到餐點，得到 undefined；! 不會產生資料。',
      code: 'const menu = [{ id: "margherita" }];\nconst pizza = menu.find((item) => item.id === "missing")!;\nconsole.log(pizza);',
      id: 'day-29-02',
      number: 2,
    },
    {
      kind: 'choice',
      learningGoal: '確認修正是否處理原問題',
      prompt: 'AI 為了讓 lint 通過，改成下面這樣。這個修改有什麼問題？',
      hint: '看查詢的缺值情況是否被處理。',
      options: [
        {
          id: 'A',
          label: '停用註解會讓 find 在找不到時拋出錯誤',
        },
        {
          id: 'B',
          label: '停用這一行的規則，會連其他行的檢查也關閉',
        },
        {
          id: 'C',
          label: '關閉規則，卻仍然假設餐點存在',
        },
        {
          id: 'D',
          label: '加上 ! 後，找不到餐點會改成回傳 null',
        },
      ],
      correctAnswer: 'C',
      explanation: '停用規則只會移除診斷，找不到餐點的情況仍未處理。',
      code: '// eslint-disable-next-line @typescript-eslint/no-non-null-assertion\nconst pizza = menu.find((item) => item.id === pizzaId)!;',
      id: 'day-29-03',
      number: 3,
    },
    {
      kind: 'exact-text',
      learningGoal: '辨認禁止直接宣告 any 的規則',
      prompt: '本文哪項規則會指出直接宣告的 any？填寫規則名稱，不加 @typescript-eslint/。',
      hint: '查看規則表中對 any 的要求。',
      acceptedAnswers: ['no-explicit-any'],
      explanation: 'no-explicit-any 檢查程式中直接宣告的 any。',
      id: 'day-29-04',
      number: 4,
    },
    {
      kind: 'code-fill',
      learningGoal: '明確處理找不到餐點的結果',
      prompt: '補上找不到餐點時的狀態字串。請使用雙引號。',
      hint: '對照 MenuResult 的失敗分支。',
      acceptedAnswers: ['"not_found"'],
      explanation: '找不到餐點時回傳 not_found，讓後續程式先判斷結果。',
      code: 'if (!pizza) return { status: ____ };',
      id: 'day-29-05',
      number: 5,
    },
  ],
};
