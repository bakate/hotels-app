import {
  REMOVE_ITEM,
  DECREASE_AMOUNT,
  INCREASE_AMOUNT,
  ADD_TO_CART,
  CLEAR_CART,
} from './actions';

export default (state, action) => {
  switch (action.type) {
    case REMOVE_ITEM:
      return state.filter(item => item.id !== action.payload);
    case INCREASE_AMOUNT:
      return state.map(item =>
        item.id === action.payload
          ? { ...item, amount: item.amount + 1 }
          : { ...item }
      );

    case DECREASE_AMOUNT:
      return state.map(item =>
        item.id === action.payload
          ? { ...item, amount: item.amount - 1 }
          : { ...item }
      );
    case ADD_TO_CART: {
      const { id, image, title, price } = action.payload;
      const product = { id, image, title, price, amount: 1 };
      return [...state, product];
    }
    case CLEAR_CART:
      return [];

    default:
      return state;
  }
};
