import { Grammar } from "interfaces";

export default function GrammarLesson({ lesson }: { lesson: Grammar }) {
  return <div>{lesson.title}</div>;
}
