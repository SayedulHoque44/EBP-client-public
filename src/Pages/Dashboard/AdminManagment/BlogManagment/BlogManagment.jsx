import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { Button, Modal, Pagination, Select, Space, Table, Tag } from "antd";
import Search from "antd/es/input/Search";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { BsFillFilePostFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import EBFSelect from "../../../../Shared/Components/EBFSelect";
import EBFrom from "../../../../Shared/Components/EBFrom";
import EBInput from "../../../../Shared/Components/EBInput";
import {
  EBP_Images_CDN_BaseUrl,
  EBP_S3_Images_BUCKET_NAME,
  EBP_s3Client,
  getObjectKeyFromUrl,
} from "../../../../Util/utils";
import {
  useDeleteSingleBlogMutation,
  useGetBlogsQuery,
  useUpdateSingleBlogMutation,
} from "../../../../redux/Api/BlogsManagmentApi/BlogManagmentApi";
import CreateBlogModal from "./CreateBlogModal";

const BlogManagment = () => {
  const [params, setParams] = useState([]);
  const [page, setPage] = useState(1);
  const {
    data: Blogs,
    isLoading,
    isFetching,
  } = useGetBlogsQuery([
    { name: "page", value: page },
    { name: "limit", value: 10 },
    { name: "sort", value: "-createdAt" },
    ...params,
  ]);
  const metaData = Blogs?.meta;

  // SearchTerm
  const onSearch = (value) => {
    const searchItemRemove = params.filter(
      (item) => item.name !== "searchTerm"
    );
    setParams([...searchItemRemove, { name: "searchTerm", value }]);
  };

  // select Blogs type
  const handleBlogTypeSelect = (value) => {
    const blogsTypeRemove = params.filter((item) => item.name !== "type");
    if (value !== undefined) {
      setParams([...blogsTypeRemove, { name: "type", value }]);
    } else {
      setParams([...blogsTypeRemove]);
    }
  };

  const onChange = (_pagination, filters, _sorter, extra) => {
    if (extra.action === "filter") {
      const queryParams = [];

      filters.pin?.forEach((item) =>
        queryParams.push({ name: "pin", value: item })
      );
      setParams(queryParams);
    }
  };

  const customData = Blogs?.result?.map((item) => {
    return {
      key: item._id,
      title: item.title,
      description: item.description,
      type: item.type,
      imageUrl: item.imageUrl,
      pin: item.pin,
    };
  });

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (desc) => {
        return <span>{desc.substring(0, 50) + "......."}</span>;
      },
    },
    {
      title: "Type",
      key: "type",
      dataIndex: "type",
      render: (type) => {
        return (
          <span>
            <Tag color={type === "Announcement" ? "purple" : "green"}>
              {type.toUpperCase()}
            </Tag>
          </span>
        );
      },
    },
    {
      title: "Pinned",
      key: "pin",
      dataIndex: "pin",
      filters: [
        {
          text: "PINNED",
          value: "true",
        },
        {
          text: "NOT PINNED",
          value: "false",
        },
      ],
      render: (pin) => {
        return (
          <span>
            <Tag color={pin === true ? "green" : "red"}>
              {pin === true ? "PINNED" : "NOT PINNED"}
            </Tag>
          </span>
        );
      },
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        // console.log(item);
        return (
          <Space>
            <Link to={`/admin/student-data/${item.key}`}>
              <Button>Details</Button>
            </Link>
            <EditBlogsModal BlogInfo={item} />
            <DeleteBlog blogId={item.key} imageUrl={item.imageUrl} />
          </Space>
        );
      },
    },
  ];

  return (
    <div className="py-10">
      <div className="mb-5 flex justify-between gap-2">
        <div className="flex gap-2 items-center">
          <span> Total Blogs: </span>{" "}
          <span className="flex gap-1 items-center font-semibold">
            {metaData?.total} <BsFillFilePostFill />
          </span>
          <CreateBlogModal />
        </div>
        <div className="flex gap-3 items-center">
          <Search
            className="bg-blue-500"
            style={{ width: 360 }}
            placeholder="Search Blogs"
            loading={false}
            onSearch={onSearch}
            enterButton
          />
          {params.length > 0 && (
            <Button
              className="bg-blue-500"
              type="primary"
              onClick={() => setParams([])}>
              SHOW ALL
            </Button>
          )}
        </div>
        <div className="flex justify-center">
          <Space wrap>
            <Select
              showSearch
              allowClear
              placeholder="Select Blogs Type"
              optionFilterProp="children"
              onChange={handleBlogTypeSelect}
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
          </Space>
        </div>
      </div>

      <Table
        onChange={onChange}
        loading={isFetching}
        columns={columns}
        pagination={false}
        dataSource={customData}
      />
      <Pagination
        current={page}
        onChange={(value) => {
          setPage(value);
        }}
        pageSize={metaData?.limit}
        total={metaData?.total}
      />
    </div>
  );
};

const EditBlogsModal = ({ BlogInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateBlogs, { isLoading }] = useUpdateSingleBlogMutation();

  const handleSubmit = async (data) => {
    const update = await updateBlogs({ blogId: BlogInfo.key, blogData: data });
    if (update.data.success) {
      toast.success(update.data.message);
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
      <Button onClick={showModal}>Edit</Button>
      <Modal
        title={`Update ${BlogInfo.title}`}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}>
        <EBFrom
          onSubmit={handleSubmit}
          defaultValues={{
            title: BlogInfo.title,
            description: BlogInfo.description,
          }}>
          <EBInput type="text" name="title" label="Title" />
          <EBInput type="text" name="description" label="Title" />
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
            defaultValue={BlogInfo.type}
          />
          <EBFSelect
            label="Pin The Blog"
            name="pin"
            options={[
              {
                value: true,
                label: "Pinned",
              },
              {
                value: false,
                label: "Not Pinned",
              },
            ]}
            defaultValue={BlogInfo.pin}
          />
          <Button htmlType="submit" disabled={isLoading}>
            Submit
          </Button>
        </EBFrom>
      </Modal>
    </>
  );
};

//  delete a single Blog
const DeleteBlog = ({ blogId, imageUrl }) => {
  const [deleteSingleBlogQuery, { isLoading: isDelSingleBlogLoading }] =
    useDeleteSingleBlogMutation();
  const [loading, setLoading] = useState(false);

  const objectKey = getObjectKeyFromUrl(EBP_Images_CDN_BaseUrl, imageUrl);

  const handleDelete = async () => {
    Swal.fire({
      title: `Are You Sure Delete User!`,
      text: "After Delete You won't Revert It!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        try {
          if (objectKey) {
            const params = {
              Bucket: EBP_S3_Images_BUCKET_NAME,
              Key: objectKey,
            };
            const command = new DeleteObjectCommand(params);
            await EBP_s3Client.send(command);
            console.log("Object deleted successfully");
          }
          const deletedBlog = await deleteSingleBlogQuery(blogId);

          if (deletedBlog.data.success) {
            toast.success(deletedBlog.data.message);
          }
        } catch (error) {
          toast.error(
            "something went wrong deleting the blog Please Contact To Developer!"
          );
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    });
  };

  return (
    <Button
      title={imageUrl}
      disabled={isDelSingleBlogLoading | loading}
      onClick={handleDelete}
      type="primary"
      danger>
      Delete Blog
    </Button>
  );
};

export default BlogManagment;
