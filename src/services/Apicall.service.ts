import axiosInstance, { endpoints } from "./api.service";


export const getMyProfile = () => {
    return axiosInstance.get(endpoints.myProfile)
}