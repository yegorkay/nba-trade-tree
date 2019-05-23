import { React, FunctionComponent, _ } from 'vendor';
import { ITrade } from 'shared';
import { Dictionary } from 'models';
import { PlayerCard, Card, Box, Text, Flex } from 'components';

interface ITransactionContainerProps {
  transactions: Dictionary<ITrade[]> | {};
}

const TransactionContainer: FunctionComponent<ITransactionContainerProps> = (
  props
) => {
  const { transactions } = props;
  const isEmpty = _.isEmpty(transactions);
  return (
    <Card m={3}>
      {!isEmpty ? (
        Object.entries(transactions).map((playerArray) => (
          <Box m={3}>
            <Text mb={2}>Transaction Date: {playerArray[0]}</Text>
            <Flex>
              {playerArray[1].map((player) => (
                <PlayerCard {...{ player }} />
              ))}
            </Flex>
          </Box>
        ))
      ) : (
        <Text>There are no transactions available.</Text>
      )}
    </Card>
  );
};

export { TransactionContainer };
