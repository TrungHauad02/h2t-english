import { TestWriting } from "interfaces";

interface WritingTestProps {
  writingTestWritings: TestWriting[];
}

export default function WritingTest({ writingTestWritings }: WritingTestProps) {
  return (
    <div>
      <h1>Writing Test</h1>
    </div>
  );
}
