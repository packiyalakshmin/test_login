import logo from '../../src/assets/bird.jpg';
import '../../src/App.css';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import i18n from '../il8n';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FiUser } from "react-icons/fi";
import { FiLock } from "react-icons/fi";
import { BsGlobe } from "react-icons/bs";


const GlobeIcon = ({ width = 24, height = 24, color = 'blue' }) => (
    <BsGlobe />
)

const Login = () => {
    const { t } = useTranslation()

    const navigate = useNavigate();

    const initialValues = { email: "", password: "" };
    const [formData, setFormData] = useState(initialValues);
    const [formError, setFormError] = useState({});
    const [language, setLanguage] = useState("");
    const [isSubmit, setIsSubmit] = useState(false);

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (name === "language") {
            setLanguage(value);
            i18n.changeLanguage(value);
        }
    }

    const onLoginHandler = (e) => {
        e.preventDefault();
        setFormError(onSubmitValidate(formData));
        setIsSubmit(true);
    }

    useEffect(() => {
        i18n.changeLanguage('en');
    }, []);

    const onSubmitValidate = (value) => {
        let mailValid = true;
        let pwdValid = true;

        const error = {};

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!value.email) {
            error.email = "Email address is required";
            mailValid = false;
        } else if (!regex.test(value.email)) {
            error.email = "This is not a valid email address format";
            mailValid = false;
        }
        if (!value.password) {
            error.password = "Password is required";
            pwdValid = false;
        } else if (value.password.length < 8) {
            error.password = "Password must be more than 8 characters";
            pwdValid = false;
        } else if (value.password.length > 16) {
            error.password = "Password cannot exceed more than 16 characters";
            pwdValid = false;
        }
        if (mailValid && pwdValid) {
            navigate('/Dashboard');
        }

        return error;
    }

    const ErrorMailContent = () => {
        return (
            <>
                {formError.email === 'Email address is required' && <div className="error">{t('Email address is required')}</div>}
                {formError.email === 'This is not a valid email address format' && <div className="error">{t('This is not a valid email address format')}</div>}
            </>
        )
    }

    const ErrorPwdContent = () => {
        return (
            <>
                {formError.password === 'Password is required' && <div className="error">{t('Password is required')}</div>}
                {formError.password === 'Password must be more than 8 characters' && <div className="error">{t('Password must be more than 8 characters')}</div>}
                {formError.password === 'Password cannot exceed more than 16 characters' && <div className="error">{t('Password cannot exceed more than 16 characters')}</div>}
            </>
        )
    }
    //html
    return (
        <>
            <div className=' position-relative'>
                <div className=' position-absolute top-0 end-0 my-2'>
                    <label className='mx-2'>Change Language </label>
                    <select name="language"
                        value={language} onChange={changeHandler}>
                        <option disabled>Select Language</option>
                        <option value='en'>English</option>
                        <option value='tn'>Tamil</option>
                    </select></div>
            </div>
            <div className="App container">
                <div className="row justify-content-md-center position-absolute top-50 start-50 translate-middle">
                    <div className="col-8 shadow">
                        <div className="bg-white p-4 p-md-5 ">
                            <div className="row">
                                <div className="col-12">
                                    <div className="text-center mb-5">
                                        <img src={logo} alt="Logo" width="50%" height="50%" />
                                        <h3>{t('Login')}</h3>
                                    </div>
                                </div>
                            </div>
                            <form onSubmit={onLoginHandler} noValidate>
                                <div className="row gy-3 gy-md-4 overflow-hidden">
                                    <div className="col-12">
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <FiUser />
                                            </span>
                                            <input type="text" name="email" className="form-control" placeholder={t('Email Address')} value={formData.email} onChange={changeHandler} />
                                        </div>
                                    </div>
                                    <ErrorMailContent />
                                    <div className="col-12">
                                        <div className="input-group">
                                            <span className="input-group-text">
                                                <FiLock />
                                            </span>
                                            <input type="password" name="password" className="form-control" placeholder={t('Password')} value={formData.password} onChange={changeHandler} onInvalid={onSubmitValidate} />
                                        </div>
                                    </div>
                                    <ErrorPwdContent />
                                </div>
                                <div className="my-4">
                                    <button type="submit" className="btn btn-outline-success my-4 w-25 loginBtn">{t('Login')}</button>
                                    <div>
                                        <a href="#!" className="link-secondary text-decoration-none">{t('Forgot your password')}</a></div>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Login;
