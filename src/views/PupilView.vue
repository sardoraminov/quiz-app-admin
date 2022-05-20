<template>
  <div class="pupil-page xs:px-8 py-6 px-4">
    <div v-if="loading" class="loading text-center mt-4 text-2xl">
      Loading...
    </div>
    <div v-else-if="error" class="text-center">
      Ma'lumot topilmadi :( <br />
      <router-link to="/" class="text-xl text-blue mt-2"
        >Bosh sahifa</router-link
      >
    </div>
    <div v-else class="user-container">
      <div class="flex flex-row items-center mb-8">
        <button
          @click="goBack()"
          class="go-back transition-all flex items-center justify-center text-white text-2xl ease-linear duration-75 hover:-translate-y-1 mr-5 hover:shadow-lg font-bold bg-blue rounded px-3 py-2"
        >
          <ion-icon name="chevron-back-outline" class="m-1"></ion-icon>
        </button>
        <div class="pupil-info flex flex-col">
          <h1 class="title text-2xl font-bold opacity-80 text-blue">
            O'quvchi ma'lumotlari
          </h1>
          <p class="info font-bold opacity-50">
            (
            {{
              pupil.status === "free"
                ? "Imtihonda emas"
                : pupil.status === "inExam"
                ? `${pupil.exam} imtihonida`
                : `Imtihonni tugatdi. Natija: ${pupil.rating}`
            }}
            )
          </p>
        </div>
      </div>
      <div class="input-groups">
        <div class="group mb-4">
          <input
            type="text"
            v-model="pupil.fullname"
            class="border outline-none w-full rounded p-3 px-3 py-2 focus:border-blue transition-all"
          />
        </div>
        <div class="group mb-4">
          <input
            type="text"
            v-model="pupil.classNum"
            class="border outline-none w-full rounded p-3 px-3 py-2 focus:border-blue transition-all"
          />
        </div>
        <div class="group mb-4">
          <input
            type="text"
            v-model="pupil.oneId"
            class="border outline-none w-full rounded p-3 px-3 py-2 focus:border-blue transition-all"
          />
          <button
            @click="generateID()"
            class="generate-id bg-blue text-white rounded px-2 py-1 mt-2"
            type="button"
          >
            ID yaratish
          </button>
        </div>
      </div>
      <div v-if="pupil.lastExam" class="last-exam-results mt-4">
        <h1 class="title text-xl font-bold">Oxirgi imtihon natijalari:</h1>
        <div class="results">
          <p>{{ pupil.lastExam }}</p>
          <p>{{ pupil.rating }}</p>
        </div>
      </div>
    </div>
    <button
      @click="updatePupil()"
      :disabled="disableBtn"
      v-if="!loading && !error"
      class="update-pupil bg-blue rounded px-3 py-2 text-white font-semibold mt-4 disabled:bg-gray"
      type="button"
    >
      Saqlash
    </button>
  </div>
</template>

<script>
import { useToast } from "vue-toastification";
import { api } from "@/plugins/api";
export default {
  props: ["id"],
  setup(props) {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      pupil: {},
      loading: false,
      error: false,
      disableBtn: false,
    };
  },
  methods: {
    async getUser() {
      try {
        this.loading = true;
        const resp = await api.get(`/users/${this.id}`);
        const data = await resp.data;
        this.pupil = data;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        console.log(error.message);
      }
    },
    generateID() {
      let date = new Date();
      let oneId =
        Math.random().toString(12).substring(2, 8) +
        date.getDate() +
        date.getMonth();

      this.pupil.oneId = oneId;
    },
    async updatePupil() {
      try {
        this.loading = true;
        this.disableBtn = true;
        const resp = await api.put(`/users/${this.pupil._id}`, {
          user: this.pupil,
        });
        const data = await resp.data;

        this.toast.success("O'quvchi ma'lumotlari muvaffaqiyatli yangilandi", {
          timeout: 5000,
          icon: true,
        });

        this.disableBtn = false;
        this.getUser();
      } catch (error) {
        console.log(error);
      }
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  mounted() {
    this.getUser();
  },
};
</script>

<style></style>
