"use client";
import { useEffect, useState } from "react";

export const useIsDeployed: () => boolean = () => {
  const [isDeployed, setIsDeployed] = useState<boolean>(false);
  useEffect(() => {
    setIsDeployed(window.location.origin === "https://jonnity.com");
  }, []);
  return isDeployed;
};
