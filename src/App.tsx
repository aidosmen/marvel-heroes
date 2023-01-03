import { Routes, Route, Navigate } from "react-router-dom";
import { Main, HeroDescription } from "./containers";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/:id" element={<HeroDescription />} />
    </Routes>
  );
};

export default App;
