import { campaignConstants } from '../_constants';
import { campaignService, influencerService } from '../_services';
import { alertActions } from '.';
import { history } from '../_helpers';
import { createCampaign, createCampaigns } from '../_models/CampaignsType';
import { toast } from "react-toastify";

export const campaignActions = {
    register,
    getAll,
    getCampaignByBrand,
    getAllLocation,
    getAllInteresting,
    updateCampaign,
    deleteCampaign,
    updateStatus
};

function deleteCampaign(contentItemId, brandName) {
    return dispatch => {
        dispatch(request());

        campaignService.deleteCampaign(contentItemId)
            .then(
                campaign => {
                    campaignService.getCampaignByBrand(brandName)
                        .then(campaignsType => {
                            dispatch(success(campaignsType));
                            localStorage.removeItem('campaign');
                            localStorage.removeItem('job');
                            //history.push('/widgets/dashboard-boxes');
                            //dispatch(alertActions.success('Registration Campaigns Successful'));
                            toast.success("Registration Campaigns Successful");
                        }),
                        error => {
                            dispatch(failure(error.toString()));
                            dispatch(alertActions.error(error.toString()));
                        }
                    //dispatch(success(CampaignType))
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: campaignConstants.CAMS_UPDATE_REQUEST } }
    function success(campaign) { return { type: campaignConstants.CAMS_UPDATE_SUCCESS, campaign } }
    function failure(error) { return { type: campaignConstants.CAMS_UPDATE_FAILURE, error } }
}

function updateCampaign(CampaignType) {
    return dispatch => {
        dispatch(request());

        campaignService.updateCampaign(CampaignType)
            .then(
                campaign => {
                    campaignService.getCampaignByBrand(CampaignType.brandName)
                        .then(campaignsType => {
                            dispatch(success(campaignsType));
                            localStorage.removeItem('campaign');
                            localStorage.removeItem('job');
                            //history.push('/widgets/dashboard-boxes');
                            //dispatch(alertActions.success('Registration Campaigns Successful'));
                            toast.success("Registration Campaigns Successful");
                        }),
                        error => {
                            dispatch(failure(error.toString()));
                            dispatch(alertActions.error(error.toString()));
                        }
                    //dispatch(success(CampaignType))
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: campaignConstants.CAMS_UPDATE_REQUEST } }
    function success(campaign) { return { type: campaignConstants.CAMS_UPDATE_SUCCESS, campaign } }
    function failure(error) { return { type: campaignConstants.CAMS_UPDATE_FAILURE, error } }
}

function updateStatus(campaignStatusModel) {
    return dispatch => {
        dispatch(request());

        campaignService.updateStatus(campaignStatusModel)
            .then(
                campaign => {
                    campaignService.getAll()
                        .then(campaignsType => {
                            dispatch(success(campaignsType));
                            localStorage.removeItem('campaign');
                            localStorage.removeItem('job');
                            //history.push('/widgets/dashboard-boxes');
                            //dispatch(alertActions.success('Registration Campaigns Successful'));
                            toast.success("Update Status Successfully");
                        }),
                        error => {
                            dispatch(failure(error.toString()));
                            dispatch(alertActions.error(error.toString()));
                        }
                    //dispatch(success(CampaignType))
                },
                error => dispatch(failure(error.toString()))
            );
    };
    function request() { return { type: campaignConstants.CAMS_UPDATE_REQUEST } }
    function success(campaign) { return { type: campaignConstants.CAMS_UPDATE_SUCCESS, campaign } }
    function failure(error) { return { type: campaignConstants.CAMS_UPDATE_FAILURE, error } }
    // function request() { return { type: campaignConstants.CAMS_UPDATE_STATUS_REQUEST } }
    // function success(campaign) { return { type: campaignConstants.CAMS_UPDATE_STATUS_SUCCESS, campaign } }
    // function failure(error) { return { type: campaignConstants.CAMS_UPDATE_STATUS_FAILURE, error } }
}

function register(campaign,
    fromDate,
    toDate,
    job,
    selectedOptionGender,
    selectedOptionLocation,
    selectedOptionInteresting,
    selectedOptionJobCategory,
    brandName,
    brandFullName,
    email,
    phoneNumber,
    selectedInfluencer) {
    return dispatch => {

        dispatch(request());

        const campaignLocal = createCampaign(campaign,
            fromDate,
            toDate,
            job,
            selectedOptionGender,
            selectedOptionLocation,
            selectedOptionInteresting,
            selectedOptionJobCategory,
            brandName,
            brandFullName,
            email,
            phoneNumber,
            selectedInfluencer);

        campaignService.register(campaignLocal)
            .then(campaignType => {
                dispatch(success(campaignType));
                localStorage.removeItem('campaign');
                localStorage.removeItem('job');
                toast.success("Registration Campaigns Successful");
                history.replace({ pathname: '/widgets/campaigns-table' });
            },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request() { return { type: campaignConstants.CAM_REGISTER_REQUEST } }
    function success(campaigns) { return { type: campaignConstants.CAM_REGISTER_SUCCESS, campaigns } }
    function failure(error) { return { type: campaignConstants.CAM_REGISTER_SUCCESS, error } }

    // function request(user) { return { type: campaignConstants.CAM_REGISTER_REQUEST, user } }
    // function success(user) { return { type: campaignConstants.CAM_REGISTER_SUCCESS, user } }
    // function failure(error) { return { type: campaignConstants.CAM_REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        campaignService.getAll()
            .then(
                campaign => dispatch(success(campaign)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: campaignConstants.CAMS_GETALL_REQUEST } }
    function success(campaign) { return { type: campaignConstants.CAMS_GETALL_SUCCESS, campaign } }
    function failure(error) { return { type: campaignConstants.CAMS_GETALL_FAILURE, error } }
}

function getCampaignByBrand(brandName) {
    return dispatch => {
        dispatch(request());

        campaignService.getCampaignByBrand(brandName)
            .then(
                campaign => dispatch(success(campaign)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: campaignConstants.CAMS_GETBY_BRAND_REQUEST } }
    function success(campaign) { return { type: campaignConstants.CAMS_GETBY_BRAND_SUCCESS, campaign } }
    function failure(error) { return { type: campaignConstants.CAMS_GETBY_BRAND_FAILURE, error } }
}

function getAllLocation() {
    return dispatch => {
        dispatch(request());

        campaignService.getAllLocation()
            .then(
                locations => dispatch(success(locations)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: campaignConstants.LOCATION_GETALL_REQUEST } }
    function success(locations) { return { type: campaignConstants.LOCATION_GETALL_SUCCESS, locations } }
    function failure(error) { return { type: campaignConstants.LOCATION_GETALL_FAILURE, error } }
}

function getAllInteresting() {
    return dispatch => {
        dispatch(request());

        campaignService.getAllInteresting()
            .then(
                interestings => dispatch(success(interestings)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: campaignConstants.INTERESTING_GETALL_REQUEST } }
    function success(interestings) { return { type: campaignConstants.INTERESTING_GETALL_SUCCESS, interestings } }
    function failure(error) { return { type: campaignConstants.INTERESTING_GETALL_FAILURE, error } }
}