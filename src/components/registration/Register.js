import { Button, Checkbox, Form, Input, Select } from "antd";
import "antd/dist/antd.css";
import "./Register.css";
import React, { useState } from "react";
import Typography from "@mui/material/Typography";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Register = () => {
  const [form] = Form.useForm();
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="+34">+34</Option>
        <Option value="+86">+86</Option>
        <Option value="+63">+63</Option>
      </Select>
    </Form.Item>
  );
  const suffixSelector = (
    <Form.Item name="suffix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="USD">$</Option>
        <Option value="CNY">¥</Option>
      </Select>
    </Form.Item>
  );

  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(
        [".com", ".org", ".net"].map((domain) => `${value}${domain}`)
      );
    }
  };

  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));
  return (
    <>
      <Typography
        variant="h3"
        fontFamily="Digitalism"
        noWrap
        component="a"
        href="/"
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "3%",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        Cryptonita
      </Typography>
      <Form
        style={{
          width: "75%",
          marginTop: "20px",
        }}
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          prefix: "34",
        }}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "Email no válido",
            },
            {
              required: true,
              message: "Introduzca su Email",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Contraseña"
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirmar Contraseña"
          tooltip="La contraseña tiene que tener 8 caracteres"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Confirme su contraseña",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error("¡Las dos contraseñas que ingresó no coinciden!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="nickname"
          label="Nombre de Usuario"
          tooltip="¿Cómo quieres que te llamen los demás?"
          rules={[
            {
              required: true,
              message: "Introduzca su nombre de usuario",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Número de teléfono"
          rules={[
            {
              required: true,
              message: "Introduzca su número de teléfono",
            },
          ]}
        >
          <Input
            addonBefore={prefixSelector}
            style={{
              width: "100%",
            }}
          />
        </Form.Item>

        <Form.Item
          name="gender"
          label="Genero"
          rules={[
            {
              required: true,
              message: "Seleccione su género",
            },
          ]}
        >
          <Select placeholder="Seleccione su género">
            <Option value="Hombre">Male</Option>
            <Option value="Mujer">Female</Option>
            <Option value="Otros">Others</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("Acepta el acuerdo")),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            He leido el <a href="">acuerdo</a>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Register;
