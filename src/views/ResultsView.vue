<template>
  <div class="results-page xs:px-8 py-6 px-4">
    <div class="top">
      <button
        @click="goBack()"
        class="go-back transition-all flex items-center justify-center text-white text-2xl ease-linear duration-75 hover:-translate-y-1 mr-5 hover:shadow-lg font-bold bg-blue rounded px-3 py-2"
      >
        <ion-icon name="chevron-back-outline" class="m-1"></ion-icon>
      </button>
    </div>
    <input
      type="text"
      v-model="searchTerm"
      class="input-search border-2 outline-none w-full rounded p-3 mt-6 mb-4 px-3 py-2 focus:border-blue transition-all"
      placeholder="Qidirish"
    />
    <div v-if="loading" class="loading text-center mt-4 text-2xl">
      Loading...
    </div>
    <div v-else-if="filteredResults.length === 0">
      <div class="not-found text-center text-xl mt-4">
        Imtihon natijalari topilmadi :(
      </div>
    </div>
    <div v-else class="all-results-here grid grid-cols-auto gap-6 mb-6">
      <div
        v-for="(result, index) in filteredResults"
        :key="index"
        class="result relative border rounded p-4"
      >
        <button
          :disabled="loading"
          @click="deleteResult(result._id)"
          class="result-delete-btn bg-red p-2 z-50 rounded absolute right-3 top-3 disabled:bg-gray"
        >
          <img :src="DeleteIco" alt="delete-icon" />
        </button>
        <div
          class="exam-date mt-1 mb-3 opacity-50 flex flex-row items-center text-xs font-bold"
        >
          <ion-icon name="time-outline"></ion-icon>
          <p class="date ml-2">{{ date(result.createdAt) }}</p>
        </div>
        <h1 class="exam-name text-xl font-bold text-blue">
          {{ result.exam }}
        </h1>

        <b class="text-xs text-dark opacity-70 font-medium"
          >({{ result.examId }})</b
        >
        <div class="rating mt-4">
          <p class=""><b>{{result.pupil}}</b> ning natijasi</p>
          <p class="text-xl font-bold text-blue">{{ result.rating }}</p>
        </div>
      </div>
    </div>
    <div v-if="filteredResults.length > 1">
      <button
        @click="deleteAll()"
        :disabled="loading"
        class="result-delete-btn bg-red px-3 py-2 rounded disabled:bg-gray text-white"
      >
        Tozalash
      </button>
    </div>
  </div>
</template>

<script>
import DeleteIco from "@/assets/delete.svg";
import { api } from "@/plugins/api";
import { useToast } from "vue-toastification";
export default {
  name: "Results",
  setup(props) {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      results: [],
      loading: false,
      searchTerm: "",
      DeleteIco,
    };
  },
  created() {
    this.getResults();
  },
  methods: {
    date(date) {
      let d = new Date(date);
      let formattedDate = `${d.getDate()}/${
        d.getMonth() + 1
      }/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
      return formattedDate;
    },

    getResults() {
      api.get("/results").then((response) => {
        this.loading = true;
        this.results = response.data;
        this.loading = false;
      });
    },
    goBack() {
      this.$router.go(-1);
    },
    deleteResult(id) {
      api.delete(`/results/${id}`).then((response) => {
        this.loading = true;
        this.getResults();
        this.toast.success(response.data.msg, { timeout: 4000, icon: true });
        this.loading = false;
      });
    },
    deleteAll() {
      api.delete("/results/all").then((response) => {
        this.loading = true;
        this.getResults();
        this.toast.success(response.data.msg, { timeout: 4000, icon: true });
        this.loading = false;
      });
    },
  },
  computed: {
    filteredResults() {
      return this.results.filter((result) => {
        return (
          result.examId.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          result.pupilId
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase()) ||
          result.exam.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          result.pupil.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      });
    },
  },
};
</script>

<style></style>
