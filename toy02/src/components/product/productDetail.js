import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Comment } from '../productComment/comment';
export const ProductDetail = () => {
    const { productNo } = useParams();
    const [productImages, setProductImages] = useState([]);
    const [productData, setProductData] = useState({});
    const [count, setCount] = useState({});

    const [priceList, setPriceList] = useState([]);

    const getProductInfo = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/product/productDetail/${productNo}`);
            const res2 = await axios.get(`http://localhost:8080/product/productAttr/${productNo}`);
            setProductData(res.data);
            setPriceList(res2.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchInventoryCounts = async () => {
            try {
                // priceList.map 내에서의 요청들이 모두 완료될 때까지 기다림
                await Promise.all(
                    priceList.map(async (attrNo, index) => {
                        const inventoryRes = await axios.get(`http://localhost:8080/product/productInventory/${attrNo.productAttrNo}`);
                        // 여기에서 얻은 데이터를 활용하여 추가 작업 수행 가능
                        console.log(inventoryRes.data.productInventoryCount);

                        // 기존 priceList에서 해당 index의 요소를 가져옴
                        const currentProduct = priceList[index];

                        // 가져온 요소에 새로운 정보를 추가하거나 업데이트
                        const updatedProduct = {
                            ...currentProduct,
                            productInventoryCount: inventoryRes.data.productInventoryCount
                        };

                        // 새로운 배열을 생성하여 기존 요소들과 업데이트한 요소를 포함시킴
                        setPriceList(prevPriceList => [
                            ...prevPriceList.slice(0, index),
                            updatedProduct,
                            ...prevPriceList.slice(index + 1)
                        ]);
                    })
                );
            } catch (error) {
                console.error(error);
            }
        };

        // priceList가 업데이트될 때마다 fetchInventoryCounts 함수 실행
        fetchInventoryCounts();

        if (priceList.length > 0) {
            setCounts(Array(priceList.length).fill(0));
        }
    }, [priceList.length === 0]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const getProductImage = async () => {
        setProductImages([])
        try {
            const res = await axios.get(`http://localhost:8080/attach/getImage/${productNo}`)
            const images = res.data;
            const keys = Object.keys(images);

            const imageArray = [];


            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                const imageUrl = images[key];
                const binaryString = atob(imageUrl);
                const binaryArray = new Uint8Array(binaryString.length);

                for (let i = 0; i < binaryString.length; i++) {
                    binaryArray[i] = binaryString.charCodeAt(i);
                }

                const blob = new Blob([binaryArray], { type: 'image/jpeg' });
                const image = URL.createObjectURL(blob);

                setProductImages(prevImages => {
                    if (prevImages.some(image => image.attachNo === key)) {
                        return prevImages;
                    }
                    return [
                        ...prevImages,
                        {
                            attachNo: key,
                            image: image
                        }
                    ];
                });

            }


        } catch {
            console.error('통신오류')
        }
    }

    const check = () => {
        console.log(productImages);
    }


    useEffect(() => {
        getProductImage();
        getProductInfo();
    }, [])

    const [counts, setCounts] = useState({});
    const [items, setItems] = useState({});

    const countPlus = (index) => {
        setCounts((prevCounts) => ({
            ...prevCounts,
            [index]: (prevCounts[index] || 0) + 1,
        }));
        console.log(counts);

    };

    const countMinus = (index) => {
        setCounts((prevCounts) => {
            const currentCount = prevCounts[index] || 0;
            return {
                ...prevCounts,
                [index]: currentCount > 0 ? currentCount - 1 : 0,
            };
        });
    };

    const [totalPrices, setTotalPrices] = useState({});

    useEffect(() => {
        const updatedTotalPrices = {};

        Object.keys(counts).forEach(index => {
            const totalPrice = priceList[index].productAttrPrice * counts[index];
            updatedTotalPrices[index] = totalPrice;

        });

        setTotalPrices(updatedTotalPrices);

    }, [counts]);


    const buyProduct = () => {

    }

    return (
        <div className='container'>
            <div className='row mt-4'>
                <div className='col bg-light p-4'>
                <h1>{productData.productName}</h1>
                </div>
            </div>
            <div className='row mt-4'>
                <div className='col'>
                </div>
            </div>
            <div className='row'>
                <div className='col-6'>

                    {productImages.length !== 0 ? (
                        <>
                            {/* 클릭하면 모달 이미시 상세 */}
                            {
                                <Slider {...settings}>
                                    {productImages.map((image, index) => (
                                        <div key={index} className="d-flex justify-content-center align-items-center" style={{ height: '20vh' }}>
                                            <img
                                                style={{ height: '30vh' }} // 20% of the viewport height
                                                src={image.image}
                                                alt={`Product Image ${index}`}
                                            />
                                        </div>
                                    ))}
                                </Slider>
                            }
                        </>
                    ) : (
                        <></>
                    )}

                </div>
                < div className='col-6'>
                    {priceList.map((productAttr, index) => (
                        <>
                            <h2>{productAttr.productSize} / {productAttr.productAttrPrice}원 / {productAttr.productInventoryCount}개 남음</h2>
                            <div className='col text-end'>
                                <button
                                    onClick={() => {
                                        if (counts[index] < productAttr.productInventoryCount) {
                                            countPlus(index);
                                        } else {
                                            console.log(productAttr.productInventoryCount, '재고 초과로 클릭 불가능');
                                        }
                                    }}
                                >+</button>
                                <span className='ms-2 me-2'>{counts[index] || 0}</span>
                                <button
                                    onClick={() => {
                                        if (counts[index] > 0) {
                                            countMinus(index);
                                        } else {
                                            // 0 미만으로 클릭 불가능
                                            console.log('0 미만으로 클릭 불가능');
                                        }
                                    }}
                                >-</button>
                            </div>
                        </>
                    ))}
                </div>
            </div>




            {Object.keys(totalPrices).map(index => (
                <div className='row' key={index}>
                    <div className='col text-end' >
                        {totalPrices[index] === 0 ? (
                            <></>
                        ) : (
                            <div className=''>
                                <hr />
                                <p>선택한 제품</p>
                                <p>{priceList[index].productSize} {counts[index]}개 총 가격: {totalPrices[index]} 원</p>
                            </div>
                        )}
                    </div>
                </div>
            ))}
            <hr />

            <div className='row mt-4'>
                <div className='col '>
                    <h2>{productData.productDetailTitle}</h2>
                </div>
            </div>
            <div className='row mt-2'>
                <label><h4>제품 설명</h4>  </label>
                <div className='col '>
                    <span >{productData.productDetailContent}</span>
                </div>
            </div>

            <div className='row mt-4'>
                <div className='col text-end'>
                    <button className='me-3' onClick={buyProduct}>구매하기</button>
                    <button>장바구니</button>
                </div>
            </div>




            <hr />
            <div className='row mt-2'>
                <div className='col '>
                    <Comment />
                </div>
            </div>

        </div>
    );
}