import reducer, { fetchFeeds } from '../services/slices/feedsSlice';
import { TOrder, TOrdersData } from '@utils-types';

describe('feedsSlice', () => {
  const order: TOrder = {
    _id: '123',
    name: 'Тестовый бургер',
    number: 1,
    status: 'done',
    createdAt: '2025-08-07T10:00:00.000Z',
    updatedAt: '2025-08-07T10:00:00.000Z',
    ingredients: ['1', '2']
  };

  const payload: TOrdersData = {
    orders: [order],
    total: 1000,
    totalToday: 50
  };

  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    isLoading: false,
    error: null
  };

  it('должен возвращать initialState по умолчанию', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  it('должен установить isLoading=true при fetchFeeds.pending', () => {
    const action = { type: fetchFeeds.pending.type };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен установить данные при fetchFeeds.fulfilled', () => {
    const action = { type: fetchFeeds.fulfilled.type, payload };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(payload.orders);
    expect(state.total).toBe(1000);
    expect(state.totalToday).toBe(50);
  });

  it('должен установить ошибку при fetchFeeds.rejected', () => {
    const action = {
      type: fetchFeeds.rejected.type,
      payload: 'Ошибка загрузки ленты заказов'
    };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки ленты заказов');
  });
});
