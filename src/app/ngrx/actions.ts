import { Action } from '@ngrx/store';

export const FILTER_TEXT  = 'Filter Text';

export class FilterText implements Action {
  readonly type = FILTER_TEXT;

  constructor(public payload: string) {}
}

export type All
  = FilterText;