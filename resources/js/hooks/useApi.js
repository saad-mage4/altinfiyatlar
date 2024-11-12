import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// Function to handle API requests
const fetchData = async ({ queryKey }) => {
    try {
        const [_key, url, params] = queryKey;
        const { data } = await axios.get(url, { params });
        return data;
    } catch (error) {
        console.log("custom hook", error);
    }
};

export function useApiQuery(key, url, params = {}, options = {}) {
    return useQuery({
        queryKey: [key, url, params],
        queryFn: fetchData,
        ...options,
    });
}

export function useApiMutation(method, url, options = {}) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload) => {
            const { data } = await axios({
                method,
                url,
                data: payload,
            });
            return data;
        },
        onSuccess: (data) => {
            if (options.onSuccess) {
                options.onSuccess(data);
            }
            // Invalidate and refetch if applicable
            if (options.invalidateKey) {
                queryClient.invalidateQueries({ queryKey: options.invalidateKey });
            }
        },
        ...options,
    });
}
