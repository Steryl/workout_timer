import "App.css";
import Button from "components/Button";
import Clock from "components/Clock";
import { AppContext } from "AppProvider";
import { useContext, useEffect, useRef } from "react";
import { LABELS } from "Static";
import { toTime, formatTime } from "Functions";

// Returns the duration of all timers combined.
function TotalTime() {
  const { timers } = useContext(AppContext);
  let TotalDuration = 0;

  // If there are timers, add their durations.
  if (timers.length > 0) {
    timers.forEach((timer) => {
      TotalDuration = TotalDuration + timer.duration;
    });
  }

  const { h, m, s } = formatTime(toTime(TotalDuration));

  return (
    <div className="totaltime">
      {LABELS.totaltime}: {h}:{m}:{s}
    </div>
  );
}

// Returns a single timer element.
function Timer({ timer, id }) {
  const { removeTimer, status, onSelect } = useContext(AppContext);
  const { mode, duration } = timer;
  const { h, m, s } = formatTime(toTime(duration));

  // Process only one event at a time, because button overlays timer.
  const handleSelect = (e) => {
    if (e.target.name === "remove") {
      removeTimer(id);
    } else {
      onSelect(id);
    }
  };

  const active = id === status.timerIndex;

  return (
    <div className={`timer ${active}`} onClick={handleSelect}>
      <div className="timertitle">{LABELS.modes[mode]}</div>
      <button className="remove" name="remove">
        {LABELS.buttons.remove}
      </button>
      <br />
      <div className="duration">
        {LABELS.duration}: {h}:{m}:{s}
      </div>
    </div>
  );
}

// Get a list with timers.
function Timers() {
  const { timers, status } = useContext(AppContext);
  const { timerIndex } = status;
  const scrollRef = useRef();

  // The scrollbar centers the selected timer.
  useEffect(() => {
    const scrolltop = (timerIndex - 2) * 100 + 25;
    scrollRef.current.scrollTop = scrolltop;
  }, [timerIndex]);

  return (
    <div className="timers" ref={scrollRef}>
      {timers.map((timer, i) => (
        <Timer key={i} timer={timer} id={i} />
      ))}
    </div>
  );
}

// Render the elements of the left side of the home page.
function Overview() {
  const { timers, clearTimers } = useContext(AppContext);
  const { buttons } = LABELS;
  const clearActive = timers.length > 0;

  return (
    <div className="overview">
      <TotalTime />
      <Timers />
      <div className="flex">
        <Button onClick={clearTimers} active={clearActive}>
          {buttons.clear}
        </Button>
        <Button link="/add">{buttons.addtimer}</Button>
      </div>
    </div>
  );
}

// Renders the home page.
function Home() {
  return (
    <div className="page">
      <div className="side">
        <Overview />
      </div>
      <div className="side vertical-center">
        <Clock />
      </div>
    </div>
  );
}

export default Home;
