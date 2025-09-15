import axios from "axios";
import type { AxiosResponse } from "axios";
import type { FoodData } from "../interface/FoodData";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const API_URL = "http://localhost:8080";

const postData = async (data: FoodData): Promise<any> => {

    const response = axios.post(API_URL + "/foods", data);

    return response;
}

export function useFoodData() {

    const queryClient = useQueryClient();

    const query = useMutation ({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries(['food-data']); 
        }
    })

    return{
        ...query,
        data: query.data?.data
    }
}