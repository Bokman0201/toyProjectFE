import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AddProduct = () => {
    const [productInfo, setProductInfo] = useState({});
    const [tagList, setTagList] = useState([]);
    const navigator = useNavigate();

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

    const handleRemoveTag =(target)=>{
        const updateList = tagList.filter(tag => tag !== target);
        setTagList(updateList);
    }

    const handleAddProduct=()=>{
        const data = {productDto: productInfo, tagList:tagList}
        console.log(data);

        const result = window.confirm("상품을 등록 하실거냐?")

        if(result){
            axios({
            url:`http://localhost:8080/product/addProduct`,
            method:'post',
            data:data
            }).then(res=>{
                console.log(res.data)
                const productNo = res.data
                alert("등록완!")
                navigator(`/productDetail/${productNo}`)
                
            }).catch();
        }
    }

    return (
        <div className="container">
            <div className="row mt-4">
                <div className="col ">
                    <div className="text-center">
                        <h4>상품등록</h4>
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    <input className="form-control" type="file" />
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    <label>상품명</label>
                    <input name='productName' onChange={handleProductChange} className="form-control" type="text" />
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    <label>가격</label>
                    <input className=" form-control" type="number" />
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
                            <button className='btn btn-outline-light' onClick={()=>handleRemoveTag(tag)}>x</button>
                            </React.Fragment>
                        ))}</div>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    <button className='btn btn-primary w-100' onClick={handleAddProduct}>등록</button>
                </div>
            </div>
        </div>
    );
};