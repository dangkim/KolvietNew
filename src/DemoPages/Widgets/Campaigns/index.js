import React, { useState, Fragment } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { campaignActions } from '../../../_actions';
import { DataTypeProvider } from '@devexpress/dx-react-grid';
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
            statusColumns: ['statusOfCampaign']
        };

        this.statusTypeProvider = this.statusTypeProvider.bind(this);
        this.statusFormatter = this.statusFormatter.bind(this);

    }

    componentDidMount() {
        const { dispatch } = this.props;
        const brandName = localStorage.getItem("brandName");
        if (brandName === 'admin') {
            dispatch(campaignActions.getAll());
        }
        else {
            dispatch(campaignActions.getCampaignByBrand(brandName));
        }
    }

    statusFormatter = ({ value }) => {
        var color = 'red';
        if (value === 'Started') {
            color = 'blue';
        } else if (value === 'Done') {
            color = 'green';
        }
        return (
            <b style={{ color: color }}>
                {value}
            </b>
        );
    }

    statusTypeProvider = props => (
        <DataTypeProvider
            formatterComponent={this.statusFormatter}
            {...props}
        />
    );

    render() {
        const { statusColumns } = this.state;
        const { campaign, i18n } = this.props;
        debugger;
        var rows = []
        const columns = [
            { name: "campaignName", title: this.props.i18n.i18n.t('CampaignNameTable') },
            { name: "budget", title: this.props.i18n.i18n.t('BudgetTable') },
            { name: "campaignTarget", title: this.props.i18n.i18n.t('TargetTable') },
            { name: "description", title: this.props.i18n.i18n.t('Description') },
            { name: "fromAge", title: this.props.i18n.i18n.t('From Age') },
            { name: "toAge", title: this.props.i18n.i18n.t('ToAgeTable') },
            { name: "fromDate", title: this.props.i18n.i18n.t('From Date') },
            { name: "toDate", title: this.props.i18n.i18n.t('To Date') },
            // { name: "hashTag", title: "HashTag" },
            //{ name: "gender", title: "Gender" },
            //{ name: "jobName", title: "JobName" },
            // { name: "keyword", title: "Keyword" },
            // { name: "link", title: "Link" },
            { name: "influencerFullName", title: "Influencer" },
            { name: "statusOfCampaign", title: this.props.i18n.i18n.t('StatusTable') },
        ];

        const tableColumnExtensions = [
            { columnName: "campaignName", align: 'left', wordWrapEnabled: true },
            { columnName: "budget", align: 'left', width: 90, wordWrapEnabled: true },
            { columnName: "campaignTarget", align: 'left', wordWrapEnabled: true },
            { columnName: "description", align: 'left', wordWrapEnabled: true },
            { columnName: "fromAge", align: 'left', width: 80, wordWrapEnabled: true },
            { columnName: "toAge", align: 'left', width: 70, wordWrapEnabled: true },
            { columnName: "fromDate", align: 'left', width: 95, wordWrapEnabled: true },
            { columnName: "toDate", align: 'left', width: 95, wordWrapEnabled: true },
            // { columnName: "hashTag", align: 'left', wordWrapEnabled: true },            
            //{ columnName: "jobName", align: 'left', width: 90, wordWrapEnabled: true },
            // { columnName: "keyword", align: 'left', wordWrapEnabled: true },
            // { columnName: "link", align: 'left', wordWrapEnabled: true },
            { columnName: "influencerFullName", align: 'left', wordWrapEnabled: true },
            { columnName: "statusOfCampaign", align: 'left', width: 75, wordWrapEnabled: true }
        ]

        if (campaign) {
            rows = campaign.map((item, index) => {
                var genderValue = 'Nữ'
                if (item.gender === 3) {
                    genderValue = "Mọi giới"
                } else if (item.gender === 1) {
                    genderValue = 'Nam'
                }

                var statusOfCampaign = 'Pending'
                if (item.statusOfCampaign === 3) {
                    genderValue = "Done"
                } else if (item.gender === 1) {
                    genderValue = 'Started'
                }

                return Object.assign(item, {
                    campaignName: item.campaignName,
                    budget: item.budget,
                    campaignTarget: item.campaignTarget,
                    description: item.description,
                    fromAge: item.fromAge,
                    toAge: item.toAge,
                    fromDate: item.fromDate,
                    toDate: item.toDate,
                    hashTag: item.hashTag,
                    gender: genderValue,
                    jobName: item.jobName,
                    keyword: item.keyword,
                    link: item.link,
                    influencerFullName: item.bag.contentItems[0].fullName,
                    statusOfCampaign: statusOfCampaign
                });
            })
        }

        return (
            <Fragment>
                <TransitionGroup component="div">
                    <CSSTransition timeout={1500} unmountOnExit appear classNames="TabsAnimation">
                        <Row className="text-center">
                            <Col md="12">
                                <Card className="main-card mb-3">
                                    <CardBody>
                                        <CardTitle>
                                            {i18n.i18n.t('All Campaigns')}
                                        </CardTitle>
                                        <Grid rows={rows} columns={columns}>
                                            <this.statusTypeProvider for={statusColumns} />
                                            <Table columnExtensions={tableColumnExtensions} />
                                            <TableHeaderRow />
                                        </Grid>
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