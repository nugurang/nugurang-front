const BACKEND_ADDR = 'http://localhost:8080'
const COMMON_BOARDS = ['study', 'hobby', 'circle', 'activity', 'startup', 'competition'];
const EVENT_BOARDS = ['study_event', 'hobby_event', 'circle_event', 'activity_event', 'startup_event', 'competition_event'];
const ALL_BOARDS = COMMON_BOARDS.concat(EVENT_BOARDS);
const NO_THREAD_IMAGE_ADDRESS = "https://cdn.pixabay.com/photo/2015/04/20/13/45/wool-731515_960_720.jpg";

export {
  BACKEND_ADDR,
  COMMON_BOARDS,
  EVENT_BOARDS,
  ALL_BOARDS,
  NO_THREAD_IMAGE_ADDRESS
};
