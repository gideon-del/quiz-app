import { createRouter, createWebHistory, type RouteLocationNormalizedGeneric } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import SingleQuiz from '../views/quiz/SingleQuiz.vue'
import OnGoingTest from '../views/quiz/OnGoingQuiz.vue'
import supabaseClient from '@/utils/superbase'
import LandingPageView from '@/views/LandingPageView.vue'
const unprotectedRoutes = ['/login', '/register', '/home']

const isAuthenticated = async (to: RouteLocationNormalizedGeneric) => {
  try {
    if (unprotectedRoutes.includes(to.path)) return true
    const {
      data: { user },
      error
    } = await supabaseClient.auth.getUser()
    if (error || !user) return { name: 'SecureQuiz' }
  } catch (error) {
    return { name: 'SecureQuiz' }
  }
}
const isUnAuthenticated = async (to: RouteLocationNormalizedGeneric) => {
  try {
    const {
      data: { user }
    } = await supabaseClient.auth.getUser()

    if (user) return { name: 'home' }
  } catch (error) {
    console.log(error)
    return { name: 'home' }
  }
}
const checkQuizSessionStatus = async (to: RouteLocationNormalizedGeneric) => {
  try {
    const {
      params: { quizId }
    } = to
    const { data: quizSession } = await supabaseClient
      .from('quiz_session')
      .select('is_finished')
      .eq('id', quizId)

    if (!quizSession || quizSession.length == 0) return false

    if (quizSession[0].is_finished) {
      return {
        path: `/quiz/result/${quizId}`
      }
    }
  } catch (error) {
    console.log(error)
    return false
  }
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      beforeEnter: [isAuthenticated]
    },

    {
      path: '/login',
      name: 'Login',
      component: LoginView,
      beforeEnter: isUnAuthenticated
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView,
      beforeEnter: isUnAuthenticated
    },
    {
      path: '/home',
      component: LandingPageView,
      name: 'SecureQuiz'
    },
    {
      path: '/quiz/:quizId/ongoing/:question',
      component: OnGoingTest,
      name: 'Quiz',
      beforeEnter: [isAuthenticated, checkQuizSessionStatus]
    },

    {
      path: '/result/:quizId',
      component: SingleQuiz,
      name: 'Result',
      beforeEnter: [isAuthenticated]
    }
  ]
})

export default router
