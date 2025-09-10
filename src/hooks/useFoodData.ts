import axios from "axios";
import type { AxiosResponse } from "axios";
import type { FoodData } from "../interface/FoodData";
import { useQuery } from "@tanstack/react-query";

const API_URL = "http://localhost:8080";

const fetchData = async (): Promise<AxiosResponse<FoodData[]>> => {

    const response = axios.get(API_URL + "/foods");

    return response;
}

export function useFoodData() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['food-data'],
        retry: 2
    })

    return{
        ...query,
        data: query.data?.data
    }
}