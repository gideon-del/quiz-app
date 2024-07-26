<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import supabaseClient from '@/utils/superbase'
import useQuiz, { type Quiz } from '@/stores/quiz'
import { storeToRefs } from 'pinia'
const route = useRoute()
const quizStore = useQuiz()
const quizSessionId = route.params.quizId
const quizNumber = ref(+route.params.question)
const answer = ref('')
const { quizes } = storeToRefs(quizStore)
const loading = ref(true)
const currentQuiz = ref(quizes.value[+route.params.question - 1])
const canSubmit = ref(quizes.value.every((quiz) => quiz.user_answer.length > 0))
const { replace } = useRouter()
const gettingQuizzes = async () => {
  try {
    loading.value = true
    const quizes = await supabaseClient.from('quiz').select(`
    id,
    question,
    correct_answer,
    options (answer,letter)
    `)
    const answered = await supabaseClient
      .from('answers')
      .select(' user_answer, quiz_id')
      .eq('quiz_session', quizSessionId)

    const transformedQuizes: Quiz[] = quizes.data!.map((quiz) => {
      const quizExists = answered.data?.find((answeredQuiz) => answeredQuiz.quiz_id === quiz.id)
      return {
        quiz: quiz,
        user_answer: quizExists?.user_answer || ''
      }
    })

    quizStore.fillQuiz(transformedQuizes)
    answer.value = transformedQuizes[quizNumber.value - 1].user_answer
    currentQuiz.value = transformedQuizes[+route.params.question - 1]
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}
const updateSupabase = async (quizNum: number) => {
  try {
    loading.value = true
    await supabaseClient.from('answers').upsert(
      {
        quiz_session: quizSessionId,
        quiz_id: currentQuiz.value.quiz.id,
        user_answer: answer.value
      },
      {
        onConflict: `quiz_id, quiz_session`
      }
    )
    await supabaseClient
      .from('quiz_session')
      .update({
        last_attempted: quizNum
      })
      .eq('id', quizSessionId)

    quizStore.updateQuiz(currentQuiz.value.quiz.id, answer.value)

    const prevQuiz = quizes.value[quizNum - 1]
    currentQuiz.value = prevQuiz
    quizNumber.value = quizNum
    answer.value = prevQuiz.user_answer
    canSubmit.value = quizes.value.every((quiz) => quiz.user_answer.length > 0)
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}
const submitQuiz = async () => {
  try {
    let score = 0
    quizes.value.forEach((quiz) => {
      if (quiz.quiz.correct_answer === quiz.user_answer) {
        score = score + 1
      }
    })
    await supabaseClient
      .from('quiz_session')
      .update({
        is_finished: true
      })
      .eq('id', quizSessionId)
    await supabaseClient.from('results').insert({
      quiz_session: quizSessionId,
      score
    })
    replace('/')
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}
const saveAnswer = async () => {
  try {
    loading.value = true
    const nextQuiz = Math.min(quizNumber.value + 1, quizes.value.length)
    await updateSupabase(nextQuiz)
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

const previousQuiz = async () => {
  try {
    loading.value = true
    const prevQuizNumber = Math.max(quizNumber.value - 1, 1)
    await updateSupabase(prevQuizNumber)
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  gettingQuizzes()
})
</script>

<template>
  <div
    class="from-purple-600/30 to-purple-300/20 bg-gradient-to-br min-h-screen flex flex-col items-center justify-center"
  >
    <div v-if="quizes.length > 0 || !loading" class="flex items-start gap-10 w-full">
      <div
        class="bg-white px-4 py-4 rounded-md max-w-lg relative mx-auto w-full flex flex-col gap-4"
      >
        <div
          class="absolute w-full h-full top-0 left-0 bg-white/60 flex items-center justify-center"
          v-if="loading"
        >
          <div
            class="border-2 border-black animate-spin border-r-transparent w-10 h-10 rounded-full"
          ></div>
        </div>
        <h1 class="text-xl font-bold">Question {{ quizNumber }}</h1>
        <p class="text-lg font-semibold">{{ currentQuiz.quiz.question }}</p>
        <div class="flex flex-col gap-3">
          <div
            v-bind:key="quiz.answer"
            v-for="quiz in currentQuiz.quiz.options"
            class="flex-row gap-3 items-center flex bg-white peer-checked:bg-green-300 border peer border-gray-400 py-3 rounded-lg text-lg px-3"
          >
            <input
              type="radio"
              :value="quiz.letter"
              :name="currentQuiz.quiz.question"
              :id="quiz.answer"
              v-model="answer"
              class="peer"
            />
            <label :for="quiz.answer" class="text-slate-500 font-medium flex-1 px-3 cursor-pointer"
              >{{ quiz.letter }}{{ ')   ' }} {{ quiz.answer }}</label
            >
          </div>
        </div>
        <div class="flex flex-row gap-3 items-center justify-center">
          <button
            class="bg-black text-white rounded-md py-2 px-3 min-w-20"
            @click="previousQuiz"
            :disabled="loading"
          >
            Prev
          </button>
          <button
            class="bg-black text-white rounded-md py-2 px-3 min-w-20"
            @click="saveAnswer"
            :disabled="loading"
          >
            Next
          </button>
        </div>
      </div>
      <div class="basis-1/3">
        <div class="flex flex-wrap gap-3 my-6">
          <button
            v-for="quizNum in quizes.length"
            :key="quizNum"
            class="flex flex-col border w-10 border-black text-center pt-1 items-center justify-between rounded-md"
            @click="
              () => {
                if (quizNum !== quizNumber) {
                  updateSupabase(quizNum)
                }
              }
            "
          >
            <span :class="`text-center block ${quizNumber === quizNum && 'underline'}`">{{
              quizNum
            }}</span>
            <div
              class="bg-gray-600 h-5 w-full self-stretch"
              v-if="quizes[quizNum - 1].user_answer.length > 0"
            ></div>
          </button>
        </div>
        <button v-if="canSubmit" class="underline" :disabled="loading" @click="submitQuiz">
          Submit Quiz
        </button>
      </div>
    </div>
  </div>
</template>
