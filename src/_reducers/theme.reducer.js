// import sideBar6 from '../assets/utils/images/sidebar/city1.jpg';

// export const userConstants = {
//     SET_ENABLE_BACKGROUND_IMAGE: 'SET_ENABLE_BACKGROUND_IMAGE',

//     SET_ENABLE_MOBILE_MENU: 'SET_ENABLE_MOBILE_MENU',
//     SET_ENABLE_MOBILE_MENU_SMALL: 'SET_ENABLE_MOBILE_MENU_SMALL',

//     SET_ENABLE_FIXED_HEADER: 'SET_ENABLE_FIXED_HEADER',
//     SET_ENABLE_HEADER_SHADOW: 'SET_ENABLE_HEADER_SHADOW',
//     SET_ENABLE_SIDEBAR_SHADOW: 'SET_ENABLE_SIDEBAR_SHADOW',
//     SET_ENABLE_FIXED_SIDEBAR: 'SET_ENABLE_FIXED_SIDEBAR',
//     SET_ENABLE_CLOSED_SIDEBAR: 'SET_ENABLE_CLOSED_SIDEBAR',
//     SET_ENABLE_FIXED_FOOTER: 'SET_ENABLE_FIXED_FOOTER',

//     SET_ENABLE_PAGETITLE_ICON: 'SET_ENABLE_PAGETITLE_ICON',
//     SET_ENABLE_PAGETITLE_SUBHEADING: 'SET_ENABLE_PAGETITLE_SUBHEADING',
//     SET_ENABLE_PAGE_TABS_ALT: 'SET_ENABLE_PAGE_TABS_ALT',

//     SET_BACKGROUND_IMAGE: 'SET_BACKGROUND_IMAGE',
//     SET_BACKGROUND_COLOR: 'SET_BACKGROUND_COLOR',
//     SET_COLOR_SCHEME: 'SET_COLOR_SCHEME',
//     SET_BACKGROUND_IMAGE_OPACITY: 'SET_BACKGROUND_IMAGE_OPACITY',

//     SET_HEADER_BACKGROUND_COLOR: 'SET_HEADER_BACKGROUND_COLOR'
// }

// export const setEnableBackgroundImage = enableBackgroundImage => ({
//     type: SET_ENABLE_BACKGROUND_IMAGE,
//     enableBackgroundImage
// });

// export const setEnableFixedHeader = enableFixedHeader => ({
//     type: SET_ENABLE_FIXED_HEADER,
//     enableFixedHeader
// });

// export const setEnableHeaderShadow = enableHeaderShadow => ({
//     type: SET_ENABLE_HEADER_SHADOW,
//     enableHeaderShadow
// });

// export const setEnableSidebarShadow = enableSidebarShadow => ({
//     type: SET_ENABLE_SIDEBAR_SHADOW,
//     enableSidebarShadow
// });

// export const setEnablePageTitleIcon = enablePageTitleIcon => ({
//     type: SET_ENABLE_PAGETITLE_ICON,
//     enablePageTitleIcon
// });

// export const setEnablePageTitleSubheading = enablePageTitleSubheading => ({
//     type: SET_ENABLE_PAGETITLE_SUBHEADING,
//     enablePageTitleSubheading
// });

// export const setEnablePageTabsAlt = enablePageTabsAlt => ({
//     type: SET_ENABLE_PAGE_TABS_ALT,
//     enablePageTabsAlt
// });

// export const setEnableFixedSidebar = enableFixedSidebar => ({
//     type: SET_ENABLE_FIXED_SIDEBAR,
//     enableFixedSidebar
// });

// export const setEnableClosedSidebar = enableClosedSidebar => ({
//     type: SET_ENABLE_CLOSED_SIDEBAR,
//     enableClosedSidebar
// });

// export const setEnableMobileMenu = enableMobileMenu => ({
//     type: SET_ENABLE_MOBILE_MENU,
//     enableMobileMenu
// });

// export const setEnableMobileMenuSmall = enableMobileMenuSmall => ({
//     type: SET_ENABLE_MOBILE_MENU_SMALL,
//     enableMobileMenuSmall
// });

// export const setEnableFixedFooter = enableFixedFooter => ({
//     type: SET_ENABLE_FIXED_FOOTER,
//     enableFixedFooter
// });

// export const setBackgroundColor = backgroundColor => ({
//     type: SET_BACKGROUND_COLOR,
//     backgroundColor
// });

// export const setHeaderBackgroundColor = headerBackgroundColor => ({
//     type: SET_HEADER_BACKGROUND_COLOR,
//     headerBackgroundColor
// });

