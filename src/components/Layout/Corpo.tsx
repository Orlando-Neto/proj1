import Conteudo from "./Conteudo";
import MenuLateral from "./MenuLateral";
import MenuMobile from "./MenuMobile";
import Scripts from "./Scripts";

export default function Corpo(props: any) {

    return (
        <div className="">
            <div className="page-wrapper">
            
                <MenuMobile />
                
                <MenuLateral />
                
                <Conteudo titulo={props?.titulo}>
                    {props?.children}
                </Conteudo>
            </div>

            <Scripts />
        </div>
    )
}