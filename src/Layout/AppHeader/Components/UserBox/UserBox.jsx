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
        // const { dispatch } = this.props;
        // let brandObj = JSON.parse(localStorage.getItem('brandObj'));
        // brandObj = brandObj[0] ? brandObj[0] : brandObj;
        // const email = brandObj.email ? brandObj.email : brandObj.Email
        // //debugger;
        // dispatch(brandActions.getBrandByName(email));
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
        const { brand } = this.props;
        const brandObj = JSON.parse(localStorage.getItem('brandObj'));
        const localBrand = brandObj? brandObj: brand;
        //debugger;
        const urlIcon = (localBrand && localBrand.published === false) ? default_user : configContent.apiUrl + localBrand.avatar.urls[0]
        
        return (
            <Fragment>
                <div className="header-btn-lg pr-0">
                    <div className="widget-content p-0">
                        <div className="widget-content-wrapper">
                            <div className="widget-content-left">
                                <UncontrolledButtonDropdown>
                                    <DropdownToggle color="link" className="p-0">
                                        <img width={42} className="rounded-circle" src={urlIcon} alt="avatar" />
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
                                    {localBrand.fullName}
                                </div>
                            </div>
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