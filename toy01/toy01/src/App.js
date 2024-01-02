import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [vehicleNum, setVehicleNum] = useState("");

  const [vehicleList, setVehicleList] = useState([
    { vehicleNo: "12가1111" ,enterTime : "20240102 12:00"},
    { vehicleNo: "13가1111" },
    { vehicleNo: "14가1111" }
  ])


  const handleInfoOpen = () => {
    if (vehicleNum.length > 0) {
      setIsInfoOpen(true)
    }
  }

  const handleNumberChange = (e) => {
    const number = e.target.value

    setVehicleNum(number);
    if (number.length < 1) {
      setIsInfoOpen(false)
    }

  }

  const numberChange = (e) => {
    const number = e.target.value
    if (vehicleNum.length < 4) {
      setVehicleNum((prevNumbers) => prevNumbers + number)
    }
  }
  const handelClear = () => {
    setVehicleNum("");
    setIsInfoOpen(false);
  }
  const handleDetailInfo = (e)=>{
    console.log(e)
  }



  return (
    <div className="container">
      <div className='row'>
        <div className='col'>
          <h1>주차장 프로그램</h1>
        </div>
        <div className='col'>
          <label>number input</label>
          <div className='input-group'>
            <input className='form-control' />
            <button>input</button>
          </div>
        </div>
        <div className='col'>
          <label>Area input</label>
          {/* after chage to checkBox */}
          <div className='input-group'>
            <input className='form-control' />
            <button>input</button>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <label className='form-label'>Vehicle number</label>
          {/* buttons value typing span */}
          <div className='border' ><span id='num'>{vehicleNum.length > 0 ? (vehicleNum) : ("Please enter your number")}</span></div>
          <div className='row mt-4'>
            <div className='col-4 mt-4'><button className='w-100' value={1} onClick={numberChange}>1</button></div>
            <div className='col-4 mt-4'><button className='w-100' value={2} onClick={numberChange}>2</button></div>
            <div className='col-4 mt-4'><button className='w-100' value={3} onClick={numberChange}>3</button></div>
          </div>
          <div className='row'>
            <div className='col-4 mt-4'><button className='w-100' value={4} onClick={numberChange}>4</button></div>
            <div className='col-4 mt-4'><button className='w-100' value={5} onClick={numberChange}>5</button></div>
            <div className='col-4 mt-4'><button className='w-100' value={6} onClick={numberChange}>6</button></div>
          </div>
          <div className='row'>
            <div className='col-4 mt-4'><button className='w-100' value={7} onClick={numberChange}>7</button></div>
            <div className='col-4 mt-4'><button className='w-100' value={8} onClick={numberChange}>8</button></div>
            <div className='col-4 mt-4'><button className='w-100' value={9} onClick={numberChange}>9</button></div>
          </div>
          <div className='row'>
            <div className='col-4 mt-4'><button className='w-100'>*</button></div>
            <div className='col-4 mt-4'><button className='w-100' value={0} onClick={numberChange}>0</button></div>
            <div className='col-4 mt-4'><button className='w-100' onClick={handelClear}>clear</button></div>
          </div>
        </div>

      </div>
      <div className='row'>
        <div className='col '><button className='w-100 mt-4' onClick={handleInfoOpen}>search</button></div>
      </div>

      {isInfoOpen && (
        <>
          {/* here search click to open information */}
          {/* price, total time, etc... */}
          <hr className='mt-4' />

          <div className='row mt-4'>
            <div className='row'>
              <div className='col'>
                <span>Vehicle number :</span>
                {/* Vehicle numbers List on click to payment */}
                {vehicleList.filter(item => vehicleNum === item.vehicleNo.substring(item.vehicleNo.length - 4))
                  .map((no, index) => (
                    <div key={index}>
                      <div value={no.enterTime} onClick={(e)=>handleDetailInfo(no)}>{no.vehicleNo}</div>
                    </div>
                  ))}
                  
              </div>
            </div>

            {/* this area change Modal */}

            <div className='col mt-4'>
              <label className='form-label'>total time</label>
              <div className='border'><span>time</span></div>
            </div>
          </div>

          <div className='row mt-4'>
            <div className='col'>
              <label className='form-label'>total price</label>
              <div className='border'><span>price</span></div>
            </div>
          </div>

          <div className='row mt-4'>
            <div className='col'>
              <button className='w-100'>payment</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
