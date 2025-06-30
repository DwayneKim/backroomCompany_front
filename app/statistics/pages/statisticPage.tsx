'use client'
import React, { useEffect , useState } from "react";
import {getStatistics} from "@/app/api/v1/stage-stat/stageStat";
import '../css/StatisticPage.css'

interface StatisticItem {
    successCount: number
    successProbability: number
    stageStatResponse: StageStatResponse[]
}

interface StageStatResponse {
    playerCount: number
    stageIndex: number
    difficulty: string
    quotaSuccess: boolean
    targetQuota: number
    accumulatedCount : number
    executionResultMap: Map<number, Map<string, number>>
}

const StatisticPage = () => {

    const [playerCount, setPlayerCount] = useState<number | null>(null)
    const [difficulty, setDifficulty] = useState<string | null>(null)
    const [quotaSuccess, setQuotaSuccess] = useState<boolean | null>(null)
    const [stageIndex, setStageIndex] = useState<number | null>(null)
    const [statisticsData, setStatisticsData] = useState<StatisticItem>({
        successCount : 0,
        successProbability : 0.0,
        stageStatResponse : []
    });

    function convertToExecutionResultMap(
        obj: Record<string, Record<string, number>>
    ): Map<number, Map<string, number>> {
        const outerMap = new Map();
        Object.entries(obj).forEach(([key, value]) => {
            const innerMap = new Map<string, number>();
            Object.entries(value).forEach(([k, v]) => innerMap.set(k, v));
            outerMap.set(Number(key), innerMap);
        });
        return outerMap;
    }

    const getStatisticsData = async (
        playerCount: number | null,
        difficulty: string | null,
        isQuotaSuccess: boolean | null,
        stageIndex: number | null
    ) => {
        console.log("test")
        const data = await getStatistics(
            playerCount,
            difficulty,
            isQuotaSuccess,
            stageIndex
        )

        setStatisticsData(data.data.content)
        const response = {
            ...data.data.content,
            stageStatResponse: data.data.content.stageStatResponse.map((item: StageStatResponse) => ({
                ...item,
                executionResultMap:
                    item.executionResultMap instanceof Map
                        ? item.executionResultMap
                        : convertToExecutionResultMap(item.executionResultMap),
            })),
        };

        console.log('실행결과맵 확인:', data.data.content.stageStatResponse.executionResultMap, 'is Map:', data.data.content.stageStatResponse.executionResultMap instanceof Map);
        console.log(response)

        setStatisticsData(response)


        console.log("response", response);
    }

    useEffect(() => {
        getStatisticsData(playerCount, difficulty, quotaSuccess, stageIndex)
    },[playerCount, difficulty, quotaSuccess, stageIndex])

    return (
        <div className="stat-container">
            <h1 className="stat-title">스테이지 통계</h1>

            <div className="stat-filter">
                <select
                    value={playerCount ?? ''}
                    onChange={(e) => setPlayerCount(e.target.value === '' ? null : Number(e.target.value))}
                >
                    <option value="">플레이어 수</option>
                    {[...Array(8)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                            {i + 1}
                        </option>
                    ))}
                </select>

                <select
                    value={difficulty ?? ''}
                    onChange={(e) => setDifficulty(e.target.value === '' ? null : e.target.value)}
                >
                    <option value="">난이도</option>
                    <option value="EASY">EASY</option>
                    <option value="NORMAL">NORMAL</option>
                    <option value="HARD">HARD</option>
                </select>

                <select
                    value={stageIndex ?? ''}
                    onChange={(e) => setStageIndex(e.target.value === '' ? null : Number(e.target.value))}
                >
                    <option value="">스테이지</option>
                    {[0, 1, 2, 3].map(i => (
                        <option key={i} value={i}>{i}</option>
                    ))}
                </select>
            </div>

            <div className="stat-list">
                <p className="stat-empty">승리한 횟수 : {statisticsData.successCount} 회</p>
                <p className="stat-empty">승리 확률 : {statisticsData.successProbability} %</p>
                <p className="stat-empty">조회된 데이터 : {statisticsData.stageStatResponse.length} 개</p>

                {statisticsData.stageStatResponse.length === 0 ? (
                    <p className="stat-empty">데이터가 없습니다</p>
                ) : (
                    statisticsData.stageStatResponse.map((item, index) => (
                        <div key={index} className="stat-card">
                            <p><strong>플레이어 수:</strong> {item.playerCount}</p>
                            <p><strong>스테이지:</strong> {item.stageIndex}</p>
                            <p><strong>난이도:</strong> {item.difficulty}</p>
                            <p><strong>목표 할당량:</strong> {item.targetQuota}</p>
                            <p>
                                <strong>승리 여부:</strong>{" "}
                                <span
                                    style={{
                                        display: "inline-block",
                                        padding: "4px 8px",
                                        borderRadius: "12px",
                                        fontWeight: "bold",
                                        fontSize: "0.875rem",
                                        backgroundColor: item.quotaSuccess ? "#d1fae5" : "#fee2e2",
                                        color: item.quotaSuccess ? "#065f46" : "#991b1b",
                                    }}
                                >
                                {item.quotaSuccess ? "성공" : "실패"}
                              </span>
                            </p>
                            <p><strong>스테이지 누적 할당량:</strong> {item.accumulatedCount}</p>

                            {/*{item.executionResultMap instanceof Map && item.executionResultMap.size > 0 ? (*/}
                            {/*    Array.from(item.executionResultMap.entries()).map(([execKey, resultMap]) => (*/}
                            {/*        <div key={execKey} className="stat-subcard">*/}
                            {/*            <p><strong>스테이지 {execKey}</strong></p>*/}
                            {/*            {resultMap.size === 0 ? (*/}
                            {/*                <p className="stat-empty">결과 없음</p>*/}
                            {/*            ) : (*/}
                            {/*                <ul>*/}
                            {/*                    {Array.from(resultMap.entries()).map(([resultName, count]) => (*/}
                            {/*                        <li key={resultName}>*/}
                            {/*                            {resultName === "SUCCESS" ? "성공 횟수" : "실패 횟수"} : {count} 회*/}
                            {/*                        </li>*/}
                            {/*                    ))}*/}
                            {/*                </ul>*/}
                            {/*            )}*/}
                            {/*        </div>*/}
                            {/*    ))*/}
                            {/*) : (*/}
                            {/*    <p className="stat-empty">실행 기록 없음</p>*/}
                            {/*)}*/}
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default StatisticPage;