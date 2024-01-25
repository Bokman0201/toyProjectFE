import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "react-slick";

export const ProductImage = ({productNo}) => {
    const [productImages, setProductImages] = useState([]);

    useEffect(()=>{
        getProductImage();

    },[])


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
const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
};



    return (

        <>
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

        </>
    );
}