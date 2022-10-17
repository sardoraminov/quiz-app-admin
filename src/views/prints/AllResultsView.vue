<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { api } from "@/plugins/api";
import { useToast } from "vue-toastification";

const toast = useToast();

let results = ref([]);

const getResults = async () => {
  try {
    const res = await api.get("/results");
    const data = await res.data;

    results.value = await data.sort((a, b) => {
      return (
        +a.rating.substring(0, rating.indexOf("/")) -
        +b.rating.substring(0, rating.indexOf("/"))
      );
    });
    console.log(results.value);
  } catch (error) {
    toast.error(error.message);
    console.log(error.message);
  }
};

getResults().then(() => {
  //   window.print()
});
</script>

<template>
  <div>
    <button
      @click="$router.go(-1)"
      class="go-back ml-8 mt-4 transition-all flex items-center justify-center text-white text-2xl ease-linear duration-75 hover:-translate-y-1 mr-5 hover:shadow-lg font-bold bg-blue rounded px-3 py-2"
    >
      <ion-icon name="chevron-back-outline" class="m-1"></ion-icon>
    </button>
    <table class="mt-4 mx-auto">
      <caption class="mb-2 text-lg">
        Imtihon natijalari
      </caption>
      <tr class="font-extrabold bg-gray-50">
        <th scope="col">Tartib</th>
        <th scope="col">Ism familiya</th>
        <th scope="col">Imtihon</th>
        <th scope="col">Savollar</th>
        <th scope="col">Natija</th>
      </tr>
      <tbody>
        <tr v-for="(result, index) in results" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ result.pupil }}</td>
          <td>{{ result.exam }}</td>
          <td>{{ result.rating.substring(result.rating.indexOf("/") + 1) }}</td>
          <td>{{ result.rating.substring(0, result.rating.indexOf("/")) }}</td>
        </tr>
      </tbody>
      <p class="text-sky-600 underline mt-5">
        <a href="https://dasturchioka.uz">dasturchioka.uz</a>
      </p>
    </table>
  </div>
</template>

<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 95%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

@media print {
  .go-back {
    display: none;
  }
}
</style>
