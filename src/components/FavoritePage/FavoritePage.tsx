import React from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { IImageData } from '../../interfaces/interfaces';
import favoriteList from "../../store/favoriteList";
import iconLogoActive from "../../assets/heart-icon-active.svg";
import './favoritePage.scss';

const FavoritePage: React.FC = observer(() => {
    const navigate = useNavigate();
    const goBack: number = -1;

    const addToFavoriteBtnClickHandler = (elem: IImageData) => {
        elem.liked = !elem.liked;

        favoriteList.addNewElem(elem);
    };

    const goBackBtnClickHandler = () => {
        navigate(goBack);
    };

    return (
        <div className="main__favImages favImages">
            <button type="button" className="favImages__goBackBtn" onClick={goBackBtnClickHandler}>go back</button>
            <div className="favImages__outerContainer">
                {favoriteList.favoriteList.length ? 
                    <div className="favImages__outerContainer__listOfFavElems listOfFavElems">
                        {favoriteList.favoriteList.map((item: IImageData) => (
                            <div className="listOfFavElems__elemCell" key={Math.random() * 100}>
                                <img src={`${item.webformatURL}`} alt="webformat"/>
                                <button type="button" data-value="liked"  onClick={() => addToFavoriteBtnClickHandler(item)}>
                                    <img src={iconLogoActive} alt="heart-active"/>
                                </button>
                            </div>
                        ))}
                    </div> :
                    <div className="emptyPage">
                        <span>Nothing to show</span>
                    </div> 
                }
            </div>
        </div>
    );
});

export default FavoritePage;
