export interface Teacher {
  id: number;
  name: string;
}

export interface Subject {
  id: number;
  name: string;
  shortName: string;
}

export interface Group {
  id: number;
  name: string;
  direction: string;
}

export interface Classroom {
  id: number;
  name: string;
  type: "regular" | "online" | "lab";
}

export interface Period {
  id: number;
  start: string;
  end: string;
}

export interface RawLesson {
  id: number;
  date: string;
  periodId: number;
  groupId: number;
  subjectId: number;
  teacherId: number;
  classroomId: number;
  lessonType: "lec" | "prac" | "lab";
}

export interface HydratedLesson extends RawLesson {
  period: Period;
  group: Group;
  subject: Subject;
  teacher: Teacher;
  classroom: Classroom;
}

export interface FilterSelectProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: (string | SelectOption)[];
  className?: string;
}

export interface SelectOption {
  value?: string;
  label?: string;
  name?: string;
}
