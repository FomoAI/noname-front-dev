import { useRef, useState, useCallback } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/footer-settings.module.scss";
import SquareBtn from "../../../components/UI/buttons/SquareLightBtn";
import SocialMedia from "../socialMedia/SocialMedia";
import icons from "../../../assets/icons/socialmedia";
import changeFooter from "../../services/footerServices/changeFooter";
import Modal from "../../../assets/components/modal/Modal";
import Success from "../../../assets/components/success/Success";
import useModal from "../../../hooks/useModal";
import Loader from "../../../assets/components/loader/Loader";
import FooterLinks from "../footerLinks/FooterLinks";
import Input from "../../UI/Input";

const socialItems = [
  {
    icon: icons.discord,
    isSelect: false,
    alt: "discord",
    link: "",
  },
  {
    icon: icons.telegram,
    isSelect: false,
    alt: "telegram2",
    link: "",
  },
  {
    icon: icons.telegram,
    isSelect: false,
    alt: "telegram",
    link: "",
  },
  {
    icon: icons.medium,
    isSelect: false,
    alt: "medium",
    link: "",
  },
  {
    icon: icons.twitter,
    isSelect: false,
    alt: "twitter",
    link: "",
  },
  {
    icon: icons.facebook,
    isSelect: false,
    alt: "facebook",
    link: "",
  },
  {
    icon: icons.tikTok,
    isSelect: false,
    alt: "tikTok",
    link: "",
  },
  {
    icon: icons.instagram,
    isSelect: false,
    alt: "instagram",
    link: "",
  },
];

const FooterSettings = ({ footerData }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { modalHandler, state } = useModal();
  const [data, setData] = useState(() => ({
    links: footerData[0].links,
    socialmedia: [
      ...footerData[0].socialmedia,
      ...socialItems.filter(
        (item) =>
          !footerData[0].socialmedia.find((item2) => item.alt === item2.alt)
      ),
    ],
    discordLink: footerData[0].discordLink,
    whitepaperLink: footerData[0]?.whitepaperLink || " ",
    shillClubLink: footerData[0]?.shillClubLink || "",
  }));
  const linksTmp = useRef(data.links).current;
  
  const inputsHandler = useCallback(
    (name, value) => {
      setData({ ...data, [name]: value });
    },
    [data]
  );

  const socialMediaHandler = useCallback(
    (event, target) => {
      if (event.target.id === "link") {
        setData({
          ...data,
          socialmedia: data.socialmedia.map((item, index) => {
            if (index === target) {
              return { ...item, link: event.target.value };
            }
            return item;
          }),
        });
      }
      if (event.target.id.includes("checked")) {
        setData({
          ...data,
          socialmedia: data.socialmedia.map((item, index) => {
            if (index === target) {
              return { ...item, isSelect: !item.isSelect };
            }
            return item;
          }),
        });
      }
    },
    [data]
  );

  const save = async () => {
    try {
      const newFooterData = {
        ...data,
        socialmedia: data.socialmedia.filter((item) => item.isSelect),
      };
      setLoading(true);
      const { success } = await changeFooter(newFooterData);
      if (success) {
        modalHandler(null, true);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    <Loader />;
  }

  return (
    <>
      <div className={styles.body}>
        <div className={styles.title}>
          <h1>Footer</h1>
        </div>
        <div className={styles.links}>
          <FooterLinks
            name={"links"}
            projectLinks={linksTmp}
            handler={inputsHandler}
          />
        </div>
        <div className={styles.linksWrapper}>
          <div className={styles.discordLink}>
            <Input
              label={"Discord link"}
              handler={inputsHandler}
              name={"discordLink"}
              value={data.discordLink}
              placeholder={"https://discord.com"}
            />
          </div>
          <div className={styles.whitepaperLink}>
            <Input
              label={"Whitepaper link"}
              handler={inputsHandler}
              name={"whitepaperLink"}
              value={data.whitepaperLink}
              placeholder={"https://example.com"}
            />
          </div>
          <div className={styles.whitepaperLink}>
            <Input
              label={"Shillq Club"}
              handler={inputsHandler}
              name={"shillClubLink"}
              value={data.shillClubLink}
              placeholder={"https://example.com"}
            />
          </div>
        </div>
        <SocialMedia
          handler={socialMediaHandler}
          projectSocialMedia={data.socialmedia}
        />
        <div className={styles.save}>
          <SquareBtn handler={save} text={"Save"} width={"450"} />
        </div>
      </div>
      <Modal handler={modalHandler} isVisible={state}>
        <Success />
        <div className={styles.successBtn}>
          <SquareBtn
            width="340"
            text={"Go to home page"}
            handler={() => router.push("/admin")}
          />
        </div>
      </Modal>
    </>
  );
};

export default FooterSettings;
