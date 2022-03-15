import React from 'react';
import { Routes, Route } from "react-router-dom";
import FavoritePage from './components/FavoritePage/FavoritePage';
import Main from './components/Main/Main';
import SearchPage from './components/SearchPage/SearchPage';
import './styles/style.scss';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="/" element={<SearchPage />} />
          <Route path="/favorite" element={<FavoritePage />} />
          <Route path="*" element={<span>Something wents wrong</span>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
