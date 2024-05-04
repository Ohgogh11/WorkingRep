export function formatDate(inputDate) {
  const daysOfWeek = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
  const months = [
    "ינואר",
    "פבואר",
    "מרץ",
    "אפריל",
    "מאי",
    "יוני",
    "יולי",
    "אוגוסט",
    "ספטמבר",
    "אוקטובר",
    "נובמבר",
    "דצמבר",
  ];

  // Parse the input date string
  const [year, month, day] = inputDate.split("-");
  const date = new Date(year, month - 1, day); // Month is 0-indexed in JavaScript Date object

  // Get the day of the week, month, and year
  const dayOfWeek = daysOfWeek[date.getDay()];
  const monthName = months[date.getMonth()];
  const formattedDate = `יום ${dayOfWeek}, ${parseInt(
    day,
    10
  )} ב${monthName} ${year}`;

  return formattedDate;
}
