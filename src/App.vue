<template>
  <h1 class="game-title">MemCARD</h1>
  <router-view />
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Antonio:wght@100&family=New+Rocker&display=swap");

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

html {
  background-color: #000000;
  overflow: hidden;
}

.float-left {
  float: left;
}
.float-right {
  float: right;
}

body::after {
  content: "";
  background: url("/images/game-background.jpg");
  opacity: 0.15;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  z-index: -1;
}
.btn {
  display: inline-block;
  color: #666;
  background-color: #eee;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 14px;
  padding: 10px 30px;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-bottom-width: 3px;
  font-family: "Antonio", sans-serif;
  user-select: none;
}
a {
  color: white;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
.btn-large {
  font-size: 18px;
}

.btn:hover {
  background-color: #e3e3e3;
  border-color: rgba(0, 0, 0, 0.5);
}

.btn:active {
  background-color: #ccc;
  border-color: rgba(0, 0, 0, 0.9);
}

.btn.btn-green {
  background-color: #068302;
  border-color: rgba(0, 0, 0, 0.3);
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.5);
  color: #fff;
}

.btn.btn-green:hover {
  background-color: #099c04;
  border-color: rgba(0, 0, 0, 0.5);
}

.btn.btn-green:active {
  background-color: #07df00;
  border-color: rgba(0, 0, 0, 0.9);
}

.btn.btn-red {
  background-color: #e48681;
  border-color: rgba(0, 0, 0, 0.3);
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.5);
  color: #fff;
}

.btn.btn-red:hover {
  background-color: #da4f49;
  border-color: rgba(0, 0, 0, 0.5);
}

.btn.btn-red:active {
  background-color: #b32c24;
  border-color: rgba(0, 0, 0, 0.9);
}

.game-title {
  font-family: "New Rocker", cursive;
  color: #b4b4b4;
  font-size: 300%;
  text-shadow: 2px 2px #3b3a3a;
}
</style>
