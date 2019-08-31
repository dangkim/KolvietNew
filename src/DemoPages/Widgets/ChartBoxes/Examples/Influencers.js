import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';

import {
    Row, Col, ButtonGroup,
    Button,
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

} from '@fortawesome/free-solid-svg-icons';

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
            else if (item.contentItemId === event.target.name && isChecked == false) {
                selectedInfluencersLocal.splice(selectedInfluencersLocal.indexOf(item), 1);
            }
        });

        this.setState({ selectedInfluencers: selectedInfluencersLocal })
    };

    componentDidMount() {
        const { dispatch } = this.props;
        const { first } = this.state;
        dispatch(infActions.getAll(first, 0)); 
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
        const elements = ['1', '2', '3', '4', '5', '6'];
        return (
            <Fragment>
                <TransitionGroup component="div">
                    <CSSTransition timeout={1500} unmountOnExit appear classNames="TabsAnimation">
                        <div>
                            <Row>
                                {
                                    elements.map((value, index) => {
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
                                                        <Button color="success" onClick={() => this.gotoDetail(index)}>Two</Button>
                                                        <Button color="alternate" onClick={() => this.onCheckboxBtnClick(index)}
                                                            active={this.state.cSelected.includes(index)}>Three</Button>
                                                    </ButtonGroup>
                                                </div>
                                            </Col>)
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
