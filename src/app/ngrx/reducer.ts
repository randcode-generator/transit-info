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

export function filterTrainReducer(state: appState = defaultState, action: Action) {
  switch (action.type) {
		case actions.FILTER_TRAIN_TEXT:
		  return state = newState(state, {filterText: (action as actions.FilterTrainText).payload})

		default:
			return state;
	}
}

export function filterStationReducer(state: appState = defaultState, action: Action) {
  switch (action.type) {
		case actions.FILTER_STATION_TEXT:
		  return state = newState(state, {filterText: (action as actions.FilterStationText).payload})

		default:
			return state;
	}
}