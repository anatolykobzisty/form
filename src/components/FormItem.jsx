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

FormItem.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  form: PropTypes.shape({
    touched: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
  }).isRequired,
};

export default FormItem;
