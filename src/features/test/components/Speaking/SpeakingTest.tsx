import { Test } from "interfaces";

interface Props {
  test: Test;
}

export default function SpeakingTest({ test }: Props) {
  return <div>Speaking Test</div>;
}
