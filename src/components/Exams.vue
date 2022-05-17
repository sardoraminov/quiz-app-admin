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
    <div v-else class="exams-container grid grid-cols-auto gap-4">
      <div
        v-for="(exam, index) in filteredList"
        :key="index"
        class="exam border rounded p-4 relative"
      >
        <button
          @click="deleteExam(exam._id, exam.name, exam.classNum)"
          :disabled="disableBtn"
          class="user-delete-btn bg-red p-2 rounded absolute right-3 top-3 disabled:bg-gray"
        >
          <img :src="DeleteIco" alt="delete-icon" />
        </button>
        <div class="titles">
          <h1 class="exam-name text-xl font-bold">
            {{ exam.name }} {{ exam.classNum }}
          </h1>
          <p class="exam-oneId text-sm opacity-80">{{ exam.oneId }}</p>
        </div>

        <div class="exam-info mt-4">
          <p class="count-of-pupils mt-3 flex flex-row items-center">
            <img :src="UserIco" alt="user" /> {{ exam.pupils }}
          </p>
          <div v-if="exam.timeOut === 0">
            <p class="text-red font-bold">Imtihon tugadi</p>
            <router-link to="#!" class="text-blue underline"
              >Natijalar</router-link
            >
          </div>
          <div v-else-if="exam.finished">
            <p class="text-red font-bold">Imtihon tugadi</p>
            <router-link to="#!" class="text-blue underline"
              >Natijalar</router-link
            >
          </div>
          <div v-else>
            <p class="countdown font-bold">
              Tugaydi: {{ convertMsToTime(exam.timeOut) }}
            </p>
            <button
              @click="finishExam(exam._id)"
              :disabled="disableBtn"
              class="close-exam btn bg-blue text-white rounded px-2 py-1 mt-1 disabled:bg-gray"
            >
              Tugatish
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { convertMsToTime } from "../utils/convertMsToTime";
import { api } from "@/plugins/api";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";
import { computed, onBeforeMount, reactive, ref, watch } from "vue";
import DeleteIco from "@/assets/delete.svg";
import PlusIco from "@/assets/plus.svg";
import UserIco from "@/assets/user.svg";
export default {
  name: "Exams",
  props: ["exams", "closeExam", "deleteExam"],
  setup() {
    const toast = useToast();
    const store = useStore();

    let searchTerm = ref("");
    let loading = ref(false);
    let disableBtn = ref(false);

    let exams = reactive(store.state.exams);

    let filteredList = computed(() => {
      return exams.filter((exam) => {
        return (
          exam.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
          exam.oneId.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
          exam.classNum.toLowerCase().includes(searchTerm.value.toLowerCase())
        );
      });
    });

    const getExams = async () => {
      loading.value = true;
      store.dispatch("fetchExams").then(() => {
        loading.value = false;
      });
    };

    const calculateTime = async () => {
      setInterval(() => {
        filteredList.value.forEach((exam) => {
          if (exam.timeOut === 0 || exam.timeOut < 0) {
            exam.finished = true;
          } else {
            exam.timeOut -= 1000;
          }
        });
      }, 1000);
    };

    const deleteExam = async (id, name, classNum) => {
      disableBtn.value = true;
      const { data } = await api.delete(`/exams/${id}/${name}/${classNum}`);
      console.log(data);

      toast.success(data.msg, { timeout: 4000, icon: true });

      disableBtn.value = false;
      getExams();
    };

    const finishExam = async (id) => {
      disableBtn.value = true;

      const { data } = await api.put(`/exams/finish/${id}`);
      console.log(data);
      toast.success(data.msg, { timeout: 4000, icon: true });
      disableBtn.value = false;

      getExams();
    };

    onBeforeMount(() => {
      getExams();
      calculateTime();
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

    return {
      disableBtn,
      DeleteIco,
      UserIco,
      PlusIco,
      searchTerm,
      loading,
      filteredList,
      convertMsToTime,
      deleteExam,
      finishExam,
    };
  },
};
</script>

<style></style>
