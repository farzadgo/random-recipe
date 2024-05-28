import { useEffect, useState } from 'react';
import Container from '../components/Container';
import ContainerCard from '../components/ContainerCard';
import Loader from '../components/Loader';
import Result from '../components/Result';
import { Diets } from '../types';
import useDataFetch from '../hooks/useDataFetch';


const cuisines: string[] = [
  'African',
  'Asian',
  'American',
  'British',
  'Cajun',
  'Caribbean',
  'Chinese',
  'Eastern European',
  'European',
  'French',
  'German',
  'Greek',
  'Indian',
  'Irish',
  'Italian',
  'Japanese',
  'Jewish',
  'Korean',
  'Latin american',
  'Mediterranean',
  'Mexican',
  'Middle Eastern',
  'Nordic',
  'Southern',
  'Spanish',
  'Thai',
  'Vietnamese',
];


const Home = () => {

  // const apiKey = 'e433660ae5d947399f8d11957c762a73';
  const apiKey = 'a2c4a76cc2764318a49f81c7c0f21fc0';
  let baseUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&number=1&addRecipeInformation=true&sort=random`;

  const [query, setQuery] = useState('' as string)
  
  const [calories, setCalories] = useState('' as string)
  const [cuisine, setCuisine] = useState('' as string)
  const [diets, setDiets] = useState({
    isVegan: false,
    isGlutenFree: false
  } as Diets)
  
  const { loading, data, error, fetchData } = useDataFetch(query, 'main');

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setDiets(prevStates => ({
      ...prevStates,
      [name]: checked
    }));
  }

  const handleCuisine = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCuisine(event.target.value)
  }

  const handleCalories = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCalories(event.target.value);
  }

  const handleSubmit = () => {
    // event.preventDefault();  /* when using form */
    fetchData();
  }


  useEffect(() => {
    if (cuisine) baseUrl += `&cuisine=${encodeURIComponent(cuisine.toLocaleLowerCase())}`;
    if (diets.isVegan) baseUrl += `&diet=vegan`;
    if (diets.isGlutenFree) baseUrl += `&intolerances=gluten`;
    if (calories) baseUrl += `&maxCalories=${calories}`;
    setQuery(baseUrl);
  }, [cuisine, diets, calories])
  

  return (
    <Container>

      <ContainerCard title="Click to discover a delicious recipe 😋">

        <button className='btn rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-zinc-200' onClick={handleSubmit}>
          <span> Random Recipe </span>
        </button>

        <details className='collapse collapse-plus bg-base-200'>
          <summary className='collapse-title font-medium'> Filter your results </summary>
          <div className='collapse-content'> 

            <label className='label cursor-pointer'>
              <span className="label-text"> Vegan </span> 
              <input type="checkbox" className='checkbox checkbox-primary' name='isVegan' checked={diets.isVegan} onChange={handleCheckboxChange}/>
            </label>

            <label className='label cursor-pointer'>
              <span className='label-text'> Gluten-free </span> 
              <input type='checkbox' className='checkbox checkbox-primary' name='isGlutenFree' checked={diets.isGlutenFree} onChange={handleCheckboxChange}/>
            </label>

            <select className='select select-bordered select-sm my-3 w-full' onChange={(handleCuisine)} >
              <option value=''> Select a cuisine </option>
              {cuisines.map((cuisine, i) => <option key={i} value={cuisine}> {cuisine} </option>)}
            </select>

            <input type='number' className='input input-sm input-bordered w-full my-2' placeholder='Calories' value={calories} onChange={handleCalories}/>

          </div>
        </details>
        
      </ContainerCard>     

      { loading ? <Loader /> : <Result data={data} error={error}/> }

    </Container>
  )
}

export default Home