import { useCallback, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { Data, Step } from '../types';


const useDataFetch = (query: string, flag: string, fetchOnMount: boolean = false) => {

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({} as Data)
  const [error, setError] = useState({} as AxiosError)
  const [steps, setStesp] = useState({} as Step[])
  const [noResults, setNoResults] = useState(false)

  // const controller = new AbortController();
  const reset = () => {
    setLoading(true)
    setData({} as Data)
    setError({} as AxiosError)
    setStesp([] as Step[])
    setNoResults(false)
  }

  const fetchData = useCallback( async () => {
    reset()
    try {
      const response = await axios(query)
      if (flag === 'main') response.data.results.length === 0 ? setNoResults(true) : setData(response.data.results[0] as Data)
      if (flag === 'steps') setStesp(response.data[0].steps as Step[])
      setLoading(false)
    } catch (error) {
      setError(error as AxiosError)
      setLoading(false)
    }
  }, [query, flag])


  useEffect(() => {
    if (fetchOnMount) fetchData()
  }, [fetchOnMount])

  return { loading, noResults, data, steps, error, fetchData }
}

export default useDataFetch