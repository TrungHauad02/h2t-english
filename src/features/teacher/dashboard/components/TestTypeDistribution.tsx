import React from "react";
import { alpha } from "@mui/material";
import useColor from "theme/useColor";
import { useDarkMode } from "hooks/useDarkMode";
import GeneralizedDistributionChart, {
  ChartItem,
} from "./GeneralizedDistributionChart";
import { ContentTypeDistributionProps } from "../types";

export default function TestTypeDistribution({
  data,
}: ContentTypeDistributionProps) {
  const color = useColor();
  const { isDarkMode } = useDarkMode();

  if (data === undefined) return null;

  const testTypeItems: ChartItem[] = [
    {
      id: "mixingTest",
      name: "Mixing Test",
      value: data.totalMixingTests ?? 0,
      fill: color.teal600,
      icon: "🔄",
      bgColor: alpha(color.teal600, isDarkMode ? 0.2 : 0.1),
    },
    {
      id: "writingTest",
      name: "Writing Test",
      value: data.totalWritingTests ?? 0,
      fill: color.emerald600,
      icon: "✍️",
      bgColor: alpha(color.emerald600, isDarkMode ? 0.2 : 0.1),
    },
    {
      id: "readingTest",
      name: "Reading Test",
      value: data.totalReadingTests ?? 0,
      fill: color.green600,
      icon: "📖",
      bgColor: alpha(color.green600, isDarkMode ? 0.2 : 0.1),
    },
    {
      id: "speakingTest",
      name: "Speaking Test",
      value: data.totalSpeakingTests ?? 0,
      fill: color.teal700,
      icon: "🎤",
      bgColor: alpha(color.teal700, isDarkMode ? 0.2 : 0.1),
    },
    {
      id: "listeningTest",
      name: "Listening Test",
      value: data.totalListeningTests ?? 0,
      fill: color.emerald700,
      icon: "🎧",
      bgColor: alpha(color.emerald700, isDarkMode ? 0.2 : 0.1),
    },
  ];

  return (
    <GeneralizedDistributionChart
      data={testTypeItems}
      totalLabel="tests"
      tooltipValueSuffix="tests"
    />
  );
}
