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
            const res = await axios.get(`http://localhost:8080/product/productDetail/${productNo}`)
            const res2 = await axios.get(`http://localhost:8080/product/productAttr/${productNo}`)
            setProductData(res.data)
            setPriceList(res2.data)
            //재고 수량 가져오기
            //가져와서 재고 수량만큼만 추가
        } catch { }

    }

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

    const countPlus = (index) => {
      setCounts((prevCounts) => ({
        ...prevCounts,
        [index]: (prevCounts[index] || 0) + 1,
      }));
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

    return (
        <div className='container'>
            <div className='row mt-4'>
                <div className='col bg-light p-4'>
                    <h2>제품 상세</h2>
                </div>
            </div>
            <div className='row mt-4'>
                <div className='col'>
                    <h1>🙏 {productData.productName}</h1>
                </div>
            </div>
            <div className='row'>
                <div className='col'>

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
            </div>

            {priceList.map((productAttr, index) => (
        <div className='row mt-2' key={index}>
          <div className='col'>
            <h2>{productAttr.productSize} / {productAttr.productAttrPrice}원</h2>
          </div>
          <div className='col text-end'>
            <button onClick={() => countPlus(index)}>+</button>
            <span className='ms-2 me-2'>{counts[index] || 0}</span>
            <button onClick={() => countMinus(index)}>-</button>
          </div>
        </div>
      ))}

            <div className='row mt-2'>
                <div className='col '>
                    <h2>뽀롱뽀롱 {productData.productDetailTitle}</h2>
                </div>
            </div>
            <div className='row mt-2'>
                <label>제품 설명 : </label>
                <div className='col '>
                    <span >{productData.productDetailContent}</span>
                </div>
            </div>

            <div className='row mt-4'>
                <div className='col text-end'>
                    <button className='me-3'>구매하기</button>
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