import Image from "next/image";
import loader from "../../../utils/loader";
import hiddenSvg from '../../../assets/icons/hidden.svg'
import styles from "../../styles/search-project.module.scss";

const ProjectsList = ({ projects,handler}) => {

  return (
    <div className={styles.projects}>
      {projects.map((project) => {
        return (
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
            <span className={styles.description}>{project.description}</span>
          </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectsList;
