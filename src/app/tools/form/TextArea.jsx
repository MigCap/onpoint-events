import React from 'react';
import { Form, Label } from 'semantic-ui-react';

const TextArea = ({
  input,
  rows,
  width,
  type,
  placeholder,
  meta: { touched, error }
}) => {
  return (
    <Form.Field error={touched && !!error} width={width}>
      <textarea {...input} placeholder={placeholder} rows={rows} />
      {touched && error && (
        <div style={{ margin: '10px auto' }}>
          <Label basic color="red">
            {error}
          </Label>
        </div>
      )}
    </Form.Field>
  );
};

export default TextArea;
