import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
// Dashboard Widgets

import { WidgetsChartBoxes } from "./ChartBoxes/";

// Layout
import { AppHeader } from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar/';
import AppFooter from '../../Layout/AppFooter/';

class Widgets extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchValue: '',
        };

        this.sendData = this.sendData.bind(this);
    }

    sendData = (childData) => {
        debugger;
        if (childData && childData !== '') {
            this.setState({ searchValue: childData })
        }
    }

    render() {
        const {searchValue} = this.state;

        return (<Fragment>
            <AppHeader parentCallback={this.sendData} />
            <div className="app-main">
                <AppSidebar />
                <div className="app-main__outer">
                    <div className="app-main__inner">

                        {/* Widgets */}

                        <Route path={`${this.props.match.url}/dashboard-boxes`}
                            render={(routeProps) => (
                                <WidgetsChartBoxes SearchValue={searchValue} {...this.props}/>
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

const connectedWidgets = connect(mapStateToProps)(Widgets);
export default connectedWidgets ;

//export default Widgets;