import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

interface SpinnerProps {
  $size?: "sm" | "md" | "lg";
  $color?: string;
}

const sizes = {
  sm: "16px",
  md: "24px",
  lg: "40px",
};

const borderWidths = {
  sm: "2px",
  md: "3px",
  lg: "4px",
};

const Spinner = styled.div<SpinnerProps>`
  width: ${({ $size = "md" }) => sizes[$size]};
  height: ${({ $size = "md" }) => sizes[$size]};
  border: ${({ $size = "md" }) => borderWidths[$size]} solid
    ${({ theme }) => theme.colors.background};
  border-top-color: ${({ $color, theme }) =>
    $color || theme.colors.brand.primary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  animation: ${spin} 0.8s linear infinite;
`;

export const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl};
`;

export default Spinner;





