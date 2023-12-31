"use client";
import { useEffect, useState } from "react";

const usePreventHydration = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
};

export default usePreventHydration;
