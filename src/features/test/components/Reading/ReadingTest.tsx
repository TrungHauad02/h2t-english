import { TestReading } from "interfaces";

interface ReadingTestProps {
  readingTestReadings: TestReading[];
}

export default function ReadingTest({ readingTestReadings }: ReadingTestProps) {
  return <div>Reading Test</div>;
}
