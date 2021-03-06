import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import city from '../../../assets/utils/images/originals/city.jpg'
import citynights from '../../../assets/utils/images/originals/citynights.jpg'
import citydark from '../../../assets/utils/images/originals/citydark.jpg'
import Slider from "react-slick";
import new_logo from '../../../assets/utils/images/originals/new_logo.jpg'
import { userActions } from '../../../_actions';
import { history } from '../../../_helpers';
import { Trans, i18next } from 'react-i18next';

class RecoverPassword extends React.Component {
    constructor(props) {
        super(props);


        // reset login status
        //this.props.dispatch(userActions.logout());

        this.state = {
            userName: '',
            email: '',
            submitted: false,
            token: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { userName } = this.state;
        const { dispatch } = this.props;
        if (userName) {
            dispatch(userActions.getToken(userName));
        }
    }

    render() {

        const { loggingIn, token, i18n } = this.props;
        const { userName, submitted } = this.state;
        const settings = {
            dots: true,
            infinite: true,
            fade: true,
            speed: 800,
            slidesToShow: 1,
            autoplay: true,
            slidesToScroll: 1
        };
        return (
            <div className="app-container app-theme-white body-tabs-shadow">
                <div className="app-container">
                    <div className="h-100">
                        <div className="h-100 no-gutters row">
                            <div className="d-none d-lg-block col-lg-4">
                                <div className="slider-light">
                                    <div className="slick-slider">
                                        <Slider {...settings}>
                                            <div>
                                                <div className="position-relative h-100 d-flex justify-content-center align-items-center bg-plum-plate" tabIndex="-1">
                                                    <div className="slide-img-bg" style={{ backgroundImage: `url(${city})` }}></div>
                                                    <div className="slider-content"><h3>MẠNG LƯỚI RỘNG KHẮP</h3>
                                                        <p>Áp dụng công nghệ tiên tiến, trí tuệ nhân tạo (AI) vào toàn bộ quá trình của chiến dịch để giúp nhãn hàng và Influence kết nối một cách hiệu quả nhất trên diện rộng hơn.</p></div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="position-relative h-100 d-flex justify-content-center align-items-center bg-premium-dark" tabIndex="-1">
                                                    <div className="slide-img-bg" style={{ backgroundImage: `url(${citynights})` }}></div>
                                                    <div className="slider-content"><h3>THÂN THIỆN NGƯỜI DÙNG</h3>
                                                        <p>Nền tảng thân thiện với người dùng, giúp bạn dễ dàng truy cập và làm việc mọi lúc mọi nơi</p></div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="position-relative h-100 d-flex justify-content-center align-items-center bg-sunny-morning" tabIndex="-1">
                                                    <div className="slide-img-bg" style={{ backgroundImage: `url(${citydark})` }}></div>
                                                    <div className="slider-content"><h3>MẠNG LƯỚI RỘNG KHẮP</h3>
                                                        <p>Áp dụng công nghệ tiên tiến, trí tuệ nhân tạo (AI) vào toàn bộ quá trình của chiến dịch để giúp nhãn hàng và Influence kết nối một cách hiệu quả nhất trên diện rộng hơn.</p></div>
                                                </div>
                                            </div>
                                        </Slider>
                                    </div>
                                </div>
                            </div>
                            <div className="h-100 d-flex bg-white justify-content-center align-items-center col-md-12 col-lg-8">
                                <div className="mx-auto app-login-box col-sm-12 col-md-10 col-lg-9">
                                    {/* <div className="app-logo"></div> */}
                                    <div>
                                        <img src={new_logo} alt="Kols Viet" style={{ width: '95px' }} />
                                    </div>
                                    <h4 className="mb-0">
                                        <span className="d-block"><Trans>Please check your email to reset your password</Trans></span></h4>
                                    <div className="divider row"></div>
                                    <div>
                                        <form className="" onSubmit={this.handleSubmit}>
                                            <div className="form-row">
                                                <div className="col-md-6">
                                                    <div className="position-relative form-group">
                                                        <label htmlFor="userName" className="">Email</label>
                                                        <input type="userName" name="userName" id="userName" placeholder="" className="form-control" value={userName} onChange={this.handleChange} />
                                                        {submitted && !userName &&
                                                            <div className="help-block text-danger">Email is required</div>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div className="position-relative form-check"><input name="check" id="exampleCheck" type="checkbox" className="form-check-input" /><label htmlFor="exampleCheck" className="form-check-label">Keep me logged in</label></div> */}
                                            <div className="divider row"></div>
                                            <div className="d-flex align-items-center">
                                                    {/* <button type="submit" className="btn btn-primary btn-lg">Login to Dashboard</button> */}
                                                    <input type="submit" name="signup" id="signup" className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-lg" value="Submit" />
                                                    {
                                                        loggingIn &&
                                                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                                    }
                                                </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn, token } = state.authentication;
    return {
        loggingIn,
        token
    };
}

const connectedRecoverPassword = connect(mapStateToProps)(RecoverPassword);
export { connectedRecoverPassword as RecoverPassword }; 