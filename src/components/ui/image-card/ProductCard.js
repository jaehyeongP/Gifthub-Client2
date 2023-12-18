import ImageContent from "./ImageContent";

function ProductCard({product}){

    return (
        <div className="col-lg-3 col-md-6 u-s-m-b-30 product-wrapper">
            <div className="product-o product-o--radius product-o--hover-off u-h-100">
            {/*    모달*/}
                <a className="aspect aspect--bg-grey aspect--square u-d-block">
                    <img className="aspect__img" src="/images/noproductimage/no-image-departmentstore.png"/>
                </a>
                <ImageContent
                    product={product}
                />
                {/*{product.brandName} <br/>*/}
                {/*{product.name}*/}
            </div>
        </div>

    );
}
export default ProductCard;