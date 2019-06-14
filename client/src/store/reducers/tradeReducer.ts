import { produce } from 'vendor';
import { Actions } from 'store';
import { tradeState, ActionTypes } from 'models';

const tradeReducer = (state = tradeState, action: ActionTypes) =>
  produce(state, (trade) => {
    switch (action.type) {
      case Actions.SET_TEAMS:
        trade.teams = action.data;
        break;
      case Actions.SET_TEAM_SELECT_OPTIONS:
        trade.teamSelectOptions = action.data;
        break;
      case Actions.SET_TRADE_HISTORY:
        trade.tradeHistory = action.data;
        break;
    }
  });

export { tradeReducer };
