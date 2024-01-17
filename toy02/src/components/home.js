import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import "./Home.css";

export const Home = () => {
    const [productList, setProductList] = useState([
        { productNo: 1 },
        { productNo: 2 },
        { productNo: 3 },
        { productNo: 4 },
        { productNo: 5 },
        { productNo: 6 },
        { productNo: 7 },
        { productNo: 8 },
        { productNo: 9 },
    ]);


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

                    <div key={index} className='col-4 p-2 border '>
                        <img src='https://dummyimage.com/300x200/000/fff' alt={`Image ${index}`} style={{ width: '100%' }} />
                        <div><span>index</span></div>
                    </div>
                ))}
            </div>
        </div>

    );
}