import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';
import {
    Button, UncontrolledButtonDropdown,
    DropdownToggle, Dropdown, DropdownMenu,
    DropdownItem,
} from 'reactstrap';

import avatar1 from '../../../../assets/utils/images/avatars/1.jpg';
import avatar2 from '../../../../assets/utils/images/avatars/2.jpg';
import avatar3 from '../../../../assets/utils/images/avatars/3.jpg';
import avatar4 from '../../../../assets/utils/images/avatars/4.jpg';
import { topInfActions } from '../../../../_actions';
import {
    Row, Col,
    Card, CardBody,
    CardTitle, Nav, NavItem, NavLink

} from 'reactstrap';

class TopInfluencers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false
        };
    }

    componentDidMount() {

        const { dispatch } = this.props;

        //const topInfluencerItems = topEngagement ? topEngagement : [];
        
        dispatch(topInfActions.getTopByEngagement(45, 5));

    }

    render() {
        const { topInfluencers } = this.props;
        const topEngagementLocal = topInfluencers.topEngagement ? topInfluencers.topEngagement : []
        debugger;

        return (
            <Fragment>

                <Row>
                    <Row>
                        <Col md="12">
                            <Row>
                                <Col md="4">
                                    <Card className="main-card mb-3">
                                        <div className="card-header">Active Users</div>
                                        <div className="table-responsive">
                                            <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                                                <thead>
                                                    <tr>
                                                        <th className="text-center">#</th>
                                                        <th>Name</th>
                                                        <th className="text-center">Engagement</th>
                                                        <th className="text-center">Avg</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        topEngagementLocal.map((value, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td className="text-center text-muted">#1</td>
                                                                    <td>
                                                                        <div className="widget-content p-0">
                                                                            <div className="widget-content-wrapper">
                                                                                <div className="widget-content-left mr-3">
                                                                                    <div className="widget-content-left">
                                                                                        <img width={40} className="rounded-circle" src={avatar4} alt="Avatar" />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="widget-content-left flex2">
                                                                                    <div className="widget-heading">John Doe</div>
                                                                                    <div className="widget-subheading opacity-7">200000</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td className="text-center">183635</td>
                                                                    <td className="text-center">
                                                                        <div className="badge badge-warning">88</div>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </Card>
                                </Col>
                                <Col md="4">
                                    <Card className="main-card mb-3">
                                        <div className="card-header">Active Users</div>
                                        <div className="table-responsive">
                                            <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                                                <thead>
                                                    <tr>
                                                        <th className="text-center">#</th>
                                                        <th>Name</th>
                                                        <th className="text-center">Engagement</th>
                                                        <th className="text-center">Avg</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        topEngagementLocal.map((value, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td className="text-center text-muted">#1</td>
                                                                    <td>
                                                                        <div className="widget-content p-0">
                                                                            <div className="widget-content-wrapper">
                                                                                <div className="widget-content-left mr-3">
                                                                                    <div className="widget-content-left">
                                                                                        <img width={40} className="rounded-circle" src={avatar4} alt="Avatar" />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="widget-content-left flex2">
                                                                                    <div className="widget-heading">John Doe</div>
                                                                                    <div className="widget-subheading opacity-7">200000</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td className="text-center">183635</td>
                                                                    <td className="text-center">
                                                                        <div className="badge badge-warning">88</div>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </Card>
                                </Col>
                                <Col md="4">
                                    <Card className="main-card mb-3">
                                        <div className="card-header">Active Users</div>
                                        <div className="table-responsive">
                                            <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                                                <thead>
                                                    <tr>
                                                        <th className="text-center">#</th>
                                                        <th>Name</th>
                                                        <th className="text-center">Engagement</th>
                                                        <th className="text-center">Avg</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        topEngagementLocal.map((value, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td className="text-center text-muted">#1</td>
                                                                    <td>
                                                                        <div className="widget-content p-0">
                                                                            <div className="widget-content-wrapper">
                                                                                <div className="widget-content-left mr-3">
                                                                                    <div className="widget-content-left">
                                                                                        <img width={40} className="rounded-circle" src={avatar4} alt="Avatar" />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="widget-content-left flex2">
                                                                                    <div className="widget-heading">John Doe</div>
                                                                                    <div className="widget-subheading opacity-7">200000</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td className="text-center">183635</td>
                                                                    <td className="text-center">
                                                                        <div className="badge badge-warning">88</div>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </Card>
                                </Col>

                            </Row>
                        </Col>
                    </Row>
                </Row>
            </Fragment>
        );
    }
};

function mapStateToProps(state) {
    const { topInfluencers } = state;
    return {
        topInfluencers
    };
}

const connectedTopInfluencers = connect(mapStateToProps)(TopInfluencers);
export { connectedTopInfluencers as TopInfluencers };