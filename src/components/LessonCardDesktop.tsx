import { MapPin, User, GraduationCap } from "lucide-react";
import type { HydratedLesson } from "../types";
import { getLessonTypeShort } from "../utils/helpers";

interface LessonCardDesktopProps {
  lesson: HydratedLesson;
  onClick: () => void;
}

export const LessonCardDesktop = ({
  lesson,
  onClick,
}: LessonCardDesktopProps) => {
  const isOnline = lesson.classroom.type === "online";
  const isLab = lesson.lessonType === "lab";

  return (
    <div
      onClick={onClick}
      className={`flex gap-3 p-3 rounded-xl border transition-all group cursor-pointer
        ${
          isOnline
            ? "bg-green-50 border-green-200 hover:border-green-300"
            : isLab
              ? "bg-amber-50 border-amber-200 hover:border-amber-300"
              : "bg-white border-slate-200 hover:border-slate-300"
        }
      `}
    >
      <div
        className={`flex flex-col items-center justify-center w-14 rounded-lg text-xs font-bold border
          ${
            isOnline
              ? "bg-green-100 border-green-200 text-green-700"
              : isLab
                ? "bg-amber-100 border-amber-200 text-amber-700"
                : "bg-slate-50 border-slate-100 text-slate-600"
          }
        `}
      >
        <span>{lesson.period.start}</span>
        <div
          className={`h-px w-3 my-0.5 ${
            isOnline ? "bg-green-300" : isLab ? "bg-amber-300" : "bg-slate-300"
          }`}
        ></div>
        <span>{lesson.period.end}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div
            className="font-bold text-sm text-slate-800 truncate"
            title={lesson.subject.name}
          >
            {lesson.subject.shortName}
            <span className="text-xs font-normal text-slate-500 ml-1">
              ({getLessonTypeShort(lesson.lessonType)})
            </span>
          </div>
          {isOnline && (
            <span className="text-[9px] font-extrabold text-green-600 shrink-0">
              ONLINE
            </span>
          )}
          {lesson.classroom.type === "lab" && (
            <span className="text-[9px] font-extrabold text-amber-600 shrink-0">
              LAB
            </span>
          )}
        </div>
        <div className="text-xs text-slate-500 flex justify-between mt-1">
          <span
            className={`flex items-center gap-1 ${
              isOnline
                ? "text-green-700"
                : isLab
                  ? "text-amber-700"
                  : "text-slate-600"
            }`}
          >
            <MapPin
              size={12}
              className={
                isOnline
                  ? "text-green-600"
                  : isLab
                    ? "text-amber-600"
                    : "text-slate-400"
              }
            />
            {lesson.classroom.name}
          </span>
          <span
            className={`flex items-center gap-1 px-1.5 rounded ${
              isOnline
                ? "bg-green-100"
                : isLab
                  ? "bg-amber-100"
                  : "bg-slate-100"
            }`}
          >
            <User size={12} />
            {lesson.teacher.name.split(" ")[1]}
          </span>
        </div>
      </div>
    </div>
  );
};

interface EmptyDayCardProps {}

export const EmptyDayCard = ({}: EmptyDayCardProps) => (
  <div className="py-8 text-center flex flex-col items-center justify-center opacity-50">
    <GraduationCap size={24} className="text-slate-300 mb-2" />
    <span className="text-xs text-slate-400">Darslar mavjud emas</span>
  </div>
);
