import { Button } from "bootstrap";
import { useState } from "react";
import axios from 'axios';

export const MemberJoin = () => {
    const [memberInfo, setMemberInfo] = useState({});
    const [isExist, setIsExist] = useState(null);
    const [isPwMatch, setIsPwMatch] = useState(null);



    const handleChange = (e) => {
        setMemberInfo({
            ...memberInfo,
            [e.target.name]: e.target.value
        })

        if(memberInfo.memberPw === memberInfo.pwCheck){
            setIsPwMatch(true);
        }
         
    }

    const collapseId = () => {
        console.log(memberInfo.memberId)
        axios({
            url: `http://localhost:8080/member/memberList`,
            method: `post`,
            data: { memberId: memberInfo.memberId }
        }).then(res => {
            const existMember = res.data;
            console.log(existMember)
            if (existMember.memberId === memberInfo.memberId) {
                setIsExist(true);
            }
            else {
                setIsExist(false);
            }
        }).catch();
    }


    const sendJoin = () => {
        console.log("try")
        delete (memberInfo.pwCheck);

        console.log(memberInfo);
        axios({
            url: `http://localhost:8080/member/memberJoin`,
            method: "post",
            data: memberInfo,
        }).then(res => {
            console.log("data", res.data)

        }).catch(err => { });



    }


    return (

        <div className="container">
            <div className="row mt-4">
                <div className="col ">
                    <label>id</label>
                    <input name="memberId" onBlur={collapseId} onChange={handleChange} className="form-control" />
                    {isExist ? (
                        <div>이미존재하는 아이디</div>
                    ) : (
                        <div>사용가능</div>
                    )}
                </div>
            </div>
            <div className="row mt-4">
                <div className="col ">
                    <label>pw</label>
                    <input type="password" name="memberPw" onChange={handleChange} className="form-control" />
                </div>
            </div>
            <div className="row mt-4">
                <div className="col ">
                    <label>pw check</label>
                    <input type="password" name="pwCheck" onChange={handleChange} className="form-control" />
                    {isPwMatch?(<div>비밀번호 일치</div>):(<div>불일치</div>)}
                </div>
            </div>
            <div className="row mt-4">
                <div className="col ">
                    <label>nick name</label>
                    <input name="memberNick" onChange={handleChange} className="form-control" />
                </div>
            </div>
            <div className="row mt-4">
                <div className="col ">
                    <button className=" btn btn-secondary w-100" onClick={sendJoin}>go</button>
                </div>
            </div>




        </div>
    );
}