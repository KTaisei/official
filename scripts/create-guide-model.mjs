import * as THREE from 'three';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';
import { mkdir, writeFile } from 'node:fs/promises';

// GLTFExporter uses the browser FileReader API; this small Node-compatible
// adapter keeps the exported asset identical to the browser path.
globalThis.FileReader = class FileReader {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((result) => {
      this.result = result;
      this.onloadend?.();
    });
  }
};

const scene = new THREE.Scene();
const root = new THREE.Group();
root.name = 'TaiseiGuide';
scene.add(root);

const material = (color, roughness = 0.72) => new THREE.MeshStandardMaterial({ color, roughness, metalness: 0.02 });
const skin = material(0xffbd75);
const hair = material(0x34231f);
const shirt = material(0x9eb8b6);
const trousers = material(0x252833);
const shoes = material(0x284673);
const glasses = material(0x161b26, 0.38);
const sole = material(0xe9dfcb);

function mesh(geometry, materialValue, name, position = [0, 0, 0], rotation = [0, 0, 0]) {
  const object = new THREE.Mesh(geometry, materialValue);
  object.name = name;
  object.position.set(...position);
  object.rotation.set(...rotation);
  object.castShadow = true;
  object.receiveShadow = true;
  return object;
}

function limb(name, x, y, z, length, radius, materialValue, rotationZ = 0) {
  const group = new THREE.Group();
  group.name = name;
  group.position.set(x, y, z);
  const part = mesh(new THREE.CapsuleGeometry(radius, length, 8, 12), materialValue, `${name}Mesh`, [0, -length / 2, 0]);
  part.rotation.z = rotationZ;
  group.add(part);
  return group;
}

// Feet and legs (separate nodes for browser-side walk / climb animation).
const leftLeg = limb('LeftLeg', -0.27, 1.82, 0, 0.98, 0.19, trousers);
const rightLeg = limb('RightLeg', 0.27, 1.82, 0, 0.98, 0.19, trousers);
root.add(leftLeg, rightLeg);
leftLeg.add(mesh(new THREE.SphereGeometry(0.28, 16, 12), shoes, 'LeftShoe', [0, -1.06, 0.12], [0, 0, 0]));
rightLeg.add(mesh(new THREE.SphereGeometry(0.28, 16, 12), shoes, 'RightShoe', [0, -1.06, 0.12], [0, 0, 0]));
leftLeg.add(mesh(new THREE.BoxGeometry(0.41, 0.08, 0.53), sole, 'LeftSole', [0, -1.12, 0.11]));
rightLeg.add(mesh(new THREE.BoxGeometry(0.41, 0.08, 0.53), sole, 'RightSole', [0, -1.12, 0.11]));

// Torso, neck, head.
root.add(mesh(new THREE.CapsuleGeometry(0.55, 0.92, 12, 20), shirt, 'Torso', [0, 2.72, 0]));
root.add(mesh(new THREE.CylinderGeometry(0.16, 0.18, 0.24, 12), skin, 'Neck', [0, 3.28, 0]));
const head = new THREE.Group();
head.name = 'Head';
head.position.set(0, 3.92, 0);
head.add(mesh(new THREE.SphereGeometry(0.82, 24, 20), skin, 'Face'));
head.add(mesh(new THREE.SphereGeometry(0.85, 24, 18), hair, 'HairCap', [0, 0.38, -0.03], [0.08, 0, 0]));
for (const [x, y, scale] of [[-0.48, 0.35, 0.35], [-0.16, 0.47, 0.42], [0.22, 0.43, 0.43], [0.52, 0.25, 0.31]]) {
  const curl = mesh(new THREE.SphereGeometry(scale, 16, 12), hair, 'HairCurl', [x, y, 0.56]);
  curl.scale.set(1.1, 0.82, 0.52);
  head.add(curl);
}
for (const x of [-0.34, 0.34]) {
  const ring = mesh(new THREE.TorusGeometry(0.3, 0.045, 10, 24), glasses, 'GlassesFrame', [x, 0.03, 0.76]);
  head.add(ring);
  head.add(mesh(new THREE.SphereGeometry(0.045, 10, 8), glasses, 'Pupil', [x, 0.02, 0.8]));
}
head.add(mesh(new THREE.BoxGeometry(0.18, 0.035, 0.035), glasses, 'GlassesBridge', [0, 0.03, 0.76]));
root.add(head);

// Arms are named at shoulder pivot points.
const leftArm = limb('LeftArm', -0.62, 3.05, 0, 0.72, 0.15, shirt, 0.06);
const rightArm = limb('RightArm', 0.62, 3.05, 0, 0.72, 0.15, shirt, -0.06);
leftArm.add(mesh(new THREE.SphereGeometry(0.18, 14, 10), skin, 'LeftHand', [0, -0.77, 0]));
rightArm.add(mesh(new THREE.SphereGeometry(0.18, 14, 10), skin, 'RightHand', [0, -0.77, 0]));
root.add(leftArm, rightArm);

root.scale.setScalar(0.82);
root.rotation.y = -0.08;

const exporter = new GLTFExporter();
const output = await new Promise((resolve, reject) => {
  exporter.parse(scene, resolve, reject, { binary: true, onlyVisible: true });
});
await mkdir(new URL('../public/ai-chat/models/', import.meta.url), { recursive: true });
await writeFile(new URL('../public/ai-chat/models/taisei-guide.glb', import.meta.url), Buffer.from(output));
