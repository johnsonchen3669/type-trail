import { QuizDefinition } from './quiz.models';

export const dayTwentyThreeQuiz: QuizDefinition = {
  id: 'day-23', day: 23, title: 'API 傳來的資料，TypeScript 知道嗎？', estimatedMinutes: 12,
  questions: [
    { id: 'day-23-01', number: 1, kind: 'choice', learningGoal: '分辨型別斷言與執行時驗證', prompt: '執行 payload as Question 時，實際發生什麼事？', hint: '想想這個寫法影響編譯器，還是會讀取執行時資料。', options: [{ id: 'A', label: '執行時逐一檢查 Question 的欄位' }, { id: 'B', label: 'TypeScript 依 Question 檢查後續程式，執行時不會檢查資料' }, { id: 'C', label: '自動替缺少的欄位補上預設值' }, { id: 'D', label: '把數字欄位轉成字串' }], correctAnswer: 'B', explanation: 'as Question 是型別斷言，只影響 TypeScript 編譯期的型別判斷；JavaScript 執行時不會因這行檢查或修改物件。' },
    { id: 'day-23-02', number: 2, kind: 'choice', learningGoal: '判斷 Schema 驗證的結果', prompt: '以下 result.success 的值是什麼？', hint: '依序核對 Schema 要求的每個欄位。', code: `const QuestionSchema = z.object({
  id: z.string(),
  prompt: z.string(),
  type: z.enum(["choice", "fill"]),
});

const result = QuestionSchema.safeParse({
  id: "q-1",
  prompt: 42,
  type: "choice",
});`, options: [{ id: 'A', label: 'true，因為欄位名稱都存在' }, { id: 'B', label: 'false，因為 prompt 必須是字串' }, { id: 'C', label: 'true，因為 TypeScript 會把數字轉成字串' }, { id: 'D', label: 'false，因為 safeParse 只接受 JSON 字串' }], correctAnswer: 'B', explanation: 'Schema 要求 prompt 是字串，實際值是數字，因此驗證失敗，result.success 為 false。' },
    { id: 'day-23-03', number: 3, kind: 'choice', learningGoal: '辨認 Angular HTTP 泛型無法驗證回應', prompt: '以下程式宣告了 API 回應的型別，哪個問題仍未處理？', hint: 'get<Question> 有告訴編譯器什麼？它有檢查伺服器資料嗎？', code: `this.http.get<Question>("/api/question").subscribe((question) => {
  showQuestion(question);
});`, options: [{ id: 'A', label: 'API 回傳值仍未經執行時驗證，泛型只影響 TypeScript 型別檢查' }, { id: 'B', label: 'HttpClient 會先把回應轉成 TypeScript 型別' }, { id: 'C', label: 'subscribe 會刪除所有不符合 Question 的欄位' }, { id: 'D', label: '這個寫法會在編譯時向 API 發送請求' }], correctAnswer: 'A', explanation: 'Angular HttpClient 的泛型參數不會檢查回應內容。要確認實際結構，需讓資料先以 unknown 進入程式，再套用執行時驗證。' },
    { id: 'day-23-04', number: 4, kind: 'exact-text', learningGoal: '選擇外部資料進入程式時的保守型別', prompt: '從 API、JSON 或其他外部來源取得、尚未驗證的值，適合先使用哪個 TypeScript 型別？', hint: '這個型別允許接收任何值，但在檢查前不能任意操作它。', acceptedAnswers: ['unknown'], explanation: 'unknown 可以接收任何輸入，同時要求程式先取得足夠資訊或完成驗證，才能安全使用其欄位。' },
    { id: 'day-23-05', number: 5, kind: 'code-fill', learningGoal: '從 Zod Schema 推導 TypeScript 型別', prompt: '請補上 Zod 提供的工具名稱，讓 Question 從 Schema 推導而來。', hint: '完整寫法是 z. 開頭，泛型內容是 Schema 的型別。', code: 'type Question = z.____<typeof QuestionSchema>;', acceptedAnswers: ['infer'], explanation: 'z.infer<typeof QuestionSchema> 會從 Schema 取得對應的 TypeScript 型別。Schema 描述執行時檢查規則，推導出的型別則供 TypeScript 編譯期使用。' },
  ],
};
