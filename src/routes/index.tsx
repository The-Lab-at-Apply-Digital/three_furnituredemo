import { component$, useSignal, useVisibleTask$, $, useStore } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader'
import { ColorPicker } from "~/components/button/button";

export default component$(() => {
  const model = useSignal<HTMLCanvasElement>()
  const sofaLayers = useStore({
    base: '#ffffff',
    wood: '#ffffff',
    back: '#ffffff',
    cushion: '#ffffff',
  })

  const changeBaseColor = $((event: any) => {
    const button = event.target
    const color = button.getAttribute('data-color')
    sofaLayers.base = color
  })

  const changeWoodColor = $((event: any) => {
    const button = event.target
    const color = button.getAttribute('data-color')
    sofaLayers.wood = color
  })

  const changeBackColor = $((event: any) => {
    const button = event.target
    const color = button.getAttribute('data-color')
    sofaLayers.back = color
  })

  const changeCushionColor = $((event: any) => {
    const button = event.target
    const color = button.getAttribute('data-color')
    sofaLayers.cushion = color
  })

  useVisibleTask$(({ track }) => {
    track(() => sofaLayers.base + sofaLayers.wood + sofaLayers.back + sofaLayers.cushion)

    const sizes = {
      width: window.innerWidth * 0.6,
      height: window.innerHeight
    }

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x00ffffff)

    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
    camera.position.set(0, 1, 2)

    const renderer = new THREE.WebGLRenderer({ canvas: model.value })
    renderer.setSize(sizes.width, sizes.height)

    const controls = new OrbitControls(camera, model.value)
    controls.enableDamping = true
    controls.minDistance = 1.5
    controls.maxDistance = 15

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.7)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2)
    directionalLight.position.set(0, 5, 2)
    scene.add(directionalLight)

    const gltfLoader = new GLTFLoader()

    gltfLoader.load(
      '/src/static/models/sofa01/chair.gltf',
      (gltf: any) => {
        //gltf.scene.scale.set(2, 2, 2)
        gltf.scene.position.set(0, 0, 0)

        gltf.scene.children[0].children[0].material.color = new THREE.Color(sofaLayers.base)
        gltf.scene.children[0].children[2].material.color = new THREE.Color(sofaLayers.wood) 
        gltf.scene.children[0].children[5].material.color = new THREE.Color(sofaLayers.back) 
        gltf.scene.children[0].children[8].material.color = new THREE.Color(sofaLayers.cushion) 

        scene.add(gltf.scene)
      },
    )

    window.addEventListener('resize', () => {
      // Update sizes
      sizes.width = window.innerWidth * 0.5
      sizes.height = window.innerHeight
  
      // Update camera
      camera.aspect = sizes.width / sizes.height
      camera.updateProjectionMatrix()
  
      // Update renderer
      renderer.setSize(sizes.width, sizes.height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })

    const animate = () => {
      requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera);
    }

    animate()
  })

  return (
    <>
      <h1 class="text-center font-bold text-3xl mt-6">Luxury Design</h1>
      <div class="flex pt-8 pr-8 w-full h-full">
        <canvas ref={model} id="model"></canvas>
        <div class="">
          <div class="flex flex-col gap-8 justify-center h-[80vh] border-l-2 border-black pl-8">
            <div class="flex gap-4 items-center">
              <div class="flex flex-col gap-6">
                <label for="" class="text-black text-xl">Base Color:</label>
                <label for="" class="text-black text-xl">Wood Color:</label>
                <label for="" class="text-black text-xl">Back Color:</label>
                <label for="" class="text-black text-xl">Cushions Color:</label>
              </div>

              <div class="flex flex-col gap-6">
                <div class="flex gap-4 px-8">
                  <ColorPicker color="#fff" changeColor={changeBaseColor} />
                  <ColorPicker color="#000" changeColor={changeBaseColor} />
                  <ColorPicker color="#00f" changeColor={changeBaseColor} />
                  <ColorPicker color="#f00" changeColor={changeBaseColor} />
                </div>

                <div class="flex gap-4 px-8">
                  <ColorPicker color="#fff" changeColor={changeWoodColor} />
                  <ColorPicker color="#000" changeColor={changeWoodColor} />
                  <ColorPicker color="#00f" changeColor={changeWoodColor} />
                  <ColorPicker color="#f00" changeColor={changeWoodColor} />
                </div>

                <div class="flex gap-4 px-8">
                  <ColorPicker color="#fff" changeColor={changeBackColor} />
                  <ColorPicker color="#000" changeColor={changeBackColor} />
                  <ColorPicker color="#00f" changeColor={changeBackColor} />
                  <ColorPicker color="#f00" changeColor={changeBackColor} />
                </div>

                <div class="flex gap-4 px-8">
                  <ColorPicker color="#fff" changeColor={changeCushionColor} />
                  <ColorPicker color="#000" changeColor={changeCushionColor} />
                  <ColorPicker color="#00f" changeColor={changeCushionColor} />
                  <ColorPicker color="#f00" changeColor={changeCushionColor} />
                </div>
              </div>
            </div>
            <button class="w-40 p-2 rounded-lg border border-black bg-black text-white self-center">Purchase</button>
          </div>
        </div>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Luxury Design",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
