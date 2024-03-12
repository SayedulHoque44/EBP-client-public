import { Form } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Controller } from "react-hook-form";

const EBFTextarea = ({ type, name, label, disabled }) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <TextArea
              {...field}
              type={type}
              rows={4}
              disabled={disabled}
              id={name}
              size="large"
              placeholder={`Enter ${label} here...`}
            />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default EBFTextarea;
