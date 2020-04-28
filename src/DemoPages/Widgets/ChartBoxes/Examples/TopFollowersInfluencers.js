import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import default_user from '../../../../assets/utils/images/avatars/default_user.jpg';
import { topEngagementInfActions } from '../../../../_actions';
import {
    Row, Col,
    Card, CardBody,
    CardTitle

} from 'reactstrap';
import Img from 'react-image';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import NumberFormat from 'react-number-format';

class TopFollowersInfluencers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false
        };
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(topEngagementInfActions.getTopByFollower(5));
    }

    sendData = (tabIndex, object) => {
        // Go to detail tab
        this.props.parentCallback(tabIndex, object);
    }

    gotoDetail(selected) {
        //debugger;
        const { topFollowerInf } = this.props;
        const influencer = topFollowerInf ? topFollowerInf.topFollowers[selected] : null;
        window.scroll(0, 450);
        if (influencer) {
            this.sendData(1, influencer);
        }
    }

    render() {
        const { topFollowerInf } = this.props;
        const topFollowersLocal = topFollowerInf.topFollowers ? topFollowerInf.topFollowers : []
        const elements = (topFollowerInf && topFollowerInf.loading) ? [1, 2, 3, 4, 5] : [];

        return (
            <Fragment>
                <Card className="main-card mb-3">
                    <div className="card-header">TOP FOLLOWERS</div>
                    <div className="table-responsive">
                        <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                            <thead>
                                <tr>
                                    <th className="text-center">#</th>
                                    <th>Name</th>
                                    <th className="text-center">Followers</th>
                                    <th className="text-center">Engagement</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    topFollowerInf && topFollowerInf.loading === false ?
                                        topFollowersLocal.map((value, index) => {
                                            const avg = (value.engagement + value.numberOfFollowers) / 2;
                                            return (
                                                <tr key={index} style={{ cursor: 'pointer' }} onClick={() => this.gotoDetail(index)}>
                                                    <td style={{ verticalAlign: 'middle' }} className="text-center text-muted">{index + 1}</td>
                                                    <td>
                                                        <div className="widget-content p-0">
                                                            <div className="widget-content-wrapper">
                                                                <div className="widget-content-left mr-3">
                                                                    <div className="widget-content-left">
                                                                        <Img className="rounded-circle" width={40} src={value.photo.paths} alt="Avatar" />
                                                                        {/* <img width={40} className="rounded-circle" src={value ? value.photo.paths[1] : default_user} alt="Avatar" /> */}
                                                                    </div>
                                                                </div>
                                                                <div className="widget-content-left flex2">
                                                                    <div className="widget-heading">{value.fullName}</div>
                                                                    {/* <div className="widget-subheading opacity-7">{value.numberOfFollowers}</div> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td style={{ verticalAlign: 'middle' }} className="text-center">
                                                        <div className="badge-big badge-pill badge-warning">
                                                            <NumberFormat value={value.valueForSortingOne} displayType={'text'} thousandSeparator={true} />
                                                        </div>
                                                    </td>
                                                    <td style={{ verticalAlign: 'middle' }} className="text-center">
                                                        <NumberFormat value={value.valueForSortingTwo} displayType={'text'} thousandSeparator={true} />
                                                        {/* <div className="badge badge-warning">{value.valueForSortingOne}</div> */}
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