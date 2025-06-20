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
    isQuotaSuccess: boolean
    targetQuota: number
}


const StatisticPage = () => {

    const [playerCount, setPlayerCount] = useState<number | null>(null)
    const [difficulty, setDifficulty] = useState<string | null>(null)
    const [isQuotaSuccess, setIsQuotaSuccess] = useState<boolean | null>(null)
    const [stageIndex, setStageIndex] = useState<number | null>(null)
    const [statisticsData, setStatisticsData] = useState<StatisticItem>({
        successCount : 0,
        successProbability : 0.0,
        stageStatResponse : []
    });

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
        console.log(data)
        setStatisticsData(data.data.content)
    }

    useEffect(() => {
        getStatisticsData(playerCount, difficulty, isQuotaSuccess, stageIndex)
    },[playerCount, difficulty, isQuotaSuccess, stageIndex])

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
                    value={isQuotaSuccess === null ? '' : isQuotaSuccess.toString()}
                    onChange={(e) =>
                        setIsQuotaSuccess(e.target.value === '' ? null : e.target.value === 'true')
                    }
                >
                    <option value="">성공 여부</option>
                    <option value="true">성공</option>
                    <option value="false">실패</option>
                </select>

                <select
                    value={stageIndex ?? ''}
                    onChange={(e) => setStageIndex(e.target.value === '' ? null : Number(e.target.value))}
                >
                    <option value="">스테이지</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </div>

            <div className="stat-list">
                <p className="stat-empty">승리한 횟수 : {statisticsData.successCount} </p>
                <p className="stat-empty">승리 확률 : {statisticsData.successProbability} </p>
                <p className="stat-empty">조회된 데이터 : {statisticsData.stageStatResponse.length} 개</p>
                {statisticsData.stageStatResponse.length === 0 ? (
                    <p className="stat-empty">데이터가 없습니다</p>
                ) : (
                    statisticsData.stageStatResponse.map((item, index) => (
                        <div key={index} className="stat-card">
                            <p><strong>플레이어 수:</strong> {item.playerCount}</p>
                            <p><strong>스테이지:</strong> {item.stageIndex}</p>
                            <p><strong>난이도:</strong> {item.difficulty}</p>
                            <p><strong>스테이지 성공 여부:</strong> {item.isQuotaSuccess ? '성공' : '실패'}</p>
                            <p><strong>목표 할당량:</strong> {item.targetQuota}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default StatisticPage;