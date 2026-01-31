import { useState, useEffect, useMemo, type ChangeEvent } from "react";
import {
  Calendar,
  Filter,
  List,
  LayoutGrid,
  ChevronDown,
  BookOpen,
} from "lucide-react";

import type { HydratedLesson } from "./types";
import {
  SIMULATED_TODAY,
  DIRECTIONS,
  teachers,
  groups,
  periods,
  hydratedLessons,
} from "./data/mockData";
import {
  formatDate,
  getMonday,
  getShortDayNameUz,
  getDayNameUz,
} from "./utils/helpers";
import {
  FilterSelect,
  SkeletonLoader,
  LessonModal,
  LessonCardMobile,
  LessonCardDesktop,
  EmptyDayCard,
  WeeklyGrid,
  MobileWeeklyView,
} from "./components";

export default function App() {
  const [viewMode, setViewMode] = useState("daily");
  const [loading, setLoading] = useState(true);

  // Filters State
  const [selectedDirection, setSelectedDirection] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState("IT1-25");
  const [selectedTeacher, setSelectedTeacher] = useState("All");
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  // Modal state for lesson details
  const [selectedLesson, setSelectedLesson] = useState<HydratedLesson | null>(
    null,
  );

  // Week Management
  const todayObj = new Date(SIMULATED_TODAY);
  const currentMonday = getMonday(todayObj);

  const weekOptions = useMemo(() => {
    const options = [];
    for (let i = -1; i <= 1; i++) {
      const start = new Date(currentMonday);
      start.setDate(start.getDate() + i * 7);

      const end = new Date(start);
      end.setDate(end.getDate() + 5);

      let labelSuffix = "";
      if (i === -1) labelSuffix = "(O'tgan)";
      if (i === 0) labelSuffix = "(Hozirgi)";
      if (i === 1) labelSuffix = "(Kelasi)";

      options.push({
        value: start.toISOString().split("T")[0],
        label: `${formatDate(start)} - ${formatDate(end)} ${labelSuffix}`,
        weekIndex: i,
      });
    }
    return options;
  }, []);

  const [selectedWeekStart, setSelectedWeekStart] = useState(
    weekOptions[1].value,
  );

  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
    const today = new Date(SIMULATED_TODAY);
    const day = today.getDay();
    const adjustedDay = day === 0 ? 0 : day - 1;
    setSelectedDayIndex(adjustedDay);
  }, []);

  // Filter Logic
  const filteredLessons = useMemo(() => {
    const weekStart = new Date(selectedWeekStart);
    const weekEnd = new Date(selectedWeekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);

    return hydratedLessons.filter((lesson) => {
      const lessonDate = new Date(lesson.date);
      if (lessonDate < weekStart || lessonDate > weekEnd) return false;

      if (
        selectedDirection !== "All" &&
        lesson.group.direction !== selectedDirection
      )
        return false;
      if (selectedGroup !== "All" && lesson.group.name !== selectedGroup)
        return false;
      if (selectedTeacher !== "All" && lesson.teacher.name !== selectedTeacher)
        return false;

      return true;
    });
  }, [selectedWeekStart, selectedDirection, selectedGroup, selectedTeacher]);

  const weekDays = useMemo(() => {
    const start = new Date(selectedWeekStart);
    return Array.from({ length: 6 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d.toISOString().split("T")[0];
    });
  }, [selectedWeekStart]);

  const currentDayKey = weekDays[selectedDayIndex] || weekDays[0];
  const currentDayLessons = filteredLessons
    .filter((l) => l.date === currentDayKey)
    .sort((a, b) => a.period.id - b.period.id);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-20 md:pb-0">
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        {/* --- DESKTOP HEADER LAYOUT --- */}
        <div className="hidden lg:flex items-center justify-between px-6 py-3 max-w-screen-3xl mx-auto h-20">
          {/* Left: Logo */}
          <div className="flex items-center gap-2 min-w-[200px]">
            <div className="bg-blue-600 text-white p-2 rounded-xl shadow-lg shadow-blue-200">
              <Calendar size={24} />
            </div>
            <div className="leading-tight flex flex-col">
              <h1 className="text-lg font-bold text-slate-900">TTPU</h1>
              <span className="text-xs text-slate-500 font-semibold tracking-wide">
                TIMETABLE
              </span>
            </div>
          </div>

          {/* Center: HUGE SELECTED GROUP */}
          <div className="flex-1 flex justify-center">
            <h2 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-blue-700 to-indigo-600">
              {selectedGroup === "All" ? "Barcha Darslar" : selectedGroup}
            </h2>
          </div>

          {/* Right: All Filters Inline */}
          <div className="flex items-center gap-3">
            {/* Week Selector */}
            <div className="relative min-w-[180px]">
              <select
                value={selectedWeekStart}
                onChange={(e) => setSelectedWeekStart(e.target.value)}
                className="w-full appearance-none bg-blue-50 hover:bg-blue-100 border border-blue-100 focus:bg-white focus:border-blue-500 text-blue-800 text-sm font-bold rounded-lg px-4 py-2.5 pr-10 cursor-pointer transition-all outline-none"
              >
                {weekOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-blue-500">
                <ChevronDown size={16} />
              </div>
            </div>

            <div className="h-8 w-px bg-slate-200 mx-1"></div>

            <FilterSelect
              label="Yo'nalish"
              value={selectedDirection}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                setSelectedDirection(e.target.value);
                setSelectedGroup("All");
              }}
              options={DIRECTIONS}
            />

            <FilterSelect
              label="Guruh"
              value={selectedGroup}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setSelectedGroup(e.target.value)
              }
              options={groups.filter(
                (g) =>
                  selectedDirection === "All" ||
                  g.direction === selectedDirection,
              )}
            />

            <FilterSelect
              label="O'qituvchi"
              value={selectedTeacher}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setSelectedTeacher(e.target.value)
              }
              options={teachers}
            />

            <div className="h-8 w-px bg-slate-200 mx-1"></div>

            <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
              <button
                onClick={() => setViewMode("daily")}
                className={`p-2 rounded-md transition-all ${
                  viewMode === "daily"
                    ? "bg-white shadow-sm text-blue-600"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                <List size={20} />
              </button>
              <button
                onClick={() => setViewMode("weekly")}
                className={`p-2 rounded-md transition-all ${
                  viewMode === "weekly"
                    ? "bg-white shadow-sm text-blue-600"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                <LayoutGrid size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* --- MOBILE HEADER LAYOUT --- */}
        <div className="lg:hidden">
          <div className="px-4 py-3 flex flex-col gap-3">
            {/* Top Row: Brand & Title */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-blue-600 text-white p-1.5 rounded-lg">
                  <Calendar size={20} />
                </div>
                <div className="leading-tight flex flex-col gap-0.5">
                  <h1 className="text-xl font-bold text-slate-900 leading-none">
                    {selectedGroup === "All" ? "Jadval" : selectedGroup}
                  </h1>
                  <span className="text-[10px] text-slate-500 font-medium">
                    TTPU Timetable
                  </span>
                </div>
              </div>
              {/* View Toggle Mobile */}
              <div className="flex bg-slate-100 p-1 rounded-lg">
                <button
                  onClick={() => setViewMode("daily")}
                  className={`p-1.5 rounded-md ${
                    viewMode === "daily"
                      ? "bg-white shadow-sm text-blue-600"
                      : "text-slate-400"
                  }`}
                >
                  <List size={16} />
                </button>
                <button
                  onClick={() => setViewMode("weekly")}
                  className={`p-1.5 rounded-md ${
                    viewMode === "weekly"
                      ? "bg-white shadow-sm text-blue-600"
                      : "text-slate-400"
                  }`}
                >
                  <LayoutGrid size={16} />
                </button>
              </div>
            </div>

            {/* Middle Row: Week Select & Filter Toggle */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <select
                  value={selectedWeekStart}
                  onChange={(e) => setSelectedWeekStart(e.target.value)}
                  className="w-full appearance-none bg-slate-100 border border-slate-200 focus:bg-white focus:border-blue-500 text-slate-800 text-sm font-semibold rounded-lg px-3 py-2.5 pr-8 transition-all outline-none"
                >
                  {weekOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                  <ChevronDown size={16} />
                </div>
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-3 rounded-lg border transition-colors flex items-center justify-center gap-2 ${
                  showFilters
                    ? "bg-blue-50 border-blue-200 text-blue-600"
                    : "bg-white border-slate-200 text-slate-600"
                }`}
              >
                <Filter size={18} />
                <span className="text-sm font-medium">Filtr</span>
              </button>
            </div>

            {/* Collapsible Filters (Mobile Only) */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                showFilters ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200 mt-1">
                <div className="col-span-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">
                    Guruh
                  </label>
                  <select
                    value={selectedGroup}
                    onChange={(e) => setSelectedGroup(e.target.value)}
                    className="w-full mt-1 p-2 rounded-lg border border-slate-200 text-sm"
                  >
                    <option value="All">Barchasi</option>
                    {groups.map((g) => (
                      <option key={g.id} value={g.name}>
                        {g.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">
                    Yo'nalish
                  </label>
                  <select
                    value={selectedDirection}
                    onChange={(e) => {
                      setSelectedDirection(e.target.value);
                      setSelectedGroup("All");
                    }}
                    className="w-full mt-1 p-2 rounded-lg border border-slate-200 text-sm"
                  >
                    <option value="All">Barchasi</option>
                    {DIRECTIONS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">
                    O'qituvchi
                  </label>
                  <select
                    value={selectedTeacher}
                    onChange={(e) => setSelectedTeacher(e.target.value)}
                    className="w-full mt-1 p-2 rounded-lg border border-slate-200 text-sm"
                  >
                    <option value="All">Barchasi</option>
                    {teachers.map((t) => (
                      <option key={t.id} value={t.name}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Day Tabs (Only for Daily View) */}
          {viewMode === "daily" && (
            <div className="flex border-t border-slate-200 overflow-x-auto no-scrollbar bg-white">
              {weekDays.map((date, index) => {
                const isSelected = index === selectedDayIndex;
                const isToday = date === SIMULATED_TODAY;

                return (
                  <button
                    key={date}
                    onClick={() => setSelectedDayIndex(index)}
                    className={`
                      flex-1 min-w-[60px] py-3 flex flex-col items-center gap-1 relative transition-colors
                      ${isSelected ? "bg-blue-50/50" : ""}
                    `}
                  >
                    <span
                      className={`text-[10px] font-bold uppercase ${
                        isSelected ? "text-blue-600" : "text-slate-400"
                      }`}
                    >
                      {getShortDayNameUz(date)}
                    </span>
                    <span
                      className={`
                        text-sm font-bold w-8 h-8 flex items-center justify-center rounded-full transition-all
                        ${
                          isToday
                            ? isSelected
                              ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                              : "bg-blue-100 text-blue-600"
                            : isSelected
                              ? "text-slate-900 bg-white border border-slate-200"
                              : "text-slate-600"
                        }
                      `}
                    >
                      {new Date(date).getDate()}
                    </span>
                    {isSelected && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <main className="max-w-screen-3xl mx-auto px-4 lg:px-6 py-6">
        {loading ? (
          <SkeletonLoader />
        ) : (
          <>
            {/* --- MOBILE VIEW (Daily List) --- */}
            <div className="lg:hidden space-y-3 min-h-[50vh]">
              {viewMode === "daily" ? (
                currentDayLessons.length > 0 ? (
                  currentDayLessons.map((lesson) => (
                    <LessonCardMobile
                      key={lesson.id}
                      lesson={lesson}
                      isToday={lesson.date === SIMULATED_TODAY}
                      onClick={() => setSelectedLesson(lesson)}
                    />
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="bg-slate-100 p-4 rounded-full mb-3">
                      <BookOpen size={24} className="text-slate-400" />
                    </div>
                    <p className="text-slate-500 text-sm font-medium">
                      Bu kunda darslar yo'q
                    </p>
                  </div>
                )
              ) : (
                <MobileWeeklyView
                  weekDays={weekDays}
                  filteredLessons={filteredLessons}
                  onSelectLesson={setSelectedLesson}
                />
              )}
            </div>

            {/* --- DESKTOP VIEW --- */}
            <div className="hidden lg:block">
              {viewMode === "daily" ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {weekDays.map((date) => {
                    const lessons = filteredLessons
                      .filter((l) => l.date === date)
                      .sort((a, b) => a.period.id - b.period.id);
                    const isToday = date === SIMULATED_TODAY;

                    return (
                      <div
                        key={date}
                        className={`rounded-2xl border ${
                          isToday
                            ? "border-blue-200 bg-blue-50/30"
                            : "border-slate-200 bg-white"
                        } overflow-hidden shadow-sm hover:shadow-md transition-shadow`}
                      >
                        <div
                          className={`px-4 py-3 border-b ${
                            isToday
                              ? "border-blue-100 bg-blue-50"
                              : "border-slate-100 bg-slate-50"
                          } flex justify-between items-center`}
                        >
                          <h3
                            className={`font-bold ${
                              isToday ? "text-blue-800" : "text-slate-700"
                            }`}
                          >
                            {getDayNameUz(date)}
                          </h3>
                          <span
                            className={`text-xs font-medium px-2 py-1 rounded-md ${
                              isToday
                                ? "bg-blue-200 text-blue-800"
                                : "bg-slate-200 text-slate-600"
                            }`}
                          >
                            {new Date(date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="p-3 space-y-2">
                          {lessons.length > 0 ? (
                            lessons.map((lesson) => (
                              <LessonCardDesktop
                                key={lesson.id}
                                lesson={lesson}
                                onClick={() => setSelectedLesson(lesson)}
                              />
                            ))
                          ) : (
                            <EmptyDayCard />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <WeeklyGrid
                  weekDays={weekDays}
                  periods={periods}
                  filteredLessons={filteredLessons}
                  simulatedToday={SIMULATED_TODAY}
                  onSelectLesson={setSelectedLesson}
                />
              )}
            </div>
          </>
        )}
      </main>

      {/* ================= LESSON DETAIL MODAL ================= */}
      {selectedLesson && (
        <LessonModal
          lesson={selectedLesson}
          onClose={() => setSelectedLesson(null)}
        />
      )}
    </div>
  );
}
