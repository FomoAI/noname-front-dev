import styles from "./search-project.module.scss";
import Link from "next/link";
import Image from "next/image";
import loader from "../../../utils/loader";
import { useSelector } from "react-redux";
import hiddenSvg from '../../../assets/icons/hidden.svg'

const SearchProject = ({ projects,handler}) => {
  const isAuth = useSelector((state) => state.auth.userData.isAuth)

  return (
    <div onClick={handler} className={styles.projects}>
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
          <Link
          key={project._id}
          className={styles.project}
          href={`/${project.path}/${project._id}`}
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
          </Link>
        );
      })}
    </div>
  );
};

export default SearchProject;
