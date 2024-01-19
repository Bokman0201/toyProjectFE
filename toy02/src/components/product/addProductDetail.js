import { useState } from "react";

export const ProductDetail = ({ onPrev }) => {

    const [images, setImages] = useState([]);
    const handleSelectedFiles = (e) => {
        const selectedFiles = e.target.files;
        const newImages = [];

        Array.from(selectedFiles).forEach(file => {
            const blobURL = URL.createObjectURL(file);
            newImages.push(blobURL);
        });

        setImages(newImages);
    };
    return (
        <div className="">
            <div className="row mt-4">
                <div className="col">
                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="inputGroupFile01">Upload</label>
                        <input type="file" name="images" onChange={handleSelectedFiles} multiple className="form-control" id="inputGroupFile01" />
                    </div>
                </div>
            </div>


            <div className="row mt-4">
                {images.map((image, index) => (
                    <div className="col" key={index}>
                        <img src={image} alt={`Preview ${index}`} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                    </div>
                ))}
            </div>
            
            <div className="row mt-4">
                <div className="col">
                    <textarea className="form-control"></textarea>
                </div>
            </div>
            <div className=" row mt-4">
                <div className="col text-end">
                    <button type="button" className="btn btn-warning btn-prev" onClick={onPrev}>
                        이전단계
                    </button>
                    <button type="button" className="btn btn-primary ms-2">
                        다음단계
                    </button>
                </div>
            </div>
        </div>
    );
}