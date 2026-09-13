import { QuizDefinition } from './quiz.models';

export const dayElevenQuiz: QuizDefinition = {
  id: 'day-11',
  day: 11,
  title: 'Narrowing：讓程式流程證明型別',
  estimatedMinutes: 12,
  questions: [
    {
      id: 'day-11-01',
      number: 1,
      kind: 'choice',
      learningGoal: '理解 union 與 narrowing 的分工',
      prompt:
        'string | string[] 已經列出 answer 的可能型別。為什麼函式仍需要 typeof 或 Array.isArray 之類的判斷？',
      hint: '先區分「列出所有可能」和「目前這條程式路徑剩下哪一種」。',
      options: [
        { id: 'A', label: '因為 union 只在 Runtime 產生陣列，不能描述字串' },
        { id: 'B', label: '因為 narrowing 會把資料轉換成另一個 Runtime 值' },
        { id: 'C', label: '因為 union 列出所有可能，判斷式才能讓 TypeScript 在目前分支排除不可能的型別' },
        { id: 'D', label: '因為 TypeScript 不支援 string 與 string[] 同時出現' },
      ],
      correctAnswer: 'C',
      explanation:
        'string | string[] 表示 answer 可能是字串或字串陣列；在沒有判斷以前，兩種可能都必須被考慮。Runtime 的條件判斷提供程式流程證據，TypeScript 才能在分支中把型別縮小。這個過程不會轉換值，也不會把 union 變成 Runtime 物件。',
    },
    {
      id: 'day-11-02',
      number: 2,
      kind: 'choice',
      learningGoal: '判斷 typeof narrowing 後的執行結果',
      prompt: '執行以下 TypeScript 程式，formatScore(9) 會回傳什麼？',
      hint: '先判斷 9 會進入哪個分支，再看 toFixed(1) 如何格式化數字。',
      code: 'function formatScore(score: string | number): string {\n  if (typeof score === "number") {\n    return score.toFixed(1);\n  }\n\n  return score.trim();\n}\n\nformatScore(9);',
      options: [
        { id: 'A', label: '"9"' },
        { id: 'B', label: '"9.0"' },
        { id: 'C', label: '9' },
        { id: 'D', label: '編譯期錯誤，因為 score 同時可能是字串' },
      ],
      correctAnswer: 'B',
      explanation:
        'typeof 9 是 "number"，因此進入第一個分支。toFixed(1) 回傳保留一位小數的字串，所以結果是 "9.0"。',
    },
    {
      id: 'day-11-03',
      number: 3,
      kind: 'choice',
      learningGoal: '辨識 typeof null === "object" 造成的 narrowing 不足',
      prompt: '以下函式的 if 判斷為什麼不足？',
      hint: '回想 typeof null 的結果，再檢查 for...of 是否能處理 null。',
      code: 'function printItems(items: string[] | null): void {\n  if (typeof items === "object") {\n    for (const item of items) {\n      console.log(item);\n    }\n  }\n}',
      options: [
        { id: 'A', label: 'typeof 永遠不能用來縮小 union' },
        { id: 'B', label: 'string[] 不是 object，所以永遠不會進入 if' },
        { id: 'C', label: 'typeof null 也是 "object"，條件沒有排除 null' },
        { id: 'D', label: 'for...of 只能走訪字串，不能走訪陣列' },
      ],
      correctAnswer: 'C',
      explanation:
        '在 JavaScript 中 typeof null 是 "object"，所以 typeof items === "object" 仍可能讓 items 是 null。在 strictNullChecks 下，TypeScript 也會指出 for...of 仍可能收到 null；需要另外排除 null，或使用 Array.isArray 判斷陣列，才能讓條件更精確。',
    },
    {
      id: 'day-11-04',
      number: 4,
      kind: 'exact-text',
      learningGoal: '辨識根據 property 是否存在進行 narrowing 的運算子',
      prompt: '要檢查 question 是否具有 options 這個 property，文章使用哪一個 JavaScript 運算子？只輸入運算子名稱。',
      hint: '回看判斷式 "options" ____ question。',
      acceptedAnswers: ['in'],
      explanation:
        'in 會在 Runtime 檢查某個 property 是否存在於物件或其 prototype chain，TypeScript 也會利用這個結果縮小 object union。',
    },
    {
      id: 'day-11-05',
      number: 5,
      kind: 'code-fill',
      learningGoal: '用 typeof 將字串與數字分開',
      prompt: '請補上判斷式，讓 formatScore 在 score 是數字時使用 toFixed(1)。',
      hint: '條件要在 Runtime 判斷 score 是否為 number，並讓 TypeScript 在分支內知道這件事。',
      code: 'function formatScore(score: string | number): string {\n  if (____) {\n    return score.toFixed(1);\n  }\n\n  return score.trim();\n}',
      acceptedAnswers: ['typeof score === "number"', "typeof score === 'number'"],
      explanation:
        'typeof score === "number" 會在數字分支成立，TypeScript 會把該分支的 score 縮小成 number，因此可以呼叫 toFixed(1)；另一個分支則剩下 string。',
    },
  ],
};