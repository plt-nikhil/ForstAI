import styles from "./Modal.module.scss"
import Modal from 'react-bootstrap/Modal';
import Image from "next/image";
import genImg from "/public/assets/images/gen_img.png";

function GenerateModal(props: any) {
  return (
    <div className={`${styles.Modal_contain}`}>
      <Modal className={`${styles.Modal_contain_inner} ${styles.generate_modal} nml_modal generate_modal`}
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            ScarJo is a unique protected Work but you can generate images and videos for fee.
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className={styles.modal_inner}>
            <div className={styles.modal_inner_left}>
              <h2>There is a fee required to generate this image</h2>
              <div className="row">
                <div className="col-md-6">
                <div className={`${styles.normal_form} ${styles.numInputfld}`}>
                    <label>Flat up-front fee</label>
                    <input className={styles.inputfld} type="text" name="" />
                  </div>
                </div>
                <div className={`${styles.pl_3} col-md-6`}>
                  <div className={`${styles.normal_form} ${styles.numInputfld}`}>
                    <label>Per Generation</label>
                    <input className={styles.inputfld} type="text" name="" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className={`${styles.normal_form} ${styles.numInputfld}`}>
                    <label>Daily Fee</label>
                    <input className={styles.inputfld} type="text" name="" />
                  </div>
                </div>
                <div className={`${styles.pl_3} col-md-6`}>
                  <div className={styles.normal_form}>
                    <label>Max Generation</label>
                    <input className={styles.inputfld} type="text" name="" />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className={styles.normal_form}>
                    <label>Max Days</label>
                    <input className={styles.inputfld} type="text" name="" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className={styles.profile_pic}><Image src={genImg} alt='' /></div>
          </div>
        </Modal.Body>
      <Modal.Footer>
        <div className={styles.footer_btn}>
          <button className={styles.primary_btn}>Generate</button>
        </div>
      </Modal.Footer>
    </Modal>
    </div>
  );
}

export default GenerateModal;