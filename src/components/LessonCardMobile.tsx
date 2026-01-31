import { User } from "lucide-react";
import type { HydratedLesson } from "../types";
import { getLessonTypeShort } from "../utils/helpers";

interface LessonCardMobileProps {
  lesson: HydratedLesson;
  isToday: boolean;
  onClick: () => void;
}

export const LessonCardMobile = ({
  lesson,
  isToday,
  onClick,
}: LessonCardMobileProps) => {
  const isOnline = lesson.classroom.type === "online";
  const isLab = lesson.lessonType === "lab";

  return (
    <div
      onClick={onClick}
      className={`
        relative rounded-xl border shadow-sm flex gap-4 transition-all p-4 cursor-pointer active:scale-[0.98]
        ${
          isOnline
            ? "bg-green-50 border-green-200"
            : isLab
              ? "bg-amber-50 border-amber-200"
              : "bg-white border-slate-200"
        }
        ${isToday ? "ring-1 ring-blue-500" : ""}
      `}
    >
      <div
        className={`flex flex-col items-center justify-center min-w-[3.5rem] border-r pr-4 ${
          isOnline
            ? "border-green-200"
            : isLab
              ? "border-amber-200"
              : "border-slate-200"
        }`}
      >
        <span
          className={`font-bold text-lg ${
            isOnline
              ? "text-green-700"
              : isLab
                ? "text-amber-700"
                : "text-slate-700"
          }`}
        >
          {lesson.period.id}
        </span>
        <span
          className={`text-[10px] font-medium mt-1 ${
            isOnline
              ? "text-green-500"
              : isLab
                ? "text-amber-500"
                : "text-slate-400"
          }`}
        >
          PARA
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1">
          <span
            className={`
              text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide
              ${
                isOnline
                  ? "bg-green-100 text-green-700"
                  : isLab
                    ? "bg-amber-100 text-amber-700"
                    : "bg-slate-100 text-slate-600"
              }
            `}
          >
            {lesson.period.start} - {lesson.period.end}
          </span>
          <span
            className={`text-xs font-bold px-2 py-0.5 rounded-md ${
              isOnline
                ? "bg-green-100 text-green-700"
                : isLab
                  ? "bg-amber-100 text-amber-700"
                  : "bg-slate-100 text-slate-600"
            }`}
          >
            {lesson.classroom.name}
          </span>
        </div>
        <h3 className="font-bold text-slate-900 leading-tight text-sm">
          {lesson.subject.shortName}
          <span className="text-xs font-normal text-slate-500 ml-1">
            ({getLessonTypeShort(lesson.lessonType)})
          </span>
        </h3>
        <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
          <User size={12} />
          <span className="truncate">{lesson.teacher.name}</span>
        </div>
        {isOnline && (
          <span className="mt-1 inline-block text-[10px] font-extrabold text-green-600 tracking-wider">
            ONLINE
          </span>
        )}
        {isLab && (
          <span className="mt-1 inline-block text-[10px] font-extrabold text-amber-600 tracking-wider">
            LABORATORIYA
          </span>
        )}
      </div>
    </div>
  );
};
