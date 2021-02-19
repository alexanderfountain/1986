import React, { useState } from "react";

export const myContext = React.createContext();

const Provider = (props) => {
  const saleDateInitial = Date.now() + 1133000;
  const [saleDate] = useState(saleDateInitial);

  return (
    <myContext.Provider
      value={{
        saleDate,
      }}
    >
      {props.children}
    </myContext.Provider>
  );
};

export default ({ element }) => <Provider>{element}</Provider>;
