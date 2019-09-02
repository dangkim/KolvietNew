import React, { Fragment } from 'react';

import Tabs from 'react-responsive-tabs';

import PageTitle from '../../../Layout/AppMain/PageTitle';

// Examples
import BasicExample from './Examples/Basic';
import { ColorsExample } from './Examples/Colors';
import { Influencers } from './Examples/Influencers';
import { CreateCampaign } from './Examples/CreateCampaign';
import { InfluencerDetail } from './Examples/InfluencerDetail';
import NavsVertical from '../../Elements/Navs/Examples/NavVertical';

export default class WidgetsChartBoxes extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            Brand: this.props.location.state ? this.props.location.state.Brand : null,
            UserName: '',
            selectedTabKey: 0,
            Influencer: null,
            ComparedInfluencers: [],
        };

        this.callbackFunction = this.callbackFunction.bind(this);
    }

    callbackFunction = (childData) => {
        if (childData && childData.contentType === 'Influencer') {
            this.setState({ selectedTabKey: 3, Influencer: childData })
        }
    }
    // onChangeProp = propsName =>
    //     evt => {
    //         this.setState({ [propsName]: evt.target.type === 'checkbox' ? evt.target.checked : +evt.target.value });
    //     };

    render() {
        
        const { Influencer, Brand, Campaign } = this.state;
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
                content: <CreateCampaign Brand={Brand} Influencer={Influencer}/>
            }
        ]

        const getTabs = () => {
            return (tabsContent.map((tab, index) => ({
                title: tab.title,
                getContent: () => tab.content,
                key: index,
            })))
        }

        return (
            <Fragment>
                <PageTitle
                    heading="Chart Boxes"
                    subheading="These boxes can be used to show numbers and data in a breautiful user friendly way."
                    icon="pe-7s-star icon-gradient bg-ripe-malin"
                />
                <Tabs selectedTabKey={this.state.selectedTabKey} tabsWrapperClass="body-tabs body-tabs-layout" transform={false} showInkBar={true} items={getTabs()} />
            </Fragment>
        );
    }
}