import type {
  Teacher,
  Subject,
  Group,
  Classroom,
  Period,
  RawLesson,
  HydratedLesson,
} from "../types";

// ==========================================
// STATIC DATA
// ==========================================

export const SIMULATED_TODAY = "2026-03-03";
export const DIRECTIONS = ["CIE", "BM", "AD", "BA", "FY"];

export const teachers: Teacher[] = [
  { id: 1, name: "Akmal Tursunov" },
  { id: 2, name: "Dilnoza Karimova" },
  { id: 3, name: "Bobur Aliyev" },
  { id: 4, name: "Nilufar Rashidova" },
  { id: 5, name: "Jasur Xolmatov" },
  { id: 6, name: "Zarina Mirzoeva" },
  { id: 7, name: "Temur Yuldashev" },
  { id: 8, name: "Feruza Ismoilova" },
  { id: 9, name: "Sanjar Qodirov" },
  { id: 10, name: "Gulnora Abdullayeva" },
];

export const subjects: Subject[] = [
  { id: 1, name: "Object Oriented Programming", shortName: "OOP" },
  { id: 2, name: "Computer Architecture", shortName: "CompArch" },
  { id: 3, name: "Korean Language", shortName: "Korean" },
  { id: 4, name: "Academic Writing", shortName: "AcadWrit" },
  { id: 5, name: "Data Structures & Algorithms", shortName: "DSA" },
  { id: 6, name: "Electronics", shortName: "Electro" },
  { id: 7, name: "Philosophy", shortName: "Philo" },
  { id: 8, name: "Mathematical Analysis", shortName: "MathAna" },
  { id: 9, name: "Web Programming", shortName: "WebProg" },
  { id: 10, name: "Theory of Algorithms", shortName: "TheoAlg" },
  { id: 11, name: "Discrete Mathematics", shortName: "DiscMath" },
  { id: 12, name: "Operating Systems", shortName: "OS" },
];

export const groups: Group[] = [
  { id: 1, name: "CIE1-25", direction: "CIE" },
  { id: 2, name: "BM1-25", direction: "BM" },
  { id: 3, name: "IT1-25", direction: "CIE" },
  { id: 4, name: "AD1-25", direction: "AD" },
];

export const classrooms: Classroom[] = [
  { id: 1, name: "A101", type: "regular" },
  { id: 2, name: "A202", type: "regular" },
  { id: 3, name: "B301", type: "regular" },
  { id: 4, name: "B402", type: "regular" },
  { id: 5, name: "C101 Lab", type: "lab" },
  { id: 6, name: "C102 Lab", type: "lab" },
  { id: 7, name: "Zoom", type: "online" },
  { id: 8, name: "Google Meet", type: "online" },
  { id: 9, name: "D201", type: "regular" },
  { id: 10, name: "D305", type: "regular" },
];

export const periods: Period[] = [
  { id: 1, start: "09:00", end: "10:30" },
  { id: 2, start: "10:40", end: "12:10" },
  { id: 3, start: "13:00", end: "14:30" },
  { id: 4, start: "14:40", end: "16:10" },
  { id: 5, start: "16:20", end: "17:50" },
  { id: 6, start: "18:00", end: "19:30" },
  { id: 7, start: "19:40", end: "21:10" },
  { id: 8, start: "21:20", end: "22:50" },
];

