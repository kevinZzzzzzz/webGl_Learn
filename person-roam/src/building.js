import * as THREE from "three";

const groundGeometry = new THREE.PlaneGeometry(500, 500);
const groundMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
});

const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.receiveShadow = true // 接受投影
ground.rotateX(-Math.PI / 2)

const blocks = []
const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const createBox = () => {
    for(let i = 0; i < 500; i++) {
        const width = getRandomInt(1, 5)
        const height = getRandomInt(2, 6)
        const depth = getRandomInt(2, 4)
        const x = getRandomInt(-250, 250)
        const y = height / 2
        const z = getRandomInt(-250, 250)
        const boxGeometry = new THREE.BoxGeometry(width, height, depth);
        const boxMaterial = new THREE.MeshLambertMaterial({
            color: 0xff0000,
        })
        const mesh = new THREE.Mesh(boxGeometry, boxMaterial);
        mesh.position.set(x, y, z)
        blocks.push(mesh)
    }
}

    createBox()

export {
    ground,
    blocks,
}
