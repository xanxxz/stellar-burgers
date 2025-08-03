import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  TLoginData,
  TRegisterData,
  loginUserApi,
  registerUserApi,
  getUserApi,
  logoutApi,
  updateUserApi,
  forgotPasswordApi,
  resetPasswordApi
} from '../../utils/burger-api';
import { setCookie, deleteCookie } from '../../utils/cookie';
import { TUser } from '../../utils/types';

type TAuthState = {
  user: TUser | null;
  isLoading: boolean;
  isAuth: boolean;
  checkedAuth: boolean;
  error: string | null;
};

const initialState: TAuthState = {
  user: null,
  isLoading: false,
  isAuth: false,
  checkedAuth: false,
  error: null
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async (data: TRegisterData, thunkAPI) => {
    try {
      const res = await registerUserApi(data);
      localStorage.setItem('refreshToken', res.refreshToken);
      setCookie('accessToken', res.accessToken);
      return res.user;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message || 'Ошибка регистрации');
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (data: TLoginData, thunkAPI) => {
    try {
      const res = await loginUserApi(data);
      localStorage.setItem('refreshToken', res.refreshToken);
      setCookie('accessToken', res.accessToken);
      return res.user;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message || 'Ошибка входа');
    }
  }
);

export const checkUserAuth = createAsyncThunk(
  'auth/checkUserAuth',
  async (_, thunkAPI) => {
    const accessToken = localStorage.getItem('refreshToken');
    if (!accessToken) {
      return thunkAPI.rejectWithValue('Пользователь не авторизован');
    }
    try {
      const user = await getUserApi();
      return user;
    } catch (err: any) {
      return thunkAPI.rejectWithValue('Сессия истекла');
    }
  }
);

export const updateUser = createAsyncThunk<
  TUser,
  Partial<TRegisterData>,
  { rejectValue: string }
>('auth/updateUser', async (data, thunkAPI) => {
  try {
    const res = await updateUserApi(data);
    return res.user;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(
      err.message || 'Ошибка обновления пользователя'
    );
  }
});

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, thunkAPI) => {
    try {
      await logoutApi();
      return true;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message || 'Ошибка при выходе');
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email: string, thunkAPI) => {
    try {
      await forgotPasswordApi({ email });
      return true;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.message || 'Ошибка запроса на восстановление'
      );
    }
  }
);

export const resetPassword = createAsyncThunk<
  boolean,
  { password: string; token: string },
  { rejectValue: string }
>('auth/resetPassword', async (data, thunkAPI) => {
  try {
    const res = await resetPasswordApi(data);
    return res.success;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.message || 'Ошибка сброса пароля');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuth = false;
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuth = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(checkUserAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload.user;
        state.isLoading = false;
        state.checkedAuth = true;
      })
      .addCase(checkUserAuth.rejected, (state) => {
        state.isAuth = false;
        state.user = null;
        state.isLoading = false;
        state.checkedAuth = true;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Ошибка обновления';
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuth = false;
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.user = null;
        state.isAuth = false;
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Ошибка сброса пароля';
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
