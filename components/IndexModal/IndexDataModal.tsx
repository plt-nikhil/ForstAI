import styles from "./IndexModal.module.scss"
import Modal from 'react-bootstrap/Modal';

function IndexedDataModal(props: any) {
  return (
    <div className={`${styles.Modal_contain}`}>
      <Modal className={`${styles.Modal_contain_inner} nml_modal index_modal`}
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className={styles.header}>
          <Modal.Title id="contained-modal-title-vcenter" className={styles.title}>
            View Indexed Data
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modal_body}>
          <div>
          <pre className={styles.pre_code}>
            {` 
# Indexed video's metadata in JSON format.

# This call can directly go to the database, to get the video's metadata

json_data = '''

[

{

"UUID" :"582363ab-702c-4d48-af8a-290b786a3511",

"Start_Timestamp": "10s",

"sentiment": "Positive",

"End_Timestamp": "16s",

"scene_theme": "Festive",

"brand": "ROKA|LOGO",

"characters": "Large crowd of spectators",

"summary": "The scene captures an aerial view of a coastal city, featuring a large gathering 
of people at the waterfront, watching a boat race. The atmosphere appears festive with a sense 
of community gathering at the quay. Various boats, including kayaks and
motorboats, are seen in the water near a large red and white ferry.",

            `}
           </pre>
            </div> 
            <div className={styles.card_dash_box_r}>
              <button className={styles.blue_b_btn}>Cancel</button>
              <button className={styles.red_b_btn}>Re-index</button>
            </div>
        </Modal.Body>
    </Modal>
    </div>
  );
}

export default IndexedDataModal;
