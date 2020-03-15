import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import avatar4 from '../../../../assets/utils/images/avatars/4.jpg';
import default_user from '../../../../assets/utils/images/avatars/default_user.jpg';
import { topEngagementInfActions } from '../../../../_actions';
import {
    Row, Col,
    Card, CardBody,
    CardTitle

} from 'reactstrap';
import Img from 'react-image';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

class TopEngagementInfluencers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false
        };
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(topEngagementInfActions.getTopByEngagement(5));
    }

    sendData = (tabIndex, object) => {
        // Go to detail tab
        this.props.parentCallback(tabIndex, object);
    }

    gotoDetail(selected) {
        const { topEngagementInf } = this.props;
        debugger;
        const influencer = topEngagementInf ? topEngagementInf.topEngagement[selected] : null;
        window.scroll(0, 450);
        if (influencer) {
            this.sendData(1, influencer);
        }
    }

    render() {
        const { topEngagementInf } = this.props;
        const topEngagementLocal = topEngagementInf.topEngagement ? topEngagementInf.topEngagement : []
        const elements = (topEngagementInf && topEngagementInf.loading) ? [1, 2, 3, 4, 5] : [];
        //debugger;
        return (
            <Fragment>
                <Card className="main-card mb-3">
                    <div className="card-header">TOP ENGAGEMENT</div>
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
                                    topEngagementInf && topEngagementInf.loading === false ?
                                        topEngagementLocal.map((value, index) => {
                                            return (
                                                <tr key={index} style={{ cursor: 'pointer' }} onClick={() => this.gotoDetail(index)}>
                                                    <td className="text-center text-muted">{index + 1}</td>
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
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="text-center">{value.valueForSortingOne}</td>
                                                    <td className="text-center">
                                                        <div className="badge badge-warning">{value.valueForSortingTwo}</div>
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
    const { topEngagementInf } = state;
    return {
        topEngagementInf
    };
}

const connectedTopEngagementInfluencers = connect(mapStateToProps)(TopEngagementInfluencers);
export { connectedTopEngagementInfluencers as TopEngagementInfluencers };