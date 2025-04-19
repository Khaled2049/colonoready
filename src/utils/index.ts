import { format } from "date-fns";
import { saveAs } from "file-saver";
import { v4 as uuidv4 } from "uuid";

interface EventDescription {
  title: string;
  description: string;
}

const getEventDescriptions = (
  scheduleType: "egd" | "gatorade-miralax" | "trilyte"
): Record<string, EventDescription> => {
  if (scheduleType === "egd") {
    return {
      twoWeeksPrior: {
        title: "Two Weeks Prior - EGD Prep",
        description:
          "Read all instructions at-least 2 weeks prior to your procedure. If you do not follow the instructions you may have your procedure rescheduled. Stool must be clear to yellow at the time of the procedure.",
      },
      sevenDaysPrior: {
        title: "Seven Days Prior - EGD Prep",
        description: "STOP eating nuts, seeds, corn, or popcorn.",
      },
      fiveDaysPrior: {
        title: "Five Days Prior - Medication Changes",
        description:
          "Stop (with provider approval): Aspirin (81 mg okay to continue), Vitamin E, iron, fish oil, other herbals, Aggrenox, Brilinta, Coumadin, Effient, Plavix. Call 417-875-3760 if unable to stop.",
      },
      fortyEightHoursPrior: {
        title: "48 Hours Prior - Stop Blood Thinners",
        description:
          "Stop taking: Eliquis (Apixaban), Pradaxa (Dabigatran), Xarelto (Rivaroxban). All other daily medicines not listed can be taken with a sip of water at least 6 hours before procedure.",
      },
      dayOfProcedure: {
        title: "Day of Procedure - Fasting",
        description:
          "Do NOT EAT anything after midnight. You may have CLEAR LIQUIDS until 6 hours before your procedure. Do NOT drink RED or PURPLE liquids.",
      },
      sixHoursPrior: {
        title: "6 Hours Prior to Procedure",
        description: "STOP all clear liquids.",
      },
      fourHoursPrior: {
        title: "4 Hours Prior to Procedure",
        description:
          "Take your blood pressure medicine with a sip of water. If you are diabetic, talk to your doctor about medication changes for procedure day.",
      },
    };
  } else if (scheduleType === "gatorade-miralax") {
    return {
      twoWeeksPrior: {
        title: "Two Weeks Prior - Gatorade/Miralax Prep",
        description:
          "Read all instructions at-least 2 weeks prior to your procedure. Failure to follow instructions may result in rescheduling of procedure. Stool must be clear to yellow at time of procedure",
      },
      sevenDaysPrior: {
        title: "Seven Days Prior - Gatorade/Miralax Prep",
        description:
          "Purchase prep items: 64oz Gatorade (no red/purple), 8oz Miralax, 4 Dulcolax tablets (5mg), 2 Gas-X Extra strength. Stop eating nuts, seeds, corn, or popcorn. Note: Diabetic patients should use Gatorade G2.",
      },
      fiveDaysPrior: {
        title: "Five Days Prior - Medication Changes",
        description:
          "Get approval to stop: Aspirin (81mg okay), Vitamin E, iron, fish oil, herbals, Aggrenox, Brilinta, Coumadin, Effient, Plavix. Call 417-875-3760 if unable to stop.",
      },
      threeDaysPrior: {
        title: "Three Days Prior - Diet Changes",
        description:
          "Start low fiber diet (no fruits, vegetables, grains, cereal or oatmeal). Stop fiber supplements and iron.",
      },
      fortyEightHoursPrior: {
        title: "48 Hours Prior - Stop Blood Thinners",
        description:
          "Stop taking: Eliquis (Apixaban), Pradaxa (Dabigatran), Xarelto (Rivaroxban)",
      },
      oneDayPrior: {
        title: "Day Before Procedure - Prep Day",
        description:
          "Clear liquid diet all day. NO solid foods. 4:00 PM - Take 4 Dulcolax tablets. 6:00 PM - Start Gatorade/Miralax solution (8oz every 15min until half gone). Continue clear liquids until bed.",
      },
      dayOfProcedure: {
        title: "Day of Procedure",
        description:
          "Continue clear liquid diet. Take remaining Gatorade/Miralax solution. After finishing, take 2 Gas-X tablets.",
      },
      fourHoursPrior: {
        title: "4 Hours Prior to Procedure",
        description: "NOTHING BY MOUTH. Do not drink anything.",
      },
    };
  } else {
    return {
      twoWeeksPrior: {
        title: "Two Weeks Prior - Trilyte Prep",
        description:
          "Read all instructions. Failure to follow instructions may result in rescheduling of procedure.",
      },
      sevenDaysPrior: {
        title: "Seven Days Prior - Trilyte Prep",
        description:
          "Stop eating nuts, seeds, corn, or popcorn. Ensure you have: Trilyte, Reglan (prescription), 4 Dulcolax tablets, 2 Gas-X Extra strength tablets.",
      },
      fiveDaysPrior: {
        title: "Five Days Prior - Medication Changes",
        description:
          "Stop (with provider approval): Aspirin 325mg, Vitamin E, iron, fish oil, herbals, Aggrenox, Brilinta, Coumadin, Effient, Plavix.",
      },
      threeDaysPrior: {
        title: "Three Days Prior - Diet Changes",
        description:
          "Start low fiber diet (no fruits, vegetables, grains, cereal or oatmeal). Stop fiber supplements and iron.",
      },
      fortyEightHoursPrior: {
        title: "48 Hours Prior - Stop Blood Thinners",
        description:
          "Stop taking: Eliquis (Apixaban), Pradaxa (Dabigatran), Xarelto (Rivaroxban)",
      },
      oneDayPrior: {
        title: "Day Before Procedure - Prep Day",
        description:
          "Clear liquid diet all day. 12:00 PM - Take 4 Dulcolax tablets. 6:00 PM - Take Reglan. 6:30 PM - Start Trilyte (8oz every 10min until half gone). Refrigerate remainder.",
      },
      dayOfProcedure: {
        title: "Day of Procedure",
        description:
          "Continue clear liquid diet. Six hours before: Take remaining Trilyte (8oz every 10min), then 2 Gas-X tablets. Take blood pressure meds 6 hours prior with water if needed.",
      },
      fourHoursPrior: {
        title: "4 Hours Prior to Procedure",
        description: "NOTHING BY MOUTH. Do not drink anything.",
      },
    };
  }
};

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

