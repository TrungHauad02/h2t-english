interface ListLessonProps {
  type: string;
}

export default function ListLesson({ type }: ListLessonProps) {
  return <div>List lesson {type}</div>;
}
