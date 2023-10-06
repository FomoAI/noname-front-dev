import { ColorRing } from  'react-loader-spinner'
import Lottie from "lottie-react";
import LoadingAnimation from '../../lotties-animations/loading.json'
import styles from './loader.module.scss'

const LoaderCustom = () => {
    return (
        <div className={styles.modal}>
            <div className={styles.wrapper}>
                <Lottie
                animationData={LoadingAnimation}
                />
            </div>
            {/* <ColorRing
              visible={true}
              height="150"
              width="150"
              wrapperClass="blocks-wrapper"
              colors={['#FF507D', '#FF507D', '#FF507D', '#FF507D', '#FF507D']}
            /> */}
        </div>
    );
}

export default LoaderCustom;
