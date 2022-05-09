<template>
  <div class="create-exam-page xs:px-8 py-6 px-4">
    <div class="page-top flex flex-row items-center justify-between">
      <button
        @click="goBack()"
        class="go-back transition-all flex items-center justify-center text-white text-2xl ease-linear duration-75 hover:-translate-y-1 mr-5 hover:shadow-lg font-bold bg-blue rounded px-3 py-2"
      >
        <ion-icon name="chevron-back-outline" class="m-1"></ion-icon>
      </button>
      <h1 class="title text-xl font-bold">Imtihon ochish</h1>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const goBack = () => {
      router.go(-1);
    };

    let exam = reactive({});

    return { goBack };
  },
};
</script>

<style></style>
