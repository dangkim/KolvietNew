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
    Modal, ModalHeader, ModalBody, ModalFooter, Button, Row, Col
} from 'reactstrap';
import { VerticleButton as ScrollUpButton } from "react-scroll-up-button";
import { Prompt } from 'react-router'

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
                content: <InfluencerDetail />
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
                <PageTitleCategory
                    heading="Chart Boxes"
                    subheading="These boxes can be used to show numbers and data in a breautiful user friendly way."
                    icon="pe-7s-star icon-gradient bg-ripe-malin"
                />
                <Tabs selectedTabKey={this.state.selectedTabKey} tabsWrapperClass="body-tabs body-tabs-layout" transform={false} showInkBar={true} items={getTabs()} />
                <ScrollUpButton />
            </Fragment>
        );
    }
}