<template>
  <div class="game-board">
    <transition-group tag="section" name="shuffle-cards" class="cards-area">
      <GameCard
        v-for="card in cards"
        @card-clicked="cardClicked"
        :card="card"
        :key="`${card.index}-${card.type}`"
      />
    </transition-group>
    <h1 v-show="gameIsCompleted" class="game-completd-message">
      Score: {{ gameScore }}
    </h1>
    <div class="game-info">
      <button
        v-show="gameIsIdle"
        class="btn btn-green btn-large"
        @click="playGame"
      >
        PLAY GAME
      </button>
      <button
        v-show="gameIsPlaying"
        class="btn btn-red float-left"
        @click="exitGame"
      >
        EXIT GAME
      </button>
      <label v-show="gameIsPlaying" class="game-time-display"
        >Time:{{ runningTimeDisplay }}</label
      >
    </div>
    <InputBestScoreName
      v-show="showInputBestScoreName"
      @add-best-click="addBestScore"
    />
  </div>
</template>

<script>
import InputBestScoreName from "./InputBestScoreName";
import GameCard from "./GameCard";
import { CardStates, GameStates } from "./enums";
import ScoreData from "../ScoreData";
import { delay, shuffleArray } from "../utils";

export default {
  name: "Game",
  props: {},
  components: {
    GameCard,
    InputBestScoreName,
  },

  methods: {
    async addBestScore(name) {
      await ScoreData.addBestScore(name, this.gameFinishedTime);
      this.showInputBestScoreName = false;
      this.$router.push("bestscores");
      this.setGameIdle();
    },

    async setGameIdle() {
      this.state = GameStates.IDLE;
      this.sortCards();
      this.cards.forEach((card, i) => {
        if (i % 2 === 0) card.state = CardStates.FLIPPED;
        else card.state = CardStates.IDLE;
      });
    },

    async setGameCompleted() {
      await delay(1000);
      this.gameFinishedTime = Date.now() - this.gameStartTime;
      this.state = GameStates.COMPLETED;
      const seconds = this.gameFinishedTime / 1000;
      const minutes = seconds / 60;
      const hours = minutes / 60;
      this.runningTime.setHours(hours, minutes, seconds);
      this.gameScore = this.runningTime.toLocaleTimeString("en-GB");
      const isBestScore = await ScoreData.checkBestScore(this.gameFinishedTime);

      if (isBestScore) {
        await delay(1000);
        this.showInputBestScoreName = true;
      } else {
        await delay(1000);
        this.setGameIdle();
      }
    },

    async playGame() {
      this.runningTimeDisplay = "00:00:00";
      this.cards.forEach((card) => (card.state = CardStates.IDLE));
      this.state = GameStates.PLAYING;
      await delay(1000);
      this.startGame();
    },

    exitGame() {
      if (this.state === GameStates.PLAYING) {
        clearInterval(this.gameTimer);
        this.setGameIdle();
      }
    },

    gameTime() {
      if (this.state !== GameStates.PLAYING) {
        clearInterval(this.gameTimer);
        return;
      }
      const totalGameTime = Date.now() - this.gameStartTime;
      const seconds = totalGameTime / 1000;
      const minutes = seconds / 60;
      const hours = minutes / 60;
      this.runningTime.setHours(hours, minutes, seconds);
      this.runningTimeDisplay = this.runningTime.toLocaleTimeString("en-GB");
    },

    startGame() {
      this.shuffleCards();
      this.gameStartTime = Date.now();
      this.gameTimer = setInterval(this.gameTime, 1000);
    },

    shuffleCards() {
      shuffleArray(this.cards, 3);
    },

    sortCards() {
      this.cards.sort((a, b) => {
        return a.index - b.index;
      });
    },

    async validateCardStates() {
      if (this.cardClickedCount === 2) {
        await delay(1000);

        const cards = this.cards.filter(
          (card) => card.state === CardStates.FLIPPED
        );
        if (cards[0].type === cards[1].type) {
          cards[0].state = CardStates.MATCHED;
          cards[1].state = CardStates.MATCHED;
        } else {
          cards[0].state = CardStates.IDLE;
          cards[1].state = CardStates.IDLE;
        }
        this.cardClickedCount = 0;

        const totalMatchedPairs =
          this.cards.filter((card) => card.state === CardStates.MATCHED)
            .length / 2;
        if (totalMatchedPairs > 7) {
          this.setGameCompleted();
        }
      }
    },
    cardClicked(card) {
      if (this.state !== GameStates.PLAYING) return;

      if (this.cardClickedCount > 1 || card.state > CardStates.IDLE) {
        return;
      }
      this.cardClickedCount++;
      card.state = CardStates.FLIPPED;
      this.validateCardStates();
    },
  },

  computed: {
    gameIsIdle() {
      return this.state === GameStates.IDLE;
    },
    gameIsPlaying() {
      return this.state === GameStates.PLAYING;
    },
    gameIsCompleted() {
      return this.state === GameStates.COMPLETED;
    },
  },

  created() {
    this.runningTime = new Date();
    this.cardClickedCount = 0;
    this.setGameIdle();
    this.gameFinishedTime = 0;
  },

  data() {
    const cards = [];
    for (let i = 1; i < 9; i++) {
      cards.push({ index: cards.length, type: i, state: CardStates.IDLE });
      cards.push({ index: cards.length, type: i, state: CardStates.IDLE });
    }

    return {
      runningTimeDisplay: "",
      gameScore: "",
      state: GameStates.IDLE,
      showInputBestScoreName: false,
      cards: cards,
    };
  },
};
</script>

<style scoped>
.game-board {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(4, 100px);
  grid-template-rows: auto;
  grid-template-areas:
    "cards cards cards cards"
    "footer footer footer footer";
  justify-content: center;
  position: relative;
  grid-column-gap: 12px;
  grid-row-gap: 12px;
}

.cards-area {
  grid-area: cards;
  display: grid;
  grid-template-columns: repeat(4, 100px);
  grid-template-rows: repeat(4, 100px);
  grid-column-gap: 12px;
  grid-row-gap: 12px;
  justify-content: center;
}

.game-info {
  grid-area: footer;
  padding-top: 20px;
  justify-content: center;
}

.game-time-display {
  font-family: "Antonio", sans-serif;
  color: white;
  font-size: 1.2rem;
  float: right;
}

.shuffle-cards {
  transition: transform 4s;
}

.game-completd-message {
  grid-column-start: 1;
  grid-column-end: 5;
  grid-row-start: 1;
  position: absolute;
  width: 100%;
  top: 50%;
  margin-top: -100px;
  padding-top: 30px;
  padding-bottom: 30px;
  color: #000000;
  background: #ffffff;
  text-shadow: 2px 2px 0 #bcbcbc, 4px 4px 0 #9c9c9c;
}

@media screen and (max-width: 600px) {
  .cards-area {
    grid-template-columns: repeat(4, 70px);
    grid-template-rows: repeat(4, 70px);
  }

  .game-board {
    grid-template-columns: repeat(4, 70px);
  }
}

@media screen and (max-width: 320px) {
  .cards-area {
    grid-template-columns: repeat(4, 50px);
    grid-template-rows: repeat(4, 50px);
  }

  .game-board {
    grid-template-columns: repeat(4, 50px);
  }
}
</style>
