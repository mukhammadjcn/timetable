import { X, Clock, User, MapPin, GraduationCap, Calendar } from "lucide-react";
import type { HydratedLesson } from "../types";
import { getDayNameUz, getLessonTypeLabel } from "../utils/helpers";

interface LessonModalProps {
  lesson: HydratedLesson;
  onClose: () => void;
}

export const LessonModal = ({ lesson, onClose }: LessonModalProps) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-lg max-w-sm w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-4 pt-4 pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`text-[10px] font-medium px-2 py-0.5 rounded ${
                    lesson.lessonType === "lab"
                      ? "bg-amber-100 text-amber-700"
                      : lesson.classroom.type === "online"
                        ? "bg-green-100 text-green-700"
                        : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {getLessonTypeLabel(lesson.lessonType)}
                </span>
                {lesson.classroom.type === "online" && (
                  <span className="text-[10px] font-medium text-green-600">
                    ONLINE
                  </span>
                )}
              </div>
              <h2 className="text-base font-semibold text-slate-800 leading-tight">
                {lesson.subject.name}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors -mt-1 -mr-1"
            >
              <X size={18} className="text-slate-400" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="px-4 pb-4 space-y-1">
          {/* Time */}
          <div className="flex items-center gap-3 py-2 border-b border-slate-100">
            <Clock size={16} className="text-slate-400" />
            <div className="flex-1">
              <span className="text-sm font-medium text-slate-700">
                {lesson.period.start} - {lesson.period.end}
              </span>
              <span className="text-xs text-slate-400 ml-2">
                {lesson.period.id}-Para
              </span>
            </div>
          </div>

          {/* Teacher */}
          <div className="flex items-center gap-3 py-2 border-b border-slate-100">
            <User size={16} className="text-slate-400" />
            <span className="text-sm text-slate-700">
              {lesson.teacher.name}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-3 py-2 border-b border-slate-100">
            <MapPin size={16} className="text-slate-400" />
            <span className="text-sm text-slate-700">
              {lesson.classroom.name}
            </span>
            {lesson.classroom.type === "lab" && (
              <span className="text-[10px] font-medium text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                LAB
              </span>
            )}
          </div>

          {/* Group */}
          <div className="flex items-center gap-3 py-2 border-b border-slate-100">
            <GraduationCap size={16} className="text-slate-400" />
            <span className="text-sm text-slate-700">{lesson.group.name}</span>
            <span className="text-xs text-slate-400">
              {lesson.group.direction}
            </span>
          </div>

          {/* Date */}
          <div className="flex items-center gap-3 py-2">
            <Calendar size={16} className="text-slate-400" />
            <span className="text-sm text-slate-700">
              {getDayNameUz(lesson.date)}, {new Date(lesson.date).getDate()}/
              {new Date(lesson.date).getMonth() + 1}
            </span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-4 pb-4">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-lg text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            Yopish
          </button>
        </div>
      </div>
    </div>
  );
};
