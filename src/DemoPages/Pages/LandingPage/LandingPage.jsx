import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import bg3 from '../../../assets/utils/images/bg3.jpg'
import bg1 from '../../../assets/utils/images/bg1.png'
import m6 from '../../../assets/utils/images/m6.jpg'
import m5 from '../../../assets/utils/images/m5.png'
import m41 from '../../../assets/utils/images/m4.png'
import m31 from '../../../assets/utils/images/m31.gif'
// import mac from '../../../assets/utils/images/mac.png'
import big_logo from '../../../assets/utils/images/big_logo.jpg'

// import home_33 from '../../../assets/utils/images/home_33.jpg'
// import home_33 from '../../../assets/utils/images/home_33.jpg'
import { userActions } from '../../../_actions';
import { Trans } from 'react-i18next';

class LandingPage extends Component {
    constructor(props) {
        super(props);

        // reset login status
        //this.props.dispatch(userActions.logout());

        this.state = {
            userName: '',
            email: '',
            password: '',
            submitted: false,
            token: '',
            vnLanguage: 'Tiếng Việt',
            enLanguage: 'English',
            currentLanguage: ''
        };

        this.handleChangeLanguage = this.handleChangeLanguage.bind(this);
    }

    handleChangeLanguage(e) {
        const { i18n } = this.props;
        const { name, value } = e.target;
        i18n.i18n.changeLanguage(name.toLowerCase());
        localStorage.setItem('language', name.toLowerCase());
        this.setState({ currentLanguage: value });
    }

