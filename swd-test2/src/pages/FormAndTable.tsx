import React from "react";
import { Flex } from "antd";
import "./FormAndTable.scss";
import FormComponent from "../components/Form";
import TableComponent from "../components/Table";

const FormAndTable = () => {
  return (
    <div className="container">
      <Flex vertical align="center">
        <FormComponent />
        <TableComponent />
      </Flex>
    </div>
  );
};

export default FormAndTable;
