import React, { useEffect, useState } from "react";

export const Payment = (props) => {
const [loading , setLoading] = useState(false);
const [currentUrl, setCurrentUrl] = useState(window.location.href);


    useEffect(()=>{


    },[props.url])


    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const radius = {
        borderRadius: windowWidth <= 500 ? '5%' : '10%',
    };

    const iframeWidth = windowWidth <= 500 ? "100%" : "70%";



const [URL , setURL] = useState(null);

    useEffect(()=>{

        const getUrl = () => {
            document.getElementById('kakaoPayIframe').addEventListener('load', function() {
              // iframe 내부의 정보 가져오기
              const pgToken = this.contentWindow.location.search.substring(1).split('=')[1];
          
              setURL(pgToken);
              // 부모 페이지로 정보 전달
              window.parent.postMessage({ pgToken }, '*');
            });
          }

    },[URL])
      



    return (
        <>
            {/* 내용은 필요에 따라 수정 */}
            {currentUrl}
            {URL}

            <div className="text-center" style={radius}>
                <iframe
                id="kakaopayFrame"
                    style={{ borderRadius: radius.borderRadius, width: iframeWidth }}
                    title="결제"
                    src={props.url}
                    height="700px"
                ></iframe>
            </div>
        </>
    );
};
