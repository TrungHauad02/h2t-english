import { Speaking } from "interfaces";

export default function SpeakingLesson({ lesson }: { lesson: Speaking }) {
  return <div>{lesson.title}</div>;
}
