import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/store';
import {
  setSelectedIngredient,
  clearSelectedIngredient,
  fetchIngredients
} from '../../services/slices/ingredientsSlice';

import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  const { ingredients, selectedIngredient, loading } = useSelector(
    (state) => state.ingredients
  );

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }
  }, [ingredients.length, dispatch]);

  useEffect(() => {
    if (ingredients.length && id) {
      const found = ingredients.find((item) => item._id === id) || null;
      dispatch(setSelectedIngredient(found));
    }
    return () => {
      dispatch(clearSelectedIngredient());
    };
  }, [ingredients, id, dispatch]);

  if (loading || !ingredients.length || !selectedIngredient) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={selectedIngredient} />;
};
