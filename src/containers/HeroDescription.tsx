import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "../components";
import { AppDispatch } from "../store/store";
import { RootState } from "../store/store";
import { StatusEnum } from "../store/heroes";
import { fetchHeroesById } from "../store/heroes";
import { useEffect } from "react";

export const HeroDescription = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { heroById, status } = useSelector((state: RootState) => state.heroes);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchHeroesById(id));
    }
  }, []);

  const loading = <div className="loader">Loading...</div>;

  if (status === StatusEnum.PENDING) {
    return loading;
  }

  const getImage = (hero: any) => {
    if (!hero) return;
    if (hero?.isAddedManualy) {
      return hero.image;
    }

    return require("../assets/images/" + hero.image);
  };
  if (!heroById) {
    navigate("/");
    return null;
  }
  return (
    <div className="hero-container">
      <Button onClick={() => navigate("/")}>Back To Heroes</Button>
      <h2>{heroById?.name || ""}</h2>
      <div className="hero-image-container">
        <img src={getImage(heroById)} alt="hero avatar" />
      </div>
      <p>
        {heroById?.description || ""}
        <br />
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque amet et
        laborum sunt iusto! Explicabo harum exercitationem repellendus ex
        dolores facilis ullam nisi voluptatibus, facere quam omnis, at veniam
        autem. Dolorem quas ex tenetur animi molestias in, ratione esse deleniti
        maiores odio delectus consequuntur eaque dignissimos tempora corporis
        consectetur fugit? Sequi quae aspernatur ipsam neque necessitatibus
        consequatur dignissimos animi quas at deleniti odio, explicabo dolorum
        odit soluta? Nihil qui aperiam sit et ipsa culpa necessitatibus
        aspernatur quod! Illum nobis accusantium facere nostrum. Accusamus
        commodi id voluptatem eos? Dolore porro ullam atque impedit? Commodi in
        adipisci voluptatum magnam, perferendis amet aliquid quia perspiciatis,
        maxime nisi expedita quisquam? Consectetur itaque sit, amet nam unde
        corporis ipsum voluptatum beatae cum omnis eum veniam praesentium optio
        magnam iste. Accusamus minima eius earum, fugiat architecto repellat
        quisquam voluptatem enim, nobis repudiandae ipsum porro at ipsam? Quasi
        quod, ea quas, culpa non eaque voluptas ratione ut eum eveniet autem
        aperiam enim ex exercitationem numquam dolore reiciendis impedit aliquid
        rerum quis. Soluta nam eligendi inventore totam culpa iusto est debitis
        quaerat veritatis optio quidem illum veniam, obcaecati ratione unde
        placeat, temporibus maiores distinctio ducimus, aliquid commodi deleniti
        quibusdam numquam. Mollitia quas culpa perferendis similique asperiores.
        Totam temporibus maiores consequuntur cum laborum dolor corporis nihil
        saepe fuga, qui rem quasi incidunt nesciunt inventore ipsam beatae
        quibusdam repellat. Eligendi consequatur et aliquam, est accusamus,
        saepe odio nostrum quidem quia, labore eos laborum. Illo culpa vel
        sapiente perferendis. Culpa minus ex vel deleniti nobis id et debitis,
        obcaecati consectetur, magnam pariatur at dicta recusandae repellat
        incidunt, ratione iste quo voluptates sapiente aut numquam! Quod,
        laborum sint autem neque expedita pariatur obcaecati amet, deserunt eius
        culpa eveniet dolorem eaque itaque nostrum voluptatibus id in,
        asperiores sed? Ad distinctio non assumenda laborum molestias dolorem
        suscipit saepe officia voluptas, eaque nostrum temporibus dignissimos
        facilis cumque ratione explicabo ipsam quae id consequuntur sit. Earum
        corporis, minus, amet enim molestiae, repellat nobis reprehenderit vero
        eum quo perspiciatis aliquam perferendis asperiores accusamus quibusdam
        similique voluptatem incidunt repellendus? Itaque veniam blanditiis
        nostrum magni tempore optio ipsa maiores! Inventore, architecto magnam
        mollitia et aliquid sequi tenetur a dolor neque perspiciatis? Dolorem, a
        voluptatem. Suscipit voluptates repudiandae sit quidem earum. Facere ut
        aliquam, aliquid molestiae qui maxime at expedita illum cupiditate
        laboriosam ipsa voluptatem totam sed? Ex amet aut deserunt harum
        dignissimos illum sequi necessitatibus dolore eum, ipsam autem, impedit
        maiores facilis nostrum distinctio hic! Qui suscipit, quasi nesciunt
        fugiat itaque quae doloremque, cumque, ab exercitationem provident
        deserunt. Quam sunt labore quisquam debitis eum animi nostrum
        necessitatibus quos doloribus, voluptates sed dignissimos quibusdam
        explicabo dolore sit harum dolorum odio, iste sapiente deserunt
        doloremque qui consequatur minus rem. Voluptatibus, nisi expedita?
        Voluptates recusandae, rerum velit rem explicabo pariatur ad atque alias
        possimus perferendis dolorem assumenda! Magnam obcaecati, voluptas nihil
        saepe a quibusdam omnis quas sed iusto voluptates deleniti, vero neque
        officia? Incidunt fugit porro fuga distinctio odit, ducimus magni quidem
        velit assumenda excepturi aliquam nihil dolorum illum quia numquam cum
        nisi ipsum atque voluptates, dolores perspiciatis debitis! Recusandae,
        sapiente libero!
      </p>
    </div>
  );
};
