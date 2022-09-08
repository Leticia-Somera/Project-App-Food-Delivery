import Card from '../UI/Card';
import classes from './MealsMenu.module.css';
import MealItem from './MealItem/MealItem';
import { useEffect, useState } from 'react';
/*import mealOne from '../../assets/cookies.jpg';
import mealTwo from '../../assets/donuts.jpg';
import mealTree from '../../assets/pay.jpg';
import mealFour from '../../assets/fries.jpg';*/

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
      console.log(data)
      setMeals(data);
      setIsLoading(false);
      return (data);

      /*if(!data.ok) {
        console.log(data);
      throw new Error("Something went wrong!");
      }*/
      
    }).catch(error => {
      setHttpError(error.message)
    });
    
}
  useEffect(() => {    
    fetchMeals()     
  }, [])

 
/*
          if(!data.ok) {
            console.log(data);
          throw new Error("Something went wrong!");
          }

          //const responseData = await response.json();

          const loadedMeals = [];

          for(const key in data) {
            loadedMeals.push([{
              id_product: key,
              name: data[key].name,               
              price: data[key].price,
              description: data[key].description,
              image: data[key].image
            }]);
          };

          //setMeals(loadedMeals);
          setIsLoading(false);
        };
      
      fetchMeals().catch(error => {
        setIsLoading(false);
        setHttpError(error.message);
        });

  }, []);******/

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
        id={meal.id_product}
        key={meal.id_product} 
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
