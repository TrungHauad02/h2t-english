import { Listening } from "interfaces";

export default function ListeningLesson({ lesson }: { lesson: Listening }) {
  return <div>{lesson.title}</div>;
}
