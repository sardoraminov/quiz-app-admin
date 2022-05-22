<template>
  <div class="subjects">
    <router-link
      class="flex flex-row items-center w-auto mb-3 transition-all ease-linear duration-75 hover:-translate-y-1 hover:shadow-lg bg-blue text-white rounded font-semibold px-3 py-2"
      to="/create/subject"
      ><img :src="PlusIco" alt="icon" class="mr-2" /> Test qo'shish</router-link
    >
    <div class="searching mb-2">
      <input
        v-model="searchTerm"
        type="text"
        class="input-text border-2 outline-none w-full rounded p-3 mb-3 px-3 py-2 focus:border-blue transition-all"
        placeholder="Fan nomi yoki sinfi bo'yicha qidirish"
      />
    </div>
    <div v-if="loading" class="loading text-center mt-4 text-2xl">
      Loading...
    </div>
    <div
      class="no-subject text-center text-xl mt-4"
      v-else-if="filteredSubjects.length === 0"
    >
      Hech qanday fan mavjud emas :(
    </div>
    <div v-else class="subjects-container grid grid-cols-auto gap-3">
      <div
        v-for="(subject, index) in filteredSubjects"
        :key="index"
        class="subject border rounded p-5 flex flex-col items-start relative"
      >
        <h1 class="name text-2xl font-bold">{{ subject.name }}</h1>
        <p class="class text-lg opacity-80">{{ subject.classNum }} - sinf</p>
        <p
          :class="[
            'status, text-white px-2 rounded text-xs',
            subject.active ? 'bg-blue' : 'bg-red',
          ]"
        >
          {{ subject.active ? "Faol" : "Faol emas" }}
        </p>
        <router-link
          :to="{
            name: 'subject',
            params: { id: subject._id },
          }"
          class="text-blue underline mt-4"
          >Savolarni ko'rish (<b>{{ subject.questions.length }}</b
          >)</router-link
        >
        <button
          :disabled="disableBtn"
          @click="deleteSubject(subject._id)"
          type="button"
          class="delete-all border bg-red text-white p-2 rounded transition-all ease-linear duration-75 hover:-translate-y-1 hover:shadow -lg disabled:bg-gray absolute top-3 right-3"
        >
          <img :src="DeleteIco" alt="delete" />
        </button>
      </div>
    </div>
    <button
      @click="deleteAll()"
      v-if="!loading && filteredSubjects.length !== 0"
      class="delete-btn bg-red my-4 text-white font-semibold rounded px-3 py-2 mt-6 transition-all ease-linear duration-75 hover:-translate-y-1 hover:shadow-lg"
    >
      Hammasini o'chirish
    </button>
  </div>
</template>

<script>
import EditIco from "@/assets/edit.svg";
import DeleteIco from "@/assets/delete.svg";
import PlusIco from "@/assets/plus.svg";
import { api } from "@/plugins/api";
import { computed, onBeforeMount, ref, watch } from "vue";
import { useStore } from "vuex";
import { reactive } from "vue";
import { useToast } from "vue-toastification";

export default {
  name: "Subject",
  data() {
    return {
      EditIco,
      DeleteIco,
      PlusIco,
    };
  },
  setup() {
    const toast = useToast();

    let loading = ref(false);

    let disableBtn = ref(false);

    const store = useStore();

    let searchTerm = ref("");

    let subjects = reactive(store.state.subjects);

    onBeforeMount(() => {
      loading.value = true;
      store.dispatch("fetchSubjects").then(() => {
        loading.value = false;
      });
    });

    watch(
      () => searchTerm.value,
      (newValue) => {
        searchTerm.value = newValue;
      },
      { immediate: true }
    );

    const deleteSubject = async (id) => {
      disableBtn.value = true;
      loading.value = true;
      await api.delete(`/subjects/delete/${id}`).then((resp) => {
        store.dispatch("fetchSubjects").then(() => {
          loading.value = false;
        });
        toast.success(resp.data.msg, { timeout: 5000 });
        disableBtn.value = false;
        loading.value = false;
      });
    };

    const filteredSubjects = computed(() => {
      if (!searchTerm.value) {
        return subjects;
      } else {
        return subjects.filter((subject) => {
          return (
            subject.name
              .toLowerCase()
              .includes(searchTerm.value.toLowerCase()) ||
            subject.classNum
              .toLowerCase()
              .includes(searchTerm.value.toLowerCase())
          );
        });
      }
    });

    const deleteAll = async () => {
      try {
        loading.value = true;
        disableBtn.value = true;

        api.delete(`/subjects`).then((resp) => {
          store.dispatch("fetchSubjects").then(() => {
            loading.value = false;
          });
        });
      } catch (error) {
        console.log(error.message);
      }
    };

    watch(
      () => store.state.subjects,
      () => {
        subjects.splice(0, subjects.length);
        store.state.subjects.forEach((subject) => {
          subjects.push(subject);
        });
      }
    );

    return {
      subjects,
      loading,
      searchTerm,
      filteredSubjects,
      disableBtn,
      deleteSubject,
      deleteAll,
    };
  },
};
</script>

<style></style>
