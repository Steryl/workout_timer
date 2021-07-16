import { formatTime } from "Functions";
import TimeInput from "components/TimeInput";
import Rounds from "components/Rounds";

// Modes without rounds need 'rounds' to be 1.
const DEFAULTINPUT = {
  mode: "stopwatch",
  endtime: { h: 0, m: 0, s: 0 },
  worktime: { h: 0, m: 0, s: 0 },
  rounds: 1,
  duration: 0,
  countup: true,
};

// Choose the maximum values for these inputs.
// Minutes and seconds are 59 by default.
const MAXINPUT = {
  hours: 99,
  rounds: 99,
};

// Individual settings of each mode.
const MODES = {
  stopwatch: { inputs: ["endtime"], countup: true },
  countdown: { inputs: ["endtime"], countup: false },
  xy: { inputs: ["rounds", "endtime"], countup: false },
  tabata: { inputs: ["rounds", "worktime", "endtime"], countup: false },
};

const INPUTS = {
  endtime: <TimeInput />,
  worktime: <TimeInput setting="worktime" />,
  rounds: <Rounds />,
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
  const { worktime, endtime, rounds } = timer;
  const { round, work } = status;

  const { endtime: endTimeLabel, worktime: workTimeLabel } =
    LABELS.settings[mode];

  // Return a string with formatted time.
  const getTime = (setting) => {
    const { h, m, s } = formatTime(setting);
    return `${h}:${m}:${s}`;
  };

  const style = (string) => {
    return <div className="line">{string}</div>;
  };

  // TODO create .format style, and put in message object.
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

export { MODES, INPUTS, MAXINPUT, LABELS, DEFAULTINPUT, GetMessage };
