import { useContext, useEffect, useState, createContext } from "react";
import Router, { useRouter } from "next/router";

const SideNavbarContext = createContext({});

export const SideNavBarProvider = ({ children }) => {
  const [isNavOpen, setNavOpenState] = useState(false);

  // useEffect(() => {
  //   console.log(`Outeside ==>`, isNavOpen)
  //   Router.events.on("routeChangeStart", () => {
  //     console.log(`Diing change ==?`, isNavOpen)
  //     if (isNavOpen) {
  //       setNavOpenState(false);
  //     }
  //   });
  // }, []);
  // useEffect(() => {
  //   console.log(`isNavOpen -->`, isNavOpen);
  // }, [isNavOpen]);

  useEffect(() => {
    const body = document.querySelector("body");
    const sideNav = document.querySelector("#side-nav");
    if (isNavOpen) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }
  }, [isNavOpen]);

  return (
    <SideNavbarContext.Provider value={{ isNavOpen, setNavOpenState }}>
      {children}
    </SideNavbarContext.Provider>
  );
};

export const useSideMenu = () => useContext(SideNavbarContext);
