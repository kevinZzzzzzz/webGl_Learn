var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
export class Base {
    constructor(elelemtId, showSky = true) {
        this.clock = new THREE.Clock();
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.stats = Stats();
        this.camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 1000);
        this.scene = new THREE.Scene();
        const container = document.getElementById(elelemtId);
        const { renderer, camera, scene, stats } = this;
        // 初始化webgl
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        container === null || container === void 0 ? void 0 : container.appendChild(renderer.domElement);
        showSky && (container === null || container === void 0 ? void 0 : container.appendChild(stats.dom));
        this.initLight();
        // 初始化相机插件
        this.controls = new OrbitControls(camera, renderer.domElement);
        this.controls.maxPolarAngle = THREE.MathUtils.degToRad(90);
        this.controls.maxDistance = 100;
        this.controls.minDistance = 10;
        showSky && this.initSky();
        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
            yield this.initObject();
            this.animate();
        }), 0);
    }
    initSky() {
        const path = './images/skyBox/';
        const urls = [
            path + '6.png',
            path + '3.png',
            path + '2.png',
            path + '1.png',
            path + '5.png',
            path + '4.png'
        ];
        const textCube = new THREE.CubeTextureLoader().load(urls);
        this.scene.background = textCube;
    }
    initLight() {
        const { scene } = this;
        const light = new THREE.AmbientLight(0xff8800, 0.4); // soft white light
        scene.add(light);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(-1, -1, -1);
        this.scene.add(directionalLight);
        const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight2.position.set(1, 1, -1);
        this.scene.add(directionalLight2);
        window.addEventListener('resize', () => this.onWindowResize());
    }
    initObject() { }
    onWindowResize() {
        const { camera, renderer } = this;
        const aspect = window.innerWidth / window.innerHeight;
        camera.aspect = aspect;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    onRender() {
    }
    animate() {
        const { renderer, scene, camera, stats, controls } = this;
        stats === null || stats === void 0 ? void 0 : stats.update();
        controls.update();
        renderer.render(scene, camera);
        this.onRender();
        requestAnimationFrame(this.animate.bind(this));
    }
}
