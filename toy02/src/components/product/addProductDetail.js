import { useState } from "react";

export const ProductDetail = ({ onPrev ,getImages, getProductDetail,handleAddProduct}) => {

    const [images, setImages] = useState([]);

    //이미지 attachDto로 정보 넘기기

    const handleSelectedFiles = (e) => {
        const selectedFiles = e.target.files;
        const newImages = [];
        //미리보기용
        Array.from(selectedFiles).forEach(file => {
                const blobURL = URL.createObjectURL(file);
                newImages.push(blobURL);
        });
    
        setImages(newImages);
        //원본파일 보내기
        getImages(selectedFiles)
        console.log(selectedFiles);
    };

    const [detailData,setDetailData] =useState({}); 
    const changeData = (e)=>{
        console.log(detailData.productDetailContent)

        setDetailData({...detailData,
        [e.target.name] : e.target.value
        })

        console.log( [e.target.name]+":"+e.target.value)

        getProductDetail({...detailData,
        [e.target.name] : e.target.value
        });
    }
    return (
        <div className="">
            <div className="row mt-4">
                <div className="col">
                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="inputGroupFile01">Upload</label>
                        <input type="file" name="images" onChange={handleSelectedFiles} multiple className="form-control" id="inputGroupFile01"    accept="image/*"/>
                    </div>
                </div>
            </div>


            <div className="row mt-4">
                {images.map((image, index) => (
                    <div className="col" key={index}>
                        <img src={image} alt={`Preview ${index}`} style={{ maxWidth: '50%', maxHeight: '100%' }} />
                    </div>
                ))}
            </div>
            <div className="row mt-4">
                <div className="col">
                    <label>제목</label>
                    <input className="form-control mt-2" value={detailData.productDetailTitle}  name="productDetailTitle" onChange={changeData}/>
                </div>
            </div>
            
            <div className="row mt-4">
                <div className="col">
                    {/* 일단 넣는걸 못적으로  */}
                    <label className="me-2">내용</label>
                    <button className="me-2">bold</button>
                    <button className="me-2">color</button>
                    <button className="me-2">underline</button>
                    <button className="me-2">emoji</button>
                    <button className="me-2">image</button>
                    <textarea className="form-control mt-2" value={detailData.productDetailContent}  name="productDetailContent"  onChange={changeData}style={{ minHeight: '300px' }} />
                </div>
            </div>
            <div className=" row mt-4">
                <div className="col text-end">
                    <button type="button" className="btn btn-warning btn-prev" onClick={onPrev}>
                        이전단계
                    </button>
                    <button type="button" className="btn btn-primary ms-2" onClick={handleAddProduct}>
                       submit
                    </button>
                </div>
            </div>
        </div>
    );
}