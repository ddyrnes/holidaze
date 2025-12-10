import styled from "styled-components";
import { forwardRef, type InputHTMLAttributes } from "react";

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const StyledCheckbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: ${({ theme }) => theme.colors.brand.primary};

  &:focus-visible {
    outline: none;
    box-shadow: ${({ theme }) => theme.shadows.focus};
  }
`;

const CheckboxLabel = styled.label`
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
`;

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, id, ...props }, ref) => {
    return (
      <CheckboxWrapper>
        <StyledCheckbox type="checkbox" id={id} ref={ref} {...props} />
        <CheckboxLabel htmlFor={id}>{label}</CheckboxLabel>
      </CheckboxWrapper>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
