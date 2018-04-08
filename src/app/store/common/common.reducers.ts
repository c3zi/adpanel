import * as commonActions from './common.actions';
import { chartFilterSettingsInitialState } from 'models/initial-state/chart-filter-settings';

const initialState = {
  activeUserType: 1,
  adsharesAddress: '',
  chartFilterSettings: chartFilterSettingsInitialState
};

export function commonReducers(state = initialState , action: commonActions.actions ) {
  switch (action.type) {
    case commonActions.SET_ACTIVE_USER_TYPE:
      return {
        ...state,
        activeUserType: action.payload
      };
    case commonActions.SET_CHART_FILTER_SETTINGS:
      return {
        ...state,
        chartFilterSettings: Object.assign({}, action.payload)
      };
    case commonActions.SET_ADSHARES_ADDRESS:
      return {
        ...state,
        adsharesAddress: action.payload
      };
     default:
      return state;
  }
}
