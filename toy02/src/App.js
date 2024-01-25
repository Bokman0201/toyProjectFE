import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MemberJoin } from './components/member/memberJoin';
import { Headers } from './components/headers/header';
import { Home } from './components/home';
import { MemberLogin } from './components/member/memberlogin';
import { useRecoilState } from 'recoil';
import { userState } from './recoliState';
import { useEffect } from 'react';
import axios from 'axios';
import { AddProduct } from './components/product/addPeoduct';
import { ProductDetail } from './components/product/productDetail';
import { Footers } from './components/headers/footer';
import { InsertProduct } from './components/product/insertProduct';
import { AddCatagory, AddCategory } from './components/catagory/catagory';


function App() {

  const [user,setUser] = useRecoilState(userState);
  const memberId = sessionStorage.getItem("memberId");
  const memberPw = sessionStorage.getItem("memberPw");
  useEffect(()=>{

    if(memberId){
      setUser(memberId);

      const loadData = async ()=>{
        const data = {memberId: memberId, memberPw: memberPw}
        try{
          const res = await axios.post(`http://localhost:8080/member/memberLogin`, data)
          setUser(res.data);
        }
        catch{
          
        }

      }
      loadData();
    }
  },[])

  return (
    <BrowserRouter>
    <Headers/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/memberJoin' element={<MemberJoin/>}/>
      <Route path='/memberLogin' element={<MemberLogin/>}/>
      <Route path='/addProduct' element={<AddProduct/>}/>
      <Route path={`/productDetail/:productNo`} element={<ProductDetail/>}/>
      <Route path='/insertProduct' element={<InsertProduct/>}/>
      <Route path='/addCategory' element={<AddCategory/>}/>
    </Routes>
    <Footers/>
    </BrowserRouter>
      
  );
}

export default App;
