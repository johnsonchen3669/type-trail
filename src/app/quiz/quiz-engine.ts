import { Question, QuizAnswers, QuizDefinition, QuizResult } from './quiz.models';

function normalizeAnswer(answer: string | undefined): string { return answer?.trim() ?? ''; }

export function isQuestionCorrect(question: Question, answer: string | undefined): boolean {
  const normalized = normalizeAnswer(answer);
  if (question.kind === 'choice') return normalized === question.correctAnswer;
  return question.acceptedAnswers.some((accepted) => normalized === accepted);
}

export function gradeQuiz(quiz: QuizDefinition, answers: QuizAnswers): QuizResult {
  const results = quiz.questions.map((question) => ({ questionId: question.id, isCorrect: isQuestionCorrect(question, answers[question.id]) }));
  return { score: results.filter((result) => result.isCorrect).length, total: quiz.questions.length, results };
}
