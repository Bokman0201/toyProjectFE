import { useEffect } from "react";

export const ProductImage = ({productNo}) => {

    useEffect(()=>{
        //console.log(productNo)
    },[])

    //이미지 가져와서 랜더링

    

//

    return (

        <>
            <img src='https://dummyimage.com/300x200/000/fff' style={{ width: '100%' }} />
        </>
    );
}