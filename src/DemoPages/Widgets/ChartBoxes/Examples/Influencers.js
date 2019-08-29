import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';
import {
    Row, Col, CustomInput,
} from 'reactstrap';


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

class Influencers extends Component {
    constructor(props) {
        super(props);
        const moment = extendMoment(originalMoment);

        const today = moment();
        //const startDate = today;
        //const dateValue = today;
        // an example array of items to be paged
        var exampleItems = [...Array(45).keys()].map(i => ({ id: (i + 1), name: 'Item ' + (i + 1) }));

        this.state = {
            skip: 0,
            first: 9,
            searchValue: '',
            dateValue: moment.range(today.clone(), today.clone().add(7, "days"))
        };

        this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
        this.nextPageFluencers = this.nextPageFluencers.bind(this);
        this.prePageFluencers = this.prePageFluencers.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
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
            else if (item.contentItemId === event.target.name && isChecked == false) {
                selectedInfluencersLocal.splice(selectedInfluencersLocal.indexOf(item), 1);
            }
        });

        this.setState({ selectedInfluencers: selectedInfluencersLocal })
    };

    componentDidMount() {

        const { dispatch } = this.props;
        const { first } = this.state;

        //if (this.props.location.state) {
        dispatch(infActions.getAll(first, 0));
        // const { brand, userName } = this.props.location.state;

        // if (brand) {

        //     //const { brand } = this.props.location.state;
        //     dispatch(infActions.getAll(first, 0));
        //     //dispatch(brandActions.getBrandFromBrandPage(brand));
        // }
        // else {
        //     if (userName) {
        //         dispatch(brandActions.getBrandByName(userName));
        //     }
        //     else {
        //         history.push('/registerBrandPage');
        //     }
        // }
        // }
        // else {
        //     history.push('/registerBrandPage');
        // }

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
        const { } = this.state;
        const { influencers } = this.props;
        //const infItems = influencers.items ? influencers.items.influencer : [];
        let imgSrc = defaultAvatar;

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

        return (
            <Fragment>
                <TransitionGroup component="div">
                    <CSSTransition timeout={1500} unmountOnExit appear classNames="TabsAnimation">
                        <div>
                            {/* <Row>
                                <Col md="4">
                                    <div className="card mb-3 widget-chart bg-mean-fruit card-border">
                                        <div className="widget-chart-content text-white">
                                            <div className="icon-wrapper rounded-circle">
                                                <div className="icon-wrapper-bg bg-white opacity-3" />
                                                <i className="lnr-cog text-white" />
                                            </div>
                                            <div className="widget-numbers">
                                                45.8k
                                        </div>
                                            <div className="widget-subheading">
                                                Total Views
                                        </div>
                                            <div className="widget-description text-dark">
                                                <FontAwesomeIcon icon={faAngleUp} />
                                                <span className="pl-1">175.5%</span>
                                            </div>
                                        </div>
                                        <div className="widget-chart-wrapper chart-wrapper-relative">
                                            <ResponsiveContainer width='100%' aspect={3.0 / 1.0}>
                                                <LineChart data={data}
                                                    margin={{ top: 5, right: 5, left: 5, bottom: 0 }}>
                                                    <Line type='monotone' dataKey='pv' stroke='#ffffff'
                                                        strokeWidth={3} />
                                                </LineChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                </Col>
                                <Col md="4">
                                    <div className="card mb-3 widget-chart bg-tempting-azure card-border">
                                        <div className="widget-chart-content text-white">
                                            <div className="icon-wrapper rounded-circle">
                                                <div className="icon-wrapper-bg bg-white opacity-3" />
                                                <i className="lnr-screen text-success" />
                                            </div>
                                            <div className="widget-numbers">
                                                17.2k
                                        </div>
                                            <div className="widget-subheading">
                                                Profiles
                                        </div>
                                            <div className="widget-description text-dark">
                                                <span className="pr-1">175.5%</span>
                                                <FontAwesomeIcon icon={faArrowLeft} />
                                            </div>
                                        </div>
                                        <div className="widget-chart-wrapper chart-wrapper-relative">
                                            <ResponsiveContainer width='100%' aspect={3.0 / 1.0}>
                                                <AreaChart data={data}
                                                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                                    <Area type='monotoneX' dataKey='uv' stroke='#ffffff' fill='rgba(255,255,255,.2)' />
                                                </AreaChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                </Col>
                                <Col md="4">
                                    <div className="card mb-3 widget-chart bg-amy-crisp card-border">
                                        <div className="widget-chart-content text-white">
                                            <div className="icon-wrapper rounded-circle">
                                                <div className="icon-wrapper-bg bg-white opacity-3" />
                                                <i className="lnr-laptop-phone text-danger" />
                                            </div>
                                            <div className="widget-numbers">
                                                5.82k
                                        </div>
                                            <div className="widget-subheading">
                                                Reports Submitted
                                        </div>
                                            <div className="widget-description text-danger">
                                                <FontAwesomeIcon icon={faAngleDown} />
                                                <span className="pl-1">54.1%</span>
                                            </div>
                                        </div>
                                        <div className="widget-chart-wrapper chart-wrapper-relative">
                                            <ResponsiveContainer width='100%' aspect={3.0 / 1.0}>
                                                <BarChart data={data}>
                                                    <Bar dataKey='uv' fill='#81a4ff' stroke='#3f6ad8' strokeWidth={1} />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                </Col>
                                <Col md="4">
                                    <div className="card mb-3 widget-chart bg-arielle-smile card-border">
                                        <div className="widget-chart-content text-white">
                                            <div className="icon-wrapper rounded-circle">
                                                <div className="icon-wrapper-bg bg-white opacity-7" />
                                                <i className="lnr-graduation-hat text-info" />
                                            </div>
                                            <div className="widget-numbers">
                                                63.2k
                                        </div>
                                            <div className="widget-subheading">
                                                Bugs Fixed
                                        </div>
                                            <div className="widget-description text-white">
                                                <FontAwesomeIcon icon={faArrowRight} />
                                                <span className="pl-1">175.5%</span>
                                            </div>
                                        </div>
                                        <div className="widget-chart-wrapper chart-wrapper-relative">
                                            <ResponsiveContainer width='100%' aspect={3.0 / 1.0}>
                                                <AreaChart data={data}
                                                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                                    <Area type='stepAfter' dataKey='uv' stroke='rgba(255,255,255,.7)' fill='rgba(255,255,255,.5)' />
                                                </AreaChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                </Col>
                                <Col md="4">
                                    <div className="card mb-3 widget-chart bg-happy-itmeo card-border">
                                        <div className="widget-chart-content text-white">
                                            <div className="icon-wrapper rounded">
                                                <div className="icon-wrapper-bg bg-white opacity-6" />
                                                <i className="lnr-heart icon-gradient bg-premium-dark"> </i>
                                            </div>
                                            <div className="widget-numbers">
                                                5.82k
                                        </div>
                                            <div className="widget-subheading">
                                                Active Social Profiles
                                        </div>
                                            <div className="widget-description">
                                                Down by
                                            <span className="text-white pl-1 pr-1">
                                                    <FontAwesomeIcon icon={faAngleDown} />
                                                    <span className="pl-1">54.1%</span>
                                                </span>
                                                from 30 days ago
                                        </div>
                                        </div>
                                        <div className="widget-chart-wrapper chart-wrapper-relative">
                                            <ResponsiveContainer width='100%' aspect={3.0 / 1.0}>
                                                <LineChart data={data2}
                                                    margin={{ top: 0, right: 5, left: 5, bottom: 0 }}>
                                                    <Line type="monotone" dataKey="pv" stroke="#ffffff" strokeWidth={2} />
                                                    <Line type="monotone" dataKey="uv" stroke="rgba(255,255,255,.7)" strokeWidth={2} />
                                                </LineChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                </Col>
                                <Col md="4">
                                    <div className="card mb-3 widget-chart bg-strong-bliss card-border">
                                        <div className="widget-chart-content text-white">
                                            <div className="icon-wrapper rounded">
                                                <div className="icon-wrapper-bg bg-white opacity-4" />
                                                <i className="lnr-graduation-hat text-white" />
                                            </div>
                                            <div className="widget-numbers">
                                                1.5M
                                        </div>
                                            <div className="widget-subheading">
                                                Bugs Fixed
                                        </div>
                                            <div className="widget-description text-white">
                                                Down by
                                            <span className="text-white pl-1 pr-1 opacity-8">
                                                    <FontAwesomeIcon icon={faAngleDown} />
                                                    <span className="pl-1">54.1%</span>
                                                </span>
                                                from 30 days ago
                                        </div>
                                        </div>
                                        <div className="widget-chart-wrapper chart-wrapper-relative">
                                            <ResponsiveContainer width='100%' aspect={3.0 / 1.0}>
                                                <ComposedChart data={data2}>
                                                    <CartesianGrid stroke="rgba(255,255,255,.1)" />
                                                    <Area type="monotone" dataKey="amt" fill="rgba(255,255,255,.4)" stroke="transparent" />
                                                    <Bar dataKey="pv" barSize={5} fill="rgba(255,255,255,.9)" />
                                                    <Line type="monotone" dataKey="uv" stroke="#ffffff" />
                                                </ComposedChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                </Col>
                            </Row> */}
                            <Row>
                                {
                                    influencers.items && influencers.items.influencer.map((item, key) => {
                                        //if ((brand && brand.published) || (brandFromLoading && brandFromLoading.published)) {
                                        imgSrc = item.photo.urls.length === 0 ? defaultAvatar : "http://bdo8.com" + item.photo.urls[0] + '?&width=240&height=240&rmode=';
                                        //}
                                        return (
                                            <Col key={key} md="4">
                                                <div className={"card mb-3 widget-chart " + colors[key] + " card-border"}>
                                                    <div className="rounded-circle">
                                                        <img className="mx-auto rounded-circle" style={{ width: '88px', height: '88px' }} src={imgSrc} alt="" />
                                                    </div>
                                                    <div className="divide" style={{ marginBottom: '5px' }} />
                                                    <div className="widget-heading">
                                                        {item.fullName} - {item.description}
                                                    </div>
                                                    <Row>
                                                        <Col>
                                                            <div className="widget-subheading" style={{ textAlign: 'left' }}>
                                                                Hướng về lứa: {item.ageDemorgraphic.ageGraphicsName}
                                                            </div>
                                                        </Col>
                                                        {/* <Col>
                                                            <div className="widget-subheading" style={{ textAlign: 'left' }}>
                                                                {
                                                                    ((brand && brand.published) || (brandFromLoading && brandFromLoading.published)) ?
                                                                        'Share Link: ' + (item.shareLink ? item.shareLink : 'Call') : 'Share Link: 1000000'
                                                                }
                                                            </div>
                                                        </Col> */}
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <div className="widget-subheading" style={{ textAlign: 'left' }}>
                                                                Hướng về giới: {item.genderDemorgraphic.genderGraphicsName}
                                                            </div>
                                                        </Col>
                                                        {/* <Col>
                                                            <div className="widget-subheading" style={{ textAlign: 'left' }}>
                                                                {
                                                                    ((brand && brand.published) || (brandFromLoading && brandFromLoading.published)) ?
                                                                        'Post Image: ' + (item.postImage ? item.postImage : 'Call') : 'Post Image: 1000000'
                                                                }
                                                            </div>
                                                        </Col> */}
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                            <div className="widget-subheading" style={{ textAlign: 'left' }}>
                                                                Hướng về nơi: {item.geoDemorgraphic.geoGraphicName}
                                                            </div>
                                                        </Col>
                                                        {/* <Col>
                                                            <div className="widget-subheading" style={{ textAlign: 'left' }}>
                                                                {
                                                                    ((brand && brand.published) || (brandFromLoading && brandFromLoading.published)) ?
                                                                        'Video: ' + (item.video ? item.video : 'Call') : 'Video: 1000000'
                                                                }
                                                            </div>
                                                        </Col> */}
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                        </Col>
                                                        {/* <Col>
                                                            <div className="widget-subheading" style={{ textAlign: 'left' }}>
                                                                {
                                                                    ((brand && brand.published) || (brandFromLoading && brandFromLoading.published)) ?
                                                                        'CheckIn: ' + (item.checkIn ? item.checkIn : 'Call') : 'CheckIn: 1000000'
                                                                }
                                                            </div>
                                                        </Col> */}
                                                    </Row>
                                                    <Row>
                                                        <Col>
                                                        </Col>
                                                        {/* <Col>
                                                            <div className="widget-subheading" style={{ textAlign: 'left' }}>
                                                                {
                                                                    ((brand && brand.published) || (brandFromLoading && brandFromLoading.published)) ?
                                                                        'LiveStream: ' + (item.liveStream ? item.liveStream : 'Call') : 'LiveStream: 1000000'
                                                                }
                                                            </div>
                                                        </Col> */}
                                                    </Row>
                                                    {/* <div className="widget-description text-success">
                                                        <CustomInput type="checkbox" id={item.contentItemId} name={item.contentItemId} onChange={this.handleCheckBoxChange} checked={this.state.checkedInfluencers.get(item.contentItemId) ? this.state.checkedInfluencers.get(item.contentItemId) : false}
                                                            label="Select" />
                                                    </div> */}
                                                </div>
                                            </Col>
                                        )
                                    })
                                }
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

const connectedInfluencers = connect(mapStateToProps)(Influencers);
export { connectedInfluencers as Influencers };
//export default Influencers;
