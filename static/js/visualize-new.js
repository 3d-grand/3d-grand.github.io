import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js'
// functions borrowed from PaLM-E

let canvas1 = document.querySelector('#webgl_pose')
let scene1 = new THREE.Scene()
let assetLoader1 = new GLTFLoader()
let model1

let camera1 = new THREE.PerspectiveCamera(45, 1.618 / 1.0, 0.1, 100)
camera1.position.set(5.2, 3.9, -3.9)
let grid1 = new THREE.GridHelper(30, 30)
scene1.add(camera1)
scene1.add(grid1)
for (let i = 0; i <= 1; i++) {
  for (let k = 0; k <= 1; k++) {
    let spotLight = new THREE.SpotLight(0xAAAAAA)
    spotLight.position.set(50 * (i * 2 - 1), 100, 100 * (k * 2 - 1))
    scene1.add(spotLight)
  }
}

let controls1 = new OrbitControls(camera1, canvas1)
controls1.enableZoom = true
// controls2.enableDamping = true
controls1.object.position.set(camera1.position.x, camera1.position.y, camera1.position.z)
controls1.target = new THREE.Vector3(0, 0, 0)
controls1.update()

let renderer1 = new THREE.WebGLRenderer({
    canvas: canvas1,
    alpha: true,
})
renderer1.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer1.outputEncoding = THREE.sRGBEncoding
renderer1.setAnimationLoop(() => {
  renderer1.render(scene1, camera1)
});

const radioButtons = document.querySelectorAll('input[name="capability"]')
for (const radioButton of radioButtons) {
  radioButton.addEventListener('change', (e) => {
    // console.log(radioButton.value)
    var capability = radioButton.value;
    // console.log("capability", capability)
    console.log("here")
    for (const rb of radioButtons) {rb.disabled = true}
    console.log("here")
    var scannet = document.getElementById("scene1");
    var front3d = document.getElementById("scene2");
    var structured3d = document.getElementById("scene3");
    // console.log("captioning")
    if (capability == "captioning") {
        scannet.value = "Here is an example of captioning for scannet [sep] Here is the answer"
        front3d.value = "Here is an example of captioning for 3d front [sep] Here is the answer"
        structured3d.value = "Here is an example of captioning for structured3d [sep] Here is the answer"
    }

    else if (capability == "3d-context-dependent-qa") {
        scannet.value = "Here is an example of context dependent qa for scannet [sep] Here is the answer"
        front3d.value = "Here is an example of context dependent qa for 3d front [sep] Here is the answer"
        structured3d.value = "Here is an example of context dependent qa for structured3d [sep] Here is the answer"
    }

    else if (capability == "conversation") {
        scannet.value = "Here is an example of conversation for scannet [sep] Here is the answer"
        front3d.value = "Here is an example of conversation for 3d front [sep] Here is the answer"
        structured3d.value = "Here is an example of conversation for structured3d [sep] Here is the answer"
    }

    else if (capability == "complex-reasoning") {
        scannet.value = "Here is an example of complex reasoning question for scannet [sep] Here is the answer"
        front3d.value = "Here is an example of complex reasoning question for 3d front [sep] Here is the answer"
        structured3d.value = "Here is an example of complex reasoning question for structured3d [sep] Here is the answer"
    }

    for (const rb of radioButtons) {rb.disabled = false}
  })
}
radioButtons[0].click()

// resize renderers
function resizeRenderers() {
  let content_width = document.querySelector('#demo').offsetWidth
  renderer1.setSize(content_width * 6.7 / 12, content_width / 1.618 * 6.7 / 12)
}
window.addEventListener('resize', () => {
  resizeRenderers()
})
resizeRenderers()

window.model1 = model1;
window.scene1 = scene1;
window.assetLoader1 = assetLoader1;