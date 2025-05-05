export function getTimeOfDay(date: any) {
  const currentHour = date.getHours();

  if (currentHour >= 4 && currentHour < 12) {
    return "Morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    return "Afternoon";
  } else {
    return "Evening";
  }
}
