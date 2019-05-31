import { React, Component } from 'vendor';
import { connect } from 'utils';
import { IReduxState, IAsyncStatus } from 'models';
import { Box, Loader } from 'components';

interface ILoadingWrapper {
  asyncStatus?: IAsyncStatus;
}

@connect(
  (state: IReduxState): ILoadingWrapper => ({
    asyncStatus: state.app.asyncStatus
  })
)
class LoadingWrapper extends Component<ILoadingWrapper, {}> {
  render() {
    const { asyncStatus, children } = this.props;

    if (asyncStatus && asyncStatus.success) {
      return children;
    }

    if (asyncStatus && asyncStatus.start) {
      return <Loader />;
    }

    if (asyncStatus && asyncStatus.error) {
      return (
        <Box m={2} mb={2}>
          An error has occured.
        </Box>
      );
    }

    return null;
  }
}

export { LoadingWrapper };
