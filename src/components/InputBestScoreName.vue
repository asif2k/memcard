<template>
  <form @submit="onSubmit">
    <h3>Your got the highest score</h3>
    <input
      type="text"
      v-model="name"
      name="name"
      placeholder="Please set your name"
    />
    <button type="submit" class="btn btn-white btn-large">ADD MY NAME</button>
  </form>
</template>

<script>
export default {
  name: "InputBestScoreName",

  data() {
    return {
      name: "",
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();

      if (!this.name) {
        alert("Please set your name");
        return;
      }
      this.$emit("add-best-click", this.name);
      this.name = "";
    },
  },
};
</script>

<style scoped>
form {
  display: grid;
  grid-column-gap: 12px;
  grid-row-gap: 12px;
  padding: 20px;
  background-color: gray;
  grid-column-start: 1;
  grid-column-end: 5;
  grid-row-start: 1;
  max-height: 200px;
  margin-top: 100px;
  position: relative;
  border-radius: 10px;

  box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
}
body#tinymce {
  background: #ffffff;
}
input {
  font-size: 14px;
  padding: 10px 10px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.3);

  font-family: "Antonio", sans-serif;
  outline: none;
}
</style>
