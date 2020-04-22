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
import { createLocations } from '../../_models/CommonModels';

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
        const selectedName = JSON.parse(localStorage.getItem('selectedName'));
        const searchItems = JSON.parse(localStorage.getItem('searchItems'));
        let items = [];

        if (selectedName && searchItems) {
            const index = searchItems.indexOf(selectedName);

            if (index > -1) {
                searchItems.splice(index, 1);
            }
        }

        if (childData && childData !== '') {

            if (searchItems && searchItems.length > 0) {

                const index = searchItems.indexOf(childData);

                if (index > -1) {
                    searchItems.splice(index, 1);
                }

                items = searchItems;
            }

            items.push(childData);

            localStorage.setItem('selectedName', JSON.stringify(childData));
            localStorage.setItem('searchItems', JSON.stringify(items));
            const selectedLocations = JSON.parse(localStorage.getItem('selectedLocations'));
            dispatch(infActions.getInfluencersByCategory([], this.state.first, 0, items, selectedLocations));
        }
        else {
            localStorage.setItem('selectedName', JSON.stringify(null));
            localStorage.setItem('searchItems', JSON.stringify(items));
            const selectedLocations = JSON.parse(localStorage.getItem('selectedLocations'));
            dispatch(infActions.getInfluencersByCategory([], this.state.first, 0, searchItems, selectedLocations));
            //this.props.dispatch(infActions.getInfluencersByName(this.state.first, 0, ""));
        }
    }

    sendSearchLocationData = (Locations) => {
        const { dispatch } = this.props;

        const selectedLocations = JSON.parse(localStorage.getItem('selectedLocations'));
        const allValueOfSearch = Locations;
        const searchItems = JSON.parse(localStorage.getItem('searchItems'));
        localStorage.setItem('selectedLocations', JSON.stringify(allValueOfSearch));
        if (searchItems && searchItems.length > 0) {
            // remove duplicated value from localstorage of SearchItems
            for (let i = 0; i < Locations.length; i++) {

                const element = Locations[i];
                const index = searchItems.indexOf(element);

                if (index > -1) {
                    searchItems.splice(index, 1);
                }
            }

            if (selectedLocations && selectedLocations.length > 0) {

                for (let j = 0; j < selectedLocations.length; j++) {

                    const element = selectedLocations[j];
                    const index = searchItems.indexOf(element);

                    if (index > -1) {
                        searchItems.splice(index, 1);
                    }
                }
            }

            Array.prototype.push.apply(allValueOfSearch, searchItems);
        }

        
        localStorage.setItem('searchItems', JSON.stringify(allValueOfSearch));
        debugger;
        dispatch(infActions.getInfluencersByCategory([], this.state.first, 0, allValueOfSearch, Locations));
    }

    sendSearchGenderData = (Gender) => {
        const { dispatch } = this.props;
        debugger;
        const gender = ["Male", 'Nữ', "AllGender"];

        let items = [];

        const searchItems = JSON.parse(localStorage.getItem('searchItems'));
        const selectedLocations = JSON.parse(localStorage.getItem('selectedLocations'));
        if (searchItems && searchItems.length > 0) {

            // Clear all value of gender before search
            for (let i = 0; i < gender.length; i++) {

                const element = gender[i];
                const index = searchItems.indexOf(element);

                if (index > -1) {
                    searchItems.splice(index, 1);
                }
            }

            items = searchItems;
        }

        if (Gender && Gender !== '' && Gender !== 'AllGender') {
            items.push(Gender);
        }

        localStorage.setItem('searchItems', JSON.stringify(items));
        dispatch(infActions.getInfluencersByCategory([], this.state.first, 0, items, selectedLocations));
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
        const { searchValue, selectedTabKey } = this.state;
        const { influencers, relativeInfluencer } = this.props;
        const influencerItems = (influencers && influencers.items) ? influencers.items : [];
        debugger;
        return (<Fragment>
            <AppHeader parentSearchCallback={this.sendData} parentSearchLocationCallback={this.sendSearchLocationData} parentSearchGenderCallback={this.sendSearchGenderData} />
            <div className="app-main">
                <AppSidebar />
                <div className="app-main__outer">
                    <div className="app-main__inner">

                        {/* Widgets */}

                        <Route path={`${this.props.match.url}/dashboard-boxes`}
                            render={(routeProps) => (
                                <WidgetsChartBoxes parentTabCallback={this.sendTabData} ActiveTab={selectedTabKey} FiterRelativeInfluencer={relativeInfluencer} FilterInfluencers={influencerItems} SearchValue={searchValue} {...this.props} />
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
    const { campaigns, influencers, brands, relativeInfluencer } = state;
    //const { brand } = influencers;
    return {
        //loggingIn,
        brands,
        campaigns,
        influencers,
        relativeInfluencer
    };
}

const ConnectedWidgets = connect(mapStateToProps)(Widgets);
export default ConnectedWidgets;

//export default Widgets;