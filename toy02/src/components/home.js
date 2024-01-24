import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import "./Home.css";
import axios from 'axios';
import { ProductImage } from '../productImage';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
    const [productList, setProductList] = useState([

    ]);

    const navigator = useNavigate();

    useEffect(()=>{
        getProductList();
    },[])

    const getProductList = async()=>{
        try{
            const res =await axios.get(`http://localhost:8080/product/productList`)
            console.log(res.data)
            setProductList(res.data);
        } catch{}

    }
    const moveDetail =(no)=>{
        console.log(no)
        navigator(`/productDetail/${no}`);
    }


    return (
        <div className="container">
            <div className="row mt-4">
                <div className="col-6 offset-3">
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="검색대상"
                        />
                        <Button variant="outline-secondary" id="button-addon2">
                            search
                        </Button>
                    </InputGroup>
                </div>
            </div>
            <div className='row'>
                {productList.map((product, index) => (

                    <div key={index} className='col-4 p-2 border ' onClick={()=>moveDetail(product.productNo)}>

                        <ProductImage productNo={product.productNo}/>
                        {/* <img src='https://dummyimage.com/300x200/000/fff' alt={`Image ${index}`} style={{ width: '100%' }} /> */}
                        <div><span>{product.productName}</span></div>
                    </div>
                ))}
            </div>
        </div>

    );
}