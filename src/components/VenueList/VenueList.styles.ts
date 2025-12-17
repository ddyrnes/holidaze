import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.wide}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const EmptyState = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: ${({ theme }) => theme.spacing["3xl"]};
  color: ${({ theme }) => theme.colors.status.disabled};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
`;

export const SkeletonCard = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.borderRadius.card};
  overflow: hidden;
`;

export const SkeletonContent = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

