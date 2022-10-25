import { brandConstants } from '../_constants';
import { brandService, userService } from '../_services';
import { alertActions } from '.';
import { history } from '../_helpers';
import { toast } from "react-toastify";
import { updateBrandModel } from '../_models/BrandType';
export const brandActions = {
    register,
    getAll,
    updateBrand,
    getBrandByName,
    getBrandByNameToManage,
    uploadAvatar,
    getAvatar
};

function register(brandType, userType) {
    return dispatch => {
        dispatch(request(brandType));

        userService.register(userType)
            .then(user => {
                const userObj = JSON.parse(user);
                userService.getToken(userObj.userName, userType.Password)
                    .then(token => {
                        brandService.register(brandType)
                            .then(brand => {                                
                                const brandObj = {
                                    contentItemId: brand.ContentItemId
                                    , brandName: brand.Brand.BrandName.Text
                                    , email: brand.Brand.Email.Text
                                    , businessAreas: brand.Brand.BusinessAreas.Text
                                    , fullName: brand.Brand.FullName.Text
                                    , location: brand.Brand.Location.Text
                                    , createdUtc: brand.CreatedUtc
                                    , published: brand.Published
                                    , avatar: {
                                        paths: brand.Brand.Avatar.Paths
                                        , urls: brand.Brand.Avatar.Urls
                                    }
                                };

                                dispatch(success(brandObj));

                                debugger;

                                localStorage.setItem('brandObj', JSON.stringify(brandObj));
                                history.replace({ pathname: '/widgets/dashboard-boxes', state: { Brand: brand.Brand, type: "Brand" } });
                                toast.success("Welcome " + userType.UserName + " Let create a Campaign");
                                //dispatch(alertActions.success('Registration successful'));
                            },
                                error => {
                                    dispatch(failure(error.toString()));
                                    dispatch(alertActions.error(error.toString()));
                                }
                            );
                    },
                        error => {
                            dispatch(failure(error.toString()));
                            dispatch(alertActions.error(error.toString()));
                        }
                    )

                //dispatch(alertActions.success('Registration User Successful'));
            },
                error => {
                    dispatch(failure(error.toString()));
                    //dispatch(alertActions.error(error.toString()));
                    toast.warn(error.toString());
                }
            );
    };

    function request(brand) { return { type: brandConstants.BRAND_REGISTER_REQUEST, brand } }
    function success(brand) { return { type: brandConstants.BRAND_REGISTER_SUCCESS, brand } }
    function failure(error) { return { type: brandConstants.BRAND_REGISTER_FAILURE, error } }
}

function updateBrand(brandType) {
    return dispatch => {
        dispatch(request(brandType));
        const localBrandType = updateBrandModel(brandType);
        brandService.updateBrand(localBrandType)
            .then(
                brandType => {
                    //dispatch(success(infType));
                    //get influencer by graplql again
                    brandService.getBrandByName(localBrandType.BrandName)
                        .then(
                            brand => {
                                dispatch(success(localBrandType))
                            },
                            error => dispatch(failure(error.toString()))
                        )

                    toast.success("Update successful");
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(brand) { return { type: brandConstants.BRAND_UPDATE_REQUEST, brand } }
    function success(brand) { return { type: brandConstants.BRAND_UPDATE_SUCCESS, brand } }
    function failure(error) { return { type: brandConstants.BRAND_UPDATE_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                brands => dispatch(success(brands)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: brandConstants.BRANDS_GETALL_REQUEST } }
    function success(brands) { return { type: brandConstants.BRANDS_GETALL_SUCCESS, brands } }
    function failure(error) { return { type: brandConstants.BRANDS_GETALL_FAILURE, error } }
}

function getBrandByName(userName) {
    return dispatch => {
        dispatch(request());
        if (userName) {
            brandService.getBrandByName(userName)
                .then(
                    brand => {
                        dispatch(success(brand));

                    },
                    error => {
                        toast.warn(error.toString() + " Please login again");
                        history.replace({ pathname: '/pages/loginpage' });
                    }
                )
            //dispatch(success(brand));
        }
        else {
            const error = "cannot get from brand";
            dispatch(failure(error.toString()));
            //dispatch(alertActions.error(error.toString()));
        }
    };

    function request() { return { type: brandConstants.GET_BRANDBYNAME_REQUEST } }
    function success(brand) { return { type: brandConstants.GET_BRANDBYNAME_SUCCESS, brand } }
    function failure(error) { return { type: brandConstants.GET_BRANDBYNAME_FAILURE, error } }
}

function getBrandByNameToManage(userName) {
    return dispatch => {
        dispatch(request());
        if (userName) {
            brandService.getManageBrandByName(userName)
                .then(
                    brand => {
                        dispatch(success(brand));
                        //history.replace({ pathname: '/widgets/manage-brand' });
                    },
                    error => {
                        toast.warn(error.toString() + " Please login again");
                        history.replace({ pathname: '/pages/loginpage' });
                    }
                )
            //dispatch(success(brand));
        }
        else {
            const error = "cannot get from brand";
            dispatch(failure(error.toString()));
            //dispatch(alertActions.error(error.toString()));
        }
    };

    function request() { return { type: brandConstants.GET_BRANDBYNAME_REQUEST } }
    function success(brand) { return { type: brandConstants.GET_BRANDBYNAME_SUCCESS, brand } }
    function failure(error) { return { type: brandConstants.GET_BRANDBYNAME_FAILURE, error } }
}

function uploadAvatar(file, brandType) {
    return dispatch => {
        dispatch(request());
        //const localBrandType = updateBrandModel(brandType);
        if (file) {
            brandService.uploadAvatar(file)
                .then(
                    status => {                        
                        dispatch(success(brandType.brand));
                        toast.success("Upload successful");
                    },
                    error => {
                        toast.warn(error.toString() + " Please try again");
                    }
                )            
            //dispatch(success(brand));
        }
        else {
            const error = "cannot upload file";
            dispatch(failure(error.toString()));
            //dispatch(alertActions.error(error.toString()));
        }
    };

    function request() { return { type: brandConstants.BRANDS_UPLOAD_AVATAR_REQUEST } }
    function success(brand) { return { type: brandConstants.BRANDS_UPLOAD_AVATAR_SUCCESS, brand } }
    function failure(error) { return { type: brandConstants.BRANDS_UPLOAD_AVATAR_FAILURE, error } }
}

function getAvatar(file) {
    return dispatch => {
        dispatch(request());
        if (file) {
            brandService.uploadAvatar(file)
                .then(
                    status => {
                        dispatch(success(status));
                        //history.replace({ pathname: '/widgets/manage-brand' });
                    },
                    error => {
                        toast.warn(error.toString() + " Please try again");
                    }
                )
            //dispatch(success(brand));
        }
        else {
            const error = "cannot upload file";
            dispatch(failure(error.toString()));
            //dispatch(alertActions.error(error.toString()));
        }
    };

    function request() { return { type: brandConstants.BRANDS_UPLOAD_AVATAR_REQUEST } }
    function success(status) { return { type: brandConstants.BRANDS_UPLOAD_AVATAR_SUCCESS, status } }
    function failure(error) { return { type: brandConstants.BRANDS_UPLOAD_AVATAR_FAILURE, error } }
}