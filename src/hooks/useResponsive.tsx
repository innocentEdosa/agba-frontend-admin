import { ResponsiveContext } from "@/contexts/responsive";
import { useContext } from "react";

const useResponsive = () => {
  const responsiveContext = useContext(ResponsiveContext);
  return responsiveContext;
};

export default useResponsive;
