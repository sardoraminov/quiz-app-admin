<template>
  <div class="layout font-poppins">
    <nav
      class="navbar xs:px-8 flex flex-row flex-wrap justify-between xs:items-center py-6 px-4 border-b-2 border-[#F6F6F6]"
    >
      <h1 class="text-xl font-bold flex">
        <img :src="UserIco" alt="icon" class="mr-2" />
        Admin
      </h1>
      <p class="text-[#535353]">livecoders <b>TM</b></p>
    </nav>
    <Loading v-show="loading" />
    <router-view />
  </div>
</template>

<script>
import { useStore } from "vuex";
import Loading from "@/components/Loading.vue";
import UserIco from "@/assets/user.svg";
export default {
  name: "App",
  components: { Loading },
  data() {
    return {
      UserIco,
    };
  },
  setup() {
    const store = useStore();

    const loading = store.getters["getLoading"];

    return {loading}
  },
};
</script>

<style></style>
