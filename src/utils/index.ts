import { format } from "date-fns";
import { saveAs } from "file-saver";
const convertToDateArray = (dateString: any) => {
  const date = new Date(dateString);
  return [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    date.getHours() || 0,
    date.getMinutes() || 0,
  ];
};

const formatDateToICS = (dateArray: any) => {
  return format(
    new Date(
      dateArray[0],
      dateArray[1] - 1,
      dateArray[2],
      dateArray[3],
      dateArray[4]
    ),
    "yyyyMMdd'T'HHmmss'Z'"
  );
};
export const exportToICS = (dates: any) => {
  const events = [
    {
      start: convertToDateArray(dates.twoWeeksPrior),
      title: "Two Weeks Prior",
      description: "Reminder for two weeks prior to the procedure",
    },
    {
      start: convertToDateArray(dates.sixHoursPrior),
      title: "Six Hours Prior",
      description: "Reminder for six hours prior to the procedure",
    },
    {
      start: convertToDateArray(dates.fourHoursPrior),
      title: "Four Hours Prior",
      description: "Reminder for four hours prior to the procedure",
    },
    {
      start: convertToDateArray(dates.fiveDaysPrior),
      title: "Five Days Prior",
      description: "Reminder for five days prior to the procedure",
    },
    {
      start: convertToDateArray(dates.fortyEightHoursPrior),
      title: "48 Hours Prior",
      description: "Reminder for 48 hours prior to the procedure",
    },
    {
      start: convertToDateArray(dates.sevenDaysPrior),
      title: "Seven Days Prior",
      description: "Reminder for seven days prior to the procedure",
    },
    {
      start: convertToDateArray(dates.threeDaysPrior),
      title: "Three Days Prior",
      description: "Reminder for three days prior to the procedure",
    },
    {
      start: convertToDateArray(dates.oneDayPrior),
      title: "One Day Prior",
      description: "Reminder for one day prior to the procedure",
    },
    {
      start: convertToDateArray(dates.dayOfProcedure),
      title: "Day of Procedure",
      description: "Reminder for the day of the procedure",
    },
  ];

  let icsContent = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Your App//EN";

  events.forEach((event) => {
    const start = formatDateToICS(event.start);
    icsContent += `\nBEGIN:VEVENT\nSUMMARY:${event.title}\nDESCRIPTION:${event.description}\nDTSTART:${start}\nDURATION:PT1H\nEND:VEVENT`;
  });

  icsContent += "\nEND:VCALENDAR";

  const blob = new Blob([icsContent], { type: "text/calendar" });
  saveAs(blob, "events.ics");
};
