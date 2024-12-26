import { Writing } from "interfaces";

export default function WritingLesson({ lesson }: { lesson: Writing }) {
  return <div>{lesson.title}</div>;
}
