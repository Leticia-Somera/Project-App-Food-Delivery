import Card from '../UI/Card';
import classes from './MealsMenu.module.css';
import MealItem from './MealItem/MealItem';
import { useEffect, useState } from 'react';

const MealsMenu = () => {
  
  const [meals, setMeals] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  const fetchMeals = () => { 

    fetch('http://localhost:8000/products')
    .then(response => {
      if(!response.ok) {
        throw new Error("Something went wrong!");
      }
        return response.json();
      })
    .then(data => {
     // console.log(data)
      setMeals(data);
      setIsLoading(false);
      return (data);
    }).catch(error => {
      setHttpError(error.message)
    });    
}

  useEffect(() => {    
    fetchMeals()     
  }, [])

 
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

    const mealsList = meals.map(meal =>       
        <MealItem 
        id={meal.id}
        key={meal.id} 
        name={meal.name} 
        description={meal.description} 
        price={meal.price} 
        image={meal.image} 
        />
    );

    return (
      <section className={classes.meals}>
        <Card>
          <ul className={classes['meals-image']}>{mealsList}</ul>
        </Card>
      </section>
    );
};

export default MealsMenu;
