import React from "react";
import {Formik, Form, Field, FieldProps} from 'formik';
import * as yup from 'yup';
import { FC } from "react";
import { useSelector } from "react-redux";
import { FormInput } from '../ui-kit';
import { Button, CircularProgress } from "@mui/material";
import style from './LoginForm.scss';

interface FormProps {
  title: string;
  handleClick: (user: {email: string, password: string}) => void;
  isFetching: boolean;
}

let validationSchema = yup.object().shape({
  password: yup.string().required('Поле обязательное к заполнению')
  .min(8, 'Пароль слишком короткий, минимум 8 символов')
  .matches(/[a-zA-Z]/, 'Пароль должен содержать цифры и латинские буквы'),
  email: yup.string().required('Поле обязательное к заполнению').email('Не корректный email'),
});

export const LoginForm: FC<FormProps> = ({title, handleClick, isFetching}) => {
  const user = useSelector((state: any) => state.user)

  return (
    <Formik onSubmit={handleClick} initialValues={{email: '', password : ''}} validationSchema={validationSchema}>
      <Form className={style.formStyle}>
        <div className={style.controlsWrapper}>
          <h2>Log in</h2>
          <div className={style.controlsWrapper__control}>
            <Field 
            type="email"
            name="email"
            placeholder="email"
            >
            {(props:FieldProps) => <FormInput label="Name" id={"name"} {...props}/>}
            </Field>
          </div>
          <div className={style.controlsWrapper__control}>
            <Field 
            type="password"
            name="password"
            placeholder="password"
            >
            {(props:FieldProps) => <FormInput label="Password" id={"password"} {...props}/>}
            </Field>
          </div>
          <Button type="submit" className={style.formBtn}>
            {title}
          </Button>
          {isFetching && <CircularProgress />}
        </div>
      </Form>
    </Formik>
  )
}
