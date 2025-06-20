import '../css/TopMenu.css'

const TopMenuPage = () => {

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">Backroom Company 통계 시스템</div>
                <ul className="navbar-menu">
                    <li><a href="/">전체 통계</a></li>
                    <li><a href="/death">사망 원인 별 통계</a></li>
                    <li><a href="/item">아이템 통계</a></li>
                </ul>
            </div>
        </nav>
    )
}

export default TopMenuPage;