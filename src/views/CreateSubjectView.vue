<template>
  <div class="create-page xs:px-8 py-6 px-4">
    <nav
      class="top_navigation flex flex-row items-center justify-between mb-10"
    >
      <button
        @click="goBack()"
        class="go-back transition-all flex items-center justify-center text-white text-2xl ease-linear duration-75 hover:-translate-y-1 hover:shadow-lg font-bold bg-blue rounded px-3 py-2"
      >
        <ion-icon name="chevron-back-outline" class="m-1"></ion-icon>
      </button>
      <h2 class="title text-xl font-bold">Test qo'shish</h2>
    </nav>
    <form @submit.prevent="createSubject()">
      <div
        class="reminder border-l-4 rounded px-4 py-5 border-blue bg-blue-50 text-blue mb-4"
      >
        <b>NOTE</b>
        <p class="pr-6 text-lg mt-5">
          Fan nomi va savollar sonini kiritganingizdan keyin pastda avtomatik
          tarzda savollarni qo'shish uchun forma yaratiladi. Agar fan nomini
          yoki savollar sonini kiritishda xatolik ketsa, sahifani yangilab
          qaytaldan yozishingiz mumkin.
        </p>
      </div>
      <div class="input-group">
        <input
          type="text"
          class="input-text border-2 outline-none w-full rounded p-3 mb-3 px-3 py-2 focus:border-blue transition-all"
          placeholder="Fan nomi"
          v-model="subject.name"
        />
      </div>
      <div class="input-group">
        <input
          type="text"
          class="input-text border-2 outline-none w-full rounded p-3 mb-3 px-3 py-2 focus:border-blue transition-all"
          placeholder="Sinf (Faqat son kiritilsin)"
          v-model="subject.classNum"
        />
      </div>
      <div class="input-group">
        <input
          type="number"
          class="input-number border-2 outline-none w-full rounded p-3 mb-6 px-3 py-2 focus:border-blue transition-all"
          v-model="subject.questionsNum"
          placeholder="Savollar soni"
        />
      </div>
      <button
        :disabled="isDisabledFirstBtn"
        type="submit"
        class="submit-btn border bg-blue text-white px-5 py-3 rounded w-full transition-all ease-linear duration-75 hover:-translate-y-1 hover:shadow -lg disabled:bg-gray"
      >
        JO'NATISH
      </button>
    </form>
    <form
      @submit.prevent="sendSubject()"
      v-if="subject.questionsNum && showSecondForm"
      class="mt-12"
    >
      <h1 class="title mb-2 text-xl font-bold">Savollar</h1>
      <div
        v-for="(question, index) in subject.questions"
        :key="index"
        class="question-form border border-blue p-4 mb-10"
      >
        <p class="number mb-2">{{ index + 1 }}-savol</p>
        <div class="input-group mb-4">
          <input
            required
            type="text"
            class="border outline-none w-full rounded p-3 px-3 py-2 focus:border-blue transition-all"
            placeholder="Savol"
            v-model="question.question"
          />
        </div>
        <div class="input-group mb-10"></div>
        <div class="input-group mb-4">
          <input
            required
            type="text"
            class="border outline-none w-full rounded p-3 px-3 py-2 focus:border-blue transition-all"
            placeholder="A variant"
            v-model="question.optionA"
          />
        </div>
        <div class="input-group mb-4">
          <input
            required
            type="text"
            class="border outline-none w-full rounded p-3 px-3 py-2 focus:border-blue transition-all"
            placeholder="B variant"
            v-model="question.optionB"
          />
        </div>
        <div class="input-group mb-4">
          <input
            required
            type="text"
            class="border outline-none w-full rounded p-3 px-3 py-2 focus:border-blue transition-all"
            placeholder="C variant"
            v-model="question.optionC"
          />
        </div>
        <div class="input-group mb-8">
          <input
            required
            type="text"
            class="border outline-none w-full rounded p-3 px-3 py-2 focus:border-blue transition-all"
            placeholder="D variant"
            v-model="question.optionD"
          />
        </div>
        <div class="input-group mb-4">
          <input
            required
            type="text"
            class="border outline-none w-full rounded p-3 px-3 py-2 focus:border-blue transition-all"
            placeholder="To'g'ri javob"
            v-model="question.answer"
          />
        </div>
      </div>
      <button
        :disabled="isDisabledSecondBtn"
        v-if="subject.questionsNum && showSecondForm"
        type="submit"
        class="finish-btn border bg-blue text-white px-5 py-3 mb-7 rounded w-full transition-all ease-linear duration-75 hover:-translate-y-1 hover:shadow -lg disabled:bg-gray"
      >
        TUGATISH
      </button>
    </form>
  </div>
</template>

<script>
import { useToast } from "vue-toastification";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import ArrowIco from "@/assets/arrow.svg";
export default {
  name: "CreateSubject",
  setup() {
    document.title = `Test yaratish`;
    const store = useStore();
    const router = useRouter();
    const toast = useToast();

    const isDisabledFirstBtn = ref(false);
    const isDisabledSecondBtn = ref(false);

    const subject = reactive({
      name: "",
      classNum: "",
      questions: [],
      questionsNum: 0,
    });

    const showSecondForm = ref(false);

    const goBack = () => {
      router.go(-1);
    };

    const createSubject = () => {
      if (!subject.name) {
        toast.warning("Iltimos, fan nomini kiriting!", {
          timeout: 3000,
        });
      } else if (!subject.classNum) {
        toast.warning("Iltimos, sinfni kiriting!", {
          timeout: 3000,
        });
      } else if (!subject.questionsNum || subject.questionsNum < 1) {
        toast.warning("Savollar soni 0 dan kichik bo'lmasligi kerak!", {
          timeout: 3000,
        });
      } else {
        for (let i = 0; i < subject.questionsNum; i++) {
          subject.questions.push({
            question: "",
            optionA: "",
            optionB: "",
            optionC: "",
            optionD: "",
            answer: "",
          });
        }
        toast.info(
          `${subject.name} savollarini qo'shish uchun ikkinchi formani to'ldiring`,
          {
            timeout: 2000,
          }
        );
        isDisabledFirstBtn.value = true;
        showSecondForm.value = true;
      }
    };

    const sendSubject = () => {
      store
        .dispatch("createSubject", {
          name: subject.name,
          classNum: subject.classNum,
          questions: subject.questions,
        })
        .then(() => {
          toast.success(
            `${subject.classNum} - sinf ${subject.name} fani to'plami qo'shildi!`,
            {
              timeout: 2000,
            }
          );
          isDisabledSecondBtn.value = true;
          router.push("/");
        });
    };
    return {
      ArrowIco,
      createSubject,
      goBack,
      subject,
      showSecondForm,
      sendSubject,
      isDisabledFirstBtn,
      isDisabledSecondBtn,
    };
  },
};
</script>

<style></style>
