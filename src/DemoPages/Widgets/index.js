import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
// Dashboard Widgets
import { infActions } from '../../_actions';
import { WidgetsChartBoxes } from "./ChartBoxes/";

// Layout
import { AppHeader } from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar/';
import AppFooter from '../../Layout/AppFooter/';
import { CampaignsTable } from './Campaigns';

class Widgets extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchValue: '',
            first: 9,
            selectedTabKey: 0,
            language: 'vn'
        };

        this.sendData = this.sendData.bind(this);
        this.sendTabData = this.sendTabData.bind(this);
    }

    sendData = (childData) => {
        const { dispatch } = this.props;
        this.setState({ selectedTabKey: 0, searchValue: childData })

        if (childData && childData !== '') {
            let items = [];

            items.push(childData);

            dispatch(infActions.getInfluencersByCategory([], this.state.first, 0, items));
        }
        else {
            this.props.dispatch(infActions.getInfluencersByName(this.state.first, 0, ""));
        }
    }

    sendTabData = (activeTab) => {
        this.setState({ selectedTabKey: activeTab })
    }

    componentDidMount() {
        const { i18n } = this.props;
        i18n.i18n.changeLanguage(localStorage.getItem('language'));
        //this.setState({ language: i18n.i18n.language })
    }

    render() {
        const { searchValue, selectedTabKey } = this.state;
        const { influencers } = this.props;
        const influencerItems = (influencers && influencers.items) ? influencers.items : [];

        return (<Fragment>
            <AppHeader parentSearchCallback={this.sendData} />
            <div className="app-main">
                <AppSidebar />
                <div className="app-main__outer">
                    <div className="app-main__inner">

                        {/* Widgets */}

                        <Route path={`${this.props.match.url}/dashboard-boxes`}
                            render={(routeProps) => (
                                <WidgetsChartBoxes parentTabCallback={this.sendTabData} ActiveTab={selectedTabKey} FilterInfluencers={influencerItems} SearchValue={searchValue} {...this.props} />
                            )} />
                        <Route path={`${this.props.match.url}/campaigns-table`}
                            render={(routeProps) => (
                                <CampaignsTable {...this.props} />
                            )} />
                    </div>
                </div>
            </div>
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

const ConnectedWidgets = connect(mapStateToProps)(Widgets);
export default ConnectedWidgets;

//export default Widgets;