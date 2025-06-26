import axios from "axios";

export const baseClient = axios.create({
    baseURL: "https://api.hypercent.co.kr/api/v1",
    // baseURL: "http://localhost:9090/api/v1",
    headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
    },
});