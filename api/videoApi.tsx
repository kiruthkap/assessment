import apiClient from "./axios"

export const fetchVidesByPageAndTab = (apiUrl: string) => {
    return apiClient.get(apiUrl);
}