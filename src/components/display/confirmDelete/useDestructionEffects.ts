import { useState } from "react";
import { ParticleType } from "./types";

export default function useDestructionEffects() {
  const [particles, setParticles] = useState<ParticleType[]>([]);

  // Generate particles for unlock effect
  const generateParticles = () => {
    const newParticles: ParticleType[] = [];
    const colors = [
      "#ff5252",
      "#ff4081",
      "#e040fb",
      "#7c4dff",
      "#536dfe",
      "#448aff",
      "#40c4ff",
      "#18ffff",
    ];

    for (let i = 0; i < 30; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 2,
        speed: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    setParticles(newParticles);
  };

  return {
    particles,
    generateParticles,
  };
}
