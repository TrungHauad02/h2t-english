import React from "react";
import { alpha } from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import { ContentTypeDistributionProps } from "../types";
import GeneralizedDistributionChart, {
  ChartItem,
} from "./GeneralizedDistributionChart";

export default function ContentTypeDistribution({
  data,
}: ContentTypeDistributionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  if (data === undefined) return null;

  const contentTypeItems: ChartItem[] = [
    {
      id: "topics",
      name: "Topics",
      value: data.totalTopics ?? 0,
      fill: color.teal600,
      icon: "📚",
      bgColor: alpha(color.teal600, isDarkMode ? 0.2 : 0.1),
    },
    {
      id: "grammars",
      name: "Grammars",
      value: data.totalGrammars ?? 0,
      fill: color.emerald600,
      icon: "🔤",
      bgColor: alpha(color.emerald600, isDarkMode ? 0.2 : 0.1),
    },
    {
      id: "readings",
      name: "Readings",
      value: data.totalReadings ?? 0,
      fill: color.green600,
      icon: "📖",
      bgColor: alpha(color.green600, isDarkMode ? 0.2 : 0.1),
    },
    {
      id: "listenings",
      name: "Listenings",
      value: data.totalListenings ?? 0,
      fill: color.teal700,
      icon: "🎧",
      bgColor: alpha(color.teal700, isDarkMode ? 0.2 : 0.1),
    },
    {
      id: "speakings",
      name: "Speakings",
      value: data.totalSpeakings ?? 0,
      fill: color.emerald700,
      icon: "🗣️",
      bgColor: alpha(color.emerald700, isDarkMode ? 0.2 : 0.1),
    },
    {
      id: "writings",
      name: "Writings",
      value: data.totalWritings ?? 0,
      fill: color.green700,
      icon: "✍️",
      bgColor: alpha(color.green700, isDarkMode ? 0.2 : 0.1),
    },
  ];

  return (
    <GeneralizedDistributionChart
      data={contentTypeItems}
      totalLabel="lessons"
    />
  );
}
