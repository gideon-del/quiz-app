import { defineStore } from 'pinia'

const useQuiz = defineStore('quiz', {
  state: () => ({
    quizes: [] as Quiz[]
  }),
  actions: {
    updateQuiz(quizId: string, userAnswer: string) {
      this.quizes = this.quizes.map((quiz) =>
        quiz.quiz.id === quizId ? { ...quiz, user_answer: userAnswer } : quiz
      )
      console.log(this.quizes)
    },
    fillQuiz(quiz: Quiz[]) {
      this.quizes = quiz
    }
  }
})

export type Quiz = {
  quiz: {
    id: string
    question: string
    correct_answer: string
    options: {
      answer: string
      letter: string
    }[]
  }
  user_answer: string
}

export default useQuiz
