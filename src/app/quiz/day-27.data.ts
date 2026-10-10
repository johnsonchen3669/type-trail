import { QuizDefinition } from './quiz.models';

export const dayTwentySevenQuiz: QuizDefinition = {
  "id": "day-27",
  "day": 27,
  "title": "如何審查 AI 生成的 TypeScript？",
  "estimatedMinutes": 12,
  "questions": [
    {
      "kind": "choice",
      "learningGoal": "區分工具的檢查責任",
      "prompt": "請 AI 寫驗證函式時，Prompt、Zod 與 Vitest 如何配合？",
      "hint": "分開看工作說明、資料入口與執行案例。",
      "options": [
        {
          "id": "A",
          "label": "Prompt 完整就能省略測試"
        },
        {
          "id": "B",
          "label": "Prompt 說明需求，Zod 驗證資料，Vitest 比較結果與預期"
        },
        {
          "id": "C",
          "label": "Zod 檢查 AI 寫的每一行程式"
        },
        {
          "id": "D",
          "label": "Vitest 通過後就能移除入口驗證"
        }
      ],
      "correctAnswer": "B",
      "explanation": "Prompt 說明功能與規則，Zod 在執行時驗證資料，Vitest 用案例檢查程式行為。",
      "id": "day-27-01",
      "number": 1
    },
    {
      "kind": "choice",
      "learningGoal": "從驗證規則判斷輸入是否可接受",
      "prompt": "補上 1～10 的限制後，下列輸入會通過驗證嗎？",
      "hint": "除了範圍，也要看數量是否符合整數要求。",
      "options": [
        {
          "id": "A",
          "label": "true，因為 2.5 在範圍內"
        },
        {
          "id": "B",
          "label": "false，因為數量必須是整數"
        },
        {
          "id": "C",
          "label": "true，因為數量是 number"
        },
        {
          "id": "D",
          "label": "false，因為備註不能是空字串"
        }
      ],
      "correctAnswer": "B",
      "explanation": "2.5 在 1～10 之間，但不是整數，因此印出 false。",
      "code": "const schema = z.object({\n  pizzaId: z.string(),\n  quantity: z.number().int().min(1).max(10),\n  note: z.string(),\n});\nconsole.log(schema.safeParse({\n  pizzaId: \"margherita\", quantity: 2.5, note: \"\",\n}).success);",
      "id": "day-27-02",
      "number": 2
    },
    {
      "kind": "choice",
      "learningGoal": "辨識需求定義與測試結果的落差",
      "prompt": "Prompt 只要求用 Zod 驗證並寫測試，AI 採用下面的數量規則。若網站實際要求數量為 1～10，應如何調整？",
      "hint": "看 Prompt 有沒有交代一次能買幾個。",
      "options": [
        {
          "id": "A",
          "label": "測試已通過，直接使用這個版本"
        },
        {
          "id": "B",
          "label": "只把測試期待值改成 false，維持程式"
        },
        {
          "id": "C",
          "label": "補充 Prompt 的數量範圍，再調整驗證規則與測試"
        },
        {
          "id": "D",
          "label": "使用 as 將數量指定成 1～10"
        }
      ],
      "correctAnswer": "C",
      "explanation": "先把 1～10 的限制告訴 AI，再請它一起修改程式和測試，讓兩者都依照實際需求檢查。",
      "code": "const QuantitySchema = z.number().int();\nconsole.log(QuantitySchema.safeParse(11).success); // true",
      "id": "day-27-03",
      "number": 3
    },
    {
      "kind": "exact-text",
      "learningGoal": "核對失敗結果與畫面的接法",
      "prompt": "AI 把驗證失敗的回傳欄位改成 messages，畫面卻仍讀取 result.errors。依本文 Demo 的格式，應請 AI 把失敗提示放回哪個欄位？",
      "hint": "驗證函式回傳的欄位，要和畫面讀取的欄位對得上。",
      "acceptedAnswers": [
        "errors"
      ],
      "explanation": "Demo 用 errors 放失敗提示。修改驗證時，要保留畫面使用的回傳格式，或同步修改畫面的接法。",
      "id": "day-27-04",
      "number": 4
    },
    {
      "kind": "code-fill",
      "learningGoal": "確認資料經過 Schema 驗證",
      "prompt": "檢查 AI 的程式是否真的使用 Schema 驗證輸入，補上本文的驗證方法。",
      "hint": "這個方法回傳的結果可以用 success 判斷驗證是否通過。",
      "acceptedAnswers": [
        "safeParse"
      ],
      "explanation": "safeParse 會依 Schema 檢查輸入，並回傳成功或失敗結果。",
      "code": "const result = CartSchema.____(raw);\nif (!result.success) {\n  // 整理錯誤提示\n}",
      "id": "day-27-05",
      "number": 5
    }
  ]
};
