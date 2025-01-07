import { TestWriting } from "interfaces";

interface Props {
  testWritings: TestWriting[];
}

export default function WritingTest({ testWritings }: Props) {
  return (
    <div>
      <h1>Writing Test</h1>
    </div>
  );
}
