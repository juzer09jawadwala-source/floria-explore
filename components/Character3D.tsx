"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function Character3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 400;

    // Mathematical framing:
    // The character is placed in the lower 50% of the hero section.
    // Base is pinned flush at world Y = 0 (bottom edge of the canvas/hero, 0 gap).
    // The cap reaches ~94% of the canvas height, which equals the vertical midpoint of the hero.
    const fov = 34;
    const fovRad = (fov * Math.PI) / 180;
    const initialAspect = width / height;

    const camera = new THREE.PerspectiveCamera(fov, initialAspect, 0.1, 100);
    const cameraTarget = new THREE.Vector3(0, 0, 0);

    // Function to calculate exact camera framing
    const updateCameraFraming = (w: number, h: number) => {
      const aspect = w / h;
      camera.aspect = aspect;

      // Model scaled 40% bigger (1.54x scale, 40% larger than 1.1x)
      const modelScale = 1.54;
      const modelH = 0.97525 * modelScale;
      // Headroom factor: 0.94 places cap at 94% of canvas height
      const baseFrustumH = modelH / 0.94; // ~1.597

      // On narrower screens (aspect < 1.05), adjust distance so shoulders aren't cropped
      const aspectFactor = aspect < 1.05 ? Math.max(0.7, aspect / 1.05) : 1.0;
      const frustumH = baseFrustumH / aspectFactor;

      const camY = frustumH / 2;
      const camZ = frustumH / (2 * Math.tan(fovRad / 2));

      camera.position.set(0, camY, camZ);
      cameraTarget.set(0, camY, 0);
      camera.lookAt(cameraTarget);
      camera.updateProjectionMatrix();

      return { camY, camZ };
    };

    let { camY: currentCamY } = updateCameraFraming(width, height);

    // Transparent WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // Eliminate any browser inline canvas baseline gap
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.pointerEvents = "none";
    renderer.domElement.style.margin = "0";
    renderer.domElement.style.padding = "0";
    renderer.domElement.style.zIndex = "1000";
    container.appendChild(renderer.domElement);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xfff8ee, 1.9);
    scene.add(ambientLight);

    // Warm key light
    const keyLight = new THREE.DirectionalLight(0xfff0d8, 2.9);
    keyLight.position.set(2.2, 3.0, 2.5);
    scene.add(keyLight);

    // Cool rim light for depth separation
    const rimLight = new THREE.DirectionalLight(0xb0d5ff, 2.0);
    rimLight.position.set(-2.2, 2.8, -2.0);
    scene.add(rimLight);

    // Front soft fill
    const frontLight = new THREE.DirectionalLight(0xffffff, 1.4);
    frontLight.position.set(0, 1.5, 2.5);
    scene.add(frontLight);

    // Warm point light for glowing pipe accent
    const pipeAccent = new THREE.PointLight(0xffaa44, 2.0, 2.5);
    pipeAccent.position.set(0.35, 0.32, 0.50);
    scene.add(pipeAccent);

    // Root and Pivot Groups (scaled 1.54x = 40% bigger than 1.1x)
    const characterRoot = new THREE.Group();
    characterRoot.scale.set(1.54, 1.54, 1.54);
    characterRoot.position.set(0, 0, 0);
    scene.add(characterRoot);

    const characterPivot = new THREE.Group();
    characterPivot.position.set(0, 0, 0);
    characterRoot.add(characterPivot);

    // Head rotation uniform for smooth vertex shader head/eye tracking
    const headRotUniform = { value: new THREE.Vector3(0, 0, 0) };

    // Mouse & Touch coordinates tracking
    const mouse = {
      targetX: 0,
      targetY: 0,
      currentX: 0,
      currentY: 0,
    };

    const handlePointerMove = (e: MouseEvent | PointerEvent) => {
      // Normalized screen coordinates (-1 to +1)
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouse.targetX = Math.max(-1, Math.min(1, x));
      mouse.targetY = Math.max(-1, Math.min(1, y));
    };

    window.addEventListener("pointermove", handlePointerMove);

    // Load Model
    const loader = new GLTFLoader();
    let isDisposed = false;

    loader.load(
      "/3D-model/stylized_character.glb",
      (gltf) => {
        if (isDisposed) return;
        setIsLoading(false);

        const model = gltf.scene;

        // Auto center the geometry horizontally while pinning bottom edge to y = 0
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());

        // Exact horizontal centering, base positioned to solidly fill bottom with zero gap
        model.position.x = -center.x;
        model.position.y = -box.min.y - 0.08;
        model.position.z = -center.z;

        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            const mat = mesh.material as THREE.MeshStandardMaterial;
            if (mat) {
              mat.roughness = Math.max(0.4, mat.roughness ?? 0.5);
              mat.metalness = Math.min(0.2, mat.metalness ?? 0.1);

              // Inject safe vertex rotation for head & eyes
              // smoothstep(0.36, 0.52) leaves the torso and base completely static at y = 0
              mat.onBeforeCompile = (shader) => {
                shader.uniforms.uHeadRot = headRotUniform;

                shader.vertexShader = `
                  uniform vec3 uHeadRot;
                  ${shader.vertexShader}
                `;

                shader.vertexShader = shader.vertexShader.replace(
                  "#include <begin_vertex>",
                  `
                  #include <begin_vertex>
                  
                  // Soft neck weight factor: 0 for torso/base, 1 for head & eyes
                  float neckWeight = smoothstep(0.36, 0.52, transformed.y);
                  
                  if (neckWeight > 0.001) {
                    vec3 pivot = vec3(0.0, 0.44, 0.0);
                    vec3 v = transformed - pivot;
                    
                    // Yaw rotation around Y axis
                    float aY = uHeadRot.y * neckWeight;
                    float cY = cos(aY);
                    float sY = sin(aY);
                    float newX = cY * v.x - sY * v.z;
                    float newZ = sY * v.x + cY * v.z;
                    v.x = newX;
                    v.z = newZ;
                    
                    // Pitch rotation around X axis
                    float aX = uHeadRot.x * neckWeight;
                    float cX = cos(aX);
                    float sX = sin(aX);
                    float newY = cX * v.y - sX * v.z;
                    newZ = sX * v.y + cX * v.z;
                    v.y = newY;
                    v.z = newZ;
                    
                    transformed = v + pivot;
                  }
                  `
                );
              };
            }
          }
        });

        characterPivot.add(model);
      },
      (xhr) => {
        if (xhr.total > 0) {
          const percent = Math.round((xhr.loaded / xhr.total) * 100);
          setLoadProgress(percent);
        }
      },
      (err) => {
        console.error("Error loading stylized character 3D model:", err);
        setIsLoading(false);
      }
    );

    // Visibility Observer to pause offscreen WebGL rendering and save GPU/CPU
    let isVisible = true;
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !animationFrameId) {
        animate();
      }
    }, { threshold: 0.02 });
    visibilityObserver.observe(container);

    // Animation Loop
    let animationFrameId = 0;

    const animate = () => {
      if (!isVisible || isDisposed) {
        animationFrameId = 0;
        return;
      }
      animationFrameId = requestAnimationFrame(animate);

      const time = performance.now() * 0.001;

      // Smooth cursor lerp damping
      const easing = 0.085;
      mouse.currentX += (mouse.targetX - mouse.currentX) * easing;
      mouse.currentY += (mouse.targetY - mouse.currentY) * easing;

      // Natural breathing: scales Y subtly upwards from origin so base stays strictly at y = 0
      const breath = Math.sin(time * 1.8) * 0.008;
      characterRoot.scale.set(1.54, 1.54 + breath * 0.03, 1.54);
      characterRoot.position.set(0, 0, 0);

      // Head and Eyes look at cursor
      const headYaw = mouse.currentX * 0.65;
      const headPitch = -mouse.currentY * 0.35;
      const headRoll = -mouse.currentX * 0.08;

      // Update shader uniform for head vertex rotation
      headRotUniform.value.set(headPitch * 0.9, headYaw * 0.8, headRoll * 0.5);

      // Subtle torso sway: yaw only, pitch stays 0 so base remains 100% flush at y = 0
      characterPivot.rotation.y = headYaw * 0.12;
      characterPivot.rotation.x = 0;
      characterPivot.rotation.z = headRoll * 0.08;

      // Subtle camera parallax: horizontal shift only, camera Y stays strictly locked to currentCamY
      // This mathematically guarantees the bottom of the visible frustum remains precisely at y = 0 (0px gap)
      camera.position.x = -mouse.currentX * 0.08;
      camera.position.y = currentCamY;
      camera.lookAt(new THREE.Vector3(-mouse.currentX * 0.03, currentCamY, 0));

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler with ResizeObserver
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      if (newWidth === 0 || newHeight === 0) return;

      const { camY } = updateCameraFraming(newWidth, newHeight);
      currentCamY = camY;
      renderer.setSize(newWidth, newHeight);
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    window.addEventListener("resize", handleResize);

    return () => {
      isDisposed = true;
      visibilityObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      className="relative w-full h-full flex items-end justify-center select-none pointer-events-none overflow-visible z-[1000]"
      style={{ zIndex: 1000 }}
    >
      {/* 3D WebGL Canvas grounded flush to the section end border */}
      <div 
        ref={containerRef} 
        className="w-full h-full flex items-end justify-center pointer-events-none"
      />

      {/* Loading indicator with progress */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-neutral-400 bg-black/30 backdrop-blur-xs rounded-3xl pointer-events-none">
          <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin" />
          <span className="text-[11px] tracking-[0.25em] uppercase text-[#EDE8DE] font-medium font-mono">
            {loadProgress > 0 ? `AWAKENING CREATURE ${loadProgress}%` : "AWAKENING CREATURE..."}
          </span>
        </div>
      )}
    </div>
  );
}