    render() {
        const { loggingIn, token, i18n } = this.props;
        const { vnLanguage, enLanguage } = this.state;

        return (
            <div className="landing-page landing-page1">

                <div className="wrapper">
                    <div className="parallax filter-gradient blue" data-color="blue">
                        <div className="parallax-background">
                            <img className="parallax-background-image" src={bg1} />
                        </div>
                        <div className="container" style={{ marginRight: 'unset' }} >
                            <div className="row">
                                <div className="col-md-9 hidden-xs">

                                </div>
                                <div className="col-md-3 col-md-offset-1">
                                    <div className="description" style={{ marginTop: '50px' }}>
                                        <input type="button" onClick={this.handleChangeLanguage} name="vn" id="vn" className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-alternate btn-lg" value={vnLanguage} />
                                        <input type="button" onClick={this.handleChangeLanguage} name="en" id="en" className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-alternate btn-lg" value={enLanguage} />
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6 hidden-xs">

                                </div>
                                <div className="col-md-6 col-md-offset-1">
                                    <div className="description">
                                        <div>
                                            <img src={big_logo} alt="Kols Viet" style={{ border: 'none', width: '150px', borderRadius: 'unset' }} />
                                        </div>
                                        <h2>NỀN TẢNG THÔNG MINH</h2>
                                        <div className="">
                                            <Link to="/pages/loginpage" className="btn btn-fill btn-info"><Trans>Get Free Access</Trans></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="section section-presentation" style={{ backgroundImage: `url(${m41})`, minHeight: '466px' }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="description">
                                        <h6 className="header-text">THẤU HIỂU KHÁCH HÀNG – AM HIỂU THỊ TRƯỜNG</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-9">
                                    <div className="description">
                                        <p>
                                            KOLV tự tin cung cấp giải pháp Influencer Marketing hiệu quả đối với các nhãn hàng và mang đến nguồn thu nhập thỏa đáng cùng cơ hội trải nghiệm sản phẩm chất lượng cho Influencer. Với đội ngũ nhân sự giàu kinh nghiệm trong lĩnh vực truyền thông cùng nền tảng công nghệ hiện đại được đầu tư và phát triển hơn 2 năm.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-3">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="section section-presentation">
                        <div className="container" style={{ backgroundImage: `url(${m31})`, minHeight: '840px', minWidth: '1482px' }}>
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="description">
                                        <h6 className="header-text">CÔNG NGHỆ HIỆN ĐẠI - KẾT NỐI DÀI LÂU</h6>
                                        <p>KOLV không chỉ được kế thừa các công nghệ dẫn đầu thị trường về xử lý dữ liệu lớn và phân tích ngôn ngữ tự động mà còn được định vị sẽ mang đến các giá trị nổi bật và khác biệt như:</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-5">
                                    <div className="description">
                                        <p>•	Kho dữ liệu lớn nhất: 10,000 Influencers và đang tiếp tục mở rộng</p>
                                        <p>•	Hệ thống phân tích thống kê dữ liệu toàn diện trên real-time</p>
                                        <p>•	Các gói dịch vụ hỗ trợ triển khai chiến dịch toàn diện</p>
                                        <p>•	Và hơn hết KOLV là cấu nối nhịp nhàng giữa nhãn hàng và các Influencer để tạo nên hiệu quả nhất cho chiến dịch</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="section section-features">
                        <div className="container">
                            <h4 className="header-text text-center">ĐIỀU GÌ LÀM CHO KOLV KHÁC BIỆT</h4>
                            <p className="text-center">Nền tảng công nghệ của KOLV cho phép thương hiệu tìm kiếm danh sách Influencer theo nhiều ngành hàng và hơn 70 nghề nghiệp – từ lĩnh vực phổ biến cho đến ngách nhất, thông qua:</p>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="card card-blue">
                                        <div className="icon">
                                            <i className="pe-7s-note2"></i>
                                        </div>
                                        <div className="text">
                                            <h4>Active User Rate</h4>
                                            <p>Giúp nhãn hàng chọn đúng Influencer khi vấn nạn “follower ảo” ngày càng cao</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="card card-blue">
                                        <div className="icon">
                                            <i className="pe-7s-note2"></i>
                                        </div>
                                        <div className="text">
                                            <h4>Relevance Score</h4>
                                            <p>Là chỉ số thể hiện mức độ phù hợp của Influencer trong từng lĩnh vực/ngành hàng khác nhau</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="card card-blue">
                                        <div className="icon">
                                            <i className="pe-7s-graph1"></i>
                                        </div>
                                        <h4>Sentiment Score</h4>
                                        <p>Là chỉ số phản ánh cảm xúc của người dùng thông qua các phản hồi tích cực, tình cảm, thái độ của followers đối với các nội dung do Influencer chia sẻ.</p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="card card-blue">
                                        <div className="icon">
                                            <i className="pe-7s-bell"></i>
                                        </div>
                                        <h4>Influence Score</h4>
                                        <p>Là chỉ số ảnh hưởng, tổng hợp từ các chỉ số trên và đã được thử nghiệm kỹ càng trên nhiều thuật toán. Vì vậy, Influence Score có thể phản ánh gần đúng nhất mức độ ảnh hưởng của Influencer trên từng chủ đề.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="section section-presentation" style={{ minHeight: 'unset' }}>
                        <div className="container" style={{ backgroundImage: `url(${m5})`, minHeight: '366px' }}>
                            <div className="row">
                                <div className="col-md-2">

                                </div>
                                <div className="col-md-10">
                                    <div className="description">
                                        <h6 className="header-text">MẠNG LƯỚI RỘNG KHẮP – THÂN THIỆN NGƯỜI DÙNG</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">

                                </div>
                                <div className="col-md-8">
                                    <div className="description">
                                        <p>•    Áp dụng công nghệ tiên tiến, trí tuệ nhân tạo (AI) vào toàn bộ quá trình của chiến dịch để giúp nhãn hàng và Influence kết nối một cách hiệu quả nhất trên diện rộng hơn</p>
                                        <p>•	Nền tảng thân thiện với người dùng, giúp bạn dễ dàng truy cập và làm việc mọi lúc mọi nơi</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="section section-presentation" style={{ minHeight: 'unset' }}>
                        <div className="container" style={{ backgroundImage: `url(${m6})`, minHeight: '285px' }}></div>
                        {/* <div className="row">
                            <div className="col-md-12" >
                                <img className="parallax-background-image" src={m6} style={{ maxHeight: '300px' }} />
                            </div>
                        </div> */}
                    </div>
                    <div className="section section-no-padding">
                        <div className="parallax filter-gradient blue" data-color="blue">
                            <div className="parallax-background">
                                <img className="parallax-background-image" src={bg3} />
                            </div>
                            <div className="info">
                                <h1><Trans>Try this for free</Trans>!</h1>
                                <p><Trans>Beautiful places for you</Trans>.</p>
                                <Link to="/pages/loginpage" className="btn btn-neutral btn-lg btn-fill"><Trans>Get Free Access</Trans></Link>
                                {/* <a href="http://www.creative-tim.com/product/awesome-landing-page" className="btn btn-neutral btn-lg btn-fill">EXPLORE</a> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div >
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

const connectedLandingPage = connect(mapStateToProps)(LandingPage);
export { connectedLandingPage as LandingPage }; 