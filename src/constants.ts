export const COMMON_BOARD_NAMES = ['study', 'hobby', 'circle', 'activity', 'startup', 'competition'];
export const EVENT_BOARD_NAMES = ['study_event', 'hobby_event', 'circle_event', 'activity_event', 'startup_event', 'competition_event'];
export const OAUTH_PROVIDERS = [
  {
    name: 'github',
    icon: {
      type: 'fontAwesomeIcon' as IconTypeKeys,
      src: ['fab', 'github']
    },
  },
  {
    name: 'google',
    icon: {
      type: 'fontAwesomeIcon' as IconTypeKeys,
      src: ['fab', 'google']
    },
  },
];
export const DEFAULT_TOOLBAR_SHORTCUT_ITEMS = [
  {
    pathname: '/home',
    icon: {
      type: 'fontAwesomeIcon' as IconTypeKeys,
      src: ['fas', 'home']
    },
    label: 'home',
  },
  {
    pathname: '/boards',
    icon: {
      type: 'fontAwesomeIcon' as IconTypeKeys,
      src: ['fas', 'book-reader']
    },
    label: 'boards',
  },
  {
    pathname: '/teams',
    icon: {
      type: 'fontAwesomeIcon' as IconTypeKeys,
      src: ['fas', 'users']
    },
    label: 'teams',
  },
  {
    pathname: '/mypage',
    icon: {
      type: 'fontAwesomeIcon' as IconTypeKeys,
      src: ['fas', 'user']
    },
    label: 'myPage',
  }
];
