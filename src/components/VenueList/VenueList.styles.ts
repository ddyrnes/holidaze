import styled, { keyframes } from "styled-components";

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

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

export const SkeletonCard = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.borderRadius.card};
  overflow: hidden;
`;

export const SkeletonImage = styled.div`
  width: 100%;
  padding-top: 66.67%;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.background} 0px,
    #e2e8f0 50px,
    ${({ theme }) => theme.colors.background} 100px
  );
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite linear;
`;

export const SkeletonContent = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

export const SkeletonLine = styled.div<{ $width?: string; $height?: string }>`
  width: ${({ $width }) => $width || "100%"};
  height: ${({ $height }) => $height || "16px"};
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.background} 0px,
    #e2e8f0 50px,
    ${({ theme }) => theme.colors.background} 100px
  );
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite linear;
  border-radius: 4px;
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  &:last-child {
    margin-bottom: 0;
  }
`;

