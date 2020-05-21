import React, { useState, Fragment } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { campaignActions } from '../../../_actions';
import {
    EditingState
    , DataTypeProvider
    , SelectionState
    , PagingState
    , IntegratedPaging
    , IntegratedSelection
} from '@devexpress/dx-react-grid';
import Loader from 'react-loader-spinner'
import {
    Grid,
    Table,
    TableHeaderRow,
    TableEditColumn,
    TableEditRow,
    TableSelection,
    PagingPanel,
} from '@devexpress/dx-react-grid-material-ui';

import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';

import {
    Button,
    Row, Col,
    Card, CardBody,
    CardTitle,
} from 'reactstrap';

import debounce from 'lodash.debounce';

export default class CampaignsTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            compaignList: [],
            statusColumns: ['statusValue'],
            errors: {},
            selection: [],
            brandName: localStorage.getItem("brandName")
        };

        this.statusTypeProvider = this.statusTypeProvider.bind(this);
        this.statusFormatter = this.statusFormatter.bind(this);
        this.setErrors = this.setErrors.bind(this);
        this.setSelection = this.setSelection.bind(this);
        this.handleSubmitJobs = this.handleSubmitJobs.bind(this);
        this.updateStatus = this.updateStatus.bind(this);
        this.updateStartedStatus = this.updateStartedStatus.bind(this);
        this.updateDoneStatus = this.updateDoneStatus.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    updateStartedStatus() {
        this.updateStatus(2);
    }

    updateDoneStatus() {
        this.updateStatus(3);
    }

    updateStatus(status) {
        const { dispatch, campaign } = this.props;
        const { selection } = this.state;
        const contentItemIds = [];

        selection.forEach(id => {
            contentItemIds.push(campaign[id].contentItemId);
        });

        const campaignStatusLocal = {
            contentItemIds: contentItemIds,
            status: status
        };

        this.setState({ selection: [] });

        dispatch(campaignActions.updateStatus(campaignStatusLocal));
    }

    handleSubmitJobs(campaign) {
        const { dispatch } = this.props;
        const { brandName } = this.state;
        const campaignLocal = {
            budget: campaign.budget,
            campaignName: campaign.campaignName,
            campaignTarget: campaign.campaignTarget,
            contentItemId: campaign.contentItemId,
            description: campaign.description,
            fromAge: campaign.fromAge,
            toAge: campaign.toAge,
            fromDate: campaign.fromDate,
            toDate: campaign.toDate,
            brandName: brandName,
            influencerFullName: campaign.influencerFullName
        };

        dispatch(campaignActions.updateCampaign(campaignLocal));
    }

    handleDelete(campaign) {
        const { dispatch } = this.props;
        const { brandName } = this.state;

        dispatch(campaignActions.deleteCampaign(campaign.contentItemId, brandName));
    }

    componentDidMount() {
        const { dispatch } = this.props;
        const { brandName } = this.state;
        if (brandName === 'admin') {
            dispatch(campaignActions.getAll());
        }
        else {
            dispatch(campaignActions.getCampaignByBrand(brandName));
        }
    }

    setErrors = (errors) => {
        this.setState({ errors: errors });
    };

    setSelection = (selection) => {
        this.setState({ selection: selection });
    };

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
        const { statusColumns, errors, brandName, selection } = this.state;
        const { campaign, i18n, loading } = this.props;

        var rows = []

        const adminColumns = [
            { name: "campaignName", title: this.props.i18n.i18n.t('CampaignNameTable'), required: true },
            { name: "budget", title: this.props.i18n.i18n.t('BudgetTable'), required: true },
            { name: "campaignTarget", title: this.props.i18n.i18n.t('TargetTable'), required: true },
            { name: "description", title: this.props.i18n.i18n.t('Description'), required: true },
            { name: "fromAge", title: this.props.i18n.i18n.t('From Age'), required: true },
            { name: "toAge", title: this.props.i18n.i18n.t('ToAgeTable'), required: true },
            { name: "fromDate", title: this.props.i18n.i18n.t('From Date'), required: true },
            { name: "toDate", title: this.props.i18n.i18n.t('To Date'), required: true },
            { name: "phoneNumber", title: "Phone" },
            { name: "email", title: "Email" },
            { name: "influencerFullName", title: "Influencer" },
            { name: "statusValue", title: this.props.i18n.i18n.t('StatusTable') },
        ];

        const columns = [
            { name: "campaignName", title: this.props.i18n.i18n.t('CampaignNameTable'), required: true },
            { name: "budget", title: this.props.i18n.i18n.t('BudgetTable'), required: true },
            { name: "campaignTarget", title: this.props.i18n.i18n.t('TargetTable'), required: true },
            { name: "description", title: this.props.i18n.i18n.t('Description'), required: true },
            { name: "fromAge", title: this.props.i18n.i18n.t('From Age'), required: true },
            { name: "toAge", title: this.props.i18n.i18n.t('ToAgeTable'), required: true },
            { name: "fromDate", title: this.props.i18n.i18n.t('From Date'), required: true },
            { name: "toDate", title: this.props.i18n.i18n.t('To Date'), required: true },
            // { name: "hashTag", title: "HashTag" },
            //{ name: "gender", title: "Gender" },
            //{ name: "jobName", title: "JobName" },
            // { name: "keyword", title: "Keyword" },
            // { name: "link", title: "Link" },
            { name: "influencerFullName", title: "Influencer" },
            { name: "statusValue", title: this.props.i18n.i18n.t('StatusTable') },
        ];

        const tableAdminColumnExtensions = [
            { columnName: "campaignName", align: 'left', wordWrapEnabled: true },
            { columnName: "budget", align: 'left', width: 90, wordWrapEnabled: true },
            { columnName: "campaignTarget", align: 'left', wordWrapEnabled: true },
            { columnName: "description", align: 'left', wordWrapEnabled: true },
            { columnName: "fromAge", align: 'left', width: 80, wordWrapEnabled: true },
            { columnName: "toAge", align: 'left', width: 70, wordWrapEnabled: true },
            { columnName: "fromDate", align: 'left', width: 100, wordWrapEnabled: true },
            { columnName: "toDate", align: 'left', width: 100, wordWrapEnabled: true },
            { columnName: "phoneNumber", align: 'left', width: 150, wordWrapEnabled: true },
            { columnName: "email", align: 'left', width: 100, wordWrapEnabled: true },
            { columnName: "influencerFullName", align: 'left', wordWrapEnabled: true },
            { columnName: "statusValue", align: 'left', width: 75, wordWrapEnabled: true }
        ]

        const tableColumnExtensions = [
            { columnName: "campaignName", align: 'left', wordWrapEnabled: true },
            { columnName: "budget", align: 'left', width: 90, wordWrapEnabled: true },
            { columnName: "campaignTarget", align: 'left', wordWrapEnabled: true },
            { columnName: "description", align: 'left', wordWrapEnabled: true },
            { columnName: "fromAge", align: 'left', width: 80, wordWrapEnabled: true },
            { columnName: "toAge", align: 'left', width: 70, wordWrapEnabled: true },
            { columnName: "fromDate", align: 'left', width: 100, wordWrapEnabled: true },
            { columnName: "toDate", align: 'left', width: 100, wordWrapEnabled: true },
            // { columnName: "hashTag", align: 'left', wordWrapEnabled: true },            
            //{ columnName: "jobName", align: 'left', width: 90, wordWrapEnabled: true },
            // { columnName: "keyword", align: 'left', wordWrapEnabled: true },
            // { columnName: "link", align: 'left', wordWrapEnabled: true },
            { columnName: "influencerFullName", align: 'left', wordWrapEnabled: true },
            { columnName: "statusValue", align: 'left', width: 75, wordWrapEnabled: true }
        ]

        const editingStateColumnExtensions = [
            { columnName: 'influencerFullName', editingEnabled: false },
            { columnName: 'statusOfCampaign', editingEnabled: false },
            { columnName: 'fromDate', editingEnabled: false },
            { columnName: 'toDate', editingEnabled: false },
        ]

        if (campaign) {
            rows = campaign.map((item, index) => {
                var genderValue = 'Nữ'
                if (item.gender === 3) {
                    genderValue = "Mọi giới"
                } else if (item.gender === 1) {
                    genderValue = 'Nam'
                }
                debugger;
                var statusOfCampaign = 'Pending'
                if (item.statusOfCampaign === 3) {
                    statusOfCampaign = "Done"
                } else if (item.statusOfCampaign === 2) {
                    statusOfCampaign = 'Started'
                }

                return Object.assign(item, {
                    id: index,
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
                    statusValue: statusOfCampaign
                });
            })
        }

        const EditCell = ({ errors, ...props }) => {
            const { children } = props;
            return (
                <TableEditColumn.Cell {...props}>
                    {React.Children.map(children, child =>
                        child && child.props.id === "commit"
                            ? React.cloneElement(child, {
                                disabled: errors[props.tableRow.rowId]
                            })
                            : child
                    )}
                </TableEditColumn.Cell>
            );
        };

        // Maps the rows to a single object in which each field are is a row IDs
        // and the field's value is true if the cell value is invalid (a column is required
        // but the cell value is empty)
        const validate = ((rows, columns) => {
            return (
                Object.entries(rows).reduce(
                    (acc, [rowId, row]) => ({
                        ...acc,
                        [rowId]: columns.some(column => column.required && row[column.name] === ''),
                    }), {},
                ))
        });

        const commitChanges = ({ changed, deleted }) => {
            let changedRow;

            if (changed) {
                //const changedSet = new Set(changed);
                //changedRow = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
                const changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
                changedRow = changedRows.filter(row => !row.id);
                if (changedRow && changedRow.length > 0) {
                    this.handleSubmitJobs(changedRow[0]);
                }

            }

            if (deleted) {
                const deletedSet = new Set(deleted);
                changedRow = rows.filter(row => deletedSet.has(row.id));

                if (changedRow && changedRow.length > 0) {
                    this.handleDelete(changedRow[0]);
                }
            }



            //setRows(changedRows);
        };

        const onEdited = debounce(edited => this.setErrors(validate(edited, columns)), 250);

        return (
            <Fragment>
                <TransitionGroup component="div">
                    <CSSTransition timeout={1500} unmountOnExit appear classNames="TabsAnimation">
                        <div>
                            <Row className="text-center">
                                <Col md="12">
                                    <Card className="main-card mb-3">
                                        <CardBody>
                                            <CardTitle>
                                                {i18n.i18n.t('All Campaigns')}
                                            </CardTitle>
                                            <Grid rows={rows} columns={brandName !== 'admin' ? columns : adminColumns}>
                                                {
                                                    brandName !== 'admin' && <EditingState
                                                        onRowChangesChange={onEdited}
                                                        onCommitChanges={commitChanges}
                                                        columnExtensions={editingStateColumnExtensions}
                                                    />
                                                }
                                                <this.statusTypeProvider for={statusColumns} />
                                                {brandName === 'admin' && <PagingState defaultCurrentPage={0} pageSize={6} />}
                                                {brandName === 'admin' && <SelectionState selection={selection} onSelectionChange={this.setSelection} />}
                                                {brandName === 'admin' && <IntegratedPaging />}
                                                {brandName === 'admin' && <IntegratedSelection />}
                                                <Table columnExtensions={brandName !== 'admin' ? tableColumnExtensions : tableAdminColumnExtensions} />
                                                <TableHeaderRow />
                                                {
                                                    brandName !== 'admin' &&
                                                    <TableEditColumn
                                                        showEditCommand={true}
                                                        showDeleteCommand={true}
                                                        cellComponent={props => <EditCell {...props} errors={errors} />}
                                                    />
                                                }
                                                {brandName === 'admin' && <PagingPanel />}
                                                {brandName !== 'admin' && <TableEditRow />}
                                                {brandName === 'admin' && <TableSelection selectByRowClick />}
                                            </Grid>
                                            {
                                                loading &&
                                                <div className="loader-container" style={{ width: '85%', height: '85%' }}>
                                                    <div className="loader-container-inner">
                                                        <Loader
                                                            type="CradleLoader"
                                                            color="#00BFFF"
                                                        />
                                                    </div>
                                                </div>
                                            }

                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                            <Row className="text-center">
                                <Col md="5">
                                </Col>
                                <Col md="1">
                                    <Button onClick={this.updateStartedStatus} color="primary" className="mt-2">Start</Button>
                                </Col>
                                <Col md="1">
                                    <Button onClick={this.updateDoneStatus} color="primary" className="mt-2">Done</Button>
                                </Col>
                                <Col md="5">
                                </Col>
                            </Row>
                        </div>
                    </CSSTransition>
                </TransitionGroup>
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    const { campaign, loading } = state.campaign;
    //const { loading } = campaign.loading;
    return {
        campaign,
        loading
    };
}

const connectedCampaignsTable = connect(mapStateToProps)(CampaignsTable);
export { connectedCampaignsTable as CampaignsTable };