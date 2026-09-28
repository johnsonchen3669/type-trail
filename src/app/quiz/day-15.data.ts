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
      learningGoal: '區分描述物件的兩種寫法與執行時驗證',
      prompt: '只需要描述具有字串 id、prompt 的題目物件，沒有其他擴充需求。以下哪個說法正確？',
      hint: '比較兩種宣告對必要欄位的要求，再想想編譯後是否會留下檢查程式。',
      options: [
        {
          id: 'A',
          label: '只有 interface 能要求物件提供必要欄位',
        },
        {
          id: 'B',
          label: 'interface 與 type 都能描述這個物件，但都不會在執行時自動驗證資料',
        },
        {
          id: 'C',
          label: '使用 type 描述物件，就不能使用 readonly 或可選欄位',
        },
        {
          id: 'D',
          label: '使用 interface 宣告後，執行時會自動補上缺少的 prompt',
        },
      ],
      correctAnswer: 'B',
      explanation:
        '兩者都能描述物件欄位，並支援可選欄位與 readonly。單純描述物件時可沿用專案慣例；兩種宣告都會在編譯後移除，不會新增執行時驗證。',
    },
    {
      id: 'day-15-02',
      number: 2,
      kind: 'choice',
      learningGoal: '判斷宣告合併後哪些欄位仍可省略',
      prompt: '以下程式放在同一個模組內，以 strict 設定檢查。TypeScript 會如何判斷？',
      hint: '合併兩份宣告後，檢查每個欄位原本是否為必填。',
      code: 'interface QuizCard {\n  prompt: string;\n}\n\ninterface QuizCard {\n  showHint?: boolean;\n}\n\nconst card: QuizCard = { prompt: "哪種寫法符合需求？" };',
      options: [
        {
          id: 'A',
          label: '通過檢查；合併後 prompt 必填，showHint 仍可省略',
        },
        {
          id: 'B',
          label: '編譯期錯誤；合併後所有欄位都變成必填',
        },
        {
          id: 'C',
          label: '編譯期錯誤；同名介面不能再次宣告',
        },
        {
          id: 'D',
          label: '通過檢查；第二份宣告覆蓋第一份',
        },
      ],
      correctAnswer: 'A',
      explanation:
        '同一作用域的兩份 QuizCard 介面會合併，但不會改變欄位原本的可選性。card 提供必要的 prompt，省略可選的 showHint 仍能通過檢查；執行時也不會自動補入這個欄位。',
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
        '交集要求同時滿足兩側型別，不會覆蓋欄位。id 的 string 與 number 要求衝突，結果是 never；填入字串或數字都不能通過。若需求是改變 ID 規格，應重新整理模型；& 不能拿來覆蓋原欄位。',
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
        'type 可以替聯集命名，例如 type Question = ChoiceQuestion | FillQuestion。interface 不能直接替這個聯集命名。',
    },
    {
      id: 'day-15-05',
      number: 5,
      kind: 'code-fill',
      learningGoal: '用介面延伸保留基礎物件的要求',
      prompt:
        '請補上一個關鍵字，讓 ChoiceQuestion 保留 BaseQuestion 的必要欄位，並增加選擇題的欄位。',
      hint: '新介面要保留 BaseQuestion 的欄位，先想它們之間的關係。',
      code: 'interface BaseQuestion {\n  id: string;\n  prompt: string;\n}\n\ninterface ChoiceQuestion ____ BaseQuestion {\n  type: "choice";\n  options: string[];\n}',
      acceptedAnswers: ['extends'],
      explanation:
        'extends 讓 ChoiceQuestion 保留 BaseQuestion 的 id、prompt 要求，再加入 type 與 options。它描述型別關係，不會在執行時建立物件或補入資料。',
    },
  ],
};
