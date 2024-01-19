import axios from "axios";
import { useEffect, useState } from "react";

export const Catagory = ({ onPrev, onNext, categorySelect, categoryNo}) => {

    const [category1, setCategory1] = useState([]);
    const [category2, setCategory2] = useState([]);
    const [category3, setCategory3] = useState([]);
    const [firstCategory, setFirstCategory] = useState("");
    const [secondCategory, setSecondCategory] = useState("");
    const [thirdCategory, setThirdCategory] = useState("");
    const [selectedCategory,setSelectCategory] = useState([]);

    //1차 카테고리 가져오기 

    useEffect(() => {
        const get1stCategory = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/category/categoryList`)
                setCategory1(res.data)
                setFirstCategory(res.data[0].categoryId)
            } catch {
            }
        }
        get1stCategory();

    }, [])

    useEffect(() => {
        if (firstCategory) {
            console.log("try")
            get2ndCategory()
        }
    }, [firstCategory])

    const handleSelect1st=(no)=>{
        setFirstCategory(no)
    }

    //2차 카테고리 가져오기
    const get2ndCategory = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/category/childCategory/${firstCategory}`)
            console.log("2nd", res.data)
            setCategory2(res.data)
            setSecondCategory(res.data[0].categoryId)
            console.log(res.data[0].categoryId)

        } catch {
        }
    }
    const handleSelect2nd=(no)=>{
        setSecondCategory(no)
    }
    //3차 카테고리 가져오기
    const get3rdCategory = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/category/childCategory/${secondCategory}`)
            setCategory3(res.data)
        } catch {
        }
    }
    useEffect(()=>{
        if(secondCategory){
            get3rdCategory();
        }
    },[secondCategory])

    const handleSelect3rd = async (no) => {
        console.log(no);
        setThirdCategory(no);
        try {
            const res = await axios.get(`http://localhost:8080/category/selectedCategory/${no}`);
            setSelectCategory(res.data);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const nextPage=()=>{
        onNext()
        categorySelect(thirdCategory)
    }

    useEffect(()=>{
        if(categoryNo!==null){
            handleSelect3rd(categoryNo)
        }
    },[])



    //선택된 항목은 최종 분류에 넣기 



    //최종 카테고리만 db에 삽입



    return (
        <div className="">
            <div className="row">
                <div className="col">
                    {/* 언젠가 쓰지 않을까..? */}
                    {firstCategory.categoryId}
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-5">
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="카테고리를 검색하거나 선택하세요" />
                        <button className="btn btn-outline-primary" type="button">Button</button>
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col border" style={{ height: '200px', overflowY: 'auto' }}>
                    <div style={{ fontWeight: 'bold' }}>1차 <hr /></div>
                    {category1.map((first, index) => (
                        <div key={index} className="category-item">
                            <div onClick={()=>handleSelect1st(first.categoryId)}>{first.categoryName}</div>
                        </div>
                    ))}
                </div>
                <div className="col border" style={{ height: '200px', overflowY: 'auto' }}>
                    <div style={{ fontWeight: 'bold' }}>2차 <hr /></div>
                    {category2.map((second, index) => (
                        <div key={index} className="category-item">
                            <div onClick={()=>handleSelect2nd(second.categoryId)}>{second.categoryName}</div>
                        </div>
                    ))}
                </div>
                <div className="col border" style={{ height: '200px', overflowY: 'auto' }}>
                    <div style={{ fontWeight: 'bold' }}>3차 <hr /></div>
                    {category3.map((third, index) => (
                        <div key={index} className="category-item">
                            <div onClick={()=>handleSelect3rd(third.categoryId)}>{third.categoryName}</div>
                        </div>
                    ))}
                </div>
                <div className="col-1" style={{ height: '100px', overflowY: 'auto' }}></div>
                <div className="col border" style={{ height: '200px', overflowY: 'auto' }}>
                    <div style={{ fontWeight: 'bold' }}>선택된 분류 <hr /></div>
                    {selectedCategory.map((final, index) => (
                        <div key={index} className="category-item">
                            <div >{final.categoryName}</div>
                        </div>
                    ))}
                </div>
            </div>


            <div className="row mt-4">
                <div className="col text-end">
                    <button type="button" className="btn btn-warning btn-prev" onClick={onPrev}>
                        이전단계
                    </button>
                    <button type="button" className="btn btn-primary ms-2" onClick={nextPage}>
                        다음단계
                    </button>
                </div>
            </div>
        </div>
    );
};