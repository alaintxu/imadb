import { useEffect, useState } from 'react';

interface FetchResponse<T> {
    totalItems: number,
    totalPages: number,
    currentPage: number,
    items: T[],
}

const usePaginatedFetch = <T>(endpoint: string, requestConfig?: RequestInit, deps?: any[]) => {
    const [data, setData] = useState<T[]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);
        console.debug("useData", endpoint);
        fetch(endpoint, { signal: controller.signal, ...requestConfig})
          .then((res) => res.json() as Promise<FetchResponse<T>>)
          .then((res)=>{
            console.debug("response", endpoint, res);
            setData(res.items);
            setTotalItems(res.totalItems);
            setTotalPages(res.totalPages);
            setCurrentPage(res.currentPage);

            setError("");
          })
          .catch((err) => {
            if (err instanceof DOMException && err.message === "The operation was aborted. ") {
                setError("");
            } else {
                setError(err.message);
            }
            setData([]);
          })
          .finally(() => setLoading(false));

        return () => controller.abort();
    }, deps ? [...deps] : []);

    return {data, totalItems, totalPages, currentPage, error, isLoading };
}

export default usePaginatedFetch;