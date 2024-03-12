import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Modal, Upload } from "antd";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { LuImagePlus } from "react-icons/lu";
import { createBlogSchema } from "../../../../Schemas/CreateBlogSchema";
import EBFSelect from "../../../../Shared/Components/EBFSelect";
import EBFTextarea from "../../../../Shared/Components/EBFTextarea";
import EBFrom from "../../../../Shared/Components/EBFrom";
import EBInput from "../../../../Shared/Components/EBInput";
import {
  EBP_Images_CDN_BaseUrl,
  EBP_S3_Images_BUCKET_NAME,
  EBP_s3Client,
  getObjectKeyFromUrl,
} from "../../../../Util/utils";
import { useCreateBlogMutation } from "../../../../redux/Api/BlogsManagmentApi/BlogManagmentApi";

const CreateBlogModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [createBlogQuery, { isLoading }] = useCreateBlogMutation();

  const handleSubmit = async (data) => {
    let imageUrl = "";
    if (file) {
      const folderName = "BlogImages";
      const params = {
        Bucket: EBP_S3_Images_BUCKET_NAME,
        Key: `${folderName}/${file.name}`,
        Body: file,
      };
      setLoading(true);
      setUploading(true);
      try {
        const command = new PutObjectCommand(params);
        const response = await EBP_s3Client.send(command);
        imageUrl = `${EBP_Images_CDN_BaseUrl}${folderName}/${file.name}`;
      } catch (error) {
        setLoading(false);
        console.error("Failed to upload image:", error);
        toast.error("Failed to upload Image!");
        return;
      } finally {
        setUploading(false);
      }
    }

    const blogData = { ...data, imageUrl };
    // create blog in database
    setLoading(true);
    try {
      const create = await createBlogQuery(blogData);
      if (create?.data?.success) {
        toast.success(create.data.message);
      } else if (create.error) {
        // if image already uploded in aws before blog created - then delete it!
        if (imageUrl) {
          const params = {
            Bucket: EBP_S3_Images_BUCKET_NAME,
            Key: getObjectKeyFromUrl(EBP_Images_CDN_BaseUrl, imageUrl),
          };
          const command = new DeleteObjectCommand(params);
          await EBP_s3Client.send(command);
          console.log("Object deleted successfully");
        }
        toast.error(create.error.data.message);
      }
    } catch (error) {
      console.error("Failed to create blog:", error);
      if (imageUrl) {
        const params = {
          Bucket: EBP_S3_Images_BUCKET_NAME,
          Key: getObjectKeyFromUrl(EBP_Images_CDN_BaseUrl, imageUrl),
        };
        const command = new DeleteObjectCommand(params);
        await EBP_s3Client.send(command);
        console.log("Object deleted successfully");
      }
      toast.error("Failed to create blog!");
    } finally {
      setLoading(false);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button className="bg-blue-500 text-white" onClick={showModal}>
        Create Blog
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}>
        <EBFrom
          onSubmit={handleSubmit}
          resolver={zodResolver(createBlogSchema)}>
          <EBInput type="text" name="title" label="Title" />
          <EBFTextarea type="text" name="description" label="Description" />

          <div className="mb-5">
            <h2 className="mb-2">File Uplode :</h2>
            <Upload
              //    {...props}
              beforeUpload={() => false}
              onChange={(e) => setFile(e.fileList[0]?.originFileObj)}
              listType="picture"
              maxCount={1}>
              <Button className="flex items-center gap-1">
                <LuImagePlus />
                {file ? `Replace : ${file.name}` : "Uplode"}
              </Button>
            </Upload>
          </div>
          <EBFSelect
            label="Type"
            name="type"
            options={[
              {
                value: "Announcement",
                label: "Announcement",
              },
              {
                value: "Congratulate",
                label: "Congratulate",
              },
              {
                value: "Blog",
                label: "Blog",
              },
            ]}
          />
          <EBInput type="text" name="tags" label="Tags" />
          <Button disabled={isLoading | loading} htmlType="submit">
            Submit
          </Button>
        </EBFrom>
      </Modal>
    </>
  );
};

export default CreateBlogModal;
