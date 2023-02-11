import { PlainObject } from "./common";

const BOARD_NAME_I18N_KEY: PlainObject = {
  study_group: 'study_group',
  learned_society: 'learned_society',
  club: 'club',
  indie_band: 'indie_band',
  startup: 'startup',
  study_group_event: 'study_group',
  learned_society_event: 'learned_society',
  club_event: 'club',
  indie_band_event: 'indie_band',
  startup_event: 'startup',
};
export const getBoardNameI18nKey = (name: string) => {
  return BOARD_NAME_I18N_KEY[name] ?? name;
};

const BOARD_IMAGE_KEYWORD: PlainObject = {
  study_group: 'study',
  learned_society: 'academy',
  club: 'club',
  indie_band: 'band',
  startup: 'startup',
  study_group_event: 'study',
  learned_society_event: 'academy',
  club_event: 'club',
  indie_band_event: 'band',
  startup_event: 'startup',
};
export const getBoardImageKeyword = (name: string) => {
  return BOARD_IMAGE_KEYWORD[name] ?? name;
};
