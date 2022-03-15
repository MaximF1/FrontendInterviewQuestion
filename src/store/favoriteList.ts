import { makeAutoObservable } from "mobx";
import { IImageData } from "../interfaces/interfaces";
import { DataInStore } from "../types/types";

class FavoriteList {
    favoriteList: DataInStore = [];

    constructor() {
        makeAutoObservable(this);
    }

    addNewElem(elem: IImageData) {
        const elemIndex: number = this.favoriteList.findIndex((item: IImageData) => item.id === elem.id);

        if (elemIndex > -1) {
            this.favoriteList.splice(elemIndex, 1);
        } else {
            this.favoriteList.push(elem);
        }
    }

    getLikedValue(elem: IImageData) {
        const elemIndex: number = this.favoriteList.findIndex((item: IImageData) => item.id === elem.id);
        
        if (elemIndex === -1) {
            return;
        }

        return this.favoriteList[elemIndex].liked;
    }

    getDataOnload() {
        if (!localStorage.getItem("fav-items")) {
            return;
        }

        const data: DataInStore = JSON.parse(localStorage.getItem("fav-items")!);
        this.favoriteList.push(...data);
    }
}

export default new FavoriteList();