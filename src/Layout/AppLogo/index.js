import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { themeActions } from '../../_actions';
import Hamburger from 'react-hamburgers';

import AppMobileMenu from '../AppMobileMenu';
import { history } from '../../_helpers';
//import big_logo from '../../assets/utils/images/big_logo.png';

class HeaderLogo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            mobile: false,
            activeSecondaryMenuMobile: false
        };

        this.handleBackToHomePage = this.handleBackToHomePage.bind(this);
    }

    toggleEnableClosedSidebar = () => {
        let { enableClosedSidebar, setEnableClosedSidebar } = this.props;
        setEnableClosedSidebar(!enableClosedSidebar);
    }

    state = {
        openLeft: false,
        openRight: false,
        relativeWidth: false,
        width: 280,
        noTouchOpen: false,
        noTouchClose: false,
    };

    handleBackToHomePage() {
        // localStorage.removeItem('user');
        // localStorage.removeItem('token');
        // localStorage.removeItem('campaign');
        // localStorage.removeItem('job');
        // localStorage.removeItem('dateValue');
        // localStorage.removeItem('selectedOptionLocation');
        // localStorage.removeItem('selectedOptionInteresting');
        // localStorage.removeItem('selectedOptionJobCategory');
        // localStorage.removeItem('type');
        // localStorage.removeItem('infName');
        // localStorage.removeItem('brandFullName');
        // localStorage.removeItem('brandName');
        // localStorage.removeItem('brandObj');
        // localStorage.removeItem('searchItems');
        // localStorage.removeItem('selectedLocations');
        // localStorage.removeItem('cSelected');
        // localStorage.removeItem('selectedName');
        history.replace({ pathname: '/pages/landingpage' })
        //history.push('/pages/landingpage');
    }

    render() {
        let {
            enableClosedSidebar,
        } = this.props;
        return (
            <Fragment>
                <div className="app-header__logo">
                    <div className="logo-src" style={{ cursor: 'pointer' }} onClick={this.handleBackToHomePage}></div>
                    {/* <div>
                        <img src={big_logo} alt="Kols Viet" style={{ border: 'none', width: '90px', borderRadius: 'unset' }} />
                    </div> */}
                    <div className="header__pane ml-auto">
                        <div onClick={this.toggleEnableClosedSidebar}>
                            <Hamburger
                                active={enableClosedSidebar}
                                type="elastic"
                                onClick={() => this.setState({ active: !this.state.active })}
                            />
                        </div>
                    </div>
                </div>
                <AppMobileMenu />
            </Fragment>
        )
    }
}


const mapStateToProps = state => {
    return ({
        enableClosedSidebar: state.theme.enableClosedSidebar,
        enableMobileMenu: state.theme.enableMobileMenu,
        enableMobileMenuSmall: state.theme.enableMobileMenuSmall,
    })
};

const mapDispatchToProps = dispatch => {
    return ({
        setEnableClosedSidebar: enable => dispatch(themeActions.setEnableClosedSidebar(enable)),
        setEnableMobileMenu: enable => dispatch(themeActions.setEnableMobileMenu(enable)),
        setEnableMobileMenuSmall: enable => dispatch(themeActions.setEnableMobileMenuSmall(enable)),

    })
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLogo);