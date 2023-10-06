import styles from "./confirm.module.scss";
import Image from "next/image";
import SquareBtn from "../../../components/UI/buttons/SquareLightBtn";
import loader from "../../../utils/loader";

export default function ConfirmModal({ closes,confirm, card }) {
  if (!card) {
    return <></>;
  }

  return (
    <div id="toggle-modal" className={styles.modal}>
      <div className={styles.modalCloses}>
        <span className={styles.modalKey}>Contribution Closes</span>
        <span className={styles.modalBlueText}>{`${closes.days}d ${closes.hours}h ${closes.minutes}m`}</span>
      </div>
      <div className={styles.modalBody}>
        <Image loader={() => loader(card.img)} width={'32'} height={'32'} src={card.img} alt={"nft-img"} />
        <span className={styles.modalTitle}>IDIA</span>
      </div>
      <SquareBtn btnId="confirm" handler={confirm} width="328" text={"Confirm"} />
    </div>
  );
}
