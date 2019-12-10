import React, { useState, Fragment } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { brandActions } from '../../../_actions';
import { createLocations } from '../../../_models/CommonModels';
import NumberFormat from 'react-number-format';
import Select from 'react-select';
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

export default class ManageBrand extends React.Component {

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

        dispatch(brandActions.getBrandByNameToManage(brandName));
    }
    render() {
        const { brands } = this.props;
        const { brand, selectedOptionLocation, submitted } = this.state;
        const options = createLocations();
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };

        return (
            <Fragment>
                <TransitionGroup component="div">
                    <CSSTransition timeout={1500} unmountOnExit appear classNames="TabsAnimation">
                        <Card className="main-card mb-3">
                            <CardBody>
                                <CardTitle>
                                    {
                                        Influencer ?
                                            <span className="text-success"><Trans>Great! You have chosen</Trans> {Influencer.fullName}</span>
                                            : <span><Trans>Please choose an Influencer to create your Campaign</Trans></span>
                                    }
                                </CardTitle>
                                <Form id="register-form">
                                    <FormGroup>
                                        <Label for="campaignName">
                                            <span className="text-danger">*</span> <Trans>Campaign Name</Trans>
                                        </Label>
                                        <Input disabled={Influencer === null} type="text" name="campaignName" id="campaignName" value={campaign.campaignName} onChange={this.handleCampaignChange} />
                                        {
                                            submitted && !campaign.campaignName &&
                                            <div className="help-block text-danger"><Trans>Campaign Name is required</Trans></div>
                                        }
                                    </FormGroup>
                                    <Row form>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="pass">
                                                    <span className="text-danger">*</span> <Trans>Campaign Target</Trans>
                                                </Label>
                                                <Input disabled={Influencer === null} type="text" name="campaignTarget" id="campaignTarget" value={campaign.campaignTarget} onChange={this.handleCampaignChange} />
                                                {
                                                    submitted && !campaign.campaignTarget &&
                                                    <div className="help-block text-danger"><Trans>Campaign Target is required</Trans></div>
                                                }
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="name">
                                                    <span className="text-danger">*</span> <Trans>Product Info</Trans>
                                                </Label>
                                                <Input disabled={Influencer === null} type="text" name="productInfo" id="productInfo" value={campaign.productInfo} onChange={this.handleCampaignChange} />
                                                {
                                                    submitted && !campaign.productInfo &&
                                                    <div className="help-block text-danger"><Trans>Product Info is required</Trans></div>
                                                }
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row form>
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label for="DateTime" className=""> <span className="text-danger">*</span> <Trans>Date Time</Trans></Label>
                                                <div>
                                                    <Input disabled={Influencer === null} name="dateRange"
                                                        type="text"
                                                        value={'From ' + dateValue.start.format("DD-MM-YYYY") + ' To ' + dateValue.end.format("DD-MM-YYYY")}
                                                        onChange={this.onDatesChange}
                                                        onClick={this.onToggle} />
                                                </div>

                                                {isOpen && (
                                                    <DateRangePicker value={dateValue} onSelect={this.onDatesChange} singleDateRange={true} />
                                                )}
                                                {
                                                    (submitted && !dateValue) &&
                                                    <div className="help-block text-danger"><Trans>Campaign Date is required</Trans></div>
                                                }
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="fromAge" className="">
                                                    <span className="text-danger">*</span> <Trans>From Age</Trans>
                                                </Label>
                                                <Input disabled={Influencer === null} type="number" name="fromAge" id="fromAge" value={campaign.fromAge} onChange={this.handleCampaignChange} />
                                                {
                                                    submitted && !campaign.fromAge &&
                                                    <div className="help-block text-danger"><Trans>Age is required</Trans></div>
                                                }
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="toAge" className="">
                                                    <span className="text-danger">*</span> <Trans>To Age</Trans>
                                                </Label>
                                                <Input disabled={Influencer === null} type="number" name="toAge" id="toAge" value={campaign.toAge} onChange={this.handleCampaignChange} />
                                                {
                                                    submitted && !campaign.toAge &&
                                                    <div className="help-block text-danger"><Trans>Age is required</Trans></div>
                                                }
                                            </FormGroup>
                                        </Col>
                                        <Col md={2}>
                                            <FormGroup>
                                                <Label for="gender" className="">
                                                    <span className="text-danger">*</span> <Trans>Gender</Trans></Label>
                                                <Select disabled={Influencer === null}
                                                    value={selectedOptionGender}
                                                    onChange={this.handleOptionGenderChange}
                                                    isMulti={false}
                                                    options={genders}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row form>
                                        <Col md={5}>
                                            <FormGroup>
                                                <Label for="location" className="">
                                                    <span className="text-danger">*</span> <Trans>Location</Trans></Label>
                                                <Select disabled={Influencer === null}
                                                    value={selectedOptionLocation}
                                                    onChange={this.handleOptionLocationChange}
                                                    isMulti
                                                    options={locations}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={5}>
                                            <FormGroup>
                                                <Label for="interestings">
                                                    <span className="text-danger">*</span> <Trans>Interestings</Trans></Label>
                                                <Select disabled={Influencer === null}
                                                    value={selectedOptionInteresting}
                                                    onChange={this.handleOptionInterestingChange}
                                                    isMulti
                                                    options={interestings} />
                                            </FormGroup>
                                        </Col>
                                        <Col md={2}>
                                            <FormGroup>
                                                <Label for="budget">
                                                    <span className="text-danger">*</span> <Trans>Budget</Trans></Label>
                                                <NumberFormat disabled={Influencer === null} className="form-control" name="budget" id="budget" thousandSeparator={true} suffix={'đ'} value={campaign.budget} placeholder={i18n.i18n.t('Price') + '...'} onValueChange={(values) => {
                                                    const { value } = values;
                                                    const { campaign } = this.state;
                                                    const campaignLocal = campaign;
                                                    campaignLocal.budget = value;
                                                    this.setState({ campaign: campaignLocal })
                                                }} />
                                                {
                                                    submitted && !campaign.budget &&
                                                    <div className="help-block text-danger"><Trans>Budget is required</Trans></div>
                                                }
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Form>
                            </CardBody>
                        </Card>
                    </CSSTransition>
                    <CSSTransition timeout={1500} unmountOnExit appear classNames="TabsAnimation">
                        <Card className="main-card mb-3">
                            <CardBody>
                                <Form id="registerjob">
                                    <Row form>
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label htmlFor="jobName" className="">
                                                    <span className="text-danger">*</span> <Trans>Job Name</Trans>
                                                </Label>
                                                <Input disabled={Influencer === null} type="text" name="jobName" id="jobName" placeholder={i18n.i18n.t('Name of your job')} onChange={this.handleJobChange} />
                                                {
                                                    submitted && !job.jobName &&
                                                    <div className="help-block text-danger"><Trans>Job Name is required</Trans></div>
                                                }
                                            </FormGroup>
                                        </Col>
                                        <Col md={8}>
                                            <FormGroup>
                                                <Label htmlFor="name" className="">
                                                    <span className="text-danger">*</span> <Trans>Job Description</Trans></Label>
                                                <Input disabled={Influencer === null} type="text" className="form-control" name="jobDescription" id="jobDescription" placeholder={i18n.i18n.t('Description of your job')} value={job.jobDescription} onChange={this.handleJobChange} />
                                                {
                                                    submitted && !job.jobDescription &&
                                                    <div className="help-block text-danger"><Trans>Job Description is required</Trans></div>
                                                }
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row form><Col md={4}>
                                        <FormGroup>
                                            <Label for="jobCategory" className="">
                                                <span className="text-danger">*</span> <Trans>Job</Trans></Label>
                                            <Select disabled={Influencer === null}
                                                value={selectedOptionJobCategory}
                                                onChange={this.handleOptionJobCategoryChange}
                                                isMulti
                                                options={jobs}
                                            />
                                        </FormGroup>
                                    </Col>
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label for="jobHashTag" className="">
                                                    <span></span> <Trans>Job HashTag</Trans></Label>
                                                <Input disabled={Influencer === null} type="text" name="jobHashTag" id="jobHashTag" placeholder="Ex: #hashtag1;#hashtag2" value={job.jobHashTag} onChange={this.handleJobChange} />
                                            </FormGroup>
                                        </Col>
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label for="jobKeyword" className="">
                                                    <span></span> <Trans>Job Keyword</Trans></Label>
                                                <Input disabled={Influencer === null} type="text" name="jobKeyword" id="jobKeyword" placeholder="Ex: nice" value={job.jobKeyword} onChange={this.handleJobChange} />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <FormGroup>
                                        <Label for="jobLink" className="">
                                            <span></span> <Trans>Job Link</Trans></Label>
                                        <Input disabled={Influencer === null} type="text" name="jobLink" id="jobLink" placeholder={i18n.i18n.t('Link of your page')} value={job.jobLink} onChange={this.handleJobChange} />
                                    </FormGroup>
                                    <Button onClick={this.handleSubmitJobs} disabled={Influencer === null} color="primary" className="mt-2"><Trans>Submit</Trans></Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </CSSTransition>
                </TransitionGroup>
            </Fragment>
        );
    }
}

function mapStateToProps(state) {

    const { brand } = state.brand;
    //const { brand } = influencers;
    return {
        brand,
    };
}

const connectedManageBrand = connect(mapStateToProps)(ManageBrand);
export { connectedManageBrand as ManageBrand };