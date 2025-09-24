import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
// 相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 3, 10); // 设置相机位置在y轴10单位处
camera.lookAt(0, 0, 0); // 设置相机看向原点(0,0,0)

// 渲染器
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; // 开启渲染器的阴影
document.body.appendChild(renderer.domElement);

// 光源
// 环境光
const light = new THREE.AmbientLight(0x404040);
scene.add(light);
// 定向光
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);

directionalLight.position.set(5, 10, 7.5);
// 辅助光
const directionalHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
scene.add(directionalLight);

// 轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // 启用阻尼效果，使相机移动更加平滑



export { scene, camera, renderer, light, controls };