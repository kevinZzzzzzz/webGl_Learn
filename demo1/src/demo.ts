import * as THREE from 'three'
import { Base } from './base.js'
let is = false
export class CarGame extends Base {
  keys: any = []
  player: THREE.Mesh | null = null
  ray = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, 1, 0), 0, 10)
  constructor(elelemtId: string) {
    super(elelemtId)
  }
  initWasd() {
    document.onkeydown = (e) => {
      if (e.key.match(/^(w|a|s|d)$/i)) {
        !this.keys.includes(e.key) && this.keys.push(e.key)
      }
    }
    document.onkeyup = (e) => {
      this.keys.splice(this.keys.indexOf(e.key), 1)
    }
  }
  onRender() {
    const { keys, player, ray, scene, controls } = this

    const step = 10
    if (player) {
      const p = player.position
      ray.ray.origin.set(p.x, p.y - 5, p.z)
      const intersections = ray.intersectObjects(scene.children.filter(v => v.name !== 'player'), false)
      // if (intersections.length === 0) {
      //   player.position.y -= step * 2
      // }
      if (keys.length > 0) {
        if (keys.includes('w')) {
          player.translateZ(-step)
        }
        if (keys.includes('a')) {
          player.rotateY(THREE.MathUtils.degToRad(0.1))
        }
        if (keys.includes('d')) {
          player.rotateY(-THREE.MathUtils.degToRad(0.1))
        }
        if (keys.includes('s')) {
          player.translateZ(step)
        }
      }
      controls.target.copy(p)
    }

  }
  initPlayer() {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(10, 10, 10),
      new THREE.MeshPhongMaterial({ color: 0xffffff })
    )
    const mesh1 = new THREE.Mesh(
      new THREE.BoxGeometry(10, 10, 10),
      new THREE.MeshPhongMaterial({ color: 0xffffff })
    )
    const mesh2 = new THREE.Mesh(
      new THREE.BoxGeometry(10, 10, 10),
      new THREE.MeshPhongMaterial({ color: 0xffffff })
    )
    const headerMesh = new THREE.Mesh(
      new THREE.BoxGeometry(20, 20, 10),
      new THREE.MeshPhongMaterial({ color: 0xff9900 })
    )
    const footMesh = new THREE.Mesh(
      new THREE.BoxGeometry(20, 20, 10),
      new THREE.MeshPhongMaterial({ color: 0xff9900 })
    )
    headerMesh.position.set(0, 0, -10)
    footMesh.position.set(0, 0, 10)
    mesh1.position.set(0, 2.5, 20)
    mesh2.position.set(0, 2.5, -20)
    mesh.position.set(0, 0, -75)
    mesh.add(headerMesh)
    mesh.add(footMesh)
    mesh.add(mesh1)
    mesh.add(mesh2)
    mesh.name = 'player'
    mesh.position.y = 10
    this.player = mesh
    this.scene.add(mesh)
  }
  initMap() {
    this.camera.position.set(0, 0, 90)

    let num: any = 100

    for(let i = 1; i <= num; i++) {
      const map = new THREE.TextureLoader().load(`./images/skyBox/${(i % 6) + 1}.png`)
      map.wrapS = THREE.RepeatWrapping
      map.wrapT = THREE.RepeatWrapping
      map.repeat.set(1, 1)
  
      const material = new THREE.MeshPhongMaterial({ map: map, side: THREE.DoubleSide })
      const mesh = new THREE.Mesh(
        // new THREE.BoxGeometry((50*i), 10, 100),
        new THREE.BoxGeometry(100, 10, 100),
        material
      )
      mesh.position.set(0, (100 * i), -(100 * i))
      mesh.position.y =  0
      mesh.name = `map${i}`
      this.scene.add(mesh)
    }

    // const mesh = new THREE.Mesh(
    //   new THREE.BoxGeometry(20, 8, 50),
    //   material
    // )
    // mesh.position.y = 2
    // mesh.name = 'map1'
    // this.scene.add(mesh)

    // const mesh2 = new THREE.Mesh(
    //   new THREE.BoxGeometry(21, 8, 20),
    //   material
    // )
    // mesh2.position.setZ(-35)
    // mesh2.position.y = -2
    // mesh.name = 'map2'
    // this.scene.add(mesh2)

    // const mesh3 = new THREE.Mesh(
    //   new THREE.BoxGeometry(23, 8, 20),
    //   material
    // )
    // mesh3.position.set(0, -10, -55)
    // mesh.name = 'map3'
    // this.scene.add(mesh3)

    // const mesh4 = new THREE.Mesh(
    //   new THREE.BoxGeometry(24, 8, 20),
    //   material
    // )
    // mesh4.position.set(0, -20, -75)
    // mesh.name = 'map4'
    // this.scene.add(mesh4)
  }
  initObject() {
    this.initMap()
    this.initPlayer()
    this.initWasd()
  }
}