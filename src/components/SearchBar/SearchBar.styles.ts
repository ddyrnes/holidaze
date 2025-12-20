import styled, { keyframes } from "styled-components";

export const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  max-width: 480px;
  margin: 0 auto;
`;

export const SearchIcon = styled.svg`
  position: absolute;
  left: ${({ theme }) => theme.spacing.md};
  width: 20px;
  height: 20px;
  color: ${({ theme }) => theme.colors.status.disabled};
  pointer-events: none;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  padding-left: ${({ theme }) => theme.spacing["2xl"]};
  padding-right: ${({ theme }) => theme.spacing["2xl"]};
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  box-shadow: ${({ theme }) => theme.shadows.card};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:focus {
    outline: none;
    box-shadow: ${({ theme }) => theme.shadows.focus};
    border-color: ${({ theme }) => theme.colors.brand.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.status.disabled};
  }
`;

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const LoadingSpinner = styled.div`
  position: absolute;
  right: ${({ theme }) => theme.spacing.md};
  width: 18px;
  height: 18px;
  border: 2px solid ${({ theme }) => theme.colors.background};
  border-top-color: ${({ theme }) => theme.colors.brand.primary};
  border-radius: 50%;
  animation: ${spin} 0.6s linear infinite;
`;

export const ClearButton = styled.button`
  position: absolute;
  right: ${({ theme }) => theme.spacing.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background ${({ theme }) => theme.transitions.fast};

  svg {
    width: 16px;
    height: 16px;
    color: ${({ theme }) => theme.colors.status.disabled};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.background};

    svg {
      color: ${({ theme }) => theme.colors.text};
    }
  }
`;
