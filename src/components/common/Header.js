import {Link} from "react-router-dom";

export default function Header() {
    let loginMenu = (
            <>
                <li id="nav-attendance-li" className="u-s-m-r-6">
                    <a id="show-attendance-a">
                        <i className="fa-regular fa-square-check"></i>
                        <span>출석체크</span>
                    </a>
                </li>
                <li id="nav-point-li" className="u-s-m-r-6">
                    <Link to="/payments">
                        <i className="fa-solid fa-wallet"></i>
                        <span>포인트 충전</span>
                    </Link>
                </li>
                <li id="nav-mypage-li" className="u-s-m-r-6">
                    <Link to="/mypage">
                        <i className="fas fa-user-circle"></i>
                        <span>내정보</span>
                    </Link>
                </li>
                <li id="nav-logout-li" className="u-s-m-r-6">
                    <a className="btn" onClick="kakaoLogout"><i className="fas fa-lock-open"></i>
                        <span>로그아웃</span>
                    </a>
                </li>
            </>
        )
    ;

    const logoutMenu = (
        <>
            <li id="nav-signup-li" className="u-s-m-r-6">
                <Link to="/signup">
                    <i className="fas fa-user-plus"></i>
                    <span>회원가입</span>
                </Link>
            </li>

            <li id="nav-login-li" className="u-s-m-r-6">
                <a href="/login"><i className="fas fa-lock"></i>
                    <span>로그인</span></a></li>
        </>
    );

    let menu;
    if (localStorage.getItem("token")) {
        menu = loginMenu;
    } else {
        menu = logoutMenu;
    }

    return (
        <>
            <nav className="primary-nav primary-nav-wrapper--border">
                <div className="container">
                    <div id="primary-nav" className="primary-nav">
                        <Link id="main-logo" className="main-logo" to="/">
                            <img src="/images/logo/logo-2.png" alt="로고"/>
                        </Link>
                        <div className="menu-init" id="navigation">
                            <button
                                className="btn btn--icon toggle-button toggle-button--secondary fas fa-cogs responsible-hidden"
                                type="button"></button>
                            <button
                                className="btn btn--icon toggle-button toggle-button--secondary fas fa-cogs responsible-hidden"
                                type="button"></button>
                            <div className="ah-lg-mode">
                                <span className="ah-close">✕ Close</span>
                                <ul id="nav-list" className="ah-list ah-list--design1 ah-list--link-color-secondary">
                                    {menu}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <nav className="secondary-nav-wrapper">
                <div className="container">
                    <div className="secondary-nav">
                        <div className="menu-init" id="navigation1"></div>
                        <div className="menu-init" id="navigation2">
                            <button
                                className="btn btn--icon toggle-button toggle-button--secondary fas fa-cog responsible-hidden"
                                type="button"></button>
                            <div className="ah-lg-mode">
                                <span className="ah-close">✕ Close</span>
                                <ul className="ah-list ah-list--design2 ah-list--link-color-secondary">
                                    <li><Link to="/gifticon/add">기프티콘 등록</Link></li>
                                    <li><Link to="/user/my-gifticon">내 기프티콘</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="menu-init" id="navigation3">
                            <button
                                className="btn btn--icon toggle-button toggle-button--secondary fas fa-shopping-bag toggle-button-shop responsible-hidden"
                                type="button"></button>
                            <span className="total-item-round"></span>
                            <div className="ah-lg-mode">
                                <span className="ah-close">✕ Close</span>
                                <ul className="ah-list ah-list--design1 ah-list--link-color-secondary" id="side-header">
                                    <li className="has-dropdown">
                                        <a className="mini-cart-shop-link"><i className="fas fa-shopping-bag"></i><span
                                            className="total-item-round"></span></a>
                                        <span className="js-menu-toggle"></span>
                                        <div className="mini-cart">
                                            <form action="/payment/checkout" method="get" name="checkout-form">
                                                <div className="mini-product-container gl-scroll u-s-m-b-15"
                                                     id="mini-cart-list">
                                                </div>
                                                <div className="mini-product-stat">
                                                    <div className="mini-total">
                                                        <span className="subtotal-text">결제 금액</span>
                                                        <span className="subtotal-value" id="subtotal-value"></span>
                                                    </div>
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
                                                </div>
                                            </form>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )

}