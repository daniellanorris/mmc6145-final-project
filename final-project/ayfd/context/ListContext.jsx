import React, { createContext, useContext, useState } from 'react';

const ListContext = createContext();

export const useListContext = () => {
  return useContext(ListContext);
};

export const ListProvider = ({ children }) => {
  const [list, setList] = useState([]);

  return (
    <ListContext.Provider value={{ list, setList }}>
      {children}
    </ListContext.Provider>
  );
};