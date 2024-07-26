import { createRouter, createWebHistory, type RouteLocationNormalizedGeneric } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import SingleQuiz from '../views/quiz/SingleQuiz.vue'
import OnGoingTest from '../views/quiz/OnGoingQuiz.vue'
import supabaseClient from '@/utils/superbase'
const isAuthenticated = async (to: RouteLocationNormalizedGeneric) => {
  try {
    if (to.path === '/login' || to.path === '/register') return { path: to.fullPath }
    const {
      data: { user },
      error
    } = await supabaseClient.auth.getUser()
    if (error) return { path: '/login' }
    if (!user) return { path: '/login' }
    console.log(to)
  } catch (error) {
    console.log(error)
  }
}
const checkQuizSessionStatus = async (to: RouteLocationNormalizedGeneric) => {
  try {
    const {
      params: { quizId }
    } = to
    const quizSession = await supabaseClient
      .from('quiz_session')
      .select('is_finished')
      .eq('id', quizId)
    console.log(quizSession)
    if (!quizSession.data) return false

    if (quizSession.data[0].is_finished)
      return {
        path: `/quiz/result/${quizId}`
      }
  } catch (error) {
    return false
  }
}
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },

    {
      path: '/login',
      name: 'Login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView
    },
    {
      path: '/quiz',
      children: [
        {
          path: '/:quizId/ongoing/:question',
          component: OnGoingTest,
          name: 'Quiz',
          beforeEnter: [isAuthenticated, checkQuizSessionStatus]
        }
      ]
    },
    {
      path: '/result/:quizId',
      component: SingleQuiz,
      name: 'Quiz',
      beforeEnter: [isAuthenticated]
    }
  ]
})

export default router
