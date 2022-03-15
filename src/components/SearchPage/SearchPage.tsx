import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { DataInStore, SetDataState } from '../../types/types';
import { IImageData } from '../../interfaces/interfaces';
import favoriteList from "../../store/favoriteList";
import iconLogo from "../../assets/heart-icon.svg";
import iconLogoActive from "../../assets/heart-icon-active.svg";
import './searchPage.scss';

const SearchForm: React.FC = observer(() => {
    const [value, setValue] = useState('');
    const [data, setData] = useState<SetDataState>(null);
    const [loading, setLoading] = useState(false);
    const [empty, setEmpty] = useState(false);
    const [modalIsOpened, setmodalIsOpened] = useState('');
    
    const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const getFavoriteImages = (data: DataInStore) => {
        data.forEach((item: IImageData) => {
            favoriteList.favoriteList.forEach((elem: IImageData) => {
                if (item.id === elem.id) {
                    item.liked = true;
                }
            });
        });

        setData(data);
    };

    const getData = (params: string) => {
        setLoading(true);
        const searchParams: string = params.split(' ').join('+');

        fetch(`https://pixabay.com/api/?key=26135366-78369e6daec33065d34d1015d&q=${searchParams}&image_type=photo`)
            .then((response) => response.json())
            .then((json) => {
                getFavoriteImages(json?.hits);
                setLoading(false);
                !json.hits.length ? setEmpty(true) : setEmpty(false);
            });
    };

    const formSubmitHandler = (e: React.FormEvent) => {
        e.preventDefault();

        if (value === '') {
            return;
        } else {
            if (data) {
                setEmpty(true);
            }
            
            getData(value);
        }
    };

    const addToFavoriteBtnClickHandler = (elem: IImageData) => {
        elem.liked = !elem.liked;

        favoriteList.addNewElem(elem);
    };

    const closeModalHandler = (url: string) => {
        setmodalIsOpened(url);
    };

    return (
        <div className="main__searchPage searchPage">
            <div className={classNames("searchPage__formContainer", {"active": data, "": !data})}>
                <form className="searchPage__formContainer__form" onSubmit={formSubmitHandler}>
                    <input type="text" name="searchInput" id="searchInput" placeholder="What images would you like to see on Pixabay?" value={value} onChange={handleInputValue}/>
                    <button type="submit">{loading ? "searching" : "search"}</button>
                    <Link to="/favorite">manage favorites</Link>
                </form>
            </div>
            <div className={classNames("searchPage__results", {"active": data, "hidden": !data})}>
                {!empty ? 
                    <div className="searchPage__results__listOfElems listOfElems">
                        {data && data.map((item: IImageData) => (
                            <div className="listOfElems__elemCell" key={Math.random() * 100}>
                                <img src={`${item.webformatURL}`} alt="webformat"  onClick={() => closeModalHandler(`${item.largeImageURL}`)} />
                                <button type="button" data-value="liked" onClick={() => addToFavoriteBtnClickHandler(item)}>
                                    <img src={favoriteList.getLikedValue(item) ? iconLogoActive : iconLogo} alt="heart"/>
                                </button>
                            </div>
                        ))}
                    </div> :
                    <div className="searchPage__results__emptyPage">
                        <span>🤔 No results found!</span>
                    </div> 
                }
            </div>
            <div className={classNames("modalWindow", {"": modalIsOpened, "hidden": !modalIsOpened})}>
                <div className="modalWindow__inner">
                    <button type="button" data-role="close" onClick={() => closeModalHandler('')}>close</button>
                    <img src={`${modalIsOpened}`} alt="modal"/>
                </div>
            </div>
        </div>
    );
});

export default SearchForm;
