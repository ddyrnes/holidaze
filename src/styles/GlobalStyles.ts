import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: ${({ theme }) => theme.typography.fontFamily.body};
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
    line-height: ${({ theme }) => theme.typography.lineHeight.normal};
    color: ${({ theme }) => theme.colors.text};
    background-color: ${({ theme }) => theme.colors.background};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.typography.fontFamily.heading};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    line-height: ${({ theme }) => theme.typography.lineHeight.tight};
    color: ${({ theme }) => theme.colors.text};
  }

  h1 {
    font-size: ${({ theme }) => theme.typography.fontSize["5xl"]};
  }

  h2 {
    font-size: ${({ theme }) => theme.typography.fontSize["4xl"]};
  }

  h3 {
    font-size: ${({ theme }) => theme.typography.fontSize["3xl"]};
  }

  h4 {
    font-size: ${({ theme }) => theme.typography.fontSize["2xl"]};
  }

  h5 {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
  }

  h6 {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
  }

  a {
    color: ${({ theme }) => theme.colors.brand.primary};
    text-decoration: underline;
    transition: color ${({ theme }) => theme.transitions.fast};

    &:hover {
      color: ${({ theme }) => theme.colors.brand.hover};
      text-decoration: none;
    }

    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.colors.brand.primary};
      outline-offset: 2px;
      border-radius: 2px;
    }
  }

  button {
    font-family: ${({ theme }) => theme.typography.fontFamily.body};
    cursor: pointer;
    border: none;
    background: none;
    
    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.colors.brand.primary};
      outline-offset: 2px;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  input, textarea, select {
    font-family: ${({ theme }) => theme.typography.fontFamily.body};
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    color: ${({ theme }) => theme.colors.text};
    
    &:focus {
      outline: none;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  ul, ol {
    list-style: none;
  }
`;
