<template>
  <Transition>
    <div
      v-show="show"
      class="create-user-form min-h-screen w-full fixed top-0 right-0 left-0 bottom-0 z-50 bg-dark bg-opacity-75 flex justify-center items-center"
    >
      <div
        class="form-box relative p-5 rounded flex flex-col items-center justify-start bg-white"
      >
        <div class="user-img w-10 pb-3">
          <img
            src="https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg"
            class="w-full"
            alt="user-img"
          />
        </div>
        <button
          @click="closeModal()"
          class="cancel-btn absolute top-3 right-5 text-2xl"
        >
          &times;
        </button>
        <div class="input-groups w-64 space-y-4 outline-none">
          <input
            type="text"
            class="border w-full outline-none py-2 px-3 focus:border-blue transition-all"
            placeholder="Ismi va familiyasi"
            v-model="user.fullname"
          />
          <div class="id flex flex-col items-start w-full">
            <input
              type="text"
              class="border w-full outline-none py-2 px-3 focus:border-blue transition-all"
              placeholder="O'quvchi ID si"
              v-model="user.oneId"
            />
            <button
              @click="generateID()"
              class="btn border my-2 px-2 bg-blue text-white"
            >
              ID yaratish
            </button>
          </div>
          <input
            type="text"
            placeholder="Sinfi (Faqat raqam kiritilsin)"
            class="border w-full outline-none py-2 px-3 focus:border-blue transition-all"
            v-model="user.classNum"
          />
          <button
            @click="createUser()"
            class="create-btn border bg-blue text-white px-5 py-3 rounded w-full transition-all ease-linear duration-75 hover:-translate-y-1 hover:shadow-lg"
          >
            YUBORISH
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import { api } from "@/plugins/api";
import { useStore } from "vuex";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
import { reactive } from "vue";

export default {
  name: "CreateUser",
  props: ["show", "closeModal"],
  setup(props) {
    const store = useStore();
    const toast = useToast();
    const router = useRouter();
    let user = reactive({
      fullname: "",
      classNum: "",
      oneId: "",
    });
    const generateID = () => {
      let date = new Date();
      let oneId =
        Math.random().toString(12).substring(2, 8) +
        date.getDate() +
        date.getMonth();

      user.oneId = oneId;
    };

    const getPupils = async () => {
      try {
        await api.get(`/users`).then((res) => {
          res.data.map((pupil) => {
            pupilsArr.push(pupil);
          });
        });
      } catch (error) {
        console.log(error);
      }
    };

    const createUser = async () => {
      if (user.fullname.length < 5) {
        toast.warning(
          "O'quvchi ism familiyasini kamida 5 ta belgidan iborat bo'lishi kerak!",
          { timeout: 4000 }
        );
      } else if (!user.classNum) {
        toast.warning("O'quvchi sinfini kiriting!", { timeout: 4000 });
      } else if (!user.oneId) {
        toast.warning("O'quvchi uchun ID yarating!", { timeout: 4000 });
      } else {
        api
          .post("/users/create", {
            fullname: user.fullname,
            oneId: user.oneId,
            classNum: user.classNum,
          })
          .then((resp) => {
            const data = resp.data;
            console.log(data);
            toast.success(`${user.fullname} tizimdan ro'yxatdan o'tdi!`, {
              timeout: 4000,
            });
          })
          .finally(() => {
            user = reactive({
              fullname: "",
              classNum: "",
              oneId: "",
            });
            store.dispatch("fetchUsers").then(() => {
              console.log("fetchUsers called!");
            });
          });
      }
    };

    return { user, generateID, createUser };
  },
};
</script>

<style></style>
