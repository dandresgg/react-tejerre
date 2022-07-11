
import { useEffect, useState } from 'react'
import { Api } from './api-service'

function useFetch() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            setError(null);
            const data = await Api.machineList()
                .catch(err => setError(err))
            setData(data)
            setLoading(false)
        }
        fetchData();
    }, []);
    return [data, loading, error]
}

export { useFetch };


