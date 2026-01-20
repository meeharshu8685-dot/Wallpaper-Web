
import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const Particles: React.FC<{ count: number; mousePosition: { x: number; y: number } }> = ({ count, mousePosition }) => {
  const ref = useRef<THREE.Points>(null!);
  const lightRef = useRef<THREE.PointLight>(null!);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const x = (Math.random() - 0.5) * factor;
      const y = (Math.random() - 0.5) * factor;
      const z = (Math.random() - 0.5) * factor;

      temp.push({ t, factor, speed, x, y, z });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = particles[i].x;
      pos[i * 3 + 1] = particles[i].y;
      pos[i * 3 + 2] = particles[i].z;
    }
    return pos;
  }, [count, particles]);

  const mouseVec = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    const { viewport } = state;
    mouseVec.lerp({
      x: (mousePosition.x / viewport.width) * 2 - 1,
      y: -(mousePosition.y / viewport.height) * 2 + 1,
      z: 0
    }, 0.1);

    lightRef.current.position.set(mouseVec.x * viewport.width / 2, mouseVec.y * viewport.height / 2, 2);

    particles.forEach((particle, i) => {
      let { t, factor, speed, x, y, z } = particle;
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);

      dummy.position.set(
        x + a * (factor / 5),
        y + b * (factor / 5),
        z + b * (factor / 5)
      );
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      ref.current.geometry.attributes.position.setXYZ(i, dummy.position.x, dummy.position.y, dummy.position.z);
    });

    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.rotation.y += delta / 20;
    ref.current.rotation.x += delta / 40;
  });

  return (
    <>
      <pointLight ref={lightRef} distance={50} intensity={10} color="#ff0000" />
      <pointLight position={[10, 10, 5]} distance={100} intensity={2} color="#ffd700" />
      <pointLight position={[-10, -10, 5]} distance={100} intensity={2} color="#ff0000" />
      <Points ref={ref} positions={positions as any} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.4}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </>
  );
};

const LiveBackground: React.FC<{ mousePosition: { x: number, y: number } }> = ({ mousePosition }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <Particles count={5000} mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
};

export default LiveBackground;
