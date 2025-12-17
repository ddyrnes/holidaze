import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

interface SkeletonBaseProps {
  $width?: string;
  $height?: string;
  $borderRadius?: string;
}

const SkeletonBase = styled.div<SkeletonBaseProps>`
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.background} 0px,
    ${({ theme }) => theme.colors.card} 50px,
    ${({ theme }) => theme.colors.background} 100px
  );
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite linear;
`;

export const SkeletonBox = styled(SkeletonBase)`
  width: ${({ $width }) => $width || "100%"};
  height: ${({ $height }) => $height || "100px"};
  border-radius: ${({ $borderRadius, theme }) =>
    $borderRadius || theme.borderRadius.button};
`;

export const SkeletonLine = styled(SkeletonBase)`
  width: ${({ $width }) => $width || "100%"};
  height: ${({ $height }) => $height || "16px"};
  border-radius: 4px;
`;

export const SkeletonCircle = styled(SkeletonBase)`
  width: ${({ $width }) => $width || "40px"};
  height: ${({ $height }) => $height || "40px"};
  border-radius: ${({ theme }) => theme.borderRadius.full};
`;

export const SkeletonImage = styled(SkeletonBase)`
  width: 100%;
  padding-top: ${({ $height }) => $height || "66.67%"};
  border-radius: ${({ $borderRadius }) => $borderRadius || "0"};
`;

export const SkeletonText = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

