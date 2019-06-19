import Ingredient from './Ingredient';

const IngredientsList = ({ list }) => (
    <ul className="ingredients">
        { list.map((ingredient, i) => (
           <Ingredient key={i} {...ingredient} />
        ))}
    </ul>
);

export default IngredientsList;