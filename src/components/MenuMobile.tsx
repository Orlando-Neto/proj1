import Menu from '../../public/menu.json'

interface iMenu {
    id: number,
    subTitulos?: object[],
    text: string,
    icon?: string,
    link?: string
}

export default function MenuMobile() {

    function renderMenu() {

        let menu_list = []
        if(Menu.length > 0) {
            Menu.map((v: iMenu, i) => {

                if(v.subTitulos && v.subTitulos.length > 0) {
                    let subMenu = []

                    v.subTitulos.map((v2: iMenu) => {

                        let icon = ''
                        if(v2.icon !== undefined) icon = v2.icon

                        subMenu.push(<li key={v2.id}>
                            <a href={v2.link}>
                                {(icon != '')?(<i className={icon}></i>):null}
                                {v2.text}
                            </a>
                        </li>)
                    })

                    menu_list.push(
                        <li className="has-sub" key={v.id}>
                            <a className="js-arrow" key={i} href="#">
                                {(<i className={v.icon}></i>)??null}
                                {v.text}
                            </a>
                            <ul className="list-unstyled navbar__sub-list js-sub-list">
                                {subMenu}
                            </ul>
                        </li>)
                } else {

                    menu_list.push(<li key={v.id}>
                        <a href={v.link}>
                            {(<i className={v.icon}></i>) ?? null}
                            {v.text}
                        </a></li>)
                }
            })
        }

        return menu_list
    }

    return (
        <>
            <header className="header-mobile d-block d-lg-none">
                <div className="header-mobile__bar">
                    <div className="container-fluid">
                        <div className="header-mobile-inner">
                            <a className="logo" href="index.html">
                                <img src="images/icon/logo.png" alt="CoolAdmin" />
                            </a>
                            <button className="hamburger hamburger--slider" type="button">
                                <span className="hamburger-box">
                                    <span className="hamburger-inner"></span>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                <nav className="navbar-mobile">
                    <div className="container-fluid">
                        <ul className="navbar-mobile__list list-unstyled">
                            {renderMenu()}
                        </ul>
                    </div>
                </nav>
            </header>
        </>
    )
}