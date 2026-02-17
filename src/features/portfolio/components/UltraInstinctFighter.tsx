"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

type UltraInstinctFighterProps = {
  targetPosition?: THREE.Vector3;
  slowMotion?: boolean;
  auraIntensity?: number;
  onCatch?: () => void;
};

type ArmRig = {
  shoulder: THREE.Group;
  elbow: THREE.Group;
  hand: THREE.Mesh<THREE.SphereGeometry, THREE.MeshPhysicalMaterial>;
};

type LegRig = {
  hip: THREE.Group;
  knee: THREE.Group;
};

type DashSpark = {
  mesh: THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>;
  velocity: THREE.Vector3;
  life: number;
  maxLife: number;
};

const AURA_PARTICLES = 200;
const DASH_SPARK_POOL = 32;
const WORLD_X_LIMIT = 4.6;
const WORLD_Y_LIMIT = 1.65;

export function UltraInstinctFighter({
  targetPosition,
  slowMotion = false,
  auraIntensity = 1,
  onCatch,
}: UltraInstinctFighterProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef<THREE.Vector3 | null>(
    targetPosition?.clone() ?? null
  );
  const slowMotionRef = useRef(slowMotion);
  const auraIntensityRef = useRef(auraIntensity);
  const onCatchRef = useRef(onCatch);
  const [renderFailed, setRenderFailed] = useState(false);

  useEffect(() => {
    targetRef.current = targetPosition?.clone() ?? null;
  }, [targetPosition]);

  useEffect(() => {
    slowMotionRef.current = slowMotion;
  }, [slowMotion]);

  useEffect(() => {
    auraIntensityRef.current = auraIntensity;
  }, [auraIntensity]);

  useEffect(() => {
    onCatchRef.current = onCatch;
  }, [onCatch]);

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
      const scene = new THREE.Scene();
      scene.background = null;

      const camera = new THREE.PerspectiveCamera(33, 1, 0.1, 40);
      camera.position.set(0, 1.35, 5.2);

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(
        Math.max(host.clientWidth, 1),
        Math.max(host.clientHeight, 1),
        false
      );
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;
      host.appendChild(renderer.domElement);

      const topKey = new THREE.DirectionalLight(0xfff6eb, 1.55);
      topKey.position.set(0, 6, 2.5);
      scene.add(topKey);

      const coolRim = new THREE.DirectionalLight(0x8ec9ff, 2.4);
      coolRim.position.set(-5, 2.2, -3.2);
      scene.add(coolRim);

      const fill = new THREE.DirectionalLight(0x224477, 0.45);
      fill.position.set(4.5, 1.8, 2.6);
      scene.add(fill);

      const ambient = new THREE.AmbientLight(0x0b1020, 0.36);
      scene.add(ambient);

      const fighterRoot = new THREE.Group();
      fighterRoot.position.set(0, -0.18, 0);
      scene.add(fighterRoot);

      const fighter = new THREE.Group();
      fighterRoot.add(fighter);

      const skinMat = new THREE.MeshPhysicalMaterial({
        color: 0xd6a78f,
        roughness: 0.44,
        metalness: 0.01,
        clearcoat: 0.18,
        clearcoatRoughness: 0.35,
        sheen: 0.18,
        sheenColor: new THREE.Color(0xffc4a8),
      });

      const pantsMat = new THREE.MeshStandardMaterial({
        color: 0xc96406,
        roughness: 0.74,
        metalness: 0.05,
      });

      const fabricBlueMat = new THREE.MeshStandardMaterial({
        color: 0x1548a6,
        roughness: 0.68,
        metalness: 0.08,
      });

      const hairMat = new THREE.MeshStandardMaterial({
        color: 0xe5edff,
        roughness: 0.22,
        metalness: 0.72,
        emissive: 0x84b0ff,
        emissiveIntensity: 0.25,
      });

      const eyeMat = new THREE.MeshStandardMaterial({
        color: 0xdce8ff,
        roughness: 0.06,
        metalness: 0.25,
        emissive: 0xcfe0ff,
        emissiveIntensity: 0.78,
      });

      const torsoCore = new THREE.Mesh(
        new THREE.CapsuleGeometry(0.37, 0.64, 8, 24),
        skinMat
      );
      torsoCore.position.set(0, 1.54, 0.01);
      torsoCore.scale.set(1.1, 1.05, 0.82);
      fighter.add(torsoCore);

      const chestUpper = new THREE.Mesh(
        new THREE.SphereGeometry(0.33, 24, 24),
        skinMat
      );
      chestUpper.position.set(0, 1.82, 0.1);
      chestUpper.scale.set(1.25, 0.72, 0.72);
      fighter.add(chestUpper);

      const leftPec = new THREE.Mesh(
        new THREE.SphereGeometry(0.2, 24, 24),
        skinMat
      );
      leftPec.position.set(-0.2, 1.72, 0.23);
      leftPec.scale.set(1.25, 0.84, 0.56);
      fighter.add(leftPec);

      const rightPec = leftPec.clone();
      rightPec.position.x = 0.2;
      fighter.add(rightPec);

      const absGroup = new THREE.Group();
      absGroup.position.set(0, 1.32, 0.19);
      fighter.add(absGroup);
      for (let row = 0; row < 3; row += 1) {
        for (let col = -1; col <= 1; col += 2) {
          const ab = new THREE.Mesh(
            new THREE.SphereGeometry(0.09, 14, 14),
            skinMat
          );
          ab.scale.set(0.95, 0.58, 0.42);
          ab.position.set(col * (0.1 - row * 0.012), row * -0.11, 0);
          absGroup.add(ab);
        }
      }

      const obliqueLeft = new THREE.Mesh(
        new THREE.CapsuleGeometry(0.07, 0.24, 4, 10),
        skinMat
      );
      obliqueLeft.position.set(-0.28, 1.3, 0.12);
      obliqueLeft.rotation.z = -0.26;
      fighter.add(obliqueLeft);

      const obliqueRight = obliqueLeft.clone();
      obliqueRight.position.x = 0.28;
      obliqueRight.rotation.z = 0.26;
      fighter.add(obliqueRight);

      const waist = new THREE.Mesh(
        new THREE.CapsuleGeometry(0.27, 0.14, 4, 12),
        skinMat
      );
      waist.position.set(0, 1.03, 0.02);
      waist.scale.set(1, 0.92, 0.75);
      fighter.add(waist);

      const neck = new THREE.Mesh(
        new THREE.CylinderGeometry(0.115, 0.132, 0.22, 16),
        skinMat
      );
      neck.position.set(0, 2.1, 0.03);
      fighter.add(neck);

      const head = new THREE.Mesh(
        new THREE.SphereGeometry(0.325, 28, 28),
        skinMat
      );
      head.position.set(0, 2.44, 0.035);
      head.scale.set(1, 1.06, 0.96);
      fighter.add(head);

      const jaw = new THREE.Mesh(
        new THREE.BoxGeometry(0.34, 0.12, 0.21),
        skinMat
      );
      jaw.position.set(0, 2.27, 0.09);
      jaw.rotation.x = -0.1;
      fighter.add(jaw);

      const brow = new THREE.Mesh(
        new THREE.BoxGeometry(0.31, 0.05, 0.08),
        skinMat
      );
      brow.position.set(0, 2.52, 0.21);
      fighter.add(brow);

      const leftEye = new THREE.Mesh(
        new THREE.SphereGeometry(0.028, 12, 12),
        eyeMat
      );
      leftEye.position.set(-0.086, 2.44, 0.295);
      fighter.add(leftEye);
      const rightEye = leftEye.clone();
      rightEye.position.x = 0.086;
      fighter.add(rightEye);

      const hairRoot = new THREE.Group();
      hairRoot.position.set(0, 2.67, -0.02);
      fighter.add(hairRoot);

      const hairSpikes: THREE.Mesh<
        THREE.ConeGeometry,
        THREE.MeshStandardMaterial
      >[] = [];
      const spikeConfigs: Array<
        [number, number, number, number, number, number]
      > = [
        [0, 0.11, 0.17, -0.2, 0, 0.66],
        [0.2, 0.08, 0.11, -0.58, 0.24, 0.61],
        [-0.2, 0.08, 0.11, -0.58, -0.24, 0.61],
        [0.33, 0.05, -0.02, -0.78, 0.58, 0.53],
        [-0.33, 0.05, -0.02, -0.78, -0.58, 0.53],
        [0.18, 0.03, -0.16, -0.95, 0.3, 0.48],
        [-0.18, 0.03, -0.16, -0.95, -0.3, 0.48],
        [0, 0.01, -0.2, -1.08, 0, 0.45],
        [0.4, 0.06, 0.02, -0.68, 0.9, 0.46],
        [-0.4, 0.06, 0.02, -0.68, -0.9, 0.46],
        [0.31, 0.12, 0.12, -0.35, 0.52, 0.43],
        [-0.31, 0.12, 0.12, -0.35, -0.52, 0.43],
        [0.1, 0.18, 0.08, -0.1, 0.2, 0.42],
        [-0.1, 0.18, 0.08, -0.1, -0.2, 0.42],
        [0.06, 0.13, -0.14, -0.9, 0.08, 0.4],
        [-0.06, 0.13, -0.14, -0.9, -0.08, 0.4],
      ];

      spikeConfigs.forEach(([x, y, z, rotX, rotZ, scale]) => {
        const spike = new THREE.Mesh(
          new THREE.ConeGeometry(0.18 * scale, 0.74 * scale, 12),
          hairMat
        );
        spike.position.set(x, y, z);
        spike.rotation.set(rotX, 0, rotZ);
        spike.userData.baseRotX = rotX;
        spike.userData.baseRotZ = rotZ;
        hairRoot.add(spike);
        hairSpikes.push(spike);
      });

      const pants = new THREE.Mesh(
        new THREE.CapsuleGeometry(0.32, 0.72, 8, 18),
        pantsMat
      );
      pants.position.set(0, 0.62, 0.01);
      pants.scale.set(1.25, 1.08, 0.86);
      fighter.add(pants);

      const foldBandOne = new THREE.Mesh(
        new THREE.TorusGeometry(0.28, 0.035, 10, 26),
        pantsMat
      );
      foldBandOne.rotation.x = Math.PI / 2;
      foldBandOne.position.set(0, 0.84, 0.03);
      fighter.add(foldBandOne);

      const foldBandTwo = foldBandOne.clone();
      foldBandTwo.position.y = 0.52;
      foldBandTwo.scale.set(1.08, 1, 1);
      fighter.add(foldBandTwo);

      const sash = new THREE.Mesh(
        new THREE.TorusGeometry(0.345, 0.055, 16, 34),
        fabricBlueMat
      );
      sash.rotation.x = Math.PI / 2;
      sash.position.set(0, 1.04, 0.02);
      fighter.add(sash);

      const sashTail = new THREE.Mesh(
        new THREE.BoxGeometry(0.12, 0.34, 0.03),
        fabricBlueMat
      );
      sashTail.position.set(-0.09, 0.86, 0.15);
      sashTail.rotation.z = -0.22;
      fighter.add(sashTail);

      const leftArm = createArmRig(skinMat, fabricBlueMat);
      leftArm.shoulder.position.set(-0.46, 1.92, 0);
      fighter.add(leftArm.shoulder);
      const rightArm = createArmRig(skinMat, fabricBlueMat);
      rightArm.shoulder.position.set(0.46, 1.92, 0);
      fighter.add(rightArm.shoulder);

      const leftLeg = createLegRig(pantsMat, fabricBlueMat);
      leftLeg.hip.position.set(-0.18, 0.58, 0);
      fighter.add(leftLeg.hip);
      const rightLeg = createLegRig(pantsMat, fabricBlueMat);
      rightLeg.hip.position.set(0.18, 0.58, 0);
      fighter.add(rightLeg.hip);

      const auraPositions = new Float32Array(AURA_PARTICLES * 3);
      const auraSeeds = new Float32Array(AURA_PARTICLES);
      for (let i = 0; i < AURA_PARTICLES; i += 1) {
        const radius = 0.44 + Math.random() * 0.8;
        const angle = Math.random() * Math.PI * 2;
        const height = -0.38 + Math.random() * 3.15;
        auraPositions[i * 3] = Math.cos(angle) * radius;
        auraPositions[i * 3 + 1] = height;
        auraPositions[i * 3 + 2] = Math.sin(angle) * radius;
        auraSeeds[i] = Math.random() * Math.PI * 2;
      }

      const auraGeometry = new THREE.BufferGeometry();
      auraGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(auraPositions.slice(), 3)
      );
      const auraMaterial = new THREE.PointsMaterial({
        color: 0xd8ecff,
        size: 0.055,
        transparent: true,
        opacity: 0.42,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const aura = new THREE.Points(auraGeometry, auraMaterial);
      fighter.add(aura);

      const auraRing = new THREE.Mesh(
        new THREE.RingGeometry(0.56, 1.18, 48),
        new THREE.MeshBasicMaterial({
          color: 0xb8dcff,
          transparent: true,
          opacity: 0.12,
          blending: THREE.AdditiveBlending,
          side: THREE.DoubleSide,
          depthWrite: false,
        })
      );
      auraRing.rotation.x = Math.PI / 2;
      auraRing.position.set(0, 0.26, 0);
      fighter.add(auraRing);

      const shockwave = new THREE.Mesh(
        new THREE.RingGeometry(0.35, 0.42, 44),
        new THREE.MeshBasicMaterial({
          color: 0xe6f4ff,
          transparent: true,
          opacity: 0,
          blending: THREE.AdditiveBlending,
          side: THREE.DoubleSide,
          depthWrite: false,
        })
      );
      shockwave.rotation.x = Math.PI / 2;
      shockwave.position.y = 0.35;
      fighter.add(shockwave);

      const sparks: DashSpark[] = [];
      for (let i = 0; i < DASH_SPARK_POOL; i += 1) {
        const mesh = new THREE.Mesh(
          new THREE.SphereGeometry(0.045 + Math.random() * 0.03, 8, 8),
          new THREE.MeshBasicMaterial({
            color: 0xb6dbff,
            transparent: true,
            opacity: 0,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          })
        );
        mesh.visible = false;
        fighterRoot.add(mesh);
        sparks.push({
          mesh,
          velocity: new THREE.Vector3(),
          life: 0,
          maxLife: 0.2,
        });
      }
      let sparkCursor = 0;

      const motion = {
        elapsed: 0,
        timeScale: 1,
        cameraZoom: 0,
        velocity: new THREE.Vector3(),
        targetVelocity: new THREE.Vector3(),
        previousTarget: new THREE.Vector3(),
        hasTargetSnapshot: false,
        dashTime: 0,
        dashDirection: new THREE.Vector3(),
        dashCooldown: 0,
        catching: false,
        catchProgress: 0,
        recoverProgress: 0,
        catchPulse: 0,
        lastCatchHash: "",
      };

      const tmpTarget = new THREE.Vector3();
      const tmpPredict = new THREE.Vector3();
      const tmpToTarget = new THREE.Vector3();
      const tmpDir = new THREE.Vector3();
      const cameraLookAt = new THREE.Vector3();
      const cameraPos = new THREE.Vector3();
      const clock = new THREE.Clock();

      const spawnSpark = (direction: THREE.Vector3) => {
        const spark = sparks[sparkCursor];
        sparkCursor = (sparkCursor + 1) % sparks.length;
        spark.life = 0.18 + Math.random() * 0.14;
        spark.maxLife = spark.life;
        spark.mesh.visible = true;
        spark.mesh.position.copy(fighterRoot.position);
        spark.mesh.position.y += 0.7 + Math.random() * 1.1;
        spark.mesh.position.x += (Math.random() - 0.5) * 0.25;
        spark.mesh.position.z += (Math.random() - 0.5) * 0.22;
        spark.velocity
          .copy(direction)
          .multiplyScalar(-3.2 - Math.random() * 2.3)
          .add(
            new THREE.Vector3(
              (Math.random() - 0.5) * 1.3,
              0.35 + Math.random() * 0.5,
              (Math.random() - 0.5) * 0.8
            )
          );
      };

      const resize = () => {
        if (!renderer) {
          return;
        }
        const width = Math.max(host.clientWidth, 1);
        const height = Math.max(host.clientHeight, 1);
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      };

      resize();
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(host);

      const animate = () => {
        const rawDt = Math.min(clock.getDelta(), 1 / 30);
        motion.elapsed += rawDt;
        const target = targetRef.current;

        let distance = Number.POSITIVE_INFINITY;
        let nearTarget = false;
        if (target) {
          tmpTarget.copy(target);
          if (!motion.hasTargetSnapshot) {
            motion.previousTarget.copy(tmpTarget);
            motion.hasTargetSnapshot = true;
          } else {
            motion.targetVelocity
              .copy(tmpTarget)
              .sub(motion.previousTarget)
              .multiplyScalar(1 / Math.max(rawDt, 0.0001));
            motion.previousTarget.copy(tmpTarget);
          }

          tmpPredict
            .copy(tmpTarget)
            .addScaledVector(motion.targetVelocity, 0.08);
          tmpToTarget.copy(tmpPredict).sub(fighterRoot.position);
          distance = tmpToTarget.length();
          nearTarget = distance < 0.9;
        } else {
          motion.hasTargetSnapshot = false;
          motion.targetVelocity.set(0, 0, 0);
        }

        const shouldSlow = slowMotionRef.current || nearTarget;
        motion.timeScale = THREE.MathUtils.lerp(
          motion.timeScale,
          shouldSlow ? 0.42 : 1,
          0.1
        );
        const dt = rawDt * motion.timeScale;

        const dashMoving = motion.dashTime > 0;
        if (target && distance > 0.001) {
          tmpDir.copy(tmpToTarget).normalize();

          const desiredYaw = Math.atan2(tmpDir.x, tmpDir.z);
          fighter.rotation.y = lerpAngle(
            fighter.rotation.y,
            desiredYaw,
            0.1 + dt * 5.5
          );

          motion.dashCooldown = Math.max(0, motion.dashCooldown - dt);
          if (
            !motion.catching &&
            motion.dashCooldown <= 0 &&
            distance > 0.6 &&
            distance < 4.6
          ) {
            motion.dashTime = 0.19;
            motion.dashDirection.copy(tmpDir);
            motion.dashCooldown = 0.38;
          }

          const desiredSpeed = THREE.MathUtils.lerp(
            1.1,
            3,
            Math.min(distance / 2.4, 1)
          );
          const desiredVelocity = tmpDir.multiplyScalar(
            motion.catching ? 0 : desiredSpeed
          );
          motion.velocity.lerp(desiredVelocity, 1 - Math.exp(-10 * dt));

          if (motion.dashTime > 0) {
            const dashFactor = motion.dashTime / 0.19;
            motion.velocity.addScaledVector(
              motion.dashDirection,
              9 * dashFactor * dt
            );
            if (Math.random() < 0.72) {
              spawnSpark(motion.dashDirection);
            }
            motion.dashTime = Math.max(0, motion.dashTime - dt);
          }

          fighterRoot.position.addScaledVector(motion.velocity, dt);
          fighterRoot.position.x = THREE.MathUtils.clamp(
            fighterRoot.position.x,
            -WORLD_X_LIMIT,
            WORLD_X_LIMIT
          );
          fighterRoot.position.y = THREE.MathUtils.clamp(
            fighterRoot.position.y,
            -WORLD_Y_LIMIT,
            WORLD_Y_LIMIT
          );

          if (!motion.catching && distance < 0.3) {
            motion.catching = true;
            motion.catchProgress = 0;
            motion.catchPulse = 1;
            const targetHash = `${target.x.toFixed(2)}:${target.y.toFixed(2)}:${target.z.toFixed(2)}`;
            if (targetHash !== motion.lastCatchHash) {
              motion.lastCatchHash = targetHash;
              onCatchRef.current?.();
            }
          }
        } else {
          motion.velocity.lerp(
            new THREE.Vector3(0, 0, 0),
            1 - Math.exp(-6 * dt)
          );
          const home = new THREE.Vector3(0, -0.18, 0);
          fighterRoot.position.lerp(home, 1 - Math.exp(-2.5 * dt));
        }

        if (motion.catching) {
          motion.catchProgress = Math.min(1, motion.catchProgress + dt * 4.8);
          if (motion.catchProgress >= 1) {
            motion.catching = false;
            motion.recoverProgress = 1;
          }
        } else if (motion.recoverProgress > 0) {
          motion.recoverProgress = Math.max(
            0,
            motion.recoverProgress - dt * 2.8
          );
        }
        motion.catchPulse = Math.max(0, motion.catchPulse - rawDt * 2);

        const velocityMag = motion.velocity.length();
        const catchBlend = motion.catching
          ? easeOutCubic(motion.catchProgress)
          : motion.recoverProgress;

        fighter.position.y =
          Math.sin(motion.elapsed * 1.9) * 0.055 + velocityMag * 0.015;
        torsoCore.scale.y = 1 + Math.sin(motion.elapsed * 2.2) * 0.025;
        chestUpper.scale.y = 0.72 + Math.sin(motion.elapsed * 2.2) * 0.024;

        leftArm.shoulder.rotation.set(
          -0.42 + Math.sin(motion.elapsed * 3.6) * 0.05,
          0.08,
          0.66 + Math.sin(motion.elapsed * 2.5) * 0.03
        );
        leftArm.elbow.rotation.set(
          -0.6 + Math.sin(motion.elapsed * 3.3) * 0.04,
          0,
          0.48
        );

        rightArm.shoulder.rotation.set(
          -0.86 - catchBlend * 0.72 + Math.sin(motion.elapsed * 3.8) * 0.04,
          0.03,
          -0.72
        );
        rightArm.elbow.rotation.set(-0.42 - catchBlend * 0.65, 0, -0.2);
        rightArm.hand.scale.set(
          1.16 - catchBlend * 0.28,
          0.82 + catchBlend * 0.24,
          1.16 - catchBlend * 0.28
        );

        leftLeg.hip.rotation.set(
          0.09 + Math.sin(motion.elapsed * 2.8) * 0.03,
          0,
          0.05
        );
        leftLeg.knee.rotation.set(
          -0.2 + Math.sin(motion.elapsed * 2.3) * 0.03,
          0,
          0
        );
        rightLeg.hip.rotation.set(
          -0.14 + Math.sin(motion.elapsed * 2.6 + 0.2) * 0.03,
          0,
          -0.06
        );
        rightLeg.knee.rotation.set(
          -0.06 + Math.sin(motion.elapsed * 2.2 + 0.4) * 0.02,
          0,
          0
        );

        sashTail.rotation.x =
          Math.sin(motion.elapsed * 2.4) * 0.09 + velocityMag * 0.07;
        sashTail.rotation.z = -0.22 + Math.sin(motion.elapsed * 2.1) * 0.05;

        hairMat.emissiveIntensity =
          0.22 +
          Math.sin(motion.elapsed * 8.5) * 0.05 +
          (nearTarget ? 0.08 : 0) +
          motion.catchPulse * 0.14;
        eyeMat.emissiveIntensity =
          0.72 + (nearTarget ? 0.2 : 0) + motion.catchPulse * 0.2;

        hairSpikes.forEach((spike, index) => {
          const baseRotX = Number(spike.userData.baseRotX);
          const baseRotZ = Number(spike.userData.baseRotZ);
          spike.rotation.x =
            baseRotX + Math.sin(motion.elapsed * 2.6 + index * 0.25) * 0.04;
          spike.rotation.z =
            baseRotZ +
            Math.cos(motion.elapsed * 2.8 + index * 0.3) *
              (0.025 + velocityMag * 0.0025);
        });

        const auraPower =
          Math.max(0.6, auraIntensityRef.current) *
          (0.6 +
            Math.min(velocityMag, 2.8) * 0.24 +
            (nearTarget ? 0.4 : 0) +
            motion.catchPulse * 0.9);
        auraMaterial.opacity = THREE.MathUtils.clamp(
          0.18 + auraPower * 0.22,
          0.2,
          0.98
        );
        auraMaterial.size = 0.045 + Math.min(auraPower, 2.8) * 0.018;
        auraRing.material.opacity = THREE.MathUtils.clamp(
          0.08 + auraPower * 0.05 + motion.catchPulse * 0.12,
          0.05,
          0.45
        );
        auraRing.scale.setScalar(
          1 + Math.sin(motion.elapsed * 3.2) * 0.1 + auraPower * 0.07
        );

        const auraAttr = auraGeometry.getAttribute(
          "position"
        ) as THREE.BufferAttribute;
        for (let i = 0; i < AURA_PARTICLES; i += 1) {
          const index = i * 3;
          const seed = auraSeeds[i];
          const spiral = 0.055 + auraPower * 0.012;
          auraAttr.array[index] =
            auraPositions[index] +
            Math.sin(motion.elapsed * 2.1 + seed) * spiral;
          auraAttr.array[index + 1] =
            auraPositions[index + 1] +
            Math.sin(motion.elapsed * 5.2 + seed * 0.7) *
              (0.045 + auraPower * 0.008);
          auraAttr.array[index + 2] =
            auraPositions[index + 2] +
            Math.cos(motion.elapsed * 2 + seed) * spiral;
        }
        auraAttr.needsUpdate = true;

        const shockMaterial = shockwave.material;
        if (motion.catchPulse > 0.01) {
          shockMaterial.opacity = motion.catchPulse * 0.7;
          shockwave.scale.setScalar(1 + (1 - motion.catchPulse) * 4.5);
        } else {
          shockMaterial.opacity = 0;
          shockwave.scale.setScalar(1);
        }

        sparks.forEach((spark) => {
          if (spark.life <= 0) {
            spark.mesh.visible = false;
            return;
          }
          spark.life -= rawDt;
          spark.mesh.visible = spark.life > 0;
          spark.mesh.position.addScaledVector(spark.velocity, rawDt);
          spark.velocity.multiplyScalar(0.92);
          spark.velocity.y += 0.3 * rawDt;
          spark.mesh.material.opacity = (spark.life / spark.maxLife) * 0.52;
          spark.mesh.scale.setScalar(
            0.8 + (1 - spark.life / spark.maxLife) * 0.4
          );
        });

        motion.cameraZoom = THREE.MathUtils.lerp(
          motion.cameraZoom,
          shouldSlow ? 1 : dashMoving ? 0.4 : 0,
          0.08
        );
        camera.fov = THREE.MathUtils.lerp(
          camera.fov,
          33 - motion.cameraZoom * 5,
          0.08
        );
        camera.updateProjectionMatrix();

        const orbit = motion.elapsed * 0.28;
        cameraPos.set(
          fighterRoot.position.x * 0.42 + Math.sin(orbit) * 0.24,
          1.36 + fighterRoot.position.y * 0.14 + Math.sin(orbit * 1.3) * 0.04,
          5.15 - motion.cameraZoom * 0.95 + Math.cos(orbit) * 0.1
        );
        camera.position.lerp(cameraPos, 1 - Math.exp(-5 * rawDt));
        cameraLookAt.set(
          fighterRoot.position.x * 0.2,
          1.44 + fighterRoot.position.y * 0.2,
          0
        );
        camera.lookAt(cameraLookAt);

        renderer?.render(scene, camera);
        frameId = window.requestAnimationFrame(animate);
      };

      animate();

      return () => {
        if (frameId) {
          window.cancelAnimationFrame(frameId);
        }
        if (resizeObserver) {
          resizeObserver.disconnect();
        }
        scene.traverse((object) => {
          const mesh = object as THREE.Mesh;
          if (mesh.geometry) {
            mesh.geometry.dispose();
          }
          const material = mesh.material as
            | THREE.Material
            | THREE.Material[]
            | undefined;
          if (Array.isArray(material)) {
            material.forEach((item) => item.dispose());
          } else if (material) {
            material.dispose();
          }
        });
        auraGeometry.dispose();
        if (renderer) {
          renderer.dispose();
          if (renderer.domElement.parentNode === host) {
            host.removeChild(renderer.domElement);
          }
        }
      };
    } catch {
      markRenderFailed();
      return () => {};
    }
  }, []);

  if (renderFailed) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <span className="text-sm text-zinc-300/70">WebGL unavailable</span>
      </div>
    );
  }

  return <div ref={hostRef} className="h-full w-full" aria-hidden />;
}

