import { RouteComponentProps } from 'models';

type Dispatch = (arg: any) => any;

interface IConnectedComponentProps extends RouteComponentProps {
  dispatch: Dispatch;
}

interface IAsyncStatus {
  start: boolean;
  success: boolean;
  error: boolean;
}

export { IConnectedComponentProps, Dispatch, IAsyncStatus };
