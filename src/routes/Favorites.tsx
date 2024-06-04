import { useEffect, useState } from 'react';
import { Recipe } from '../types';
import useDataFetch from '../hooks/useDataFetch';
import Container from '../components/Container';
import ContainerCard from '../components/ContainerCard';
import Loader from '../components/Loader';
import Result from '../components/Result';
import { apiKey } from './Home';


const Favorites = ({ recipes, handleRecipe }: {recipes: Recipe[] , handleRecipe: (recipe: Recipe) => void}) => {

  const [query, setQuery] = useState('' as string)

  const { loading, noResults, data, error, fetchData } = useDataFetch(query, 'details', false);

  const fetchRecipe = (id: number) => {
    setQuery(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`)
  }
  
  useEffect(() => {
    if (query) fetchData()
  }, [query])


  return (
    <Container>

      <ContainerCard title="Saved Recipes 🍰">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {
            recipes.map((recipe: Recipe) => (
              <div key={recipe.id} className="bg-white shadow-lg rounded-lg overflow-hidden" role='button' onClick={() => fetchRecipe(recipe.id)}>
                <img src={`https://spoonacular.com/recipeImages/${recipe.id}-312x231.jpg`} alt={recipe.title} className="w-full h-40 sm:h-48 object-cover" />
                <div className="p-4">
                  <p className="text-indigo-500 text-md font-semibold"> {recipe.title} </p>
                </div>
              </div>
            ))
          }
        </div>
      </ContainerCard>

      { loading ? <Loader /> : <Result data={data} error={error} handleRecipe={handleRecipe} /> }
      { noResults && <p className='text-center'> No resource with given identifier found. 😥 </p>}

    </Container>
  )
}

export default Favorites