export const exportToICS = (
  dates: any,
  scheduleType: "egd" | "gatorade-miralax" | "trilyte" = "gatorade-miralax"
) => {
  const eventDescriptions = getEventDescriptions(scheduleType);
  let icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Procedure Schedule//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
  ].join("\n");

  // Create individual events for each date
  Object.entries(dates).forEach(([key, value]) => {
    const eventInfo = eventDescriptions[key as keyof typeof eventDescriptions];
    if (!eventInfo) return;

    const dtstamp = formatDateToICS(convertToDateArray(value));

    const event = [
      "BEGIN:VEVENT",
      `UID:${uuidv4()}`,
      `SUMMARY:${eventInfo.title}`,
      `DESCRIPTION:${eventInfo.description}`,
      `DTSTAMP:${dtstamp}`,
      `DTSTART:${dtstamp}`,
      "DURATION:PT1H",

      // Alarm: Triggers a notification 15 minutes before the event
      "BEGIN:VALARM",
      "TRIGGER:-PT15M", // 15 minutes before event
      "ACTION:DISPLAY",
      `DESCRIPTION:Reminder: ${eventInfo.title}`,
      "END:VALARM",

      "END:VEVENT",
    ].join("\n");

    icsContent += `\n${event}`;
  });

  icsContent += "\nEND:VCALENDAR";
  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  saveAs(blob, `${scheduleType}_schedule.ics`);
  return icsContent;
};
