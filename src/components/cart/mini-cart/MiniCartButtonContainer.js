import {Link} from "react-router-dom";

export default function MiniCartButtonContainer() {
    return (
        <>
            <div className="mini-action">
                <Link to={"/payment/checkout"}
                      className="mini-link btn--e-brand-b-2"
                      style={{width: "100%", cursor: "pointer"}}>
                    결제 하기
                </Link>
                <Link to="/carts"
                      className="mini-link btn--e-transparent-secondary-b-2">장바구니
                    보기</Link>
            </div>
        </>
    )
};