const BACKEND_ADDR = 'http://localhost:8080'
const COMMON_BOARDS = ['study', 'hobby', 'circle', 'activity', 'startup', 'competition'];
const EVENT_BOARDS = ['study_event', 'hobby_event', 'circle_event', 'activity_event', 'startup_event', 'competition_event'];
const ALL_BOARDS = COMMON_BOARDS.concat(EVENT_BOARDS);
const NO_THREAD_IMAGE_ADDRESS = "https://images.unsplash.com/photo-1613076321656-23dcdd3aea92?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80";

export {
  BACKEND_ADDR,
  COMMON_BOARDS,
  EVENT_BOARDS,
  ALL_BOARDS,
  NO_THREAD_IMAGE_ADDRESS
};
