# Workout timer

Create a list of timers to setup your workout. You can select different modes for the timers and combine them.

- ## Stopwatch

  A timer that counts up to a specified endtime.

- ## Countdown

  A timer that counts down to zero from a specified time.

- ## Xy

  A timer that counts down to zero for a specified amount of rounds.

- ## Tabata
  A timer that has two phases per round for work and rest.

# Features

## Homepage

Timer list:

- Show timer and their duration in a list.
- Show a total duration of the workout.
- Add timers to the list.
- Select timers in the list.
- Remove timers in the list.
- Clear the list.

Current timer:

- Display current time. Starts at the maximum when counting down.
- When playing there is a blue dropshadow to the Display.
- When the workout is finished there is a green dropshadow to the Display.
- Display current status, this shows the details of the current timer at this time.

Control timer:

- Play or resume currently selected timer.
- Pause current timer. Only available when playing.
- Reset current timer. Only available when the current timer is not at the start.
- Reset all timers, this will go back to the start of the workout. Only available when the timers are not at the start of the workout.

## Add

- Select mode for your timer. Input will be reset when switching to another timer.
- Setup your timer with your input.
- Input in integers, only accepts a total duration higher as 0.
- Depending on mode select the amount of rounds.
- 'Cancel' when you don't want to add a timer.
- 'Set' when you do want to add a timer.

# Design

This is a singlepage app. The urls are set in router-dom.\
The whole app has access to AppContext. \
When you 'Set' a new time the current input will be added to the array of timers.\

# Acknowledgements

This project was started as a school project.

Final Assignment given by [prof-tejera](https://github.com/prof-tejera) for his class: Design Principles in React.