// export const setColorScheme = colorScheme => ({
//     type: SET_COLOR_SCHEME,
//     colorScheme
// });

// export const setBackgroundImageOpacity = backgroundImageOpacity => ({
//     type: SET_BACKGROUND_IMAGE_OPACITY,
//     backgroundImageOpacity
// });

// export const setBackgroundImage = backgroundImage => ({
//     type: SET_BACKGROUND_IMAGE,
//     backgroundImage
// });

// export default function reducer(state = {
//     backgroundColor: 'bg-royal sidebar-text-light',
//     headerBackgroundColor: 'bg-strong-bliss header-text-light',
//     enableMobileMenuSmall: '',
//     enableBackgroundImage: true,
//     enableClosedSidebar: false,
//     enableFixedHeader: true,
//     enableHeaderShadow: true,
//     enableSidebarShadow: true,
//     enableFixedFooter: true,
//     enableFixedSidebar: true,
//     colorScheme: 'white',
//     backgroundImage: sideBar6,
//     backgroundImageOpacity: 'opacity-06',
//     enablePageTitleIcon: true,
//     enablePageTitleSubheading: true,
//     enablePageTabsAlt: false,
// }, action) {
//     switch (action.type) {
//         case SET_ENABLE_BACKGROUND_IMAGE:
//             return {
//                 ...state,
//                 enableBackgroundImage: action.enableBackgroundImage
//             };

//         case SET_ENABLE_FIXED_HEADER:
//             return {
//                 ...state,
//                 enableFixedHeader: action.enableFixedHeader
//             };

//         case SET_ENABLE_HEADER_SHADOW:
//             return {
//                 ...state,
//                 enableHeaderShadow: action.enableHeaderShadow
//             };

//         case SET_ENABLE_SIDEBAR_SHADOW:
//             return {
//                 ...state,
//                 enableSidebarShadow: action.enableSidebarShadow
//             };

//         case SET_ENABLE_PAGETITLE_ICON:
//             return {
//                 ...state,
//                 enablePageTitleIcon: action.enablePageTitleIcon
//             };

//         case SET_ENABLE_PAGETITLE_SUBHEADING:
//             return {
//                 ...state,
//                 enablePageTitleSubheading: action.enablePageTitleSubheading
//             };

//         case SET_ENABLE_PAGE_TABS_ALT:
//             return {
//                 ...state,
//                 enablePageTabsAlt: action.enablePageTabsAlt
//             };

//         case SET_ENABLE_FIXED_SIDEBAR:
//             return {
//                 ...state,
//                 enableFixedSidebar: action.enableFixedSidebar
//             };

//         case SET_ENABLE_MOBILE_MENU:
//             return {
//                 ...state,
//                 enableMobileMenu: action.enableMobileMenu
//             };

//         case SET_ENABLE_MOBILE_MENU_SMALL:
//             return {
//                 ...state,
//                 enableMobileMenuSmall: action.enableMobileMenuSmall
//             };

//         case SET_ENABLE_CLOSED_SIDEBAR:
//             return {
//                 ...state,
//                 enableClosedSidebar: action.enableClosedSidebar
//             };

//         case SET_ENABLE_FIXED_FOOTER:
//             return {
//                 ...state,
//                 enableFixedFooter: action.enableFixedFooter
//             };

//         case SET_BACKGROUND_COLOR:
//             return {
//                 ...state,
//                 backgroundColor: action.backgroundColor
//             };

//         case SET_HEADER_BACKGROUND_COLOR:
//             return {
//                 ...state,
//                 headerBackgroundColor: action.headerBackgroundColor
//             };

//         case SET_COLOR_SCHEME:
//             return {
//                 ...state,
//                 colorScheme: action.colorScheme
//             };

//         case SET_BACKGROUND_IMAGE:
//             return {
//                 ...state,
//                 backgroundImage: action.backgroundImage
//             };

//         case SET_BACKGROUND_IMAGE_OPACITY:
//             return {
//                 ...state,
//                 backgroundImageOpacity: action.backgroundImageOpacity
//             };
//     }
//     return state;
// }

import { userConstants } from '../_constants';

export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETALL_SUCCESS:
      return {
        items: action.users
      };
    case userConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    case userConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map(user =>
          user.id === action.id
            ? { ...user, deleting: true }
            : user
        )
      };
    case userConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter(user => user.id !== action.id)
      };
    case userConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
      return {
        ...state,
        items: state.items.map(user => {
          if (user.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = user;
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }

          return user;
        })
      };
    default:
      return state
  }
}