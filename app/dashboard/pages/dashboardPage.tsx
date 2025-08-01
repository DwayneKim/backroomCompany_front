'use client'
import React, { useEffect , useState } from "react";
import {
    getCollectItem,
    getPlaytimeStatistics,
    getQuotaStatistics, getSoldItem, getStoryStagePlaytimeStatistics,
    getSuccessStatistics
} from "@/app/api/v1/stage-stat/stageStat";
import '../css/DashBoardPage.css'
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

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
    const [version, setVersion] = useState<number | null>(null)
    const [minorVersion, setMinorVersion] = useState<number | null>(null)
    const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
    const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
    const [isLast, setIsLast] = useState<boolean | null>(null);
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
    const [successCollectItem, setSuccessCollectItem] = useState<DetailResponse>({
        min: 0,
        max: 0,
        avg: 0.0,
        median: 0,
    })
    const [successSoldItem, setSuccessSoldItem] = useState<DetailResponse>({
        min: 0,
        max: 0,
        avg: 0.0,
        median: 0,
    })

    const [failureCollectItem, setFailureCollectItem] = useState<DetailResponse>({
        min: 0,
        max: 0,
        avg: 0.0,
        median: 0,
    })
    const [failureSoldItem, setFailureSoldItem] = useState<DetailResponse>({
        min: 0,
        max: 0,
        avg: 0.0,
        median: 0,
    })
    const [storyStagePlaytimeStatistics, setStoryStagePlaytimeStatistics] = useState<DetailResponse>({
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
        startTime: Date | null,
        endTime: Date | null,
        majorVersion: number | null,
        minorVersion: number | null,
        isLast: boolean | null,
    ) => {

        const startIsoString = startTime ? startTime.toISOString().split("Z")[0] : null;
        const endIsoString = endTime ? endTime.toISOString().split("Z")[0] : null;

        const data = await getQuotaStatistics(
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

        setOverQuota(data.data.content.overQuota)
        setShortageQuota(data.data.content.shortageQuota)
    }

    const getSuccessStatisticsData = async (
        playerCount: number | null,
        difficulty: string | null,
        stageIndex: number | null,
        stageType: string | null,
        startTime: Date | null,
        endTime: Date | null,
        majorVersion: number | null,
        minorVersion: number | null,
        isLast: boolean | null,
    ) => {

        const startIsoString = startTime ? startTime.toISOString().split("Z")[0] : null;
        const endIsoString = endTime ? endTime.toISOString().split("Z")[0] : null;

        const data = await getSuccessStatistics(
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

        setSuccessStatistics(data.data.content)
    }

    const getPlaytimeStatisticsData = async (
        playerCount: number | null,
        difficulty: string | null,
        stageIndex: number | null,
        stageType: string | null,
        startTime: Date | null,
        endTime: Date | null,
        majorVersion: number | null,
        minorVersion: number | null,
        isLast: boolean | null,
    ) => {

        const startIsoString = startTime ? startTime.toISOString().split("Z")[0] : null;
        const endIsoString = endTime ? endTime.toISOString().split("Z")[0] : null;

        const data = await getPlaytimeStatistics(
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

        setPlaytimeStatistic(data.data.content)
    }

    const getCollectItemData = async (
        playerCount: number | null,
        difficulty: string | null,
        stageIndex: number | null,
        stageType: string | null,
        startTime: Date | null,
        endTime: Date | null,
        majorVersion: number | null,
        minorVersion: number | null,
        isLast: boolean | null,
    ) => {

        const startIsoString = startTime ? startTime.toISOString().split("Z")[0] : null;
        const endIsoString = endTime ? endTime.toISOString().split("Z")[0] : null;

        const data = await getCollectItem(
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

        setSuccessCollectItem(data.data.content.successCount)
        setFailureCollectItem(data.data.content.failureCount)
    }

    const getSoldItemData = async (
        playerCount: number | null,
        difficulty: string | null,
        stageIndex: number | null,
        stageType: string | null,
        startTime: Date | null,
        endTime: Date | null,
        majorVersion: number | null,
        minorVersion: number | null,
        isLast: boolean | null,
    ) => {

        const startIsoString = startTime ? startTime.toISOString().split("Z")[0] : null;
        const endIsoString = endTime ? endTime.toISOString().split("Z")[0] : null;

        const data = await getSoldItem(
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

        setSuccessSoldItem(data.data.content.successCount)
        setFailureSoldItem(data.data.content.failureCount)
    }

    const getStoryStagePlaytimeStatisticsData = async (
        playerCount: number | null,
        difficulty: string | null,
        stageIndex: number | null,
        stageType: string | null,
        startTime: Date | null,
        endTime: Date | null,
        majorVersion: number | null,
        minorVersion: number | null,
        isLast: boolean | null,
    ) => {
        const startIsoString = startTime ? startTime.toISOString().split("Z")[0] : null;
        const endIsoString = endTime ? endTime.toISOString().split("Z")[0] : null;

        const data = await getStoryStagePlaytimeStatistics(
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
        setStoryStagePlaytimeStatistics(data.data.content)
    }

    useEffect(() => {
        getQuotaData(playerCount, difficulty, stageIndex, stageType, selectedStartDate, selectedEndDate, version, minorVersion, isLast)
        getPlaytimeStatisticsData(playerCount, difficulty, stageIndex, stageType, selectedStartDate, selectedEndDate, version, minorVersion, isLast)
        getSuccessStatisticsData(playerCount, difficulty, stageIndex, stageType, selectedStartDate, selectedEndDate, version, minorVersion, isLast)
        getCollectItemData(playerCount, difficulty, stageIndex, stageType, selectedStartDate, selectedEndDate, version, minorVersion, isLast)
        getSoldItemData(playerCount, difficulty, stageIndex, stageType, selectedStartDate, selectedEndDate, version, minorVersion, isLast)
        getStoryStagePlaytimeStatisticsData(playerCount, difficulty, stageIndex, stageType, selectedStartDate, selectedEndDate,version, minorVersion, isLast)
    },[playerCount, difficulty, quotaSuccess, stageIndex, stageType, selectedStartDate, selectedEndDate, version, minorVersion, isLast])

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
                    {[0, 1, 2, 3, 4, 5,6].map(i => (
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
                            : isLast === true
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
                        selected={selectedStartDate}
                        onChange={(date) => setSelectedStartDate(date)}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="날짜 선택"
                        className="custom-datepicker"
                    />
                </div>
                <h3 className="separator">~</h3>
                <div className="date-picker-wrapper">
                    <DatePicker
                        selected={selectedEndDate}
                        onChange={(date) => setSelectedEndDate(date)}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="날짜 선택"
                        className="custom-datepicker"
                    />
                </div>
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
                    {/* 수집한 아이템 개수 */}
                    <div className="quota-card">
                        <h4>승리 시 수집한 아이템 개수 통계</h4>
                        <p></p>
                        <div className="quota-detail-card">
                            <p>최대 아이템 개수 : {successCollectItem.max} 개</p>
                            <p>최소 아이템 개수 : {successCollectItem.min} 개</p>
                            <p>평균 아이템 개수 : {successCollectItem.avg} 개</p>
                            <p>중간 아이템 개수 : {successCollectItem.median} 개</p>
                        </div>
                    </div>
                    {/* 승리 시 판매한 아이템 개수 */}
                    <div className="quota-card">
                        <h4>승리 시 판매한 아이템 개수 통계</h4>
                        <p></p>
                        <div className="quota-detail-card">
                            <p>최대 아이템 개수 : {successSoldItem.max} 개</p>
                            <p>최소 아이템 개수 : {successSoldItem.min} 개</p>
                            <p>평균 아이템 개수 : {successSoldItem.avg} 개</p>
                            <p>중간 아이템 개수 : {successSoldItem.median} 개</p>
                        </div>
                    </div>
                    {/* 수집한 아이템 개수 */}
                    <div className="quota-card">
                        <h4>패배 시 수집한 아이템 개수 통계</h4>
                        <p></p>
                        <div className="quota-detail-card">
                            <p>최대 아이템 개수 : {failureCollectItem.max} 개</p>
                            <p>최소 아이템 개수 : {failureCollectItem.min} 개</p>
                            <p>평균 아이템 개수 : {failureCollectItem.avg} 개</p>
                            <p>중간 아이템 개수 : {failureCollectItem.median} 개</p>
                        </div>
                    </div>
                    {/* 패배 시 판매한 아이템 개수 */}
                    <div className="quota-card">
                        <h4>패배 시 판매한 아이템 개수 통계</h4>
                        <p></p>
                        <div className="quota-detail-card">
                            <p>최대 아이템 개수 : {failureSoldItem.max} 개</p>
                            <p>최소 아이템 개수 : {failureSoldItem.min} 개</p>
                            <p>평균 아이템 개수 : {failureSoldItem.avg} 개</p>
                            <p>중간 아이템 개수 : {failureSoldItem.median} 개</p>
                        </div>
                    </div>
                    {/* 스토리 스테이지 별 플레이 시간 */}
                    <div className="quota-card">
                        <h4>스토리 스테이지 별 플레이 시간</h4>
                        <p></p>
                        <div className="quota-detail-card">
                            <p>최대 플레이 시간 : {storyStagePlaytimeStatistics.max} 분</p>
                            <p>최소 플레이 시간 : {storyStagePlaytimeStatistics.min} 분</p>
                            <p>평균 플레이 시간 : {storyStagePlaytimeStatistics.avg} 분</p>
                            <p>중간 플레이 시간 : {storyStagePlaytimeStatistics.median} 분</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default DashBoardPage;