function createArmRig(
  skinMat: THREE.MeshPhysicalMaterial,
  bandMat: THREE.MeshStandardMaterial
): ArmRig {
  const shoulder = new THREE.Group();

  const shoulderCap = new THREE.Mesh(
    new THREE.SphereGeometry(0.145, 18, 18),
    skinMat
  );
  shoulderCap.position.set(0, -0.02, 0);
  shoulder.add(shoulderCap);

  const upper = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.105, 0.36, 6, 14),
    skinMat
  );
  upper.position.y = -0.3;
  shoulder.add(upper);

  const elbow = new THREE.Group();
  elbow.position.y = -0.58;
  shoulder.add(elbow);

  const forearm = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.09, 0.31, 6, 12),
    skinMat
  );
  forearm.position.y = -0.24;
  elbow.add(forearm);

  const hand = new THREE.Mesh(new THREE.SphereGeometry(0.124, 14, 14), skinMat);
  hand.position.y = -0.5;
  hand.scale.set(1.16, 0.82, 1.16);
  elbow.add(hand);

  const wristband = new THREE.Mesh(
    new THREE.TorusGeometry(0.082, 0.024, 8, 20),
    bandMat
  );
  wristband.rotation.x = Math.PI / 2;
  wristband.position.y = -0.39;
  elbow.add(wristband);

  return { shoulder, elbow, hand };
}

