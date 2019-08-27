import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { themeActions } from '../../_actions';
import cx from 'classnames';

import Nav from '../AppNav/VerticalNavWrapper';

import {
    CSSTransition,
    TransitionGroup
} from 'react-transition-group';

import PerfectScrollbar from 'react-perfect-scrollbar';
import HeaderLogo from '../AppLogo';

// import {
//     setEnableMobileMenu
// } from '../../_reducers/theme.reducer';

class AppSidebar extends Component {

    state = {};

    toggleMobileSidebar = () => {
        let { enableMobileMenu, setEnableMobileMenu } = this.props;
        setEnableMobileMenu(!enableMobileMenu);
    }

    render() {
        let {
            backgroundColor,
            enableBackgroundImage,
            enableSidebarShadow,
            backgroundImage,
            backgroundImageOpacity,
        } = this.props;

        return (
            <Fragment>
                <div className="sidebar-mobile-overlay" onClick={this.toggleMobileSidebar} />
                <TransitionGroup component="div" className={cx("app-sidebar", backgroundColor, { 'sidebar-shadow': enableSidebarShadow })}>
                    <CSSTransition timeout={1500} unmountOnExit appear classNames="SidebarAnimation">
                        <div>
                            <HeaderLogo />
                        </div>
                    </CSSTransition>
                    <CSSTransition timeout={1500} unmountOnExit appear classNames="SidebarAnimation">
                        <PerfectScrollbar>
                            <div className="app-sidebar__inner">
                                <Nav />
                            </div>
                        </PerfectScrollbar>
                    </CSSTransition>
                    <CSSTransition timeout={1500} unmountOnExit appear classNames="SidebarAnimation">
                        <div
                            className={cx("app-sidebar-bg", backgroundImageOpacity)}
                            style={{
                                backgroundImage: enableBackgroundImage ? 'url(' + backgroundImage + ')' : null
                            }}>
                        </div>
                    </CSSTransition>
                </TransitionGroup>                
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    enableBackgroundImage: state.enableBackgroundImage,
    enableSidebarShadow: state.enableSidebarShadow,
    enableMobileMenu: state.enableMobileMenu,
    backgroundColor: state.backgroundColor,
    backgroundImage: state.backgroundImage,
    backgroundImageOpacity: state.backgroundImageOpacity,
});

const mapDispatchToProps = dispatch => ({

    setEnableMobileMenu: enable => dispatch(themeActions.setEnableMobileMenu(enable)),

});

export default connect(mapStateToProps, mapDispatchToProps)(AppSidebar);