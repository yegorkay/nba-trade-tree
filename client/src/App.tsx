import { React, Select } from 'vendor';
import { connect } from 'utils';
import { appActions } from 'store';
import {
  IReduxState,
  ITeamSelectOption,
  IConnectedComponentProps,
  ITradeObject
} from 'models';
import { ITeam } from 'shared';
import { TransactionContainer } from 'components';

interface IAppProps {
  teams: ITeam[];
  teamSelectOptions: ITeamSelectOption[];
}

interface IAppState {
  selectedOption: ITeamSelectOption[];
}

@connect(
  (state: IReduxState): IAppProps => ({
    teams: state.app.teams,
    teamSelectOptions: state.app.teamSelectOptions
  })
)
class App extends React.Component<
  IAppProps & IConnectedComponentProps,
  IAppState
> {
  state = {
    selectedOption: []
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(appActions.getTeams());
  }

  handleChange = (selectedOption: ITeamSelectOption[]) => {
    const { dispatch } = this.props;
    this.setState({ selectedOption });
    if (selectedOption.length === 2) {
      const f1 = selectedOption[0].value;
      const f2 = selectedOption[1].value;
      dispatch(appActions.getTradeHistory(f1, f2));
    }
  };

  render() {
    const { selectedOption } = this.state;
    const { teamSelectOptions } = this.props;

    const transactions: ITradeObject = {
      '2018-07-18': [
        {
          name: 'Kawhi Leonard',
          playerId: 'leonaka01',
          tradedBy: 'SAS',
          tradedTo: 'TOR',
          transactionDate: '2018-07-18'
        },
        {
          name: 'Danny Green',
          playerId: 'greenda02',
          tradedBy: 'SAS',
          tradedTo: 'TOR',
          transactionDate: '2018-07-18'
        },
        {
          name: 'DeMar DeRozan',
          playerId: 'derozde01',
          tradedBy: 'TOR',
          tradedTo: 'SAS',
          transactionDate: '2018-07-18'
        },
        {
          name: 'Jakob Poeltl',
          playerId: 'poeltja01',
          tradedBy: 'TOR',
          tradedTo: 'SAS',
          transactionDate: '2018-07-18'
        }
      ],
      '2014-02-20': [
        {
          name: 'Nando de Colo',
          playerId: 'decolna01',
          tradedBy: 'SAS',
          tradedTo: 'TOR',
          transactionDate: '2014-02-20'
        },
        {
          name: 'Austin Daye',
          playerId: 'dayeau01',
          tradedBy: 'TOR',
          tradedTo: 'SAS',
          transactionDate: '2014-02-20'
        }
      ],
      '2007-06-28': [
        {
          name: 'Giorgos Printezis',
          playerId: 'printgi01',
          tradedBy: 'SAS',
          tradedTo: 'TOR',
          transactionDate: '2007-06-28'
        },
        {
          name: 'Goran Dragic',
          playerId: 'dragigo01',
          tradedBy: 'TOR',
          tradedTo: 'SAS',
          transactionDate: '2007-06-28'
        }
      ],
      '2006-06-21': [
        {
          name: 'Matt Bonner',
          playerId: 'bonnema01',
          tradedBy: 'TOR',
          tradedTo: 'SAS',
          transactionDate: '2006-06-21'
        },
        {
          name: 'Eric Williams',
          playerId: 'willier01',
          tradedBy: 'TOR',
          tradedTo: 'SAS',
          transactionDate: '2006-06-21'
        },
        {
          name: 'Jack McClinton',
          playerId: '',
          tradedBy: 'TOR',
          tradedTo: 'SAS',
          transactionDate: '2006-06-21'
        },
        {
          name: 'Rasho Nesterovic',
          playerId: 'nestera01',
          tradedBy: 'SAS',
          tradedTo: 'TOR',
          transactionDate: '2006-06-21'
        }
      ]
    };

    return (
      <div>
        <Select
          options={selectedOption.length < 2 ? teamSelectOptions : []}
          placeholder="Select a Team..."
          onChange={this.handleChange}
          closeMenuOnSelect={selectedOption.length === 1}
          isMulti
          noOptionsMessage={() =>
            'You are only able to select two teams at a time.'
          }
        />
        <TransactionContainer {...{ transactions }} />
      </div>
    );
  }
}

export { App };
