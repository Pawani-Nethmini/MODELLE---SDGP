import { useEffect, useRef } from "react";
import * as THREE from "three";
import { STLLoader } from "three-stdlib";


export default function STLPreview({ file }) {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!file || !mountRef.current) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = null;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    mountRef.current.innerHTML = "";
    mountRef.current.appendChild(renderer.domElement);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    // Load STL
    const reader = new FileReader();
    reader.onload = () => {
      const loader = new STLLoader();
      const geometry = loader.parse(reader.result);

      geometry.center();
      geometry.computeBoundingBox();

      const material = new THREE.MeshStandardMaterial({
        color: 0xf8f8f8,
        metalness: 0.15,
        roughness: 0.45,
        });


      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      // Fit camera
      const box = geometry.boundingBox;
      const size = box.getSize(new THREE.Vector3()).length();
      camera.position.z = size * 1.2;

      const animate = () => {
        requestAnimationFrame(animate);
        mesh.rotation.y += 0.01;
        renderer.render(scene, camera);
      };
      animate();
    };

    reader.readAsArrayBuffer(file);

    return () => {
      renderer.dispose();
    };
  }, [file]);

  return <div ref={mountRef} style={{ width: "100%", height: "100%" }} />;
}
