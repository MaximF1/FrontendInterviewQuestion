import React, { useEffect } from 'react';
import { Outlet } from "react-router-dom";
import { observer } from 'mobx-react-lite';
import favoriteList from '../../store/favoriteList';
import { DataInStore } from '../../types/types';
import './main.scss';

const Main: React.FC = observer(() => {
    window.addEventListener("beforeunload", () => {
        const dataInStore: DataInStore = favoriteList.favoriteList;
        localStorage.setItem("fav-items", JSON.stringify(dataInStore));
    });

    useEffect(() => {
        favoriteList.getDataOnload();
    }, [])

    return (
        <main className="main">
            <Outlet />
        </main>
    );
});

export default Main;
