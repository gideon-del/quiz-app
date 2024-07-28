<script setup lang="ts">
import PageWrapper from '@/components/PageWrapper.vue'
import type { Quiz } from '@/stores/quiz'
import supabaseClient from '@/utils/superbase'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const quizId = route.params.quizId
const answers = ref<Quiz[]>([])
const result = ref(0)
const loading = ref(true)
onMounted(() => {
  const getAnswers = async () => {
    try {
      loading.value = true
      const res = await supabaseClient
        .from('answers')
        .select(
          `
          user_answer,
         quiz (id, correct_answer,question, options (letter,answer))`
        )
        .eq('quiz_session', quizId)

      if (!res.data) return
      answers.value = res.data as unknown as Quiz[]
      answers.value.forEach((answer) => {
        if (answer.user_answer === answer.quiz.correct_answer) {
          result.value = result.value + 1
        }
      })
    } catch (error) {
      console.error(error)
    } finally {
      loading.value = false
    }
  }
  getAnswers()
})
</script>
<template>
  <PageWrapper>
    <main class="flex-1 flex flex-col px-4">
      <section v-if="!loading">
        <header class="flex flex-row justify-between items-center max-w-4xl mx-auto mb-20">
          <RouterLink to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-move-left"
            >
              <path d="M6 8L2 12L6 16" />
              <path d="M2 12H22" />
            </svg>
          </RouterLink>
          <h1 class="font-bold text-xl flex-1 text-center">Quiz Result</h1>
          <p
            :class="`font-bold text-2xl ${result < answers.length / 2 ? 'text-red-400' : 'text-green-600'}`"
          >
            {{ `${result} / ${answers.length}` }}
          </p>
        </header>
        <section class="flex flex-col gap-10 max-w-4xl mx-auto">
          <fieldset
            v-for="answer in answers"
            :key="answer.quiz.id"
            class="last:border-none border-b border-gray-500"
          >
            <p class="text-lg font-semibold mb-10">{{ answer.quiz.question }}</p>
            <div class="flex flex-col gap-5">
              <div
                v-for="option in answer.quiz.options"
                :key="option.letter"
                class="flex flex-row gap-5"
              >
                <p
                  :class="`text-lg font-medium rounded-md p-4 w-full ${option.letter === answer.quiz.correct_answer ? 'border-2 bg-green-400 border-green-600' : answer.user_answer !== answer.quiz.correct_answer && answer.user_answer === option.letter ? 'border-2 bg-red-400 border-red-600' : ''}`"
                >
                  {{ `${option.letter}) ${option.answer}` }}
                </p>
              </div>
            </div>
          </fieldset>
        </section>
      </section>
      <div v-if="loading" class="flex-1 flex items-center justify-center">
        <div
          class="w-10 h-10 border border-black border-r-transparent block rounded-full animate-spin"
        ></div>
      </div>
    </main>
  </PageWrapper>
</template>
