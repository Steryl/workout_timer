// Turns 1:1:1 into 1:01:01
function formatTime({ h, m, s }) {
  const format = (number) => {
    return (number < 10 ? "0" : "") + number;
  };

  return { h, m: format(m), s: format(s) };
}

// TODO change functionnames to camelcase.
// Changes seconds to time format.
function toTime(seconds = 0) {
  const s = Math.floor(seconds % 60);
  const m = Math.floor((seconds / 60) % 60);
  const h = Math.floor(seconds / 3600);

  return { h, m, s };
}

// Takes time-object and returns total seconds.
const toSeconds = ({ h, m, s }) => {
  return h * 3600 + m * 60 + s;
};

// Add the time objects to each other.
const addTimes = (first, second) => {
  const a = toSeconds(first);
  const b = toSeconds(second);
  return toTime(a + b);
};

// Returns the duration of the current input in seconds.
const getDuration = (input) => {
  const totalTime = addTimes(input.worktime, input.endtime);
  const duration = input.rounds * toSeconds(totalTime);
  return duration;
};

// Replaces NaN with the default, either in time-object or rounds.
const replaceNaN = (input, defaults) => {
  // This method is used for either rounds or units of time.
  const replace = (unit, replacement) => {
    return isNaN(unit) ? replacement : unit;
  };

  // When the input is a time object then we check to replace each unit.
  const replaceTime = (time, defaultTime) => {
    const newTime = { ...time };
    for (const unit in time) {
      newTime[unit] = replace(time[unit], defaultTime[unit]);
    }
    return newTime;
  };

  // Select method to use, rounds would be int, time an object.
  let method = typeof input === "object" ? replaceTime : replace;

  return method(input, defaults);
};

// Returns true when the time and seconds are the same.
const compareTime = (time, elapsed) => {
  return toSeconds(time) === elapsed;
};

// When the timer should be finished call the right callback.
const getFinish = ({ timers, elapsed, status, callbacks }) => {
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

export { toTime, toSeconds, getDuration, replaceNaN, getFinish, formatTime };
