import React, { useEffect, useRef, useState } from 'react';

export const AddProduct = () => {
    const [productInfo, setProductInfo] = useState({});

    const handleProductChange =(e)=>{

        setProductInfo({...productInfo,
        [e.target.name]: e.target.value
        })
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
                <div className="col">
                <button className='btn btn-primary w-100'>등록</button>
                </div>
            </div>
        </div>
    );
};