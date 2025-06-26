'use client'
import React, { useEffect , useState } from "react";
import {getItemStatistics} from "@/app/api/v1/stage-stat/stageStat";
import "../css/ItemPage.css"

interface ItemDataResponse{
    difficulty: string;
    stageIndex: number;
    items: DetailItemDataResponse[]
}

interface DetailItemDataResponse{
    description: string;
    average: number;
    max: number;
    min: number;
    median: number;
}

const StatisticPage = () => {

    const [playerCount, setPlayerCount] = useState<number | null>(null)
    const [difficulty, setDifficulty] = useState<string | null>(null)
    const [stageIndex, setStageIndex] = useState<number | null>(null)
    const [boughtTime, setBoughtTime] = useState<string | null>(null)
    const [itemData, setItemData] = useState<ItemDataResponse>({
        difficulty: "NONE",
        stageIndex: -1,
        items: [],
    });

    const getItemData = async (
        playerCount: number | null,
        difficulty: string | null,
        stageIndex: number | null
    ) => {
        console.log("test")
        const data = await getItemStatistics(
            playerCount,
            difficulty,
            stageIndex,
            null,
            null,
            null
        )
        console.log(data)
        setItemData(data.data.content)
    }

    useEffect(() => {
        getItemData(playerCount, difficulty, stageIndex)
    },[playerCount, difficulty, stageIndex])

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
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>

                    <option value="3">3</option>
                </select>
                <select
                    value={boughtTime ?? ''}
                    onChange={(e) => setBoughtTime(e.target.value === '' ? null : e.target.value)}
                >
                    <option value="">아이템 통계</option>
                    <option value="0">스테이지 진입 전</option>
                    <option value="1">스테이지 진입 후</option>
                </select>
            </div>

            <div className="stat-list">
                <p className="stat-empty">조회된 결과 : {itemData.items.length} 개</p>
                {itemData.items.length === 0 ? (
                    <p className="stat-empty">데이터가 없습니다</p>
                ) : (
                    itemData.items.map((item, index) => (
                        <div key={index} className="stat-card">
                            <p><strong>아이템 이름:</strong> {item.description}</p>
                            <p><strong>아이템 구매 타이밍:</strong> {item.description == 'BEFORE' ? '스테이지 진입 전' : '스테이지 진입 후' }</p>
                            <p><strong>평균 값 :</strong> {item.average}</p>
                            <p><strong>최대치:</strong> {item.max}</p>
                            <p><strong>최소치:</strong> {item.min}</p>
                            <p><strong>중간 값:</strong> {item.median}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default StatisticPage;