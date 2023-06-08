import React, { useState, useCallback } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import * as yup from "yup";
import { SchemaOf } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { postProfileInfo } from "../../api/profile";
import styles from "./ProfileEdit.module.scss";
import CropProfile from "../upload-editprofile-crop/CropProfile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

interface UploadFile {
  preview: string;
  file: File;
}
type UploadType = {
  about: string;
};

const ProfileEdit = ({ values }: any) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data, mutate, isLoading, isError } = useMutation({
    mutationFn: (data) => {
      return postProfileInfo(data);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getProfileInfo", data.data.userId],
      });
      router.push(`/profile/${data.data.userId}`);
      setOpen(false);
    },
    onError: () => {
      router.push("/");
    },
  });
  const schema: SchemaOf<UploadType> = yup
    .object()
    .shape({
      about: yup.string().min(1).max(160).required().defined(),
    })
    .defined();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });
  const [open, setOpen] = React.useState(false);
  const [openCrop, setOpenCrop] = React.useState(false);
  const [textAreaCount, setTextAreaCount] = useState(0);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setCroppedImage([]);
    setFiles([]);
    setOpen(false);
  };

  const [files, setFiles] = useState<UploadFile[]>([]);
  const [croppedImage, setCroppedImage] = useState<any>([]); // send cropped files so server
  const [uploadErr, setUploadErr] = useState<string>("");
  const [errorAlert, setErrorAlert] = useState(false);

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
        // if less than 2 items are inserted, do not throw any error
        if (current.length < 2 && fileRejections.length === 0) {
          setUploadErr("");
        }
        //if equals to 2 items or more, throw an error
        if (current.length >= 2) {
          setUploadErr("Sobra kana boy... only 1 item accepted");
        }
        // if less than 5 items,
        if (current.length > 0) {
          return [...current];
        }
        // [5th, 4th, 3rd, 2nd, 1st] first in first out
        // files[0].preview = URL.createObjectURL(file), ng last item;
        return [...mapAccepted];
      });
      setOpenCrop(true);
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
    const formData = new FormData();
    if (croppedImage.length === 0) {
      setUploadErr("Upload an image...");
    } else {
      formData.append("about", inputField.about);
      // eslint-disable-next-line no-plusplus
      formData.append("image", croppedImage[0], "cropprofile.jpeg");
      const uploadData: any = {
        userId: values.userId,
        formData: formData,
      };
      await mutate(uploadData);
    }
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

  const aboutCount = (e: any) => {
    setTextAreaCount(e.target.value.length);
  };
  return (
    <>
      <Button
        onClick={handleOpen}
        variant="outlined"
        sx={{
          borderColor: "var(--blue)",
          color: "var(--blue)",
          border: "u.toRem(50)",
        }}
      >
        edit profile
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form
          onSubmit={onSubmit}
          encType="multipart/formdata"
          className={styles["modal-form"]}
        >
          {openCrop ? (
            <CropProfile
              {...{
                files,
                setFiles,
                setCroppedImage,
                setUploadErr,
                croppedImage,
                setOpenCrop,
              }}
            />
          ) : (
            <div className={styles["modal-form__form"]}>
              <div className={styles["modal-form__profile-pic"]}>
                <div className={styles["modal-form__profile"]}>
                  <div
                    className={styles["modal-form__tile"]}
                    {...getRootProps()}
                  >
                    {croppedImage?.length > 0 &&
                      croppedImage?.map((img: any) => {
                        const url = URL.createObjectURL(img);
                        return (
                          <img
                            src={url}
                            className={styles["modal-form__img-preview"]}
                            key={url}
                            alt="img"
                          />
                        );
                      })}
                    <input
                      type="file"
                      className={styles["dropzone-input"]}
                      {...getInputProps()}
                    />
                  </div>
                </div>
              </div>
              <div className={styles["modal-form__about"]}>
                <div className={styles["modal-form__container"]}>
                  <span className={styles["modal-form__about-text"]}>About</span>
                </div>
                <div className={styles["modal-form__about-input-container"]}>
                  <textarea
                    className={styles["modal-form__about-textarea"]}
                    {...register("about")}
                    autoComplete="off"
                    role="presentation"
                    onChange={aboutCount}
                    maxLength={160}
                  ></textarea>
                  <div className={styles["modal-form__input-limit-container"]}>
                    <p
                      className={
                        styles["modal-form__input-limit-text-container"]
                      }
                    >
                      {textAreaCount} / 160
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className={styles["upload-btn-con"]}>
            {openCrop ? (
              <></>
            ) : (
              <Button size="large" variant="contained" type="submit">
                Upload
              </Button>
            )}
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ProfileEdit;
