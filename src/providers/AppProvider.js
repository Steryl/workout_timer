/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";
import { GetFinish } from "Functions";

const AppContextClass = React.createContext({});

const DEFAULTSTATUS = {
  finished: false,
  running: false,
  timerIndex: 0,
  round: 1,
  work: true,
};

// Provides context to both 'home' and 'add' page.
const AppProvider = ({ children }) => {
  const [elapsed, setElapsed] = useState(0);
  const [timers, setTimers] = useState([]);
  const [, setClock] = useState();
  const [status, setStatus] = useState(DEFAULTSTATUS);

  // TIMER FUNCTIONS
  const pushToTimers = ({ mode, input }) => {
    setTimers((prev) => [...prev, { mode, input }]);
  };

  const clearTimers = () => {
    setTimers([]);
    resetAll();
  };

  const removeTimer = (id) => {
    const { timerIndex } = status;
    reset();

    // Select previous timer if the selected one is the last one.
    if (timers.length - 1 === timerIndex) {
      updateStatus({ timerIndex: timerIndex - 1 });
    }

    const temp = [...timers];
    temp.splice(id, 1);
    setTimers(temp);
  };

  // MERGE FUNCTIONS
  const updateStatus = (objects) =>
    setStatus((prev) => ({ ...prev, ...objects }));

  // ACTION FUNCTIONS
  const run = () => {
    if (status.finished) {
      resetStatus();
    }

    const interval = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);

    updateStatus({ running: true });
    setClock(interval);
  };

  const pause = () => {
    setClock((c) => {
      clearInterval(c);
    });
    updateStatus({ running: false });
  };

  // RESET FUNCTIONS
  const resetElapsed = () => {
    setElapsed(0);
  };

  const resetStatus = () => {
    updateStatus(DEFAULTSTATUS);
  };

  // TimerIndex will not be reset.
  const reset = () => {
    pause();
    resetElapsed();
    updateStatus({ round: 1, work: true, finished: false });
  };

  const resetAll = () => {
    reset();
    resetStatus();
  };

  // CHECK FUNCTIONS
  useEffect(() => {
    checkFinish();
  }, [elapsed]);

  useEffect(() => {
    timers.length < 1 && resetAll();
  }, [timers]);

  const checkFinish = () => {
    const callbacks = { endRound, endWork, endTimer, endAll };

    if (timers.length > 0) {
      GetFinish({ timers, elapsed, status, callbacks });
    }
  };

  // LIMIT CALLBACKS
  const endRound = () => {
    resetElapsed();
    updateStatus({ round: status.round + 1, work: true });
  };

  const endWork = () => {
    resetElapsed();
    updateStatus({ work: false });
  };

  const endTimer = () => {
    resetElapsed();
    updateStatus({
      timerIndex: status.timerIndex + 1,
      round: 1,
      work: true,
    });
  };

  const endAll = () => {
    pause();
    updateStatus({ finished: true });
  };

  // BUTTON ACTIONS
  const onPlay = () => {
    status.running ? pause() : run();
  };

  const onSelect = (id) => {
    pause();
    reset();
    updateStatus({ timerIndex: id });
  };

  return (
    <AppContextClass.Provider
      value={{
        elapsed,
        status,
        timers,
        pushToTimers,
        clearTimers,
        removeTimer,
        onPlay,
        onReset: reset,
        onResetAll: resetAll,
        onSelect,
      }}
    >
      {children}
    </AppContextClass.Provider>
  );
};

export { AppContextClass as AppContext };

export default AppProvider;
