// ==========================================
// DATE HELPERS
// ==========================================

export const getDayNameUz = (dateString: string): string => {
  const date = new Date(dateString);
  const days = [
    "Yakshanba",
    "Dushanba",
    "Seshanba",
    "Chorshanba",
    "Payshanba",
    "Juma",
    "Shanba",
  ];
  return days[date.getDay()];
};

export const getShortDayNameUz = (dateString: string): string => {
  const date = new Date(dateString);
  const days = ["Yak", "Du", "Se", "Chor", "Pay", "Ju", "Sha"];
  return days[date.getDay()];
};

export const formatDate = (date: Date): string => {
  return (
    date.getDate().toString().padStart(2, "0") +
    "." +
    (date.getMonth() + 1).toString().padStart(2, "0")
  );
};

// Berilgan sananing dushanbasini topish
export const getMonday = (d: string | Date): Date => {
  const date = new Date(d);
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(date.setDate(diff));
};

// ==========================================
// LESSON TYPE HELPERS
// ==========================================

export const getLessonTypeLabel = (type: string): string => {
  switch (type) {
    case "lec":
      return "Ma'ruza";
    case "prac":
      return "Amaliy";
    case "lab":
      return "Laboratoriya";
    default:
      return type;
  }
};

export const getLessonTypeShort = (type: string): string => {
  switch (type) {
    case "lec":
      return "lec";
    case "prac":
      return "prac";
    case "lab":
      return "lab";
    default:
      return type;
  }
};
