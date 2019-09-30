const common = {
    data() {
        return {
            startedPointerEvents: false,
            mouseLocked: false
        }
    },
    mounted() {
        this.bindEvents();
    },
    methods: {
        bindEvents() {
            window.addEventListener("keydown", this.keydown, false);
            window.addEventListener("keyup", this.keyup, false);
        },
        initPointerLock(element) {
            if (this.startedPointerEvents) {
                return;
            }

            element.requestPointerLock = element.requestPointerLock ||
                element.mozRequestPointerLock ||
                element.webkitRequestPointerLock;
            // Ask the browser to lock the pointer
            element.requestPointerLock();

            // Hook pointer lock state change events
            document.addEventListener('pointerlockchange', this.changePointerLock, false);
            document.addEventListener('mozpointerlockchange', this.changePointerLock, false);
            document.addEventListener('webkitpointerlockchange', this.changePointerLock, false);

            // Hook mouse move events
            document.addEventListener("mousemove", this.mouseMove, false);
        },

        changePointerLock() {
            if (document.pointerLockElement === this.renderer.domElement ||
                document.mozPointerLockElement === this.renderer.domElement) {
                this.mouseLocked = true;
            } else {
                this.mouseLocked = false;
            }
        }
    },
}

export default common;