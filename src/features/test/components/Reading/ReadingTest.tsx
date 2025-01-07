import { TestReading } from "interfaces";

interface Props {
  testReadings: TestReading[];
}

export default function ReadingTest({ testReadings }: Props) {
  return <div>Reading Test</div>;
}
