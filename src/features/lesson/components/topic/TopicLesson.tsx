import { Topic } from "interfaces";

export default function TopicLesson({ lesson }: { lesson: Topic }) {
  return <div>{lesson.title}</div>;
}
