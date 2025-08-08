import reducer, {
  registerUser,
  loginUser,
  logout
} from '../services/slices/authSlice';
import { TUser } from '../utils/types';

describe('authSlice', () => {
  const user: TUser = {
    email: 'test@example.com',
    name: 'Test User'
  };

  const initialState = {
    user: null,
    isLoading: false,
    isAuth: false,
    checkedAuth: false,
    error: null
  };

  it('должен вернуть initialState по умолчанию', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  it('должен установить isLoading=true при registerUser.pending', () => {
    const action = { type: registerUser.pending.type };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен установить user и isAuth=true при registerUser.fulfilled', () => {
    const action = { type: registerUser.fulfilled.type, payload: user };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(user);
    expect(state.isAuth).toBe(true);
  });

  it('должен установить ошибку при registerUser.rejected', () => {
    const action = {
      type: registerUser.rejected.type,
      payload: 'Ошибка регистрации'
    };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка регистрации');
  });

  it('должен установить user и isAuth=true при loginUser.fulfilled', () => {
    const action = { type: loginUser.fulfilled.type, payload: user };
    const state = reducer(initialState, action);
    expect(state.user).toEqual(user);
    expect(state.isAuth).toBe(true);
    expect(state.isLoading).toBe(false);
  });

  it('должен сбрасывать user и isAuth при logout', () => {
    const loggedInState = {
      ...initialState,
      user: user,
      isAuth: true
    };
    const state = reducer(loggedInState, logout());
    expect(state.user).toBeNull();
    expect(state.isAuth).toBe(false);
  });
});
