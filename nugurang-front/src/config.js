const BACKEND_ADDR = 'http://localhost:8080'
const COMMON_BOARDS = ['study', 'hobby', 'circle', 'activity', 'startup', 'competition'];
const EVENT_BOARDS = ['study_event', 'hobby_event', 'circle_event', 'activity_event', 'startup_event', 'competition_event'];
const ALL_BOARDS = COMMON_BOARDS.concat(EVENT_BOARDS);

export {
  BACKEND_ADDR,
  COMMON_BOARDS,
  EVENT_BOARDS,
  ALL_BOARDS
};
