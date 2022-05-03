<template>
  <div class="subjects">
    <router-link
      class="flex flex-row items-center w-auto mb-6 transition-all ease-linear duration-75 hover:-translate-y-1 hover:shadow-lg bg-blue text-white rounded font-semibold px-3 py-2"
      to="/create"
      ><img :src="PlusIco" alt="icon" class="mr-2" /> Test qo'shish</router-link
    >
    <div class="sorting my-6">
      <select
        v-model="sortingByClass"
        class="sorting-class border rounded px-4 py-2 outline-none"
      >
        <option selected disabled>Sinflar</option>
        <option value="5">5-sinf</option>
        <option value="6">6-sinf</option>
        <option value="7">7-sinf</option>
        <option value="8">8-sinf</option>
        <option value="9">9-sinf</option>
        <option value="10">11-sinf</option>
      </select>
      <select v-model="sortingByName" class="sorting-names border rounded px-4 py-2 outline-none">
        <option disabled selected>Fanlar</option>
        <option v-for="(name, index) in subjectNames" :key="index">
          {{ name }}
        </option>
      </select>
    </div>
    <div v-if="loading" class="loading text-center mt-4 text-2xl">
      Loading...
    </div>
    <div
      class="no-subject text-center text-xl mt-4"
      v-else-if="subjects.length === 0"
    >
      Hech qanday fan mavjud emas :(
    </div>
    <div v-else class="subjects-container grid grid-cols-auto gap-3">
      <div
        v-for="(subject, index) in subjects"
        :key="index"
        class="subject border rounded p-5 flex flex-col items-start"
      >
        <h1 class="name text-2xl font-bold">{{ subject.name }}</h1>
        <p class="class text-lg opacity-80">{{ subject.classNum }} - sinf</p>
        <p
          :class="[
            'status, text-white px-2 rounded text-xs',
            subject.active ? 'bg-blue' : 'bg-red',
          ]"
        >
          {{ subject.active ? "Faol" : "O'chirilgan" }}
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
      </div>
    </div>
  </div>
</template>

<script>
import EditIco from "@/assets/edit.svg";
import DeleteIco from "@/assets/delete.svg";
import PlusIco from "@/assets/plus.svg";
import { onBeforeMount, ref, watch } from "vue";
import { useStore } from "vuex";
import { reactive } from "vue";

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
    let loading = ref(false);

    const sortingByClass = ref("Sinflar");
    const sortingByName = ref("Fanlar");

    const store = useStore();

    let subjects = reactive(store.state.subjects);

    let subjectNames = new Set();

    onBeforeMount(() => {
      loading.value = true;
      store.dispatch("fetchSubjects").then(() => {
        loading.value = false;
        subjects.forEach((subj) => subjectNames.add(subj.name));
      });
    });

    console.log(subjectNames);

    watch(
      () => store.state.subjects,
      () => {
        subjects.splice(0, subjects.length);
        store.state.subjects.forEach((subject) => {
          subjects.push(subject);
        });
      }
    );

    watch(
      () => sortingByClass.value,
      () => {
        subjects.splice(0, subjects.length);
        store.state.subjects.forEach((subject) => {
          if (subject.classNum === sortingByClass.value) {
            subjects.push(subject);
          }
        });
      }
    );

    watch(
      () => sortingByName.value,
      () => {
        subjects.splice(0, subjects.length);
        store.state.subjects.forEach((subject) => {
          if (subject.name === sortingByName.value) {
            subjects.push(subject);
          }
        });
      }
    );

    return { subjects, loading, sortingByClass, subjectNames, sortingByName };
  },
};
</script>

<style></style>
