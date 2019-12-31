import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Tabs from 'react-responsive-tabs';

import { history } from '../../../_helpers';
// Examples
import { Influencers } from './Examples/Influencers';
import { CreateCampaign } from './Examples/CreateCampaign';
import { InfluencerDetail } from './Examples/InfluencerDetail';
import { InfluencerUpdateCost } from './Examples/InfluencerUpdateCost';
import { CompareInfluencers } from './Examples/CompareInfluencers';
import {
    Modal, ModalHeader, ModalBody, ModalFooter, Button, Row, Col, Card, CardBody
} from 'reactstrap';
import ScrollUpButton from "react-scroll-up-button";
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';
import Sticky from "@wicked_query/react-sticky";
//import { Prompt } from 'react-router'
import { infActions } from '../../../_actions';
import realestate from '../../../assets/utils/images/originals/realestate.jpg'
import cosmetics from '../../../assets/utils/images/originals/cosmetics.jpg'
import event from '../../../assets/utils/images/originals/event.jpg'
import fashion from '../../../assets/utils/images/originals/fashion.jpg'
import game from '../../../assets/utils/images/originals/game.jpg'
import food from '../../../assets/utils/images/originals/food.jpg'
import fur from '../../../assets/utils/images/originals/fur.jpg'
import housewife from '../../../assets/utils/images/originals/housewife.jpg'
import sport from '../../../assets/utils/images/originals/sport.jpg'
import tech from '../../../assets/utils/images/originals/tech.jpg'
import travel from '../../../assets/utils/images/originals/travel.jpg'
import appliance from '../../../assets/utils/images/originals/appliance.jpg'
import avatar1 from '../../../assets/utils/images/avatars/1.jpg';
import avatar2 from '../../../assets/utils/images/avatars/2.jpg';
import avatar3 from '../../../assets/utils/images/avatars/3.jpg';
import avatar4 from '../../../assets/utils/images/avatars/4.jpg';
import { Trans } from 'react-i18next';

class WidgetsChartBoxes extends React.Component {

    constructor(props) {
        super(props);

        let brandLocal = null;
        let type = '';
        let userName = '';

        if (this.props.location.state) {
            if (this.props.location.state.Brand) {
                if (this.props.location.state.Brand[0]) {
                    brandLocal = this.props.location.state.Brand[0];
                }
                else {
                    brandLocal = this.props.location.state.Brand;
                }
            }

            if (this.props.location.state.type) {
                type = this.props.location.state.type;
                userName = this.props.location.state.userName;
            }

            if (this.props.location.state.userName) {
                userName = this.props.location.state.userName;
            }

        }

        this.state = {
            Brand: brandLocal,
            userName: userName,
            type: type,
            Influencer: null,
            ComparedInfluencers: [],
            confirmedNavigation: false,
            modalVisible: false,
            FilterInfluencers: [],
            first: 9,
            SearchValue: '',
            cSelected: [],
            lastLocation: "/widgets/dashboard-boxes",
        };

        this.callbackFunction = this.callbackFunction.bind(this);
        this.handleConfirmNavigationClick = this.handleConfirmNavigationClick.bind(this);
        this.handleBlockedNavigation = this.handleBlockedNavigation.bind(this);
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.filterCategory = this.filterCategory.bind(this);
        this.onCheckboxBtnClick = this.onCheckboxBtnClick.bind(this);
        this.onChangeTab = this.onChangeTab.bind(this);
    }

    onChangeTab(activeTab) {
        this.props.parentTabCallback(activeTab);
        //this.setState({ selectedTabKey: activeTab })
    }

    filterCategory(event) {
        const { first } = this.state;
        const { dispatch } = this.props;
        const searchValue = (event.target.value);
        this.setState({ SearchValue: searchValue });

        dispatch(infActions.getInfluencersByName(first, 0, searchValue));
    }

    callbackFunction = (selectedTabKey, childData, index) => {

        if (index !== null) {
            this.props.parentTabCallback(selectedTabKey);
            this.setState({ Influencer: childData[index] })
        }
        else {
            this.props.parentTabCallback(selectedTabKey);
            this.setState({ ComparedInfluencers: childData })
        }
    }

    showModal = location => {
        this.setState({
            modalVisible: true,
            lastLocation: location
        })
    };

    closeModal = (callback = () => { }) =>
        this.setState(
            {
                modalVisible: false
            },
            callback
        );

    handleBlockedNavigation = nextLocation => {
        const { confirmedNavigation } = this.state;
        if (!confirmedNavigation) {
            this.showModal(nextLocation);
            return false;
        }

        return true;
    };

    handleConfirmNavigationClick = () =>
        this.closeModal(() => {
            const { lastLocation } = this.state;
            if (lastLocation) {
                this.setState(
                    {
                        confirmedNavigation: true
                    },
                    () => {
                        //const startPageIndex = history.length - 1;
                        //history.index = -1;
                        // Navigate to the previous blocked location with your navigate function
                        //history.push(lastLocation.pathname);
                        //history.go(-startPageIndex);
                        history.replace({ pathname: lastLocation.pathname });
                    }
                );
            }
        });

