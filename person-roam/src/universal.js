import * as THREE from "three";
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

// 场景
const scene = new THREE.Scene();
// 相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// 渲染器
const renderer = new THREE.WebGLRenderer({
    antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true
document.body.appendChild(renderer.domElement)

// 添加光源
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5);
directionalLight.castShadow = true;
directionalLight.position.set(20, 20, 20);
scene.add(directionalLight);


// 轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // 启用阻尼效果，使相机移动更加平滑


// 加载fbx的方法
const loadFbx = (url) => {
    const fbxLoader = new FBXLoader();
    return new Promise(resolve => {
        fbxLoader.load(url, (object) => {
            resolve(object);
        });
    })

}
export {
    scene,
    camera,
    renderer,
    loadFbx
}
