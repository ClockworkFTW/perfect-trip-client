import { useEffect, useState, useRef } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

import Header from "./Header";

const Layout = () => {
  const [headerHeight, setHeaderHeight] = useState(0);

  const headerRef = useRef(null);

  useEffect(() => {
    setHeaderHeight(headerRef.current.clientHeight + 1);
  }, []);

  return (
    <>
      <Header headerRef={headerRef} />
      <Main headerHeight={headerHeight}>
        <Outlet />
      </Main>
    </>
  );
};

const Main = styled.main`
  height: ${({ headerHeight }) => `calc(100vh - ${headerHeight}px)`};
`;

export default Layout;
