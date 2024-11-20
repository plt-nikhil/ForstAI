import styles from "./Modal.module.scss"
import Modal from 'react-bootstrap/Modal';

function ModalComp(props: any) {
  return (
    <div className={`${styles.Modal_contain}`}>
      <Modal className={`${styles.Modal_contain_inner} nml_modal`}
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            There is a fee required to generate this image
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
            <div className={`${styles.normal_form} ${styles.numInputfld}`}>
                <label>Flat up-front fee</label>
                <input className={styles.inputfld} type="text" name="" />
              </div>
            </div>
            <div className="col-md-6">
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
            <div className="col-md-6">
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
        </Modal.Body>
      <Modal.Footer>
        <div className={styles.footer_btn}>
          <button onClick={props.onHide} className={styles.secondary_btn}>Decline</button>
          <button className={styles.primary_btn}>Accept</button>
        </div>
      </Modal.Footer>
    </Modal>
    </div>
  );
}

export default ModalComp;