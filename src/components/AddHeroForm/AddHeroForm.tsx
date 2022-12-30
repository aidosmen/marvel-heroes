import { SyntheticEvent, useState } from "react";
import { useDispatch } from "react-redux";

import "./AddHeroForm.css";

import { Input, TextArea, Button } from "../ui";
import { MarvelHero, addHero } from "../../store/heroes";
import { AppDispatch } from "../../store/store";

interface Props {
  closePopUp: () => void;
}

export const AddHeroForm: React.FC<Props> = ({ closePopUp }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [hero, setHero] = useState<Partial<MarvelHero>>({
    id: "",
    description: "",
    name: "",
    tags: [],
  });
  const [tag, setTag] = useState<string>("");
  const heroNameHandler = (e: SyntheticEvent): void => {
    const name = (e.target as HTMLInputElement).value;
    setHero((prevState: any) => ({ ...prevState, name }));
  };
  const heroDescriptionHandler = (e: SyntheticEvent): void => {
    const description = (e.target as HTMLInputElement).value;
    setHero((prevState: any) => ({ ...prevState, description }));
  };
  const heroImageHandler = (e: SyntheticEvent): void => {
    const target = e.target as HTMLInputElement;
    if (target.files) {
      const image = target.files[0];
      const fSize = Math.round(image.size / 1024);
      if (fSize >= 1000) {
        alert("File too big please select file less than 1mb");
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.addEventListener("load", () => {
        setHero((prevState: any) => ({ ...prevState, image: reader.result }));
      });
      setHero((prevState: any) => ({ ...prevState, image }));
    }
  };

  const heroTagsHanderl = (e: SyntheticEvent): void => {
    const tag = (e.target as HTMLInputElement).value;
    setTag(tag);
    if (tag.indexOf(",") >= 1) {
      setHero((prevState: any) => ({
        ...prevState,
        tags: [...prevState.tags, tag.substring(0, tag.length - 1)],
      }));
      setTag("");
    }
  };

  const submitHandler = (e: SyntheticEvent): void => {
    e.preventDefault();
    if (!hero?.name || !hero.image) {
      alert("fill name or image at least");
      return;
    }
    setTimeout(() => {
      localStorage.setItem(
        "newHero",
        JSON.stringify({ ...hero, isAddedManualy: true })
      );
      closePopUp();
      dispatch(addHero());
    }, 100);
  };

  return (
    <>
      <h3>Please add your hero</h3>
      <form className="add-hero-form" action="submit">
        <Input
          required={true}
          label="Name"
          onChange={(e) => heroNameHandler(e)}
        />
        <TextArea
          onChange={(e) => heroDescriptionHandler(e)}
          label="Hero Description"
        />
        <Input
          label="Hero picture (png size should be less than 1mb due to LS limits)"
          onChange={(e) => heroImageHandler(e)}
          typeFile={true}
        />
        {hero.tags?.length ? (
          <div>
            Added Tags
            <br />
            {/* added tag as a key just a temporary solution as we imitate all http requests */}
            <ul>
              {hero.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </div>
        ) : null}
        <Input
          label="Add hero tags separating with comma"
          onChange={(e) => heroTagsHanderl(e)}
          value={tag}
        />
        <Button type="submit" onClick={(e) => submitHandler(e)}>
          Submit
        </Button>
      </form>
    </>
  );
};
