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

export const getItemBeforeStatistics = async (playerCount:number | null, difficulty: string | null, stageIndex: number | null, boughtTime: string | null) => {
    return baseClient.get(`/stat/get-item-stat/before`, {
        params: {
            playerCount,
            difficulty,
            stageIndex,
            boughtTime,
        }
    });
};

export const getAvgDeathStatistics = async (playerCount:number | null, difficulty: string | null, stageIndex: number | null) => {
    return baseClient.get(`/stat/get-death-stat/avg`, {
        params: {
            playerCount,
            difficulty,
            stageIndex
        }
    });
};

export const getQuotaStatistics = async (playerCount:number | null, difficulty: string | null, stageIndex: number | null, stageType: string | null) => {
    return baseClient.get(`/stat/quota`, {
        params: {
            playerCount,
            difficulty,
            stageIndex,
            stageType
        }
    });
};

export const getPlaytimeStatistics = async (playerCount:number | null, difficulty: string | null, stageIndex: number | null, stageType: string | null) => {
    return baseClient.get(`/stat/play-time`, {
        params: {
            playerCount,
            difficulty,
            stageIndex,
            stageType
        }
    });
};

export const getSuccessStatistics = async (playerCount:number | null, difficulty: string | null, stageIndex: number | null, stageType: string | null) => {
    return baseClient.get(`/stat/success-statistics`, {
        params: {
            playerCount,
            difficulty,
            stageIndex,
            stageType
        }
    });
};

export const getCollectItem = async (playerCount:number | null, difficulty: string | null, stageIndex: number | null, stageType: string | null) => {
    return baseClient.get(`/stat/collect-item`, {
        params: {
            playerCount,
            difficulty,
            stageIndex,
            stageType
        }
    });
};

export const getSoldItem = async (playerCount:number | null, difficulty: string | null, stageIndex: number | null, stageType: string | null) => {
    return baseClient.get(`/stat/sold-item`, {
        params: {
            playerCount,
            difficulty,
            stageIndex,
            stageType
        }
    });
};

export const getStoryStagePlaytimeStatistics = async (playerCount:number | null, difficulty: string | null, stageIndex: number | null, stageType: string | null) => {
    return baseClient.get(`/stat/story-stage`, {
        params: {
            playerCount,
            difficulty,
            stageIndex,
            stageType
        }
    });
};



