import { Transitions, SolidityType } from "@stackr/sdk/machine";

import { BridgeState } from "./state";

const mintToken = BridgeState.STF({
  schema: {
    address: SolidityType.ADDRESS,
    amount: SolidityType.UINT,
  },
  handler: ({ state, inputs }) => {
    const accountIdx = state.findIndex(
      (account) => account.address === inputs.address
    );

    if (accountIdx === -1) {
      state.push({
        address: inputs.address,
        balance: inputs.amount,
        oraclePrice: state.
      });
    } else {
      state[accountIdx].balance += inputs.amount;
    }

    return state;
  },
});

type UpdateOracelPriceInput = {
  price: string;
  timestamp: number;
};

const updateOraclePrice: STF<BridgeState, UpdateOracelPriceInput> = {
  handler: ({ state, inputs, msgSender }) => {
    const { price, timestamp } = inputs;

    state.bridgeState.price = price;

    return state;
  },
};

export const transitions: Transitions<BridgeState> = {
  mintToken,
  updateOraclePrice,
};
