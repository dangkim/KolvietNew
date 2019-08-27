import { themeConstants } from '../_constants';
import { userService } from '../_services';

export const themeActions = {
    enableBackgroundImage,
    enableFixedHeader,
    enableHeaderShadow,
    enableSidebarShadow,
    enablePageTitleIcon,
    enablePageTitleSubheading,
    enablePageTabsAlt,
    enableFixedSidebar,
    enableMobileMenuSmall,
    setEnableClosedSidebar,
    enableFixedFooter,
    backgroundColor,
    headerBackgroundColor,
    colorScheme,
    backgroundImage,
    backgroundImageOpacity
};

function enableBackgroundImage() {
    return dispatch => {
        dispatch(enable());
    };

    function enable() { return { type: themeConstants.SET_ENABLE_BACKGROUND_IMAGE } }
}

function enableFixedHeader() {
    return dispatch => {
        dispatch(enable());
    };

    function enable() { return { type: themeConstants.SET_ENABLE_FIXED_HEADER } }
}

function enableHeaderShadow() {
    return dispatch => {
        dispatch(enable());
    };

    function enable() { return { type: themeConstants.SET_ENABLE_HEADER_SHADOW } }
}

function enableSidebarShadow() {
    return dispatch => {
        dispatch(enable());
    };

    function enable() { return { type: themeConstants.SET_ENABLE_SIDEBAR_SHADOW } }
}

function enablePageTitleIcon() {
    return dispatch => {
        dispatch(enable());
    };

    function enable() { return { type: themeConstants.SET_ENABLE_PAGETITLE_ICON } }
}

function enablePageTitleSubheading() {
    return dispatch => {
        dispatch(enable());
    };

    function enable() { return { type: themeConstants.SET_ENABLE_PAGETITLE_SUBHEADING } }
}

function enablePageTabsAlt() {
    return dispatch => {
        dispatch(enable());
    };

    function enable() { return { type: themeConstants.SET_ENABLE_PAGE_TABS_ALT } }
}

function enableFixedSidebar() {
    return dispatch => {
        dispatch(enable());
    };

    function enable() { return { type: themeConstants.SET_ENABLE_FIXED_SIDEBAR } }
}

function enableMobileMenuSmall() {
    return dispatch => {
        dispatch(enable());
    };

    function enable() { return { type: themeConstants.SET_ENABLE_MOBILE_MENU_SMALL } }
}

function setEnableClosedSidebar() {
    return dispatch => {
        dispatch(enable());
    };

    function enable() { return { type: themeConstants.SET_ENABLE_CLOSED_SIDEBAR } }
}

function enableFixedFooter() {
    return dispatch => {
        dispatch(enable());
    };

    function enable() { return { type: themeConstants.SET_ENABLE_FIXED_FOOTER } }
}

function backgroundColor() {
    return dispatch => {
        dispatch(enable());
    };

    function enable() { return { type: themeConstants.SET_BACKGROUND_COLOR } }
}

function headerBackgroundColor() {
    return dispatch => {
        dispatch(enable());
    };

    function enable() { return { type: themeConstants.SET_HEADER_BACKGROUND_COLOR } }
}

function colorScheme() {
    return dispatch => {
        dispatch(enable());
    };

    function enable() { return { type: themeConstants.SET_COLOR_SCHEME } }
}

function backgroundImage() {
    return dispatch => {
        dispatch(enable());
    };

    function enable() { return { type: themeConstants.SET_BACKGROUND_IMAGE } }
}

function backgroundImageOpacity() {
    return dispatch => {
        dispatch(enable());
    };

    function enable() { return { type: themeConstants.SET_BACKGROUND_IMAGE_OPACITY } }
}
    