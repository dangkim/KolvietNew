import { themeConstants } from '../_constants';
import { userService } from '../_services';

export const userActions = {
    loadTheme,
};

function loadTheme() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: themeConstants.GETALL_REQUEST } }
    function success(users) { return { type: themeConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: themeConstants.GETALL_FAILURE, error } }
}