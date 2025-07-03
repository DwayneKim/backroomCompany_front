'use client'
import React, { useEffect , useState } from "react";
import {getPlaytimeStatistics, getQuotaStatistics, getSuccessStatistics} from "@/app/api/v1/stage-stat/stageStat";
import '../css/DashBoardPage.css'

interface DetailResponse {
    min: number;
    max: number;
    avg: number;
    median: number;
}

interface SuccessData {
    successCount: number;
    successProbability: number;
}

const DashBoardPage = () => {

    const [playerCount, setPlayerCount] = useState<number | null>(null)
    const [difficulty, setDifficulty] = useState<string | null>(null)
    const [quotaSuccess, setQuotaSuccess] = useState<boolean | null>(null)
    const [stageIndex, setStageIndex] = useState<number | null>(null)
    const [stageType, setStageType] = useState<string | null>(null)
    const [playtimeStatistic, setPlaytimeStatistic] = useState<DetailResponse>({
        min: 0,
        max: 0,
        avg: 0.0,
        median: 0,
    })
    const [successStatistics, setSuccessStatistics] = useState<SuccessData>({
        successCount: 0,
        successProbability: 0.0,
    })
    const [overQuota, setOverQuota] = useState<DetailResponse>({
        min: 0,
        max: 0,
        avg: 0.0,
        median: 0,
    })
    const [shortageQuota, setShortageQuota] = useState<DetailResponse>({
        min: 0,
        max: 0,
        avg: 0.0,
        median: 0,
    })

    const getQuotaData = async (
        playerCount: number | null,
        difficulty: string | null,
        stageIndex: number | null,
        stageType: string | null,
    ) => {
        const data = await getQuotaStatistics(
            playerCount,
            difficulty,
            stageIndex,
            stageType,
        )
        setOverQuota(data.data.content.overQuota)
        setShortageQuota(data.data.content.shortageQuota)
    }

    const getSuccessStatisticsData = async (
        playerCount: number | null,
        difficulty: string | null,
        stageIndex: number | null,
        stageType: string | null
    ) => {
        const data = await getSuccessStatistics(
            playerCount,
            difficulty,
            stageIndex,
            stageType,
        )

        setSuccessStatistics(data.data.content)
    }

    const getPlaytimeStatisticsData = async (
        playerCount: number | null,
        difficulty: string | null,
        stageIndex: number | null,
        stageType: string | null
    ) => {
        const data = await getPlaytimeStatistics(
            playerCount,
            difficulty,
            stageIndex,
            stageType,
        )

        setPlaytimeStatistic(data.data.content)
    }

    useEffect(() => {
        getQuotaData(playerCount, difficulty, stageIndex, stageType)
        getPlaytimeStatisticsData(playerCount, difficulty, stageIndex, stageType)
        getSuccessStatisticsData(playerCount, difficulty, stageIndex, stageType)
    },[playerCount, difficulty, quotaSuccess, stageIndex, stageType])

    return (
        <div className="stat-container">
            <h1 className="stat-title">대시 보드</h1>

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
                <div className="quota-grid">
                    {/* 승리 통계 */}
                    <div className="quota-card">
                        <h4>승리시 초과한 할당량 통계</h4>
                        <p></p>
                        <div className="quota-detail-card">
                            <p>승리한 횟수 : {successStatistics.successCount} 회</p>
                            <p>승리 확률 : {successStatistics.successProbability} %</p>
                        </div>
                    </div>
                    {/* 초과 할당량 */}
                    <div className="quota-card">
                        <h4>승리시 초과한 할당량 통계</h4>
                        <p></p>
                        <div className="quota-detail-card">
                            <p>승리 시 최대 초과 할당량 : {overQuota.max} 개</p>
                            <p>승리 시 최소 초과 할당량 : {overQuota.min} $</p>
                            <p>승리 시 평균 초과 할당량 : {overQuota.avg} $</p>
                            <p>승리 시 중간 초과 할당량 : {overQuota.median} $</p>
                        </div>
                    </div>

                    {/* 부족 할당량 */}
                    <div className="quota-card">
                        <h4>실패시 부족한 할당량 통계</h4>
                        <p></p>
                        <div className="quota-detail-card">
                            <p>실패 시 최대 부족 할당량 : {shortageQuota.max} 개</p>
                            <p>실패 시 최소 부족 할당량 : {shortageQuota.min} $</p>
                            <p>실패 시 평균 부족 할당량 : {shortageQuota.avg} $</p>
                            <p>실패 시 중간 부족 할당량 : {shortageQuota.median} $</p>
                        </div>
                    </div>
                    {/* 플레이 시간 */}
                    <div className="quota-card">
                        <h4>플레이 시간 통계</h4>
                        <p></p>
                        <div className="quota-detail-card">
                            <p>최대 플레이 시간 : {playtimeStatistic.max} 분</p>
                            <p>최소 플레이 시간 : {playtimeStatistic.min} 분</p>
                            <p>평균 플레이 시간 : {playtimeStatistic.avg} 분</p>
                            <p>중간 플레이 시간 : {playtimeStatistic.median} 분</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashBoardPage;