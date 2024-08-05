<script setup lang="ts">
import { validateEmail, validatePassword } from '@/utils/helpers'
import supabaseClient from '@/utils/superbase'
import { Field, Form, ErrorMessage } from 'vee-validate'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)
const errorMessage = ref('')
const showPassword = ref(false)
const toggleShowPassword = () => {
  showPassword.value = !showPassword.value
}
const onSumbit = async (values: any) => {
  try {
    loading.value = true
    errorMessage.value = ''
    const { error } = await supabaseClient.auth.signInWithPassword({
      email: values.email,
      password: values.password
    })
    if (error) {
      errorMessage.value = error.message
    } else {
      router.replace('/')
    }
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main class="min-h-screen flex flex-col items-center justify-center">
    <section class="w-full max-w-sm px-5">
      <h1 class="font-semibold text-lg text-center">Login</h1>
      <Form @submit="onSumbit" class="flex flex-col gap-3">
        <fieldset class="flex flex-col space-y-2">
          <label for="email">Email</label>
          <Field
            label="email"
            type="email"
            name="email"
            id="email"
            :rules="validateEmail"
            class="border-2 border-gray-500 rounded-lg h-10 px-3 py-2"
          />
          <ErrorMessage name="email" class="text-red-400 font-normal text-sm" />
        </fieldset>
        <fieldset class="flex flex-col space-y-2">
          <label for="pass">Password</label>
          <div class="border-2 border-gray-500 rounded-lg h-10 px-3 py-2 flex">
            <Field
              label="pass"
              :type="showPassword ? 'text' : 'password'"
              name="password"
              id="pass"
              :rules="validatePassword"
              class="flex-1 focus-within:outline-none"
            />
            <button @click="toggleShowPassword" type="button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-eye"
                v-if="showPassword"
              >
                <path
                  d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"
                />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-eye-off"
                v-else
              >
                <path
                  d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"
                />
                <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
                <path
                  d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"
                />
                <path d="m2 2 20 20" />
              </svg>
            </button>
          </div>
          <ErrorMessage name="password" class="text-red-400 font-normal text-sm" />
        </fieldset>
        <p v-if="errorMessage" class="text-red-400">{{ errorMessage }}</p>
        <button
          class="bg-black flex items-center justify-center py-2 rounded-lg text-white mb-4"
          :disabled="loading"
        >
          <span v-if="!loading">Sign in</span>
          <div
            class="w-5 h-5 rounded-full border animate-spin border-white border-r-transparent"
            v-else
          ></div>
        </button>

        <RouterLink to="/register" class="text-blue-600">Create account</RouterLink>
      </Form>
    </section>
  </main>
</template>
