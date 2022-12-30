import React from "react";
import { useNavigate } from "react-router-dom";

import { MarvelHero } from ".//../../store/heroes";

interface Props {
  stateHeroes: Array<MarvelHero>;
}

export const HeroList: React.FC<Props> = ({ stateHeroes }) => {
  const navigate = useNavigate();
  const getImage = (hero: any) => {
    if (hero.isAddedManualy) {
      return hero.image;
    }

    return require("../../assets/images/" + hero.image);
  };
  return (
    <div className="hero-wrapper">
      {stateHeroes.map((hero: MarvelHero) => (
        <div key={hero.id} className="hero" onClick={() => navigate(hero.id)}>
          <img
            src={getImage(hero)}
            alt={"this is image of " + hero.name}
            width="400"
            height="300"
          />
        </div>
      ))}
    </div>
  );
};
