import { Reading } from "interfaces";

export default function ReadingLesson({ lesson }: { lesson: Reading }) {
  return <div>{lesson.title}</div>;
}
