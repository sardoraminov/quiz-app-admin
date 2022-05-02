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
            v-model="fullname"
          />
          <div class="id flex flex-col items-start w-full">
            <input
              type="text"
              class="border w-full outline-none py-2 px-3 focus:border-blue transition-all"
              placeholder="O'quvchi ID si"
              v-model="id"
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
          />
          <button
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
export default {
  name: "CreateUser",
  props: ["show", "closeModal"],
  data() {
    return {
      fullname: "",
      class: 0,
      id: "",
    };
  },
  methods: {
    generateID() {
      let date = new Date();
      let id =
        Math.random().toString(12).substring(2, 8) +
        date.getDate() +
        date.getMonth();

      this.id = id;
    },
  },
};
</script>

<style></style>
