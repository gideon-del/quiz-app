<script setup lang="ts"></script>
<template>
  <main class="min-h-screen">
    <section class="min-h-screen hero gap-5 flex flex-col items-center justify-center relative">
      <h1 class="font-bold text-4xl text-white">Boost Your Cyber Security Awareness!</h1>
      <p class="text-xl text-white/70 font-medium">
        Take our quiz to learn and improve your cybersecurity knowledge.
      </p>
      <RouterLink
        to="/register"
        class="bg-black rounded-lg w-full max-w-48 items-center flex justify-center h-14 font-bold text-white"
        >Get Started Now</RouterLink
      >
    </section>
  </main>
</template>

<style scoped>
.hero {
  background-image: url('../assets/hero-img.jpg'),
    linear-gradient(to right, rgba(27, 10, 10, 0.473), rgba(0, 0, 0, 0.8));
  background-position: center;
  background-size: 100% 100%;
  background-blend-mode: overlay;
}
.hero::after {
  content: '';
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
}
</style>
