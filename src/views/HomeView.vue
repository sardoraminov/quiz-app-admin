<template>
  <div class="home">
    <div
      class="navigation xs:px-8 flex flex-row items-center justify-between border-b-2 border-[#F6F6F6]"
    >
      <div
        class="nav_btns flex xs:flex-row flex-col justify-between xs:items-center sm:w-auto w-full font-poppins"
      >
        <button
          @click="changeStatus('subjects')"
          :class="[
            'flex font-semibold py-5 xs:px-0 px-4 border-b-4 border-transparent subjects-btn transition-all',
            current === 'subjects'
              ? 'active border-b-blue text-blue'
              : 'text-[#BDBDBD]  border-b-2 xs:border-b-transparent border-b-[#F6F6F6]',
          ]"
        >
          Testlar
        </button>
        <button
          @click="changeStatus('pupils')"
          :class="[
            'flex font-semibold py-5 xs:ml-9 border-b-4 border-transparent xs:px-0 px-4 pupils-btn transition-all',
            current === 'pupils'
              ? 'active border-b-blue text-blue'
              : 'text-[#BDBDBD] border-b-2 xs:border-b-transparent border-b-[#F6F6F6]',
          ]"
        >
          O'quvchilar
        </button>
        <button
          @click="changeStatus('exams')"
          :class="[
            'flex font-semibold py-5 border-b-4 border-transparent xs:ml-9 xs:px-0 px-4 pupils-btn transition-all',
            current === 'exams'
              ? 'active  border-b-blue text-blue'
              : 'text-[#BDBDBD]',
          ]"
        >
          Imtihonlar
        </button>
      </div>
      <!--  -->
    </div>
    <div class="home-content xs:px-8 px-4 py-6">
      <Subjects v-if="current === 'subjects'" />
      <Pupils v-if="current === 'pupils'" />
      <Exams v-if="current === 'exams'" />
    </div>
  </div>
</template>

<script>
import Pupils from "@/components/Pupils.vue";
import Subjects from "@/components/Subjects.vue";
import Exams from "@/components/Exams.vue";
import PlusIco from "@/assets/plus.svg";
import { ref } from "vue";

export default {
  name: "HomeView",
  components: {
    Subjects,
    Pupils,
    Exams,
  },
  data() {
    return {
      PlusIco,
    };
  },
  setup() {
    const current = ref("exams");
    document.title = `Bosh sahifa | @dasturchioka`;

    const changeStatus = (stat) => {
      current.value = stat;
    };

    return {
      changeStatus,
      current,
    };
  },
};
</script>
