<template>
  <div id="container">
    <div v-if="loaded" class="debug">
      <div>
        <h3>Camera</h3>
        <h4>Position</h4>
        <div>x: {{ camera.position.x }}</div>
        <div>y: {{ camera.position.y }}</div>
        <div>z: {{ camera.position.z }}</div>
        <h4>Rotation</h4>
        <div>x: {{ camera.rotation.x }}</div>
        <div>y: {{ camera.rotation.y }}</div>
        <div>z: {{ camera.rotation.z }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import * as THREE from "three";
import * as OrbitControls from "three-orbitcontrols";
import mesh from "../utils/Mesh";
export default {
  name: "Scene2",
  mixins: [mesh],
  data() {
    return {
      loaded: false,
      scene: new THREE.Scene(),
      camera: new THREE.OrthographicCamera( window.innerWidth / - 100, window.innerWidth / 100, window.innerHeight / 100, window.innerHeight / -100, - 500, 1000),
      renderer: new THREE.WebGLRenderer({ antialias: true }),
      ambientLight: new THREE.AmbientLight(0xffffff, 0.2),
      light: new THREE.PointLight(0xffffff, 0.8, 18),
      controls: null,
      elements: {},
      pressedKeys: {}
    };
  },
  mounted() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    const container = document.getElementById("container");
    container.appendChild(this.renderer.domElement);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.loaded = true;
    this.init();
  },
  methods: {
    init() {
      this.scene.background = new THREE.Color( 0xa1c3e1 ); 

      const cube = this.createCube(0xff0000);
      cube.position.x = -2;
      this.addToScene("cube", cube);
      const cube2 = this.createCube(0xff0000);
      cube2.position.x = 0;
      this.addToScene("cube2", cube2);
      const cube3 = this.createCube(0xff0000);
      cube3.position.x = 2;
      this.addToScene("cube3", cube3);

      const floor = this.createFloor(0x5d7d2e);
      this.addToScene("floor", floor);
      this.camera.position.z = 2.5;
      this.camera.position.y = 1.5;
      this.camera.rotation.x = -0.5;

      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.BasicShadowMap;

      this.scene.add(this.ambientLight);

      this.light.position.set(-3, 8, -3);
      this.light.castShadow = true;
      this.light.shadow.camera.near = 0.1;
      this.light.shadow.camera.far = 25;

      this.scene.add(this.light);

      this.render();
    },

    bindKeys() {
      window.addEventListener("keydown", this.keydown, false);
      window.addEventListener("keyup", this.keyup, false);
    },

    addToScene(alias, element) {
      this.elements[alias] = element;
      this.scene.add(element);
    },

    render() {
      requestAnimationFrame(this.render);
      this.renderer.render(this.scene, this.camera);
    },

    keydown(event) {
      let amount = 0.05;
      this.pressedKeys[String.fromCharCode(event.keyCode)] = true;

      if (this.pressedKeys.W) {
        this.rotate(this.elements.cube, "x", -amount);
      }

      if (this.pressedKeys.S) {
        this.rotate(this.elements.cube, "x", amount);
      }

      if (this.pressedKeys.A) {
        this.rotate(this.elements.cube, "y", -amount);
      }

      if (this.pressedKeys.D) {
        this.rotate(this.elements.cube, "y", amount);
      }
    },

    keyup(event) {
      const key = String.fromCharCode(event.keyCode);
      this.pressedKeys[key] = false;
    },

    rotate(object, axis, value) {
      object.rotation[axis] += value;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
canvas {
  width: 100%;
  height: 100%;
}

#container {
  height: 100vh;
  overflow: hidden;
}

h3 {
  margin-top: 0;
}
</style>
