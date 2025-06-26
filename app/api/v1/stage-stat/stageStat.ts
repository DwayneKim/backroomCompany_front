import { baseClient } from "../client";



export const getItemStatistics = async (playerCount:number | null, difficulty: string | null, stageIndex: number | null, startTime: string | null, endTime: string | null, boughtTime: string | null) => {
    return baseClient.get(`/stat/get-item-stat`, {
        params: {
            playerCount,
            difficulty,
            stageIndex,
            startTime,
            endTime,
            boughtTime,
        }
    });
};

export const getDeathStatistics = async (playerCount:number | null, difficulty: string | null, stageIndex: number | null, startTime: string | null, endTime: string | null) => {
    return baseClient.get(`/stat/get-death-stat`, {
        params: {
            playerCount,
            difficulty,
            stageIndex,
            startTime,
            endTime,
        }
    });
};

export const getStatistics = async (playerCount:number | null, difficulty: string | null, isQuotaSuccess: boolean | null, stageIndex: number | null) => {
    return baseClient.get(`/stat/get-stage-stat`, {
        params: {
            playerCount,
            difficulty,
            isQuotaSuccess,
            stageIndex
        }
    });
};

