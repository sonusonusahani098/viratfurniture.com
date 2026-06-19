import React, { useRef, useEffect, useState } from 'react';
import { FurnitureType, MaterialOption, HardwareStyle } from '../types';

interface VisualizerProps {
  type: FurnitureType;
  width: number;       // in feet
  height: number;      // in feet
  depth: number;       // in feet
  selectedMaterial: MaterialOption;
  selectedHardware: HardwareStyle;
  hasLights: boolean;
  extraStorage: boolean;
}

// 3D Point definition
interface Point3D {
  x: number;
  y: number;
  z: number;
}

// 3D Quadrilateral Face with relative shading properties
interface Face3D {
  indices: number[];
  colorOffset: number; // multiplier for light shading
  type?: 'wood' | 'door_left' | 'door_right' | 'drawer' | 'base' | 'mattress' | 'pillow' | 'handle' | 'grill' | 'loft';
  isAnimated?: boolean;
}

export default function FurnitureVisualizer3D({
  type,
  width,
  height,
  depth,
  selectedMaterial,
  selectedHardware,
  hasLights,
  extraStorage,
}: VisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Orbit rotation angles (degrees)
  const [rotX, setRotX] = useState<number>(-12);
  const [rotY, setRotY] = useState<number>(35);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStart = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const [drawerOpenAmt, setDrawerOpenAmt] = useState<number>(0); // 0 to 1 anim status
  const [isOpening, setIsOpening] = useState<boolean>(false);

  // Auto slow rotation if not dragging
  useEffect(() => {
    let animationFrameId: number;
    const rotate = () => {
      if (!isDragging) {
        setRotY((prev) => (prev + 0.15) % 360);
      }
      animationFrameId = requestAnimationFrame(rotate);
    };
    animationFrameId = requestAnimationFrame(rotate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isDragging]);

  // Drawer / door sliding trigger animation trigger
  useEffect(() => {
    let timer: number;
    const updateAnim = () => {
      setDrawerOpenAmt((prev) => {
        const speed = 0.05;
        if (isOpening) {
          if (prev >= 1) return 1;
          return prev + speed;
        } else {
          if (prev <= 0) return 0;
          return prev - speed;
        }
      });
      timer = requestAnimationFrame(updateAnim);
    };
    timer = requestAnimationFrame(updateAnim);
    return () => cancelAnimationFrame(timer);
  }, [isOpening]);

  // Trigger doors/drawers movement randomly of loop to show 3d action
  useEffect(() => {
    const interval = setInterval(() => {
      setIsOpening((prev) => !prev);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Coordinate projection and Canvas drawing script
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear and match dpi density
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const cx = rect.width / 2;
    const cy = rect.height / 2 + 5;
    const scaleFactor = Math.min(rect.width, rect.height) / 10; // scale feet to pixels

    // Coordinates generator depending on the selected Furniture design
    let vertices: Point3D[] = [];
    let faces: Face3D[] = [];

    // Scale variables
    const w = width;
    const h = height;
    const d = depth;

    if (type === FurnitureType.BED) {
      // 3D Bed mesh nodes creation
      vertices = [
        // Base box (0 to 7)
        { x: -w/2, y: 0, z: -d/2 }, // 0: bottom front left
        { x: w/2, y: 0, z: -d/2 },  // 1: bottom front right
        { x: w/2, y: 0, z: d/2 },   // 2: bottom back right
        { x: -w/2, y: 0, z: d/2 },  // 3: bottom back left
        { x: -w/2, y: -1.2, z: -d/2 }, // 4: top cover left
        { x: w/2, y: -1.2, z: -d/2 },  // 5: top cover right
        { x: w/2, y: -1.2, z: d/2 },   // 6: top cover back right
        { x: -w/2, y: -1.2, z: d/2 },  // 7: top cover back left

        // Headboard (8 to 11)
        { x: -w/2, y: -h, z: d/2 },       // 8: headboard top left
        { x: w/2, y: -h, z: d/2 },        // 9: headboard top right
        { x: w/2, y: -1.2, z: d/2 + 0.3 }, // 10: headboard bottom right
        { x: -w/2, y: -1.2, z: d/2 + 0.3 },// 11: headboard bottom left

        // Mattress offset slightly (12 to 19)
        { x: -w/2 + 0.1, y: -1.2, z: -d/2 + 0.1 }, // 12
        { x: w/2 - 0.1, y: -1.2, z: -d/2 + 0.1 },  // 13
        { x: w/2 - 0.1, y: -1.2, z: d/2 - 0.1 },   // 14
        { x: -w/2 + 0.1, y: -1.2, z: d/2 - 0.1 },  // 15
        { x: -w/2 + 0.1, y: -2.0, z: -d/2 + 0.1 }, // 16
        { x: w/2 - 0.1, y: -2.0, z: -d/2 + 0.1 },  // 17
        { x: w/2 - 0.1, y: -2.0, z: d/2 - 0.1 },   // 18
        { x: -w/2 + 0.1, y: -2.0, z: d/2 - 0.1 },  // 19

        // Interactive pulling drawers under bed base (20 to 27)
        // Moves outward on X axis or Z axis based on drawerOpenAmt
        { x: -w/2 - 0.5 * drawerOpenAmt, y: -0.1, z: -0.8 }, // 20: drawer bottom front
        { x: -w/2 - 0.5 * drawerOpenAmt, y: -0.1, z: 0.8 },  // 21:
        { x: -w/2 - 0.1 - 0.5 * drawerOpenAmt, y: -0.1, z: 0.8 }, // 22:
        { x: -w/2 - 0.1 - 0.5 * drawerOpenAmt, y: -0.1, z: -0.8 }, // 23:
        { x: -w/2 - 0.5 * drawerOpenAmt, y: -0.9, z: -0.8 }, // 24: drawer top front
        { x: -w/2 - 0.5 * drawerOpenAmt, y: -0.9, z: 0.8 },  // 25
        { x: -w/2 - 0.1 - 0.5 * drawerOpenAmt, y: -0.9, z: 0.8 }, // 26
        { x: -w/2 - 0.1 - 0.5 * drawerOpenAmt, y: -0.9, z: -0.8 }, // 27
      ];

      faces = [
        // Bed Base sides
        { indices: [0, 1, 5, 4], colorOffset: 0.82, type: 'base' },
        { indices: [1, 2, 6, 5], colorOffset: 0.95, type: 'base' },
        { indices: [2, 3, 7, 6], colorOffset: 0.75, type: 'base' },
        { indices: [3, 0, 4, 7], colorOffset: 0.85, type: 'base' },
        
        // Headboard
        { indices: [8, 9, 6, 7], colorOffset: 1.0, type: 'wood' },
        { indices: [8, 9, 10, 11], colorOffset: 0.9, type: 'wood' },

        // Mattress structure
        { indices: [16, 17, 13, 12], colorOffset: 1.15, type: 'mattress' },
        { indices: [17, 18, 14, 13], colorOffset: 1.05, type: 'mattress' },
        { indices: [18, 19, 15, 14], colorOffset: 0.9, type: 'mattress' },
        { indices: [19, 16, 12, 15], colorOffset: 0.98, type: 'mattress' },
        // Mattress Top Cover
        { indices: [16, 17, 18, 19], colorOffset: 1.25, type: 'mattress' },
      ];

      if (extraStorage) {
        // Appends the drawer surfaces if storage is active
        faces.push(
          { indices: [20, 21, 25, 24], colorOffset: 1.3, type: 'drawer', isAnimated: true },
          { indices: [21, 22, 26, 25], colorOffset: 0.7, type: 'drawer', isAnimated: true },
          { indices: [22, 23, 27, 26], colorOffset: 1.1, type: 'drawer', isAnimated: true },
          { indices: [23, 20, 24, 27], colorOffset: 0.9, type: 'drawer', isAnimated: true },
          { indices: [24, 25, 26, 27], colorOffset: 1.4, type: 'drawer', isAnimated: true }
        );
      }

    } else if (type === FurnitureType.WARDROBE) {
      // 3D Almari Cabinet system
      vertices = [
        // Main Box frame (0 to 7)
        { x: -w/2, y: 0, z: -d/2 }, // 0
        { x: w/2, y: 0, z: -d/2 },  // 1
        { x: w/2, y: 0, z: d/2 },   // 2
        { x: -w/2, y: 0, z: d/2 },  // 3
        { x: -w/2, y: -h * 0.8, z: -d/2 }, // 4: split lower main level
        { x: w/2, y: -h * 0.8, z: -d/2 },  // 5
        { x: w/2, y: -h * 0.8, z: d/2 },   // 6
        { x: -w/2, y: -h * 0.8, z: d/2 },  // 7

        // Left sliding doors (animated slide) (8 to 11)
        { x: -w/2 + 0.05 + (w*0.45 * drawerOpenAmt), y: -0.1, z: -d/2 - 0.05 }, // 8
        { x: 0.02 + (w*0.45 * drawerOpenAmt), y: -0.1, z: -d/2 - 0.05 },       // 9
        { x: 0.02 + (w*0.45 * drawerOpenAmt), y: -h*0.78, z: -d/2 - 0.05 },   // 10
        { x: -w/2 + 0.05 + (w*0.45 * drawerOpenAmt), y: -h*0.78, z: -d/2 - 0.05 }, // 11

        // Right sliding doors panel (12 to 15)
        { x: -0.02 - (w*0.45 * drawerOpenAmt), y: -0.1, z: -d/2 - 0.02 }, // 12
        { x: w/2 - 0.05 - (w*0.45 * drawerOpenAmt), y: -0.1, z: -d/2 - 0.02 },  // 13
        { x: w/2 - 0.05 - (w*0.45 * drawerOpenAmt), y: -h*0.78, z: -d/2 - 0.02 }, // 14
        { x: -0.02 - (w*0.45 * drawerOpenAmt), y: -h*0.78, z: -d/2 - 0.02 }, // 15

        // Loft space attic addition (16 to 23)
        { x: -w/2, y: -h * 0.8, z: -d/2 }, // 16
        { x: w/2, y: -h * 0.8, z: -d/2 },  // 17
        { x: w/2, y: -h * 0.8, z: d/2 },   // 18
        { x: -w/2, y: -h * 0.8, z: d/2 },  // 19
        { x: -w/2, y: -h, z: -d/2 },       // 20: loft top
        { x: w/2, y: -h, z: -d/2 },        // 21
        { x: w/2, y: -h, z: d/2 },         // 22
        { x: -w/2, y: -h, z: d/2 },        // 23

        // Cabinet Handles lines
        { x: 0.05 + (w*0.45 * drawerOpenAmt), y: -h*0.4, z: -d/2 - 0.08 }, // 24: handle base
        { x: 0.05 + (w*0.45 * drawerOpenAmt), y: -h*0.3, z: -d/2 - 0.08 }, // 25
        { x: -0.05 - (w*0.45 * drawerOpenAmt), y: -h*0.4, z: -d/2 - 0.06 }, // 26
        { x: -0.05 - (w*0.45 * drawerOpenAmt), y: -h*0.3, z: -d/2 - 0.06 }, // 27
      ];

      faces = [
        // Cabinet outer shell panels
        { indices: [0, 1, 5, 4], colorOffset: 0.85, type: 'wood' },
        { indices: [1, 2, 6, 5], colorOffset: 0.9, type: 'wood' },
        { indices: [2, 3, 7, 6], colorOffset: 0.75, type: 'wood' },
        { indices: [3, 0, 4, 7], colorOffset: 0.8, type: 'wood' },

        // Dynamic Sliding Doors
        { indices: [8, 9, 10, 11], colorOffset: 1.1, type: 'door_left' },
        { indices: [12, 13, 14, 15], colorOffset: 1.15, type: 'door_right' },

        // Loft Section
        { indices: [16, 17, 21, 20], colorOffset: 1.05, type: 'loft' },
        { indices: [17, 18, 22, 21], colorOffset: 0.85, type: 'loft' },
        { indices: [19, 16, 20, 23], colorOffset: 0.82, type: 'loft' },
      ];

    } else if (type === FurnitureType.KITCHEN) {
      // Sleek Counter cabinets + Overheads
      vertices = [
        // Floor counters (0 to 7)
        { x: -w/2, y: 0, z: -d },
        { x: w/2, y: 0, z: -d },
        { x: w/2, y: 0, z: d },
        { x: -w/2, y: 0, z: d },
        { x: -w/2, y: -2.8, z: -d }, // Counter heights
        { x: w/2, y: -2.8, z: -d },
        { x: w/2, y: -2.8, z: d },
        { x: -w/2, y: -2.8, z: d },

        // Marble countertop slightly overhang (8 to 15)
        { x: -w/2 - 0.05, y: -2.8, z: -d - 0.05 },
        { x: w/2 + 0.05, y: -2.8, z: -d - 0.05 },
        { x: w/2 + 0.05, y: -2.8, z: d + 0.05 },
        { x: -w/2 - 0.05, y: -2.8, z: d + 0.05 },
        { x: -w/2 - 0.05, y: -2.95, z: -d - 0.05 }, // slab thickness
        { x: w/2 + 0.05, y: -2.95, z: -d - 0.05 },
        { x: w/2 + 0.05, y: -2.95, z: d + 0.05 },
        { x: -w/2 - 0.05, y: -2.95, z: d + 0.05 },

        // Overhead wall-mount elements (16 to 23)
        { x: -w/2 + 0.5, y: -5.0, z: d - 0.8 },
        { x: w/2 - 0.5, y: -5.0, z: d - 0.8 },
        { x: w/2 - 0.5, y: -5.0, z: d },
        { x: -w/2 + 0.5, y: -5.0, z: d },
        { x: -w/2 + 0.5, y: -6.8, z: d - 0.8 },
        { x: w/2 - 0.5, y: -6.8, z: d - 0.8 },
        { x: w/2 - 0.5, y: -6.8, z: d },
        { x: -w/2 + 0.5, y: -6.8, z: d },

        // Dynamic sliding drawer on left side (24 to 31)
        { x: -w/3, y: -0.8, z: -d - 0.02 - (0.6 * drawerOpenAmt) },
        { x: -0.05, y: -0.8, z: -d - 0.02 - (0.6 * drawerOpenAmt) },
        { x: -0.05, y: -0.8, z: -d + 0.8 - (0.6 * drawerOpenAmt) },
        { x: -w/3, y: -0.8, z: -d + 0.8 - (0.6 * drawerOpenAmt) },
        { x: -w/3, y: -1.7, z: -d - 0.02 - (0.6 * drawerOpenAmt) },
        { x: -0.05, y: -1.7, z: -d - 0.02 - (0.6 * drawerOpenAmt) },
        { x: -0.05, y: -1.7, z: -d + 0.8 - (0.6 * drawerOpenAmt) },
        { x: -w/3, y: -1.7, z: -d + 0.8 - (0.6 * drawerOpenAmt) },
      ];

      faces = [
        // Lower Cabinet box
        { indices: [0, 1, 5, 4], colorOffset: 0.85, type: 'base' },
        { indices: [1, 2, 6, 5], colorOffset: 0.95, type: 'base' },
        { indices: [3, 0, 4, 7], colorOffset: 0.78, type: 'base' },

        // Luxury marble high-contrast slab
        { indices: [12, 13, 9, 8], colorOffset: 1.25, type: 'mattress' }, // shines like quartz!
        { indices: [13, 14, 10, 9], colorOffset: 1.15, type: 'mattress' },
        { indices: [12, 13, 14, 15], colorOffset: 1.35, type: 'mattress' }, // Countertop Top flat

        // Overhead cabinet blocks
        { indices: [16, 17, 21, 20], colorOffset: 1.1, type: 'wood' },
        { indices: [17, 18, 22, 21], colorOffset: 0.85, type: 'wood' },
        { indices: [19, 16, 20, 23], colorOffset: 0.8, type: 'wood' },
      ];

      if (extraStorage) {
        faces.push(
          // Extended dynamic drawer boxes
          { indices: [24, 25, 29, 28], colorOffset: 1.3, type: 'drawer', isAnimated: true },
          { indices: [25, 26, 30, 29], colorOffset: 0.95, type: 'drawer', isAnimated: true },
          { indices: [27, 24, 28, 31], colorOffset: 0.75, type: 'drawer', isAnimated: true }
        );
      }

    } else {
      // Premium Main Entrance Gate
      // Consists of thick main pillars and horizontal teak wooden design slats with steel latch
      vertices = [
        // Left pillar (0 to 7)
        { x: -w/2 - 0.4, y: 0, z: -0.4 },
        { x: -w/2, y: 0, z: -0.4 },
        { x: -w/2, y: 0, z: 0.4 },
        { x: -w/2 - 0.4, y: 0, z: 0.4 },
        { x: -w/2 - 0.4, y: -h - 0.5, z: -0.4 },
        { x: -w/2, y: -h - 0.5, z: -0.4 },
        { x: -w/2, y: -h - 0.5, z: 0.4 },
        { x: -w/2 - 0.4, y: -h - 0.5, z: 0.4 },

        // Right pillar (8 to 15)
        { x: w/2, y: 0, z: -0.4 },
        { x: w/2 + 0.4, y: 0, z: -0.4 },
        { x: w/2 + 0.4, y: 0, z: 0.4 },
        { x: w/2, y: 0, z: 0.4 },
        { x: w/2, y: -h - 0.5, z: -0.4 },
        { x: w/2 + 0.4, y: -h - 0.5, z: -0.4 },
        { x: w/2 + 0.4, y: -h - 0.5, z: 0.4 },
        { x: w/2, y: -h - 0.5, z: 0.4 },

        // Dynamic Swinging gates (16 to 23)
        // Left gate door swinging forward on Y-axis based on drawerOpenAmt
        { x: -w/2 + (w/2 * Math.cos(drawerOpenAmt * 0.7)), y: -0.2, z: (w/2 * Math.sin(drawerOpenAmt * 0.7)) },
        { x: -w/2, y: -0.2, z: 0 },
        { x: -w/2, y: -h, z: 0 },
        { x: -w/2 + (w/2 * Math.cos(drawerOpenAmt * 0.7)), y: -h, z: (w/2 * Math.sin(drawerOpenAmt * 0.7)) },

        // Right gate door swinging backwards slightly (20 to 23)
        { x: w/2, y: -0.2, z: 0 },
        { x: w/2 - (w/2 * Math.cos(drawerOpenAmt * 0.7)), y: -0.2, z: -(w/2 * Math.sin(drawerOpenAmt * 0.7)) },
        { x: w/2 - (w/2 * Math.cos(drawerOpenAmt * 0.7)), y: -h, z: -(w/2 * Math.sin(drawerOpenAmt * 0.7)) },
        { x: w/2, y: -h, z: 0 },
      ];

      faces = [
        // Rock-solid frame concrete/granite pillars
        { indices: [0, 1, 5, 4], colorOffset: 0.7, type: 'mattress' }, // dark granite style
        { indices: [1, 2, 6, 5], colorOffset: 0.8, type: 'mattress' },
        { indices: [4, 5, 6, 7], colorOffset: 1.0, type: 'mattress' },

        { indices: [8, 9, 13, 12], colorOffset: 0.7, type: 'mattress' },
        { indices: [11, 8, 12, 15], colorOffset: 0.8, type: 'mattress' },
        { indices: [12, 13, 14, 15], colorOffset: 1.0, type: 'mattress' },

        // Decorative solid wooden panels inside swinging gates
        { indices: [17, 16, 19, 18], colorOffset: 1.1, type: 'wood' },
        { indices: [20, 21, 22, 23], colorOffset: 1.15, type: 'wood' },
      ];
    }

    // Apply 3D Rotation transformations (Y-axis orbit first, then X-axis perspective tilt)
    const sinX = Math.sin(rotX * Math.PI / 180);
    const cosX = Math.cos(rotX * Math.PI / 180);
    const sinY = Math.sin(rotY * Math.PI / 180);
    const cosY = Math.cos(rotY * Math.PI / 180);

    const projectedPoints = vertices.map(pt => {
      // Rotate around Y-axis (orbital horizontal search)
      const x1 = pt.x * cosY - pt.z * sinY;
      const z1 = pt.x * sinY + pt.z * cosY;

      // Rotate around X-axis (tilt vertical angle)
      const y2 = pt.y * cosX - z1 * sinX;
      const z2 = pt.y * sinX + z1 * cosX;

      // Isometric projection math with perspective camera depth division
      const perspectiveScale = 400 / (400 + z2); // depth multiplier
      const screenX = cx + x1 * scaleFactor * perspectiveScale;
      const screenY = cy + y2 * scaleFactor * perspectiveScale;

      return { x: screenX, y: screenY, z: z2 };
    });

    // Sort order of faces back-to-front (Painters Algorithm to avoid visual overlapping)
    const facesWithDepth = faces.map((f, faceIdx) => {
      const zSum = f.indices.reduce((sum, vertexIdx) => sum + projectedPoints[vertexIdx].z, 0);
      const averageDepth = zSum / f.indices.length;
      return { ...f, averageDepth, originalIdx: faceIdx };
    });

    facesWithDepth.sort((a, b) => b.averageDepth - a.averageDepth);

    // Dynamic light vector (origin from upper left ceiling to create rich shadows)
    const light = { x: 0.5, y: -0.8, z: 0.4 };
    const mag = Math.sqrt(light.x * light.x + light.y * light.y + light.z * light.z);
    const lightDir = { x: light.x / mag, y: light.y / mag, z: light.z / mag };

    // Draw grid shadow on ground for realistic 3D placement
    ctx.fillStyle = 'rgba(44, 30, 22, 0.04)';
    ctx.beginPath();
    ctx.ellipse(cx, cy + 20, scaleFactor * w * 0.7, scaleFactor * d * 0.35, 0, 0, Math.PI * 2);
    ctx.fill();

    // Render precise projected face elements
    facesWithDepth.forEach(face => {
      ctx.beginPath();
      const firstPt = projectedPoints[face.indices[0]];
      ctx.moveTo(firstPt.x, firstPt.y);
      for (let i = 1; i < face.indices.length; i++) {
        const pt = projectedPoints[face.indices[i]];
        ctx.lineTo(pt.x, pt.y);
      }
      ctx.closePath();

      // Materials Color selection
      let baseHex = selectedMaterial.color;
      let isPolishedGloss = selectedMaterial.id === 'crystal_white' || selectedMaterial.id === 'champagne_gold';

      if (face.type === 'wood') {
        baseHex = selectedMaterial.color;
      } else if (face.type === 'door_left') {
        baseHex = selectedMaterial.color;
      } else if (face.type === 'door_right') {
        // give slightly different shade to differentiate double-doors
        baseHex = selectedMaterial.id === 'charcoal' ? '#333333' : selectedMaterial.color;
      } else if (face.type === 'loft') {
        // dynamic secondary paneling color
        baseHex = selectedMaterial.id === 'walnut' ? '#5E4132' : selectedMaterial.color;
      } else if (face.type === 'base') {
        baseHex = selectedMaterial.color;
      } else if (face.type === 'mattress') {
        baseHex = '#FBF9F6'; // soft white dynamic linen
      } else if (face.type === 'drawer') {
        baseHex = selectedMaterial.color;
      }

      // Convert material colors to RGB to easily calculate real-time shading highlights
      const hexToRgb = (hex: string) => {
        let cleanHex = hex.replace('#', '');
        if (cleanHex.length === 3) {
          cleanHex = cleanHex.split('').map(char => char + char).join('');
        }
        const num = parseInt(cleanHex, 16);
        return {
          r: (num >> 16) & 255,
          g: (num >> 8) & 255,
          b: num & 255
        };
      };

      const rgb = hexToRgb(baseHex);
      
      // Face shading based on light source direction vector
      // Flat face normal calculation (simplified cross-product of first 3 vertices of the face)
      const v0 = vertices[face.indices[0]];
      const v1 = vertices[face.indices[1]];
      const v2 = vertices[face.indices[2]];
      
      const ux = v1.x - v0.x;
      const uy = v1.y - v0.y;
      const uz = v1.z - v0.z;
      
      const vx = v2.x - v0.x;
      const vy = v2.y - v0.y;
      const vz = v2.z - v0.z;
      
      // Cross-product
      const nx = uy * vz - uz * vy;
      const ny = uz * vx - ux * vz;
      const nz = ux * vy - uy * vx;
      const nMag = Math.sqrt(nx*nx + ny*ny + nz*nz);
      
      let shadingVal = face.colorOffset; // fallback default
      if (nMag > 0) {
        const normal = { x: nx / nMag, y: ny / nMag, z: nz / nMag };
        const dot = normal.x * lightDir.x + normal.y * lightDirDirScale(normal) + normal.z * lightDir.z;
        // Map dot product from [-1, 1] to ambient range [0.55, 1.25]
        shadingVal = 0.55 + Math.max(0, dot + 1) * 0.35 * face.colorOffset;
      }

      function lightDirDirScale(n: {y: number}) {
        return lightDir.y;
      }

      const r = Math.min(255, Math.max(0, Math.round(rgb.r * shadingVal)));
      const g = Math.min(255, Math.max(0, Math.round(rgb.g * shadingVal)));
      const b = Math.min(255, Math.max(0, Math.round(rgb.b * shadingVal)));

      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
      ctx.fill();

      // Premium styling: gloss reflections (specular highlight shines)
      if (isPolishedGloss && face.type !== 'mattress') {
        const shineGrad = ctx.createLinearGradient(
          projectedPoints[face.indices[0]].x, 
          projectedPoints[face.indices[0]].y,
          projectedPoints[face.indices[2]].x, 
          projectedPoints[face.indices[2]].y
        );
        shineGrad.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
        shineGrad.addColorStop(0.3, 'rgba(255,255,255,0)');
        shineGrad.addColorStop(1, 'rgba(0,0,0,0.06)');
        ctx.fillStyle = shineGrad;
        ctx.fill();
      }

      // Stroke borders to depict structural carpentry panels (thin sleek borders)
      ctx.strokeStyle = selectedMaterial.id === 'charcoal' 
        ? 'rgba(255, 255, 255, 0.08)' 
        : 'rgba(44, 30, 22, 0.12)';
      ctx.lineWidth = 0.85;
      ctx.stroke();

      // Render woodgrain stripes if material is a laminate / teak to add ultra textures detail!
      if (face.type === 'wood' && (selectedMaterial.id === 'walnut' || selectedMaterial.id === 'teak')) {
        ctx.strokeStyle = selectedMaterial.id === 'walnut' ? '#3B291F' : '#6B4223';
        ctx.lineWidth = 0.45;
        // Stroke some subtle interior longitudinal slats
        ctx.beginPath();
        const p0 = projectedPoints[face.indices[0]];
        const p1 = projectedPoints[face.indices[1]];
        const p2 = projectedPoints[face.indices[2]];
        const p3 = projectedPoints[face.indices[3] || face.indices[0]];
        
        // Draw 3 horizontal slats
        for (let j = 0.25; j <= 0.75; j += 0.25) {
          const startX = p0.x + (p3.x - p0.x) * j;
          const startY = p0.y + (p3.y - p0.y) * j;
          const endX = p1.x + (p2.x - p1.x) * j;
          const endY = p1.y + (p2.y - p1.y) * j;
          ctx.moveTo(startX, startY);
          ctx.lineTo(endX, endY);
        }
        ctx.stroke();
      }

      // Draw shiny handles (G-Profile handles or gold brass tabs)
      if (face.type === 'door_left' || face.type === 'door_right') {
        const handleColor = selectedHardware.id === 'classic_brass' || selectedHardware.id === 'champagne_gold' 
          ? '#D4AF37' 
          : '#4A4A4A';
        ctx.fillStyle = handleColor;
        
        // Render physical handle circles or long bars
        ctx.beginPath();
        const pTopLeft = projectedPoints[face.indices[0]];
        const pBottomRight = projectedPoints[face.indices[2]];
        const pBottomLeft = projectedPoints[face.indices[3] || face.indices[0]];
        
        // Center calculation
        const handX = (pTopLeft.x + pBottomRight.x) / 2;
        const handY = (pTopLeft.y + pBottomRight.y) / 2;
        
        if (selectedHardware.id === 'classic_brass' || selectedHardware.id === 'champagne_gold') {
          // Draw elegant long gold pull handles
          ctx.rect(handX - 1.5, handY - 24, 3, 48);
          ctx.shadowColor = 'rgba(0,0,0,0.1)';
          ctx.shadowBlur = 4;
        } else {
          // Draw standard profiles pull groove
          ctx.rect(handX - 4, handY - 15, 8, 3);
        }
        ctx.fill();
        // Reset shadows
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
      }
    });

    // Drawing architectural Blueprint dimensions text indicators on-screen
    ctx.font = '500 10px JetBrains Mono, monospace';
    ctx.fillStyle = '#8A5A36';
    ctx.strokeStyle = 'rgba(138, 90, 54, 0.4)';
    ctx.lineWidth = 1;

    // Width marker (draw base lines below furniture)
    const baseL = projectedPoints[0];
    const baseR = projectedPoints[1];
    if (baseL && baseR) {
      ctx.beginPath();
      ctx.moveTo(baseL.x, baseL.y + 25);
      ctx.lineTo(baseR.x, baseR.y + 25);
      // tick ends
      ctx.moveTo(baseL.x, baseL.y + 20); ctx.lineTo(baseL.x, baseL.y + 30);
      ctx.moveTo(baseR.x, baseR.y + 20); ctx.lineTo(baseR.x, baseR.y + 30);
      ctx.stroke();
      
      const textW = `${width.toFixed(1)} ft`;
      ctx.fillText(textW, (baseL.x + baseR.x) / 2 - 18, (baseL.y + baseR.y) / 2 + 38);
    }

    // Height marker (draw vertically side)
    const sideT = projectedPoints[4]; // upper node
    const sideB = projectedPoints[0]; // lower node
    if (sideT && sideB) {
      ctx.beginPath();
      ctx.moveTo(sideB.x - 22, sideB.y);
      ctx.lineTo(sideT.x - 22, sideT.y);
      ctx.moveTo(sideB.x - 27, sideB.y); ctx.lineTo(sideB.x - 17, sideB.y);
      ctx.moveTo(sideT.x - 27, sideT.y); ctx.lineTo(sideT.x - 17, sideT.y);
      ctx.stroke();
      
      const textH = `${height.toFixed(1)} ft`;
      ctx.fillText(textH, (sideB.x + sideT.x) / 2 - 58, (sideB.y + sideT.y) / 2 + 3);
    }

    // Orbit Compass graphic to emphasize full 3D manipulation
    ctx.strokeStyle = 'rgba(0,0,0,0.1)';
    ctx.beginPath();
    ctx.arc(35, rect.height - 35, 18, 0, Math.PI * 2);
    ctx.stroke();
    
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.font = '7px Inter';
    ctx.fillText('3D ORBIT', 18, rect.height - 10);
    
    // Draw cursor pointing dynamic visual cue
    ctx.beginPath();
    const compassX = 35 + 12 * Math.cos(rotY * Math.PI / 180);
    const compassY = rect.height - 35 + 6 * Math.sin(rotX * Math.PI / 180);
    ctx.arc(compassX, compassY, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = '#B8860B';
    ctx.fill();

  }, [type, width, height, depth, selectedMaterial, selectedHardware, rotX, rotY, drawerOpenAmt, extraStorage]);

  // Handle Dragging Events for full device support (touch and mouse)
  const handleStart = (clientX: number, clientY: number) => {
    setIsDragging(true);
    dragStart.current = { x: clientX, y: clientY };
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;
    const deltaX = clientX - dragStart.current.x;
    const deltaY = clientY - dragStart.current.y;
    
    setRotY((prev) => (prev + deltaX * 0.75) % 360);
    setRotX((prev) => Math.max(-45, Math.min(45, prev + deltaY * 0.75)));
    
    dragStart.current = { x: clientX, y: clientY };
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  return (
    <div 
      className="relative w-full h-[360px] cursor-grab active:cursor-grabbing bg-radial from-[#FAF9F5] to-[#EBE6DC] rounded-2xl overflow-hidden border border-amber-900/10 shadow-inner group"
      onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
      onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={(e) => {
        if (e.touches[0]) handleStart(e.touches[0].clientX, e.touches[0].clientY);
      }}
      onTouchMove={(e) => {
        if (e.touches[0]) handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }}
      onTouchEnd={handleEnd}
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block" 
        style={{ touchAction: 'none' }}
      />
      
      {/* Dynamic Drawer Interactive Button */}
      <button
        onClick={() => setIsOpening(!isOpening)}
        className="absolute top-4 right-4 bg-white/90 backdrop-blur-md hover:bg-[#3E2C23] hover:text-white transition-all text-xs text-[#3E2C23] font-semibold py-2 px-3.5 rounded-full inline-flex items-center gap-1.5 shadow-sm border border-amber-950/10 cursor-pointer"
        title="Toggle interactive carpentry motion animation"
        id="btn-3d-toggle-animation"
      >
        <span className={`block w-2 h-2 rounded-full ${isOpening ? 'bg-amber-600 animate-ping' : 'bg-green-500'}`} />
        {isOpening ? 'Close Panels' : 'Open Drawers/Doors'}
      </button>

      {/* Touch helpers notice overlay */}
      <div className="absolute bottom-4 right-4 pointer-events-none text-[10px] uppercase tracking-wider text-amber-900/40 bg-white/40 px-2.5 py-1 rounded-md font-medium select-none">
        Drag & Swipe to rotate in 3d
      </div>
    </div>
  );
}
