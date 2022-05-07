<template>
  <div class="subject-page xs:px-8 py-6 px-4">
    <nav
      class="top_navigation flex flex-row items-center justify-between mb-10"
    >
      <button
        @click="goBack()"
        class="go-back transition-all flex items-center justify-center text-white text-2xl ease-linear duration-75 hover:-translate-y-1 hover:shadow-lg font-bold bg-blue rounded px-3 py-2"
      >
        <ion-icon name="chevron-back-outline" class="m-1"></ion-icon>
      </button>
    </nav>
    <div v-if="loading" class="loading text-center mt-4 text-2xl">
      Loading...
    </div>
    <div v-else class="subject-container">
      <h1 class="subject-name text-3xl font-bold text-blue">
        {{ subject.name }}
      </h1>
      <p class="subject-class mt-4 opacity-60">
        <b>{{ subject.classNum }}</b> - sinf
      </p>
      <form @submit.prevent class="questions-form mt-5">
        <div
          v-for="(question, index) in subject.questions"
          :key="index"
          class="question-form border border-blue p-4 pb-0 mb-10"
        >
          <p class="number mb-2">{{ index + 1 }}-savol</p>
          <div class="input-group mb-4">
            <input
              required
              type="text"
              class="border outline-none w-full rounded p-3 px-3 py-2 focus:border-blue transition-all"
              placeholder="Savol"
              v-model="question.question"
            />
          </div>
          <div class="input-group mb-10"></div>
          <div class="input-group mb-4">
            <input
              required
              type="text"
              class="border outline-none w-full rounded p-3 px-3 py-2 focus:border-blue transition-all"
              placeholder="A variant"
              v-model="question.optionA"
            />
          </div>
          <div class="input-group mb-4">
            <input
              required
              type="text"
              class="border outline-none w-full rounded p-3 px-3 py-2 focus:border-blue transition-all"
              placeholder="B variant"
              v-model="question.optionB"
            />
          </div>
          <div class="input-group mb-4">
            <input
              required
              type="text"
              class="border outline-none w-full rounded p-3 px-3 py-2 focus:border-blue transition-all"
              placeholder="C variant"
              v-model="question.optionC"
            />
          </div>
          <div class="input-group mb-8">
            <input
              required
              type="text"
              class="border outline-none w-full rounded p-3 px-3 py-2 focus:border-blue transition-all"
              placeholder="D variant"
              v-model="question.optionD"
            />
          </div>
          <div class="input-group mb-4">
            <input
              required
              type="text"
              class="border outline-none w-full rounded p-3 px-3 py-2 focus:border-blue transition-all"
              placeholder="To'g'ri javob"
              v-model="question.answer"
            />
          </div>
          <div class="btns pt-2">
            <button
              type="button"
              @click="updateSubj(id, index)"
              class="update-btn border bg-blue text-white px-5 py-3 mb-7 rounded transition-all ease-linear duration-75 hover:-translate-y-1 hover:shadow-lg disabled:bg-gray mr-2"
            >
              Saqlash
            </button>
            <button
              type="button"
              @click="deleteQuestion(id, index)"
              class="delete-btn border bg-red text-white px-5 py-3 mb-7 rounded transition-all ease-linear duration-75 hover:-translate-y-1 hover:shadow -lg disabled:bg-gray"
            >
              O'chirish
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { api } from "@/plugins/api";
export default {
  name: "Subject",
  props: ["id"],
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      subject: {},
      loading: false,
    };
  },
  mounted() {
    this.getSubject();
  },
  computed: {},
  methods: {
    async getSubject() {
      this.loading = true;
      const resp = await api.get(`/subjects/get/${this.id}`);
      this.subject = resp.data.subject;
      this.loading = false;
    },
    async updateSubj(id, index) {
      const resp = await api.put(`/subjects/update/${id}`, {
        question: this.subject.questions[index],
        index,
      });
      console.log(resp.data);
      this.toast.success(resp.data.msg, { timeout: 2000 });
      this.getSubject();
    },
    async deleteQuestion(id, index) {
      const resp = await api.put(`/subjects/deleteOneQuestion/${id}`, {
        question: this.subject.questions[index],
      });
      this.toast.success(resp.data.msg, { timeout: 2000 });
      this.getSubject();
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style></style>
