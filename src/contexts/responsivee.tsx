import { createContext } from "react";
import { useMediaQuery } from "react-responsive";

export const ResponsiveContext = createContext<Record<string, boolean>>({});

const ResponsiveContextWrapper = ({
  children,
}: {
  children: JSX.Element | JSX.Element[] | React.ReactNode;
}) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  const isNotMobile = useMediaQuery({ minWidth: 768 });
  const isNotTablet = useMediaQuery({ minWidth: 1024 });

  const isMobileOrTablet = useMediaQuery({ maxWidth: 1023 });

  const value: Record<string, boolean> = {
    isNotTablet,
    isNotMobile,

    isMobile,
    isTablet,
    isDesktop,

    isMobileOrTablet,
  };

  return (
    <ResponsiveContext.Provider value={value}>
      {children}
    </ResponsiveContext.Provider>
  );
};

export default ResponsiveContextWrapper;
