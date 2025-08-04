'use client'
import React, { useEffect , useState } from "react";
import {getItemBeforeStatistics} from "@/app/api/v1/stage-stat/stageStat";
import "../css/ItemPage.css"
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

interface ItemDataResponse{
    buyingItemCount: number;
    detailItemStatisticSummaryResponseData: DetailItemStatisticSummaryResponseData[]
}

interface DetailItemStatisticSummaryResponseData{
    itemName: string;
    avg: number;
    max: number;
    min: number;
    median: number;
}

const ItemStatisticPage = () => {

    const [playerCount, setPlayerCount] = useState<number | null>(null)
    const [difficulty, setDifficulty] = useState<string | null>(null)
    const [stageIndex, setStageIndex] = useState<number | null>(null)
    const [boughtTime, setBoughtTime] = useState<string | null>(null)
    const [version, setVersion] = useState<number | null>(null)
    const [minorVersion, setMinorVersion] = useState<number | null>(null)
    const [isLast, setIsLast] = useState<boolean | null>(null);
    const [itemData, setItemData] = useState<ItemDataResponse>({
        buyingItemCount: 0.00,
        detailItemStatisticSummaryResponseData: [],
    });
    const [startTime, setStartTime] = useState<Date | null>(null)
    const [endTime, setEndTime] = useState<Date | null>(null)
    const [stageType, setStageType] = useState<string | null>(null)


    const getItemData = async (
        playerCount: number | null,
        difficulty: string | null,
        stageIndex: number | null,
        stageType: string | null,
        startTime: Date | null,
        endTime: Date | null,
        boughtTime: string | null,
        majorVersion: number | null,
        minorVersion: number | null,
        isLast: boolean | null,
    ) => {
        const startIsoString = startTime ? startTime.toISOString().split("Z")[0] : null;
        const endIsoString = endTime ? endTime.toISOString().split("Z")[0] : null;
        console.log("test")
        const data = await getItemBeforeStatistics(
            playerCount,
            difficulty,
            stageIndex,
            stageType,
            startIsoString,
            endIsoString,
            boughtTime,
            majorVersion,
            minorVersion,
            isLast,
        )
        console.log(data)
        setItemData(data.data.content)
    }

    useEffect(() => {
        getItemData(playerCount, difficulty, stageIndex, stageType, startTime, endTime, boughtTime, version, minorVersion, isLast)
    },[playerCount, difficulty, stageIndex,stageType, startTime, endTime, boughtTime, version, minorVersion, isLast])

    return (
        <div className="stat-container">
            <h1 className="stat-title">스테이지 시작 전 아이템 통계</h1>

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
                    value={boughtTime ?? ""}
                    onChange={(e) => setBoughtTime(e.target.value === '' ? null : e.target.value)}
                >
                    <option value="">아이템 통계</option>
                    <option value="BEFORE">스테이지 진입 전</option>
                    <option value="AFTER">스테이지 진입 후</option>
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
            <div className="stat-list">
                <p className="stat-empty">조회된 결과 : {itemData.detailItemStatisticSummaryResponseData.length} 개</p>
                <p className="stat-empty">{boughtTime == 'BEFORE' ? '스테이지 진입 전' : '스테이지 진입 후'} 아이템 평균 구매 개수 : {itemData.buyingItemCount} 개</p>
                {itemData.detailItemStatisticSummaryResponseData.length === 0 ? (
                    <p className="stat-empty">데이터가 없습니다</p>
                ) : (
                    itemData.detailItemStatisticSummaryResponseData.map((item, index) => (
                        <div key={index} className="stat-card">
                            <p><strong>아이템 이름:</strong> {item.itemName}</p>
                            <p><strong>평균 구매 개수 :</strong> {item.avg} 개</p>
                            <p><strong>최대 구매 개수:</strong> {item.max} 개</p>
                            <p><strong>최소 구매 개수:</strong> {item.min} 개</p>
                            <p><strong>중간 구매 개수:</strong> {item.median} 개</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default ItemStatisticPage;