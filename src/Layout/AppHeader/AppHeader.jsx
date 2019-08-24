import React, { Fragment } from 'react';
import cx from 'classnames';

import { connect } from 'react-redux';

//import ReactCSSTransitionGroup from 'react-transition-group/TransitionGroup'; 

import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';

import HeaderLogo from '../AppLogo';

import { SearchBox } from './Components/SearchBox/SearchBox';
import { UserBox } from './Components/UserBox/UserBox';

// transitionname="HeaderAnimation"
//                     transitionAppearTimeout={1500}
//                     transitionEnterTimeout={1000}
//                     transitionLeaveTimeout={1000}

class AppHeader extends React.Component {
    render() {
        let {
            headerBackgroundColor,
            enableMobileMenuSmall,
            enableHeaderShadow
        } = this.props;
        return (
            <Fragment>
                <TransitionGroup component="div" className={cx("app-header", 'bg-strong-bliss header-text-light', { 'header-shadow': true })}>
                    <CSSTransition timeout={1500}
                        classNames="HeaderAnimation"
                        unmountOnExit
                        appear>
                        <div>
                            <HeaderLogo />
                        </div>
                    </CSSTransition>
                    <CSSTransition timeout={1500}
                        classNames="HeaderAnimation"
                        unmountOnExit
                        appear>
                        <div className={cx("app-header__content", { 'header-mobile-open': '' })}>
                            <div className="app-header-left">
                                <SearchBox />
                            </div>
                            <div className="app-header-right">
                                <UserBox />
                            </div>
                        </div>
                    </CSSTransition>
                </TransitionGroup >
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    enableHeaderShadow: state.ThemeOptions.enableHeaderShadow,
    closedSmallerSidebar: state.ThemeOptions.closedSmallerSidebar,
    headerBackgroundColor: state.ThemeOptions.headerBackgroundColor,
    enableMobileMenuSmall: state.ThemeOptions.enableMobileMenuSmall,
});

const mapDispatchToProps = dispatch => ({});

const connectedAppHeader = connect(mapStateToProps, mapDispatchToProps)(AppHeader);
export { connectedAppHeader as AppHeader };
//export default connect(mapStateToProps, mapDispatchToProps)(connectedAppHeader);