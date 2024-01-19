import { useState } from "react";
import { AddProduct } from "./addPeoduct";
import { ProductDetail } from "./addProductDetail";
import { Catagory } from "./catagory";
import { useRecoilState } from "recoil";
import { userState } from "../../recoliState";

export const InsertProduct = () => {

    const [user,setUser] = useRecoilState(userState);
    

    const [productInfos, setProductInfos] = useState({
        productDto: {
            productName: '',
            productPrice: 0,
            productSeller:"",
            categoryId: "",
        },
        tagList: []
    });
    const [categoryNo, setCategoryNo] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);


    const handleInfoSubmit = (info) => {
        setProductInfos(prevProductInfos => ({
            ...prevProductInfos,
            productDto: {
                ...prevProductInfos.productDto,
                ...info.productDto // 업데이트할 부분만 병합
            },
            tagList: info.tagList // tagList도 병합
        }));
    };
    const categorySelect = (id) => {
        setCategoryNo(id)
        setProductInfos(prevProductInfos => ({
            ...prevProductInfos,
            productDto: {
                ...prevProductInfos.productDto,
                categoryId: id,
                productSeller:user.memberId
            }
        }));
    };
const nextPage = () => {
    setCurrentPage(currentPage + 1);
};

const prevPage = () => {
    setCurrentPage(currentPage - 1);
};

const check = () => {
    console.log(productInfos);
}

return (
    <div className="container">
        <button onClick={check}>check</button>

        <div className="row mt-4">
            <div className="col bg-light p-4">
                <h2>상품 등록</h2>
            </div>
        </div>
        <div className="row mt-4">
            <div className="col">
                {currentPage === 1 && <Catagory onNext={nextPage} onPrev={prevPage} categorySelect={categorySelect} categoryNo={categoryNo} />}
                {currentPage === 2 && <AddProduct onNext={nextPage} onPrev={prevPage} handleInfoSubmit={handleInfoSubmit} productInfos={productInfos} />}
                {currentPage === 3 && <ProductDetail onPrev={prevPage} />}
            </div>
        </div>
    </div>

)

}