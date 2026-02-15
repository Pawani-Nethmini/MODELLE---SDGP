import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function InteractiveRobot() {
  const containerRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    /* ================= SCENE ================= */
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 1.5, 6);
    camera.lookAt(0, 0.5, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    /* ================= LIGHTING ================= */
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));

    const keyLight = new THREE.DirectionalLight(0xffffff, 0.8);
    keyLight.position.set(3, 5, 4);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x88ccff, 0.3);
    fillLight.position.set(-3, 2, -2);
    scene.add(fillLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 0.2);
    backLight.position.set(0, 3, -3);
    scene.add(backLight);

    /* ================= ROBOT ================= */
    const robot = new THREE.Group();
    scene.add(robot);

    // Materials
    const whiteMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.2,
      metalness: 0.1,
    });

    const screenMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a2e,
      roughness: 0.1,
      metalness: 0.8,
    });

    const eyeMaterial = new THREE.MeshStandardMaterial({
      color: 0x00d4ff,
      emissive: 0x00d4ff,
      emissiveIntensity: 1.5,
      roughness: 0.3,
    });

    /* ---- BODY ---- */
    const bodyGeometry = new THREE.SphereGeometry(0.7, 32, 32);
    bodyGeometry.scale(1, 1.1, 0.95);
    const body = new THREE.Mesh(bodyGeometry, whiteMaterial);
    body.position.y = 0;
    body.castShadow = true;
    robot.add(body);

    /* ---- HEAD GROUP ---- */
    const head = new THREE.Group();
    head.position.y = 1.2;
    robot.add(head);

    /* Head shell - rounded rectangle */
    const headGeometry = new THREE.BoxGeometry(1.3, 0.9, 0.85);
    const headShell = new THREE.Mesh(headGeometry, whiteMaterial);
    
    // Round the edges by creating a more sophisticated shape
    const roundedHeadGeometry = new THREE.BoxGeometry(1.3, 0.9, 0.85, 6, 6, 6);
    const positions = roundedHeadGeometry.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      const z = positions.getZ(i);
      
      // Apply smooth rounding to corners
      const factor = 0.15;
      if (Math.abs(x) > 0.5 && Math.abs(y) > 0.3) {
        positions.setY(i, y * (1 - factor * Math.abs(x) / 0.65));
        positions.setX(i, x * (1 - factor * Math.abs(y) / 0.45));
      }
      if (Math.abs(z) > 0.3 && Math.abs(y) > 0.3) {
        positions.setZ(i, z * (1 - factor * Math.abs(y) / 0.45));
      }
    }
    roundedHeadGeometry.computeVertexNormals();
    
    const roundedHead = new THREE.Mesh(roundedHeadGeometry, whiteMaterial);
    roundedHead.castShadow = true;
    head.add(roundedHead);

    /* Face screen - with rounded corners */
    const faceScreenShape = new THREE.Shape();
    const screenWidth = 1.05;
    const screenHeight = 0.65;
    const radius = 0.15; // Corner radius
    
    // Create rounded rectangle shape
    faceScreenShape.moveTo(-screenWidth/2 + radius, -screenHeight/2);
    faceScreenShape.lineTo(screenWidth/2 - radius, -screenHeight/2);
    faceScreenShape.quadraticCurveTo(screenWidth/2, -screenHeight/2, screenWidth/2, -screenHeight/2 + radius);
    faceScreenShape.lineTo(screenWidth/2, screenHeight/2 - radius);
    faceScreenShape.quadraticCurveTo(screenWidth/2, screenHeight/2, screenWidth/2 - radius, screenHeight/2);
    faceScreenShape.lineTo(-screenWidth/2 + radius, screenHeight/2);
    faceScreenShape.quadraticCurveTo(-screenWidth/2, screenHeight/2, -screenWidth/2, screenHeight/2 - radius);
    faceScreenShape.lineTo(-screenWidth/2, -screenHeight/2 + radius);
    faceScreenShape.quadraticCurveTo(-screenWidth/2, -screenHeight/2, -screenWidth/2 + radius, -screenHeight/2);
    
    const faceScreenGeometry = new THREE.ExtrudeGeometry(faceScreenShape, {
      depth: 0.08,
      bevelEnabled: false
    });
    
    const faceScreen = new THREE.Mesh(faceScreenGeometry, screenMaterial);
    faceScreen.position.z = 0.43;
    head.add(faceScreen);

    /* Eyes - circular */
    // Left eye (sphere)
    const leftEyeGeometry = new THREE.SphereGeometry(0.12, 32, 32);
    const leftEye = new THREE.Mesh(leftEyeGeometry, eyeMaterial);
    leftEye.position.set(-0.25, 0.08, 0.52);
    head.add(leftEye);

    // Right eye (sphere)
    const rightEyeGeometry = new THREE.SphereGeometry(0.12, 32, 32);
    const rightEye = new THREE.Mesh(rightEyeGeometry, eyeMaterial);
    rightEye.position.set(0.25, 0.08, 0.52);
    head.add(rightEye);

    /* ---- FLOATING ARMS ---- */
    const armGeometry = new THREE.SphereGeometry(0.22, 32, 32);
    armGeometry.scale(0.9, 1.1, 0.9);
    
    const leftArm = new THREE.Mesh(armGeometry, whiteMaterial);
    leftArm.position.set(-1.05, 0.3, 0);
    leftArm.castShadow = true;
    robot.add(leftArm);

    const rightArm = new THREE.Mesh(armGeometry, whiteMaterial);
    rightArm.position.set(1.05, 0.3, 0);
    rightArm.castShadow = true;
    robot.add(rightArm);

    /* Small hand details */
    const handMaterial = new THREE.MeshStandardMaterial({
      color: 0xf0f0f0,
      roughness: 0.3,
    });

    const leftHand = new THREE.Mesh(
      new THREE.SphereGeometry(0.08, 16, 16),
      handMaterial
    );
    leftHand.position.set(-1.05, 0.05, 0);
    robot.add(leftHand);

    const rightHand = new THREE.Mesh(
      new THREE.SphereGeometry(0.08, 16, 16),
      handMaterial
    );
    rightHand.position.set(1.05, 0.05, 0);
    robot.add(rightHand);

    /* ================= INTERACTION ================= */
    const baseY = -0.5;

    const onMove = (x, y) => {
      mouse.current.x = (x / width) * 2 - 1;
      mouse.current.y = -(y / height) * 2 + 1;
    };

    window.addEventListener('mousemove', e => onMove(e.clientX, e.clientY));
    window.addEventListener('touchmove', e => {
      if (e.touches[0]) onMove(e.touches[0].clientX, e.touches[0].clientY);
    });

    /* ================= ANIMATION ================= */
    let t = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      t += 0.01;

      // Head follows mouse with smooth interpolation
      const targetRotY = mouse.current.x * 0.4;
      const targetRotX = -mouse.current.y * 0.25;
      head.rotation.y += (targetRotY - head.rotation.y) * 0.08;
      head.rotation.x += (targetRotX - head.rotation.x) * 0.08;

      // Gentle floating animation
      robot.position.y = baseY + Math.sin(t * 1.2) * 0.08;
      robot.rotation.z = Math.sin(t * 0.6) * 0.02;

      // Arms float independently
      leftArm.position.y = 0.3 + Math.sin(t * 1.5 + 0) * 0.06;
      rightArm.position.y = 0.3 + Math.sin(t * 1.5 + Math.PI) * 0.06;
      
      leftHand.position.y = 0.05 + Math.sin(t * 1.5 + 0) * 0.06;
      rightHand.position.y = 0.05 + Math.sin(t * 1.5 + Math.PI) * 0.06;

      // Slight arm rotation
      leftArm.rotation.z = Math.sin(t * 0.8) * 0.1;
      rightArm.rotation.z = -Math.sin(t * 0.8) * 0.1;

      // Eye glow pulse
      eyeMaterial.emissiveIntensity = 1.5 + Math.sin(t * 2) * 0.2;

      renderer.render(scene, camera);
    };

    animate();

    /* ================= WINDOW RESIZE ================= */
    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    /* ================= CLEANUP ================= */
    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '117%', position: 'relative' }}>
      <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}