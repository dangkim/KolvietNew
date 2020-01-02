import { infConstants } from '../_constants';

export function topFollowerInf(state = {}, action) {
  switch (action.type) {    
    case infConstants.INFS_TOPFOLLOWER_REQUEST:
      return {
        loading: true
      };
    case infConstants.INFS_TOPFOLLOWER_SUCCESS:
      return {
        loading: false,
        topFollowers: action.topFollowerInf
      };
    case infConstants.INFS_TOPFOLLOWER_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}