function createLegRig(
  pantsMat: THREE.MeshStandardMaterial,
  bootMat: THREE.MeshStandardMaterial
): LegRig {
  const hip = new THREE.Group();

  const thigh = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.12, 0.42, 6, 12),
    pantsMat
  );
  thigh.position.y = -0.32;
  hip.add(thigh);

  const knee = new THREE.Group();
  knee.position.y = -0.66;
  hip.add(knee);

  const shin = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.103, 0.36, 6, 12),
    pantsMat
  );
  shin.position.y = -0.26;
  knee.add(shin);

  const ankleBand = new THREE.Mesh(
    new THREE.TorusGeometry(0.09, 0.023, 8, 20),
    bootMat
  );
  ankleBand.rotation.x = Math.PI / 2;
  ankleBand.position.y = -0.5;
  knee.add(ankleBand);

  const foot = new THREE.Mesh(
    new THREE.CapsuleGeometry(0.11, 0.12, 4, 10),
    bootMat
  );
  foot.position.set(0, -0.56, 0.09);
  foot.rotation.x = Math.PI / 2.2;
  knee.add(foot);

  return { hip, knee };
}

function easeOutCubic(value: number) {
  const t = THREE.MathUtils.clamp(value, 0, 1);
  return 1 - Math.pow(1 - t, 3);
}

function lerpAngle(current: number, target: number, alpha: number) {
  const delta = ((target - current + Math.PI) % (Math.PI * 2)) - Math.PI;
  return current + delta * THREE.MathUtils.clamp(alpha, 0, 1);
}
