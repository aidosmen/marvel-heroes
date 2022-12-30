import { useEffect, useState, SyntheticEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchHeroes, searchHeroes } from "../store/heroes";
import { RootState } from "../store/store";
import { StatusEnum } from "../store/heroes";
import { AppDispatch } from "../store/store";
import { Input, AddHeroButton, HeroList, Button } from "../components";

export const Main = () => {
  const { heroes, status } = useSelector((state: RootState) => state.heroes);
  const [buttonPopup, setButtonPopup] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchHeroes());
  }, []);

  const loading = <div className="loader">Loading...</div>;

  const searchHandler = (e: SyntheticEvent): void => {
    const value = (e.target as HTMLInputElement).value;
    setTimeout(() => {
      dispatch(searchHeroes(value.toLowerCase()));
    }, 100);
  };

  return (
    <>
      <header>
        <h1>Marvel Heroes</h1>
        <Input search={true} onChange={(e) => searchHandler(e)} />
      </header>
      {status === StatusEnum.PENDING ? (
        loading
      ) : (
        <>
          <main>
            <div className="hero-wrapper">
              <HeroList stateHeroes={heroes || []} />
            </div>
          </main>
          <footer>
            <AddHeroButton
              openPopUp={() => setButtonPopup(true)}
              trigger={buttonPopup}
              closePopUp={() => setButtonPopup(false)}
            />
          </footer>
        </>
      )}
    </>
  );
};
