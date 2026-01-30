import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../components/ui";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 300px);
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
`;

const ErrorCode = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.heading};
  font-size: 8rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.brand.primary};
  line-height: 1;
  opacity: 0.2;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: 5rem;
  }
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.typography.fontFamily.heading};
  font-size: ${({ theme }) => theme.typography.fontSize["2xl"]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text};
  margin: ${({ theme }) => theme.spacing.md} 0;
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  color: ${({ theme }) => theme.colors.textLight};
  margin: 0 0 ${({ theme }) => theme.spacing.xl};
  max-width: 400px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
  justify-content: center;
`;

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Container>
      <ErrorCode>404</ErrorCode>
      <Title>Page not found</Title>
      <Description>
        The page you're looking for doesn't exist or has been moved.
      </Description>
      <ButtonGroup>
        <Button onClick={() => navigate("/")}>Go to Homepage</Button>
        <Button $variant="secondary" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </ButtonGroup>
    </Container>
  );
}

export default NotFoundPage;

