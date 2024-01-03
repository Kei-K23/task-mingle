import React from "react";

const ListWrapper = ({ children }: { children: React.ReactNode }) => {
  return <li className="shrink-0 h-full select-none w-[250px]">{children}</li>;
};

export default ListWrapper;
