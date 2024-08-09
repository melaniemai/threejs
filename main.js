import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// set scene, camera, and render
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth /  window.innerHeight,
  0.1,
  10
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.IcosahedronGeometry(1.0, 2);
const material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  flatShading: true,
}); // BasicMaterial doesn't interact w lights
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);
camera.position.z = 2;


const wireMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true,
})
const wireMesh = new THREE.Mesh(geometry, wireMaterial);
wireMesh.scale.setScalar(1.001) // less flickery
mesh.add(wireMesh); // change scene -> mesh in order to get sphere and wires to rotate in animate()

const hemiLight = new THREE.HemisphereLight(0x0099ff, 0xaa5500);
scene.add(hemiLight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

function animate(t = 0) {
  requestAnimationFrame(animate);
  mesh.rotation.y = t * 0.0001; // only moves the gray sphere, not the wires
  renderer.render(scene, camera);
  controls.update();
}

animate();
