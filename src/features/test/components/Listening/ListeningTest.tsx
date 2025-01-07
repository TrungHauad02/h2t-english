import { Test } from "interfaces";

interface Props {
  test: Test;
}

export default function ListeningTest({ test }: Props) {
  return <div>Listening Test</div>;
}
