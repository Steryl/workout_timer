/* eslint-disable react-hooks/exhaustive-deps */

import { AppContext } from "AppProvider";
import { useContext, useEffect } from "react";
import { ToTime, FormatTime, ToSeconds } from "Functions.js";
import Button from "components/Button";
import "App.css";
import { LABELS, GetMessage } from "Static";

// Renders status message under the title.
function Message() {
  const { timers, status, elapsed } = useContext(AppContext);
  const present = timers.length > 0;
  const { timerIndex } = status;
  const timer = present ? timers[timerIndex] : {};
  const atStart = elapsed === 0 && status.running === false;

  let message = "";

  // Get the right message for the current phase.
  if (!present) {
    message = "";
  } else if (present && atStart) {
    message = GetMessage({ timer, status, phase: "atstart" })[timer.mode];
  } else if (present && status.finished) {
    message = GetMessage({ timer, status, phase: "finished" });
  } else if (present) {
    message = GetMessage({ timer, status, phase: "running" })[timer.mode];
  }

  return <div className="messages">{message}</div>;
}

// Renders the running clock display.
function Display() {
  const { elapsed, timers, status, onResetAll } = useContext(AppContext);
  const present = timers.length > 0;
  let time = ToTime(0);

  // Return time togo instead of elapsed time.
  const down = (endtime) => {
    const togo = ToSeconds(endtime) - elapsed;
    return ToTime(togo);
  };

  // Get the right direction of time.
  if (present) {
    const timer = timers[status.timerIndex];
    const { endtime, worktime, countup } = timer;
    if (countup) {
      time = ToTime(elapsed);
    } else {
      if (timer.mode === "tabata") {
        time = status.work ? worktime : endtime;
        time = down(time);
      } else {
        time = down(endtime);
      }
    }
  }

  // Component unmount when you go to add page, reset to clear interval.
  useEffect(() => {
    return () => onResetAll();
  }, []);

  const style = `clock ${status.running && "running"} ${
    status.finished && "finished"
  }`;

  const { h, m, s } = FormatTime(time);

  return (
    <div className="rightside">
      <div className={style}>
        {h}:{m}:{s}
      </div>
    </div>
  );
}

// Renders control buttons: play, reset, reset all.
function Control() {
  const {
    onPlay,
    onReset,
    onResetAll,
    status: { running, timerIndex, finished },
    timers,
    elapsed,
  } = useContext(AppContext);

  // Controls are only active when timers are present.
  const timersPresent = timers.length > 0;

  // True when at the start of all timers.
  const atStart = timerIndex === 0 && elapsed === 0;

  // Play button is active before finish and when timers are present.
  const playActive = !finished && timersPresent;

  // Reset is not active at the start of each timer and when no timers are present.
  const resetActive = !atStart && elapsed !== 0 && timersPresent;

  // Reset all is not active at the very start or when no timers are present.
  const resetAllActive = timersPresent && !atStart;

  return (
    <div className="flex">
      <Button onClick={onPlay} active={playActive}>
        {running ? "Pause" : "Play"}
      </Button>
      <Button onClick={onReset} active={resetActive}>
        Reset
      </Button>
      <Button onClick={onResetAll} active={resetAllActive}>
        Reset all
      </Button>
    </div>
  );
}

// Renders the right side of the home page.
function Clock() {
  const { timers, status } = useContext(AppContext);
  const present = timers.length > 0;
  let mode = "stopwatch";
  let title = "";

  // Select right title.
  if (present) {
    mode = present && timers[status.timerIndex].mode;
    title = present && LABELS.modes[mode];
  }

  return (
    <div>
      <div className="title">{title}</div>
      <br />
      <Display />
      <Message />
      <Control />
    </div>
  );
}

export default Clock;
