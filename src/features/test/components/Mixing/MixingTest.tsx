import React from "react";
import {
  TestMixingQuestion,
  TestListening,
  TestReading,
  TestSpeaking,
  TestWriting,
} from "interfaces";

interface Props {
  testMixingQuestions: TestMixingQuestion[];
  testListenings: TestListening[];
  testReadings: TestReading[];
  testSpeakings: TestSpeaking[];
  testWritings: TestWriting[];
}

export default function MixingTest({
  testMixingQuestions,
  testListenings,
  testReadings,
  testSpeakings,
  testWritings,
}: Props) {
  return (
    <div>
      <h1>Mixing Test</h1>
    </div>
  );
}
