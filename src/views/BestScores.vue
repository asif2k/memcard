<template>
<div class="container">

</div>
  <div class="list">
    <h1>Best Scores</h1>
    <router-link to="/">Back to home</router-link>
    
    <div class="item border-bottom">
      <h2>NAME</h2>
      <h2>SCORE</h2>
    </div>    
    <transition-group tag="div" name="display-list" class="list item-list" >
      <div class="item" v-for="item in list" :key="`item-${item.index}`">
        <h3>{{ item.name }}</h3>
        <h3>{{ item.time }}</h3>
      </div>
    </transition-group>
    
   
  </div>
</template>
<script>
import { delay ,shuffleArray} from "../utils";
import ScoreData from "../ScoreData"
export default {
  name: "BestScores",
  components: {},
  data() {
    return {
      list: [],
    };
  },
  mounted() {
    this.populateList();    
  },
  methods: {
    async populateList() {
      const storedList=await ScoreData.getScoreList();
      shuffleArray(storedList);
      this.list.length = 0;
      for (let i = 0; i < storedList.length; i++) {
        await delay(200);
        storedList[i].index=i;
        this.list.push(storedList[i]);
      }
      await delay(500);
      this.list.sort((a,b) =>a.score-b.score);
    },
  },
};
</script>

<style scoped>
.item-list {

}
.container{
  position: absolute;
  left:0;
  right:0;
  top:0;
  bottom: 0;
  overflow-y: auto;
}
.list {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto;
  justify-content: center;
  position: relative;
  grid-column-gap: 12px;
  grid-row-gap: 12px;
  font-family: "Antonio", sans-serif;
  color: white;
}
.item {
  display: grid;
  grid-template-columns: 300px 100px;
}
.border-bottom{
  border-bottom: solid 1px white;
}

h2:first-child,
h3:first-child {
  text-align: left;
}

h2:last-child,
h3:last-child {
  text-align: right;
}

h3 {
  margin-bottom: 5px;
  margin-top: 5px;
  text-transform: uppercase;
}
.display-list-move {
  transition: transform 1s;
}

.listitem-enter-active,
.listitem-leave-active {
  transition: all 1s;
}
.listitem-enter, .listitem-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}



@media screen and (max-width: 600px) {
  .item {  
    font-size:80%;
  grid-template-columns: 230px 50px;
}
.item-list {
max-height:calc(100% - 70px); 
overflow-y:auto;
}
}

@media screen and (max-width: 320px) {
 .item {
  font-size:80%;
  grid-template-columns: 170px 40px;
}
.item-list {
max-height:calc(100% - 150px); 
overflow-y:auto;
}
}
</style>