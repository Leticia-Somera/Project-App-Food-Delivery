import Card from '../UI/Card';
import classes from './MealsMenu.module.css';
import MealItem from './MealItem/MealItem';
import { useEffect, useState, useCallback } from 'react';

const MealsMenu = () => {
  
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  //console.log(localStorage.getItem('token'));
//   const fetchMeals = useCallback(() => { 
//     fetch('http://localhost:8000/products', {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer ' + localStorage.getItem('token'),
//         'Access-Control-Request-Method': 'GET',
//         'Access-Control-Request-Headers': 'Content-Type, Authorization'
//       }}).then(response => {
//       if(!response.ok) {
//         throw new Error("Something went wrong! It was not possible to load the products");
//       }
//         return response.json();
//       }).then(data => {
//       //console.log(data)
//       setMeals(data);
//       setIsLoading(false);
//       return (data);
//     }).catch(error => {
//       setHttpError(error.message)
//     });    
// }, []);

// useEffect(() => {
  const fetchMeals = [
    {
      "id": 1,
      "name": "Pizza",
      "price": 10.99,
      "description": "A pizza with cheese, pepperoni, and tomato sauce.",
      "image": "https://media.istockphoto.com/id/1331175180/es/foto/pizza-con-jam%C3%B3n-y-setas-en-el-tablero-sobre-mesa-de-hormig%C3%B3n-oscuro.jpg?s=612x612&w=0&k=20&c=xTj5jl99WkDyPGoqZAndPEV7CyrUrNeflF8nP1YQEvY="
    },
    {
      "id": 2,
      "name": "Chicken Salad",
      "price": 7.5,
      "description": "A fresh salad with grilled chicken and ranch dressing.",
      "image": "https://media.istockphoto.com/id/1216250295/es/foto/filetes-de-bacalao-frito-con-verduras-frescas.jpg?s=612x612&w=0&k=20&c=jC3rc4wSLvwSQ9Y88M9nWeBqv34U2wE98od5TIc4wuI="
    },
    {
      "id": 3,
      "name": "Grilled Salmon",
      "price": 15.99,
      "description": "Grilled fresh salmon fillet with lemon and herbs.",
      "image": "https://images.unsplash.com/photo-1559058789-672da06263d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c2FsbW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
    },
    {
      "id": 4,
      "name": "Cheeseburger",
      "price": 8.49,
      "description": "A juicy burger with melted cheddar cheese.",
      "image": "https://media.istockphoto.com/id/1305337848/es/foto/hamburguesa-crujiente-de-pollo-con-queso-tomate-cebolla-y-lechuga.jpg?s=612x612&w=0&k=20&c=TAYtO7dd1Vh_7Gi6rQdjEIELdodCV4qekQgLdH8w-fw="
    },
    {
      "id": 5,
      "name": "Tomato Soup",
      "price": 4.25,
      "description": "Hot tomato soup with crispy croutons.",
      "image": "https://media.istockphoto.com/id/619665260/es/foto/estilo-de-vida-muerta-composici%C3%B3n-oscura-para-esta-sopa-de-tomate.jpg?s=612x612&w=0&k=20&c=yKIH5uGDFzkzyy7mjhXz_gapBexvlF18kHzx8GAezqk="
    }
  
  ]

   useEffect(() => {  
    setMeals(fetchMeals)
    setIsLoading(false); 
  }, []);

  // useEffect(() => {    
  //   // fetchMeals()   
  // }, [fetchMeals]);

 
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
