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

    state = {
        showList: true,
        highlightedHobby: false
    };

    switch = () => {
        this.setState(prevState => ({
            showList: !prevState.showList
        }));
    };

    listSwitch = () => {
        this.setState(state => ({
            highlightedHobby: !state.highlightedHobby
        }));
    };

    render() {
        let {
            headerBackgroundColor,
            enableMobileMenuSmall,
            enableHeaderShadow
        } = this.props;
        return (
            <Fragment>
                <CSSTransition timeout={1500} unmountOnExit
                    in
                    classNames="HeaderAnimation"
                    appear>
                    <div className={cx("app-header", headerBackgroundColor, { 'header-shadow': enableHeaderShadow })}>
                        <HeaderLogo />
                        <div className={cx("app-header__content", { 'header-mobile-open': enableMobileMenuSmall })}>
                            <div className="app-header-left">
                                <SearchBox />
                            </div>
                            <div className="app-header-right">
                                <UserBox />
                            </div>
                        </div>
                    </div>
                </CSSTransition>



                {/* <TransitionGroup component="div" className={cx("app-header", headerBackgroundColor, { 'header-shadow': enableHeaderShadow })}>
                    <CSSTransition timeout={1500}
                        classNames="HeaderAnimation"                        
                        appear>
                        <div>
                            <HeaderLogo />
                        </div>
                    </CSSTransition>
                    <CSSTransition timeout={1500}
                        classNames="HeaderAnimation"
                        unmountOnExit
                        appear>
                        <div className={cx("app-header__content", { 'header-mobile-open': enableMobileMenuSmall })}>
                            <div className="app-header-left">
                                <SearchBox />
                            </div>
                            <div className="app-header-right">
                                <UserBox />
                            </div>
                        </div>
                    </CSSTransition>
                </TransitionGroup > */}
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return ({
    enableHeaderShadow:state.theme.enableHeaderShadow,
    closedSmallerSidebar:state.theme.closedSmallerSidebar,
    headerBackgroundColor:state.theme.headerBackgroundColor,
    enableMobileMenuSmall:state.theme.enableMobileMenuSmall,
})};

const mapDispatchToProps = dispatch => ({});

const connectedAppHeader = connect(mapStateToProps, mapDispatchToProps)(AppHeader);
export { connectedAppHeader as AppHeader };
//export default connect(mapStateToProps, mapDispatchToProps)(connectedAppHeader);