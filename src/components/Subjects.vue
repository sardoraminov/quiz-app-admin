<template>
  <div class="subjects">
    <router-link
      class="flex flex-row items-center w-auto mb-6 transition-all ease-linear duration-75 hover:-translate-y-1 hover:shadow-lg bg-blue text-white rounded font-semibold px-3 py-2"
      to="/create"
      ><img :src="PlusIco" alt="icon" class="mr-2" /> Test qo'shish</router-link
    >
    <div class="subjects-container grid-cols-auto">
      <div
        v-for="(subject, index) in subjects"
        :key="index"
        class="subject border rounded p-5"
      >
        <h1 class="name text-2xl font-bold">{{ subject.name }}</h1>
        <p class="class text-lg mt-2">{{ subject.classNum }} - sinf</p>
        <router-link
          :to="{
            name: 'subject',
            params: { id: subject._id },
          }"  
        >{{subject.questions.length}} ta savol</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import EditIco from "@/assets/edit.svg";
import DeleteIco from "@/assets/delete.svg";
import PlusIco from "@/assets/plus.svg";
import { onBeforeMount, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { reactive } from "vue";
import { useRouter } from "vue-router";
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
    const changeStatus = (id) => {
      return;
    };

    const store = useStore();

    let subjects = reactive(store.state.subjects);

    onBeforeMount(() => {
      store.dispatch("fetchSubjects");
    });

    watch(
      () => store.state.subjects,
      () => {
        subjects.splice(0, subjects.length);
        store.state.subjects.forEach((subject) => {
          subjects.push(subject);
        });
      }
    );

    return { changeStatus, subjects };
  },
};
</script>

<style></style>
