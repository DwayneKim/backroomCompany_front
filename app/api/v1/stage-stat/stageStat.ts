import { baseClient } from "../client";



export const getItemStatistics = async (
    playerCount:number | null,
    difficulty: string | null,
    stageIndex: number | null,
    startTime: string | null,
    endTime: string | null,
    boughtTime: string | null,
    majorVersion: number | null,
    minorVersion: number | null,
    isLast: boolean | null,
) => {
    return baseClient.get(`/stat/get-item-stat`, {
        params: {
            playerCount,
            difficulty,
            stageIndex,
            startTime,
            endTime,
            boughtTime,
            majorVersion,
            minorVersion,
            isLast,
        }
    });
};

export const getDeathStatistics = async (
    playerCount:number | null,
    difficulty: string | null,
    stageIndex: number | null,
    stageType: string | null,
    startTime: string | null,
    endTime: string | null,
    majorVersion: number | null,
    minorVersion: number | null,
    isLast: boolean | null,
) => {
    return baseClient.get(`/stat/get-death-stat`, {
        params: {
            playerCount,
            difficulty,
            stageIndex,
            stageType,
            startTime,
            endTime,
            majorVersion,
            minorVersion,
            isLast,
        }
    });
};

export const getStatistics = async (
    playerCount:number | null,
    difficulty: string | null,
    isQuotaSuccess: boolean | null,
    stageIndex: number | null,
    majorVersion: number | null,
    minorVersion: number | null,
    isLast: boolean | null,
) => {
    return baseClient.get(`/stat/get-stage-stat`, {
        params: {
            playerCount,
            difficulty,
            isQuotaSuccess,
            stageIndex,
            majorVersion,
            minorVersion,
            isLast,
        }
    });
};

export const getItemBeforeStatistics = async (
    playerCount:number | null,
    difficulty: string | null,
    stageIndex: number | null,
    stageType: string | null,
    startTime: string | null,
    endTime: string | null,
    boughtTime: string | null,
    majorVersion : number | null,
    minorVersion: number | null,
    isLast: boolean | null,) => {
    return baseClient.get(`/stat/get-item-stat/before`, {
        params: {
            playerCount,
            difficulty,
            stageIndex,
            stageType,
            startTime,
            endTime,
            boughtTime,
            majorVersion,
            minorVersion,
            isLast,
        }
    });
};

export const getAvgDeathStatistics = async (
    playerCount:number | null,
    difficulty: string | null,
    stageIndex: number | null,
    stageType: string | null,
    startTime: string | null,
    endTime: string | null,
    majorVersion: number | null,
    minorVersion: number | null,
    isLast: boolean | null,
) => {
    return baseClient.get(`/stat/get-death-stat/avg`, {
        params: {
            playerCount,
            difficulty,
            stageIndex,
            stageType,
            startTime,
            endTime,
            majorVersion,
            minorVersion,
            isLast,
        }
    });
};

export const getQuotaStatistics = async (
    playerCount:number | null,
    difficulty: string | null,
    stageIndex: number | null,
    stageType: string | null,
    startTime: string | null,
    endTime: string | null,
    majorVersion: number | null,
    minorVersion: number | null,
    isLast: boolean | null,
) => {
    return baseClient.get(`/stat/quota`, {
        params: {
            playerCount,
            difficulty,
            stageIndex,
            stageType,
            majorVersion,
            startTime,
            endTime,
            minorVersion,
            isLast,
        }
    });
};

export const getPlaytimeStatistics = async (
    playerCount:number | null,
    difficulty: string | null,
    stageIndex: number | null,
    stageType: string | null,
    startTime: string | null,
    endTime: string | null,
    majorVersion: number | null,
    minorVersion: number | null,
    isLast: boolean | null,
) => {
    return baseClient.get(`/stat/play-time`, {
        params: {
            playerCount,
            difficulty,
            stageIndex,
            stageType,
            majorVersion,
            startTime,
            endTime,
            minorVersion,
            isLast,
        }
    });
};

export const getSuccessStatistics = async (
    playerCount:number | null,
    difficulty: string | null,
    stageIndex: number | null,
    stageType: string | null,
    startTime: string | null,
    endTime: string | null,
    majorVersion: number | null,
    minorVersion: number | null,
    isLast: boolean | null,
) => {
    return baseClient.get(`/stat/success-statistics`, {
        params: {
            playerCount,
            difficulty,
            stageIndex,
            stageType,
            majorVersion,
            startTime,
            endTime,
            minorVersion,
            isLast,
        }
    });
};

export const getCollectItem = async (
    playerCount:number | null,
    difficulty: string | null,
    stageIndex: number | null,
    stageType: string | null,
    startTime: string | null,
    endTime: string | null,
    majorVersion: number | null,
    minorVersion: number | null,
    isLast: boolean | null,
) => {
    return baseClient.get(`/stat/collect-item`, {
        params: {
            playerCount,
            difficulty,
            stageIndex,
            stageType,
            majorVersion,
            startTime,
            endTime,
            minorVersion,
            isLast,
        }
    });
};

export const getSoldItem = async (
    playerCount:number | null,
    difficulty: string | null,
    stageIndex: number | null,
    stageType: string | null,
    startTime: string | null,
    endTime: string | null,
    majorVersion: number | null,
    minorVersion: number | null,
    isLast: boolean | null,
) => {
    return baseClient.get(`/stat/sold-item`, {
        params: {
            playerCount,
            difficulty,
            stageIndex,
            stageType,
            majorVersion,
            startTime,
            endTime,
            minorVersion,
            isLast,
        }
    });
};

export const getStoryStagePlaytimeStatistics = async (
    playerCount: number | null, difficulty: string | null, stageIndex: number | null, stageType: string | null,  startTime: string | null, endTime: string | null, majorVersion: number | null, minorVersion: number | null, isLast: boolean | null,
) => {
    return baseClient.get(`/stat/story-stage`, {
        params: {
            playerCount,
            difficulty,
            stageIndex,
            stageType,
            majorVersion,
            startTime,
            endTime,
            minorVersion,
            isLast,
        }
    });
};



