import { userConstants } from '../_constants';
import { userService, brandService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';
import { toast } from "react-toastify";

export const userActions = {
    login,
    getToken,
    logout,
    register,
    getAll,
    delete: _delete
};

function getToken(userName, password, pathname) { 
    return dispatch => {
        dispatch(request({ userName }));
        userService.getToken(userName, password)
            .then(token => {
                userService.getContentType(token)
                    .then(type => {
                        if (type === "Brand") {
                            // get Brand
                            brandService.getBrandByName(userName)
                                .then(
                                    brand => {
                                        //debugger;
                                        localStorage.setItem("type", "brand");
                                        localStorage.setItem("brandFullName", brand.brand[0].fullName);
                                        localStorage.setItem("brandName", brand.brand[0].brandName);
                                        localStorage.setItem('brandObj', JSON.stringify(brand.brand[0]));
                                        history.replace({ pathname: '/widgets/dashboard-boxes', state: { Brand: brand.brand, type: type } });
                                    },
                                    error => {
                                        toast.warn(error.toString() + " Please login again");
                                        //history.push('/pages/loginpage');
                                        history.replace({ pathname: '/pages/loginpage' });
                                    }
                                )

                        }
                        else if (type === "Influencer") {
                            localStorage.setItem("infName", userName);
                            localStorage.setItem("type", "influencer");
                            history.replace({ pathname: '/widgets/dashboard-boxes', state: { userName: userName, type: type } });
                        }
                        else if (userName === 'admin') {
                            localStorage.setItem("type", "brand");
                            localStorage.setItem("brandFullName", userName);
                            localStorage.setItem("brandName", userName);

                            var brand = {
                                brandName: "admin",
                                businessAreas: "",
                                contentItemId: "",
                                createdUtc: "",
                                email: "",
                                fullName: "admin",
                                location: "",
                                published: false
                            }

                            history.replace({ pathname: '/widgets/dashboard-boxes', state: { Brand: brand, type: type } });
                        }
                        toast.success("Welcome " + userName);
                    },
                        error => {
                            dispatch(failure(error.toString()));
                            //dispatch(alertActions.error(error.toString()));
                            toast.warn("User name or password is incorrect");
                        }
                    );
            },
                error => {
                    dispatch(failure(error.toString()));
                    //dispatch(alertActions.error(error.toString()));
                    toast.warn("User name or password is incorrect");
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(token) { return { type: userConstants.LOGIN_SUCCESS, token } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function login(userName, password) {
    return dispatch => {
        dispatch(request({ userName }));

        userService.login(userName, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => {
                    dispatch(success());
                    //history.push('/pages/loginpage');
                    history.replace({ pathname: '/pages/loginpage' });
                    //dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}