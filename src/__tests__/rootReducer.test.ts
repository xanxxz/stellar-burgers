import rootReducer from '../services/rootReducer';
import ingredientsReducer from '../services/slices/ingredientsSlice';
import burgerConstructorReducer from '../services/slices/burgerConstructorSlice';
import authReducer from '../services/slices/authSlice';
import profileOrdersReducer from '../services/slices/profileOrdersSlice';
import orderReducer from '../services/slices/orderSlice';
import feedsReducer from '../services/slices/feedsSlice';

describe('rootReducer', () => {
  it('должен корректно инициализировать редьюсеры', () => {
    const initialState = rootReducer(undefined, { type: '@@INIT' });

    expect(initialState).toHaveProperty('ingredients');
    expect(initialState).toHaveProperty('burgerConstructor');
    expect(initialState).toHaveProperty('auth');
    expect(initialState).toHaveProperty('profileOrders');
    expect(initialState).toHaveProperty('order');
    expect(initialState).toHaveProperty('feeds');

    expect(initialState.ingredients).toEqual(
      ingredientsReducer(undefined, { type: '@@INIT' })
    );
    expect(initialState.burgerConstructor).toEqual(
      burgerConstructorReducer(undefined, { type: '@@INIT' })
    );
    expect(initialState.auth).toEqual(
      authReducer(undefined, { type: '@@INIT' })
    );
    expect(initialState.profileOrders).toEqual(
      profileOrdersReducer(undefined, { type: '@@INIT' })
    );
    expect(initialState.order).toEqual(
      orderReducer(undefined, { type: '@@INIT' })
    );
    expect(initialState.feeds).toEqual(
      feedsReducer(undefined, { type: '@@INIT' })
    );
  });
});
