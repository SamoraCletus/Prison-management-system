import { useState } from "react";

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);
  const onChange = (e) => {
    let value = e.target.value;
    setValues({ ...values, [e.target.name]: value });
  };

  const onFileChange = (e) => {
    let image = e.target.files[0];
    setValues({ ...values, [e.target.name]: image });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    callback();
  };
  return {
    onChange,
    onSubmit,
    values,
    onFileChange,
  };
};
