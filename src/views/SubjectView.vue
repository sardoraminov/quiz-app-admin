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
    <div v-if="loading === true" class="loading text-center mt-4 text-2xl">
      Loading...
    </div>
    <div v-else-if="error" class="text-center">
      Ma'lumot topilmadi :( <br />
      <router-link to="/" class="text-xl text-blue mt-2"
        >Bosh sahifa</router-link
      >
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
          class="question-form border border-blue p-4 pb-0 mb-6"
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
              :disabled="disableBtn"
              type="button"
              @click="deleteQuestion(id, index)"
              class="delete-btn border bg-red text-white px-5 py-3 mb-7 rounded transition-all ease-linear duration-75 hover:-translate-y-1 hover:shadow -lg disabled:bg-gray"
            >
              Savolni o'chirish
            </button>
          </div>
        </div>
        <button
          @click="addQuestion()"
          class="add-question w-full font-bold mb-3 py-2 text-black bg-gray-300 rounded flex items-center justify-center transition-all ease-linear duration-75 hover:-translate-y-1 hover:shadow -lg disabled:bg-gray"
          type="button"
        >
          SAVOL QO'SHISH
        </button>
        <button
          :disabled="disableBtn"
          @click="updateWholeSubject(subject._id)"
          class="save-changes w-full font-bold mb-7 py-4 text-white bg-blue rounded flex items-center justify-center transition-all ease-linear duration-75 hover:-translate-y-1 hover:shadow -lg disabled:bg-gray"
          type="button"
        >
          SAQLASH
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { useToast } from "vue-toastification";
import { api } from "@/plugins/api";
import PlusIco from "@/assets/plus.svg";
import DeleteIco from "@/assets/delete.svg";
import EditIco from "@/assets/edit.svg";
export default {
  name: "Subject",
  props: ["id"],
  setup(props) {
    document.title = `Test: ${props.id}`;
    const toast = useToast();

    return { toast };
  },
  data() {
    return {
      subject: {},
      loading: false,
      error: false,
      disableBtn: false,
      PlusIco,
      DeleteIco,
      EditIco,
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
      if (resp.data.status === "error") {
        this.error = true;
        this.loading = false;
        this.toast(resp.data.message, {
          type: "error",
          timeout: 8000,
          closeOnClick: true,
          icon: true,
        });
      } else {
        this.subject = resp.data.subject;
        this.loading = false;
      }
    },
    async deleteQuestion(id, index) {
      this.disableBtn = true;
      const resp = await api.put(`/subjects/deleteOneQuestion/${id}`, {
        question: this.subject.questions[index],
      });
      this.toast.success(resp.data.msg, { timeout: 4000 });
      this.getSubject();
      this.disableBtn = false;
    },
    async deleteSubject(id) {
      this.disableBtn = true;

      const resp = await api.delete(`/subjects/delete/${id}`);
      const data = await resp.data;
      this.toast.success(data.msg, { timeout: 4000 });
      this.$router.push("/");
      this.disableBtn = false;
    },
    async updateWholeSubject(id) {
      this.disableBtn = true;
      const resp = await api.put(`/subjects/updateAll/${id}`, {
        subject: this.subject,
      });
      const data = await resp.data;
      this.toast.success(data.msg, { timeout: 4000 });
      setTimeout(() => {
        this.getSubject();
      }, 1000);
      this.disableBtn = false;
    },
    addQuestion() {
      this.subject.questions.push({
        question: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        answer: "",
      });
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style></style>
