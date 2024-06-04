import { useState, useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Recipe } from './types';
import Header from './components/Header';
import Home from './routes/Home';
import Favorites from './routes/Favorites';
import Notfound from './routes/Notfound';


function App() {

  const [recipes, setRecipes] = useState([] as Recipe[])

  const updateRecipes = (recipe: Recipe) => {
    if (recipes.filter(r => r.id === recipe.id).length === 0) {
      console.log('added');
      let newData = [...recipes, recipe]
      setRecipes(newData)
      localStorage.setItem('recipes', JSON.stringify(newData))
    } else {
      removeRecipe(recipe.id)
    }
  }

  const removeRecipe = (id: number) => {
    console.log('removed');
    let newData = recipes.filter(r => r.id !== id);
    setRecipes(newData)
    localStorage.setItem('recipes', JSON.stringify(newData))
  }

  useEffect(() => {
    let data = localStorage.getItem('recipes')
    if (data) {
      setRecipes(JSON.parse(data))
    }
  } , [])
  
  
  return (
    <Router>
      <div id="app" className='h-screen'>
        <Header />
        <Routes>
          <Route path='/' element={<Home handleRecipe={updateRecipes}/>} />
          <Route path='/favorites' element={<Favorites handleRecipe={updateRecipes} recipes={recipes}/>} />
          <Route path='/*' element={<Notfound />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
