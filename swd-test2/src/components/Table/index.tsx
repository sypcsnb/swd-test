import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Popconfirm, Flex, Typography, Button } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import type { TableRowSelection } from "antd/es/table/interface";
import { deleteForm } from "../../state/form";
import { setUuid } from "../../state/updateByUuid";

interface DataType {
  uuid: string;
  name: string;
  gender: string;
  phoneNumber: string;
  nationality: string;
}

const TableComponent = () => {
  const dispatch = useDispatch();
  const forms = useSelector((state: any) => state.forms);
  const { uuid } = useSelector((state: any) => state.updateByUuid);
  const [selectedRow, setSelectedRow] = useState<any>([]);
  const isEditing = (record: { uuid: string }) => record.uuid === uuid;

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Gender",
      dataIndex: "gender",
      sorter: (a, b) => a.gender.length - b.gender.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      sorter: (a, b) => a.phoneNumber.length - b.phoneNumber.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Nationality",
      dataIndex: "nationality",
      sorter: (a, b) => a.nationality.length - b.nationality.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (_, record: { uuid: string }) => {
        const editable = isEditing(record);
        return editable ? (
          <Flex gap="small">
            <span>
              <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                <a>Cancel</a>
              </Popconfirm>
            </span>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record.uuid)}
            >
              <a>Delete</a>
            </Popconfirm>
          </Flex>
        ) : (
          <Flex gap="small">
            <Typography.Link
              disabled={uuid !== ""}
              onClick={() => handleUpdate(record.uuid)}
            >
              Edit
            </Typography.Link>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record.uuid)}
            >
              <a>Delete</a>
            </Popconfirm>
          </Flex>
        );
      },
    },
  ];

  const cancel = () => {
    dispatch(setUuid(""));
  };

  const handleUpdate = (uuid: string) => {
    dispatch(setUuid(uuid));
  };

  const handleDelete = (uuid: string) => {
    dispatch(deleteForm(uuid));
  };

  const handleDeleteOutside = () => {
    if (selectedRow.length) {
      for (let i = 0; i < selectedRow.length; i++) {
        dispatch(deleteForm(selectedRow[i].uuid));
      }
    }
  };

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  // rowSelection objects indicates the need for row selection
  const rowSelection: TableRowSelection<DataType> = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRow(selectedRows);
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };

  return (
    <Flex vertical gap="small" style={{ marginTop: "16px" }}>
      <Flex gap="small" align="center">
        <Button onClick={handleDeleteOutside}>Delete</Button>
      </Flex>

      <Table
        columns={columns}
        dataSource={forms}
        rowKey={(record) => record.uuid}
        rowSelection={{ ...rowSelection }}
        onChange={onChange}
      />
    </Flex>
  );
};

export default TableComponent;
