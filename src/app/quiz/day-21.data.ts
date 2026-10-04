import { QuizDefinition } from './quiz.models';

export const dayTwentyOneQuiz: QuizDefinition = {
  id: 'day-21', day: 21, title: '映射型別、條件型別與元組', estimatedMinutes: 12,
  questions: [
    { id: 'day-21-01', number: 1, kind: 'choice', learningGoal: '理解映射型別會依鍵名建立新欄位', prompt: 'type Flags<T> = { [Key in keyof T]: boolean } 最準確的描述是什麼？', hint: '先看 in keyof T 取得的是鍵名還是值。', options: [{ id: 'A', label: '依 T 的每個鍵建立 boolean 欄位' }, { id: 'B', label: '把 T 的所有值在執行時改成 boolean' }, { id: 'C', label: '只保留 T 中值為 boolean 的欄位' }, { id: 'D', label: '讓 T 的所有欄位變成選填' }], correctAnswer: 'A', explanation: '映射型別遍歷 keyof T 的鍵名，並為每個鍵產生指定的值型別；它不會在執行時改變物件。' },
    { id: 'day-21-02', number: 2, kind: 'choice', learningGoal: '判斷 -? 移除選填修飾', prompt: '以下型別中，Complete 的 prompt 是否可以省略？', hint: '? 前的負號會如何處理來源修飾子？', code: 'interface Draft {\n  prompt?: string;\n  answer?: string;\n}\n\ntype Complete = {\n  [Key in keyof Draft]-?: Draft[Key];\n};', options: [{ id: 'A', label: '可以，因為 -? 會新增選填' }, { id: 'B', label: '不可以，-? 會移除選填修飾' }, { id: 'C', label: '可以，因為映射型別只檢查鍵名' }, { id: 'D', label: '不可以，因為 Complete 沒有任何欄位' }], correctAnswer: 'B', explanation: '-? 會移除來源欄位的選填設定，所以 Complete 的 prompt 與 answer 都必須存在；它不會替物件補值。' },
    { id: 'day-21-03', number: 3, kind: 'choice', learningGoal: '辨識映射型別不會建立執行時資料', prompt: '以下程式的問題是什麼？', hint: '比較函式實際回傳的值與宣告的結果型別。', code: 'type Flags<T> = { [Key in keyof T]: boolean };\n\nfunction makeFlags<T>(value: T): Flags<T> {\n  return value;\n}', options: [{ id: 'A', label: 'keyof 只能用在 interface' }, { id: 'B', label: '映射型別會在執行時自動把 value 轉成旗標' }, { id: 'C', label: 'value 沒有被實作成包含 boolean 欄位的 Flags<T>，宣告與回傳值不相符' }, { id: 'D', label: '泛型不能搭配映射型別' }], correctAnswer: 'C', explanation: '映射型別只建立型別；泛型 T 的欄位不保證是 boolean，直接回傳 value 無法符合 Flags<T>。' },
    { id: 'day-21-04', number: 4, kind: 'exact-text', learningGoal: '判斷條件型別的結果', prompt: 'type FieldKind<T> = T extends boolean ? "checkbox" : "input" 中，FieldKind<number> 的結果是什麼？只填字串內容，不加引號。', hint: '判斷 number 是否可以指定給 boolean，再選擇對應分支。', acceptedAnswers: ['input'], explanation: 'number 無法指定給 boolean，所以採用不成立的分支，結果是 "input"。' },
    { id: 'day-21-05', number: 5, kind: 'code-fill', learningGoal: '依元組的位置指定型別', prompt: '請補上型別，讓這個元組的第一個元素是字串、第二個元素是數字。', hint: '元組中的型別依序對應各個位置的元素。', code: 'const entry: [string, ____] = ["剩餘題數", 5];', acceptedAnswers: ['number'], explanation: '第二個位置指定為 number，因此該位置接受數字；第一個位置的 string 則要求字串。' },
  ],
};
