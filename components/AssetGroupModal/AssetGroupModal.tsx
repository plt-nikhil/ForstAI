import { useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import styles from "./AssetGroupModal.module.scss";
import Modal from "react-bootstrap/Modal";
import * as yup from "yup";
import axios from "axios";
import { validateObject } from "@/util/basicutilityfunctions";
import { IAssetGroupDataType } from "@/@types/WorkTypes";
import RegisterWorkContext from "@/context/WorkContext";
import { IMessageResponse, Response } from "@/@types/CommonTypes";
import toast from "react-hot-toast";

type IAssetGroupProps = {
  showModal: boolean;
  handleHide: () => void;
  onSuccess: (data: IAssetGroupDataType) => void;
};

type IAssetGroupState = {
  formState: any;
  errors: Record<string, string> | undefined;
};

type IAssetGroupCreationSuccess = {
  assetGroup: {
    name: string;
    type: string;
    assetGroupId: string;
  };
};

function AssetGroupModal({
  showModal,
  handleHide,
  onSuccess,
}: IAssetGroupProps) {
  const { data: session, status } = useSession();
  const [state, setState] = useState<IAssetGroupState>({
    formState: {
      name: undefined,
      type: undefined,
    },
    errors: undefined,
  });
  const workContext = useContext(RegisterWorkContext);
  const schema = yup.object().shape({
    name: yup.string().required("Asset group name is required"),
    type: yup.string().required("Asset group type is required"),
  });
  const { errors } = state;

  const handleFormValueUpdate = (value: object) => {
    setState({
      ...state,
      formState: { ...state.formState, ...value },
    });
  };

  const createAssetGroup = () => {
    const body = {
      name: state.formState.name,
      type: state.formState.type,
    };
    if (status === "authenticated") {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/works/owned/${workContext?.workId}/asset-group/create`,
          body,
          {
            headers: {
              Authorization: `Bearer ${session.user.access}`,
            },
          }
        )
        .then((response) => {
          const result = response.data;
          if (result.success) {
            const { data } = result as Response<IAssetGroupCreationSuccess>;
            onSuccess(data.assetGroup);
            handleHide();
          } else {
            const { data } = result as IMessageResponse;
          }
        })
        .catch((error) => {
          toast.error("Failed to create asset group");
        });
    }
  };

  const handleFormSubmission = async () => {
    const validationStatus = await validateObject(schema, state.formState);
    if (validationStatus.isError) {
      setState({ ...state, errors: validationStatus.errors });
    } else {
      setState({ ...state, errors: undefined });
      createAssetGroup();
    }
  };

  useEffect(() => {
    if (!showModal) {
      setState({ ...state, errors: undefined });
    }
  }, [showModal]);

  return (
    <div className={`${styles.Modal_contain}`}>
      <Modal
        className={`${styles.Modal_contain_inner} nml_modal assets_modal`}
        show={showModal}
        onHide={handleHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        {/* closeButton */}
        <Modal.Header className={styles.header}>
          <Modal.Title
            id="contained-modal-title-vcenter"
            className={styles.title}
          >
            Create an Asset Group for this Work
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modal_body}>
          <div className="row">
            <div className="col-md-6">
              <div className={styles.normal_form}>
                <input
                  className={styles.inputfld}
                  type="text"
                  placeholder="Enter Asset Title"
                  onChange={(e) =>
                    handleFormValueUpdate({ name: e.target.value })
                  }
                />
                {errors && errors.name && (
                  <span style={{ color: "red" }}>{errors.name}</span>
                )}
              </div>
            </div>
          </div>
          <div className={styles.assets_list_box}>
            <div className={styles.assets_list}>
              <div className={styles.assets}>
                <label
                  className={`${styles.checkbox} ${styles.checkbox_field}`}
                >
                  <input
                    type="radio"
                    value="Image"
                    name="type"
                    onChange={(e) =>
                      handleFormValueUpdate({ type: e.target.value })
                    }
                  />
                  <div className={styles.checkbox__checkmark}></div>
                  <div className={styles.checkbox__body}>Images</div>
                </label>
              </div>
              <div className={styles.assets}>
                <label
                  className={`${styles.checkbox} ${styles.checkbox_field}`}
                >
                  <input
                    type="radio"
                    value="Video"
                    name="type"
                    onChange={(e) =>
                      handleFormValueUpdate({ type: e.target.value })
                    }
                  />
                  <div className={styles.checkbox__checkmark}></div>
                  <div className={styles.checkbox__body}>Videos</div>
                </label>
              </div>
              <div className={styles.assets}>
                <label
                  className={`${styles.checkbox} ${styles.checkbox_field}`}
                >
                  <input
                    type="radio"
                    value="Audio"
                    name="type"
                    onChange={(e) =>
                      handleFormValueUpdate({ type: e.target.value })
                    }
                  />
                  <div className={styles.checkbox__checkmark}></div>
                  <div className={styles.checkbox__body}>Audio</div>
                </label>
              </div>
              <div className={styles.assets}>
                <label
                  className={`${styles.checkbox} ${styles.checkbox_field}`}
                >
                  <input
                    type="radio"
                    value="GenAI"
                    name="type"
                    onChange={(e) =>
                      handleFormValueUpdate({ type: e.target.value })
                    }
                  />
                  <div className={styles.checkbox__checkmark}></div>
                  <div className={styles.checkbox__body}>GenAI Model</div>
                </label>
              </div>
              <div className={styles.assets}>
                <label
                  className={`${styles.checkbox} ${styles.checkbox_field}`}
                >
                  <input type="checkbox" disabled />
                  <div className={styles.checkbox__checkmark}></div>
                  <div className={styles.checkbox__body}>Musical Score</div>
                </label>
              </div>
            </div>

            <div className={styles.assets_list}>
              <div className={styles.assets}>
                <label
                  className={`${styles.checkbox} ${styles.checkbox_field}`}
                >
                  <input type="checkbox" disabled />
                  <div className={styles.checkbox__checkmark}></div>
                  <div className={styles.checkbox__body}>Code</div>
                </label>
              </div>
              <div className={styles.assets}>
                <label
                  className={`${styles.checkbox} ${styles.checkbox_field}`}
                >
                  <input type="checkbox" disabled />
                  <div className={styles.checkbox__checkmark}></div>
                  <div className={styles.checkbox__body}>Document</div>
                </label>
              </div>
              <div className={styles.assets}>
                <label
                  className={`${styles.checkbox} ${styles.checkbox_field}`}
                >
                  <input type="checkbox" disabled />
                  <div className={styles.checkbox__checkmark}></div>
                  <div className={styles.checkbox__body}>Fingerprints</div>
                </label>
              </div>
              <div className={styles.assets}>
                <label
                  className={`${styles.checkbox} ${styles.checkbox_field}`}
                >
                  <input type="checkbox" disabled />
                  <div className={styles.checkbox__checkmark}></div>
                  <div className={styles.checkbox__body}>Movements</div>
                </label>
              </div>
            </div>
            <div className={styles.assets_list}>
              <div className={styles.assets}>
                <label
                  className={`${styles.checkbox} ${styles.checkbox_field}`}
                >
                  <input type="checkbox" disabled />
                  <div className={styles.checkbox__checkmark}></div>
                  <div className={styles.checkbox__body}>3D Models</div>
                </label>
              </div>
              <div className={styles.assets}>
                <label
                  className={`${styles.checkbox} ${styles.checkbox_field}`}
                >
                  <input type="checkbox" disabled />
                  <div className={styles.checkbox__checkmark}></div>
                  <div className={styles.checkbox__body}>2D Models</div>
                </label>
              </div>
              <div className={styles.assets}>
                <label
                  className={`${styles.checkbox} ${styles.checkbox_field}`}
                >
                  <input type="checkbox" disabled />
                  <div className={styles.checkbox__checkmark}></div>
                  <div className={styles.checkbox__body}>Choreography</div>
                </label>
              </div>
              <div className={styles.assets}>
                <label
                  className={`${styles.checkbox} ${styles.checkbox_field}`}
                >
                  <input type="checkbox" disabled />
                  <div className={styles.checkbox__checkmark}></div>
                  <div className={styles.checkbox__body}>Other</div>
                </label>
              </div>
            </div>
          </div>
          {errors && errors.type && (
            <span style={{ color: "red" }}>{errors.type}</span>
          )}
          <button
            className={styles.primary_btn}
            type="button"
            onClick={handleFormSubmission}
          >
            Create
          </button>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AssetGroupModal;
