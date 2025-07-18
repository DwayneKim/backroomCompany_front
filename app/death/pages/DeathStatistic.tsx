'use client'
import React, { useEffect , useState } from "react";
import {getAvgDeathStatistics, getDeathStatistics} from "@/app/api/v1/stage-stat/stageStat";
import "../css/DeathPage.css"

interface DeathData {
    description: string
    average: number
    max: number
    min: number
    median: number
}

interface DeathStatistics {
    difficulty: string
    stageIndex: number
    deathData: DeathData[]
}

const DeathStatistic = () => {

    const [playerCount, setPlayerCount] = useState<number | null>(null)
    const [difficulty, setDifficulty] = useState<string | null>(null)
    const [stageIndex, setStageIndex] = useState<number | null>(null)
    const [startTime, setStartTime] = useState<string | null>(null)
    const [endTime, setEndTime] = useState<string | null>(null)
    const [deathStatistics, setDeathStatistics] = useState<DeathStatistics>({
        difficulty : 'NONE',
        stageIndex : -1,
        deathData : []
    })
    const [avgDeathStat, setAvgDeathStat] = useState<number | null>(0.00)
    const [version, setVersion] = useState<number | null>(null)

    const getDeathStatisticsData = async (
        playerCount: number | null,
        difficulty: string | null,
        stageIndex: number | null,
        startTime: string | null,
        endTime: string | null,
        version: number | null
    ) => {
        console.log("test")
        const data = await getDeathStatistics(
            playerCount,
            difficulty,
            stageIndex,
            startTime,
            endTime,
            version,
        )
        setDeathStatistics(data.data.content)
    }

    const getAvgDeathStatisticsData = async (
        playerCount: number | null,
        difficulty: string | null,
        stageIndex: number | null,
        version: number | null
    ) => {
        console.log("test")
        const data = await getAvgDeathStatistics(
            playerCount,
            difficulty,
            stageIndex,
            version,
        )
        console.log(data.data.content)
        setAvgDeathStat(data.data.content)
    }

    useEffect(() => {
        getDeathStatisticsData(playerCount, difficulty, stageIndex, startTime, endTime, version)
        getAvgDeathStatisticsData(playerCount, difficulty, stageIndex, version)
    },[playerCount, difficulty, stageIndex, endTime, startTime, version])

    return (
        <div className="stat-container">
            <h1 className="stat-title">사망 통계</h1>

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
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
                <select
                    value={version ?? ''}
                    onChange={(e) => setVersion(e.target.value === 'NONE' ? null : Number(e.target.value))}
                >
                    <option value="NONE">버전 선택</option>
                    <option value={-1}>베타 버전</option>
                    <option value={20000}>정식 출시 버전</option>
                </select>
            </div>

            <div className="death-statistics-wrapper">
                <p className="death-statistics-title">
                    난이도: {deathStatistics.difficulty} / 스테이지: {deathStatistics.stageIndex != -1 ? stageIndex : "전체"}
                </p>
                <p className="death-statistics-title">
                    평균 사망 수 :  {avgDeathStat} 명
                </p>
                <p className="death-statistics-title">
                    조회된 결과: {deathStatistics.deathData.length}개
                </p>

                <div className="death-statistics-list">
                    {deathStatistics.deathData.map((item, index) => (
                        <div key={index} className="death-statistics-card">
                            <p><strong>사망 원인:</strong> {item.description}</p>
                            <p><strong>사망 평균값:</strong> {item.average}</p>
                            <p><strong>사망 최대값:</strong> {item.max}</p>
                            <p><strong>사망 최소값:</strong> {item.min}</p>
                            <p><strong>사망 중위값:</strong> {item.median}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DeathStatistic;