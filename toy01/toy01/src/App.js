import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { format, isMatch } from 'date-fns';
import Modal from 'react-modal';
import { Payment } from './conponent/payment';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { Success } from './conponent/pay/success';



function App() {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [vehicleNum, setVehicleNum] = useState("");
  const [selectedInfo, setSelectedInfo] = useState({});
  const [vehicleList, setVehicleList] = useState([]);
  const [url, setUrl] = useState("");



  const nowTime = new Date;
  const formattedDate = format(nowTime, 'yyyy-MM-dd HH:mm:ss');



  const formatDate = (resultDate) => {

    if (resultDate) {

      const date = resultDate.split(" ")[0];

      const year = date.split("-")[0];
      const month = date.split("-")[1];
      const day = date.split("-")[2];

      const time = resultDate.split(" ")[1];

      const hour = time.split(":")[0];
      const min = time.split(":")[1];
      const sec = time.split(":")[2];


      const hourToSec = hour * 60 * 60;
      const minToSec = min * 60;
      const secToSec = sec * 1;


      const totalSec = (hourToSec + minToSec + secToSec);


      return {
        year: year,
        month: month,
        day: day,
        totalSec: totalSec,
      }
    }

  }



  const handleSearch = async () => {

    try {
      const res = await axios.get(`http://localhost:8080/home/searchList/${vehicleNum}`)
      console.log(res.data)
      setVehicleList(res.data)
    }
    catch {

    }



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
    setSelectedInfo({})
    setResult({});
  }

  const [result, setResult] = useState({});
  const handleSelcet = async (info) => {
    setSelectedInfo(info)
    console.log(info)


    const res = await axios.get(`http://localhost:8080/home/computeTime/${info.vehicleNo}`)
    console.log(res.data)
    setResult(res.data)

  }

  const [isModal, setIsModal] = useState(false);

  const [showPayScreen, setShowPayScreen] = useState(false)

  const openModal = () => {

    axios.post(`http://localhost:8080/home/paymentReady`, result).then(
      res => {
        console.log(res.data)
        const data = res.data;
        setUrl(data)

      }
    )

    setIsModal(true);
    console.log(isModal)
  }

  const closeModal = () => {
    const result = window.confirm("Do you want to cancel?");
    if (result) {
      setIsModal(false);
      setShowPayScreen(false);

    }
    else {
      return;
    }
  }

  const handlePayment = () => {
    const result = window.confirm("Do you want to proceed with the payment?")
    if (result) {
      console.log("success")
      setShowPayScreen(true);
    }
    else {
      console.log("fail");
    }
  }



  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때만 실행되도록 함

  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();

  return (
    <div className="container">
      <div className='row'>
        <div className='col mt-4'>
          <div>
            <h3>{"currentTime" + `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`}</h3>
          </div>
        </div>
        <div className='col mt-4'>
          <label>number input</label>
          <div className='input-group'>
            <input className='form-control' />
            <button>input</button>
          </div>
        </div>
        <div className='col mt-4'>
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
        <div className='col '><button className='w-100 mt-4' onClick={handleSearch}>search</button></div>
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

                {vehicleList.length > 0 ? (
                  <>
                    {vehicleList
                      .map((no, index) => (
                        <div className='row' key={index}>
                          <div className='col' value={no.enterTime} onClick={(e) => handleSelcet(no)}>{no.vehicleNo}</div>
                          <div className='col text-end'><button onClick={(e) => handleSelcet(no)}>select</button></div>
                        </div>
                      ))}
                  </>
                ) : (
                  <> search result is empty</>
                )}


              </div>
            </div>
          </div>
          <hr className='mt-4' />

          {/* this area change Modal */}
          <div className='row'>
            <div className='col-12 mt-4'><h4>vehicleNo : {selectedInfo.vehicleNo}</h4></div>
          </div>
          <div className='row'>
            <div className='col'>
              enter Time : {selectedInfo.enterDate}
            </div>
          </div>
          <div className='row'>
            <div className='col mt-4'>
              <label className='form-label'>total time</label>
              <div className='border'><span>
                {result.days === undefined ? (<>check your vehicle number</>) : (
                  <>
                    {result.days + "days " + result.hours + "H " + result.minutes + "M"}
                  </>
                )}
              </span></div>
            </div>
          </div>

          <div className='row mt-4'>
            <div className='col'>
              <label className='form-label'>total price</label>
              <div className='border'><span> {result.price}</span> \</div>
            </div>
          </div>

          <div className='row mt-4'>
            <div className='col'>

              <button className="w-100 mb-4" disabled={Object.keys(result).length === 0 ? "disabled" : ""} onClick={openModal}>payment</button>
            </div>
          </div>
        </>
      )}



      <Modal
        isOpen={isModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        appElement={document.getElementById('root')}

      >
        <div className='row'>
          <div className='col'>
            <h2>Payment Info</h2>
          </div>
        </div>
        <div className='row  mt-4'>
          <div className='col-10 offset-1'>
            <table className='table table-border'>

              <tbody>
                <tr>
                  <td>vehicle No</td>
                  <td>{selectedInfo.vehicleNo}</td>
                </tr>
                <tr>
                  <td>parking fee</td>
                  <td>{result.price} \</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {showPayScreen ? (
          <div className='row mt-4'>
            <div className='col '>
              <Payment url={url} />
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className='row mt-4'>
          <div className='col text-end'>
            <button className='me-2' onClick={closeModal}>Cancel</button>
            <button className='me-2' onClick={handlePayment}>payment</button>

          </div>
        </div>
      </Modal>


 
    </div>
  );
}

export default App;
