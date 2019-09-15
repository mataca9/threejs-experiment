<template>
  <div id="container">
    <div v-if="loaded" class="debug">
      <div>
        <h3>Camera</h3>
        <h4>Position</h4>
        <div>x: {{ camera.position.x }}</div>
        <div>y: {{ camera.position.x }}</div>
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
import { ARROW } from "../constants";
export default {
  name: "Scene",
  data() {
    return {
      loaded: false,
      scene: new THREE.Scene(),
      camera: new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      ),
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
    this.bindKeys();

    this.loaded = true;

    this.init();
  },
  methods: {
    init() {
      const cube = this.createCube();
      this.addToScene("cube", cube);

      const floor = this.createFloor();
      this.addToScene("floor", floor);
      this.scene.add(this.elements.cube);
      this.camera.position.z = 4.5;
      this.camera.position.y = 1.5;

      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.BasicShadowMap;

      this.scene.add(this.ambientLight);

      this.light.position.set(-3, 6, -3);
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

    createCube() {
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshPhongMaterial({
        specular: 0xd76531,
        wireframe: false
      });

      const cube = new THREE.Mesh(geometry, material);
      cube.receiveShadow = true;
      cube.castShadow = true;
      cube.position.y = 1;

      return cube;
    },

    createFloor() {
      var geometry = new THREE.PlaneBufferGeometry(2000, 2000, 8, 8);
      var material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        wireframe: false
      });

      const floor = new THREE.Mesh(geometry, material);
      floor.receiveShadow = true;
      floor.rotateX(-Math.PI / 2);

      return floor;
    },

    render() {
      requestAnimationFrame(this.render);
      this.renderer.render(this.scene, this.camera);
    },

    keydown(event) {
      let value, axis;
      let amount = 0.05;
      this.pressedKeys[String.fromCharCode(event.keyCode)] = true;

      if (this.pressedKeys.W) {
        this.rotate(this.elements.cube, "x", - amount);
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

.debug {
  position: absolute;
  right: 0;
  top: 0;
  background: rgba(255, 255, 255, 0.6);
  padding: 10px;
  width: 180px;
  border-bottom-left-radius: 15px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size:12px;
}

h3 {
  margin-top: 0;
}
</style>
