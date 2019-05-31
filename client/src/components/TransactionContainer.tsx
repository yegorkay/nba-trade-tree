import { React, FunctionComponent, _ } from 'vendor';
import { ITrade } from 'shared';
import { Dictionary, ITeamSelectOption } from 'models';
import { PlayerCard, Card, Box, Text, Flex, LoadingWrapper } from 'components';
import { ErrorMessages } from 'messages';
import { formatService } from 'services';

interface ITransactionContainerProps {
  transactions: Dictionary<ITrade[]> | {};
  selectedOption: ITeamSelectOption[] | [];
}

const TransactionContainer: FunctionComponent<ITransactionContainerProps> = (
  props
) => {
  const { transactions, selectedOption } = props;
  console.log(selectedOption);
  const isEmpty = selectedOption.length > 0 && _.isEmpty(transactions);
  return (
    <LoadingWrapper>
      <Card mt={3} mb={3}>
        {!isEmpty ? (
          Object.entries(transactions).map((playerArray) => (
            <Box mb={3}>
              <Text mb={2}>
                Transaction Date: {formatService.formatDate(playerArray[0])}
              </Text>
              <Flex flexWrap="wrap">
                {playerArray[1].map((player) => (
                  <PlayerCard {...{ player }} />
                ))}
              </Flex>
            </Box>
          ))
        ) : (
          <Text>{ErrorMessages.NO_TRANSACTIONS}</Text>
        )}
      </Card>
    </LoadingWrapper>
  );
};

export { TransactionContainer };
