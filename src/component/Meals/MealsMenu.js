import Card from '../UI/Card';
import classes from './MealsMenu.module.css';
import MealItem from './MealItem/MealItem';
import mealOne from '../../assets/cookies.jpg';
import mealTwo from '../../assets/donuts.jpg';
import mealTree from '../../assets/pay.jpg';
import mealFour from '../../assets/fries.jpg';


const DUMMY_MEALS = [
    {
      id: 'm1',
      name: 'Cookies',
      description: 'Chocolate chip, freshly baked',
      price: 12.99,
      image: mealOne
    },
    {
      id: 'm2',
      name: 'Donuts',
      description: 'Filled with fresh sweet fruit jam!',
      price: 15.99,
      image: mealTwo
    },
    {
      id: 'm3',
      name: 'Pie',
      description: 'Fresh and crunchy blackberry pie',
      price: 20.00,
      image: mealTree
    },
    {
      id: 'm4',
      name: 'French fries',
      description: 'Delicious crunchy and salty fries',
      price: 14.50,
      image: mealFour
    },
  ];

const MealsMenu = () => {
    const mealsList = DUMMY_MEALS.map(meal => 
      <div >
        <MealItem 
        id={meal.id}
        key={meal.id} 
        name={meal.name} 
        description={meal.description} 
        price={meal.price} 
        image={meal.image} 
        />
      </div>
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
