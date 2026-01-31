import styled from "styled-components";

export const CalendarWrapper = styled.div`
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
`;

export const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const MonthYear = styled.h3`
  font-family: ${({ theme }) => theme.typography.fontFamily.heading};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

export const NavButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: none;
  border-radius: ${({ theme }) => theme.borderRadius.button};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: background ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.background};
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

export const WeekDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const WeekDay = styled.div`
  text-align: center;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.status.disabled};
  padding: ${({ theme }) => theme.spacing.xs} 0;
`;

export const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
`;

interface DayProps {
  $isToday?: boolean;
  $isSelected?: boolean;
  $isInRange?: boolean;
  $isDisabled?: boolean;
  $isOutsideMonth?: boolean;
}

export const Day = styled.button<DayProps>`
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.button};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  background: ${({ $isSelected, $isInRange, theme }) => {
    if ($isSelected) return theme.colors.brand.primary;
    if ($isInRange) return `${theme.colors.brand.primary}20`;
    return "transparent";
  }};
  
  color: ${({ $isSelected, $isDisabled, $isOutsideMonth, theme }) => {
    if ($isSelected) return theme.colors.white;
    if ($isDisabled) return theme.colors.status.disabled;
    if ($isOutsideMonth) return theme.colors.status.disabled;
    return theme.colors.text;
  }};
  
  ${({ $isToday, $isSelected, theme }) =>
    $isToday && !$isSelected && `
      border: 2px solid ${theme.colors.brand.primary};
    `}
  
  ${({ $isDisabled }) =>
    $isDisabled && `
      cursor: not-allowed;
      text-decoration: line-through;
    `}
  
  &:hover:not(:disabled) {
    ${({ $isSelected, $isDisabled, theme }) =>
      !$isSelected && !$isDisabled && `
        background: ${theme.colors.background};
      `}
  }
  
  &:disabled {
    cursor: not-allowed;
  }
`;

export const SelectionInfo = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const DateRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text};
  
  span:first-child {
    color: ${({ theme }) => theme.colors.status.disabled};
  }
`;

