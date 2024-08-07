import {
  Button,
  Form as BootstrapForm,
  Container,
  Image,
  Row,
  Col,
} from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import { newUser } from '@utils/request';
import Header from '@components/header/Header';
import { addUser, selectAllUsers } from '@slices/channelsSlice';
import styles from '@styles/css/SignUp.module.css';
import { errorOnRequest } from '@utils/toast/notify';
import SignUpIcon from '@assets/icons/reg_confirm_email_with_button_0.png';

const SignUp = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const users = useSelector((state) => selectAllUsers(state));
  const sortedUsers = users.map((item) => item.name);
  const usernameRef = useRef();
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .max(20, t('validation.username'))
      .min(3, t('validation.username'))
      .required(t('validation.requiredField'))
      .notOneOf(sortedUsers, t('validation.existedUser')),
    password: Yup.string()
      .max(20, t('validation.passwordMaxLength'))
      .min(6, t('validation.passwordMinLength'))
      .required(t('validation.requiredField')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], t('validation.confirmPassword'))
      .required(t('validation.requiredField')),
  });
  // sdasdasda
  const handleOnSubmit = async (values, { setSubmitting }) => {
    try {
      await newUser(values.username, values.password); // Assuming newUser is a function returning a promise
      dispatch(addUser({ id: _.uniqueId(), name: values.username }));
      navigate('/');
    } catch (error) {
      errorOnRequest();
      console.error('Error during sign-up', error);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    usernameRef.current.focus();
  });

  return (
    <>
      <Header />
      <Container className={styles.container}>
        <h1 className="d-flex justify-content-center font-weight-bold p-2 font-cursive">
          {t('registration')}
        </h1>
        <Formik
          initialValues={{ username: '', password: '', confirmPassword: '' }}
          validationSchema={validationSchema}
          onSubmit={handleOnSubmit}
        >
          {({ touched, errors }) => (
            <Form noValidate>
              <Row>
                <Col xs={5} lg={4}>
                  <Image src={SignUpIcon} fluid width="100%" roundedCircle />
                </Col>
                <Col
                  xs={7}
                  lg={6}
                  className="d-flex flex-column justify-content-center"
                >
                  <BootstrapForm.Group>
                    <BootstrapForm.Label htmlFor="username">
                      {t('username')}
                    </BootstrapForm.Label>
                    <BootstrapForm.Control
                      as={Field}
                      type="text"
                      name="username"
                      id="username"
                      innerRef={usernameRef}
                      isInvalid={touched.username && !!errors.username}
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className={styles.error}
                    />
                  </BootstrapForm.Group>
                  <BootstrapForm.Group>
                    <BootstrapForm.Label htmlFor="password">
                      {t('password')}
                    </BootstrapForm.Label>
                    <BootstrapForm.Control
                      as={Field}
                      type="password"
                      name="password"
                      id="password"
                      isInvalid={touched.password && !!errors.password}
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className={styles.error}
                    />
                  </BootstrapForm.Group>
                  <BootstrapForm.Group>
                    <BootstrapForm.Label htmlFor="confirmPassword">
                      {t('confirmPassword')}
                    </BootstrapForm.Label>
                    <BootstrapForm.Control
                      as={Field}
                      type="password"
                      id="password"
                      name="confirmPassword"
                      isInvalid={
                        touched.confirmPassword && !!errors.confirmPassword
                      }
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className={styles.error}
                    />
                  </BootstrapForm.Group>
                  <Button
                    className="my-4"
                    variant="outline-primary"
                    type="submit"
                  >
                    {t('registrate')}
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
};
export default SignUp;
