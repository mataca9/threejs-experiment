import * as THREE from "three";

const mesh = {
    methods: {
        createCube(color) {
            const geometry = new THREE.BoxGeometry(1, 1, 1);
            const material = new THREE.MeshPhongMaterial({
                color,
                specular: 0xd76531,
                wireframe: false
            });

            const cube = new THREE.Mesh(geometry, material);
            cube.receiveShadow = true;
            cube.castShadow = true;
            cube.position.y = 1;

            return cube;
        },
        createFloor(color) {
            var geometry = new THREE.PlaneBufferGeometry(2000, 2000, 8, 8);
            var material = new THREE.MeshPhongMaterial({
                color,
                wireframe: false
            });

            const floor = new THREE.Mesh(geometry, material);
            floor.receiveShadow = true;
            floor.rotateX(-Math.PI / 2);

            return floor;
        }
    }
}

export default mesh;