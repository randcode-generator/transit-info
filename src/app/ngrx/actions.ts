import { Action } from '@ngrx/store';

export const FILTER_TRAIN_TEXT  = 'Filter Train Text';
export const FILTER_STATION_TEXT  = 'Filter Station Text';
export const FILTER_STATION_CLEAR_TEXT = 'Filter Station Clear Text'

export class FilterTrainText implements Action {
  readonly type = FILTER_TRAIN_TEXT;

  constructor(public payload: string) {}
}

export class FilterStationText implements Action {
  readonly type = FILTER_STATION_TEXT;

  constructor(public payload: string) {}
}

export class FilterStationClearText implements Action {
  readonly type = FILTER_STATION_CLEAR_TEXT;

  constructor() {}
}

export type All
  = FilterTrainText
    |FilterStationText
    |FilterStationClearText;