export const rawLessons: RawLesson[] = [
  {
    id: 1,
    date: "2026-03-02",
    periodId: 1,
    groupId: 3,
    subjectId: 1,
    teacherId: 1,
    classroomId: 1,
    lessonType: "lec",
  },
  {
    id: 2,
    date: "2026-03-02",
    periodId: 2,
    groupId: 3,
    subjectId: 3,
    teacherId: 6,
    classroomId: 2,
    lessonType: "prac",
  },
  {
    id: 3,
    date: "2026-03-02",
    periodId: 3,
    groupId: 3,
    subjectId: 11,
    teacherId: 8,
    classroomId: 7,
    lessonType: "lec",
  },
  {
    id: 4,
    date: "2026-03-02",
    periodId: 4,
    groupId: 3,
    subjectId: 5,
    teacherId: 1,
    classroomId: 4,
    lessonType: "lec",
  },
  {
    id: 5,
    date: "2026-03-02",
    periodId: 6,
    groupId: 3,
    subjectId: 12,
    teacherId: 7,
    classroomId: 8,
    lessonType: "lec",
  },
  {
    id: 6,
    date: "2026-03-03",
    periodId: 1,
    groupId: 3,
    subjectId: 11,
    teacherId: 8,
    classroomId: 9,
    lessonType: "prac",
  },
  {
    id: 7,
    date: "2026-03-03",
    periodId: 2,
    groupId: 3,
    subjectId: 11,
    teacherId: 9,
    classroomId: 1,
    lessonType: "lec",
  },
  {
    id: 8,
    date: "2026-03-03",
    periodId: 3,
    groupId: 3,
    subjectId: 2,
    teacherId: 5,
    classroomId: 5,
    lessonType: "lab",
  },
  {
    id: 9,
    date: "2026-03-04",
    periodId: 2,
    groupId: 3,
    subjectId: 9,
    teacherId: 10,
    classroomId: 3,
    lessonType: "prac",
  },
  {
    id: 10,
    date: "2026-03-04",
    periodId: 3,
    groupId: 3,
    subjectId: 11,
    teacherId: 3,
    classroomId: 9,
    lessonType: "lec",
  },
  {
    id: 11,
    date: "2026-03-04",
    periodId: 4,
    groupId: 3,
    subjectId: 9,
    teacherId: 2,
    classroomId: 9,
    lessonType: "lec",
  },
  {
    id: 12,
    date: "2026-03-05",
    periodId: 2,
    groupId: 3,
    subjectId: 5,
    teacherId: 1,
    classroomId: 6,
    lessonType: "lab",
  },
  {
    id: 13,
    date: "2026-03-05",
    periodId: 3,
    groupId: 3,
    subjectId: 9,
    teacherId: 10,
    classroomId: 2,
    lessonType: "lec",
  },
  {
    id: 14,
    date: "2026-03-06",
    periodId: 2,
    groupId: 3,
    subjectId: 2,
    teacherId: 5,
    classroomId: 6,
    lessonType: "prac",
  },
  {
    id: 15,
    date: "2026-03-07",
    periodId: 1,
    groupId: 3,
    subjectId: 8,
    teacherId: 4,
    classroomId: 10,
    lessonType: "lec",
  },
  {
    id: 16,
    date: "2026-03-07",
    periodId: 3,
    groupId: 3,
    subjectId: 12,
    teacherId: 7,
    classroomId: 9,
    lessonType: "prac",
  },
  {
    id: 17,
    date: "2026-03-07",
    periodId: 4,
    groupId: 3,
    subjectId: 11,
    teacherId: 8,
    classroomId: 9,
    lessonType: "lec",
  },
  {
    id: 18,
    date: "2026-03-07",
    periodId: 5,
    groupId: 3,
    subjectId: 12,
    teacherId: 7,
    classroomId: 9,
    lessonType: "prac",
  },
  {
    id: 19,
    date: "2026-03-09",
    periodId: 1,
    groupId: 3,
    subjectId: 1,
    teacherId: 1,
    classroomId: 1,
    lessonType: "lec",
  },
];

// ==========================================
// DATA HYDRATION
// ==========================================

const resolveLesson = (lesson: RawLesson): HydratedLesson => {
  const period = periods.find((p) => p.id === lesson.periodId)!;
  const group = groups.find((g) => g.id === lesson.groupId)!;
  const subject = subjects.find((s) => s.id === lesson.subjectId)!;
  const teacher = teachers.find((t) => t.id === lesson.teacherId)!;
  const classroom = classrooms.find((c) => c.id === lesson.classroomId)!;

  return { ...lesson, period, group, subject, teacher, classroom };
};

export const hydratedLessons = rawLessons.map(resolveLesson);
