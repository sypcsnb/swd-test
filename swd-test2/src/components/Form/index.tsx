import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./index.scss";
import { Flex, Button, Radio, Form, Input, Select, DatePicker } from "antd";
import { v4 as uuidv4 } from "uuid";
import nationalities from "./nationalities.json";
import countryCodes from "./countryCodes.json";
import { addForm, updateForm } from "../../state/form";
import { setUuid } from "../../state/updateByUuid";
import { useGetFormToUpdate } from "../../state/form/hook";
import dayjs from "dayjs";

type FieldType = {
  prefix?: string;
  name?: string;
  surname?: string;
  birthDate?: string;
  nationality?: string;
  id1?: string;
  id2?: string;
  id3?: string;
  id4?: string;
  id5?: string;
  gender?: string;
  countryPhone?: string;
  phoneNumber?: string;
  passport?: string;
  expectedSalary?: string;
};

const initialValues = {
  prefix: "",
  name: "",
  surname: "",
  birthDate: "",
  nationality: "",
  id1: "",
  id2: "",
  id3: "",
  id4: "",
  id5: "",
  gender: "",
  countryPhone: "",
  phoneNumber: "",
  passport: "",
  expectedSalary: "",
};

const FormComponent = () => {
  const { uuid } = useSelector((state: any) => state.updateByUuid);
  const formToUpdate = useGetFormToUpdate(uuid);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    if (formToUpdate) {
      const updateData = {
        prefix: formToUpdate.prefix,
        name: formToUpdate.name,
        surname: formToUpdate.surname,
        birthDate: dayjs(formToUpdate.birthDate),
        nationality: formToUpdate.nationality,
        id1: formToUpdate.id.slice(0, 1),
        id2: formToUpdate.id.slice(1, 5),
        id3: formToUpdate.id.slice(5, 10),
        id4: formToUpdate.id.slice(10, 12),
        id5: formToUpdate.id.slice(12),
        gender: formToUpdate.gender,
        countryPhone: formToUpdate.countryPhone,
        phoneNumber: formToUpdate.phoneNumber,
        passport: formToUpdate.passport,
        expectedSalary: formToUpdate.expectedSalary,
      };
      form.setFieldsValue(updateData);
    } else {
      form.setFieldsValue(initialValues);
    }
  }, [formToUpdate]);

  const onFinish = (values: any) => {
    console.log("Success:", values);
    const data = {
      uuid: uuid || uuidv4(),
      prefix: values.prefix,
      name: values.name,
      surname: values.surname,
      birthDate: dayjs(values.birthDate).format("MM-DD-YYYY"),
      nationality: values.nationality,
      id: values.id1 + values.id2 + values.id3 + values.id4 + values.id5,
      gender: values.gender,
      countryPhone: values.countryPhone,
      phoneNumber: values.phoneNumber,
      passport: values.passport,
      expectedSalary: values.expectedSalary,
    };
    if (uuid) {
      dispatch(updateForm({ uuid, data }));
      dispatch(setUuid(""));
      form.setFieldsValue(initialValues);
    } else {
      dispatch(addForm(data));
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleClear = () => {
    form.setFieldsValue(initialValues);
  };

  return (
    <div className="form-container">
      <Form
        style={{ maxWidth: 768 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="inline"
        form={form}
      >
        <Flex vertical gap="middle">
          <Flex>
            <Form.Item
              labelCol={{ span: 14 }}
              label="Prefix"
              name="prefix"
              rules={[{ required: true, message: "Prefix is required!" }]}
              labelAlign="left"
            >
              <Select placeholder="Prefix" style={{ width: 65 }}>
                <Select.Option value="Mr">Mr</Select.Option>
                <Select.Option value="Mrs">Mrs</Select.Option>
                <Select.Option value="Miss">Miss</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item<FieldType>
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              label="Surname"
              name="surname"
              rules={[
                { required: true, message: "Please input your surname!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Flex>
          <Flex>
            <Form.Item
              name="birthDate"
              rules={[{ required: true, message: "BirthDate is required!" }]}
              label="Birthday"
              labelAlign="left"
            >
              <DatePicker placeholder="Month/Day/Year" format={"MM/DD/YYYY"} />
            </Form.Item>
            <Form.Item<FieldType>
              labelCol={{ span: 16 }}
              label="Nationality"
              name="nationality"
              rules={[{ required: true, message: "nationality is required!" }]}
            >
              <Select
                placeholder="--Please Select--"
                style={{ width: "100px" }}
              >
                {nationalities.map((nationality) => (
                  <Select.Option value={nationality}>
                    {nationality}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Flex>
          <Form.Item
            label="ID card number"
            style={{ maxWidth: 768 }}
            labelAlign="left"
          >
            <Form.Item<FieldType>
              name="id1"
              rules={[{ required: true }]}
              style={{ display: "inline-block", width: "50px" }}
            >
              <Input maxLength={1} />
            </Form.Item>
            -
            <Form.Item<FieldType>
              name="id2"
              rules={[{ required: true }]}
              style={{
                display: "inline-block",
                width: "100px",
                margin: "0 8px",
              }}
            >
              <Input maxLength={4} />
            </Form.Item>
            -
            <Form.Item<FieldType>
              name="id3"
              rules={[{ required: true }]}
              style={{
                display: "inline-block",
                width: "100px",
                margin: "0 8px",
              }}
            >
              <Input maxLength={5} />
            </Form.Item>
            -
            <Form.Item<FieldType>
              name="id4"
              rules={[{ required: true }]}
              style={{
                display: "inline-block",
                width: "70px",
                margin: "0 8px",
              }}
            >
              <Input maxLength={2} />
            </Form.Item>
            -
            <Form.Item<FieldType>
              name="id5"
              rules={[{ required: true }]}
              style={{
                display: "inline-block",
                width: "50px",
                margin: "0 8px",
              }}
            >
              <Input maxLength={1} />
            </Form.Item>
          </Form.Item>
          <Form.Item<FieldType>
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Gender is required!" }]}
            style={{ width: 768 }}
          >
            <Radio.Group>
              <Radio value="male"> Male </Radio>
              <Radio value="female"> Female </Radio>
              <Radio value="notSpecified"> Not Specified </Radio>
            </Radio.Group>
          </Form.Item>
          <Flex>
            <Form.Item
              label="Phone Number"
              name="countryPhone"
              rules={[
                { required: true, message: "country Phone is required!" },
              ]}
            >
              <Select
                style={{
                  display: "inline-block",
                  width: "100px",
                }}
              >
                {countryCodes.map((countryCode) => (
                  <Select.Option value={countryCode.dial_code}>
                    {countryCode.dial_code}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            -
            <Form.Item
              name="phoneNumber"
              rules={[{ required: true, message: "Phone number is required!" }]}
              style={{
                display: "inline-block",
                width: "250px",
                margin: "0 8px",
              }}
            >
              <Input />
            </Form.Item>
          </Flex>

          <Flex vertical gap="middle">
            <Form.Item
              label="Passport"
              name="passport"
              rules={[{ required: true, message: "Passport is required!" }]}
              style={{ width: "50%" }}
            >
              <Input />
            </Form.Item>
            <Flex justify="space-between" style={{ width: "100%" }}>
              <Form.Item
                label="Expected Salary"
                name="expectedSalary"
                rules={[
                  { required: true, message: "Expected salary is required!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Flex>
                <Form.Item>
                  <Button onClick={handleClear}>Clear</Button>
                </Form.Item>
                {uuid ? (
                  <Form.Item>
                    <Button htmlType="submit">Update</Button>
                  </Form.Item>
                ) : (
                  <Form.Item>
                    <Button htmlType="submit">Submit</Button>
                  </Form.Item>
                )}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Form>
    </div>
  );
};

export default FormComponent;
