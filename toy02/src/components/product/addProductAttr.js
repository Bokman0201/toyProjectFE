import { useEffect, useState } from "react";

export const AddPeoductAttr = ({ onNext, onPrev ,getProductDataList}) => {

    const [productInventoryCount, setProductInventoryCount] = useState([]);
    const [productAttrSize , setProductAttrSize]= useState([]);
    const [productAttrPrice , setProductAttrPrice]= useState([]);

    const [dataList , setDataList ]  =useState([])

    
    const [sizeData, setSizeData] = useState("");
    const [countData , setCountData] = useState(0);
    const [priceData, setPriceData] = useState(0)
    const [productDataConvertMap,setProductDataConvertMap] = useState({
        productInventoryCount:0,
        productAttrSize:"",
        productAttrPrice:0,
    })
    
    const changeSizeData =(e)=>{
        setSizeData(e.target.value)
    }

    const changeCountData = (e)=>{
        setCountData(e.target.value)
    }
    const changePriceData = (e)=>{
        setPriceData(e.target.value)
    }


    const addSize = () => {

        setProductAttrSize([...productAttrSize,sizeData])

    };

    const addCount =()=>{

        setProductInventoryCount([...productInventoryCount, countData])

    }
    const addPrice =()=>{

        setProductInventoryCount([...productInventoryCount, priceData])

    }

    const addDataList=()=>{
        const data ={
            productAttrSize:sizeData,
            productInventoryCount:countData,
            productAttrPrice:priceData
        }
        if(sizeData!=="" && countData!==0){
            setDataList([...dataList,data])
            setCountData(0)
            setSizeData("")
            setPriceData(0)
        }

        console.log(dataList)
        console.log(data)
    }
    const deleteData = (name) => {
        const updatedList = dataList.filter(item => item.productAttrSize !== name);
        setDataList(updatedList)
        console.log(dataList)
      };

      useEffect(() => {
        getProductDataList(dataList);
      }, [dataList]);

    return (

        <div className=''>
            <div className="row mt-4">
                <div className="col">
                    <label className="me-2 mb-3">용량 / 사이즈</label>
                    <button onClick={addSize}>+</button>
                    <button>-</button>
                    <input className="form-control" value={sizeData} onChange={changeSizeData}/>
                    <div>
                    </div>
                </div>

                <div className=" col">
                    <label className="me-2 mb-3">재고</label>
                    <button onClick={addCount}>+</button>
                    <button>-</button>
                    <input value={countData} onChange={changeCountData} className="form-control"/>

                </div>
                <div className="col">
                    <label className="me-2 mb-3">가격</label>
                    <button onClick={addCount}>+</button>
                    <button>-</button>
                    <input value={priceData} onChange={changePriceData} className="form-control"/>

                </div>
                <div className="col-12  mt-3">
                        <button className="btn btn-secondary w-100" onClick={addDataList}>+</button>

                </div>

            </div>
            <div className="row mt-4">
                <div className="col">
                    <h3>등록된 상품</h3>
                    {dataList.map((data, index)=>
                    <div className="mt-1" key={index}>
                        <div className="row">
                            <div className="col">

                        품목: {data.productAttrSize} /
                        재고: {data.productInventoryCount}/
                        가격:   {data.productAttrPrice}
                            </div>
                        <div className=" col text-end">
                        <button className="ms-4 btn btn-danger" onClick={()=>deleteData(data.productAttrSize)}>삭제</button>
                        </div>
                        </div>
                    </div>
                    )}
                </div>
            </div>
            <div className="row mt-4">
                <div className="col ">

                    <div className="input-group">
                    </div>
                    <div className='mt-1'>
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col text-end">
                    <button type="button" className="btn btn-warning btn-prev" onClick={onPrev}>
                        이전단계
                    </button>
                    <button type="button" className="btn btn-primary btn-next ms-2" onClick={onNext}>
                        다음단계
                    </button>
                </div>
            </div>
        </div>
    );
}