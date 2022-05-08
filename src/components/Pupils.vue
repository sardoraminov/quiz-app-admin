<template>
  <div class="pupils">
    <CreateUser
      :getPupils="getPupils"
      :closeModal="closeModal"
      :show="showModal"
    />
    <button
      @click="openModal"
      class="openmodal-btn flex flex-row items-center w-full mb-3 transition-all ease-linear duration-75 hover:-translate-y-1 hover:shadow-lg bg-blue text-white rounded font-semibold px-3 py-2"
    >
      <img :src="PlusIco" alt="icon" class="mr-2" /> Yangi o'quvchi
    </button>
    <input
      type="text"
      v-model="searchTerm"
      class="input-search border-2 outline-none w-full rounded p-3 mb-6 px-3 py-2 focus:border-blue transition-all"
      placeholder="O'quvchini qidirish (ID, ism familiya, sinf)"
    />
    <div v-if="loading" class="loading text-center mt-4 text-2xl">
      Loading...
    </div>
    <div
      v-else-if="filteredList.length === 0"
      class="not-found text-center text-xl mt-4"
    >
      O'quvchilar topilmadi :(
    </div>
    <div v-else class="pupils-container grid grid-cols-auto gap-3">
      <div
        v-for="(pupil, index) in filteredList"
        :key="index"
        class="pupil border flex flex-col items-start p-3 relative"
      >
        <div class="user-profile flex flex-row items-center justify-between">
          <div class="profile-img mr-4">
            <img :src="pupil.profilPic" alt="" class="w-12" />
          </div>
          <div class="profile-names">
            <router-link
              :to="{ name: 'pupil', params: { id: pupil._id } }"
              class="fullname text-xl font-bold text-blue hover:underline"
            >
              {{ pupil.fullname }}
            </router-link>
            <p class="id text-sm text-opacity-75">
              {{ pupil.oneId }}
            </p>
          </div>
        </div>
        <div class="user-info mt-5">
          <p>{{ pupil.classNum }} - sinf</p>
          <router-link
            to="#!"
            v-if="pupil.active"
            class="bg-blue-10 text-blue font-bold uppercase rounded px-1"
            >{{ pupil.exam }} imtihonida</router-link
          >
          <p
            class="bg-gray-10 text-gray-400 uppercase px-1 font-bold rounded"
            v-else
          >
            Imtihonda emas
          </p>
        </div>
        <button
          @click="deletePupil(pupil._id)"
          class="user-delete-btn bg-red p-2 rounded absolute right-3 top-3"
        >
          <img :src="DeleteIco" alt="delete-icon" />
        </button>
      </div>
    </div>
    <button
      v-if="filteredList.length > 0"
      class="delete-btn bg-red my-4 text-white font-semibold rounded px-3 py-2 mt-6 transition-all ease-linear duration-75 hover:-translate-y-1 hover:shadow-lg"
    >
      Hammasini o'chirish
    </button>
  </div>
</template>

<script>
import CreateUser from "./CreateUser.vue";
import PlusIco from "@/assets/plus.svg";
import DeleteIco from "@/assets/delete.svg";
import CopyIco from "@/assets/copy.svg";
import { api } from "@/plugins/api";
import { useToast } from "vue-toastification";
import { computed, onBeforeMount, reactive, ref } from "vue";
export default {
  components: { CreateUser },
  name: "Pupils",
  props: {
    pupils: Array,
  },
  setup(props) {
    const toast = useToast();
    let showModal = ref(false);
    let loading = ref(false);

    let disableBtn = ref(false);

    let searchTerm = ref("");

    let pupilsArr = reactive([]);

    let filteredList = computed(() => {
      return pupilsArr.filter((pupil) => {
        return (
          pupil.fullname
            .toLowerCase()
            .includes(searchTerm.value.toLowerCase()) ||
          pupil.oneId.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
          pupil.classNum.toLowerCase().includes(searchTerm.value.toLowerCase())
        );
      });
    });

    const getPupils = async () => {
      try {
        loading.value = true;
        const resp = await api.get("/users");
        const data = await resp.data;
        data.map((pupil) => {
          pupilsArr.push(pupil);
        });
        loading.value = false;
      } catch (error) {
        loading.value = false;
        console.log(error);
      }
    };

    const deletePupil = async (id) => {
      try {
        disableBtn.value = true;
        const resp = await api.delete(`/users/${id}`);
        const data = await resp.data;

        console.log(data);

        toast.success(`O'quvchi tizimdan o'chirildi!`, { timeout: 4000 });

        getPupils();
        disableBtn.value = false;
      } catch (error) {}
    };

    const closeModal = () => {
      showModal.value = false;
    };

    const openModal = () => {
      showModal.value = true;
    };

    onBeforeMount(() => {
      getPupils();
      console.log(filteredList.value);
    });

    return {
      deletePupil,
      openModal,
      closeModal,
      pupilsArr,
      filteredList,
      showModal,
      loading,
      disableBtn,
      searchTerm,
      getPupils,
    };
  },
  data() {
    return {
      PlusIco,
      CopyIco,
      DeleteIco,
    };
  },
};
</script>

<style></style>
