import { Test } from "interfaces";

interface Props {
  test: Test;
}

export default function MixingTest({ test }: Props) {
  return <div>Mixing Test</div>;
}
