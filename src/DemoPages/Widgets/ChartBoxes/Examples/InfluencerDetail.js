import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';

import city from '../../../../assets//utils//images/originals/city.jpg'
import citynights from '../../../../assets/utils/images/originals/citynights.jpg'
import citydark from '../../../../assets/utils/images/originals/citydark.jpg'
import Slider from "react-slick";

import ReactPlayer from 'react-player';

import classnames from 'classnames';

import {
    Row, Col, ButtonGroup,
    Button,
    Card,
    CardHeader,
    CardBody,
    Progress,
    TabContent,
    TabPane,
    Tooltip,
    UncontrolledButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';

import {
    AreaChart, Area, LineChart, Line,
    ResponsiveContainer,
    BarChart, Bar,
    ComposedChart,
    CartesianGrid
} from 'recharts';

import {
    faAngleUp,
    faAngleDown,
    faArrowLeft,
    faArrowRight,
    faEllipsisH,
    faArrowUp,
} from '@fortawesome/free-solid-svg-icons';

import avatar1 from '../../../../assets/utils/images/avatars/1.jpg';
import avatar2 from '../../../../assets/utils/images/avatars/2.jpg';
import avatar3 from '../../../../assets/utils/images/avatars/3.jpg';
import avatar4 from '../../../../assets/utils/images/avatars/4.jpg';

import { infActions, brandActions } from '../../../../_actions';
import Select from 'react-select';

import defaultAvatar from '../../../../assets/utils/images/avatars/default.jpg'

import originalMoment from "moment";
import { extendMoment } from "moment-range";
import 'react-daterange-picker/dist/css/react-calendar.css'
import JwPagination from 'jw-react-pagination';
//import { SearchBox } from '../SearchBox';
import cx from 'classnames';
import Skeleton from 'react-loading-skeleton';
import new_logo from '../../../../assets/utils/images/new_logo.png'

import bg1 from '../../../../assets/utils/images/dropdown-header/abstract1.jpg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { history } from '../../../../_helpers';

const data = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
    { name: 'Page C', uv: 2000, pv: 6800, amt: 2290 },
    { name: 'Page D', uv: 4780, pv: 7908, amt: 2000 },
    { name: 'Page E', uv: 2890, pv: 9800, amt: 2181 },
    { name: 'Page F', uv: 1390, pv: 3800, amt: 1500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];

const data2 = [
    { name: 'Page A', uv: 5400, pv: 5240, amt: 1240 },
    { name: 'Page B', uv: 7300, pv: 4139, amt: 3221 },
    { name: 'Page C', uv: 8200, pv: 7980, amt: 5229 },
    { name: 'Page D', uv: 6278, pv: 4390, amt: 3200 },
    { name: 'Page E', uv: 3189, pv: 7480, amt: 6218 },
    { name: 'Page D', uv: 9478, pv: 6790, amt: 2200 },
    { name: 'Page E', uv: 1289, pv: 1980, amt: 7218 },
    { name: 'Page F', uv: 3139, pv: 2380, amt: 5150 },
    { name: 'Page G', uv: 5349, pv: 3430, amt: 3210 },
];

class InfluencerDetail extends Component {
    constructor(props) {
        super(props);
        const moment = extendMoment(originalMoment);

        const today = moment();

        this.state = {
            skip: 0,
            first: 9,
            searchValue: '',
            cSelected: [],
            dateValue: moment.range(today.clone(), today.clone().add(7, "days"))
        };

        this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
        this.nextPageFluencers = this.nextPageFluencers.bind(this);
        this.prePageFluencers = this.prePageFluencers.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.onCheckboxBtnClick = this.onCheckboxBtnClick.bind(this);
        this.sendData = this.sendData.bind(this);
        this.gotoDetail = this.gotoDetail.bind(this);
        this.toggle1 = this.toggle1.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    toggle1(tab) {
        if (this.state.activeTab1 !== tab) {
            this.setState({
                activeTab1: tab
            });
        }
    }

    sendData = (tabIndex) => {
        // Back to first tab
        this.props.parentCallback(tabIndex);
    }

    gotoDetail(selected) {
        const index = this.state.cSelected.indexOf(selected);

        history.push('/dashboards/basic');
    }

    onCheckboxBtnClick(selected) {
        const index = this.state.cSelected.indexOf(selected);
        if (index < 0) {
            this.state.cSelected.push(selected);
        } else {
            this.state.cSelected.splice(index, 1);
        }

        this.setState({ cSelected: [...this.state.cSelected] });

        if (this.state.cSelected.length > 1) {
            this.sendData(1);
        }
    }

    nextPageFluencers(skip) {
        this.setState({ skip: skip + 1 });
    }

    prePageFluencers() {
        const { skip } = this.state;
        if (skip > 0) {
            this.setState({ skip: skip - 1 });
        }
    }

    handleCheckBoxChange(event) {

        const { influencers } = this.props;
        const { selectedInfluencers } = this.state;
        const selectedInfluencersLocal = selectedInfluencers;

        const item = event.target.name;
        const isChecked = event.target.checked;

        this.setState(prevState => ({ checkedInfluencers: prevState.checkedInfluencers.set(item, isChecked) }));

        influencers.items.influencer.map((item, key) => {
            if (item.contentItemId === event.target.name && isChecked == true) {
                selectedInfluencersLocal.push(item);
            }
            else if (item.contentItemId === event.target.name && isChecked === false) {
                selectedInfluencersLocal.splice(selectedInfluencersLocal.indexOf(item), 1);
            }
        });

        this.setState({ selectedInfluencers: selectedInfluencersLocal })
    };

    componentDidMount() {
        const { dispatch } = this.props;
        //const { first } = this.state;
        //dispatch(infActions.getAll(first, 0));
    }

    onToggle = () => {
        const { isOpen } = this.state;
        this.setState({ isOpen: !isOpen });
    };

    handleSearch(searchValue) {
        const { dispatch } = this.props;
        const { first } = this.state;
        this.setState({ searchValue: searchValue });
        if (searchValue !== '') {
            dispatch(infActions.getInfluencersByName(first, 0, searchValue));
        } else {
            dispatch(infActions.getAll(first, 0));
        }
    }

    onChangePage(pageOfItems) {
        const { dispatch } = this.props;
        const { first, searchValue } = this.state;
        const length = pageOfItems.length;
        const currentPage = Math.ceil(pageOfItems[length - 1].id / first);

        dispatch(infActions.getInfluencersByName(first, first * (currentPage - 1), searchValue));
        // update local state with new page of items
        this.setState({ pageOfItems });
    }

    render() {

        const settings = {
            dots: true,
            infinite: true,
            fade: true,
            speed: 800,
            slidesToShow: 1,
            autoplay: true,
            slidesToScroll: 1
        };
        const { } = this.state;
        const { influencers, Influencer } = this.props;
        //const infItems = influencers.items ? influencers.items.influencer : [];
        let imgSrc = defaultAvatar;
        debugger;
        const colors = [
            "bg-mean-fruit",
            "bg-tempting-azure",
            "bg-amy-crisp",
            "bg-arielle-smile",
            "bg-happy-itmeo",
            "bg-strong-bliss",
            "bg-mean-fruit",
            "bg-tempting-azure",
            "bg-amy-crisp",
        ];

        //const { brand, userName } = this.props.location.state;

        const brandFromLoading = this.props.brands.brand;
        const elements = ['1', '2', '3', '4', '5', '6'];
        const strOfReaction = Influencer.numberOfReaction;
        const strOfComment = Influencer.numberOfComment;
        const strOfShare = Influencer.numberOfShare;
        const numberOfReaction = strOfReaction.charAt(strOfReaction.length - 1) == 'k' ? (strOfReaction.substring(0, strOfReaction.length - 1)) * 1000 : strOfReaction;
        const numberOfComment = strOfComment.charAt(strOfComment.length - 1) == 'k' ? (strOfComment.substring(0, strOfComment.length - 1)) * 1000 : strOfComment;
        const numberOfShare = strOfShare.charAt(strOfShare.length - 1) == 'k' ? (strOfShare.substring(0, strOfShare.length - 1)) * 1000 : strOfShare;
        const engagement = numberOfReaction + (numberOfComment * 2) + (numberOfShare * 3)
        return (
            <Fragment>
                <TransitionGroup component="div">
                    <CSSTransition timeout={1500} unmountOnExit appear classNames="TabsAnimation">
                        <div>
                            <Row>
                                <Col md="12" lg="6">
                                    <Row>
                                        <Col lg="6">
                                            <div className="card mb-3 widget-chart">
                                                <div className="widget-chart-content">
                                                    <div className="icon-wrapper rounded-circle">
                                                        <div className="icon-wrapper-bg bg-primary" />
                                                        <i className="lnr-cog text-primary" />
                                                    </div>
                                                    <div className="widget-numbers">
                                                        {Influencer.numberOfReaction}
                                                    </div>
                                                    <div className="widget-subheading">
                                                        Reactions
                                                </div>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col lg="6">
                                            <div className="card mb-3 widget-chart">
                                                <div className="widget-chart-content">
                                                    <div className="icon-wrapper rounded-circle">
                                                        <div className="icon-wrapper-bg bg-danger" />
                                                        <i className="lnr-laptop-phone text-danger" />
                                                    </div>
                                                    <div className="widget-numbers">
                                                        {Influencer.numberOfComment}
                                                    </div>
                                                    <div className="widget-subheading">
                                                        Comments
                                                </div>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col md="12" lg="6">
                                    <Row>
                                        <Col md="6">
                                            <div className="card mb-3 bg-arielle-smile widget-chart text-white card-border">
                                                <div className="icon-wrapper rounded-circle">
                                                    <div className="icon-wrapper-bg bg-white opacity-10" />
                                                    <i className="lnr-cog icon-gradient bg-arielle-smile" />
                                                </div>
                                                <div className="widget-numbers">
                                                    {Influencer.numberOfShare}
                                                </div>
                                                <div className="widget-subheading">
                                                    Share
                                            </div>
                                            </div>
                                        </Col>
                                        <Col md="6">
                                            <div className="card mb-3 bg-midnight-bloom widget-chart text-white card-border">
                                                <div className="icon-wrapper rounded">
                                                    <div className="icon-wrapper-bg bg-white opacity-10" />
                                                    <i className="lnr-screen icon-gradient bg-warm-flame" />
                                                </div>
                                                <div className="widget-numbers">
                                                    {engagement}
                                                </div>
                                                <div className="widget-subheading">
                                                    Engagement
                                            </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="12">
                                    <Card className="main-card mb-3">
                                        <div className="card-header">Active Users
                                        <div className="btn-actions-pane-right">
                                                <div role="group" className="btn-group-sm btn-group">
                                                    <button className="active btn btn-info">Last Week</button>
                                                    <button className="btn btn-info">All Month</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-responsive">
                                            <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                                                <thead>
                                                    <tr>
                                                        <th className="text-center">#</th>
                                                        <th>Name</th>
                                                        <th className="text-center">City</th>
                                                        <th className="text-center">Status</th>
                                                        <th className="text-center">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="text-center text-muted">#345</td>
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
                                                                        <div className="widget-subheading opacity-7">Web Developer</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="text-center">Madrid</td>
                                                        <td className="text-center">
                                                            <div className="badge badge-warning">Pending</div>
                                                        </td>
                                                        <td className="text-center">
                                                            <button type="button" className="btn btn-primary btn-sm">Details</button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center text-muted">#347</td>
                                                        <td>
                                                            <div className="widget-content p-0">
                                                                <div className="widget-content-wrapper">
                                                                    <div className="widget-content-left mr-3">
                                                                        <div className="widget-content-left">
                                                                            <img width={40} className="rounded-circle" src={avatar3} alt="Avatar" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="widget-content-left flex2">
                                                                        <div className="widget-heading">Ruben Tillman</div>
                                                                        <div className="widget-subheading opacity-7">Etiam sit amet orci eget</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="text-center">Berlin</td>
                                                        <td className="text-center">
                                                            <div className="badge badge-success">Completed</div>
                                                        </td>
                                                        <td className="text-center">
                                                            <button type="button" className="btn btn-primary btn-sm">Details</button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center text-muted">#321</td>
                                                        <td>
                                                            <div className="widget-content p-0">
                                                                <div className="widget-content-wrapper">
                                                                    <div className="widget-content-left mr-3">
                                                                        <div className="widget-content-left">
                                                                            <img width={40} className="rounded-circle" src={avatar2} alt="Avatar" />
                                                                        </div>
                                                                    </div>
                                                                    <div className="widget-content-left flex2">
                                                                        <div className="widget-heading">Elliot Huber</div>
                                                                        <div className="widget-subheading opacity-7">Lorem ipsum dolor sic</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="text-center">London</td>
                                                        <td className="text-center">
                                                            <div className="badge badge-danger">In Progress</div>
                                                        </td>
                                                        <td className="text-center">
                                                            <button type="button" className="btn btn-primary btn-sm">Details</button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center text-muted">#55</td>
                                                        <td>
                                                            <div className="widget-content p-0">
                                                                <div className="widget-content-wrapper">
                                                                    <div className="widget-content-left mr-3">
                                                                        <div className="widget-content-left">
                                                                            <img width={40} className="rounded-circle" src={avatar1} alt="Avatar" /></div>
                                                                    </div>
                                                                    <div className="widget-content-left flex2">
                                                                        <div className="widget-heading">Vinnie Wagstaff</div>
                                                                        <div className="widget-subheading opacity-7">UI Designer</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="text-center">Amsterdam</td>
                                                        <td className="text-center">
                                                            <div className="badge badge-info">On Hold</div>
                                                        </td>
                                                        <td className="text-center">
                                                            <button type="button" className="btn btn-primary btn-sm">Details</button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="d-block text-center card-footer">
                                        </div>
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="6">
                                    <Card className="main-card mb-3">
                                        <div className="card-header">Photos</div>
                                        <div className="slider-light">
                                            <div className="slick-slider">
                                                <div>
                                                    <Slider {...settings}>
                                                        <div>
                                                            <div className="position-relative h-100 d-flex justify-content-center align-items-center bg-plum-plate" tabIndex="-1">
                                                                <div className="slide-img-bg" style={{ backgroundImage: `url(${"https://scontent.fmnl5-1.fna.fbcdn.net/v/t1.0-9/70319472_2365613000221954_4395913428481343488_n.jpg?_nc_cat=101&_nc_oc=AQnhNDfPSp1aIMK6kHr6rc9rSa8O-844fpoxAxf6OUz8nVz9Urgme625hqWEzKeTQ0k&_nc_ht=scontent.fmnl5-1.fna&oh=b43bb96b3f1dbfd01737c5098963caf8&oe=5DFD499C"})` }}></div>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="position-relative h-100 d-flex justify-content-center align-items-center bg-premium-dark" tabIndex="-1">
                                                                <div className="slide-img-bg" style={{ backgroundImage: `url(${citynights})` }}></div>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="position-relative h-100 d-flex justify-content-center align-items-center bg-sunny-morning" tabIndex="-1">
                                                                <div className="slide-img-bg" style={{ backgroundImage: `url(${citydark})` }}></div>
                                                            </div>
                                                        </div>
                                                    </Slider>

                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </Col>
                                <Col md="6">
                                    <Card className="main-card mb-3">
                                        <div className="card-header">Videos
                                        <div className="btn-actions-pane-right">
                                                <div role="group" className="btn-group-sm btn-group">
                                                    <button className="btn btn-info">All Month</button>
                                                </div>
                                            </div>
                                        </div>
                                        <ReactPlayer
                                            url='https://www.facebook.com/kimyulin94/videos/vb.100003198303661/1509844989132097/?type=2&video_source=user_video_tab'

                                            playing={false}
                                            width='100%'
                                            height='100%'
                                        />
                                    </Card>
                                </Col>
                            </Row>
                        </div>

                    </CSSTransition>
                </TransitionGroup>
            </Fragment>
        );
    }
}

function mapStateToProps(state) {

    const { campaigns, influencers, locations, interestings, jobCategories, jobs, brands } = state;
    //const { brand } = influencers;
    return {
        //loggingIn,
        brands,
        jobs,
        jobCategories,
        interestings,
        locations,
        campaigns,
        influencers
    };
}

const connectedInfluencerDetail = connect(mapStateToProps)(InfluencerDetail);
export { connectedInfluencerDetail as InfluencerDetail };
//export default Influencers;