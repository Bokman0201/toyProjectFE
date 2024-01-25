export const Comment = () => {

    return (
        <>
            <div className="row">
                <div className="col">코멘트 위치잡아놓기</div>
                <div className="col text-end">

                    <button className="btn">별점 낮은순</button>
                    <button className="btn">별점 높은순</button>
                    <button className="btn">공감 많은순</button>
                    <button className="btn">별점 낮은순</button>
                </div>
            </div>


            <div className="row mt-3">
                <div className="col">
                    <img
                        src="https://picsum.photos/200/200"
                    />
                </div>
                <div className="col">
                    <img
                        src="https://picsum.photos/200/200"
                    />
                </div>
                <div className="col">
                    <img
                        src="https://picsum.photos/200/200"
                    />
                </div>

                <div className="col">
                    <img
                        src="https://picsum.photos/200/200"
                    />
                </div>
                
            </div>
            <div className="row mt-2">
                <div className="col ">
                    testuser1 님의 코멘트 : 노는게 제일 좋아
                </div>
            </div>

        </>
    );
}