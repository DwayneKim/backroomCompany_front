'use client'
import React, { useEffect , useState } from "react";
import {getItemBeforeStatistics} from "@/app/api/v1/stage-stat/stageStat";
import "../css/ItemPage.css"

interface ItemDataResponse{
    buyingItemCount: number;
    itemStatisticSummaryResponseData: ItemStatisticSummaryResponseData[]
}

interface ItemStatisticSummaryResponseData{
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
    const [itemData, setItemData] = useState<ItemDataResponse>({
        buyingItemCount: 0.00,
        itemStatisticSummaryResponseData: [],
    });

    const getItemData = async (
        playerCount: number | null,
        difficulty: string | null,
        stageIndex: number | null,
        boughtTime: string | null,
    ) => {
        console.log("test")
        const data = await getItemBeforeStatistics(
            playerCount,
            difficulty,
            stageIndex,
            boughtTime
        )
        console.log(data)
        setItemData(data.data.content)
    }

    useEffect(() => {
        getItemData(playerCount, difficulty, stageIndex, boughtTime)
    },[playerCount, difficulty, stageIndex, boughtTime])

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
                </select>
                <select
                    value={boughtTime ?? ""}
                    onChange={(e) => setBoughtTime(e.target.value === '' ? null : e.target.value)}
                >
                    <option value="">아이템 통계</option>
                    <option value="BEFORE">스테이지 진입 전</option>
                    <option value="AFTER">스테이지 진입 후</option>
                </select>
            </div>

            <div className="stat-list">
                <p className="stat-empty">조회된 결과 : {itemData.itemStatisticSummaryResponseData.length} 개</p>
                <p className="stat-empty">{boughtTime == 'BEFORE' ? '스테이지 진입 전' : '스테이지 진입 후'} 아이템 평균 구매 개수 : {itemData.buyingItemCount} 개</p>
                {itemData.itemStatisticSummaryResponseData.length === 0 ? (
                    <p className="stat-empty">데이터가 없습니다</p>
                ) : (
                    itemData.itemStatisticSummaryResponseData.map((item, index) => (
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