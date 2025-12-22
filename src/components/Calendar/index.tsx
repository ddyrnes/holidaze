import { useState, useMemo } from "react";
import {
  CalendarWrapper,
  CalendarHeader,
  MonthYear,
  NavButton,
  WeekDays,
  WeekDay,
  DaysGrid,
  Day,
  SelectionInfo,
  DateRow,
} from "./Calendar.styles";

interface CalendarProps {
  disabledDates?: Array<{ from: Date; to: Date }>;
  onDateSelect?: (checkIn: Date | null, checkOut: Date | null) => void;
  checkIn?: Date | null;
  checkOut?: Date | null;
}

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function Calendar({ disabledDates = [], onDateSelect, checkIn = null, checkOut = null }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days: Array<{ date: Date; isCurrentMonth: boolean }> = [];

    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDay - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthLastDay - i),
        isCurrentMonth: false,
      });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }

    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }

    return days;
  };

  const isDateDisabled = (date: Date) => {
    if (date < today) return true;

    return disabledDates.some(({ from, to }) => {
      const fromDate = new Date(from);
      const toDate = new Date(to);
      fromDate.setHours(0, 0, 0, 0);
      toDate.setHours(0, 0, 0, 0);
      return date >= fromDate && date <= toDate;
    });
  };

  const isSameDay = (d1: Date, d2: Date | null) => {
    if (!d2) return false;
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate();
  };

  const isInRange = (date: Date) => {
    if (!checkIn || !checkOut) return false;
    return date > checkIn && date < checkOut;
  };

  const handleDayClick = (date: Date) => {
    if (isDateDisabled(date)) return;

    if (!checkIn || (checkIn && checkOut)) {
      onDateSelect?.(date, null);
    } else {
      if (date < checkIn) {
        onDateSelect?.(date, null);
      } else {
        const hasBookingInRange = disabledDates.some(({ from, to }) => {
          const fromDate = new Date(from);
          const toDate = new Date(to);
          fromDate.setHours(0, 0, 0, 0);
          toDate.setHours(0, 0, 0, 0);
          return (fromDate > checkIn && fromDate < date) || (toDate > checkIn && toDate < date);
        });

        if (hasBookingInRange) {
          onDateSelect?.(date, null);
        } else {
          onDateSelect?.(checkIn, date);
        }
      }
    }
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const days = getDaysInMonth(currentMonth);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const isPrevDisabled = currentMonth.getFullYear() === today.getFullYear() &&
                         currentMonth.getMonth() <= today.getMonth();

  return (
    <CalendarWrapper>
      <CalendarHeader>
        <NavButton onClick={prevMonth} disabled={isPrevDisabled} aria-label="Previous month">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </NavButton>
        <MonthYear>{MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}</MonthYear>
        <NavButton onClick={nextMonth} aria-label="Next month">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </NavButton>
      </CalendarHeader>

      <WeekDays>
        {WEEKDAYS.map((day) => (
          <WeekDay key={day}>{day}</WeekDay>
        ))}
      </WeekDays>

      <DaysGrid>
        {days.map(({ date, isCurrentMonth }, index) => {
          const disabled = isDateDisabled(date);
          const selected = isSameDay(date, checkIn) || isSameDay(date, checkOut);
          const inRange = isInRange(date);
          const isToday = isSameDay(date, today);

          return (
            <Day
              key={index}
              onClick={() => handleDayClick(date)}
              $isToday={isToday}
              $isSelected={selected}
              $isInRange={inRange}
              $isDisabled={disabled}
              $isOutsideMonth={!isCurrentMonth}
              disabled={disabled}
              aria-label={formatDate(date)}
            >
              {date.getDate()}
            </Day>
          );
        })}
      </DaysGrid>

      {(checkIn || checkOut) && (
        <SelectionInfo>
          <DateRow>
            <span>Check-in</span>
            <span>{checkIn ? formatDate(checkIn) : "Select date"}</span>
          </DateRow>
          <DateRow>
            <span>Check-out</span>
            <span>{checkOut ? formatDate(checkOut) : "Select date"}</span>
          </DateRow>
        </SelectionInfo>
      )}
    </CalendarWrapper>
  );
}

export default Calendar;

