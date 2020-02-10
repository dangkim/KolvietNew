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
import ManageBrand from './Brand';

class Widgets extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchValue: '',
            first: 9,
            selectedTabKey: 0,
            language: 'vn',
            brand: null,
            isClear: false
        };

        this.sendData = this.sendData.bind(this);
        this.sendTabData = this.sendTabData.bind(this);
        this.sendBrandManageData = this.sendBrandManageData.bind(this);
    }

    sendData = (childData) => {
        const { dispatch } = this.props;
        debugger;
        this.setState({ selectedTabKey: 0, searchValue: childData, isClear: true })

        if (childData && childData !== '') {
            let items = [];
            items.push(childData);
            dispatch(infActions.getInfluencersByCategory([], this.state.first, 0, items, true));
        }
        else {
            this.props.dispatch(infActions.getInfluencersByName(this.state.first, 0, ""));
        }
    }

    sendTabData = (activeTab) => {
        this.setState({ selectedTabKey: activeTab })
    }

    sendBrandManageData = (brand) => {
        this.setState({ brand: brand })
    }

    componentDidMount() {
        const { i18n } = this.props;
        const language = localStorage.getItem('language');
        i18n.i18n.changeLanguage(language);
        this.setState({ language: language })
    }

    render() {
        const { searchValue, selectedTabKey, isClear, brand } = this.state;
        const { influencers, topEngagement } = this.props;
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
                        <Route path={`${this.props.match.url}/manage-brand`}
                            render={(routeProps) => (
                                <ManageBrand {...this.props} />
                            )} />
                    </div>
                </div>
            </div>
        </Fragment>
        );
    }
}

function mapStateToProps(state) {
    const { campaigns, influencers, brands } = state;
    //const { brand } = influencers;
    return {
        //loggingIn,
        brands,
        campaigns,
        influencers
    };
}

const ConnectedWidgets = connect(mapStateToProps)(Widgets);
export default ConnectedWidgets;

//export default Widgets;