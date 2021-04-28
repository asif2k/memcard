<template>
  <div
    class="game-card"
    :class="getCardStyle"
    @click="$emit('card-clicked', card)"
  >
    <div
      class="game-card-face front"
      :style="`background-image:url('/images/${card.type}.jpg')`"
    ></div>
    <div class="game-card-face back"></div>
  </div>
</template>

<script>
import { CardStates } from "./enums";

export default {
  name: "GameCard",
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
  methods: {},
  computed: {
    getCardStyle() {
      if (this.card.state === CardStates.FLIPPED) {
        return "flipped";
      } else if (this.card.state === CardStates.MATCHED) {
        return "matched";
      } else {
        return "";
      }
    },
  },
};
</script>

<style scoped>
.game-card {
  position: relative;
  transition: 0.75s transform cubic-bezier(0.36, 0, 0.66, -0.56);
  transform-style: preserve-3d;
}

.game-card.flipped {
  transform: rotateY(180deg);

  border-radius: 10px;
}

.game-card-face {
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 10px;

  display: flex;
  align-items: center;
  justify-content: center;
  backface-visibility: hidden;
  box-shadow: 1px 1px #f1efef93;
}

.game-card-face.front {
  background-size: cover;
  transform: rotateY(180deg);
}

.game-card-face.back {
  background-image: url("/images/back.jpg");
  background-size: cover;
}

@keyframes game-card-matched-amin {
  from {
    transform: scale3d(1, 1, 1) rotateY(180deg);
  }
  50% {
    transform: scale3d(1.05, 1.05, 1.05) rotateY(180deg);
  }
  to {
    transform: scale3d(1, 1, 1) rotateY(180deg);
  }
}

.game-card.matched {
  animation-duration: 0.7s;
  animation-fill-mode: both;
  animation-name: game-card-matched-amin;
  animation-timing-function: ease-in-out;
  box-shadow: -4px 4px #141313;
  border-radius: 10px;
}
</style>
