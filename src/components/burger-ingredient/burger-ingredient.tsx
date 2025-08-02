import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import {
  addBun,
  addIngredient
} from '../../services/slices/burgerConstructorSlice';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const handleAdd = () => {
      const ingredientWithId = { ...ingredient, id: nanoid() };

      if (ingredient.type === 'bun') {
        dispatch(addBun(ingredientWithId));
      } else {
        dispatch(addIngredient(ingredientWithId));
      }
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
