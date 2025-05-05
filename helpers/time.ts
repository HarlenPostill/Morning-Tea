export function getTimeOfDay(date: any) {
  const currentHour = date.getHours();

  if (currentHour >= 4 && currentHour < 12) {
    return 'Morning';
  } else if (currentHour >= 12 && currentHour < 18) {
    return 'Afternoon';
  } else {
    return 'Evening';
  }
}

export function getTodayAsString() {
  const date = new Date();
  return date
    .toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
    .replace(/(\d+)/, match => {
      const day = parseInt(match);
      const suffix = ['th', 'st', 'nd', 'rd'][day % 10 > 3 ? 0 : day % 10];
      return `${day}${suffix}`;
    });
}
