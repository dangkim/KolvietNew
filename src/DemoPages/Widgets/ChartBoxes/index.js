import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Tabs from 'react-responsive-tabs';

import PageTitleCategory from '../../../Layout/AppMain/PageTitleCategory';
import { history } from '../../../_helpers';
// Examples
import BasicExample from './Examples/Basic';
import { ColorsExample } from './Examples/Colors';
import { Influencers } from './Examples/Influencers';
import { CreateCampaign } from './Examples/CreateCampaign';
import { InfluencerDetail } from './Examples/InfluencerDetail';
import { InfluencerUpdateCost } from './Examples/InfluencerUpdateCost';
import { CompareInfluencers } from './Examples/CompareInfluencers';
import {
    Modal, ModalHeader, ModalBody, ModalFooter, Button, Row, Col, Card, CardBody
} from 'reactstrap';
import ScrollUpButton from "react-scroll-up-button";
import { Prompt } from 'react-router'
import { fab } from '@fortawesome/free-brands-svg-icons'
import {
    faHamburger,
    faMortarPestle,
    faRunning,
    faPlaneDeparture,
    faMicrophoneAlt,
    faStoreAlt,
    faMicrochip,
    faLandmark,
    faCouch,
    faBlender,
    faGamepad,
    faCar,
    faTshirt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

        dispatch(infActions.getInfluencersByCategory([], first, 0, items));
    }

    render() {
        const { cSelected, Influencer, Brand, modalVisible, type, userName, ComparedInfluencers } = this.state;
        const { FilterInfluencers, SearchValue, ActiveTab } = this.props;

        const tabsContentUpdateCost = [
            {
                title: 'Vertical Menus',
                content: <InfluencerUpdateCost userName={userName} />
            }
        ]
        const tabsContent = [
            {
                title: 'Influencers',
                content: <Influencers SearchValue={SearchValue} FilterInfluencers={FilterInfluencers} parentCallback={this.callbackFunction} />
            },
            {
                title: 'Influencer details',
                content: <InfluencerDetail Influencer={Influencer} />
            },
            {
                title: 'Comparison Influencers',
                content: <CompareInfluencers ComparedInfluencers={ComparedInfluencers} />
            },
            {
                title: 'Create Campaign',
                content: <CreateCampaign Brand={Brand} Influencer={Influencer} />
            },
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
                <Prompt when={!type || type !== "Influencer"} message={this.handleBlockedNavigation} />
                <Modal isOpen={modalVisible}>
                    <ModalHeader></ModalHeader>
                    <ModalBody>
                        Are you sure you want to leave?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="link" onClick={() => this.closeModal(() => { })}>Cancel</Button>
                        <Button color="primary" onClick={this.handleConfirmNavigationClick}>Yes</Button>{' '}
                    </ModalFooter>
                </Modal>
                {/* <PageTitleCategory
                    heading="Chart Boxes"
                    subheading="These boxes can be used to show numbers and data in a breautiful user friendly way."
                    icon="pe-7s-star icon-gradient bg-ripe-malin"
                /> */}
                <Row>
                    <Col md="12">
                        <Card className="main-card mb-3">
                            <CardBody>
                                <Row>
                                    <Col md="2">
                                        <div onClick={() => this.onCheckboxBtnClick('Food', '')}>
                                            <img src={food} style={{ width: '100%', borderStyle: !cSelected.includes('Food') ? 'none' : 'solid', borderColor: '#764ba2', borderWidth: 'thick' }}></img>
                                            <p className="text-center">Food</p>
                                        </div>
                                    </Col>
                                    <Col md="2">
                                        <div onClick={() => this.onCheckboxBtnClick('Cosmetics', '')}>
                                            <img src={cosmetics} style={{ width: '100%', borderStyle: !cSelected.includes('Cosmetics') ? 'none' : 'solid', borderColor: '#764ba2', borderWidth: 'thick' }}></img>
                                            <p className="text-center">Cosmetics</p>
                                        </div>
                                    </Col>
                                    <Col md="2">
                                        <div onClick={() => this.onCheckboxBtnClick('Fashion', '')}>
                                            <img src={fashion} style={{ width: '100%', borderStyle: !cSelected.includes('Fashion') ? 'none' : 'solid', borderColor: '#764ba2', borderWidth: 'thick' }}></img>
                                            <p className="text-center">Fashion</p>
                                        </div>
                                    </Col>
                                    <Col md="2">
                                        <div onClick={() => this.onCheckboxBtnClick('Sport', '')}>
                                            <img src={sport} style={{ width: '100%', borderStyle: !cSelected.includes('Sport') ? 'none' : 'solid', borderColor: '#764ba2', borderWidth: 'thick' }}></img>
                                            <p className="text-center">Sport</p>
                                        </div>
                                    </Col>
                                    <Col md="2">
                                        <div onClick={() => this.onCheckboxBtnClick('Travel', '')}>
                                            <img src={travel} style={{ width: '100%', borderStyle: !cSelected.includes('Travel') ? 'none' : 'solid', borderColor: '#764ba2', borderWidth: 'thick' }}></img>
                                            <p className="text-center">Travel</p>
                                        </div>
                                    </Col>
                                    <Col md="2">
                                        <div onClick={() => this.onCheckboxBtnClick('Event', 'Entertaining')}>
                                            <img src={event} style={{ width: '100%', borderStyle: !cSelected.includes('Event') ? 'none' : 'solid', borderColor: '#764ba2', borderWidth: 'thick' }}></img>
                                            <p className="text-center">Events-Entertaining</p>
                                        </div>
                                    </Col>
                                    <Col md="2">
                                        <div onClick={() => this.onCheckboxBtnClick('HouseWife', '')}>
                                            <img src={housewife} style={{ width: '100%', borderStyle: !cSelected.includes('HouseWife') ? 'none' : 'solid', borderColor: '#764ba2', borderWidth: 'thick' }}></img>
                                            <p className="text-center">HouseWife</p>
                                        </div>
                                    </Col>
                                    <Col md="2">
                                        <div onClick={() => this.onCheckboxBtnClick('Technology', '')}>
                                            <img src={tech} style={{ width: '100%', borderStyle: !cSelected.includes('Technology') ? 'none' : 'solid', borderColor: '#764ba2', borderWidth: 'thick' }}></img>
                                            <p className="text-center">Technology</p>
                                        </div>
                                    </Col>
                                    <Col md="2">
                                        <div onClick={() => this.onCheckboxBtnClick('Appliances', '')}>
                                            <img src={appliance} style={{ width: '100%', borderStyle: !cSelected.includes('Appliances') ? 'none' : 'solid', borderColor: '#764ba2', borderWidth: 'thick' }}></img>
                                            <p className="text-center">Appliances</p>
                                        </div>
                                    </Col>
                                    <Col md="2">
                                        {/* <div onClick={() => this.onCheckboxBtnClick('RealEstate', '')}
                                            className={"font-icon-wrapper" + (!cSelected.includes('RealEstate') ? " text-primary" : '')}>
                                            <FontAwesomeIcon icon={faLandmark} size="4x" />
                                            <p>Real Estate</p>
                                        </div> */}
                                        <div onClick={() => this.onCheckboxBtnClick('RealEstate', '')}>
                                            <img src={realestate} style={{ width: '100%', borderStyle: !cSelected.includes('RealEstate') ? 'none' : 'solid', borderColor: '#764ba2', borderWidth: 'thick' }}></img>
                                            <p className="text-center">Real Estate</p>
                                        </div>
                                    </Col>
                                    <Col md="2">
                                        <div onClick={() => this.onCheckboxBtnClick('Furniture', '')}>
                                            <img src={fur} style={{ width: '100%', borderStyle: !cSelected.includes('Furniture') ? 'none' : 'solid', borderColor: '#764ba2', borderWidth: 'thick' }}></img>
                                            <p className="text-center">Furniture</p>
                                        </div>
                                    </Col>
                                    <Col md="2">
                                        <div onClick={() => this.onCheckboxBtnClick('Auto', 'Game')}>
                                            <img src={game} style={{ width: '100%', borderStyle: !cSelected.includes('Game') ? 'none' : 'solid', borderColor: '#764ba2', borderWidth: 'thick' }}></img>
                                            <p className="text-center">Auto-Games</p>
                                        </div>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>

                    </Col>
                </Row>
                <Tabs onChange={this.onChangeTab} selectedTabKey={ActiveTab} tabsWrapperClass="body-tabs body-tabs-layout" transform={false} showInkBar={true} items={getTabs()} />
                <ScrollUpButton />
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

const connectedWidgetsChartBoxes = connect(mapStateToProps)(WidgetsChartBoxes);
export { connectedWidgetsChartBoxes as WidgetsChartBoxes };