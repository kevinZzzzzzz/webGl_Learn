import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Stats from 'three/examples/jsm/libs/stats.module.js'

export class Base {
  renderer
  stats
  camera
  scene
  controls
  clock = new THREE.Clock()
  constructor(elelemtId: string, showSky = true) {
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.stats = Stats()
    this.camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 1000)
    this.scene = new THREE.Scene()
    const container = document.getElementById(elelemtId)
    const { renderer, camera, scene, stats } = this
    // 初始化webgl
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    container?.appendChild(renderer.domElement)
    showSky && container?.appendChild(stats.dom)
    this.initLight()
    // 初始化相机插件
    this.controls = new OrbitControls(camera, renderer.domElement)
    this.controls.maxPolarAngle = THREE.MathUtils.degToRad(90)
    this.controls.maxDistance = 100
    this.controls.minDistance = 10

    showSky && this.initSky()
    setTimeout(async () => {
      await this.initObject()
      this.animate()
    }, 0)
  }
  initSky() {
    const path = './images/skyBox/'
    const urls = [
      path + '6.png',
      path + '3.png',
      path + '2.png',
      path + '1.png',
      path + '5.png',
      path + '4.png'
    ]
    const textCube = new THREE.CubeTextureLoader().load(urls)
    this.scene.background = textCube
  }
  initLight() {
    const { scene } = this
    const light = new THREE.AmbientLight(0xff8800, 0.4) // soft white light
    scene.add(light)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    directionalLight.position.set(-1, -1, -1)
    this.scene.add(directionalLight)

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight2.position.set(1, 1, -1)
    this.scene.add(directionalLight2)

    window.addEventListener('resize', () => this.onWindowResize())
  }
  initObject() {}
  onWindowResize() {
    const { camera, renderer } = this
    const aspect = window.innerWidth / window.innerHeight
    camera.aspect = aspect
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
  onRender() {

  }
  animate() {
    const { renderer, scene, camera, stats, controls } = this
    stats?.update()
    controls.update()
    renderer.render(scene, camera)
    this.onRender()
    requestAnimationFrame(this.animate.bind(this))
  }
}