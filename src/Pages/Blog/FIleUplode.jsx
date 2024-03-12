import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { Button } from "antd";
import React, { useEffect, useRef, useState } from "react";
import {
  EBP_Images_CDN_BaseUrl,
  EBP_S3_Images_BUCKET_NAME,
  EBP_s3Client,
} from "../../Util/utils";

const FileUpload = () => {
  const [file, setFile] = useState();
  const audioRef = useRef(null);
  const [image, setImage] = useState();
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // get object folder name and key.
  console.log(image);
  const handleUpload = async () => {
    if (!file) return;

    try {
      setLoading(true);
      setUploading(true);
      const folderName = "profileImagesTry";
      const params = {
        Bucket: EBP_S3_Images_BUCKET_NAME,
        Key: `${folderName}/${file.name}`,
        Body: file,
      };
      const command = new PutObjectCommand(params);
      const response = await EBP_s3Client.send(command);
      const imageUrl = `${EBP_Images_CDN_BaseUrl}${folderName}/${file.name}`;
      setImage(imageUrl);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  const handleDelete = async (key) => {
    setLoading(true);
    try {
      const params = {
        Bucket: EBP_S3_Images_BUCKET_NAME,
        Key: key,
      };
      const command = new DeleteObjectCommand(params);
      await EBP_s3Client.send(command);
      console.log("Object deleted successfully");
    } catch (error) {
      console.error("Error deleting file:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (uploading) {
        const confirmationMessage =
          "You have uploads in progress. Are you sure you want to leave?";
        event.returnValue = confirmationMessage;
        return confirmationMessage;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [uploading]);

  return (
    <div>
      <div className="p-10 flex justify-center border-2 gap-4">
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />

        {/* <video src="https://d2na8awifhfga8.cloudfront.net/Lezione 1. Definizioni Stradali e di Traffico/Part-1  Lezione 1. Definizioni Stradali e di Traffico S22.mp4"></video> */}
        <button
          onClick={handleUpload}
          disabled={loading}
          className="btn-primary p-4 disabled:bg-gray-600"
          type="submit">
          submit
        </button>
        <button
          onClick={() =>
            handleDelete(
              image?.substring(
                image?.indexOf(EBP_Images_CDN_BaseUrl) +
                  EBP_Images_CDN_BaseUrl.length
              )
            )
          }
          disabled={loading}
          className="btn-primary p-4 disabled:bg-gray-600"
          type="submit">
          delete
        </button>

        <div className="border-2 border-red-400 p-4">
          {progress > 0 && uploading && <p>Progress: {progress}%</p>}
        </div>
      </div>
      <img src={image} alt="img" />
      <audio
        ref={audioRef}
        src="https://d1vstek0gf8y4r.cloudfront.net/profileImagesTry/mixkit-arcade-retro-game-over-213.wav"></audio>
      <Button onClick={() => audioRef.current.play()}>Play Audio</Button>
    </div>
  );
};

export default FileUpload;

//

// import * as AWS from "@aws-sdk/client-s3";

// import React, { useEffect, useState } from "react";

// const S3_BUCKET = import.meta.env.VITE_AWS_S3_BUCKET;
// const REGION = import.meta.env.VITE_AWS_REGION;

// AWS.config.update({
//   accessKeyId: import.meta.env.VITE_AWS_accessKeyId,
//   secretAccessKey: import.meta.env.VITE_AWS_secretAccessKey,
// });

// const myBucket = new AWS.S3({
//   params: { Bucket: S3_BUCKET },
//   region: REGION,
// });

// const FileUplode = () => {
//   const [file, setFile] = useState();
//   const [image, setImage] = useState(
//     "https://d1vstek0gf8y4r.cloudfront.net/BlogImages/camera-1130731_1280.jpg"
//   );
//   const [uploading, setUploading] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [progress, setProgress] = useState(0);

//   // get object folder name and key.
//   const url =
//     "https://d1vstek0gf8y4r.cloudfront.net/profileImages/2024-02-15 22-18-10.mkv";
//   const baseUrl = import.meta.env.VITE_AWS_cloudFront_CDN;

//   //

//   const handleUplode = () => {
//     const folderName = "profileImages";
//     const params = {
//       Body: file,
//       Bucket: S3_BUCKET,
//       Key: `${folderName}/${file.name}`,
//     };
//     setLoading(true);
//     setUploading(true);
//     myBucket
//       .putObject(params)
//       .on("httpUploadProgress", (evt) => {
//         // setProgress(Math.round((evt.loaded / evt.total) * 100));
//         const uploadedBytes = evt.loaded;
//         const totalBytes = evt.total;
//         const percentUploaded = (uploadedBytes / totalBytes) * 100;
//         // console.log(percentUploaded);
//         setProgress(Math.round(percentUploaded));
//       })
//       .send((err) => {
//         if (err) {
//           setLoading(false);
//           console.log(err);
//         } else {
//           setLoading(false);
//           const imageUrl = `${baseUrl}${folderName}/${file.name}`;
//           console.log(imageUrl);
//           setImage(imageUrl);
//         }
//         setUploading(false);
//       });
//   };

//   const handleDelete = (Key) => {
//     // const folderName = "profileImages";
//     const params = {
//       Bucket: S3_BUCKET,
//       //Key: `${folderName}/${key}`, // Include the folder name in the Key
//       Key,
//     };
//     setLoading(true);
//     myBucket.deleteObject(params, (err, data) => {
//       if (err) {
//         setLoading(false);
//         console.log(err);
//       } else {
//         setLoading(false);
//         console.log(data);
//         console.log("Object deleted successfully");
//       }
//     });
//   };

//   useEffect(() => {
//     const handleBeforeUnload = (event) => {
//       if (uploading) {
//         const confirmationMessage =
//           "You have uploads in progress. Are you sure you want to leave?";
//         event.returnValue = confirmationMessage;
//         return confirmationMessage;
//       }
//     };

//     window.addEventListener("beforeunload", handleBeforeUnload);

//     return () => {
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//     };
//   }, [uploading, progress]);

//   return (
//     <div>
//       <div className="p-10 flex justify-center border-2 gap-4">
//         <input type="file" onChange={(e) => setFile(e.target.files[0])} />

//         <button
//           onClick={handleUplode}
//           disabled={loading}
//           className="btn-primary p-4 disabled:bg-gray-600"
//           type="submit">
//           submit
//         </button>
//         <button
//           onClick={() =>
//             handleDelete(
//               image?.substring(image?.indexOf(baseUrl) + baseUrl.length)
//             )
//           }
//           disabled={loading}
//           className="btn-primary p-4 disabled:bg-gray-600"
//           type="submit">
//           delete
//         </button>

//         <div className="border-2 border-red-400 p-4">
//           {/* {uploading && <div>Loading...</div>} */}
//           {progress > 0 && uploading && <p>Progress: {progress}%</p>}
//         </div>
//       </div>
//       <img src={image} alt="img" />
//     </div>
//   );
// };

// export default FileUplode;
