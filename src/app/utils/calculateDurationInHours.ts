const calculateDurationInHours = (startTime: string, endTime: string) => {
  const startHour = parseInt(startTime.split(":")[0]);
  const endHour = parseInt(endTime.split(":")[0]);
  let duration = endHour - startHour;
  return duration;
};

export default calculateDurationInHours;
