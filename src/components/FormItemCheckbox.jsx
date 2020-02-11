import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';
import styled from 'styled-components/macro';

const ErrorMessage = styled.span`
  color: red;
`;

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

FormItemCheckbox.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.bool.isRequired,
  }).isRequired,
  form: PropTypes.shape({
    touched: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
  }).isRequired,
};

export default FormItemCheckbox;
