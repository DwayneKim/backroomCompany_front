import {baseClient} from "@/app/api/v1/client";

export const login = async (id : string | null, password: string | null) => {
    return baseClient.post(`/auth/login`, {
        id: id, password: password,
    });
};