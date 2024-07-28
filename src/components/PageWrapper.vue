<script setup lang="ts">
import supabaseClient from '@/utils/superbase'
import { useRouter } from 'vue-router'
const { replace } = useRouter()
const logout = async () => {
  await supabaseClient.auth.signOut()
  replace('/login')
}
</script>
<template>
  <div class="flex flex-col gap-3 min-h-screen">
    <header class="sticky px-4 top-0 left-0 right-0 border-b z-50 bg-white mb-10">
      <nav class="max-w-6xl py-4 mx-auto flex justify-between items-center">
        <RouterLink to="/" class="flex items-center gap-3">
          <h2 class="text-base font-bold">SecureQuiz</h2>
        </RouterLink>
        <button
          @click="logout"
          class="flex items-center justify-center rounded-xl font-bold gap-3 bg-black text-white max-w-28 py-2 w-full text-center"
        >
          Logout
        </button>
      </nav>
    </header>
    <slot></slot>
  </div>
</template>
