import { NavLink } from "react-router-dom";

export const Footers=()=>{
    return(
        <div>
            <hr/>
            <NavLink to={'/insertProduct'}>상품등록</NavLink>
            <NavLink to={'/addCategory'}>카테고리 등록</NavLink>
            <h1> footer</h1>
        </div>
    );
}