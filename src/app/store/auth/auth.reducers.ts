import * as authActions from './auth.actions';
import { userInitialState } from 'models/initial-state/user.js';
import { GET_CURRENT_BALANCE_SUCCESS, actions } from "store/settings/settings.actions";

const initialState = userInitialState;

export function authReducers(state = initialState, action: authActions.actions | actions) {
  switch (action.type) {
    case authActions.SET_USER_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case authActions.UPDATE_USER_ADDRESS:
      return {
        ...state,
        adserverWallet: Object.assign({}, state.adserverWallet, {adsharesAddress: action.payload})
      };
    case authActions.UPDATE_USER_AUTOMATIC_WITHDRAW_PERIOD:
      return {
        ...state,
        adserverWallet: Object.assign({}, state.adserverWallet, {autoWithdrawPeriod: action.payload})
      };
    case authActions.UPDATE_USER_AUTOMATIC_WITHDRAW_AMOUNT:
      return {
        ...state,
        adserverWallet: Object.assign({}, state.adserverWallet, {autoWithdrawAmount: action.payload})
      };
    case GET_CURRENT_BALANCE_SUCCESS:
      return {
        ...state,
        exchangeRate: action.payload.exchangeRate,
        adserverWallet: action.payload.adserverWallet
      };

    case authActions.USER_LOG_OUT_SUCCESS:
    case authActions.USER_LOG_IN_SUCCESS:
      return initialState;
    default:
      return state;
  }
}
