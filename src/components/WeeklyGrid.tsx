import type { HydratedLesson, Period } from "../types";
import { getShortDayNameUz, getLessonTypeShort } from "../utils/helpers";

interface WeeklyGridProps {
  weekDays: string[];
  periods: Period[];
  filteredLessons: HydratedLesson[];
  simulatedToday: string;
  onSelectLesson: (lesson: HydratedLesson) => void;
}

export const WeeklyGrid = ({
  weekDays,
  periods,
  filteredLessons,
  simulatedToday,
  onSelectLesson,
}: WeeklyGridProps) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header row with periods and times */}
      <div className="grid grid-cols-[80px_repeat(8,1fr)] divide-x divide-slate-100 border-b border-slate-200 bg-slate-50">
        <div className="p-2 flex items-center justify-center font-medium text-slate-400 text-[10px] uppercase tracking-wider">
          Kun
        </div>
        {periods.map((period) => (
          <div key={period.id} className="p-1.5 text-center group">
            <div className="text-xs font-semibold text-slate-600 group-hover:text-blue-600 transition-colors">
              {period.id}-Para
            </div>
            <div className="text-[9px] text-slate-400 mt-0.5">
              {period.start} - {period.end}
            </div>
          </div>
        ))}
      </div>

      {/* Grid body */}
      <div className="divide-y divide-slate-100">
        {weekDays.map((date) => {
          const isToday = date === simulatedToday;
          return (
            <div
              key={date}
              className={`grid grid-cols-[80px_repeat(8,1fr)] divide-x divide-slate-100 transition-colors hover:bg-slate-50/50 ${
                isToday ? "bg-blue-50/20" : ""
              }`}
            >
              {/* Day column */}
              <div
                className={`p-2 flex flex-col justify-center items-center text-center ${
                  isToday ? "bg-blue-50/50" : "bg-slate-50/30"
                }`}
              >
                <span
                  className={`text-sm font-semibold ${
                    isToday ? "text-blue-600" : "text-slate-700"
                  }`}
                >
                  {getShortDayNameUz(date)}
                </span>
                <span
                  className={`text-[10px] mt-0.5 ${
                    isToday ? "text-blue-500" : "text-slate-400"
                  }`}
                >
                  {new Date(date).getDate()}-Mar
                </span>
              </div>

              {/* Period cells */}
              {periods.map((period) => {
                const lesson = filteredLessons.find(
                  (l) => l.date === date && l.periodId === period.id,
                );

                return (
                  <div
                    key={`${date}-${period.id}`}
                    className="relative group p-0.5 min-h-[100px]"
                  >
                    {lesson ? (
                      <WeeklyGridCell
                        lesson={lesson}
                        onClick={() => onSelectLesson(lesson)}
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-1 h-1 rounded-full bg-slate-200"></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface WeeklyGridCellProps {
  lesson: HydratedLesson;
  onClick: () => void;
}

const WeeklyGridCell = ({ lesson, onClick }: WeeklyGridCellProps) => {
  const isOnline = lesson.classroom.type === "online";
  const isLab = lesson.lessonType === "lab";

  return (
    <div
      onClick={onClick}
      className={`
        h-full w-full rounded-md p-1.5 flex flex-col justify-between border transition-all hover:shadow-sm cursor-pointer
        ${
          isOnline
            ? "bg-green-50/80 border-green-200 hover:border-green-300"
            : isLab
              ? "bg-amber-50/80 border-amber-200 hover:border-amber-300"
              : "bg-white border-slate-200 hover:border-slate-300"
        }
      `}
    >
      {/* Top: Type badge + online indicator */}
      <div>
        <div className="flex items-center justify-between mb-0.5">
          <span
            className={`text-[8px] font-semibold px-1 py-0.5 rounded
              ${
                isOnline
                  ? "bg-green-100 text-green-700"
                  : isLab
                    ? "bg-amber-100 text-amber-700"
                    : "bg-slate-100 text-slate-600"
              }`}
          >
            {getLessonTypeShort(lesson.lessonType)}
          </span>
          {isOnline && (
            <span className="text-[8px] font-semibold text-green-500">
              ONLINE
            </span>
          )}
        </div>
        <div
          className="font-semibold text-slate-800 leading-tight line-clamp-2 text-[11px]"
          title={lesson.subject.name}
        >
          {lesson.subject.shortName}
        </div>
      </div>

      {/* Bottom: Room + Teacher */}
      <div className="mt-auto flex items-center justify-between">
        <span
          className={`text-[9px] font-medium px-1 py-0.5 rounded
            ${
              isOnline
                ? "bg-green-100 text-green-700"
                : isLab
                  ? "bg-amber-100 text-amber-700"
                  : "bg-slate-100 text-slate-600"
            }`}
        >
          {lesson.classroom.name}
        </span>
        <span className="text-[9px] text-slate-400">
          {lesson.teacher.name.split(" ")[1]}
        </span>
      </div>
    </div>
  );
};
