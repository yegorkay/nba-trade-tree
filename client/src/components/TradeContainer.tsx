import { React, _ } from 'vendor';
import { ITransaction } from 'shared';
import { FunctionComponent } from 'models';
import { Text, FormattedDate, Flex, Box } from 'components';

interface ITradeContainerProps {
  transaction: ITransaction;
}

const TradeContainer: FunctionComponent<ITradeContainerProps> = (props) => {
  const {
    tradedPicks = [],
    tradedPlayers = [],
    transactionDate,
    tradedTo,
    tradedBy
  } = props.transaction;
  const picksForPlayer = tradedPicks.filter(
    (pick) => pick.tradedTo === tradedBy
  );
  const playersForPlayer = tradedPlayers.filter(
    (player) => player.tradedBy === tradedTo
  );

  const totalAssets = picksForPlayer.length + playersForPlayer.length;

  return (
    <Flex>
      <Box width={1 / 4}>
        <Text>
          Transaction Date: <FormattedDate date={transactionDate} />
        </Text>
      </Box>
      <Flex flexDirection="row" width={3 / 4}>
        {picksForPlayer.map((pick) => (
          <Box width={1 / totalAssets}>
            {pick.name !== '' && <Text textAlign="center">{pick.name}</Text>}
            <Text textAlign="center">{pick.pick}</Text>
          </Box>
        ))}
        {playersForPlayer.map((player) => (
          <Box width={1 / totalAssets}>
            <Text textAlign="center">{player.name}</Text>
          </Box>
        ))}
      </Flex>
    </Flex>
  );
};

export { TradeContainer };
