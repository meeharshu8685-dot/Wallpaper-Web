
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const FloatingObject: React.FC = () => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.getElapsedTime();
        meshRef.current.rotation.x = Math.sin(time / 4);
        meshRef.current.rotation.y = Math.cos(time / 2);
    });

    return (
        <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
            <Sphere ref={meshRef} args={[1, 64, 64]} scale={1.5}>
                <MeshDistortMaterial
                    color="#b91c1c"
                    speed={3}
                    distort={0.4}
                    radius={1}
                    metalness={0.8}
                    roughness={0.2}
                    emissive="#500000"
                    emissiveIntensity={0.5}
                />
            </Sphere>
        </Float>
    );
};

const DHHScene: React.FC = () => {
    return (
        <div className="absolute inset-0 -z-10 h-full w-full opacity-60 pointer-events-none">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#ffffff" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#b91c1c" />
                <FloatingObject />
            </Canvas>
        </div>
    );
};

export default DHHScene;
