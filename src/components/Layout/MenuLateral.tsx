import Menu from '../../../public/menu.json'
import Link from 'next/link'
import useAuth from '../../data/hook/useAuthData'

interface iMenu {
    id: number
    subTitulos?: object[]
    text: string
    icon?: string
    link?: string
    perm?: string
}

export default function MenuLateral() {

    const { user } = useAuth()

    function renderMenu() {

        let menu_list = []

        if(Menu.length > 0 && user != null) {
            Menu.map((v: iMenu, i) => {

                if(v.subTitulos && v.subTitulos.length > 0) {
                    let subMenu = []

                    v.subTitulos.map((v2: iMenu) => {

                        let icon = ''
                        if(v2.icon !== undefined) icon = v2.icon

                        if(user.cargo == 'admin' || user.cargo == v2.perm) {
                            subMenu.push(<li key={v2.id}>
                                <a href={v2.link}>
                                    {(icon != '')?(<i className={icon}></i>):null}
                                    {v2.text}
                                </a>
                            </li>)
                        }
                    })

                    if(user.cargo == 'admin' || user.cargo == v.perm) {
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
                    }
                } else {

                    if(user.cargo == 'admin' || user.cargo == v.perm) {

                        menu_list.push(<li key={v.id}>
                            <Link href={v.link}>
                                <a>
                                {(<i className={v.icon}></i>) ?? null}
                                {v.text}
                                </a>
                            </Link></li>)
                    }
                }
            })
        }
        
        return menu_list;
    }

    return (
        <aside className="menu-sidebar d-none d-lg-block">
            <div className="logo">
                <a href="/">
                    <img src="/images/icon/logo.png" alt="Cool Admin" />
                </a>
            </div>
            <div className="menu-sidebar__content">
                <nav className="navbar-sidebar">
                    <ul className="list-unstyled navbar__list">
                        {renderMenu()}
                    </ul>
                </nav>
            </div>
        </aside>
    )
}