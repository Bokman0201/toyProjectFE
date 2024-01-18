import { useState } from "react";
import { AddProduct } from "./addPeoduct";
import { ProductDetail } from "./addProductDetail";
import { Catagory } from "./catagory";

export const InsertProduct = () => {

    const [productInfos, setProductInfos] = useState({
        productDto: {
            productName: '',
            productPrice: 0,
            productSeller: '',
        },
        tagList: []
    });

    const [currentPage, setCurrentPage] = useState(1);


    const handleInfoSubmit = (info) => {
        setProductInfos(info);
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
                    {currentPage === 1 && <Catagory onNext={nextPage} onPrev={prevPage} />}
                    {currentPage === 2 && <AddProduct onNext={nextPage} onPrev={prevPage} handleInfoSubmit={handleInfoSubmit} productInfos={productInfos} />}
                    {currentPage === 3 && <ProductDetail onPrev={prevPage} />}
                </div>
            </div>
        </div>

    )

}