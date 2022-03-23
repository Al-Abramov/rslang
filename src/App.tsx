import React from "react";
import LoginPage from "./pages/authorization/login";
import GamesPage from "./pages/games/games";
import SprintPage from "./pages/games/sprint/sprint";
import HomePage from "./pages/home/home";
import StatisticsPage from "./pages/statistics/statistics";
import TextbookPage from "./pages/textbook/textbook";
import { Route, Routes, BrowserRouter, Link, HashRouter } from "react-router-dom";
import RegistrationPage from "./pages/authorization/registration";
import { Main } from "./components/Main/Main";
import TeamPage from "./pages/team/team";
import { AudioCall } from "./pages/audiocall/Audiocall";

import './style.scss';
import { Savanna } from "./pages/savanna/Savanna";


function App() {
  return (
    <HashRouter>
      <Main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="registration" element={<RegistrationPage />} />
          <Route path="textbook" element={<TextbookPage />} >
            <Route path="/textbook/:tab" element={<TextbookPage />} />
            <Route path="/textbook/:tab/:page" element={<TextbookPage />} />
          </Route>
          <Route path="games" element={<GamesPage />} />
          <Route path="/games/sprint" element={<SprintPage />} />
          <Route path="statistics" element={<StatisticsPage />} />
          <Route path="team" element={<TeamPage />} />
          <Route path="games/savanna" element={<Savanna />} />
          <Route path="games/audiocall" element={<AudioCall />} />
        </Routes>
      </Main>
    </HashRouter>
  )
}

export default App
