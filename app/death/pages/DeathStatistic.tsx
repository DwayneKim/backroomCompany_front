'use client'
import React, { useEffect , useState } from "react";
import {getAvgDeathStatistics, getDeathStatistics} from "@/app/api/v1/stage-stat/stageStat";
import "../css/DeathPage.css"
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

interface DeathData {
    description: string
    sum: number
}

interface DeathStatistics {
    difficulty: string
    stageIndex: number
    deathData: DeathData[]
}

interface TotalDeathResponse{
    totalUser: number | null
    avgDeathCount: number | null
}

const DeathStatistic = () => {

    const [playerCount, setPlayerCount] = useState<number | null>(null)
    const [difficulty, setDifficulty] = useState<string | null>(null)
    const [stageIndex, setStageIndex] = useState<number | null>(null)
    const [startTime, setStartTime] = useState<Date | null>(null)
    const [endTime, setEndTime] = useState<Date | null>(null)
    const [version, setVersion] = useState<number | null>(null)
    const [minorVersion, setMinorVersion] = useState<number | null>(null)
    const [isLast, setIsLast] = useState<boolean | null>(null);
    const [stageType, setStageType] = useState<string | null>(null)
    const [deathStatistics, setDeathStatistics] = useState<DeathStatistics>({
        difficulty : 'NONE',
        stageIndex : -1,
        deathData : []
    })
    const [avgDeathStat, setAvgDeathStat] = useState<TotalDeathResponse>({
        totalUser: 0,
        avgDeathCount: 0,
    })

    const getDeathStatisticsData = async (
        playerCount: number | null,
        difficulty: string | null,
        stageIndex: number | null,
        stageType: string | null,
        startTime: Date | null,
        endTime: Date | null,
        majorVersion: number | null,
        minorVersion: number | null,
        isLast: boolean | null
    ) => {
        console.log("minorVersion", minorVersion)

        const startIsoString = startTime ? startTime.toISOString().split("Z")[0] : null;
        const endIsoString = endTime ? endTime.toISOString().split("Z")[0] : null;

        const data = await getDeathStatistics(
            playerCount,
            difficulty,
            stageIndex,
            stageType,
            startIsoString,
            endIsoString,
            majorVersion,
            minorVersion,
            isLast,
        )

        console.log(data)

        setDeathStatistics(data.data.content)
    }

    const getAvgDeathStatisticsData = async (
        playerCount: number | null,
        difficulty: string | null,
        stageIndex: number | null,
        stageType: string | null,
        startTime: Date | null,
        endTime: Date | null,
        majorVersion: number | null,
        minorVersion: number | null,
        isLast: boolean | null
    ) => {
        console.log("test")
        const startIsoString = startTime ? startTime.toISOString().split("Z")[0] : null;
        const endIsoString = endTime ? endTime.toISOString().split("Z")[0] : null;

        const data = await getAvgDeathStatistics(
            playerCount,
            difficulty,
            stageIndex,
            stageType,
            startIsoString,
            endIsoString,
            majorVersion,
            minorVersion,
            isLast,
        )
        console.log(data.data.content)
        setAvgDeathStat(data.data.content)
    }

    useEffect(() => {
        getDeathStatisticsData(playerCount, difficulty, stageIndex, stageType, startTime, endTime, version, minorVersion, isLast)
        getAvgDeathStatisticsData(playerCount, difficulty, stageIndex, stageType, startTime, endTime, version, minorVersion, isLast)
    },[playerCount, difficulty, stageIndex, stageType, startTime, endTime, version, minorVersion, isLast])

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
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
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
                <input
                    type="number"
                    value={minorVersion ?? ''} // null 또는 숫자 → 항상 controlled
                    onChange={(e) => {
                        const value = e.target.value;
                        if (value === '') {
                            setMinorVersion(null);
                        } else if (value.length <= 3) {
                            setMinorVersion(Number(value));
                        }
                    }}
                    placeholder="마이너"
                    min={0}
                    max={999}
                />
                <select
                    value={
                        isLast === null
                            ? ''
                            : isLast
                                ? 'true'
                                : 'false'
                    }
                    onChange={(e) => {
                        const value = e.target.value;
                        if (value === '') {
                            setIsLast(null);
                        } else if (value === 'true') {
                            setIsLast(true);
                        } else {
                            setIsLast(false);
                        }
                    }}
                >
                    <option value="">전체 조회</option>
                    <option value="true">마이너 버전 부터 조회</option>
                    <option value="false">마이너 버전 까지 조회</option>
                </select>
            </div>
            <div className="date-range-container">
                <div className="date-picker-wrapper">
                    <DatePicker
                        selected={startTime}
                        onChange={(date) => setStartTime(date)}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="날짜 선택"
                        className="custom-datepicker"
                    />
                </div>
                <h3 className="separator">~</h3>
                <div className="date-picker-wrapper">
                    <DatePicker
                        selected={endTime}
                        onChange={(date) => setEndTime(date)}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="날짜 선택"
                        className="custom-datepicker"
                    />
                </div>
            </div>

            <div className="death-statistics-wrapper">
                <p className="death-statistics-title">
                    난이도: {deathStatistics.difficulty} / 스테이지: {deathStatistics.stageIndex != -1 ? stageIndex : "전체"}
                </p>
                <p className="death-statistics-title">
                    총 플레이한 유저 수 :  {avgDeathStat.totalUser} 명
                </p>
                <p className="death-statistics-title">
                    평균 사망 수 :  {avgDeathStat.avgDeathCount} 명
                </p>
                <p className="death-statistics-title">
                    조회된 결과: {deathStatistics.deathData.length}개
                </p>

                <div className="death-statistics-list">
                    {deathStatistics.deathData.map((item, index) => (
                        <div key={index} className="death-statistics-card">
                            <p><strong>사망 원인:</strong> {item.description}</p>
                            <p><strong>총 사망 횟수:</strong> {item.sum}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DeathStatistic;