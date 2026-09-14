import { QuizDefinition } from './quiz.models';

export const dayFifteenQuiz: QuizDefinition = {
  id: 'day-15',
  day: 15,
  title: 'Interface vs Type：從使用目的判斷',
  estimatedMinutes: 12,
  questions: [
    {
      id: 'day-15-01',
      number: 1,
      kind: 'choice',
      learningGoal: '區分物件契約的語法選擇與 Runtime 驗證',
      prompt: '只需要描述具有字串 id、prompt 的題目物件，沒有其他擴充需求。以下哪個說法正確？',
      hint: '比較兩種宣告對必要欄位的要求，再想想編譯後是否會留下檢查程式。',
      options: [
        {
          id: 'A',
          label: '只有 interface 能要求物件提供必要欄位',
        },
        {
          id: 'B',
          label: 'interface 與 type 都能描述這個物件，但都不會自動驗證 Runtime 資料',
        },
        {
          id: 'C',
          label: '使用 type 描述物件，就不能使用 readonly 或可選欄位',
        },
        {
          id: 'D',
          label: '使用 interface 描述物件前，必須先建立 class',
        },
      ],
      correctAnswer: 'B',
      explanation:
        '兩者都能描述物件欄位，並支援可選欄位與 readonly。單純描述物件時可沿用專案慣例；兩種宣告都會在編譯後移除，不會新增 Runtime 驗證。',
    },
    {
      id: 'day-15-02',
      number: 2,
      kind: 'choice',
      learningGoal: '判斷宣告合併後的必要欄位',
      prompt: '以下程式放在同一個模組內，以 strict 設定檢查。TypeScript 會如何判斷？',
      hint: '確認兩份同名宣告是互相覆蓋，還是一起構成同一份要求。',
      code: 'interface QuizSettings {\n  title: string;\n}\n\ninterface QuizSettings {\n  showHint: boolean;\n}\n\nconst settings: QuizSettings = { title: "每日五問" };',
      options: [
        {
          id: 'A',
          label: '通過檢查，第二份宣告只用來補充文件',
        },
        {
          id: 'B',
          label: '同名 interface 一定造成重複名稱的編譯期錯誤',
        },
        {
          id: 'C',
          label: '編譯期錯誤，settings 缺少合併後要求的 showHint',
        },
        {
          id: 'D',
          label: '通過檢查，Runtime 會自動補上 showHint: false',
        },
      ],
      correctAnswer: 'C',
      explanation:
        '同一作用域的兩份 QuizSettings 介面會合併，title 與 showHint 都是必要欄位。只有 title 的物件不符合要求；宣告合併也不會在 Runtime 補入預設值。',
    },
    {
      id: 'day-15-03',
      number: 3,
      kind: 'choice',
      learningGoal: '辨識把交集誤認為欄位覆蓋的錯誤',
      prompt: '開發者希望把題目 ID 從字串改為數字，寫出以下程式。問題出在哪裡？',
      hint: '同一個欄位經過 & 組合後，必須滿足哪幾份要求？',
      code: 'type StoredQuestion = {\n  id: string;\n  prompt: string;\n};\n\ntype NumberQuestion = StoredQuestion & { id: number };\n\nconst question: NumberQuestion = { id: 15, prompt: "選擇答案" };',
      options: [
        {
          id: 'A',
          label: '& 要求 id 同時是 string 與 number，欄位成為 never，數字也無法指定',
        },
        {
          id: 'B',
          label: '& 會覆蓋 id，但必須把 { id: number } 寫在左側才有效',
        },
        {
          id: 'C',
          label: '型別別名不能用來命名交集，所以 NumberQuestion 的宣告語法不合法',
        },
        {
          id: 'D',
          label: '改成 id: "15" 就能同時滿足兩邊的要求',
        },
      ],
      correctAnswer: 'A',
      explanation:
        '交集要求同時滿足兩側型別，不會覆蓋欄位。id 的 string 與 number 要求衝突，結果是 never；填入字串或數字都不能通過。若需求是改變 ID 規格，應重新整理模型，而不是把 & 當成覆蓋操作。',
    },
    {
      id: 'day-15-04',
      number: 4,
      kind: 'exact-text',
      learningGoal: '選擇能替聯集命名的宣告關鍵字',
      prompt:
        '要替 ChoiceQuestion | FillQuestion 這個聯集命名，應使用哪個宣告關鍵字？只填一個小寫英文關鍵字。',
      hint: '回想題庫中「一筆題目可能是哪一種」的模型，是如何替整個聯集取名字的。',
      acceptedAnswers: ['type'],
      explanation:
        'type 可以替聯集命名，例如 type Question = ChoiceQuestion | FillQuestion。interface 不能直接替這個聯集命名；同時延伸兩種題型也不表示二選一。',
    },
    {
      id: 'day-15-05',
      number: 5,
      kind: 'code-fill',
      learningGoal: '用介面延伸保留基礎物件的要求',
      prompt:
        '請補上一個關鍵字，讓 ChoiceQuestion 保留 BaseQuestion 的必要欄位，並增加選擇題的欄位。',
      hint: '這裡需要宣告新介面與既有物件契約的延伸關係。',
      code: 'interface BaseQuestion {\n  id: string;\n  prompt: string;\n}\n\ninterface ChoiceQuestion ____ BaseQuestion {\n  type: "choice";\n  options: string[];\n}',
      acceptedAnswers: ['extends'],
      explanation:
        'extends 讓 ChoiceQuestion 保留 BaseQuestion 的 id、prompt 要求，再加入 type 與 options。它描述型別關係，不會在 Runtime 建立物件或補入資料。',
    },
  ],
};
