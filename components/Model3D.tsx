"use client";

import { useRef, useState, useEffect } from "react";
import { useGLTF, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const modelRef = useRef<THREE.Group>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state: any) => {
    if (modelRef.current) {
      // Rotação horizontal suave
      modelRef.current.rotation.y += 0.005;

      // Seguir o mouse suavemente
      modelRef.current.rotation.x = THREE.MathUtils.lerp(
        modelRef.current.rotation.x,
        mousePosition.y * 0.2,
        0.1
      );
    }
  });

  return (
    <group ref={modelRef} position={[0, -0.5, 0]}>
      <primitive object={scene} scale={2.2} />
    </group>
  );
}

export default function Model3D() {
  return (
    <div className="w-full h-[600px]">
      <Canvas camera={{ position: [0, 0, 10], fov: 40 }}>
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={2} />
        <pointLight position={[10, 10, 10]} intensity={3} color="#ffcc00" />
        <pointLight position={[-10, -10, -10]} intensity={3} color="#00ccff" />
        <spotLight
          position={[0, 10, 0]}
          angle={0.5}
          penumbra={1}
          intensity={2}
          castShadow
        />
        <Model url="/model.glb" />
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}
