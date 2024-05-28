import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { Data, Step } from '../types';

// const apiKey = process.env.REACT_APP_API_KEY;

const useDataFetch = (query: string, flag: string) => {

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({} as Data)
  const [error, setError] = useState({} as AxiosError)
  const [steps, setStesp] = useState({} as Step[])

  // const controller = new AbortController();

  const fetchData = async () => {
    setError({} as AxiosError);
    setData({} as Data);
    setLoading(true);

    try {
      const response = await axios(query)
      if (flag === 'main') setData(response.data.results[0] as Data)
      if (flag === 'steps') setStesp(response.data[0].steps as Step[])
      setLoading(false)
    } catch (error) {
      setError(error as AxiosError)
      setLoading(false)
    }
  }

  return { loading, data, steps, error, fetchData }
}

export default useDataFetch

