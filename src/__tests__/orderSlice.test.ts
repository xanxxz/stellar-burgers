import reducer, {
  createOrder,
  clearOrder
} from '../services/slices/orderSlice';
import { TOrder } from '@utils-types';

describe('orderSlice', () => {
  const order: TOrder = {
    _id: '123',
    number: 456,
    name: 'Тестовый заказ',
    status: 'done',
    ingredients: ['1', '2'],
    createdAt: '2025-08-07T10:00:00.000Z',
    updatedAt: '2025-08-07T10:00:00.000Z'
  };

  const initialState = {
    orderModalData: null,
    orderRequest: false,
    error: null
  };

  it('должен вернуть initialState по умолчанию', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  it('должен установить orderRequest=true при createOrder.pending', () => {
    const action = { type: createOrder.pending.type };
    const state = reducer(initialState, action);
    expect(state.orderRequest).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен установить orderModalData при createOrder.fulfilled', () => {
    const action = { type: createOrder.fulfilled.type, payload: order };
    const state = reducer(initialState, action);
    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toEqual(order);
  });

  it('должен установить ошибку при createOrder.rejected', () => {
    const action = {
      type: createOrder.rejected.type,
      payload: 'Ошибка при создании заказа'
    };
    const state = reducer(initialState, action);
    expect(state.orderRequest).toBe(false);
    expect(state.error).toBe('Ошибка при создании заказа');
  });

  it('должен очищать orderModalData при clearOrder', () => {
    const prevState = {
      ...initialState,
      orderModalData: order
    };
    const state = reducer(prevState, clearOrder());
    expect(state.orderModalData).toBeNull();
  });
});
