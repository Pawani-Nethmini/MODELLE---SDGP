import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function InteractiveRobot() {
  const containerRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x00ffff, 0.5);
    pointLight.position.set(-5, 3, -5);
    scene.add(pointLight);

    // Robot parts
    const robot = new THREE.Group();

    // Body - textured sphere with speckles
    const bodyGeometry = new THREE.SphereGeometry(1, 64, 64);
    
    // Create speckled texture
    const bodyCanvas = document.createElement('canvas');
    bodyCanvas.width = 512;
    bodyCanvas.height = 512;
    const bodyCtx = bodyCanvas.getContext('2d');
    bodyCtx.fillStyle = '#f5f5f5';
    bodyCtx.fillRect(0, 0, 512, 512);
    
    // Add speckles
    for (let i = 0; i < 2000; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const size = Math.random() * 2 + 0.5;
      bodyCtx.fillStyle = `rgba(180, 180, 180, ${Math.random() * 0.4})`;
      bodyCtx.beginPath();
      bodyCtx.arc(x, y, size, 0, Math.PI * 2);
      bodyCtx.fill();
    }
    
    const bodyTexture = new THREE.CanvasTexture(bodyCanvas);
    const bodyMaterial = new THREE.MeshStandardMaterial({ 
      map: bodyTexture,
      roughness: 0.8,
      metalness: 0.1
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.scale.set(1, 1.15, 1);
    robot.add(body);

    // Head (will rotate to follow mouse)
    const head = new THREE.Group();
    const headGeometry = new THREE.SphereGeometry(0.8, 64, 64);
    const headMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xffffff,
      roughness: 0.3,
      metalness: 0.2
    });
    const headMesh = new THREE.Mesh(headGeometry, headMaterial);
    head.add(headMesh);
    head.position.y = 1.6;
    robot.add(head);



    // Eyes - simple rounded rectangle style "00"
    const eyeGroup = new THREE.Group();
    
    // Left eye - rounded rectangle
    const eyeShape = new THREE.Shape();
    const eyeWidth = 0.22;
    const eyeHeight = 0.3;
    const radius = 0.11;
    
    eyeShape.moveTo(-eyeWidth/2 + radius, -eyeHeight/2);
    eyeShape.lineTo(eyeWidth/2 - radius, -eyeHeight/2);
    eyeShape.quadraticCurveTo(eyeWidth/2, -eyeHeight/2, eyeWidth/2, -eyeHeight/2 + radius);
    eyeShape.lineTo(eyeWidth/2, eyeHeight/2 - radius);
    eyeShape.quadraticCurveTo(eyeWidth/2, eyeHeight/2, eyeWidth/2 - radius, eyeHeight/2);
    eyeShape.lineTo(-eyeWidth/2 + radius, eyeHeight/2);
    eyeShape.quadraticCurveTo(-eyeWidth/2, eyeHeight/2, -eyeWidth/2, eyeHeight/2 - radius);
    eyeShape.lineTo(-eyeWidth/2, -eyeHeight/2 + radius);
    eyeShape.quadraticCurveTo(-eyeWidth/2, -eyeHeight/2, -eyeWidth/2 + radius, -eyeHeight/2);
    
    const eyeGeometry = new THREE.ExtrudeGeometry(eyeShape, {
      depth: 0.05,
      bevelEnabled: false
    });
    
    const eyeMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x00ffaa,
      emissive: 0x00aa77,
      roughness: 0.3,
      metalness: 0.1
    });
    
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.28, 0.05, 0.7);
    
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.28, 0.05, 0.7);
    
    eyeGroup.add(leftEye, rightEye);
    head.add(eyeGroup);



    // Scale down the entire robot
    robot.scale.set(0.5, 0.5, 0.5);
    
    scene.add(robot);
    camera.position.z = 5;

    // Mouse move handler
    const handleMouseMove = (event) => {
      mousePos.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      // Smooth head rotation towards mouse (reversed)
      const targetRotationY = -mousePos.current.x * 0.5;
      const targetRotationX = -mousePos.current.y * 0.3;
      
      head.rotation.y += (targetRotationY - head.rotation.y) * 0.1;
      head.rotation.x += (targetRotationX - head.rotation.x) * 0.1;

      // Gentle floating animation
      robot.position.y = Math.sin(time) * 0.08;
      robot.rotation.y = Math.sin(time * 0.5) * 0.03;



      renderer.render(scene, camera);
    };

    animate();
    setIsLoaded(true);

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-transparent overflow-hidden">
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
}