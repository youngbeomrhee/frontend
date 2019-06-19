import Recipe from './Recipe'
import '../../stylesheets/Menu.css'

const Menu = ({ title, recipes }) =>
    <article>
        <header>
            <h1>{title}</h1>
        </header>
        <div className="recipes">
            { recipes.map((recipe, i) =>
                <Recipe key={i} {...recipe} />)
            }
        </div>
    </article>

Menu.displayName = 'Menu'

export default Menu
