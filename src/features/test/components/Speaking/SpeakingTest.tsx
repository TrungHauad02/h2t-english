import { TestSpeaking } from "interfaces";

interface SpeakingTestProps {
  speakingTestSpeakings: TestSpeaking[];
}

export default function SpeakingTest({ speakingTestSpeakings }: SpeakingTestProps) {
  return (
    <div>
      <h1>Speaking Test</h1>
    </div>
  );
}
