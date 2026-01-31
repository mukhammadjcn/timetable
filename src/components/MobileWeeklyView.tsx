import type { HydratedLesson } from "../types";
import { getDayNameUz, getLessonTypeShort } from "../utils/helpers";

interface MobileWeeklyViewProps {
  weekDays: string[];
  filteredLessons: HydratedLesson[];
  onSelectLesson: (lesson: HydratedLesson) => void;
}

export const MobileWeeklyView = ({
  weekDays,
  filteredLessons,
  onSelectLesson,
}: MobileWeeklyViewProps) => {
  return (
    <div className="space-y-6">
      {weekDays.map((date) => {
        const lessons = filteredLessons
          .filter((l) => l.date === date)
          .sort((a, b) => a.period.id - b.period.id);
        if (lessons.length === 0) return null;
        return (
          <div
            key={date}
            className="bg-white rounded-xl border border-slate-200 overflow-hidden"
          >
            <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex justify-between items-center">
              <span className="font-bold text-slate-700">
                {getDayNameUz(date)}
              </span>
              <span className="text-xs text-slate-500">
                {new Date(date).toLocaleDateString()}
              </span>
            </div>
            <div className="divide-y divide-slate-100">
              {lessons.map((lesson) => (
                <MobileWeeklyItem
                  key={lesson.id}
                  lesson={lesson}
                  onClick={() => onSelectLesson(lesson)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

interface MobileWeeklyItemProps {
  lesson: HydratedLesson;
  onClick: () => void;
}

const MobileWeeklyItem = ({ lesson, onClick }: MobileWeeklyItemProps) => {
  const isOnline = lesson.classroom.type === "online";
  const isLab = lesson.lessonType === "lab";

  return (
    <div
      onClick={onClick}
      className={`flex gap-3 p-3 cursor-pointer active:bg-slate-50 ${
        isOnline ? "bg-green-50" : isLab ? "bg-amber-50" : ""
      }`}
    >
      <div
        className={`font-mono text-xs font-bold min-w-[40px] pt-1 ${
          isOnline
            ? "text-green-600"
            : isLab
              ? "text-amber-600"
              : "text-slate-500"
        }`}
      >
        {lesson.period.start}
      </div>
      <div className="flex-1">
        <div className="font-bold text-sm text-slate-800">
          {lesson.subject.shortName}
          <span className="text-xs font-normal text-slate-500 ml-1">
            ({getLessonTypeShort(lesson.lessonType)})
          </span>
        </div>
        <div className="text-xs text-slate-500 flex items-center gap-2">
          <span
            className={`px-1.5 py-0.5 rounded ${
              isOnline
                ? "bg-green-100 text-green-700"
                : isLab
                  ? "bg-amber-100 text-amber-700"
                  : "bg-slate-100 text-slate-600"
            }`}
          >
            {lesson.classroom.name}
          </span>
          <span>{lesson.teacher.name.split(" ")[1]}</span>
          {isOnline && (
            <span className="text-green-600 font-bold text-[10px]">ONLINE</span>
          )}
          {isLab && (
            <span className="text-amber-600 font-bold text-[10px]">LAB</span>
          )}
        </div>
      </div>
    </div>
  );
};
