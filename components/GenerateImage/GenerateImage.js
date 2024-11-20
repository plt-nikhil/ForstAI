"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { fal } from "@fal-ai/client";
import axios from "axios";
// import { Response } from "@/@types/CommonTypes";
import styles from "./GenerateImage.module.scss";
import Image from "next/image";
import Form from "react-bootstrap/Form";
import toast from "react-hot-toast";
// import { Controller, useForm } from "react-hook-form";
// import uploadImg from "/public/assets/images/upload_plus.svg";

function GenerateImageComponent() {
  const { data: session } = useSession();
  const [prompt, setPrompt] = useState("");
  const [autoNegativePrompt, setAutoNegativePrompt] = useState("");
  const [loraModelURL, setLoraModelURL] = useState("");
  const [scale, setScale] = useState(0);
  const [steps, setSteps] = useState(2);
  const [workFlow, setWorkFlow] = useState("");
  const [imageSize, setImageSize] = useState("square");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [generatedImageUrl, setGeneratedImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [ownedWorkListingData, setOwnedWorkListingData] = useState(null);
  const [ownedPurchasedWork, setOwnedPurchasedWork] = useState([]);
  const [modelName, setModelName] = useState("");

  const handleScaleChange = (event) => {
    setScale(Number(event.target.value));
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/generate/user-owned`,
          {
            headers: {
              Authorization: `Bearer ${session.user.access}`,
              "ngrok-skip-browser-warning": "69420",
            },
          }
        );

        setOwnedWorkListingData(response?.data?.data?.fetchUSerOwnedWorks);
      } catch (error) {
        console.error("Error fetching listing data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchPurchasedWork = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/purchase-work/find-trigger-word`,
          {
            headers: {
              Authorization: `Bearer ${session.user.access}`,
              "ngrok-skip-browser-warning": "69420",
            },
          }
        );
        console.log("response?.data", response?.data);
        setOwnedPurchasedWork(response?.data?.purchase);
      } catch (error) {
        toast.error("Unable to fetch the Purchased work");
        console.error("Error fetching listing data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    fetchPurchasedWork();
  }, [session.user.access]);

  const handleStepsChange = (event) => {
    setSteps(Number(event.target.value));
  };

  const handleImageSizeChange = (event) => {
    setImageSize(event.target.value);
  };

  const handleModelSelect = (modelUrl, modelName) => {
    setLoraModelURL(modelUrl);
    setModelName(modelName);
    setPrompt((prevPrompt) => `${prevPrompt} FF-${modelName}`);
  };

  fal.config({
    credentials:
      "abdc0a6e-fb67-49b3-be03-b1ca589859dc:5528163639355a6a47e2d5cdfd024bff",
  });

  const handleGenerateImage = async () => {
    setIsLoading(true);
    // setGeneratedImageUrl("");
    try {
      const result = await fal.subscribe("fal-ai/flux-lora", {
        input: {
          prompt:
            `${prompt} high-resolution` ||
            "A photorealistic closeup of a woman posing for the camera, body turned slightly while looking directly into the camera. Background is in a brightly lit bar. Dramatic, cinematic.",
          loras: [
            {
              path: loraModelURL,
            },
          ],
          // model_name: modelName,
          negative_prompt: negativePrompt || "blurry, overexposed",
          autoNegativePrompt: autoNegativePrompt || true,
          guidance_scale: scale,
          num_inference_steps: steps,
          image_size: imageSize,
        },
        logs: true,
        onQueueUpdate: (update) => {
          if (update.status === "IN_PROGRESS") {
            update.logs.map((log) => console.log(log.message));
          }
        },
      });

      console.log("result", result);

      // Set the generated image URL after successful generation
      setGeneratedImageUrl(result?.data?.images[0]?.url);
      console.log("Request ID:", result.requestId);
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setIsLoading(false);
    }
  };
  //   try {
  //     const response = await axios.post(
  //       "https://fal.ai/models/fal-ai/flux-lora/api",
  //       {
  //         prompt: prompt,
  //         auto_negative_prompt: autoNegativePrompt,
  //         negative_prompt: negativePrompt,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer abdc0a6e-fb67-49b3-be03-b1ca589859dc:5528163639355a6a47e2d5cdfd024bff`,
  //         },
  //       }
  //     );
  //     console.log("Response of AI API : ", response);

  //     if (response.data && response.data.image_url) {
  //       setGeneratedImageUrl(response.data.image_url);
  //     } else {
  //       console.error("Unexpected response format:", response.data);
  //     }
  //   } catch (error) {
  //     console.error("Error generating image:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  console.log("ownedPurchasedWork", ownedPurchasedWork);

  return (
    <section className={styles.licensed_wrapper}>
      <div className={styles.licensed_header}>
        <h1>Generate Image</h1>
      </div>
      <div className={`container-fluid ${styles.generatimage}`}>
        <div className="row">
          <div className={`${styles.generat_left_contain} col-md-12 col-lg-8`}>
            <div className="row">
              <div className="col-md-12">
                <div className={`${styles.bg_box} ${styles.bg_box_contain}`}>
                  {/* <div className={styles.image_upload_flex}> */}
                  {/* <div className={styles.image_upload_contain}>
                      <div className={styles.image_upload}>
                        <button type="button">
                          <Image
                            src={uploadImg}
                            alt=""
                            width={500}
                            height={500}
                          />
                        </button>
                        <span>Thumbnail</span>
                      </div>
                    </div> */}
                  {/* <div className={styles.imageupload_textarea_contain}>
                      <div className={styles.imageupload_type}> */}
                  <div className="flex row">
                    <div id={styles.advance_box} className="col-md-7">
                      <h5>Prompt</h5>
                      <Form.Group
                        className="h-100"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Control
                          as="textarea"
                          // disabled
                          rows={8}
                          placeholder="Enter Prompt or Select Prompt Designer, Owned and Licensed Works options to
                              build your prompt. Then re-arrange elements in order of priority."
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
                          id={styles.form_control}
                        />
                      </Form.Group>
                    </div>
                    <div className="col-md-5">
                      <h6>Inputs</h6>

                      <div className={styles.input_section}>
                        <div className="d-flex flex-column input-form">
                          <Form.Group
                            controlId="scaleSlider"
                            className="flex items-center gap-2 mb-2"
                          >
                            <label className="text-[14px] whitespace-nowrap min-w-20 text-[#D7D8ED] font-medium">
                              Workflow
                            </label>
                            <Form.Control
                              as="input"
                              placeholder="Flux[dev] with Loras"
                              value={workFlow}
                              onChange={(e) => setWorkFlow(e.target.value)}
                              id={styles.form_control}
                            />
                          </Form.Group>

                          <Form.Group
                            controlId="imageSize"
                            className="flex items-center gap-2 mb-2"
                          >
                            <label className="text-[14px] whitespace-nowrap min-w-20 text-[#D7D8ED] font-medium">
                              Image Size
                            </label>
                            <Form.Control
                              as="select"
                              value={imageSize}
                              onChange={handleImageSizeChange}
                              id={styles.form_control}
                            >
                              <option value="">Select Size</option>
                              <option value="square">Square</option>
                              <option value="square_hd">Square_hd</option>
                              <option value="portrait_4_3">Portrait_4_3</option>
                              <option value="portrait_16_9">
                                Portrait_16_9
                              </option>
                              <option value="landscape_4_3">
                                landscape_4_3
                              </option>
                              <option value="landscape_16_9">
                                landscape_16_9
                              </option>
                            </Form.Control>
                          </Form.Group>

                          <Form.Group
                            controlId="scaleSlider"
                            className="flex items-center gap-2 mb-2"
                          >
                            <label className="text-[14px] whitespace-nowrap min-w-20 text-[#D7D8ED] font-medium">
                              Scale
                            </label>
                            <div className="slide-box">
                              <Form.Control
                                type="range"
                                value={scale}
                                min="0"
                                max="20"
                                onChange={handleScaleChange}
                                className="range1 p-0"
                              />
                              <span id="rangeValue">{scale}</span>
                            </div>
                          </Form.Group>

                          <Form.Group
                            controlId="stepsSlider"
                            className="flex items-center gap-2 mb-0"
                          >
                            <label className="text-[14px] whitespace-nowrap min-w-20 text-[#D7D8ED] font-medium">
                              Steps
                            </label>
                            <div className="slide-box">
                              <Form.Control
                                type="range"
                                value={steps}
                                min="1"
                                max="50"
                                onChange={handleStepsChange}
                                className="range1 p-0"
                              />
                              <span id="rangeValue">{steps}</span>
                            </div>
                          </Form.Group>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/*    </div>
                    </div> */}
                  {/* </div> */}

                  {/* <div className="col-md-6">
                    <div id={styles.advance_box}>
                      <Form.Group
                        className="mb-4"
                        controlId="exampleForm.ControlInput1"
                      >
                        <label>LORA Model Path</label>

                        <Form.Control
                          as="textarea"
                          rows={5}
                          placeholder="Enter LORA model path"
                          value={loraModelURL}
                          onChange={(e) => setLoraModelURL(e.target.value)}
                          id={styles.form_control}
                        />
                      </Form.Group>
                    </div>
                  </div> */}

                  <div className="row mt-3">
                    <div className="col-md-6">
                      <div id={styles.advance_box}>
                        <Form.Group
                          className="mb-4"
                          controlId="exampleForm.ControlInput1"
                        >
                          <label>Automatic Negative Prompt</label>

                          <Form.Control
                            as="textarea"
                            rows={5}
                            placeholder="Add descriptive detail to emphasize in the
generated image in order of importance."
                            value={autoNegativePrompt}
                            onChange={(e) =>
                              setAutoNegativePrompt(e.target.value)
                            }
                            id={styles.form_control}
                          />
                        </Form.Group>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div id={styles.advance_box}>
                        <Form.Group className="mb-4" controlId="negativePrompt">
                          <label>Negative Prompt</label>

                          <Form.Control
                            as="textarea"
                            rows={5}
                            placeholder="Add descriptive detail to exclude in the
generated image in order of importance."
                            value={negativePrompt}
                            onChange={(e) => setNegativePrompt(e.target.value)}
                            id={styles.form_control}
                          />
                        </Form.Group>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      {/* <div className="col-md-12"> */}
                      <button
                        onClick={handleGenerateImage}
                        disabled={isLoading}
                        className={styles.gradian_bt}
                      >
                        {isLoading ? "Generating..." : "Generate Image"}
                      </button>
                      {/* <button className={styles.gradian_bt}>
                          Generate Image
                        </button> */}
                      {/* </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className={styles.bg_box}>
                  <div className="row mb-4">
                    <div className="col-md-12">
                      {/* <div className="row"> */}
                      <h5>Generation Results</h5>
                      {/* </div> */}

                      <div className="border-1 p-4 border-site">
                        <div className="flex flex-col items-center bg-gray-800 rounded-lg shadow-md max-w-[320px]">
                          {generatedImageUrl ? (
                            <Image
                              src={generatedImageUrl}
                              alt="Generated"
                              width={320}
                              height={176}
                              className="rounded"
                            />
                          ) : (
                            <div className="w-full h-44 bg-gray-700 rounded flex items-center justify-center">
                              <span className="text-white text-xl">
                                {isLoading ? "Loading..." : "Image"}
                              </span>
                            </div>
                          )}
                          {/* <div className="w-full h-44 bg-gray-700 rounded flex items-center justify-center">
                          <span className="text-white text-xl">Image</span>
                        </div> */}
                        </div>
                      </div>
                      <button className="mt-4 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
                        Save
                      </button>
                      <button className="mt-4 ml-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-purple-600">
                        Download
                      </button>
                      <button className="mt-4 ml-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-purple-600">
                        Generate Video
                      </button>
                      {/* <div className="row">
                        <div className="col-md-4">
                          <div id={styles.advance_box}>
                            <Form.Group
                              className="mb-4"
                              controlId="exampleForm.ControlInput1"
                            >
                              <label>Focus Subject 1</label>

                              <Form.Select
                                aria-label="Person"
                                className=""
                                id={styles.form_control}
                              >
                                <option value="">Person</option>
                                <option value="minimalist">Minimalist</option>
                                <option value="watercolor">Watercolor</option>
                                <option value="traditional">Traditional</option>
                              </Form.Select>
                            </Form.Group>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div id={styles.advance_box}>
                            <Form.Group
                              className="mb-4"
                              controlId="exampleForm.ControlInput1"
                            >
                              <label>Interaction</label>

                              <Form.Select
                                aria-label="Wearing"
                                className=""
                                id={styles.form_control}
                              >
                                <option value="">Wearing</option>
                                <option value="minimalist">Minimalist</option>
                                <option value="watercolor">Watercolor</option>
                                <option value="traditional">Traditional</option>
                              </Form.Select>
                            </Form.Group>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div id={styles.advance_box}>
                            <Form.Group
                              className="mb-4"
                              controlId="exampleForm.ControlInput1"
                            >
                              <label>Focus Subject 2</label>

                              <Form.Select
                                aria-label="Shoes"
                                className=""
                                id={styles.form_control}
                              >
                                <option value="">Shoes</option>
                                <option value="minimalist">Minimalist</option>
                                <option value="watercolor">Watercolor</option>
                                <option value="traditional">Traditional</option>
                              </Form.Select>
                            </Form.Group>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-4">
                          <div id={styles.advance_box}>
                            <Form.Group
                              className="mb-4"
                              controlId="exampleForm.ControlInput1"
                            >
                              <label>Action</label>

                              <Form.Select
                                aria-label="Posing"
                                className=""
                                id={styles.form_control}
                              >
                                <option value="">Posing</option>
                                <option value="minimalist">Minimalist</option>
                                <option value="watercolor">Watercolor</option>
                                <option value="traditional">Traditional</option>
                              </Form.Select>
                            </Form.Group>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div id={styles.advance_box}>
                            <Form.Group
                              className="mb-4"
                              controlId="exampleForm.ControlInput1"
                            >
                              <label>Background</label>

                              <Form.Select
                                aria-label="Outdoor mountains"
                                className=""
                                id={styles.form_control}
                              >
                                <option value="">Outdoor mountains</option>
                                <option value="minimalist">Minimalist</option>
                                <option value="watercolor">Watercolor</option>
                                <option value="traditional">Traditional</option>
                              </Form.Select>
                            </Form.Group>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div id={styles.advance_box}>
                            <Form.Group
                              className="mb-4"
                              controlId="exampleForm.ControlInput1"
                            >
                              <label>Expression</label>

                              <Form.Select
                                aria-label="Smiling"
                                className=""
                                id={styles.form_control}
                              >
                                <option value="">Smiling</option>
                                <option value="minimalist">Minimalist</option>
                                <option value="watercolor">Watercolor</option>
                                <option value="traditional">Traditional</option>
                              </Form.Select>
                            </Form.Group>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-4">
                          <div id={styles.advance_box}>
                            <Form.Group
                              className="mb-4"
                              controlId="exampleForm.ControlInput1"
                            >
                              <label>Style</label>

                              <Form.Select
                                aria-label="Realistic"
                                className=""
                                id={styles.form_control}
                              >
                                <option value="">Realistic</option>
                                <option value="minimalist">Minimalist</option>
                                <option value="watercolor">Watercolor</option>
                                <option value="traditional">Traditional</option>
                              </Form.Select>
                            </Form.Group>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div id={styles.advance_box}>
                            <Form.Group
                              className="mb-4"
                              controlId="exampleForm.ControlInput1"
                            >
                              <label>Camera Angle</label>

                              <Form.Select
                                aria-label="Wide"
                                className=""
                                id={styles.form_control}
                              >
                                <option value="">Wide</option>
                                <option value="minimalist">Minimalist</option>
                                <option value="watercolor">Watercolor</option>
                                <option value="traditional">Traditional</option>
                              </Form.Select>
                            </Form.Group>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div id={styles.advance_box}>
                            <Form.Group
                              className="mb-4"
                              controlId="exampleForm.ControlInput1"
                            >
                              <label>Lighting</label>

                              <Form.Select
                                aria-label="Side lit"
                                className=""
                                id={styles.form_control}
                              >
                                <option value="">Lighting</option>
                                <option value="minimalist">Minimalist</option>
                                <option value="watercolor">Watercolor</option>
                                <option value="traditional">Traditional</option>
                              </Form.Select>
                            </Form.Group>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`${styles.generat_right_contain} col-md-12 col-lg-4`}>
            <div className="row h-100">
              <div
                className="col-md-12 overflow-y-auto"
                style={{ maxHeight: "400px" }}
              >
                <div className={styles.bg_box}>
                  <h6>Owned Works</h6>
                  <div className={styles.tag_outer}>
                    <ul>
                      {ownedWorkListingData &&
                        ownedWorkListingData.length > 0 &&
                        ownedWorkListingData?.map((work, idx) => (
                          <li
                            key={work._id}
                            className={`cursor-pointer ${
                              loraModelURL === work._id ? styles.selected : ""
                            }`}
                            onClick={() => {
                              const lora_model_url =
                                work?.loraModel?.diffusers_lora_file?.url || "";
                              handleModelSelect(lora_model_url, work.name);
                            }}
                          >
                            {work?.name}
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-12  ">
                <div className={styles.bg_box}>
                  <h6>Licensed Works</h6>
                  <div className={styles.tag_outer}>
                    <ul>
                      {ownedPurchasedWork &&
                        ownedPurchasedWork.length > 0 &&
                        ownedPurchasedWork?.map((work, idx) => (
                          <li
                            key={idx}
                            //     ${
                            //    loraModelURL === idx ? styles.selected : ""
                            //  }
                            className={`cursor-pointer`}
                            onClick={() =>
                              handleModelSelect(work.url, work?.triggerName)
                            }
                          >
                            {work?.triggerName}
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className={`col-md-12 ${styles.ml_8} ${styles.mt_5}`}>
            <button className={styles.gradian_bt}>Save</button>
          </div> */}
        </div>
      </div>
    </section>
  );
}

export default GenerateImageComponent;
