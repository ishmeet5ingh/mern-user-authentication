import * as yup from 'yup';

const registerValidationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email format').required('Email is required'),
    phoneNumber: yup.string().required('Phone number is required'),
    userType: yup.string().oneOf(['Builder', 'Broker', 'Agent'], 'Invalid user type'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const loginValidationSchema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

export { registerValidationSchema, loginValidationSchema };
