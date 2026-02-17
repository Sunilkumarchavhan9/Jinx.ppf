"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

type UltraInstinctFighter3DProps = {
  facingLeft: boolean;
};

export function UltraInstinctFighter3D({
  facingLeft,
}: UltraInstinctFighter3DProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const facingRef = useRef(facingLeft);
  const [renderFailed, setRenderFailed] = useState(false);

  useEffect(() => {
    facingRef.current = facingLeft;
  }, [facingLeft]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) {
      return;
    }

    let frameId = 0;
    let renderer: THREE.WebGLRenderer | null = null;
    let resizeObserver: ResizeObserver | null = null;

    const markRenderFailed = () => {
      window.setTimeout(() => {
        setRenderFailed(true);
      }, 0);
    };

    try {
      // Scene and cinematic camera.
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 30);
      camera.position.set(0, 1.45, 4.1);

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;
      host.appendChild(renderer.domElement);

      const keyLight = new THREE.DirectionalLight(0xffffff, 1.35);
      keyLight.position.set(2.4, 4.4, 3.5);
      scene.add(keyLight);

      const rimLight = new THREE.DirectionalLight(0xa7d9ff, 2.2);
      rimLight.position.set(-3.8, 2.2, -2.8);
      scene.add(rimLight);

      const fillLight = new THREE.HemisphereLight(0xb8ddff, 0x0a0f19, 0.85);
      scene.add(fillLight);

      const fighter = new THREE.Group();
      fighter.position.y = -0.72;
      scene.add(fighter);

      const skinMat = new THREE.MeshPhysicalMaterial({
        color: 0xdfb29a,
        roughness: 0.5,
        metalness: 0.02,
        clearcoat: 0.08,
      });
      const giMat = new THREE.MeshStandardMaterial({
        color: 0xd56a06,
        roughness: 0.76,
        metalness: 0.08,
      });
      const blueMat = new THREE.MeshStandardMaterial({
        color: 0x1f4fbd,
        roughness: 0.62,
        metalness: 0.1,
      });
      const hairMat = new THREE.MeshStandardMaterial({
        color: 0xe8f0ff,
        roughness: 0.22,
        metalness: 0.72,
        emissive: 0x8ab7ff,
        emissiveIntensity: 0.18,
      });
      const eyeMat = new THREE.MeshStandardMaterial({
        color: 0xdde8ff,
        emissive: 0xdde8ff,
        emissiveIntensity: 0.8,
        roughness: 0.12,
        metalness: 0.22,
      });

      // Core body volumes.
      const torso = new THREE.Mesh(
        new THREE.CapsuleGeometry(0.34, 0.72, 5, 12),
        giMat
      );
      torso.position.set(0, 1.58, 0);
      fighter.add(torso);

      const neck = new THREE.Mesh(
        new THREE.CylinderGeometry(0.11, 0.13, 0.2),
        skinMat
      );
      neck.position.set(0, 2.11, 0.03);
      fighter.add(neck);

      const head = new THREE.Mesh(
        new THREE.SphereGeometry(0.31, 24, 24),
        skinMat
      );
      head.position.set(0, 2.43, 0.03);
      fighter.add(head);

      const giBelt = new THREE.Mesh(
        new THREE.TorusGeometry(0.34, 0.05, 10, 24),
        blueMat
      );
      giBelt.rotation.x = Math.PI / 2;
      giBelt.position.set(0, 1.2, 0.02);
      fighter.add(giBelt);

      const pants = new THREE.Mesh(
        new THREE.CapsuleGeometry(0.29, 0.58, 6, 12),
        giMat
      );
      pants.position.set(0, 0.73, 0);
      fighter.add(pants);

      const leftEye = new THREE.Mesh(
        new THREE.SphereGeometry(0.028, 12, 12),
        eyeMat
      );
      leftEye.position.set(-0.09, 2.45, 0.286);
      fighter.add(leftEye);

      const rightEye = leftEye.clone();
      rightEye.position.x = 0.09;
      fighter.add(rightEye);

      // Hair spikes for ultra-instinct silhouette.
      const hairRoot = new THREE.Group();
      hairRoot.position.set(0, 2.62, -0.01);
      fighter.add(hairRoot);

      const spikeConfig: Array<
        [number, number, number, number, number, number]
      > = [
        [0, 0, 0.17, -0.25, 0, 0.64],
        [0.18, 0.02, 0.08, -0.65, 0.4, 0.58],
        [-0.18, 0.02, 0.08, -0.65, -0.4, 0.58],
        [0.27, 0.01, -0.1, -0.82, 0.85, 0.5],
        [-0.27, 0.01, -0.1, -0.82, -0.85, 0.5],
        [0, 0.08, -0.12, -1.05, 0, 0.46],
      ];

      spikeConfig.forEach(([x, y, z, rotX, rotZ, scale]) => {
        const spike = new THREE.Mesh(
          new THREE.ConeGeometry(0.13 * scale, 0.54 * scale, 9),
          hairMat
        );
        spike.position.set(x, y, z);
        spike.rotation.x = rotX;
        spike.rotation.z = rotZ;
        hairRoot.add(spike);
      });

      // Limbs and combat-ready pose (open palm forward).
      const leftArm = createArm(skinMat, blueMat);
      leftArm.root.position.set(-0.41, 1.92, 0);
      leftArm.root.rotation.z = 0.48;
      leftArm.root.rotation.x = -0.25;
      leftArm.elbow.rotation.z = 0.48;
      leftArm.hand.rotation.x = 0.6;
      fighter.add(leftArm.root);

      const rightArm = createArm(skinMat, blueMat);
      rightArm.root.position.set(0.41, 1.92, 0);
      rightArm.root.rotation.z = -0.68;
      rightArm.root.rotation.x = -0.85;
      rightArm.elbow.rotation.z = -0.14;
      rightArm.elbow.rotation.x = -0.48;
      rightArm.hand.scale.set(1.22, 0.82, 1.22); // flatter open-palm look
      fighter.add(rightArm.root);

      const leftLeg = createLeg(giMat, blueMat);
      leftLeg.root.position.set(-0.18, 0.62, 0);
      leftLeg.root.rotation.x = 0.08;
      fighter.add(leftLeg.root);

      const rightLeg = createLeg(giMat, blueMat);
      rightLeg.root.position.set(0.18, 0.62, 0);
      rightLeg.root.rotation.x = -0.16;
      fighter.add(rightLeg.root);

      // Procedural aura particles and heat-like halo.
      const auraCount = 170;
      const auraPositions = new Float32Array(auraCount * 3);
      const auraSeeds = new Float32Array(auraCount);
      for (let i = 0; i < auraCount; i++) {
        const radius = 0.45 + Math.random() * 0.62;
        const angle = Math.random() * Math.PI * 2;
        const height = -0.22 + Math.random() * 2.86;
        auraPositions[i * 3] = Math.cos(angle) * radius;
        auraPositions[i * 3 + 1] = height;
        auraPositions[i * 3 + 2] = Math.sin(angle) * radius;
        auraSeeds[i] = Math.random() * Math.PI * 2;
      }

      const auraGeometry = new THREE.BufferGeometry();
      auraGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(auraPositions, 3)
      );
      const auraMaterial = new THREE.PointsMaterial({
        color: 0xd0ebff,
        size: 0.05,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const auraParticles = new THREE.Points(auraGeometry, auraMaterial);
      fighter.add(auraParticles);

      const auraHalo = new THREE.Mesh(
        new THREE.RingGeometry(0.5, 1.15, 52),
        new THREE.MeshBasicMaterial({
          color: 0xbddcff,
          transparent: true,
          opacity: 0.12,
          side: THREE.DoubleSide,
          blending: THREE.AdditiveBlending,
        })
      );
      auraHalo.rotation.x = Math.PI / 2;
      auraHalo.position.set(0, 0.34, 0);
      fighter.add(auraHalo);

      const clock = new THREE.Clock();

      const resize = () => {
        const width = Math.max(host.clientWidth, 72);
        const height = Math.max(host.clientHeight, 72);
        renderer?.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };

      resize();
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(host);

      const animate = () => {
        const t = clock.getElapsedTime();

        // Subtle floating body motion.
        fighter.position.y = -0.72 + Math.sin(t * 2.7) * 0.05;
        fighter.rotation.y = THREE.MathUtils.lerp(
          fighter.rotation.y,
          facingRef.current ? 0.44 : -0.44,
          0.09
        );

        // Breathing + stance micro motion.
        torso.scale.y = 1 + Math.sin(t * 2.2) * 0.018;
        leftArm.root.rotation.x = -0.25 + Math.sin(t * 4.1) * 0.05;
        rightArm.root.rotation.x = -0.85 + Math.sin(t * 5) * 0.04;
        leftLeg.root.rotation.x = 0.08 + Math.sin(t * 3.4) * 0.03;
        rightLeg.root.rotation.x = -0.16 + Math.sin(t * 3.3 + 0.4) * 0.03;

        // Hair energy flicker.
        hairMat.emissiveIntensity = 0.15 + (Math.sin(t * 10) + 1) * 0.07;
        eyeMat.emissiveIntensity = 0.65 + (Math.sin(t * 8) + 1) * 0.2;

        // Animate aura particles around the fighter.
        const positions = auraGeometry.attributes.position;
        for (let i = 0; i < auraCount; i++) {
          const index = i * 3;
          const seed = auraSeeds[i];
          const baseX = auraPositions[index];
          const baseY = auraPositions[index + 1];
          const baseZ = auraPositions[index + 2];

          positions.array[index] = baseX + Math.sin(t * 2.3 + seed) * 0.06;
          positions.array[index + 1] = baseY + Math.sin(t * 5 + seed) * 0.045;
          positions.array[index + 2] = baseZ + Math.cos(t * 2 + seed) * 0.06;
        }
        positions.needsUpdate = true;

        auraHalo.scale.setScalar(1 + Math.sin(t * 3.6) * 0.08);
        auraHalo.material.opacity = 0.09 + (Math.sin(t * 3.6) + 1) * 0.04;

        renderer?.render(scene, camera);
        frameId = window.requestAnimationFrame(animate);
      };

      animate();
    } catch {
      markRenderFailed();
    }

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      if (renderer) {
        renderer.dispose();
        if (renderer.domElement.parentNode === host) {
          host.removeChild(renderer.domElement);
        }
      }
    };
  }, []);

  if (renderFailed) {
    return (
      <span
        className="text-2xl drop-shadow-[0_0_12px_rgba(255,255,255,0.35)]"
        aria-hidden
      >
        🥋
      </span>
    );
  }

  return <div ref={hostRef} className="h-full w-full" aria-hidden />;
}

