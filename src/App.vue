<template>
  <div>
    <div class="controls">
      <div class="scene-selector">
        <button @click="prevScene()" :disabled="activeScene === 1">
          prev
        </button>
        <h3>Scene {{activeScene}}</h3>
        <button  @click="nextScene()" :disabled="activeScene === 2">
          next
        </button>
      </div>
    </div>
    <Scene1 v-if="activeScene === 1" />
    <Scene2 v-if="activeScene === 2" />
  </div>
</template>

<script>
import Scene1 from "./components/Scene1.vue";
import Scene2 from "./components/Scene2.vue";
import mesh from "./utils/Mesh";

export default {
  name: "app",
  data() {
    return {
      activeScene: 1
    };
  },
  components: {
    Scene1,
    Scene2
  },
  mixins: [mesh],
  methods: {
     nextScene() {
       this.activeScene++;
     },
     prevScene() {
       this.activeScene--;
     },
  }
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  font-size: 12px;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.controls {
  position: absolute;
  z-index: 2;
  background: rgba(255, 255, 255, 0.6);
  padding: 10px;
  left: 0;
  top: 0;
  width: 180px;
  border-bottom-right-radius: 5px;
}

.debug {
  position: absolute;
  right: 0;
  top: 0;
  background: rgba(255, 255, 255, 0.6);
  padding: 10px;
  width: 180px;
  border-bottom-left-radius: 5px;
}

.scene-selector {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.scene-selector * {
  margin: 0;
}

.scene-selector button {
  border: 0px;
  background: #fff;
  border-radius: 2px;
  padding:5px;
}

h3 {
  margin-top: 0;
}
</style>
