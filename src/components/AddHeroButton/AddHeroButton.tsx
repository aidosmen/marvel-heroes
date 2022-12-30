import { Button, PopUp } from "../ui";
import { AddHeroForm } from "../AddHeroForm";
import "./AddHeroButton.css";

interface Props {
  openPopUp: () => void;
  closePopUp: () => void;
  trigger: boolean;
}

export const AddHeroButton: React.FC<Props> = ({
  openPopUp,
  closePopUp,
  trigger,
}) => (
  <div className="add-hero-wrapper">
    <Button className="add-hero" onClick={openPopUp}>
      +
    </Button>
    <PopUp trigger={trigger} onClick={closePopUp}>
      <AddHeroForm closePopUp={closePopUp} />
    </PopUp>
  </div>
);
