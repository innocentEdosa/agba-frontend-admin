export const formatDuration = (
  durationInSeconds: number,
  inMinuteOnly?: boolean
) => {
  if (inMinuteOnly) return `${Math.floor(durationInSeconds / 60)}m`;
  // Convert the duration to hours, minutes, and seconds.
  const hours = Math.floor(durationInSeconds / 3600);
  const minutes = Math.floor((durationInSeconds % 3600) / 60);
  const seconds = Math.floor(durationInSeconds % 60);

  // Pad the hours, minutes, and seconds with zeros if necessary.
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  // Return the formatted duration in hh:mm:ss format.
  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};
