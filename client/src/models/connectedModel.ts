import { RouteComponentProps } from 'vendor';

type Dispatch = (arg: any) => any;

interface IConnectedComponentProps extends RouteComponentProps {
  dispatch: Dispatch;
}

export { IConnectedComponentProps, Dispatch };
