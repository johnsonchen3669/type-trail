import { QuizDefinition } from './quiz.models';

export const dayTwentySevenQuiz: QuizDefinition = {
  id: 'day-27',
  day: 27,
  title: '如何審查 AI 生成的 TypeScript？',
  estimatedMinutes: 12,
  questions: [
    {
      id: 'day-27-01',
      number: 1,
      kind: 'choice',
      learningGoal: '選出生成程式碼審查的有效順序',
      prompt: '收到一段自稱能判分的 TypeScript，哪種驗收方式最符合本文？',
      hint: '先看現有函式簽名，再看執行時輸入與失敗案例。',
      options: [
        {
          id: 'A',
          label: '只確認程式含有型別標註，就可視為安全',
        },
        {
          id: 'B',
          label: '先對照需求與既有契約，再編譯、查資料邊界，最後用成功與失敗案例驗收',
        },
        {
          id: 'C',
          label: '只測答對一題，其他分支等使用者回報',
        },
        {
          id: 'D',
          label: '把每個值加上 as，讓編譯器不要阻擋驗收',
        },
      ],
      correctAnswer: 'B',
      explanation:
        '編譯只能查已宣告的型別關係；審查還須核對實際 API、外部資料、缺值、結果契約與失敗案例。',
    },
    {
      id: 'day-27-02',
      number: 2,
      kind: 'choice',
      learningGoal: '依既有介面辨認不存在的方法',
      prompt: '依下列已宣告的介面，TypeScript 會對哪一行報錯？',
      hint: '比較方法的完整名稱。',
      code: 'interface QuestionRepository {\n  findById(id: string): Promise<QuestionEntity | null>;\n}\n\nasync function load(repo: QuestionRepository) {\n  return repo.getById("q-1");\n}',
      options: [
        {
          id: 'A',
          label: 'findById 的宣告，因為它回傳 Promise',
        },
        {
          id: 'B',
          label: 'repo.getById("q-1")，因為介面沒有 getById',
        },
        {
          id: 'C',
          label: '"q-1"，因為字串不能當編號',
        },
        {
          id: 'D',
          label: 'async function，因為函式不能讀取介面',
        },
      ],
      correctAnswer: 'B',
      explanation:
        '既有契約只宣告 findById；getById 是沒有根據的 API 名稱，應先對照介面或第一方文件。',
    },
    {
      id: 'day-27-03',
      number: 3,
      kind: 'choice',
      learningGoal: '辨認斷言與非空斷言留下的 Runtime 風險',
      prompt: '以下程式即使修正方法名稱，還有哪些風險？',
      hint: 'as 有沒有讀取資料？! 有沒有在執行時建立題目？',
      code: 'const answer = raw as AnswerInput;\nconst question = await repository.findById(answer.questionId);\nreturn question!.correctOptionIndex === answer.optionIndex;',
      options: [
        {
          id: 'A',
          label: 'as 與 ! 都會在執行時驗證資料，沒有風險',
        },
        {
          id: 'B',
          label: 'raw 未驗證，且找不到題目時仍可能讀取 null 的欄位',
        },
        {
          id: 'C',
          label: 'await 會把題目自動轉成字串',
        },
        {
          id: 'D',
          label: 'correctOptionIndex 會自動檢查選項範圍',
        },
      ],
      correctAnswer: 'B',
      explanation: '型別斷言與非空斷言不會驗證輸入，也不會消除執行時的 null。',
    },
    {
      id: 'day-27-04',
      number: 4,
      kind: 'exact-text',
      learningGoal: '辨識未驗證外部輸入的起始型別',
      prompt: '本文讓尚未驗證的作答資料進入 checkAnswer 時，參數使用哪個型別？',
      hint: '呼叫端可能送來任何值，程式必須先檢查才能讀取欄位。',
      acceptedAnswers: ['unknown'],
      explanation: 'unknown 讓資料先進入程式，但要求透過檢查函式證明其形狀後才能安全使用。',
    },
    {
      id: 'day-27-05',
      number: 5,
      kind: 'code-fill',
      learningGoal: '把找不到題目轉為明確結果',
      prompt: '依本文修正版的結果契約，補上題目不存在時的錯誤代碼。',
      hint: '這個分支在判分之前結束，不應當成答錯。',
      code: 'const question = await repository.findById(raw.questionId);\nif (question === null) {\n  return { ok: false, code: "____" };\n}',
      acceptedAnswers: ['QUESTION_NOT_FOUND'],
      explanation: '明確錯誤代碼讓呼叫端區分題目不存在與答錯。',
    },
  ],
};
