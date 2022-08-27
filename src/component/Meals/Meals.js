import { Fragment } from "react";
import MealsDetail from './MealsDetail';
import MealsMenu from './MealsMenu';

const Meals = () => {
    return (
        <Fragment >
            <MealsDetail />
            <MealsMenu />
        </Fragment>
    );
};

export default Meals;