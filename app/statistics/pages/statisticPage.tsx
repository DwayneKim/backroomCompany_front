'use client'
import React, { useEffect , useState } from "react";
import {getPlaytimeStatistics, getStatistics} from "@/app/api/v1/stage-stat/stageStat";
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
    const [version, setVersion] = useState<number | null>(null)
    const [minorVersion, setMinorVersion] = useState<number | null>(null)
    const [isLast, setIsLast] = useState<boolean | null>(null);

    const getStatisticsData = async (
        playerCount: number | null,
        difficulty: string | null,
        isQuotaSuccess: boolean | null,
        stageIndex: number | null,
        majorVersion: number | null,
        minorVersion: number | null,
        isLast: boolean | null,
    ) => {
        const data = await getStatistics(
            playerCount,
            difficulty,
            isQuotaSuccess,
            stageIndex,
            majorVersion,
            minorVersion,
            isLast
        )

        setStatisticsData(data.data.content)
        console.log(data)
    }

    useEffect(() => {
        getStatisticsData(playerCount, difficulty, quotaSuccess, stageIndex,version, minorVersion, isLast)
    },[playerCount, difficulty, quotaSuccess, stageIndex, version, minorVersion, isLast])

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
                <select
                    value={version ?? ''}
                    onChange={(e) => setVersion(e.target.value === 'NONE' ? null : Number(e.target.value))}
                >
                    <option value="NONE">버전 선택</option>
                    <option value={-1}>베타 버전</option>
                    <option value={200}>Ver. 200</option>
                    <option value={201}>Ver. 201</option>
                    <option value={202}>Ver. 202</option>
                    <option value={203}>Ver. 203</option>
                    <option value={204}>Ver. 204</option>
                    <option value={205}>Ver. 205</option>
                    <option value={206}>Ver. 206</option>
                    <option value={207}>Ver. 207</option>
                    <option value={208}>Ver. 208</option>
                </select>
            </div>

            <div className="stat-list">
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