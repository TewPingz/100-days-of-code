import { ReactElement, useEffect, useState } from "react";
import {
  FaRegFrown,
  FaRegLaugh,
  FaRegMeh,
  FaRegSadTear,
  FaRegSmile,
} from "react-icons/fa";

import "./App.css";

type Mood = {
  icon?: ReactElement<any, any>;
  hexColor: string;
};

const moods: Mood[] = [
  {
    icon: <FaRegLaugh />,
    hexColor: "#2d6b5f",
  },
  {
    icon: <FaRegSmile />,
    hexColor: "#72e3a6",
  },
  {
    icon: <FaRegMeh />,
    hexColor: "#dff4c7",
  },
  {
    icon: <FaRegFrown />,
    hexColor: "#edbf98",
  },
  {
    icon: <FaRegSadTear />,
    hexColor: "#ea3d36",
  },
];

const months: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "Octomber",
  "November",
  "December",
];

type Month = {
  displayName: string;
  days: number[];
};

type DayInformation = {
  month: number;
  day: number;
  mood: number;
};

function App() {
  const [selectedMood, setSelectedMood] = useState<number>();
  const [currentYear, setCurrentYear] = useState<number>();
  const [currentMonths, setCurrentMonths] = useState<Month[]>([]);
  const [trackedMoods, setTrackedMoods] = useState<DayInformation[]>([]);

  // https://stackoverflow.com/questions/13146418/find-all-the-days-in-a-month-with-date-object
  const getDaysInMonth = (monthIndex: number, year: number) => {
    let date = new Date(year, monthIndex, 1);
    const days: Date[] = [];
    while (date.getMonth() === monthIndex) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  useEffect(() => {
    // https://stackoverflow.com/questions/52069833/how-to-get-the-current-year-using-typescript-in-angular6
    const year = new Date().getFullYear();
    setCurrentYear(year);

    const loadedMonths: Month[] = [];
    months.forEach((month, monthIndex) => {
      const days: number[] = [];
      const amountOfDays = getDaysInMonth(monthIndex, year).length;
      for (let index = 0; index < amountOfDays; index++) {
        days.push(index + 1);
      }
      loadedMonths.push({
        days: days,
        displayName: month,
      });
    });
    setCurrentMonths(loadedMonths);
  }, []);

  return (
    <>
      <div className="main-container">
        <h1>Mood Calender for {currentYear}</h1>
        <div className="mood-container">
          {Object.values(moods).map((mood, index) => (
            <button
              style={
                index == selectedMood
                  ? {
                      backgroundColor: mood.hexColor,
                    }
                  : undefined
              }
            >
              <i
                children={mood.icon}
                className="mood-icon"
                style={
                  index == selectedMood
                    ? {
                        color: "white",
                      }
                    : {
                        color: mood.hexColor,
                      }
                }
                onClick={() => {
                  setSelectedMood(index == selectedMood ? undefined : index);
                }}
              />
            </button>
          ))}
        </div>
        <div className="year-container">
          {currentMonths.map((month, monthIndex) => {
            return (
              <>
                <div className="month-container">
                  <h1>{month.displayName}</h1>
                  {month.days.map((day) => {
                    const trackedMood = trackedMoods.find(
                      (element) =>
                        element.day == day && element.month == monthIndex
                    );

                    return (
                      <button
                        className="day-container"
                        onClick={() => {
                          if (selectedMood) {
                            setTrackedMoods([
                              ...trackedMoods.filter(
                                (element) =>
                                  element.month != monthIndex ||
                                  element.day != day
                              ),
                              {
                                day: day,
                                month: monthIndex,
                                mood: selectedMood,
                              },
                            ]);
                          } else {
                            setTrackedMoods(
                              trackedMoods.filter(
                                (element) =>
                                  element.month != monthIndex ||
                                  element.day != day
                              )
                            );
                          }
                        }}
                        style={
                          trackedMood
                            ? {
                                background: moods[trackedMood.mood].hexColor,
                              }
                            : undefined
                        }
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
