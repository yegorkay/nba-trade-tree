import { React, _ } from 'vendor';
import { ITrade } from 'shared';
import { Dictionary, ITeamSelectOption, FunctionComponent } from 'models';
import {
  PlayerCard,
  Card,
  Box,
  Text,
  Flex,
  LoadingWrapper,
  FormattedDate
} from 'components';
import { ErrorMessages } from 'messages';

interface ITransactionContainerProps {
  transactions: Dictionary<ITrade[]>;
  selectedOption: ITeamSelectOption[];
}

const renderPlayerCard = (
  playerArray: [string, ITrade[]],
  index: number
): JSX.Element => (
  <Box mb={3} key={index}>
    <Text mb={2}>
      Transaction Date: <FormattedDate date={playerArray[0]} />
    </Text>
    <Flex flexWrap="wrap">
      {playerArray[1].map((player) => (
        <PlayerCard
          {...{ player, key: `${player.transactionDate}-${player.name}` }}
        />
      ))}
    </Flex>
  </Box>
);

const TransactionContainer: FunctionComponent<ITransactionContainerProps> = (
  props
) => {
  const { transactions, selectedOption } = props;
  const isEmpty = selectedOption.length > 0 && _.isEmpty(transactions);
  const transactionCards = Object.entries(transactions).map(renderPlayerCard);

  return (
    <LoadingWrapper>
      <Card mt={3} mb={3}>
        {!isEmpty ? (
          transactionCards
        ) : (
          <Text>{ErrorMessages.NO_TRANSACTIONS}</Text>
        )}
      </Card>
    </LoadingWrapper>
  );
};

export { TransactionContainer };
