import reducer, {
  fetchProfileOrders
} from '../services/slices/profileOrdersSlice';
import { TOrder } from '@utils-types';

describe('profileOrdersSlice', () => {
  const orders: TOrder[] = [
    {
      _id: '1',
      name: 'Бургер 1',
      number: 100,
      status: 'done',
      createdAt: '2025-08-07T10:00:00.000Z',
      updatedAt: '2025-08-07T10:00:00.000Z',
      ingredients: ['1', '2']
    }
  ];

  const initialState = {
    orders: [],
    isLoading: false,
    error: null
  };

  it('должен вернуть initialState по умолчанию', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  it('должен установить isLoading=true при fetchProfileOrders.pending', () => {
    const action = { type: fetchProfileOrders.pending.type };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен установить заказы при fetchProfileOrders.fulfilled', () => {
    const action = {
      type: fetchProfileOrders.fulfilled.type,
      payload: orders
    };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(orders);
  });

  it('должен установить ошибку при fetchProfileOrders.rejected', () => {
    const action = {
      type: fetchProfileOrders.rejected.type,
      payload: 'Ошибка загрузки заказов'
    };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки заказов');
  });
});
