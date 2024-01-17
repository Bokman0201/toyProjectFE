import { useParams } from 'react-router-dom';

export const ProductDetail=()=>{
    const { productNo } = useParams();

    const getProductInfo=()=>{
        
    }

    return(
        <div>
            {productNo}
        </div>
    );
}