interface PaginatedResponse<T> {
    totalItems: number,
    totalPages: number,
    currentPage: number,
    items: T[],
}

const handleResponse = async <T>(res: Response): Promise<T> => {
    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Error fetching data: ${res.statusText} - ${errorText}`);
    }
    return res.json() as Promise<T>;
}

export const fetchItems = async <T>(endpoint: string, requestConfig?: RequestInit): Promise<T[]> => {
    const res = await fetch(endpoint, requestConfig);
    return handleResponse<T[]>(res);
}

export const fetchItem = async <T>(endpoint: string, requestConfig?: RequestInit): Promise<T> => {
    const res = await fetch(endpoint, requestConfig);
    return handleResponse<T>(res);
}

export const fetchPaginatedItems = async <T>(endpoint: string, requestConfig?: RequestInit): Promise<PaginatedResponse<T>> => {
    return fetchItem<PaginatedResponse<T>>(endpoint, requestConfig);
}