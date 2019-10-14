import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { campaignActions } from '../../../_actions';
import "@devexpress/dx-react-grid";
import {
    Grid,
    Table,
    TableHeaderRow
} from "@devexpress/dx-react-grid-material-ui";

import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';

import {
    Button, Form,
    FormGroup, Label,
    Row, Col,
    Card, CardBody,
    CardTitle,
} from 'reactstrap';

export default class CampaignsTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            compaignList: [],
            columns: [
                { name: "campaignName", title: "Name" },
                { name: "budget", title: "Budget" },
                { name: "campaignTarget", title: "Target" },
                { name: "description", title: "Description" },
                { name: "fromAge", title: "From Age" },
                { name: "toAge", title: "To Age" },
                { name: "fromDate", title: "From Date" },
                { name: "toDate", title: "To Date" },
                { name: "hashTag", title: "HashTag" },
                { name: "gender", title: "Gender" },
                { name: "jobName", title: "JobName" },
                { name: "keyword", title: "Keyword" },
                { name: "link", title: "Link" },
                { name: "influencer", title: "Influencer" },
            ],
        };

    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(campaignActions.getAll());
    }

    render() {

        const { dispatch, campaign } = this.props;

        

        debugger;

        return (
            <Fragment>
                <TransitionGroup component="div">
                    <CSSTransition timeout={1500} unmountOnExit appear classNames="TabsAnimation">
                        <Row className="text-center">
                            <Col md="12">
                                <Card className="main-card mb-3">
                                    <CardBody>
                                        <CardTitle>
                                            Bootstrap 4 Modals
                                    </CardTitle>
                                        <Grid rows={campaign} columns={columns}>
                                            <Table />
                                            <TableHeaderRow />
                                        </Grid>
                                        <div className="divider" />
                                    </CardBody>
                                </Card>
                            </Col>

                        </Row></CSSTransition>
                </TransitionGroup>
            </Fragment>
        );
    }
}

function mapStateToProps(state) {

    const { campaign } = state.campaign;
    //const { brand } = influencers;
    return {
        campaign,
    };
}

const connectedCampaignsTable = connect(mapStateToProps)(CampaignsTable);
export { connectedCampaignsTable as CampaignsTable };