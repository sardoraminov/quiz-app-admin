<template>
  <div class="exams">
    <router-link
      class="flex flex-row items-center w-auto mb-6 transition-all ease-linear duration-75 hover:-translate-y-1 hover:shadow-lg bg-blue text-white rounded font-semibold px-3 py-2"
      to="#"
      ><img :src="PlusIco" alt="icon" class="mr-2" /> Imtihon
      ochish</router-link
    >
   
  </div>
</template>

<script>
import DeleteIco from "@/assets/delete.svg";
import PlusIco from "@/assets/plus.svg";
export default {
  name: "Exams",
  props: ["exams", "closeExam", "deleteExam"],
  setup() {
    const checkIndex = (i) => {
      return i + 1 < 10 ? `0${i + 1}` : i + 1;
    };

    return { checkIndex, DeleteIco, PlusIco };
  },
};
</script>

<style></style>
