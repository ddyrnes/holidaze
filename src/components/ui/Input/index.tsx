import styled from "styled-components";
import { forwardRef, type InputHTMLAttributes } from "react";

interface InputWrapperProps {
  $hasError?: boolean;
}

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const Label = styled.label`
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text};
`;

export const StyledInput = styled.input<InputWrapperProps>`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid
    ${({ theme, $hasError }) =>
      $hasError ? theme.colors.status.error : "transparent"};
  border-radius: ${({ theme }) => theme.borderRadius.button};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:focus {
    outline: none;
    box-shadow: ${({ theme }) => theme.shadows.focus};
    border-color: ${({ theme, $hasError }) =>
      $hasError ? theme.colors.status.error : theme.colors.brand.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.status.disabled};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ErrorText = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.status.error};
`;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, ...props }, ref) => {
    return (
      <InputWrapper>
        <Label htmlFor={id}>{label}</Label>
        <StyledInput id={id} $hasError={!!error} ref={ref} {...props} />
        {error && <ErrorText>{error}</ErrorText>}
      </InputWrapper>
    );
  }
);

Input.displayName = "Input";

export default Input;
