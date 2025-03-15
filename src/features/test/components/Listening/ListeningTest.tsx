import { TestListening } from "interfaces";

interface ListeningTestProps {
  listeningTestListenings: TestListening[];
}

export default function ListeningTest({ listeningTestListenings }: ListeningTestProps) {
  return (
    <div>
      <h1>Listening Test</h1>
    </div>
  );
}
