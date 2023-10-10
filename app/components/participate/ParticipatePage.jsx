import useParticipate from "../../hooks/useParticipate";
import ParticipateCard from "../../assets/components/participateCard/ParticipateCard";
import EndedProject from "../../assets/components/endedProject/EndedProject";
import LoaderCustom from "../../assets/components/loader/Loader";
import styles from "../styles/participate.module.scss";

export default function ParticipatePage({ project, type, id }) {
  const {
    cards,
    modals,
    isActual,
    connectHandler,
    loading,
    selectNft,
    claimValue,
    resetCard
  } = useParticipate({ type, id, project });

  if(loading){
    return <LoaderCustom/>
  }

  return isActual ? (
    <>
      <div className={styles.body}>
        {cards.map((card, index) => {
          return (
            <ParticipateCard
              resetCard={resetCard}
              claimValue={claimValue}
              selectNft={selectNft}
              project={project}
              connectHandler={connectHandler}
              modals={modals}
              card={card}
              key={card.title}
              index={index}
            />
          );
        })}
      </div>
    </>
  ) : (
    <div className={styles.endedProject}>
      <EndedProject project={project} />
    </div>
  );
}
