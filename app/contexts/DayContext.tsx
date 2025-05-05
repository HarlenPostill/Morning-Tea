import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface DayData {
  day: number;
  startDate: Date;
  lastCheckedDate: Date;
}

interface DayContextType {
  currentDay: number;
  setCurrentDay: (day: number) => Promise<void>;
  isInitialized: boolean;
  getDayData: () => Promise<DayData | null>;
}

const DayContext = createContext<DayContextType | undefined>(undefined);

const DayProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentDay, setCurrentDayState] = useState<number>(1);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Initialize day system on app load
  useEffect(() => {
    const initializeDaySystem = async () => {
      try {
        const dayData = await AsyncStorage.getItem("Day");

        if (!dayData) {
          // First time setup - set today as day 1
          await setCurrentDay(1);
        } else {
          // Parse existing day data
          const [dayPart, datePart] = dayData.split(",");
          const dayNumber = parseInt(dayPart.replace("Day:", ""));
          const startDate = new Date(datePart);

          // Check if we need to increment the day
          const today = new Date();
          const currentTimestamp = today.getTime();
          const lastTimestamp = startDate.getTime();

          // Calculate days difference
          const daysDifference = Math.floor(
            (currentTimestamp - lastTimestamp) / (1000 * 60 * 60 * 24)
          );

          if (daysDifference > 0) {
            // Increment day by the difference
            const newDay = dayNumber + daysDifference;
            await setCurrentDay(newDay);
          } else {
            setCurrentDayState(dayNumber);
          }
        }

        setIsInitialized(true);
      } catch (error) {
        console.error("Error initializing day system:", error);
        // Fallback to day 1 if there's an error
        await setCurrentDay(1);
        setIsInitialized(true);
      }
    };

    initializeDaySystem();
  }, []);

  const setCurrentDay = async (day: number) => {
    try {
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString("en-GB"); // DD/MM/YYYY format
      const dayEntry = `Day:${day},${formattedDate}`;

      await AsyncStorage.setItem("Day", dayEntry);
      setCurrentDayState(day);
    } catch (error) {
      console.error("Error setting current day:", error);
    }
  };

  const getDayData = async (): Promise<DayData | null> => {
    try {
      const dayData = await AsyncStorage.getItem("Day");
      if (!dayData) return null;

      const [dayPart, datePart] = dayData.split(",");
      const day = parseInt(dayPart.replace("Day:", ""));
      const startDate = new Date(datePart);

      return {
        day,
        startDate,
        lastCheckedDate: new Date(),
      };
    } catch (error) {
      console.error("Error getting day data:", error);
      return null;
    }
  };

  return (
    <DayContext.Provider
      value={{
        currentDay,
        setCurrentDay,
        isInitialized,
        getDayData,
      }}
    >
      {children}
    </DayContext.Provider>
  );
};

export const useDayContext = () => {
  const context = useContext(DayContext);
  if (!context) {
    throw new Error("useDayContext must be used within a DayProvider");
  }
  return context;
};

export default DayProvider;
