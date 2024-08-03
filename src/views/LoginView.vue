<script setup lang="ts">
import { validateEmail, validatePassword } from '@/utils/helpers'
import supabaseClient from '@/utils/superbase'
import { Field, Form, ErrorMessage } from 'vee-validate'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)
const errorMessage = ref('')
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
            class="border-2 border-gray-500 rounded-lg h-8 px-3 py-2"
          />
          <ErrorMessage name="email" class="text-red-400 font-normal text-sm" />
        </fieldset>
        <fieldset class="flex flex-col space-y-2">
          <label for="pass">Password</label>
          <Field
            label="pass"
            type="text"
            name="password"
            id="pass"
            :rules="validatePassword"
            class="border-2 border-gray-500 rounded-lg h-8 px-3 py-2"
          />
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
