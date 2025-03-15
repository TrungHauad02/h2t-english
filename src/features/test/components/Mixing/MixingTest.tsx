import React from "react";
import {
  Question,
  TestListening,
  TestReading,
  TestSpeaking,
  TestWriting,
} from "interfaces";

interface MixingTestProps {
  mixingQuestions: Question[];
  mixingTestListenings: TestListening[];
  mixingTestReadings: TestReading[];
  mixingTestSpeakings: TestSpeaking[];
  mixingTestWritings: TestWriting[];
}

export default function MixingTest({
  mixingQuestions,
  mixingTestListenings,
  mixingTestReadings,
  mixingTestSpeakings,
  mixingTestWritings,
}: MixingTestProps) {
  return (
    <div>
      <h1>Mixing Test</h1>
    </div>
  );
}
