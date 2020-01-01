import { infConstants } from '../_constants';

export function topInfluencers(state = {}, action) {
  switch (action.type) {    
    case infConstants.INFS_TOPENGAGEMENT_REQUEST:
      return {
        loading: true
      };
    case infConstants.INFS_TOPENGAGEMENT_SUCCESS:
      return {
        loading: false,
        topEngagement: action.topEngagementInf
      };
    case infConstants.INFS_TOPENGAGEMENT_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}