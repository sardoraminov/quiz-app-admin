<template>
  <div class="subject-page xs:px-8 py-6 px-4">
    <div class="subject-container">
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
              class="update-btn border bg-blue text-white px-5 py-3 mb-7 rounded transition-all ease-linear duration-75 hover:-translate-y-1 hover:shadow -lg disabled:bg-gray mr-2"
            >
              Saqlash
            </button>
            <button
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
    };
  },
  mounted() {
    this.getSubject();
  },
  methods: {
    async getSubject() {
      const resp = await api.get(`/subjects/get/${this.id}`)
      this.subject = resp.data.subject;
    },
    async updateSubj(id, index) {
      const resp = await api.put(`/subjects/update/${id}`, {
        question: this.subject.questions[index],
        index,
      });
      console.log(resp.data);
      this.toast.success(resp.data.msg, { timeout: 2000 });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    },
  },
};
</script>

<style></style>
