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
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import new_logo from '../../../../assets/utils/images/new_logo.png'

import bg1 from '../../../../assets/utils/images/dropdown-header/abstract1.jpg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { history } from '../../../../_helpers';

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
            cSelected: [],
            hasMore: true,
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
        this.createCampaign = this.createCampaign.bind(this);
        this.loadInfinity = this.loadInfinity.bind(this);
        // Binds our scroll event handler
        window.onscroll = () => {
            const {
                loadInfinity,
                state: {
                    hasMore,
                },
            } = this;

            // Bails early if:
            // * there's an error
            // * it's already loading
            // * there's nothing left to load
            if (!hasMore) return;

            // Checks that the page has scrolled to the bottom
            if (window.innerHeight + document.documentElement.scrollTop
                === document.documentElement.offsetHeight
            ) {
                loadInfinity();
            }
        };
    }

    loadInfinity() {
        const { dispatch, influencers } = this.props;
        const { first, hasMore } = this.state;
        const infItems = influencers.items ? influencers.items : [];
        if (infItems.length >= 45) {
            this.setState = ({ hasMore: false });
        }
        else {
            dispatch(infActions.infiniteScrollLoader(infItems, first, infItems.length));
        }
    }

    createCampaign(selected) {
        const { influencers } = this.props;
        const influencer = influencers.items ? influencers.items[selected] : null;
        if (influencer) {
            this.sendData(3, influencers.items, selected);
        }
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

    sendData = (tabIndex, object, index) => {
        // Back to first tab
        this.props.parentCallback(tabIndex, object, index);
    }

    gotoDetail(selected) {
        debugger;
        const { influencers } = this.props;
        const influencer = influencers.items ? influencers.items[selected] : null;
        if (influencer) {
            this.sendData(1, influencers.items, selected);
        }
        //history.push('/dashboards/basic');
    }

    onCheckboxBtnClick(selected) {
        const index = this.state.cSelected.indexOf(selected);
        if (index < 0) {
            this.state.cSelected.push(selected);
        } else {
            this.state.cSelected.splice(index, 1);
        }

        this.setState({ cSelected: [...this.state.cSelected] });

        const { influencers } = this.props;
        if (influencers && influencers.items) {
            if (this.state.cSelected.length > 1) {
                let items = [];
                this.state.cSelected.map((item, key) => {
                    items.push(influencers.items[item]);
                })
                debugger;
                this.sendData(2, items, null);
            }
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
            else if (item.contentItemId === event.target.name && isChecked == false) {
                selectedInfluencersLocal.splice(selectedInfluencersLocal.indexOf(item), 1);
            }
        });

        this.setState({ selectedInfluencers: selectedInfluencersLocal })
    };

    componentDidMount() {
        const { dispatch } = this.props;
        const { first } = this.state;
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
        debugger;
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
        const { influencers, loading } = this.props;
        const infItems = influencers.items ? influencers.items : [];
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
        const elements = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        return (
            <Fragment>
                <TransitionGroup component="div">
                    <CSSTransition timeout={1500} unmountOnExit appear classNames="TabsAnimation">
                        <div>
                            {
                                infItems && infItems.length > 0 ?
                                    <Row>
                                        {
                                            infItems.map((value, index) => {
                                                return (
                                                    <Col key={index} md="4">
                                                        <div className="card mb-3 bg-success widget-chart text-white card-border">
                                                            <div className="widget-chart-actions">
                                                                <UncontrolledButtonDropdown>
                                                                    <DropdownToggle color="link" className="text-white">
                                                                        <FontAwesomeIcon icon={faEllipsisH} />
                                                                    </DropdownToggle>
                                                                    <DropdownMenu className="dropdown-menu-lg dropdown-menu-right">
                                                                        <Nav vertical>
                                                                            <NavItem className="nav-item-header">
                                                                                Activity
                                                            </NavItem>
                                                                            <NavItem>
                                                                                <NavLink href="javascript:void(0);">
                                                                                    Chat
                                                                    <div className="ml-auto badge badge-pill badge-info">8</div>
                                                                                </NavLink>
                                                                            </NavItem>
                                                                            <NavItem>
                                                                                <NavLink href="javascript:void(0);">Recover Password</NavLink>
                                                                            </NavItem>
                                                                            <NavItem className="nav-item-header">
                                                                                My Account
                                                            </NavItem>
                                                                            <NavItem>
                                                                                <NavLink href="javascript:void(0);">
                                                                                    Settings
                                                                    <div className="ml-auto badge badge-success">New</div>
                                                                                </NavLink>
                                                                            </NavItem>
                                                                            <NavItem>
                                                                                <NavLink href="javascript:void(0);">
                                                                                    Messages
                                                                    <div className="ml-auto badge badge-warning">512</div>
                                                                                </NavLink>
                                                                            </NavItem>
                                                                            <NavItem>
                                                                                <NavLink href="javascript:void(0);">
                                                                                    Logs
                                                                </NavLink>
                                                                            </NavItem>
                                                                            <NavItem className="nav-item-divider" />
                                                                            <NavItem className="nav-item-btn">
                                                                                <Button size="sm" className="btn-wide btn-shadow"
                                                                                    color="danger">
                                                                                    Cancel
                                                                </Button>
                                                                            </NavItem>
                                                                        </Nav>
                                                                    </DropdownMenu>
                                                                </UncontrolledButtonDropdown>
                                                            </div>
                                                            <div className="icon-wrapper rounded-circle">
                                                                <div className="icon-wrapper-bg bg-white opacity-10" />
                                                                <i className="lnr-screen text-success" />
                                                            </div>
                                                            <div className="widget-numbers">
                                                                17.2k
                                                    </div>
                                                            <div className="widget-subheading">
                                                                Profiles
                                                    </div>
                                                            <div className="widget-description text-white">
                                                                <span className="pr-1">175.5%</span>
                                                                <FontAwesomeIcon icon={faArrowLeft} />
                                                            </div>
                                                            <div className="divider" />
                                                            <ButtonGroup>
                                                                <Button color="success" onClick={() => this.gotoDetail(index)}>Detail</Button>
                                                                <Button color="alternate" onClick={() => this.onCheckboxBtnClick(index)}
                                                                    active={this.state.cSelected.includes(index)}>Compare</Button>
                                                                <Button color="primary" onClick={() => this.createCampaign(index)}>Campaign</Button>
                                                            </ButtonGroup>
                                                        </div>
                                                    </Col>
                                                )
                                            })
                                        }
                                    </Row>
                                    :
                                    <Row>
                                        {
                                            elements.map((value, index) => {
                                                return (
                                                    <Col key={index} md="4">
                                                        <div className="">
                                                            <div className="icon-wrapper rounded-circle">
                                                                <div className="icon-wrapper-bg bg-white opacity-10" />
                                                                <Skeleton circle={true} />
                                                            </div>
                                                            <div className="">
                                                                <SkeletonTheme color="#d1cfcf" highlightColor="#999999">
                                                                    <p>
                                                                        <Skeleton />
                                                                    </p>
                                                                </SkeletonTheme>
                                                            </div>
                                                            <div className="">
                                                                <SkeletonTheme color="#d1cfcf" highlightColor="#999999">
                                                                    <p>
                                                                        <Skeleton />
                                                                    </p>
                                                                </SkeletonTheme>
                                                            </div>
                                                            <div className="widget-description">
                                                                <SkeletonTheme color="#d1cfcf" highlightColor="#999999">
                                                                    <p>
                                                                        <Skeleton count={2} />
                                                                    </p>
                                                                </SkeletonTheme>
                                                            </div>
                                                            <div className="divider" />
                                                        </div>
                                                    </Col>
                                                )
                                            })
                                        }
                                    </Row>
                            }
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
