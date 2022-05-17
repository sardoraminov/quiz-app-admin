<template>
  <div class="result-page">
    <h1>Results here</h1>
    <b>ID: {{ id }}</b>
  </div>
</template>

<script>
export default {
  name: "Result",
  props: ["id"],
  setup({ id }) {
    console.log(id);
    return { id };
  },
};
</script>

<style></style>
