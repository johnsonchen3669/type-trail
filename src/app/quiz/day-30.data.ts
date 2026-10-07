import { QuizDefinition } from './quiz.models';

export const dayThirtyQuiz: QuizDefinition = {
  id: 'day-30',
  day: 30,
  title: 'MCP：連接工具與 AI 應用程式',
  estimatedMinutes: 12,
  questions: [
    {
      number: 1,
      kind: 'choice',
      learningGoal: '區分代理流程與 MCP 的責任',
      prompt: '在使用 MCP 的 AI 代理應用程式中，哪一項由主機應用程式負責？',
      hint: 'MCP 統一通訊介面，仍需要程式管理工作的進度。',
      options: [
        {
          id: 'A',
          label: '只要接上 MCP，任務就一定完成',
        },
        {
          id: 'B',
          label: '由伺服器自動決定所有模型呼叫',
        },
        {
          id: 'C',
          label: '保存代理狀態，安排模型呼叫並設定停止條件',
        },
        {
          id: 'D',
          label: '讓輸出 Schema 核准發布操作',
        },
      ],
      correctAnswer: 'C',
      explanation: '主機管理模型互動、上下文、狀態與停止條件；MCP 提供工具發現與呼叫的通訊方式。',
      id: 'day-30-01',
    },
    {
      number: 2,
      kind: 'choice',
      learningGoal: '讀取通過驗證的 MCP 結構化結果',
      prompt: '以下是成功工具結果的簡化資料。程式會輸出什麼？沿用文章的 QuestionSchema。',
      hint: '分別看供人閱讀的文字與供程式讀取的結構化結果。',
      options: [
        {
          id: 'A',
          label: '工具完成',
        },
        {
          id: 'B',
          label: '哪個運算子取得型別的鍵名？',
        },
        {
          id: 'C',
          label: 'undefined',
        },
        {
          id: 'D',
          label: 'q31',
        },
      ],
      correctAnswer: 'B',
      explanation:
        '程式驗證並讀取 structuredContent，所以輸出其中的 prompt。content 的文字沒有被用來取得題幹。',
      code: 'const result = {\n  content: [{ type: "text", text: "工具完成" }],\n  structuredContent: {\n    id: "q31",\n    prompt: "哪個運算子取得型別的鍵名？",\n  },\n};\n\nconst question = QuestionSchema.parse(result.structuredContent);\nconsole.log(question.prompt);',
      id: 'day-30-02',
    },
    {
      number: 3,
      kind: 'choice',
      learningGoal: '辨識 stdio 的通訊邊界',
      prompt: '伺服器使用 StdioServerTransport，卻在處理工具時執行下列程式。問題在哪裡？',
      hint: '標準輸出在這個傳輸方式中負責什麼？',
      options: [
        {
          id: 'A',
          label: '工具函式不能有除錯訊息',
        },
        {
          id: 'B',
          label: '中文字不能透過 MCP 傳輸',
        },
        {
          id: 'C',
          label: '標準輸出只允許題目文字',
        },
        {
          id: 'D',
          label: '除錯文字寫入協定通訊管道，可能干擾訊息解析',
        },
      ],
      correctAnswer: 'D',
      explanation:
        'stdio 的標準輸出供 MCP 協定訊息使用。除錯文字應改用 console.error，送到標準錯誤輸出。',
      code: 'console.log("開始查詢題庫");',
      id: 'day-30-03',
    },
    {
      number: 4,
      kind: 'exact-text',
      learningGoal: '辨識 MCP 工具結果的結構化資料欄位',
      prompt: 'MCP 工具結果中，哪個欄位存放供程式使用的結構化資料？只填欄位名稱。',
      hint: '文章的用戶端會把這個欄位交給 QuestionSchema.parse。',
      acceptedAnswers: ['structuredContent'],
      explanation: 'structuredContent 提供結構化結果；用戶端可以依預期的資料 Schema 驗證它。',
      id: 'day-30-04',
    },
    {
      number: 5,
      kind: 'code-fill',
      learningGoal: '在使用 MCP 成功結果前處理工具錯誤',
      prompt: '補上 MCP 結果的錯誤旗標名稱，工具回報失敗時就停止讀取成功資料。',
      hint: '區分工具回報的失敗與連線拋出的例外。',
      acceptedAnswers: ['isError'],
      explanation:
        'isError 表示工具執行失敗。先處理這個旗標，再驗證成功結果；連線與驗證例外則由外層 catch 處理。',
      code: 'const result = await client.callTool({\n  name: "get_question",\n  arguments: { questionId: "q30" },\n});\n\nif (result.____) throw new Error("查題失敗");\nconst question = QuestionSchema.parse(result.structuredContent);',
      id: 'day-30-05',
    },
  ],
};
