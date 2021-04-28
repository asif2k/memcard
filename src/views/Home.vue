<template>
  <router-link to="/bestscores">Show Best Scores</router-link>
  <Game />
</template>

<script>
import Game from "@/components/Game.vue";

export default {
  name: "Home",
  components: {
    Game,
  },
};
</script>

