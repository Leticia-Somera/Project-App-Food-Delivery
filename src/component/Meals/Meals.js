import React from "react";
import MealsDetail from './MealsDetail';
import MealsMenu from './MealsMenu';

const Meals = () => {
    return (
        <React.Fragment >
            <MealsDetail />
            <MealsMenu />
        </React.Fragment>
    );
};

export default Meals;