<template>
  <div class="pupils">
    <CreateUser :closeModal="closeModal" :show="showModal" />
    <button @click="openModal" class="openmodal-btn flex flex-row items-center w-full mb-3 transition-all ease-linear duration-75 hover:-translate-y-1 hover:shadow-lg bg-blue text-white rounded font-semibold px-3 py-2"><img :src="PlusIco" alt="icon" class="mr-2" /> Yangi o'quvchi</button>
    <input
      type="text"
      v-model="searchTerm"
      class="input-search border-2 outline-none w-full rounded p-3 mb-6 px-3 py-2 focus:border-blue transition-all"
      placeholder="O'quvchini qidirish"
    />

    <button
      class="delete-btn bg-red my-4 text-white font-semibold rounded px-3 py-2 mt-6"
    >
      Tugatganlarni o'chirish
    </button>
  </div>
</template>

<script>
import CreateUser from "./CreateUser.vue";
import PlusIco from "@/assets/plus.svg";
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
      PlusIco
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
      this.showModal = true
    }
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
