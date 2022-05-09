<template>
  <div class="exams">
    <router-link
      class="flex flex-row items-center w-auto mb-3 transition-all ease-linear duration-75 hover:-translate-y-1 hover:shadow-lg bg-blue text-white rounded font-semibold px-3 py-2"
      to="/create/exam"
      ><img :src="PlusIco" alt="icon" class="mr-2" /> Imtihon
      ochish</router-link
    >
    <div class="searching mb-2">
      <input
        v-model="searchTerm"
        type="text"
        class="input-text border-2 outline-none w-full rounded p-3 mb-3 px-3 py-2 focus:border-blue transition-all"
        placeholder="Imtihonni qidirish"
      />
    </div>
    <div v-if="loading" class="loading text-center mt-4 text-2xl">
      Loading...
    </div>

    
    <div
      class="no-subject text-center text-xl mt-4"
      v-else-if="filteredList.length === 0"
    >
      Imtihonlar mavjud emas :(
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useToast } from "vue-toastification";
import { computed, onBeforeMount, reactive, ref, watch } from "vue";
import DeleteIco from "@/assets/delete.svg";
import PlusIco from "@/assets/plus.svg";
export default {
  name: "Exams",
  props: ["exams", "closeExam", "deleteExam"],
  setup() {
    const store = useStore();

    let searchTerm = ref("");
    let loading = ref(false);
    let disableBtn = ref(false);

    let exams = reactive(store.state.exams);

    const getExams = async () => {
      loading.value = true;
      store.dispatch("fetchExams").then(() => {
        loading.value = false;
      });
    };

    onBeforeMount(() => {
      getExams()
    });

    watch(
      () => store.state.exams,
      () => {
        exams.splice(0, exams.length);
        store.state.exams.forEach((exam) => {
          exams.push(exam);
        });
      }
    );

    let filteredList = computed(() => {
      return exams.filter((exam) => {
        return (
          exam.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
          exam.oneId.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
          exam.classNum.toLowerCase().includes(searchTerm.value.toLowerCase())
        );
      });
    });

    return { disableBtn, DeleteIco, PlusIco, searchTerm, loading, filteredList };
  },
};
</script>

<style></style>
