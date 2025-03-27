import React from "react";
import { Box, alpha } from "@mui/material";
import { ParticleType, StyleProps } from "./types";
import { useDarkMode } from "hooks/useDarkMode";
import useColor from "theme/useColor";

interface DestructionEffectsProps extends StyleProps {
  particles: ParticleType[];
  paperShredding: boolean;
  showDestructionEffect: boolean;
}

export default function DestructionEffects({
  particles,
  paperShredding,
  showDestructionEffect,
}: DestructionEffectsProps) {
  const colors = useColor();
  const { isDarkMode } = useDarkMode();
  // Generate paper shred elements
  const renderPaperShreds = () => {
    const shreds = [];
    const shredCount = 15;

    for (let i = 0; i < shredCount; i++) {
      const delay = i * 0.05;
      shreds.push(
        <Box
          key={i}
          sx={{
            position: "absolute",
            top: 0,
            left: `${(i / shredCount) * 100}%`,
            width: `${100 / shredCount}%`,
            height: "100%",
            bgcolor: isDarkMode ? colors.gray800 : colors.gray200,
            transformOrigin: "top center",
            animation: paperShredding
              ? `fallOut 1.5s ease-in forwards ${delay}s, fadeOut 1.5s ease-in forwards ${
                  delay + 0.5
                }s`
              : "none",
            "@keyframes fallOut": {
              "0%": { transform: "translateY(0) rotate(0deg)" },
              "100%": {
                transform: `translateY(${300 + (i % 3) * 50}px) rotate(${
                  (i % 2 === 0 ? 1 : -1) * (20 + (i % 5) * 10)
                }deg)`,
              },
            },
            "@keyframes fadeOut": {
              "0%": { opacity: 1 },
              "100%": { opacity: 0 },
            },
            zIndex: 5,
          }}
        >
          <Box
            sx={{
              height: "100%",
              m: "0 1px",
              backgroundColor:
                i % 2 === 0
                  ? isDarkMode
                    ? alpha(colors.red500, 0.1)
                    : alpha(colors.red100, 0.7)
                  : isDarkMode
                  ? colors.gray700
                  : colors.white,
            }}
          />
        </Box>
      );
    }

    return shreds;
  };

  // Destruction effect (particles flying away)
  const renderDestructionParticles = () => {
    return particles.map((particle) => (
      <Box
        key={`particle-${particle.id}`}
        sx={{
          position: "absolute",
          top: `${particle.y}%`,
          left: `${particle.x}%`,
          width: `${particle.size}px`,
          height: `${particle.size}px`,
          borderRadius: "50%",
          backgroundColor: particle.color,
          opacity: showDestructionEffect ? 1 : 0,
          animation: showDestructionEffect
            ? `flyAway ${0.5 + particle.speed}s ease-out forwards, fadeOut ${
                0.5 + particle.speed
              }s ease-out forwards`
            : "none",
          "@keyframes flyAway": {
            "0%": { transform: "scale(1) translate(0, 0)" },
            "100%": {
              transform: `scale(${0.5 + Math.random()}) translate(
                ${(Math.random() - 0.5) * 300}px, 
                ${(Math.random() - 0.5) * 300}px
              )`,
            },
          },
        }}
      />
    ));
  };

  return {
    renderPaperShreds,
    renderDestructionParticles,
  };
}
