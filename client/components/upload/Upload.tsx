/* eslint-disable @next/next/no-img-element */
import React, { useState, useCallback, useMemo } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import { Alert, Button, AlertTitle } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import * as yup from "yup";
import { SchemaOf } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { postUpload } from "../../api/upload";
import CropImage from "../upload-crop/CropImage";
import styles from "./Upload.module.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import LoadingButton from "@mui/lab/LoadingButton";

interface UploadFile {
  preview: string;
  file: File;
}
type UploadType = {
  title: string;
  storeName: string;
  productRating: number[];
  uploadFile: string;
};

const Upload = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data, mutate, isLoading, isError } = useMutation({
    mutationFn: (data) => {
      return postUpload(data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getProfilePosts", data.userId],
      });
      router.push(`/profile/${data.userId}`);
    },
  });
  const schema: SchemaOf<UploadType> = yup
    .object()
    .shape({
      title: yup.string().min(1).max(100).required().defined(),
      storeName: yup.string().min(1).max(100).required().defined(),
      category: yup.string().required().defined(),
    })
    .defined();
  const ratings = [
    { id: 0, label: "Quality", score: 5 },
    { id: 1, label: "Price", score: 5 },
    { id: 2, label: "Customer Service", score: 5 },
  ];
  const [ratingArray, setRatingArray] = useState(ratings);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });
  // const redirectHome = useNavigate();

  const [placeholder, setPlaceholder] = useState("");
  const [errorAlert, setErrorAlert] = useState(false);
  const [files, setFiles] = useState<UploadFile[]>([]);
  // if files are empty throw error
  const [uploadErr, setUploadErr] = useState<string>("");
  const [croppedImage, setCroppedImage] = useState<any>([]); // send cropped files so server

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      const mapAccepted: any = acceptedFiles.map((file) => ({
        preview: URL.createObjectURL(file),
        file,
        // file.name, file.path etc....
      }));
      // it means if a file you tried to enter is wrong, mapAccepted is no value also which means its an error
      if (mapAccepted.length === 0) {
        return fileRejections.forEach((file) => {
          file.errors.forEach((err) => {
            switch (err.code) {
              case "file-too-large":
                return setUploadErr(`File is too large.`);
              case "file-invalid-type":
                return setUploadErr(`Invalid file type.`);
              case "too-many-files":
                return setUploadErr(`Upload 1 image at a time.`);
              default:
                return null;
            }
          });
        });
      }

      setFiles((current) => {
        // if less than 5 items are inserted, do not throw any error
        if (current.length < 5 && fileRejections.length === 0) {
          setUploadErr("");
        }
        //if equals to 5 items or more, throw an error
        if (current.length >= 5) {
          setUploadErr("Sobra kana boy...");
        }
        // if less than 5 items,
        if (current.length > 4) {
          return [...current];
        }
        // [5th, 4th, 3rd, 2nd, 1st] first in first out
        // files[0].preview = URL.createObjectURL(file), ng last item;
        return [...mapAccepted];
      });
    },
    [files.length]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize: 10000000, // 10 MB = 10,000,000 bytes
    accept: {
      "image/jpeg": [".jpeg"],
      "image/jpg": [".jpg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
    noKeyboard: true,
  });

  const removeItem = (img: string, idx: any) => {
    // url smallPreview
    setCroppedImage((current: any) => {
      return current.filter((previousItem: any) => previousItem !== img);
    });
    setUploadErr("");
  };
  const imgUpload = async (inputField: any) => {
    const formData: any = new FormData();

    if (croppedImage.length === 0) {
      setUploadErr("Upload an image...");
    } else {
      formData.append("title", inputField.title);
      formData.append("storeName", inputField.storeName);
      formData.append("category", inputField.category);
      formData.append("ratings", JSON.stringify(ratingArray));
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < croppedImage.length; i++) {
        formData.append("image", croppedImage[i], "crppfile.jpeg");
      }
      await mutate(formData);
    }
  };
  const incrementRating = (i: number) => {
    setRatingArray((current) => {
      if (current[i].score < 5 || current[i].score < 1) {
        current[i].score += 1;
        return [...current];
      }
      return [...current];
    });
  };
  const decrementRating = (i: number) => {
    setRatingArray((current) => {
      if (current[i].score > 5 || current[i].score > 1) {
        current[i].score -= 1;
        return [...current];
      }
      return [...current];
    });
  };
  const onSubmit = handleSubmit(
    async (data) => {
      if (croppedImage.length === 0) {
        setUploadErr("Upload an image...");
      } else {
        await imgUpload(data);
      }
    },
    (err) => {
      setErrorAlert(true);
    }
  );
  const categoryChange = (event: any) => {
    setPlaceholder(event);
  };

  return (
    <form
      className={styles["upload-con"]}
      onSubmit={onSubmit}
      encType="multipart/formdata"
    >
      <CropImage
        {...{
          files,
          setFiles,
          setCroppedImage,
          setUploadErr,
          croppedImage,
        }}
      />
      <div className={styles["upload-preview-con"]}>
        <div className={styles["dropzone-con"]} {...getRootProps()}>
          <AddCircleOutlineOutlinedIcon
            sx={{ fontSize: "2rem", color: "#90ADB0" }}
          />
          <input
            type="file"
            className={styles["dropzone-input"]}
            {...getInputProps()}
          />
          <span className={styles["dropzone-text"]}>Upload</span>
        </div>
        <div className={styles["small-preview-con"]}>
          {croppedImage?.length > 0 &&
            croppedImage?.map((img: any, idx: any) => {
              // img = [file]
              // convert the file = URL.createObjectURL(img)
              //
              const url = URL.createObjectURL(img);
              return (
                <div className={styles["remove-small-preview"]} key={idx}>
                  <div className={styles["preview-con"]}>
                    <div className={styles["img-preview-con"]} key={idx}>
                      <img
                        src={url}
                        className={styles["img-preview"]}
                        key={url}
                        alt="img"
                      />
                    </div>
                  </div>
                  <div className={styles["remove-btn-con"]}>
                    <DoNotDisturbOnIcon
                      onClick={() => removeItem(img, idx)}
                      sx={{
                        fontSize: "1rem",
                        color: "var(--blue)",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      {uploadErr ? (
        <Alert severity="error">
          <strong>{uploadErr}</strong>
        </Alert>
      ) : null}
      <div className={styles["bottom-upload-con"]}>
        <div className={styles["title-con"]}>
          <span className={styles["title-text"]}>Title</span>
          <input
            className={styles["title-input"]}
            type="text"
            {...register("title")}
          />
        </div>
        <div className={styles["store-name-con"]}>
          <span className={styles["store-name-text"]}>Store name</span>
          <input
            className={styles["store-name-input"]}
            type="text"
            {...register("storeName")}
          />
        </div>
        <div className={styles["ratings-bot-con"]}>
          <div className={styles["ratings-list-con"]}>
            {ratingArray.map(({ id, label }, index) => {
              return (
                <div className={styles["ratings-row-con"]} key={id}>
                  <div className={styles["ratings-title-con"]}>
                    <span className={styles["ratings-title-text"]}>
                      {label}
                    </span>
                  </div>
                  <div className={styles["score-con"]}>
                    <span className={styles["score-text"]}>
                      ( {ratingArray[index].score.toFixed(1)} )
                    </span>
                    <Button
                      size="small"
                      variant="contained"
                      type="button"
                      sx={{
                        fontSize: "1rem",
                        padding: 0,
                        marginLeft: "1rem",
                        backgroundColor: "var(--blue)",
                        color: "var(--white)",
                      }}
                      onClick={() => decrementRating(index)}
                    >
                      -
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      type="button"
                      sx={{
                        fontSize: "1rem",
                        padding: 0,
                        marginLeft: "0.5rem",
                        backgroundColor: "var(--blue)",
                        color: "var(--white)",
                      }}
                      onClick={() => incrementRating(index)}
                    >
                      +
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
          <FormControl sx={{ m: 1, minWidth: "100%", size: "small" }}>
            <FormHelperText>Choose one category</FormHelperText>
            <Select
              {...register("category")}
              value={placeholder}
              onChange={(e) => categoryChange(e.target.value)}
              displayEmpty
              inputProps={{ "aria-label": "choose 1 category" }}
              MenuProps={{ PaperProps: { sx: { maxHeight: 200 } } }}
              sx={{ height: "3rem", margin: "0 0 5rem 0" }}
            >
              <MenuItem value="">
                <em>-Categories-</em>
              </MenuItem>
              <MenuItem value={"Technology"}>Technology</MenuItem>
              <MenuItem value={"Health and Wellness"}>
                Health and Wellness
              </MenuItem>
              <MenuItem value={"Men's Clothing"}>Men's Clothing</MenuItem>
              <MenuItem value={"Women's Clothing"}>Women's Clothing</MenuItem>
              <MenuItem value={"Unique Items"}>Unique Items</MenuItem>
              <MenuItem value={"Travel"}>Travel</MenuItem>
              <MenuItem value={"Food and Drinks"}>Food and Drinks</MenuItem>
              <MenuItem value={"Kitchen"}>Kitchen</MenuItem>
              <MenuItem value={"Home Improvement"}>Home Improvement</MenuItem>
              <MenuItem value={"Sports and Recreation"}>
                Sports and Recreation
              </MenuItem>
              <MenuItem value={"Nature"}>Nature</MenuItem>
              <MenuItem value={"Skin Care"}>Skin Care</MenuItem>
              <MenuItem value={"Baby"}>Baby</MenuItem>
              <MenuItem value={"Toys and Gaming"}>Toys and Gaming</MenuItem>
              <MenuItem value={"Art and Design"}>Art and Design</MenuItem>
              <MenuItem value={"Pets"}>Pets</MenuItem>
              <MenuItem value={"Vehicle and Motors"}>
                Vehicle and Motors
              </MenuItem>
            </Select>
          </FormControl>
          <div className={styles["upload-btn-con"]}>
            {isLoading ? (
              <LoadingButton loading={true} />
            ) : (
              <Button
                sx={{
                  backgroundColor: "var(--blue)",
                  color: "var(--white)",
                }}
                size="large"
                variant="contained"
                type="submit"
              >
                Upload
              </Button>
            )}
          </div>
          <div className={styles["error-con"]}>
            {isError ? <div>An error occurred</div> : <></>}
          </div>
        </div>
      </div>
    </form>
  );
};

export default Upload;

//   {
//     /*<Alert severity="error">
//     <AlertTitle>Invalid</AlertTitle>
//     <strong>
//       {errors.title?.message}
//       <br />
//       {errors.storeName?.message}
//     </strong>
// </Alert>*/
//   }
