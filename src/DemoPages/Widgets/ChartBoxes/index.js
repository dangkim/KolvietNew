import React, { Fragment } from 'react';

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
import NavsVertical from '../../Elements/Navs/Examples/NavVertical';
import {
    Modal, ModalHeader, ModalBody, ModalFooter, Button, Row, Col, Card, CardBody
} from 'reactstrap';
import { VerticleButton as ScrollUpButton } from "react-scroll-up-button";
import { Prompt } from 'react-router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import {
    faCoffee,
    faMusic,
    faHamburger,
    faMortarPestle,
    faCog,
    faRunning,
    faPlaneDeparture,
    faMicrophoneAlt,
    faStoreAlt,
    faGuitar,
    faCompactDisc,
    faMicrochip,
    faSpinner,
    faQuoteLeft,
    faSquare,
    faCheckSquare,
    faAngleLeft,
    faAngleRight,
    faAngleUp,
    faAngry,
    faAnkh,
    faAppleAlt,
    faArchive,
    faCalendarAlt,
    faArchway,
    faArrowAltCircleDown,
    faArrowAltCircleLeft,
    faArrowAltCircleRight,
    faArrowAltCircleUp,
    faArrowCircleDown,
    faArrowCircleLeft,
    faArrowCircleRight,
    faArrowCircleUp,
    faArrowDown,
    faArrowLeft,
    faMemory,
    faLandmark,
    faCouch,
    faBlenderPhone,
    faBlender,
    faGamepad,
    faCar,
    faTshirt,

} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
library.add(
    fab,
    faCoffee,
    faHamburger,
    faMusic,
    faMortarPestle,
    faRunning,
    faPlaneDeparture,
    faMicrophoneAlt,
    faStoreAlt,
    faGuitar,
    faCompactDisc,
    faMicrochip,
    faCog,
    faSpinner,
    faQuoteLeft,
    faSquare,
    faCheckSquare,
    faAngleLeft,
    faCalendarAlt,
    faAngleRight,
    faAngleUp,
    faAngry,
    faAnkh,
    faAppleAlt,
    faArchive,
    faArchway,
    faArrowAltCircleDown,
    faArrowAltCircleLeft,
    faArrowAltCircleRight,
    faArrowAltCircleUp,
    faArrowCircleDown,
    faArrowCircleLeft,
    faArrowCircleRight,
    faArrowCircleUp,
    faArrowDown,
    faArrowLeft,
);

export default class WidgetsChartBoxes extends React.Component {

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
            selectedTabKey: 0,
            Influencer: null,
            ComparedInfluencers: [],
            confirmedNavigation: false,
            modalVisible: false,
            lastLocation: "/widgets/dashboard-boxes",
        };

        this.callbackFunction = this.callbackFunction.bind(this);
        this.handleConfirmNavigationClick = this.handleConfirmNavigationClick.bind(this);
        this.handleBlockedNavigation = this.handleBlockedNavigation.bind(this);
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    callbackFunction = (selectedTabKey, childData, index) => {

        if (index !== null) {
            this.setState({ selectedTabKey: selectedTabKey, Influencer: childData[index] })
        }
        else {
            this.setState({ selectedTabKey: selectedTabKey, ComparedInfluencers: childData })
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

    render() {
        const { Influencer, Brand, modalVisible, type, userName } = this.state;
        const tabsContentUpdateCost = [
            {
                title: 'Vertical Menus',
                content: <InfluencerUpdateCost userName={userName} />
            }
        ]
        const tabsContent = [
            {
                title: 'Influencers',
                content: <Influencers parentCallback={this.callbackFunction} />
            },
            {
                title: 'Influencer details',
                content: <InfluencerDetail  Influencer={Influencer}/>
            },
            {
                title: 'Vertical Menus',
                content: <NavsVertical />
            },
            {
                title: 'Create Campaign',
                content: <CreateCampaign Brand={Brand} Influencer={Influencer} />
            },
        ]

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
                                        <div className="font-icon-wrapper text-primary" style={{cursor:'pointer'}}>
                                            <FontAwesomeIcon icon={faHamburger} size="4x" />
                                            <p>Food</p>
                                        </div>
                                    </Col>
                                    <Col md="2">
                                        <div className="font-icon-wrapper text-success" style={{cursor:'pointer'}}>
                                            <FontAwesomeIcon icon={faMortarPestle} size="4x" />
                                            <p>Cosmetics</p>
                                        </div>
                                    </Col>
                                    <Col md="2">
                                        <div className="font-icon-wrapper text-danger" style={{cursor:'pointer'}}>
                                            <FontAwesomeIcon icon={faTshirt} size="4x" />
                                            <p>Fashion</p>
                                        </div>
                                    </Col>
                                    <Col md="2">
                                        <div className="font-icon-wrapper text-info" style={{cursor:'pointer'}}>
                                            <FontAwesomeIcon icon={faRunning} size="4x" />
                                            <p>Sport</p>
                                        </div>
                                    </Col>
                                    <Col md="2">
                                        <div className="font-icon-wrapper text-warning" style={{cursor:'pointer'}}>
                                            <FontAwesomeIcon icon={faPlaneDeparture} size="4x" />
                                            <p>Travel</p>
                                        </div>
                                    </Col>
                                    <Col md="2">
                                        <div className="font-icon-wrapper text-danger" style={{cursor:'pointer'}}>
                                            <FontAwesomeIcon icon={faMicrophoneAlt} size="4x" />
                                            <p>Events-Entertaining</p>
                                        </div>
                                    </Col>
                                    <Col md="2">
                                        <div className="font-icon-wrapper text-focus" style={{cursor:'pointer'}}>
                                            <FontAwesomeIcon icon={faStoreAlt} size="4x" />
                                            <p>HouseWife</p>
                                        </div>
                                    </Col>
                                    <Col md="2">
                                        <div className="font-icon-wrapper text-info" style={{cursor:'pointer'}}>
                                            <FontAwesomeIcon icon={faMicrochip} size="4x" />
                                            <p>Technology</p>
                                        </div>
                                    </Col>
                                    <Col md="2">
                                        <div className="font-icon-wrapper text-alternate" style={{cursor:'pointer'}}>
                                            <FontAwesomeIcon icon={faBlender} size="4x" />
                                            <p>Appliances</p>
                                        </div>
                                    </Col>
                                    <Col md="2">
                                        <div className="font-icon-wrapper text-primary" style={{cursor:'pointer'}}>
                                            <FontAwesomeIcon icon={faLandmark} size="4x" />
                                            <p>Real Estate</p>
                                        </div>
                                    </Col>
                                    <Col md="2">
                                        <div className="font-icon-wrapper text-secondary" style={{cursor:'pointer'}}>
                                            <FontAwesomeIcon icon={faCouch} size="4x" />
                                            <p>Furniture</p>
                                        </div>
                                    </Col>
                                    <Col md="2">
                                        <div className="font-icon-wrapper text-success" style={{cursor:'pointer'}}>                                            
                                            <FontAwesomeIcon icon={faCar} size="4x" />
                                            <FontAwesomeIcon icon={faGamepad} size="3x" />
                                            <p>Auto-Games</p>
                                        </div>

                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>

                    </Col>
                </Row>
                <Tabs selectedTabKey={this.state.selectedTabKey} tabsWrapperClass="body-tabs body-tabs-layout" transform={false} showInkBar={true} items={getTabs()} />
                <ScrollUpButton />
            </Fragment>
        );
    }
}