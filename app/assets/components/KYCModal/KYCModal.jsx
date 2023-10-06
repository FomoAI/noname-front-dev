import styles from "./kyc.module.scss";
import { useState } from "react";
import Modal from "../modal/Modal";
import BlueInput from "../../../components/UI/inputs/BlueInput";
import SquareBtn from "../../../components/UI/buttons/SquareLightBtn";
import emailValidation from "../../../utils/emailValidation";
import updateUser from "../../../services/updateUser";
import Loader from '../../../assets/components/loader/Loader'
import Success from "../success/Success";

export default function KYCModal({ isVisible, handler ,success,setSuccess,userEmail}) {
  const [loading,setLoading] = useState(false)
  const [email, setEmail] = useState(() => userEmail ? userEmail : '');

  const saveKYC = async (event) => {
    event.preventDefault()
    setLoading(true)
    const isValid = emailValidation(email)
    if(isValid){
      const {success,user} = await updateUser({KYC:email})
      
      success && setSuccess(true)
    }
    setLoading(false)
  }

  if(loading){
    return (
      <Loader/>
    )
  }

  return (
    <Modal bodyClass="top-modal" handler={handler} isVisible={isVisible} title="KYC (email)">
      {
        success
        ?
        <Success/>
        :
        <form onSubmit={saveKYC} className={styles.body}>
        <div className={styles.description}>
        Complete KYC by entering your email 
        </div>
        <div className={styles.input}>
          <label className={styles.key} htmlFor="email-input-kyc">Email</label>
          <BlueInput
            id="email-input-kyc"
            placeholder="example@gmail.com"
            value={email}
            handler={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.info}>
          <span className={styles.key}>
          KYC 
          </span>
          <span className={styles.value}>
          Coming soon
          </span>
        </div>
        <SquareBtn 
        btnId="none"
        width="358"
        text={"Save"} 
        type="red" />
        </form>
      }
    
    </Modal>
  );
}
