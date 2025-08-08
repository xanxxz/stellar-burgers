import reducer, {
  addBun,
  addIngredient,
  removeIngredient,
  clearConstructor,
  moveIngredient
} from '../services/slices/burgerConstructorSlice';

import { TConstructorIngredient } from '../utils/types';

describe('burgerConstructorSlice', () => {
  const bun: TConstructorIngredient = {
    _id: '1',
    id: 'bun1',
    name: 'Булка',
    type: 'bun',
    price: 100,
    image: '',
    image_mobile: '',
    image_large: '',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0
  };

  const ingredient1: TConstructorIngredient = {
    _id: '2',
    id: 'ing1',
    name: 'Котлета',
    type: 'main',
    price: 200,
    image: '',
    image_mobile: '',
    image_large: '',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0
  };

  const ingredient2: TConstructorIngredient = {
    ...ingredient1,
    id: 'ing2',
    name: 'Сыр'
  };

  it('должен возвращать initialState по умолчанию', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toEqual({
      bun: null,
      ingredients: []
    });
  });

  it('должен добавить булку', () => {
    const state = reducer(undefined, addBun(bun));
    expect(state.bun).toEqual(bun);
  });

  it('должен добавить ингредиент', () => {
    const state = reducer(undefined, addIngredient(ingredient1));
    expect(state.ingredients).toEqual([ingredient1]);
  });

  it('должен удалить ингредиент по id', () => {
    const prevState = {
      bun: null,
      ingredients: [ingredient1, ingredient2]
    };
    const state = reducer(prevState, removeIngredient('ing1'));
    expect(state.ingredients).toEqual([ingredient2]);
  });

  it('должен поменять порядок ингредиентов', () => {
    const prevState = {
      bun: null,
      ingredients: [ingredient1, ingredient2]
    };
    const state = reducer(
      prevState,
      moveIngredient({ dragIndex: 0, hoverIndex: 1 })
    );
    expect(state.ingredients).toEqual([ingredient2, ingredient1]);
  });

  it('должен очищать конструктор', () => {
    const prevState = {
      bun: bun,
      ingredients: [ingredient1, ingredient2]
    };
    const state = reducer(prevState, clearConstructor());
    expect(state).toEqual({ bun: null, ingredients: [] });
  });
});
