import React, { Fragment } from 'react';

import Tabs from 'react-responsive-tabs';

import PageTitle from '../../../Layout/AppMain/PageTitle';

// Examples
import BasicExample from './Examples/Basic';
import ColorsExample from './Examples/Colors';
import { Influencers } from './Examples/Influencers';
import NavsVertical from '../../Elements/Navs/Examples/NavVertical';

export default class WidgetsChartBoxes extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedTabKey: 0,
            tabsContent: [
                {
                    title: 'Influencers',
                    content: <Influencers parentCallback={this.callbackFunction} />
                },
                {
                    title: 'Vertical Menus',
                    content: <NavsVertical />
                }
            ]
        };

        this.callbackFunction = this.callbackFunction.bind(this);
        this.getTabs = this.getTabs.bind(this);
    }

    getTabs = () => {        
        return (this.state.tabsContent.map((tab, index) => ({
            title: tab.title,
            getContent: () => tab.content,
            key: index,
        })))
    }

    callbackFunction = (childData) => {
        this.setState({ selectedTabKey: childData })
    }
    // onChangeProp = propsName =>
    //     evt => {
    //         this.setState({ [propsName]: evt.target.type === 'checkbox' ? evt.target.checked : +evt.target.value });
    //     };

    render() {
        return (
            <Fragment>
                <PageTitle
                    heading="Chart Boxes"
                    subheading="These boxes can be used to show numbers and data in a breautiful user friendly way."
                    icon="pe-7s-star icon-gradient bg-ripe-malin"
                />
                <Tabs selectedTabKey={this.state.selectedTabKey} tabsWrapperClass="body-tabs body-tabs-layout" transform={false} showInkBar={true} items={this.getTabs()} />
            </Fragment>
        );
    }
}