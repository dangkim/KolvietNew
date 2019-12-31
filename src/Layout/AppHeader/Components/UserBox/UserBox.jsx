import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { history } from '../../../../_helpers';
import configContent from 'configContent';
import {
    DropdownToggle, DropdownMenu,
    Nav, NavItem, NavLink,
    UncontrolledButtonDropdown
} from 'reactstrap';
import { userActions, brandActions } from '../../../../_actions';
import {
    toast,
    Bounce
} from 'react-toastify';


import {
    faAngleDown

} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import default_user from '../../../../assets/utils/images/avatars/default_user.jpg';

class UserBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            brand: this.props.Brand
        };

        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        const brandObj = JSON.parse(localStorage.getItem('brandObj'));
        dispatch(brandActions.getBrandByName(brandObj[0].email));
    }

    // notify2 = () => this.toastId = toast("You don't have any new items in your calendar for today! Go out and play!", {
    //     transition: Bounce,
    //     closeButton: true,
    //     autoClose: 5000,
    //     position: 'bottom-center',
    //     type: 'success'
    // });

    logout = () => {
        this.props.dispatch(userActions.logout());
    };

    manage = () => {
        //const { brand } = this.state;
        //this.props.dispatch(brandActions.getBrandByNameToManage(brand.brandName));
        history.replace({ pathname: '/widgets/manage-brand' });
    };

    render() {
        const { FullName, brand } = this.props;
        debugger;
        return (
            <Fragment>
                <div className="header-btn-lg pr-0">
                    <div className="widget-content p-0">
                        <div className="widget-content-wrapper">
                            <div className="widget-content-left">
                                <UncontrolledButtonDropdown>
                                    <DropdownToggle color="link" className="p-0">
                                        <img width={42} className="rounded-circle" src={(brand && brand.avatar) ? configContent.apiUrl + brand.avatar.urls[0] : default_user} alt="" />
                                        <FontAwesomeIcon className="ml-2 opacity-8" icon={faAngleDown} />
                                    </DropdownToggle>
                                    <DropdownMenu right className="rm-pointers dropdown-menu-lg">
                                        <Nav vertical>
                                            <NavItem className="nav-item-header">
                                                My Account
                                            </NavItem>
                                            <NavItem>
                                                <NavLink onClick={this.manage}>
                                                    Manage
                                                </NavLink>
                                            </NavItem>
                                            {/* <NavItem>
                                                <NavLink href="javascript:void(0);">
                                                    Messages
                                                    <div className="ml-auto badge badge-warning">512</div>
                                                </NavLink>
                                            </NavItem> */}
                                            <NavItem>
                                                <NavLink onClick={this.logout}>
                                                    Logout
                                                </NavLink>
                                            </NavItem>
                                        </Nav>
                                    </DropdownMenu>
                                </UncontrolledButtonDropdown>
                            </div>
                            <div className="widget-content-left  ml-3 header-user-info">
                                <div className="widget-heading">
                                    {FullName}
                                </div>
                                {/* <div className="widget-subheading">
                                    VP People Manager
                                </div> */}
                            </div>

                            {/* <div className="widget-content-right header-user-info ml-3">
                                <Button className="btn-shadow p-1" size="sm" onClick={this.notify2} color="info"
                                    id="Tooltip-1">
                                    <FontAwesomeIcon className="mr-2 ml-2" icon={faCalendarAlt} />
                                </Button>
                                <UncontrolledTooltip placement="bottom" target={'Tooltip-1'}>
                                    Click for Toastify Notifications!
                                </UncontrolledTooltip>
                            </div> */}
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

function mapStateToProps(state) {
    const { brands } = state;
    const brand = brands.brand;
    return {
        brand
    };
}

const connectedUserBox = connect(mapStateToProps)(UserBox);
export { connectedUserBox as UserBox };
//export default UserBox;