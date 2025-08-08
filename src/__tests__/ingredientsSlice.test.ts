import reducer, {
  setSelectedIngredient,
  clearSelectedIngredient,
  fetchIngredients
} from '../services/slices/ingredientsSlice';

import { TIngredient } from '../utils/types';

describe('ingredientsSlice', () => {
  const ingredient: TIngredient = {
    _id: '1',
    name: 'Булка',
    type: 'bun',
    proteins: 10,
    fat: 20,
    carbohydrates: 30,
    calories: 300,
    price: 100,
    image: 'img',
    image_mobile: 'img_mobile',
    image_large: 'img_large'
  };

  const initialState = {
    ingredients: [],
    selectedIngredient: null,
    loading: false,
    error: null
  };

  it('должен вернуть initialState по умолчанию', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  it('должен установить выбранный ингредиент', () => {
    const state = reducer(initialState, setSelectedIngredient(ingredient));
    expect(state.selectedIngredient).toEqual(ingredient);
  });

  it('должен очистить выбранный ингредиент', () => {
    const state = reducer(
      { ...initialState, selectedIngredient: ingredient },
      clearSelectedIngredient()
    );
    expect(state.selectedIngredient).toBeNull();
  });

  it('должен установить loading = true при fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен установить данные при fetchIngredients.fulfilled', () => {
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: [ingredient]
    };
    const state = reducer(initialState, action);
    expect(state.ingredients).toEqual([ingredient]);
    expect(state.loading).toBe(false);
  });

  it('должен установить ошибку при fetchIngredients.rejected', () => {
    const action = {
      type: fetchIngredients.rejected.type,
      error: { message: 'Сервер недоступен' }
    };
    const state = reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Сервер недоступен');
  });
});
