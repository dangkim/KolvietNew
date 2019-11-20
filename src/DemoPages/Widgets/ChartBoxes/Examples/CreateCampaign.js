import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';

import { toast } from "react-toastify";

import {
    Button, Form,
    FormGroup, Label,
    Input,
    Row, Col,
    Card, CardBody,
    CardTitle,
} from 'reactstrap';

import defaultAvatar from '../../../../assets/utils/images/avatars/default.jpg'
import DateRangePicker from 'react-daterange-picker'
import originalMoment from "moment";
import { extendMoment } from "moment-range";
import NumberFormat from 'react-number-format';

import { campaignActions, infActions } from '../../../../_actions';
import { createLocations, createInterestings, createJobs, createGender } from '../../../../_models/CommonModels';
import { history } from '../../../../_helpers';
import { Trans } from 'react-i18next';

class CreateCampaign extends Component {

    constructor(props) {
        super(props);

        const moment = extendMoment(originalMoment);

        const today = moment();

        const campaign = {
            campaignTarget: '',
            marketPlace: 'Toàn quốc',
            fromAge: 19,
            toAge: 30,
            gender: 'Mọi giới',
            campaignName: '',
            fromDate: '',
            toDate: '',
            productInfo: '',
            budget: '',
            currency: 'VND'
        }
        const job = {
            jobName: '',
            jobHashTag: '',
            jobKeyword: '',
            jobDescription: '',
            jobLink: '',
            jobTasks: []
        }

        const jobStorage = localStorage.getItem('job') ? JSON.parse(localStorage.getItem('job')) : job;
        const campaignStorage = localStorage.getItem('campaign') ? JSON.parse(localStorage.getItem('campaign')) : campaign;
        const dateValue = localStorage.getItem('dateValue') ? moment.range(JSON.parse(localStorage.getItem('dateValue')).start, JSON.parse(localStorage.getItem('dateValue')).end) : moment.range(today.clone(), today.clone().add(7, "days"));
        const genderStorage = localStorage.getItem('selectedOptionGender') ? JSON.parse(localStorage.getItem('selectedOptionGender')) : [{ value: 3, label: "Mọi Giới" }];
        const locationStorage = localStorage.getItem('selectedOptionLocation') ? JSON.parse(localStorage.getItem('selectedOptionLocation')) : [{ value: "TPHCM", label: "TPHCM" }];
        const interestingStorage = localStorage.getItem('selectedOptionInteresting') ? JSON.parse(localStorage.getItem('selectedOptionInteresting')) : [{ value: "Fashion", label: "Fashion" }];
        const jobCategoryStorage = localStorage.getItem('selectedOptionJobCategory') ? JSON.parse(localStorage.getItem('selectedOptionJobCategory')) : [{ value: 'Share Link', label: 'Share Link' }, { value: 'Post Image', label: 'Post Image' }];

        this.state = {
            campaign: campaignStorage,
            job: jobStorage,
            selectedOptionGender: genderStorage,
            selectedOptionLocation: locationStorage,
            selectedOptionInteresting: interestingStorage,
            selectedOptionJobCategory: jobCategoryStorage,
            selectedInfluencers: [],
            submitted: false,
            isFormStep: true,
            isInfluencerStep: false,
            isJobStep: false,
            isChecked: false,
            skip: 0,
            checkedInfluencers: new Map(),
            startDate: today,
            endDate: today,
            isOpen: false,
            pageOfItems: [],
            first: 9,
            searchValue: '',
            dateValue: dateValue
        };

        this.handleCampaignChange = this.handleCampaignChange.bind(this);
        this.handleJobChange = this.handleJobChange.bind(this);
        this.handleSubmitJobs = this.handleSubmitJobs.bind(this);
        this.handleOptionGenderChange = this.handleOptionGenderChange.bind(this);
        this.handleOptionLocationChange = this.handleOptionLocationChange.bind(this);
        this.handleOptionInterestingChange = this.handleOptionInterestingChange.bind(this);
        this.handleOptionJobCategoryChange = this.handleOptionJobCategoryChange.bind(this);
        this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
        this.handleInfluencerStep = this.handleInfluencerStep.bind(this);
        this.handleBackStep = this.handleBackStep.bind(this);
        this.nextPageFluencers = this.nextPageFluencers.bind(this);
        this.prePageFluencers = this.prePageFluencers.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    nextPageFluencers(skip) {
        this.setState({ skip: skip + 1 });
    }

    prePageFluencers() {
        const { skip } = this.state;
        if (skip > 0) {
            this.setState({ skip: skip - 1 });
        }
    }

    handleCampaignChange(event) {
        const { name, value } = event.target;
        const { campaign } = this.state;
        this.setState({
            campaign: {
                ...campaign,
                [name]: value
            }
        });
    }

    handleJobChange(event) {
        const { name, value } = event.target;
        const { job } = this.state;
        this.setState({
            job: {
                ...job,
                [name]: value
            }
        });
    }

    handleSubmitJobs(event) {

        event.preventDefault();

        this.setState({ submitted: true });
        const { campaign,
            job,
            selectedOptionGender,
            selectedOptionLocation,
            selectedOptionInteresting,
            selectedOptionJobCategory,
            dateValue } = this.state;

        const { dispatch, Brand, Influencer } = this.props;

        if (campaign.campaignName &&
            campaign.campaignTarget &&
            dateValue.start &&
            dateValue.end &&
            campaign.fromAge &&
            campaign.toAge &&
            campaign.productInfo &&
            campaign.gender &&
            campaign.budget &&
            selectedOptionGender &&
            selectedOptionLocation &&
            selectedOptionInteresting &&
            selectedOptionJobCategory &&
            job.jobDescription &&
            job.jobName) {

            dispatch(campaignActions.register(campaign,
                dateValue.start.format("DD MMM YYYY"),
                dateValue.end.format("DD MMM YYYY"),
                job,
                selectedOptionGender,
                selectedOptionLocation,
                selectedOptionInteresting,
                selectedOptionJobCategory,
                Brand.brandName,
                Brand.fullName,
                Brand.businessAreas,
                Brand.location,
                Influencer));
        }
    }

    handleInfluencerStep(event) {

        const { campaign, dateValue, selectedOptionGender, selectedOptionLocation, selectedOptionInteresting } = this.state;
        event.preventDefault();

        this.setState({ submitted: true });
        if (campaign.campaignName &&
            campaign.campaignTarget &&
            dateValue.start &&
            dateValue.end &&
            campaign.fromAge &&
            campaign.toAge &&
            campaign.productInfo &&
            campaign.gender &&
            selectedOptionGender &&
            selectedOptionLocation &&
            selectedOptionInteresting) {

            this.setState({ isFormStep: false, isInfluencerStep: true, isJobStep: false });
        }
    }

    handleBackStep(event) {
        event.preventDefault();
        const { isInfluencerStep, isJobStep } = this.state;
        if (isInfluencerStep == true) {
            this.setState({ isFormStep: true, isInfluencerStep: false, isJobStep: false });
            return;
        }

        if (isJobStep == true) {
            this.setState({ isFormStep: false, isInfluencerStep: true, isJobStep: false });
            return;
        }
        //dispatch(infActions.getAll());
    }

    handleOptionGenderChange = selectedOptionGender => {
        this.setState({ selectedOptionGender });
    };

    handleOptionLocationChange = selectedOptionLocation => {
        this.setState({ selectedOptionLocation });
    };

    handleOptionInterestingChange = selectedOptionInteresting => {
        this.setState({ selectedOptionInteresting });
        //console.log(`Option selected:`, selectedOptionInteresting);
    };

    handleOptionJobCategoryChange = selectedOptionJobCategory => {
        this.setState({ selectedOptionJobCategory });
        //console.log(`Option selected:`, selectedOptionJobCategory);
    };

    handleCheckBoxChange(event) {

        const { influencers } = this.props;
        const { selectedInfluencers } = this.state;
        const selectedInfluencersLocal = selectedInfluencers;

        const item = event.target.name;
        const isChecked = event.target.checked;

        this.setState(prevState => ({ checkedInfluencers: prevState.checkedInfluencers.set(item, isChecked) }));

        influencers.items.influencer.map((item, key) => {
            if (item.contentItemId === event.target.name && isChecked === true) {
                selectedInfluencersLocal.push(item);
            }
            else if (item.contentItemId === event.target.name && isChecked === false) {
                selectedInfluencersLocal.splice(selectedInfluencersLocal.indexOf(item), 1);
            }
        });

        this.setState({ selectedInfluencers: selectedInfluencersLocal })
    };

    onDatesChange = (dateValue) => {
        if (dateValue) {
            this.setState({ isOpen: false, dateValue: dateValue });
        }
    }

    onToggle = () => {
        const { isOpen } = this.state;
        this.setState({ isOpen: !isOpen });
    };

    handleSearch(searchValue) {
        const { dispatch } = this.props;
        const { first } = this.state;
        this.setState({ searchValue: searchValue });
        if (searchValue !== '') {
            dispatch(infActions.getInfluencersByName(first, 0, searchValue));
        } else {
            dispatch(infActions.getAll(first, 0));
        }
    }

    onChangePage(pageOfItems) {
        const { dispatch } = this.props;
        const { first, searchValue } = this.state;
        const length = pageOfItems.length;
        const currentPage = Math.ceil(pageOfItems[length - 1].id / first);

        dispatch(infActions.getInfluencersByName(first, first * (currentPage - 1), searchValue));
        // update local state with new page of items
        this.setState({ pageOfItems });
    }

    render() {

        const { submitted,
            campaign,
            job,
            selectedOptionGender,
            selectedOptionLocation,
            selectedOptionInteresting,
            selectedOptionJobCategory,
            isOpen,
            dateValue } = this.state;
        const { Brand, Influencer, i18n } = this.props;

        // Check Brand and back to Login again
        if (!Brand) {
            toast.warn("Please Login Again!");
            history.replace({ pathname: '/pages/loginpage' });
            //history.push('/pages/loginpage');
        }
        const genders = createGender();
        const locations = createLocations();
        const interestings = createInterestings();
        const jobs = createJobs();

        localStorage.setItem('job', JSON.stringify(job));

        localStorage.setItem('campaign', JSON.stringify(campaign));

        localStorage.setItem('dateValue', JSON.stringify(dateValue));

        localStorage.setItem('selectedOptionGender', JSON.stringify(selectedOptionGender));

        localStorage.setItem('selectedOptionLocation', JSON.stringify(selectedOptionLocation));

        localStorage.setItem('selectedOptionInteresting', JSON.stringify(selectedOptionInteresting));

        localStorage.setItem('selectedOptionJobCategory', JSON.stringify(selectedOptionJobCategory));

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

const connectedCreateCampaignPage = connect(mapStateToProps)(CreateCampaign);
export { connectedCreateCampaignPage as CreateCampaign };
