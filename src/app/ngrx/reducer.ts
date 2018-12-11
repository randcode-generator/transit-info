import { Action } from '@ngrx/store';
import * as actions from './actions';
import { appState } from './appState';

const defaultState: appState = {
  filterText: ""
}

export type Action = actions.All;

const newState = (state, newData) => {
  return Object.assign({}, state, newData)
}

export function filterReducer(state: appState = defaultState, action: Action) {
  switch (action.type) {
		case actions.FILTER_TEXT:
		  return state = newState(state, {filterText: (action as actions.FilterText).payload})

		default:
			return state;
	}
}