import { infConstants } from '../_constants';
import { influencerService } from '../_services';
import { toast } from "react-toastify";

export const topInfActions = {
    getTopByEngagement,
    getTopByFollower,
    getTopByTrend
};

function getTopByEngagement(first, skip, userName) {
    return dispatch => {
        dispatch(request());

        influencerService.getAll(first, 0)
            .then(
                influencers => {
                    influencers.influencer.sort((a, b) => (calEngagement(a.numberOfReaction, a.numberOfComment, a.numberOfShare) > calEngagement(b.numberOfReaction, b.numberOfComment, b.numberOfShare)) ? -1 : 1)

                    influencers.influencer.map((value, index) => {
                        return Object.assign(value, {
                            ...value,
                            engagement: calEngagement(value.numberOfReaction, value.numberOfComment, value.numberOfShare)
                        });
                    });
                    dispatch(success(influencers.influencer.slice(0, skip)))
                },
                error => {
                    toast.error("Please try again");
                }
            );
    };

    function request() { return { type: infConstants.INFS_TOPENGAGEMENT_REQUEST } }
    function success(topEngagementInf) { return { type: infConstants.INFS_TOPENGAGEMENT_SUCCESS, topEngagementInf } }
    function failure(error) { return { type: infConstants.INFS_TOPENGAGEMENT_FAILURE, error } }
}

function getTopByFollower(first, skip, userName) {
    return dispatch => {
        dispatch(request());

        influencerService.getInfluencersByName(first, skip, userName)
            .then(
                influencers => {
                    dispatch(success(influencers.influencer))
                },
                error => {
                    //dispatch(failure(error.toString()));
                    //dispatch(alertActions.error(error.toString()));
                    toast.error("Please try again");
                    //history.push('/pages/loginpage');
                    //history.replace({ pathname: '/pages/loginpage' });
                }
            );
    };

    function request() { return { type: infConstants.INFS_GETBYNAME_REQUEST } }
    function success(influencers) { return { type: infConstants.INFS_GETBYNAME_SUCCESS, influencers } }
    function failure(error) { return { type: infConstants.INFS_GETBYNAME_FAILURE, error } }
}

function getTopByTrend(first, skip, userName) {
    return dispatch => {
        dispatch(request());

        influencerService.getInfluencersByName(first, skip, userName)
            .then(
                influencers => {
                    dispatch(success(influencers.influencer))
                },
                error => {
                    //dispatch(failure(error.toString()));
                    //dispatch(alertActions.error(error.toString()));
                    toast.error("Please try again");
                    //history.push('/pages/loginpage');
                    //history.replace({ pathname: '/pages/loginpage' });
                }
            );
    };

    function request() { return { type: infConstants.INFS_GETBYNAME_REQUEST } }
    function success(influencers) { return { type: infConstants.INFS_GETBYNAME_SUCCESS, influencers } }
    function failure(error) { return { type: infConstants.INFS_GETBYNAME_FAILURE, error } }
}

function calEngagement(reaction, comment, share) {

    const strOfReaction = reaction ? reaction : '';
    const strOfComment = comment ? comment : '';
    const strOfShare = share ? share : '';
    const numberOfReaction = strOfReaction.charAt(strOfReaction.length - 1) === 'k' ? Number((strOfReaction.substring(0, strOfReaction.length - 1))) * 1000 : Number(strOfReaction);
    const numberOfComment = strOfComment.charAt(strOfComment.length - 1) === 'k' ? Number((strOfComment.substring(0, strOfComment.length - 1))) * 1000 : Number(strOfComment);
    const numberOfShare = strOfShare.charAt(strOfShare.length - 1) === 'k' ? Number((strOfShare.substring(0, strOfShare.length - 1))) * 1000 : Number(strOfShare);
    const engagement = numberOfReaction + (numberOfComment * 2) + (numberOfShare * 3)

    return engagement;
}