    onCheckboxBtnClick(selected1, selected2) {
        const { cSelected, first, SearchValue } = this.state;
        const { dispatch } = this.props;

        this.props.parentTabCallback(0);

        let index = cSelected.indexOf(selected1);
        if (index < 0) {
            cSelected.push(selected1);
        } else {
            cSelected.splice(index, 1);
        }

        if (selected2 !== '') {
            index = cSelected.indexOf(selected2);
            if (index < 0) {
                cSelected.push(selected2);
            } else {
                cSelected.splice(index, 1);
            }
        }

        this.setState({ cSelected: [...cSelected] });
        let items = [];
        if (cSelected.length > 0) {
            cSelected.map((item, key) => {
                items.push(item);
            })
        }

        if (SearchValue !== '') {
            items.push(SearchValue);
        }

        dispatch(infActions.getInfluencersByCategory([], first, 0, items, false));
    }

    render() {
        const { cSelected, Influencer, Brand, modalVisible, type, userName, ComparedInfluencers } = this.state;
        const { FilterInfluencers, SearchValue, ActiveTab, i18n, isClear, influencers } = this.props;
        const cSelectedLocal = influencers.isClearList ? [] : cSelected;
        let tabsContent = [];
        const topFiveFilterInfluencers = FilterInfluencers;
        debugger;
        if (FilterInfluencers.length > 0) {
            tabsContent = [
                {
                    title: 'Influencers',
                    content: <Influencers SearchValue={SearchValue} FilterInfluencers={FilterInfluencers} parentCallback={this.callbackFunction} />
                },
                {
                    title: i18n.i18n.t('Influencer details'),
                    content: <InfluencerDetail Influencer={Influencer} />
                },
                {
                    title: i18n.i18n.t('Comparison Influencers'),
                    content: <CompareInfluencers ComparedInfluencers={ComparedInfluencers} />
                },
                {
                    title: i18n.i18n.t('Create Campaign'),
                    content: <CreateCampaign Brand={Brand} Influencer={Influencer} i18n={i18n} />
                },
            ]
        }
        else {
            tabsContent = [
                {
                    title: 'Influencers',
                    content: <Influencers SearchValue={SearchValue} FilterInfluencers={FilterInfluencers} parentCallback={this.callbackFunction} />
                }
            ]
        }

        const tabsContentUpdateCost = [
            {
                title: 'Vertical Menus',
                content: <InfluencerUpdateCost userName={userName} />
            }
        ]

        const clickedStyle = {
            color: '#B1BBC4',
            cursor: 'pointer',
        };

        const noClickedStyle = {
            cursor: 'pointer',
        };

        const getTabs = () => {

            if (type === "Influencer") {
                return (tabsContentUpdateCost.map((tab, index) => ({
                    title: tab.title,
                    getContent: () => tab.content,
                    key: index,
                })))
            }
            else {
                return (tabsContent.map((tab, index) => ({
                    title: tab.title,
                    getContent: () => tab.content,
                    key: index,
                })))
            }
        }

        return (
            <Fragment>
                <TransitionGroup component="div">
                    <CSSTransition timeout={1500} unmountOnExit appear classNames="TabsAnimation">
                        <div>
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
                                                                FilterInfluencers.map((value, index) => {
                                                                    return (
                                                                        <tr>
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
                                                                FilterInfluencers.map((value, index) => {
                                                                    return (
                                                                        <tr>
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
                                                                FilterInfluencers.map((value, index) => {
                                                                    return (
                                                                        <tr>
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
                            <Row>
                                <Col md="12">
                                    <Card className="main-card mb-3">
                                        <CardBody>
                                            <Row>
                                                <Col md="12">
                                                    <Row>
                                                        <Col md="2">

                                                            <div onClick={() => this.onCheckboxBtnClick('Food', '')}>
                                                                <img src={food} style={{ width: '100%', borderStyle: !cSelectedLocal.includes('Food') ? 'none' : 'solid', borderColor: '#764ba2', borderWidth: 'thick' }}></img>
                                                                <p className="text-center"><Trans>Food</Trans></p>
                                                            </div>
                                                        </Col>
                                                        <Col md="2">
                                                            <div onClick={() => this.onCheckboxBtnClick('Cosmetics', '')}>
                                                                <img src={cosmetics} style={{ width: '100%', borderStyle: !cSelectedLocal.includes('Cosmetics') ? 'none' : 'solid', borderColor: '#764ba2', borderWidth: 'thick' }}></img>
                                                                <p className="text-center"><Trans>Cosmetics</Trans></p>
                                                            </div>
                                                        </Col>
                                                        <Col md="2">
                                                            <div onClick={() => this.onCheckboxBtnClick('Fashion', '')}>
                                                                <img src={fashion} style={{ width: '100%', borderStyle: !cSelectedLocal.includes('Fashion') ? 'none' : 'solid', borderColor: '#764ba2', borderWidth: 'thick' }}></img>
                                                                <p className="text-center"><Trans>Fashion</Trans></p>
                                                            </div>
                                                        </Col>
                                                        <Col md="2">
                                                            <div onClick={() => this.onCheckboxBtnClick('Sport', '')}>
                                                                <img src={sport} style={{ width: '100%', borderStyle: !cSelectedLocal.includes('Sport') ? 'none' : 'solid', borderColor: '#764ba2', borderWidth: 'thick' }}></img>
                                                                <p className="text-center"><Trans>Sport</Trans></p>
                                                            </div>
                                                        </Col>
                                                        <Col md="2">
                                                            <div onClick={() => this.onCheckboxBtnClick('Travel', '')}>
                                                                <img src={travel} style={{ width: '100%', borderStyle: !cSelectedLocal.includes('Travel') ? 'none' : 'solid', borderColor: '#764ba2', borderWidth: 'thick' }}></img>
                                                                <p className="text-center"><Trans>Travel</Trans></p>
                                                            </div>
                                                        </Col>
                                                        <Col md="2">
                                                            <div onClick={() => this.onCheckboxBtnClick('Event', 'Entertaining')}>
                                                                <img src={event} style={{ width: '100%', borderStyle: !cSelectedLocal.includes('Event') ? 'none' : 'solid', borderColor: '#764ba2', borderWidth: 'thick' }}></img>
                                                                <p className="text-center"><Trans>Events-Entertaining</Trans></p>
                                                            </div>
                                                        </Col>
                                                        <Col md="2">
                                                            <div onClick={() => this.onCheckboxBtnClick('HouseWife', '')}>
                                                                <img src={housewife} style={{ width: '100%', borderStyle: !cSelectedLocal.includes('HouseWife') ? 'none' : 'solid', borderColor: '#764ba2', borderWidth: 'thick' }}></img>
                                                                <p className="text-center"><Trans>HouseWife</Trans></p>
                                                            </div>
                                                        </Col>
                                                        <Col md="2">
                                                            <div onClick={() => this.onCheckboxBtnClick('Technology', '')}>
                                                                <img src={tech} style={{ width: '100%', borderStyle: !cSelectedLocal.includes('Technology') ? 'none' : 'solid', borderColor: '#764ba2', borderWidth: 'thick' }}></img>
                                                                <p className="text-center"><Trans>Technology</Trans></p>
                                                            </div>
                                                        </Col>
                                                        <Col md="2">
                                                            <div onClick={() => this.onCheckboxBtnClick('Appliances', '')}>
                                                                <img src={appliance} style={{ width: '100%', borderStyle: !cSelectedLocal.includes('Appliances') ? 'none' : 'solid', borderColor: '#764ba2', borderWidth: 'thick' }}></img>
                                                                <p className="text-center"><Trans>Appliances</Trans></p>
                                                            </div>
                                                        </Col>
                                                        <Col md="2">
                                                            <div onClick={() => this.onCheckboxBtnClick('RealEstate', '')}>
                                                                <img src={realestate} style={{ width: '100%', borderStyle: !cSelectedLocal.includes('RealEstate') ? 'none' : 'solid', borderColor: '#764ba2', borderWidth: 'thick' }}></img>
                                                                <p className="text-center"><Trans>Real Estate</Trans></p>
                                                            </div>
                                                        </Col>
                                                        <Col md="2">
                                                            <div onClick={() => this.onCheckboxBtnClick('Furniture', '')}>
                                                                <img src={fur} style={{ width: '100%', borderStyle: !cSelectedLocal.includes('Furniture') ? 'none' : 'solid', borderColor: '#764ba2', borderWidth: 'thick' }}></img>
                                                                <p className="text-center"><Trans>Furniture</Trans></p>
                                                            </div>
                                                        </Col>
                                                        <Col md="2">
                                                            <div onClick={() => this.onCheckboxBtnClick('Auto', 'Game')}>
                                                                <img src={game} style={{ width: '100%', borderStyle: !cSelectedLocal.includes('Game') ? 'none' : 'solid', borderColor: '#764ba2', borderWidth: 'thick' }}></img>
                                                                <p className="text-center"><Trans>Auto-Games</Trans></p>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </CSSTransition>
                </TransitionGroup>
                <Tabs onChange={this.onChangeTab} selectedTabKey={ActiveTab} tabsWrapperClass="body-tabs body-tabs-layout" transform={false} showInkBar={true} items={getTabs()} />
                <ScrollUpButton />
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    const { influencers, locations, jobs, brands } = state;
    return {
        //loggingIn,
        brands,
        jobs,
        locations,
        influencers
    };
}

const connectedWidgetsChartBoxes = connect(mapStateToProps)(WidgetsChartBoxes);
export { connectedWidgetsChartBoxes as WidgetsChartBoxes };