import "../../css/custom/index.css";
import ProductSection from "../../components/product/ProductSection";
import {useEffect, useRef, useState} from "react";
import axios from "axios";

export default function Product() {
    const [brandList, setBrandList] = useState([]);

    const [categoryList, setCategoryList] = useState([]);
    const [categoryContent, setCategoryContent] = useState([]);
    const [productList, setProductList] = useState([]);

    const [searchInput, setSearchInput] = useState("")

    const selectorRef = useRef([]);
    const searchRef = useRef();

    let page = 0;

//DOM이 road 되었을 때 getCategory 호출
    useEffect(() => {
        getCategory().then(r => {
            console.log(r);
            setCategoryList(r);
        });
    }, []);

//categoryList가 변경되었을 때 setCategoryContent
    useEffect(() => {
        setContent();
    }, [categoryList]);

    useEffect(() => {
        fetchBrandName();
    }, [categoryContent]);

    useEffect(() => {
        let categoryName = "";
        let brandName = "";

        for (let category of categoryContent) {
            if (category.checked) {
                categoryName = category.name.korName.replaceAll("/", "-");
            }
        }

        for (let brand of brandList) {
            if (brand.checked) {
                brandName = brand.brandName;
            }
        }

        fetchProduct(categoryName, brandName, searchInput);
    }, [categoryContent, brandList]);

    useEffect(() => {
        let categoryName = "";
        let brandName = "";

        for (let category of categoryContent) {
            if (category.checked) {
                categoryName = category.name.korName.replaceAll("/", "-");
            }
        }

        for (let brand of brandList) {
            if (brand.checked) {
                brandName = brand.brandName;
            }
        }

        fetchProduct(categoryName, brandName, searchInput);
    }, [searchInput]);


    const getCategory = async () => {
        let data;

        await axios.get("http://localhost:8081/api/product/categories", {headers: {Authorization: localStorage.getItem("token")}})
            .then(function (result) {
                data = result.data;
            })
            .catch(function (error) {
                console.log(error);
            })

        return data;
    }

    const setContent = () => {
        const imagePath = `/images/categorylogo/`;

        let updatedCategoryContent = categoryList.map(category => ({
            name: category,
            checked: category.engName === "ALL",
            image: imagePath + category.engName + ".png"
        }));
        setCategoryContent(updatedCategoryContent);
    }

    const fetchBrandName = async () => {
        if (categoryContent.length > 0) {
            let brandLists = [];

            let category = (categoryContent.filter((category) => category.checked)[0].name.engName.replaceAll("/", "-").toLowerCase());
            let url = "http://localhost:8081/api/product/" + category + "/brands";

            console.log("category(categoryContainer) : " + category)

            await axios
                .get(url, {headers: {Authorization: localStorage.getItem("token")}})
                .then((result) => {
                    brandLists.push({brandName: "전체", checked: true})
                    for (let r of result.data) {
                        brandLists.push({brandName: r, checked: false})
                    }
                    setBrandList(brandLists);
                });
        }
    }

    const handleCategoryClick = (event) => {
        const selectedIndex = Number(event.target.dataset.index);
        const updatedCategoryList = categoryContent.map((category, index) => ({
            ...category,
            checked: index === selectedIndex
        }));
        setCategoryContent(updatedCategoryList);
    }

    const fetchProduct = async (category, brand, name) => {
        if (!category || !brand) {
            return;
        }

        let url = ``;

        if (name) {
            url = `http://localhost:8081/api/product/page/search/${category}/${brand}/${name}?page=${page}&size=12`;
        } else {
            url = `http://localhost:8081/api/product/page/${category}/${brand}?page=${page}&size=12`;
        }

        await axios.get(url, {headers: {Authorization: localStorage.getItem("token")}})
            .then((result) => {
                setProductList(result.data.content);
            })
    }

    const handleBrandClick = (event) => {
        const updatedBrandList = [...brandList];

        updatedBrandList.forEach(brand => {
            if (brand.brandName === event.target.innerText) {
                brand.checked = true;
            } else {
                brand.checked = false;
            }
        })

        setBrandList(updatedBrandList);
    }

    const handleSearchChange = (event) => {
        let inputs = event.target.value;

        setSearchInput(inputs);
    }

    return (
        <ProductSection productList={productList} categoryContent={categoryContent}
                        brandList={brandList} fetchBrandName={fetchBrandName}
                        handleCategoryClick={handleCategoryClick} selectorRef={selectorRef}
                        handleBrandClick={handleBrandClick}
                        handleSearchChange={handleSearchChange}
                        searchInput={searchInput}></ProductSection>
    );
};