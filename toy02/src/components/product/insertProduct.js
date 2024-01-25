import { useEffect, useState } from "react";
import { AddProduct } from "./addPeoduct";
import { ProductDetail } from "./addProductDetail";
import { Catagory } from "./catagory";
import { useRecoilState } from "recoil";
import { userState } from "../../recoliState";
import axios from "axios";
import { AddPeoductAttr } from "./addProductAttr";

export const InsertProduct = () => {

    const [user, setUser] = useRecoilState(userState);

    const [attach, setAttach] = useState({});
    const [productDetailDto, setProductDetailDto] = useState({});

    const [dataRequestVO, setDataRequestVO ]= useState([]);


    const [productInfos, setProductInfos] = useState({
        productDto: {
            productName: '',
            productPrice: 0,
            productSeller: "",
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
                productSeller: user.memberId
            }
        }));
    };

    const getImages = (images) => {
        setAttach(images)
        // setProductInfos({...productInfos,
        //     imageVO:{
        //         attach:images
        //     }
        // })
    }

    const getProductDetail = (dto) => {
        setProductDetailDto(dto)
        console.log("??", dto)
        setProductInfos({
            ...productInfos,
            productDetailDto: productDetailDto
        })

    }
    
    const getProductDataList = (list)=>{
        setDataRequestVO(list);

      
        console.log("VO",dataRequestVO)
    }
    useEffect(()=>{
        setProductInfos({...productInfos, dataRequestVO:dataRequestVO})
    },[dataRequestVO])

    const handleAddProduct = () => {
        const result = window.confirm("상품을 등록 하실거냐?")


        if (result) {
        
            axios({
                url: `http://localhost:8080/product/addProduct`,
                method: 'post',
                data: productInfos,

            }).then(res => {
                console.log(res.data)
                const productNo = res.data

                const formData = new FormData();

                for (let i = 0; i < attach.length; i++) {
                    formData.append("attach", attach[i]);
                }
                
                formData.append("productNo", productNo);
                
                axios({
                    url: 'http://localhost:8080/product/image',
                    method: 'post',
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then(res=>{
                    console.log(res.status)
                    alert("등록완!")
                    //navigator(`/productDetail/${productNo}`)
                }).catch();

            }).catch();
        }
    }


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
            <div className="row mt-4">
                <div className="col bg-light p-4">
                    <h2>상품 등록</h2>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    {currentPage === 1 && <Catagory onNext={nextPage} onPrev={prevPage} categorySelect={categorySelect} categoryNo={categoryNo} />}
                    {currentPage === 2 && <AddProduct onNext={nextPage} onPrev={prevPage} handleInfoSubmit={handleInfoSubmit} productInfos={productInfos} />}
                    {currentPage === 3 && <AddPeoductAttr onNext={nextPage} onPrev={prevPage}  getProductDataList={getProductDataList} />}
                    {currentPage === 4 && <ProductDetail onPrev={prevPage} getImages={getImages} getProductDetail={getProductDetail} handleAddProduct={handleAddProduct} />}
                </div>
            </div>
        </div>

    )

}