function createArm(skinMat: THREE.Material, bandMat: THREE.Material) {
  const root = new THREE.Group();
  const upperArm = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.09, 0.32, 5, 12),
    skinMat
  );
  upperArm.position.y = -0.28;
  root.add(upperArm);

  const elbow = new THREE.Group();
  elbow.position.y = -0.56;
  root.add(elbow);

  const lowerArm = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.08, 0.28, 5, 12),
    skinMat
  );
  lowerArm.position.y = -0.21;
  elbow.add(lowerArm);

  const hand = new THREE.Mesh(new THREE.SphereGeometry(0.12, 14, 14), skinMat);
  hand.position.y = -0.45;
  elbow.add(hand);

  const wristBand = new THREE.Mesh(
    new THREE.TorusGeometry(0.08, 0.024, 8, 18),
    bandMat
  );
  wristBand.rotation.x = Math.PI / 2;
  wristBand.position.y = -0.38;
  elbow.add(wristBand);

  return { root, elbow, hand };
}

function createLeg(pantsMat: THREE.Material, shoeMat: THREE.Material) {
  const root = new THREE.Group();
  const thigh = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.11, 0.38, 6, 12),
    pantsMat
  );
  thigh.position.y = -0.28;
  root.add(thigh);

  const knee = new THREE.Group();
  knee.position.y = -0.62;
  root.add(knee);

  const shin = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.1, 0.36, 6, 12),
    pantsMat
  );
  shin.position.y = -0.25;
  knee.add(shin);

  const boot = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.12, 0.14, 4, 10),
    shoeMat
  );
  boot.position.set(0, -0.51, 0.09);
  boot.rotation.x = Math.PI / 2.25;
  knee.add(boot);

  return { root };
}
