import { TestListening } from "interfaces";

interface Props {
  testListenings: TestListening[];
}

export default function ListeningTest({ testListenings }: Props) {
  return (
    <div>
      <h1>Listening Test</h1>
    </div>
  );
}
