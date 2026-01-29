import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function BackgroundShapes() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x00ffff, 0.3);
    pointLight.position.set(-5, 3, -5);
    scene.add(pointLight);
    
    const backLight = new THREE.PointLight(0x8b5cf6, 0.2);
    backLight.position.set(0, -3, -8);
    scene.add(backLight);

    // Create background objects
    const backgroundObjects = new THREE.Group();
    const floatingShapes = [];
    
    // Material variations with reduced opacity
    const materials = [
      new THREE.MeshStandardMaterial({ 
        color: 0x00f5ff, 
        roughness: 0.3, 
        metalness: 0.6,
        transparent: true,
        opacity: 0.4
      }),
      new THREE.MeshStandardMaterial({ 
        color: 0x7d98f3, 
        roughness: 0.4, 
        metalness: 0.5,
        transparent: true,
        opacity: 0.35
      }),
      new THREE.MeshStandardMaterial({ 
        color: 0x8b5cf6, 
        roughness: 0.3, 
        metalness: 0.6,
        transparent: true,
        opacity: 0.4
      }),
      new THREE.MeshStandardMaterial({ 
        color: 0x00d4ff, 
        roughness: 0.2, 
        metalness: 0.7,
        transparent: true,
        opacity: 0.35
      })
    ];
    
    // Create variety of smaller smooth shapes
    const shapes = [
      { geometry: new THREE.SphereGeometry(0.3, 32, 32), material: materials[0] },
      { geometry: new THREE.SphereGeometry(0.25, 32, 32), material: materials[1] },
      { geometry: new THREE.SphereGeometry(0.28, 32, 32), material: materials[3] },
      { geometry: new THREE.TorusGeometry(0.3, 0.12, 16, 32), material: materials[2] },
      { geometry: new THREE.TorusGeometry(0.28, 0.1, 16, 32), material: materials[0] },
      { geometry: new THREE.CylinderGeometry(0.2, 0.2, 0.8, 32), material: materials[1] },
      { geometry: new THREE.CylinderGeometry(0.18, 0.18, 0.6, 32), material: materials[3] },
      { geometry: new THREE.CapsuleGeometry(0.15, 0.5, 4, 16), material: materials[2] },
      { geometry: new THREE.CapsuleGeometry(0.12, 0.4, 4, 16), material: materials[0] },
      { geometry: new THREE.TorusGeometry(0.4, 0.1, 16, 32, Math.PI), material: materials[1] },
      { geometry: new THREE.BoxGeometry(0.4, 0.4, 0.4, 8, 8, 8), material: materials[3] },
      { geometry: new THREE.ConeGeometry(0.25, 0.6, 32), material: materials[2] }
    ];
    
    // Create 30 shapes spread evenly across the entire viewport
    for (let i = 0; i < 30; i++) {
      const shapeData = shapes[i % shapes.length];
      const mesh = new THREE.Mesh(shapeData.geometry, shapeData.material.clone());
      
      // Distribute shapes in grid-like pattern for even coverage
      const gridX = (i % 6) - 2.5; // 6 columns
      const gridY = Math.floor(i / 6) - 2.5; // 5 rows
      
      // Add randomness to grid positions for natural look
      mesh.position.x = gridX * 5 + (Math.random() - 0.5) * 3;
      mesh.position.y = gridY * 4 + (Math.random() - 0.5) * 3;
      mesh.position.z = -8 + (Math.random() * -15); // Far back (z: -8 to -23)
      
      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;
      mesh.rotation.z = Math.random() * Math.PI;
      
      const scale = 0.5 + Math.random() * 0.4;
      mesh.scale.set(scale, scale, scale);
      
      backgroundObjects.add(mesh);
      floatingShapes.push({
        mesh: mesh,
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.006,
          y: (Math.random() - 0.5) * 0.006,
          z: (Math.random() - 0.5) * 0.006
        },
        floatSpeed: Math.random() * 0.012 + 0.006,
        floatOffset: Math.random() * Math.PI * 2,
        driftSpeed: {
          x: (Math.random() - 0.5) * 0.003,
          y: (Math.random() - 0.5) * 0.003
        },
        initialX: mesh.position.x,
        initialY: mesh.position.y
      });
    }
    
    scene.add(backgroundObjects);
    camera.position.z = 5;

    // Animation
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      floatingShapes.forEach((shape, index) => {
        shape.mesh.rotation.x += shape.rotationSpeed.x;
        shape.mesh.rotation.y += shape.rotationSpeed.y;
        shape.mesh.rotation.z += shape.rotationSpeed.z;
        
        shape.mesh.position.y += Math.sin(time * shape.floatSpeed + shape.floatOffset) * 0.002;
        shape.mesh.position.x += Math.cos(time * shape.floatSpeed * 0.7 + shape.floatOffset) * 0.002;
        
        const scale = shape.mesh.scale.x;
        const pulseScale = scale + Math.sin(time * 0.5 + index) * 0.015;
        shape.mesh.scale.set(pulseScale, pulseScale, pulseScale);
        
        // Wrap around with boundaries that cover full screen
        const maxX = 15;
        const maxY = 12;
        
        if (shape.mesh.position.x > maxX) shape.mesh.position.x = -maxX;
        if (shape.mesh.position.x < -maxX) shape.mesh.position.x = maxX;
        if (shape.mesh.position.y > maxY) shape.mesh.position.y = -maxY;
        if (shape.mesh.position.y < -maxY) shape.mesh.position.y = maxY;
      });
      
      backgroundObjects.rotation.y += 0.0002;
      backgroundObjects.rotation.x = Math.sin(time * 0.08) * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none'
      }}
    />
  );
}