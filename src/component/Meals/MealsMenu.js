import Card from '../UI/Card';
import classes from './MealsMenu.module.css';
import MealItem from './MealItem/MealItem';
import { useEffect, useState, useCallback } from 'react';

const MealsMenu = () => {
  
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  console.log(localStorage.getItem('token'));
  const fetchMeals = useCallback(() => { 
    fetch('http://localhost:8000/products', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        'Access-Control-Request-Method': 'GET',
        'Access-Control-Request-Headers': 'Content-Type, Authorization'
      }}).then(response => {
      if(!response.ok) {
        throw new Error("Something went wrong! It was not possible to load the products");
      }
        return response.json();
      }).then(data => {
      console.log(data)
      setMeals(data);
      setIsLoading(false);
      return (data);
    }).catch(error => {
      setHttpError(error.message)
    });    
}, []);

  useEffect(() => {    
    fetchMeals()     
  }, [fetchMeals]);

 
  if(isLoading) {
    return (
    <section className={classes.mealsLoading}>
      <p>Loading...</p>
    </section>
    );
  }

  if(httpError) {
    return (
      <section className={classes.mealsError} >
        <p>{httpError}</p>
      </section>
    );
  }

    const mealsList = meals.map(meal => {     
        return (
        <MealItem 
        id={meal.id}
        key={meal.id} 
        name={meal.name} 
        description={meal.description} 
        price={meal.price} 
        image={meal.image} 
        />
    )});

    return (
      <section className={classes.meals}>
        <Card>
          <ul className={classes['meals-image']}>{mealsList}</ul>
        </Card>
      </section>
    );
};

export default MealsMenu;
