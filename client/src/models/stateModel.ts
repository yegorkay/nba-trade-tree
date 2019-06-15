import { ISettingsState, settingsState, tradeState, ITradeState } from 'models';

interface IGlobalState {
  trade: ITradeState;
  settings: ISettingsState;
}

const globalState: IGlobalState = {
  trade: tradeState,
  settings: settingsState
};

export { globalState, IGlobalState };
