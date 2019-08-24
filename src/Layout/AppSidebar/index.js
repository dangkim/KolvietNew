import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import Nav from '../AppNav/VerticalNavWrapper';

import {
    CSSTransition,
    TransitionGroup,
    Transition
} from 'react-transition-group';

import PerfectScrollbar from 'react-perfect-scrollbar';
import HeaderLogo from '../AppLogo';

import {
    setEnableMobileMenu
} from '../../reducers/ThemeOptions';

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
                    {/* <HeaderLogo /> */}
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
                {/* <HeaderLogo />
                <Transition component="div"
                    appear={true}
                    enter={false}
                    exit={false}
                    timeout={{ appear: 1500 }}
                    className={cx("app-sidebar", backgroundColor, { 'sidebar-shadow': enableSidebarShadow })}>

                    <CSSTransition classNames="SidebarAnimation">
                        <PerfectScrollbar>
                            <div className="app-sidebar__inner">
                                <Nav />
                            </div>
                        </PerfectScrollbar>
                        <div
                            className={cx("app-sidebar-bg", backgroundImageOpacity)}
                            style={{
                                backgroundImage: enableBackgroundImage ? 'url(' + backgroundImage + ')' : null
                            }}>
                        </div>
                    </CSSTransition>
                </Transition > */}
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    enableBackgroundImage: state.ThemeOptions.enableBackgroundImage,
    enableSidebarShadow: state.ThemeOptions.enableSidebarShadow,
    enableMobileMenu: state.ThemeOptions.enableMobileMenu,
    backgroundColor: state.ThemeOptions.backgroundColor,
    backgroundImage: state.ThemeOptions.backgroundImage,
    backgroundImageOpacity: state.ThemeOptions.backgroundImageOpacity,
});

const mapDispatchToProps = dispatch => ({

    setEnableMobileMenu: enable => dispatch(setEnableMobileMenu(enable)),

});

export default connect(mapStateToProps, mapDispatchToProps)(AppSidebar);