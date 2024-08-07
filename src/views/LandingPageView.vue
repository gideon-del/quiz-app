<script setup lang="ts"></script>
<template>
  <main class="min-h-screen">
    <section
      class="min-h-screen hero gap-5 px-3 flex flex-col items-center justify-center relative"
    >
      <h1 class="font-bold md:text-4xl text-2xl text-center text-white">
        Boost Your Cyber Security Awareness!
      </h1>
      <p class="md:text-xl text-lg text-white/70 font-medium text-center">
        Take our quiz to learn and improve your cybersecurity knowledge.
      </p>

      <a
        href="https://www.canva.com/design/DAGESTu0EC4/Mdr8Mr3tFbfOy2VBypa8nQ/edit?utm_content=DAGESTu0EC4&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
        target="_blank"
        class="bg-black cursor-pointer rounded-lg w-full max-w-48 items-center flex justify-center h-14 font-bold text-white"
        >Access Training</a
      >
      <RouterLink
        to="/register"
        class="bg-black cursor-pointer rounded-lg w-full max-w-48 items-center flex justify-center h-14 font-bold text-white"
        >Attempt Quiz</RouterLink
      >
    </section>
    <section class="py-10 px-5">
      <h2 class="font-bold text-2xl mb-10 text-center">About SecureQuiz</h2>
      <p class="text-center font-medium text-gray-600 max-w-4xl mx-auto">
        SecureQuiz is dedicated to raising awareness about cybersecurity through engaging and
        educational quizzes. Our mission is to make learning about online safety fun and accessible
        for everyone.Whether you're a beginner or an experienced professional, SecureQuiz provides
        the tools and resources you need to stay safe online."
      </p>
    </section>
    <section class="py-24">
      <h2 class="font-bold text-2xl text-center mb-10">Features</h2>
      <section
        class="flex md:flex-row flex-col max-w-6xl mx-auto gap-10 md:gap-6 items-center justify-between"
      >
        <article class="flex flex-col gap-4 items-center flex-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-message-circle-question"
          >
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <path d="M12 17h.01" />
          </svg>
          <h3 class="font-bold text-black">Interactive Quizzes</h3>
          <p class="text-gray-600 max-w-96 text-center w-full">
            Engage with a variety of questions to test your knowledge
          </p>
        </article>
        <article class="flex flex-col gap-4 items-center flex-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-book-open"
          >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
          <h3 class="font-bold text-black">Educational Resources</h3>
          <p class="text-gray-600 max-w-96 text-center w-full">
            Learn from detailed explanations and resources.
          </p>
        </article>
        <article class="flex flex-col gap-4 items-center flex-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-map"
          >
            <path
              d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"
            />
            <path d="M15 5.764v15" />
            <path d="M9 3.236v15" />
          </svg>
          <h3 class="font-bold text-black">Track Your Progress</h3>
          <p class="text-gray-600 max-w-96 text-center w-full">
            Monitor your improvement over time.
          </p>
        </article>
      </section>
    </section>
    <section class="bg-black text-white py-24">
      <h2 class="font-bold text-2xl text-center mb-10">How It Works</h2>
      <p class="font-medium text-xl text-center mb-8">3. Steps to Get Started:</p>
      <ul
        class="flex md:flex-row flex-col max-w-6xl mx-auto md:gap-6 gap-20 items-center justify-between"
      >
        <li class="flex-col gap-6 items-center flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-user-plus"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <line x1="19" x2="19" y1="8" y2="14" />
            <line x1="22" x2="16" y1="11" y2="11" />
          </svg>
          <h3 class="font-semibold text-lg">Sign Up</h3>

          <RouterLink
            to="/register"
            class="bg-white text-base text-black w-64 flex flex-col items-center justify-center font-bold px-4 h-12 rounded-xl"
            >Create your free account.</RouterLink
          >
        </li>
        <li class="flex-col gap-6 items-center flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-clipboard-list"
          >
            <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            <path d="M12 11h4" />
            <path d="M12 16h4" />
            <path d="M8 11h.01" />
            <path d="M8 16h.01" />
          </svg>

          <h3 class="font-semibold text-lg">Take the Quiz</h3>
          <p class="text-base font-semibold">Answer questions and learn</p>
        </li>
        <li class="flex-col gap-6 items-center flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-file-chart-column"
          >
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            <path d="M8 18v-1" />
            <path d="M12 18v-6" />
            <path d="M16 18v-3" />
          </svg>
          <h3 class="font-semibold text-lg">Review Results</h3>
          <p class="text-base font-semibold">Get detailed feedback.</p>
        </li>
      </ul>
    </section>
    <section class="flex flex-col items-center gap-5 py-20 px-4">
      <h2 class="font-bold text-2xl text-center">Join the Community</h2>
      <p class="font-bold md:text-4xl text-xl max-w-xl text-center mx-auto">
        Ready to become a cybersecurity pro? Join SecureQuiz today!
      </p>
      <button></button>
      <RouterLink
        to="/register"
        class="w-full max-w-72 text-center md:text-xl text-lg bg-black text-white font-bold py-4 rounded-xl"
        >Sign up today</RouterLink
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
</style>
