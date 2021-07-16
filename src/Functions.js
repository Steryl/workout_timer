// Turns 1:1:1 into 1:01:01
function FormatTime({ h, m, s }) {
  const format = (number) => {
    return (number < 10 ? "0" : "") + number;
  };

  return { h, m: format(m), s: format(s) };
}

// TODO change functionnames to camelcase.
// Changes seconds to time format.
function ToTime(seconds = 0) {
  const s = Math.floor(seconds % 60);
  const m = Math.floor((seconds / 60) % 60);
  const h = Math.floor(seconds / 3600);

  return { h, m, s };
}

// Takes time-object and returns total seconds.
const ToSeconds = ({ h, m, s }) => {
  return h * 3600 + m * 60 + s;
};

// Add the time objects to each other.
const AddTimes = (first, second) => {
  const a = ToSeconds(first);
  const b = ToSeconds(second);
  return ToTime(a + b);
};

// Returns the duration of the current input in seconds.
const GetDuration = (input) => {
  const totalTime = AddTimes(input.worktime, input.endtime);
  const duration = input.rounds * ToSeconds(totalTime);
  return duration;
};

// Returns true when the time and seconds are the same.
const compareTime = (time, elapsed) => {
  return ToSeconds(time) === elapsed;
};

// When the timer should be finished call the right callback.
const GetFinish = ({ timers, elapsed, status, callbacks }) => {
  const { endRound, endWork, endTimer, endAll } = callbacks;

  const timerCount = timers.length;

  // Get the limits of the current timer.
  const timer = timers[status.timerIndex];
  const { mode, endtime, worktime, rounds } = timer;

  // Compare the timelimit to the current time.
  const endTimeFinished = compareTime(endtime, elapsed);
  const workFinished = compareTime(worktime, elapsed);

  // True when tabata is in work mode.
  const work = mode === "tabata" && status.work;

  // Set limit to true when conditions have been met.
  const workLimit = workFinished && work;
  const roundLimit = endTimeFinished && !work;
  const timerLimit = roundLimit && status.round === rounds;
  const allLimit = timerLimit && status.timerIndex === timerCount - 1;

  // Execute callbacks, order matters here.
  if (workLimit) {
    endWork();
  } else if (allLimit) {
    endAll();
  } else if (timerLimit) {
    endTimer();
  } else if (roundLimit) {
    endRound();
  }
};

export { ToTime, ToSeconds, GetDuration, GetFinish, FormatTime };
