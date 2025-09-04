var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Base } from './base.js';
import * as THREE from 'three';
export class Pic extends Base {
    constructor(id) {
        super(id, false);
        this.group = new THREE.Group();
        this.camera.position.set(0, 0, 10);
        this.controls.enabled = false;
    }
    getEuler(angle, r) {
        const a = new THREE.Euler(0, THREE.MathUtils.degToRad(angle), 0, 'XYZ');
        const b = new THREE.Vector3(r, 0, 0);
        b.applyEuler(a);
        return b;
    }
    initObject() {
        return __awaiter(this, void 0, void 0, function* () {
            const geomery = new THREE.PlaneGeometry(3, 2, 1, 1);
            const urls = new Array(8).fill('./images/skyBox/6.png');
            const center = new THREE.Vector3(0, 0, 0);
            for (let i = 0; i < urls.length; i++) {
                const map = new THREE.TextureLoader().load(urls[i]);
                const material = new THREE.MeshBasicMaterial({ map, side: THREE.DoubleSide });
                const mesh = new THREE.Mesh(geomery, material);
                const p = this.getEuler(360 / urls.length * i, 5);
                mesh.position.copy(p);
                mesh.lookAt(center);
                this.group.add(mesh);
            }
            this.scene.add(this.group);
        });
    }
    onRender() {
        this.group.rotateY(THREE.MathUtils.degToRad(0.5));
    }
}
