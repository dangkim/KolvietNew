import { infConstants } from '../_constants';

export function relativeInfluencer(state = {}, action) {
  switch (action.type) {    
    case infConstants.INFS_RELATIVE_REQUEST:
      return {
        loading: true
      };
    case infConstants.INFS_RELATIVE_SUCCESS:
      return {
        loading: false,
        relativeInfluencer: action.relativeInfluencer
      };
    case infConstants.INFS_RELATIVE_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}