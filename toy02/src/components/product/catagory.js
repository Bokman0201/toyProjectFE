export const Catagory = ({ onPrev, onNext }) => {

    return (
        <div className="">
            <div className="row">
                <div className="col">
                    {/* 언젠가 쓰지 않을까..? */}
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-5">
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="카테고리를 검색하거나 선택하세요"  />
                            <button className="btn btn-outline-primary" type="button">Button</button>
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col border" style={{ height: '100px', overflowY: 'auto' }}>
                    <div>1차 분류</div>
                </div>
                <div className="col border" style={{ height: '100px', overflowY: 'auto' }}>2차 분류</div>
                <div className="col border" style={{ height: '100px', overflowY: 'auto' }}>3차 분류</div>
                <div className="col-1" style={{ height: '100px', overflowY: 'auto' }}></div>
                <div className="col-2 border" style={{ height: '100px', overflowY: 'auto' }}>최종 분류</div>
            </div>


            <div className="row mt-4">
                <div className="col text-end">
                    <button type="button" className="btn btn-warning btn-prev" onClick={onPrev}>
                        이전단계
                    </button>
                    <button type="button" className="btn btn-primary ms-2" onClick={onNext}>
                        다음단계
                    </button>
                </div>
            </div>
        </div>
    );
};