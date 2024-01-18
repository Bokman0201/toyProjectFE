import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userState } from '../../recoliState';

export const AddProduct = ({ onNext, onPrev, handleInfoSubmit, productInfos }) => {
    const [user,setUser] = useRecoilState(userState);

    const [productInfo, setProductInfo] = useState({
        productName: '',
        productPrice:0,
        productSeller:'',
     });
    const [tagList, setTagList] = useState([]);
    const navigator = useNavigate();


    const handleNextPage = () => {
        const data = { productDto: productInfo, tagList: tagList }
        console.log(data);
        handleInfoSubmit(data);

        console.log("??", productInfos)
        onNext();
    }

    useEffect(()=>{
        if(user){
            setProductInfo({...productInfo,
                productSeller:user.memberId
            })
        }
        if(productInfos){
            setProductInfo(productInfos.productDto);
            setTagList(productInfos.tagList)
        }
    },[productInfos,user])


    const handleProductChange = (e) => {

        setProductInfo({
            ...productInfo,
            [e.target.name]: e.target.value
        })
    }
    const [tagName, setTagName] = useState('');

    const handleTagChange = (e) => {
        setTagName(e.target.value);
    }

    const handleAddTag = (e) => {

        if (tagName !== '' && !tagList.includes(tagName)) {
            console.log('태그 이름:', tagName);
            setTagList([...tagList, tagName]);
        }
        setTagName("");
    };

    const handleRemoveTag = (target) => {
        const updateList = tagList.filter(tag => tag !== target);
        setTagList(updateList);
    }

    const handleAddProduct = () => {
        // const result = window.confirm("상품을 등록 하실거냐?")

        // if (result) {
        //     axios({
        //         url: `http://localhost:8080/product/addProduct`,
        //         method: 'post',
        //         data: data
        //     }).then(res => {
        //         console.log(res.data)
        //         const productNo = res.data
        //         alert("등록완!")
        //         navigator(`/productDetail/${productNo}`)

        //     }).catch();
        //}
    }

    return (
        <div className="">
            <div className='page'>



                <div className="row mt-4">
                    <div className="col">
                        <label>상품명</label>
                        <input name='productName'
                          value={productInfo.productName}
                          onChange={handleProductChange}  className="form-control" type="text" />
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col">
                        <label>가격</label>
                        <input className=" form-control"
                        value={productInfo.productPrice}
                        name='productPrice' onChange={handleProductChange} type="number" />
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col ">
                        <label>tag</label>

                        <div className="input-group">
                            <input id='tagName' onChange={handleTagChange} value={tagName} className=" form-control" type="text" />
                            <button onClick={handleAddTag}>+</button>
                        </div>
                        <div className='mt-2'>
                            {tagList.map((tag, index) => (
                                <React.Fragment key={index}>
                                    <span className="badge text-bg-info " >
                                        {tag}
                                    </span>
                                    <button className='btn btn-outline-light' onClick={() => handleRemoveTag(tag)}>x</button>
                                </React.Fragment>
                            ))}</div>
                    </div>
                </div>
                <div className="row mt-4">
                <div className="col text-end">
                <button type="button" className="btn btn-warning btn-prev" onClick={onPrev}>
                        이전단계
                    </button>
                    <button type="button" className="btn btn-primary btn-next ms-2" onClick={handleNextPage}>
                        다음단계
                    </button>
                    </div>
                </div>
            </div>




        </div>


    );
};