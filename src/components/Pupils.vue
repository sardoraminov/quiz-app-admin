<template>
  <div class="pupils">
    <CreateUser :closeModal="closeModal" :show="showModal" />
    <button
      @click="openModal"
      class="openmodal-btn flex flex-row items-center w-full mb-3 transition-all ease-linear duration-75 hover:-translate-y-1 hover:shadow-lg bg-blue text-white rounded font-semibold px-3 py-2"
    >
      <img :src="PlusIco" alt="icon" class="mr-2" /> Yangi o'quvchi
    </button>
    <input
      type="text"
      v-model="searchTerm"
      class="input-search border-2 outline-none w-full rounded p-3 mb-6 px-3 py-2 focus:border-blue transition-all"
      placeholder="O'quvchini qidirish"
    />
    <div v-if="loading" class="loading text-center mt-4 text-2xl">
      Loading...
    </div>
    <div
      v-else-if="filteredList.length === 0"
      class="not-found text-center text-xl mt-4"
    >
      O'quvchilar topilmadi :(
    </div>
    <div
      v-else
      v-for="(pupil, index) in filteredList"
      :key="index"
      class="pupil"
    >
      <h1>{{ pupil.name }}</h1>
    </div>
    <button
      v-if="filteredSubjects"
      class="delete-btn bg-red my-4 text-white font-semibold rounded px-3 py-2 mt-6"
    >
      Tugatganlarni o'chirish
    </button>
  </div>
</template>

<script>
import CreateUser from "./CreateUser.vue";
import PlusIco from "@/assets/plus.svg";
import { api } from "@/plugins/api";
export default {
  components: { CreateUser },
  name: "Pupils",
  props: {
    pupils: Array,
  },
  data() {
    return {
      searchTerm: "",
      showModal: false,
      PlusIco,
      loading: false,
      pupils: [],
    };
  },
  methods: {
    checkIndex(i) {
      return i + 1 < 10 ? `0${i + 1}` : i + 1;
    },
    closeModal() {
      this.showModal = false;
    },
    openModal() {
      this.showModal = true;
    },
    async getPupils() {
      try {
        this.loading = true;
        const resp = await api.get("/users");
        const data = await resp.data;
        this.pupils = data;
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    filteredList() {
      return this.pupils.filter((pupil) => {
        return pupil.fullname
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase());
      });
    },
  },
};
</script>

<style></style>
