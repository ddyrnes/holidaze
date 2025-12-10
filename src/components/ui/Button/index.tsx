import styled, { css } from "styled-components";

type ButtonVariant = "primary" | "secondary" | "danger";

interface ButtonProps {
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  border-radius: ${({ theme }) => theme.borderRadius.button};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: none;
    box-shadow: ${({ theme }) => theme.shadows.focus};
  }

  ${({ variant = "primary", theme }) => {
    switch (variant) {
      case "secondary":
        return css`
          background: transparent;
          color: ${theme.colors.brand.primary};
          border: 1px solid ${theme.colors.brand.primary};

          &:hover:not(:disabled) {
            background: ${theme.colors.brand.primary};
            color: ${theme.colors.white};
          }
        `;
      case "danger":
        return css`
          background: ${theme.colors.status.error};
          color: ${theme.colors.white};
          border: none;

          &:hover:not(:disabled) {
            background: ${theme.colors.status.errorHover};
          }
        `;
      default:
        return css`
          background: ${theme.colors.button.primary};
          color: ${theme.colors.white};
          border: none;

          &:hover:not(:disabled) {
            background: ${theme.colors.button.hover};
          }
        `;
    }
  }}
`;

export default Button;

