import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface WireframeSphereProps {
  isDark?: boolean;
}

export const WireframeSphere: React.FC<WireframeSphereProps> = ({ isDark = false }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5.2;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for composite rotations
    const group = new THREE.Group();
    scene.add(group);

    // 1. Inner Geodesic Wireframe Sphere
    const sphereGeo = new THREE.IcosahedronGeometry(1.8, 2);
    const wireframe = new THREE.WireframeGeometry(sphereGeo);
    
    const wireframeColor = isDark ? 0xFDA228 : 0x222222;
    const lineMat = new THREE.LineBasicMaterial({
      color: wireframeColor,
      transparent: true,
      opacity: isDark ? 0.45 : 0.25,
      linewidth: 1,
    });
    const lineMesh = new THREE.LineSegments(wireframe, lineMat);
    group.add(lineMesh);

    // 2. Vertex Points (Glowing nodes)
    const pointsMat = new THREE.PointsMaterial({
      color: isDark ? 0xFFFFFF : 0xFDA228,
      size: isDark ? 0.05 : 0.04,
      transparent: true,
      opacity: isDark ? 0.8 : 0.6,
    });
    const pointsMesh = new THREE.Points(sphereGeo, pointsMat);
    group.add(pointsMesh);

    // 3. Outer Floating Equatorial Rings
    const ringGeo = new THREE.RingGeometry(2.3, 2.32, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0xFDA228 : 0x333333,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: isDark ? 0.35 : 0.18,
    });
    const ringMesh1 = new THREE.Mesh(ringGeo, ringMat);
    ringMesh1.rotation.x = Math.PI / 3;
    group.add(ringMesh1);

    const ringMesh2 = new THREE.Mesh(ringGeo, ringMat);
    ringMesh2.rotation.y = Math.PI / 4;
    ringMesh2.rotation.x = -Math.PI / 6;
    group.add(ringMesh2);

    // Mouse Tracking with Inertia
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX = (event.clientX / innerWidth) * 2 - 1;
      mouseY = -(event.clientY / innerHeight) * 2 + 1;
      targetRotationY = mouseX * 0.8;
      targetRotationX = -mouseY * 0.8;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();

      // Constant slow idle rotation
      lineMesh.rotation.y += delta * 0.15;
      lineMesh.rotation.x += delta * 0.08;
      pointsMesh.rotation.y += delta * 0.15;
      pointsMesh.rotation.x += delta * 0.08;

      ringMesh1.rotation.z += delta * 0.2;
      ringMesh2.rotation.z -= delta * 0.18;

      // Smooth mouse follow with damping
      group.rotation.y += (targetRotationY - group.rotation.y) * 0.05;
      group.rotation.x += (targetRotationX - group.rotation.x) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      sphereGeo.dispose();
      wireframe.dispose();
      lineMat.dispose();
      pointsMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, [isDark]);

  return (
    <div
      ref={mountRef}
      className="w-full h-full pointer-events-none flex items-center justify-center"
      aria-hidden="true"
    />
  );
};
