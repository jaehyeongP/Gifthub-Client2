import GifticonItemImage from "./GifticonItemImage";
import GifticonItemInfo from "./GifticonItemInfo";
import PrimaryButton from "../ui/button/PrimaryButton";
import WhiteButton from "../ui/button/WhiteButton";
import NewsletterModal from "../modal/newsletter/NewsletterModal";
import useNewsletterModal from "../../hooks/useNewsletterModal";
import GifticonHiddenInfo from "./GifticonHiddenInfo";
import axios from "axios";
import {Navigate, useNavigate} from "react-router-dom";

export default function GifticonItemContainer({item}) {
    const { isOpen, openModal, closeModal} = useNewsletterModal();
    let navigate = useNavigate();
    let screen;

    const renderErrorInfo = (content, error) => {
        return (
            <GifticonItemInfo content={content} error={error ? <span className="u-s-m-x-10" style={{color : 'red'}}>{error}</span> : null}/>
        )
    }

    const deleteStorage = () => {
        axios
            .post(
                `${process.env.REACT_APP_SERVER_URL}/api/storage/delete/` +item.gifticonStorageId,
                null,
                {headers: {Authorization: localStorage.getItem("token")}})
            .then(function (response){
                alert("삭제가 완료되었습니다");
                navigate("/redirect");
            });
    }

    const renderWaitRegistrationState = () => {
        return (
            <div className="w-r u-s-m-b-30">
                <div className="w-r__container">
                    <div id="gifticon-info-wrap" className="w-r__wrap-1">
                        <GifticonItemImage url={item.imageUrl}/>

                        <div id="gifticon-info" className="w-r__info">
                            {renderErrorInfo(item.brand, "브랜드 이름이 존재하지 않습니다")}
                            {renderErrorInfo(item.productName, "상품명이 존재하지 않습니다")}
                            {renderErrorInfo(item.barcode, "바코드 번호가 존재하지 않습니다")}
                            {renderErrorInfo(item.due, "유효기간이 존재하지 않습니다")}
                            <GifticonHiddenInfo content={item.status}></GifticonHiddenInfo>
                            <GifticonHiddenInfo content={item.flagInDb}></GifticonHiddenInfo>
                        </div>
                    </div>

                    <div id="gifticon-btn-wrap" className="w-r__wrap-2">
                        <WhiteButton innerText="삭제" _onClick={deleteStorage}/>
                        <PrimaryButton innerText="등록 하기" _onClick={() => openModal()}/>
                    </div>

                    <NewsletterModal item={item} isOpen={isOpen} closeModal={closeModal}/>
                </div>
            </div>
        );
    }

    const renderNeedApprovalState = () => {
        return (
            <div className="w-r u-s-m-b-30">
                <div className="w-r__container">
                    <div id="gifticon-info-wrap" className="w-r__wrap-1">
                        <GifticonItemImage url={item.imageUrl}/>

                        <div id="gifticon-info" className="w-r__info">
                            {renderErrorInfo(item.brand, "브랜드 이름이 존재하지 않습니다")}
                            {renderErrorInfo(item.productName, "상품명이 존재하지 않습니다")}
                            {renderErrorInfo(item.barcode, "바코드 번호가 존재하지 않습니다")}
                            {renderErrorInfo(item.due, "유효기간이 존재하지 않습니다")}
                            <GifticonHiddenInfo content={item.status}></GifticonHiddenInfo>
                            <GifticonHiddenInfo content={item.flagInDb}></GifticonHiddenInfo>
                        </div>
                    </div>

                    <div id="gifticon-btn-wrap" className="w-r__wrap-2">
                        <WhiteButton innerText="삭제" _onClick={deleteStorage}/>
                        <PrimaryButton innerText="등록 하기" _onClick={() => openModal()}/>
                    </div>

                    <NewsletterModal item={item} isOpen={isOpen} closeModal={closeModal}/>
                </div>
            </div>
        );
    }

    const renderAdminApprovalState = () => {
        return(
            <div className="w-r u-s-m-b-30">
                <div className="w-r__container">
                    <div id="gifticon-info-wrap" className="w-r__wrap-1">
                        <GifticonItemImage url={item.imageUrl}/>

                        <div id="gifticon-info" className="w-r__info">
                            {renderErrorInfo(item.brand, "브랜드 이름이 존재하지 않습니다")}
                            {renderErrorInfo(item.productName, "상품명이 존재하지 않습니다")}
                            {renderErrorInfo(item.barcode, "바코드 번호가 존재하지 않습니다")}
                            {renderErrorInfo(item.due, "유효기간이 존재하지 않습니다")}
                            <GifticonHiddenInfo content={item.status}></GifticonHiddenInfo>
                            <GifticonHiddenInfo content={item.flagInDb}></GifticonHiddenInfo>
                        </div>
                    </div>

                    <div id="gifticon-btn-wrap" className="w-r__wrap-2">
                        <span>상품 검수 진행중 입니다.</span>
                        <WhiteButton innerText="삭제" _onClick={deleteStorage}/>
                    </div>
                </div>
            </div>

        )
    }

    const renderFailRegistrationState = () => {
        return (
            <div className="w-r u-s-m-b-30">
                <div className="w-r__container">
                    <div id="gifticon-info-wrap" className="w-r__wrap-1">
                        <GifticonItemImage url={item.imageUrl}/>

                        <div id="gifticon-info" className="w-r__info">
                            {renderErrorInfo(item.brand, "브랜드 이름이 존재하지 않습니다")}
                            {renderErrorInfo(item.productName, "상품명이 존재하지 않습니다")}
                            {renderErrorInfo(item.barcode, "바코드 번호가 존재하지 않습니다")}
                            {renderErrorInfo(item.due, "유효기간이 존재하지 않습니다")}
                            <GifticonHiddenInfo content={item.status}></GifticonHiddenInfo>
                            <GifticonHiddenInfo content={item.flagInDb}></GifticonHiddenInfo>
                        </div>
                    </div>

                    <div id="gifticon-btn-wrap" className="w-r__wrap-2">
                        <WhiteButton innerText="삭제" _onClick={deleteStorage}/>
                        <PrimaryButton innerText="등록 하기" _onClick={() => openModal()}/>
                    </div>

                    <NewsletterModal item={item} isOpen={isOpen} closeModal={closeModal}/>
                </div>
            </div>
        );
    }

    if (item.status === "WAIT_REGISTRATION") {
        screen = renderWaitRegistrationState();
    } else if (item.status === "NEED_APPROVAL") {
        screen = renderNeedApprovalState();
    } else if(item.status === "ADMIN_APPROVAL") {
        screen = renderAdminApprovalState();
    } else if(item.status === "FAIL_REGISTARTION"){
        screen = renderFailRegistrationState();
    }

    return (
        screen
    )
}