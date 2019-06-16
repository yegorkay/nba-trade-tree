import {
  ISettingsState,
  settingsState,
  tradeState,
  ITradeState,
  IPlayerState,
  playerState
} from 'models';

interface IGlobalState {
  trade: ITradeState;
  settings: ISettingsState;
  playerHistory: IPlayerState;
}

const globalState: IGlobalState = {
  trade: tradeState,
  settings: settingsState,
  playerHistory: playerState
};

export { globalState, IGlobalState };
