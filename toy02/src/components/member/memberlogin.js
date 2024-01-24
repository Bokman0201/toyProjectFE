import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../../recoliState";

export const MemberLogin =()=>{

    const [user, setUser] = useRecoilState(userState);

    const [userInfo, setUserInfo] = useState({});

    const navigator = useNavigate();


    const handleChange = (e)=>{

        setUserInfo({...userInfo,
        [e.target.name]: e.target.value
    })
    }

    const sendLogin=()=>{
        axios({
            url:`http://localhost:8080/member/memberLogin`,
            method:`post`,
            data: userInfo,
        }).then(res=>{
            console.log(res.status);
            console.log(res.data)

            if(res.status === 200){
                setUser(res.data)
                const id = sessionStorage.setItem("memberId", res.data.memberId);
                const pw =  sessionStorage.setItem("memberPw", res.data.memberPw);
                navigator("/")
            }

        }).catch(err=>{
            if(userInfo.memberId===undefined){
                alert("please check your ID")
            }
            if(userInfo.memberPw===undefined){
                alert("please check your password")
            }

        })
    }

    useEffect(()=>{
        console.log(user)
        if(user!==null){
        }

    },[user])



    return(
        <div  className="container ">
            <div className="row mt-4">
                <div className="col">
                    <label>id</label>
                    <input name="memberId" onChange={handleChange} className="form-control"/>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    <label>pw</label>
                    <input name="memberPw" onChange={handleChange} className="form-control"/>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    <button type="submit" onClick={sendLogin} className="btn btn-primary w-100">login</button>
                </div>
            </div>



        </div>
    )
}