import React, { Component } from 'react';
import 'antd/dist/antd.css';
import styledNormalize from 'styled-normalize';
import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components/macro';
import { Input, Button, Icon, Checkbox } from 'antd';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';

const GlobalStyle = createGlobalStyle`
  ${styledNormalize}
  
  body {
    background-color: #0f8ee9;
  }

  * {
    box-sizing: border-box;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  ul,
  ol,
  li {
    display: block;
    padding: 0;
    margin: 0;
  }
`;

const StyledBox = styled.div`
  max-width: 440px;
  padding: 40px 40px;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0px 15px 35px rgba(0, 0, 0, 1);
`;

const Label = styled.label`
  font-weight: bold;
  color: #0f8ee9;
`;

const ErrorMessage = styled.span`
  color: red;
`;

const FormItem = ({ field, label, icon, form: { touched, errors }, ...props }) => (
  <>
    <li>
      <Label htmlFor={field.name}>{label}:</Label>
      <Input
        {...field}
        {...props}
        prefix={<Icon type={icon} style={{ color: 'rgba(0,0,0,.25)' }} />}
      />
      {touched[field.name] && errors[field.name] && (
        <ErrorMessage>{errors[field.name]}</ErrorMessage>
      )}
    </li>
  </>
);

const FormItemText = ({ field, form: { touched, errors }, ...props }) => (
  <>
    <li>
      <Label htmlFor={field.name}>Знание:</Label>
      <Input
        type="text"
        {...field}
        {...props}
        prefix={<Icon type="star" style={{ color: 'rgba(0,0,0,.25)' }} />}
      />
      {touched[field.name] && errors[field.name] && (
        <ErrorMessage>{errors[field.name]}</ErrorMessage>
      )}
    </li>
  </>
);

const FormItemCheckbox = ({ field, form: { touched, errors }, ...props }) => (
  <>
    <li>
      <Checkbox {...field} {...props} checked={field.value}>
        Принять <a href="https://jaredpalmer.com/formik">условия пользовательского соглашения</a>
      </Checkbox>
      {touched[field.name] && errors[field.name] && (
        <ErrorMessage>{errors[field.name]}</ErrorMessage>
      )}
    </li>
  </>
);

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .max(50, 'Не более 50 символов')
    .required('Обязательное поле'),
  password: Yup.string()
    .matches(
      /^(?=^.{8,40}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z]).*$/,
      'Пароль должен содержать символы A-Z, a-z, 0-9'
    )
    .required('Обязательное поле'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Пароли не совпадает')
    .required('Обязательное поле'),
  email: Yup.string()
    .email('Неккоректный Email-адрес ')
    .required('Обязательное поле'),
  website: Yup.string().url('Неккоректный URL-адрес'),
  age: Yup.number()
    .min(18, 'Возраст меньше 18')
    .max(65, 'Возраст больше 65')
    .required('Обязательное поле'),
  skills: Yup.array().of(Yup.string()),
  acceptTerms: Yup.boolean().oneOf([true], 'Соглашение с условиями обязательно'),
});

const FIELDS = [
  {
    id: 'name',
    name: 'name',
    label: 'Имя',
    type: 'user',
    icon: 'user',
  },
  {
    id: 'password',
    name: 'password',
    label: 'Пароль',
    type: 'password',
    icon: 'lock',
  },
  {
    id: 'repeatPassword',
    name: 'repeatPassword',
    label: 'Повторите пароль',
    type: 'password',
    icon: 'lock',
  },
  {
    id: 'email',
    name: 'email',
    label: 'Электронная почта',
    type: 'email',
    icon: 'mail',
  },
  {
    id: 'website',
    name: 'website',
    label: 'Веб-сайт',
    type: 'text',
    icon: 'link',
  },
  {
    id: 'age',
    name: 'age',
    label: 'Возраст',
    type: 'number',
    icon: 'idcard',
  },
];

class App extends Component {
  render() {
    return (
      <>
        <GlobalStyle />
        <StyledBox>
          <Formik
            initialValues={{
              name: 'Ноунейм',
              password: '88D8gdg88',
              repeatPassword: '88D8gdg88',
              email: 'noname@gmail.com',
              website: 'http://www.noname.com',
              age: 18,
              skills: ['HTML'],
              acceptTerms: true,
            }}
            onSubmit={(values, actions) => console.log('submit!', values, actions)}
            validationSchema={validationSchema}
          >
            {({ handleSubmit, isSubmitting, values }) => {
              return (
                <Form onSubmit={handleSubmit}>
                  <ol>
                    {FIELDS.map(({ id, name, label, type, icon }) => (
                      <Field
                        key={id}
                        component={FormItem}
                        id={id}
                        name={name}
                        label={label}
                        type={type}
                        icon={icon}
                      />
                    ))}
                    <FieldArray
                      name="skills"
                      render={arrayHelpers => (
                        <>
                          {values.skills.map((skill, index) => (
                            <Field
                              key={index}
                              id={`skills[${index}]`}
                              name={`skills[${index}]`}
                              component={FormItemText}
                            />
                          ))}
                          <li>
                            <Button
                              type="primary"
                              onClick={() => arrayHelpers.push('')}
                              style={{ margin: '20px 0' }}
                              block
                            >
                              Добавить ещё навык
                            </Button>
                          </li>
                        </>
                      )}
                    />
                    <li>
                      <Button
                        type="primary"
                        htmlType="submit"
                        disabled={isSubmitting}
                        style={{ marginBottom: ' 20px' }}
                        block
                      >
                        Регистрация
                      </Button>
                    </li>
                    <Field
                      name="acceptTerms"
                      defaultChecked={values.acceptTerms}
                      component={FormItemCheckbox}
                    />
                  </ol>
                </Form>
              );
            }}
          </Formik>
        </StyledBox>
      </>
    );
  }
}

export default App;
