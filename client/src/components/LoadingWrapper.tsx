import { React, Component } from 'vendor';
import { connect } from 'utils';
import { IReduxState, IAsyncStatus } from 'models';
import { Box, Loader } from 'components';
import { ErrorMessages } from 'messages';

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

    if (asyncStatus) {
      const { success, start, error } = asyncStatus;

      if (success) return children;
      if (start) return <Loader />;
      if (error)
        return (
          <Box m={2} mb={2}>
            {ErrorMessages.GENERAL}
          </Box>
        );
    }
    return null;
  }
}

export { LoadingWrapper };
