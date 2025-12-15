import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 200px);
  padding: ${({ theme }) => theme.spacing.xl};
`;

export const FormCard = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.borderRadius.card};
  box-shadow: ${({ theme }) => theme.shadows.card};
  padding: ${({ theme }) => theme.spacing["2xl"]};
  width: 100%;
  max-width: 420px;
`;

export const Title = styled.h1`
  font-family: ${({ theme }) => theme.typography.fontFamily.heading};
  font-size: ${({ theme }) => theme.typography.fontSize["2xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const CheckboxWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.sm} 0;
`;

export const Footer = styled.p`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.lg};
  font-family: ${({ theme }) => theme.typography.fontFamily.body};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text};

  a {
    color: ${({ theme }) => theme.colors.brand.primary};
    text-decoration: none;
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

    &:hover {
      text-decoration: underline;
    }
  }
`;



