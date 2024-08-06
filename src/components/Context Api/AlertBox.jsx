import React, { createContext, useContext, useState, useCallback } from 'react';
import AlertBox from '../AlertBox';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alertBox, setAlertBox] = useState({
    open: false,
    error: false,
    msg: ''
  });

  const showAlert = useCallback((msg, error = false, autoHideDuration= 3000) => {
    setAlertBox({ open: true, msg, error });

    if (autoHideDuration > 0) {
      setTimeout(() => {
        setAlertBox(prev => ({ ...prev, open: false }));
      }, autoHideDuration);
    }
  }, []);

  const handleClose = () => {
    setAlertBox(prev => ({ ...prev, open: false }));
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <AlertBox
        open={alertBox.open}
        error={alertBox.error}
        msg={alertBox.msg}
        handleClose={handleClose}
      />
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
