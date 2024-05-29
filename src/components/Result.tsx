import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { Data, Step } from '../types';
import ContainerCard from './ContainerCard';
import { Clock, ExternalLink, X } from 'react-feather';
import useDataFetch from '../hooks/useDataFetch';
import { apiKey } from '../routes/Home';


const Result = ({ data, error }: { data: Data, error: AxiosError }) => {
  
  const [query, setQuery] = useState('');

  const [errorMessage, setErrorMessage] = useState('')
  const [showRecipe, setShowRecipe] = useState(false)

  const { steps, fetchData } = useDataFetch(query, 'steps');
  const [showSteps, setShowSteps] = useState(false);

  const handleInstructions = () => {
    if (Object.keys(steps).length === 0) {
      fetchData();
    } else {
      setShowSteps(true)
    }
  }

  useEffect(() => {
    if (steps.length) setShowSteps(true)
  }, [steps])
  

  useEffect(() => {
    if (Object.keys(error).length) setErrorMessage(error.message)
    if (Object.keys(data).length) {
      setShowRecipe(true)
      setQuery(`https://api.spoonacular.com/recipes/${data.id}/analyzedInstructions?apiKey=${apiKey}`)
    }
  }, [data, error])
  

  return (
    <>
      { errorMessage &&
        <ContainerCard title="Oops! We are sorry. 😥">
          <div className='mx-auto'> <code> {errorMessage} </code> </div>
        </ContainerCard>
      }

      { showRecipe &&
        <ContainerCard title={data.title}>

          <div className='h-54 w-auto mx-auto'>
            <img src={data.image} alt={data.title} className='h-full rounded-2xl' />
          </div>

          <div className='flex items-center gap-3 mx-auto'>
            <Clock className='h-5 w-5' />
            <i> Ready in {data.readyInMinutes} minutes </i>
          </div>

          <ListedItems data={data.diets} title="Diets" badged />
          <ListedItems data={data.cuisines} title="Cuisines" />
          <ListedItems data={data.occasions} title="Occasions" />

          <div>
            <i> Summary: &nbsp;</i> <span className='text-sm' dangerouslySetInnerHTML={{__html: data.summary}} />
          </div>

          <button onClick={handleInstructions} className='btn btn-secondary mx-auto w-full rounded-full sm:w-56 my-6'> Get Instructions </button>

          <div className='flex gap-3'>
            <i> Source: </i>
            <a href={data.sourceUrl} target='_blanck' className='flex'>
              <span>{data.sourceName}</span>
              <ExternalLink className='h-5 w-5 ml-2 ' />
            </a>
          </div>

        </ContainerCard>
      }

      { showSteps && <Steps steps={steps} setShowSteps={setShowSteps}/> }
    </>
  )
}

export default Result



const ListedItems = ({...props}: { data: string[], title: string, badged?: boolean }) => {    
  return (
    <div className={`${props.data.length > 0 ? 'flex' : 'hidden'} items-center gap-3 flex-wrap`}>
      <h4> <i>{props.title}:</i> </h4>
      {props.data.length > 0 && props.data.map((item, i) => <div key={i} className={`badge ${props.badged ? 'badge-primary' : 'badge-neutral'} whitespace-nowrap`}> {item} </div>)}
    </div>
  )
}


const Steps = ({ steps, setShowSteps }: {steps: Step[], setShowSteps: React.Dispatch<React.SetStateAction<boolean>> }) => {
  return (
    <div className='bg-zinc-800/70 text-zinc-300 px-4 pt-14 w-full min-h-screen absolute top-0 left-0 z-10 backdrop-blur-md'>
      <button className='fixed top-6 right-6 btn btn-square btn-outline border-zinc-300' onClick={() => setShowSteps(false)}>
        <X className='h-6 w-6 stroke-zinc-300'/>
      </button>
      <ContainerCard title="Instructions">
        {steps.map((step, i) => <div className='py-3' key={i}> <b> Step {step.number} &nbsp;</b> {step.step} </div>)}
      </ContainerCard>
    </div>
  )
}