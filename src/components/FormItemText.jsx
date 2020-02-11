import React from 'react';
import PropTypes from 'prop-types';
import { Input, Icon } from 'antd';
import styled from 'styled-components/macro';

const Label = styled.label`
  font-weight: bold;
  color: #0f8ee9;
`;

const ErrorMessage = styled.span`
  color: red;
`;

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

FormItemText.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  form: PropTypes.shape({
    touched: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
  }).isRequired,
};

export default FormItemText;
