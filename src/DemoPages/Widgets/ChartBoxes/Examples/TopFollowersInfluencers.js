import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import default_user from '../../../../assets/utils/images/avatars/default_user.jpg';
import { topEngagementInfActions } from '../../../../_actions';
import {
    Row, Col,
    Card, CardBody,
    CardTitle

} from 'reactstrap';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

class TopFollowersInfluencers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false
        };
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(topEngagementInfActions.getTopByFollower(100, 5));
    }

    render() {
        const { topFollowerInf } = this.props;
        const topFollowersLocal = topFollowerInf.topFollowers ? topFollowerInf.topFollowers : []
        const elements = (topFollowerInf && topFollowerInf.loading) ? [1, 2, 3, 4, 5] : [];

        return (
            <Fragment>
                <Card className="main-card mb-3">
                    <div className="card-header">Active Users</div>
                    <div className="table-responsive">
                        <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                            <thead>
                                <tr>
                                    <th className="text-center">#</th>
                                    <th>Name</th>
                                    <th className="text-center">Engagement</th>
                                    <th className="text-center">Followers</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    topFollowerInf && topFollowerInf.loading === false ?
                                        topFollowersLocal.map((value, index) => {
                                            const avg = (value.engagement + value.numberOfFollowers) / 2;
                                            return (
                                                <tr key={index}>
                                                    <td className="text-center text-muted">{index}</td>
                                                    <td>
                                                        <div className="widget-content p-0">
                                                            <div className="widget-content-wrapper">
                                                                <div className="widget-content-left mr-3">
                                                                    <div className="widget-content-left">
                                                                        <img width={40} className="rounded-circle" src={value ? value.photo.paths[1] : default_user} alt="Avatar" />
                                                                    </div>
                                                                </div>
                                                                <div className="widget-content-left flex2">
                                                                    <div className="widget-heading">{value.fullName}</div>
                                                                    {/* <div className="widget-subheading opacity-7">{value.numberOfFollowers}</div> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="text-center">{value.engagement}</td>
                                                    <td className="text-center">
                                                        <div className="badge badge-warning">{value.numberOfFollowers}</div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                        :
                                        elements.map((value, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td className="text-center text-muted">{index}</td>
                                                    <td>
                                                        <div className="widget-content p-0">
                                                            <div className="widget-content-wrapper">
                                                                <div className="widget-content-left mr-3">
                                                                    <div className="widget-content-left">
                                                                        <Skeleton circle={true} />
                                                                    </div>
                                                                </div>
                                                                <div className="widget-content-left flex2">
                                                                    <SkeletonTheme color="#d1cfcf" highlightColor="#999999">
                                                                        <p>
                                                                            <Skeleton />
                                                                        </p>
                                                                    </SkeletonTheme>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="text-center">
                                                        <SkeletonTheme color="#d1cfcf" highlightColor="#999999">
                                                            <p>
                                                                <Skeleton />
                                                            </p>
                                                        </SkeletonTheme>
                                                    </td>
                                                    <td className="text-center">
                                                        <div>
                                                            <SkeletonTheme color="#d1cfcf" highlightColor="#999999">
                                                                <p>
                                                                    <Skeleton />
                                                                </p>
                                                            </SkeletonTheme>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                }
                            </tbody>
                        </table>
                    </div>
                </Card>
            </Fragment>
        );
    }
};

function mapStateToProps(state) {
    const { topFollowerInf } = state;
    return {
        topFollowerInf
    };
}

const connectedTopFollowersInfluencers = connect(mapStateToProps)(TopFollowersInfluencers);
export { connectedTopFollowersInfluencers as TopFollowersInfluencers };