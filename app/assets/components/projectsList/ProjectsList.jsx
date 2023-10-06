import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import loader from "../../../utils/loader";
import hiddenSvg from '../../../assets/icons/hidden.svg'
import styles from "./search-project.module.scss";

const ProjectsList = ({ projects,handler}) => {
  const isAuth = useSelector((state) => state.auth.userData.isAuth)

  return (
    <div className={styles.projects}>
      {projects.map((project) => {
        return (
          !isAuth && project.hidden
          ?
          <div 
          key={project._id}
          className={styles.projectWrapper}>
              <div className={styles.hiddenImg}>
                  <Image src={hiddenSvg} alt='hidden'/>
              </div>
            <div className={styles.project + ' ' + styles.hidden}>
              <div className={styles.img}>
                <Image 
                loader={() => loader(project.img)} 
                width={'32'} height={'32'} 
                src={project.img} alt={project.title} />
              </div>
              <div className={styles.info}>
                <span className={styles.title}>{project.title}</span>
                <span className={styles.description}>NFT & Collectibles</span>
              </div>
            </div>
          </div>
          :
          <div
          onClick={() => handler(project)}
          key={project._id}
          className={styles.project}
          >
          <div className={styles.img}>
            <Image 
            loader={() => loader(project.img)} 
            width={'32'} height={'32'} 
            src={project.img} alt={project.title} />
          </div>
          <div className={styles.info}>
            <span className={styles.title}>{project.title}</span>
            <span className={styles.description}>NFT & Collectibles</span>
          </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectsList;
