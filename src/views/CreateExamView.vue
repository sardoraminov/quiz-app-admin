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
    <div v-if="loading" class="loading text-center mt-4 text-2xl">
      Loading...
    </div>
    <div v-else-if="notFound" class="not-found text-center mt-4">
      <p class="text-xl">
        Imtihon ochishdan oldin savollar to'plamini yaratish zarur
      </p>
      <router-link to="/create/subject" class="text-blue underline mt-2"
        >To'plam yaratish</router-link
      >
    </div>
    <div v-else class="exam-container mt-6">
      <div class="select-group mb-5">
        <p class="mb-2">Fanni tanlang</p>
        <select
          v-model="exam.name"
          class="bg-white border-2 outline-none w-full rounded p-3 mb-3 px-3 py-2 focus:border-blue transition-all cursor-pointer"
        >
          <option
            v-for="(subject, index) in all.names"
            :key="index"
            :value="subject"
            class="cursor-pointer px-3 py-2"
          >
            {{ subject }}
          </option>
        </select>
      </div>
      <div class="select-group mb-5">
        <p class="mb-2">Sinfni tanlang</p>
        <select
          v-model="exam.classNum"
          class="bg-white border-2 outline-none w-full rounded p-3 mb-3 px-3 py-2 focus:border-blue transition-all cursor-pointer"
        >
          <option
            v-for="(classNum, index) in all.classes"
            :key="index"
            :value="classNum"
            class="cursor-pointer px-3 py-2"
          >
            {{ classNum }} - sinf
          </option>
        </select>
      </div>
      <div class="input-group mb-5">
        <p class="mb-2">Tugash vaqtini yozing</p>
        <input
          v-model="exam.timeOut"
          class="bg-white border-2 outline-none w-full rounded p-3 mb-3 px-3 py-2 focus:border-blue transition-all"
          placeholder="Misol: 02:30:00"
        />
      </div>
      <button
        @click="createExam()"
        :disabled="disableBtn"
        class="submit-btn border bg-blue text-white font-bold px-5 py-3 rounded w-full transition-all ease-linear duration-75 hover:-translate-y-1 hover:shadow-lg disabled:bg-gray"
        type="button"
      >
        OCHISH
      </button>
    </div>
  </div>
</template>

<script>
import { computed, onBeforeMount, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { api } from "@/plugins/api";
import { useToast } from "vue-toastification";
export default {
  setup() {
    document.title = `Imtihon ochish`;

    const toast = useToast();
    const router = useRouter();

    let loading = ref(false);
    let disableBtn = ref(false);
    let notFound = ref(false);

    const examId = computed(() => {
      let oneId =
        Math.random().toString(12).substring(2, 8) +
        exam.name.substring(0, 3) +
        exam.classNum.substring(0, 3);

      return oneId;
    });

    const calculateMilliseconds = (h, m, s) => {
      return (h * 60 * 60 + m * 60 + s) * 1000;
    };

    let exam = reactive({
      name: "",
      classNum: "",
      timeOut: "",
    });

    let all = reactive({
      classes: [],
      names: [],
    });

    const getAll = async () => {
      try {
        loading.value = true;
        api.get("/subjects/all").then((res) => {
          if (res.data.status === "bad") {
            loading.value = false;
            notFound.value = true;
          } else {
            all.classes = res.data.subject_classes;
            all.names = res.data.subject_names;
          }
          loading.value = false;
        });
      } catch (error) {
        console.log(error);
      }
    };

    const createExam = async () => {
      try {
        disableBtn.value = true;
        if (!exam.name) {
          disableBtn.value = false;
          toast.warning("Fanni tanlang!", { timeout: 4000, icon: true });
        } else if (!exam.classNum) {
          disableBtn.value = false;
          toast.warning("Sinfni tanlang!", { timeout: 4000, icon: true });
        } else if (!exam.timeOut) {
          disableBtn.value = false;
          toast.warning("Tugash vaqtini yozing!", {
            timeout: 4000,
            icon: true,
          });
        } else {
          let timeOut = exam.timeOut.split(":");
          let timeOutMilliseconds = calculateMilliseconds(
            +timeOut[0],
            +timeOut[1],
            +timeOut[2]
          );
          api
            .post("/exams/create", {
              name: exam.name,
              classNum: exam.classNum,
              timeOut: timeOutMilliseconds,
              timeOutOriginal: exam.timeOut,
              oneId: examId.value,
            })
            .then((resp) => {
              if (resp.data.status === "bad") {
                disableBtn.value = false;
                toast.warning(resp.data.msg, { timeout: 5000, icon: true });
              } else {
                toast.success(resp.data.msg, { timeout: 4000, icon: true });
                router.push("/");
                disableBtn.value = false;
              }
            });
        }
      } catch (error) {
        console.log(error.message);
        toast.error(error.message, { timeout: 4000 });
      }
    };

    onBeforeMount(() => {
      getAll();
    });

    const goBack = () => {
      router.go(-1);
    };
    return { goBack, loading, notFound, exam, all, createExam, disableBtn };
  },
};
</script>

<style></style>
