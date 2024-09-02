const calculateDurationInHours = (
  startTime: string,
  endTime: string
): number => {
  const [startHour, startMinute] = startTime.split(":").map(Number);

  const [endHour, endMinute] = endTime.split(":").map(Number);

  const startTotalMinutes = startHour * 60 + startMinute;
  const endTotalMinutes = endHour * 60 + endMinute;

  const durationInMinutes = endTotalMinutes - startTotalMinutes;

  const durationInHours = Math.ceil(durationInMinutes / 60);

  return durationInHours;
};

export default calculateDurationInHours;
