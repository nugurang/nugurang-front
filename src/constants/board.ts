import { PlainObject } from "./common";

const BOARD_NAME_I18N_KEY: PlainObject = {
  study_group: 'boards.study_group',
  learned_society: 'boards.learned_society',
  club: 'boards.club',
  indie_band: 'boards.indie_band',
  startup: 'boards.startup',
  study_group_event: 'boards.study_group',
  learned_society_event: 'boards.learned_society',
  club_event: 'boards.club',
  indie_band_event: 'boards.indie_band',
  startup_event: 'boards.startup',
};
export const getBoardNameI18nKey = (name: string) => {
  return BOARD_NAME_I18N_KEY[name] ?? name;
};
