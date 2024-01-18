import axios from "axios";
import React, { useEffect, useState } from "react";
import './category.css'; // 스타일 파일을 import


export const AddCategory = () => {
    const [categoryLevel, setCategoryLevel] = useState(3);
    const levels = Array.from({ length: categoryLevel }, (_, index) => index + 1);

    const [category1, setCategory1] = useState([]);
    const [category2, setCategory2] = useState([]);
    const [category3, setCategory3] = useState([]);
    const [categories, setCategories] = useState(Object.freeze(['', '', '']));

    const get1stCategories = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/category/categoryList`)
            setCategory1(res.data)
            console.log("try")
        } catch {
            console.err('네트워크 에러')
        }
    }

    useEffect(() => {
        get1stCategories();
        console.log(category1)
    }, [])

    useEffect(()=>{
        setCategory3([])

    },[category2])

    const get2ndCategories = async(no) => {
        try{
            const res = await axios.get(`http://localhost:8080/category/childCategory/${no}`)
            setCategory2(res.data)
        }
        catch{}


    }
    const get3rdCategories =async(no) => {
        try{
            const res = await axios.get(`http://localhost:8080/category/childCategory/${no}`)
            setCategory3(res.data)
        }
        catch{}

    }
    const [selectedNo, setSelectNo] = useState(null);
    const selectedCategory = (e) => {
        const level = e.target.value;
        setSelectNo(level)

    }
    const [data, setData] = useState({
        categoryName: "",
        parentCategoryId: null,
    });
    const handleChangeData = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
        console.log(data)
    }

    const sendData = () => {
        axios({
            url: `http://localhost:8080/category/addCategory`,
            method: 'post',
            data: data
        }).then(res => {
            console.log(res.status)
            get1stCategories();

        }).catch();
    }

    const handleSelectCategory = (categotry) => {
        //2차분류 3차 분류 의 카테고리 출력
        get2ndCategories(categotry.categoryId);
        setCategories([categotry.categoryName])
        console.log(categories)

    }
    const handleSelectCategory2 =(categotry)=>{
        get3rdCategories(categotry.categoryId);
        let currentSecondValue = categories[1];

        // 두 번째 값이 변경되었는지 확인
        if (currentSecondValue !== categotry.categoryName) {
            // 변경된 경우, 현재 두 번째 값 삭제
            categories.splice(1, 1);
    
            // 새로운 두 번째 값 추가
            categories.splice(1, 0, categotry.categoryName);
    
            // 변경된 배열 상태 출력
            console.log("변경 후 배열 상태:", categories);
        } else {
            // 변경이 없는 경우, 현재 배열 상태 출력
            console.log("변경 없음. 현재 배열 상태 유지:", categories);
        }

    }

    const handleSelectCategory3 =(category)=>{
        let currentSecondValue = categories[2];

        // 두 번째 값이 변경되었는지 확인
        if(categories.length<4){
        if (currentSecondValue !== category.categoryName) {
            // 변경된 경우, 현재 세 번째 값 삭제
            categories.splice(2, 1);
        
            // 새로운 세 번째 값 추가
            const newitem =  categories.splice(2, 0, category.categoryName);
            setCategories([...categories,newitem])
        
            // 변경된 배열 상태 출력
            console.log("변경 후 배열 상태:", categories);
        } else {
            // 변경이 없는 경우, 현재 배열 상태 출력
            console.log("변경 없음. 현재 배열 상태 유지:", categories);
        }
    }

    }

    return (

        <div className="container">
            <div className="row mt-4">
                <div className="col bg-light p-4">
                    <h2>카테고리 신규 등록</h2>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    <div className="row mt-2">
                        <div className="col-8">
                            <select className="" onChange={selectedCategory}>
                                <option>---선택---</option>
                                {levels.map((levels, index) => (
                                    <option key={levels} value={levels}>{`${levels}차`}</option>
                                ))}
                            </select>

                            {selectedNo === "2"  ? (
                                <select name="parentCategoryId" onChange={handleChangeData}>
                                    <option >--선택--</option>
                                    {category1.map((first, index) => (
                                        <option value={first.categoryId} key={index} >{first.categoryName}</option>
                                    ))}
                                </select>
                            ) : (
                                <select name="parentCategoryId" onChange={handleChangeData}>
                                <option >--선택--</option>
                                {category2.map((first, index) => (
                                    <option value={first.categoryId} key={index} >{first.categoryName}</option>
                                ))}
                            </select>
                            )}

                            <div className="input-group mb-3">
                                <input type="text" name="categoryName" onChange={handleChangeData} className="form-control" placeholder="카테고리를 검색하거나 선택하세요" />
                                <button className="btn btn-outline-primary" type="button" onClick={sendData}>등록</button>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col border" style={{ height: '200px', overflowY: 'auto' }}>
                            <div style={{ fontWeight: 'bold' }}>1차 <hr /></div>
                            {category1.map((first, index) => (
                                <div key={index} className="category-item">
                                    <div onClick={() => handleSelectCategory(first)}>{first.categoryName}</div>
                                </div>
                            ))}
                        </div>
                        <div className="col border" style={{ height: '200px', overflowY: 'auto' }}>
                            <div style={{ fontWeight: 'bold' }}>2차 <hr /></div>
                            {category2.map((second, index) => (
                                <div key={index} className="category-item">
                                    <div onClick={()=>handleSelectCategory2(second)}>{second.categoryName}</div>
                                </div>
                            ))}

                        </div>
                        <div className="col border" style={{ height: '200px', overflowY: 'auto' }}>
                            <div style={{ fontWeight: 'bold' }}>3차 <hr /></div>
                            {category3.map((third, index) => (
                                <div key={index} className="category-item">
                                    <div onClick={()=>handleSelectCategory3(third)}>{third.categoryName}</div>
                                </div>
                            ))}
                        </div>


                        <div className="col-1" style={{ height: '200px', overflowY: 'auto' }}></div>
                        <div className="col-2 border" style={{ height: '200px', overflowY: 'auto' }}>
                            <div style={{ fontWeight: 'bold' }}>선택 결과<hr /></div>
                            {categories.map((category, index) => (
                                <div key={index} className="category-item">
                                    <div >{category}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};