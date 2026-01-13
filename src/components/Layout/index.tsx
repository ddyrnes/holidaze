import type { ReactNode } from "react";
import styled from "styled-components";
import Header from "../Header";
import Footer from "../Footer";

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Main = styled.main`
  flex: 1;
  padding: 0 ${({ theme }) => theme.spacing.xl};
`;

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <LayoutWrapper>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </LayoutWrapper>
  );
}

export default Layout;
