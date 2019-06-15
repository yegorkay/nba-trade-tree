import { produce } from 'vendor';
import { TradeActions } from 'store';
import { tradeState, TradeActionTypes } from 'models';

const tradeReducer = (state = tradeState, action: TradeActionTypes) =>
  produce(state, (trade) => {
    switch (action.type) {
      case TradeActions.SET_TEAMS:
        trade.teams = action.data;
        break;
      case TradeActions.SET_TEAM_SELECT_OPTIONS:
        trade.teamSelectOptions = action.data;
        break;
      case TradeActions.SET_TRADE_HISTORY:
        trade.tradeHistory = action.data;
        break;
    }
  });

export { tradeReducer };
