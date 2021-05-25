import { TimeInput, Input } from "components/Inputs";
import { FormatTime } from "Functions";

// Select input components for each mode.
const MODES = {
  stopwatch: ["endtime"],
  countdown: ["endtime"],
  xy: ["rounds", "endtime"],
  tabata: ["rounds", "worktime", "endtime"],
};

const COUNTUP = {
  stopwatch: true,
  countdown: false,
  xy: false,
  tabata: false,
};

// Input rounds does not need unit.
const INPUTMODULES = {
  endtime: <TimeInput setting="endtime" />,
  worktime: <TimeInput setting="worktime" />,
  rounds: <Input setting="rounds" />,
};

// Labels that are displayed to the user.
const LABELS = {
  modes: {
    stopwatch: "Stopwatch",
    countdown: "Countdown",
    xy: "Xy",
    tabata: "Tabata",
  },
  settings: {
    stopwatch: { endtime: "Timecap" },
    countdown: { endtime: "Starttime" },
    xy: { endtime: "Time per round" },
    tabata: { worktime: "Worktime", endtime: "Resttime" },
  },
  titles: {
    addtimer: "Add timer",
  },
  buttons: {
    cancel: "Cancel",
    set: "Set",
    clear: "Clear",
    addtimer: "Add timer",
    play: "Play",
    reset: "Reset",
    resetall: "Reset all",
    remove: "X",
  },
  units: { h: "H", m: "M", s: "S", rounds: "Rounds" },
  duration: "Duration",
  totaltime: "Total time",
};

// Get dynamic status messages.
const GetMessage = ({ timer, status, phase }) => {
  const { mode } = timer;
  const { worktime, endtime } = timer.input;
  const { rounds } = timer.input.rounds;
  const { round, work } = status;

  const { endtime: endTimeLabel, worktime: workTimeLabel } =
    LABELS.settings[mode];

  // Return a string with formatted time.
  const getTime = (setting) => {
    const { h, m, s } = FormatTime(setting);
    return `${h}:${m}:${s}`;
  };

  const style = (string) => {
    return <div className="line">{string}</div>;
  };

  // Messages to display.
  const endtimeAtStart = style(`${endTimeLabel}: ${getTime(endtime)}`);
  const worktimeAtStart = style(`${workTimeLabel}: ${getTime(worktime)}`);
  const roundsAtStart = style(`${rounds} rounds`);
  const roundsRunning = style(`On round ${round} of ${rounds}`);
  const workRunning = work ? style(workTimeLabel) : style(endTimeLabel);
  const finished = style("Finished");
  const empty = style("");

  // Select which message's to return depending on position.
  const message = {
    atstart: {
      stopwatch: endtimeAtStart,
      countdown: empty,
      xy: roundsAtStart,
      tabata: (
        <>
          {roundsAtStart} <br />
          {worktimeAtStart} <br />
          {endtimeAtStart}
        </>
      ),
    },
    running: {
      stopwatch: endtimeAtStart,
      countdown: empty,
      xy: roundsRunning,
      tabata: (
        <>
          {roundsRunning} <br /> {workRunning}
        </>
      ),
    },
    finished: finished,
  };

  return message[phase];
};

export { MODES, INPUTMODULES, LABELS, COUNTUP, GetMessage };
