import styled from "styled-components";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.status.errorLight};
  border: 1px solid ${({ theme }) => theme.colors.status.error};
  border-radius: ${({ theme }) => theme.borderRadius.card};
  text-align: center;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.status.error};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const RetryButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.status.error};
  color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.button};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: background-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.status.errorHover};
  }
`;

function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <Container role="alert">
      <Text>{message}</Text>
      {onRetry && <RetryButton onClick={onRetry}>Try Again</RetryButton>}
    </Container>
  );
}

export default ErrorMessage;
