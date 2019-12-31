import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { brandActions } from '../../../_actions';
import { createLocations } from '../../../_models/CommonModels';
import NumberFormat from 'react-number-format';
import Select from 'react-select';
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';

import Loader from 'react-loader-spinner'

import { Trans } from 'react-i18next';

import {
    Button, Form,
    FormGroup, Label,
    Row, Col,
    Card, CardBody,
    CardTitle,
    Input
} from 'reactstrap';

export default class ManageBrand extends React.Component {

    constructor(props) {
        super(props);

        const locationStorage = localStorage.getItem('selectedOptionLocation') ? JSON.parse(localStorage.getItem('selectedOptionLocation')) : [{ value: "TPHCM", label: "TPHCM" }];

        this.state = {
            compaignList: [],
            statusColumns: ['statusOfCampaign'],
            selectedOptionLocation: locationStorage,
            brandInfo: this.props.brands,
            isDirty: false,
            file: null,
        };


        this.handleBrandNameChange = this.handleBrandNameChange.bind(this);
        this.handleBusinessAreasChange = this.handleBusinessAreasChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleOptionLocationChange = this.handleOptionLocationChange.bind(this);
        this.handleFullNameChange = this.handleFullNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        const brandObj = JSON.parse(localStorage.getItem('brandObj'));
        dispatch(brandActions.getBrandByNameToManage(brandObj[0].email));
    }

    handleSubmit(event) {

        event.preventDefault();

        this.setState({ submitted: true, isDirty: false });

        const { dispatch, brands } = this.props;
        const { brandInfo, selectedOptionLocation, file } = this.state;

        const brandToUpdate = brandInfo;

        let locationString = '';
        var i;
        for (i = 0; i < selectedOptionLocation.length; i++) {
            locationString += selectedOptionLocation[i].value + ',';
        }

        brandToUpdate.location = locationString.substring(0, locationString.length - 1);

        dispatch(brandActions.updateBrand(brandToUpdate));
        dispatch(brandActions.uploadAvatar(file));
    }

    handleBusinessAreasChange(event) {
        const { name, value } = event.target;
        const { brands } = this.props;
        const localBrand = brands.brand;
        localBrand[name] = value
        this.setState({
            brandInfo: localBrand,
            isDirty: true
        });
    }

    handlePhoneChange(event) {
        const { name, value } = event.target;
        const { brands } = this.props;
        const localBrand = brands.brand;
        localBrand[name] = value
        this.setState({
            brandInfo: localBrand,
            isDirty: true
        });
    }

    handleFullNameChange(event) {
        const { name, value } = event.target;
        const { brands } = this.props;
        const localBrand = brands.brand;
        localBrand[name] = value
        this.setState({
            brandInfo: localBrand,
            isDirty: true
        });
    }

    handleBrandNameChange(event) {
        const { name, value } = event.target;
        const { brands } = this.props;
        const localBrand = brands.brand;
        localBrand[name] = value;
        this.setState({
            brandInfo: localBrand,
            isDirty: true
        });
    }

    handleOptionLocationChange = selectedOptionLocation => {
        this.setState({
            selectedOptionLocation,
            isDirty: true
        });
    };

    setFile(e) {
        //debugger;
        this.setState({
            file: e.target.files[0],
            isDirty: true
        });
    }

    render() {
        const { brands } = this.props;
        const { selectedOptionLocation, brandInfo, isDirty, submitted } = this.state;
        const locations = createLocations();
        //const isDisabled = JSON.stringify(brandInfo) === "{}";
        //const localBrand = brands.brand;
        //debugger;
        return (
            brands.loading ?
                <div className="loader-container" style={{ width: '85%', height: '85%' }}>
                    <div className="loader-container-inner">
                        <Loader
                            type="CradleLoader"
                            color="#00BFFF"
                            height={100}
                            width={100}
                        />
                    </div>
                </div>
                :
                brands.brand !== undefined && <Fragment>
                    <TransitionGroup component="div">
                        <CSSTransition timeout={1500} unmountOnExit appear classNames="TabsAnimation">
                            <Card className="main-card mb-3">
                                <CardBody>
                                    <CardTitle>
                                        {
                                            <span><Trans>Manage your account</Trans></span>
                                        }
                                    </CardTitle>
                                    <Form id="register-form">
                                        <Row form>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="campaignName">
                                                        <Trans>Change Brand Name</Trans>
                                                    </Label>
                                                    <Input type="text" name="brandName" id="brandName" value={brands.brand.brandName} onChange={this.handleBrandNameChange} />
                                                </FormGroup>
                                            </Col>
                                            <Col md={6}>
                                                <FormGroup>
                                                    <Label for="fullName">
                                                        <Trans>Change Full Name</Trans>
                                                    </Label>
                                                    <Input type="text" name="fullName" id="fullName" value={brands.brand.fullName} onChange={this.handleFullNameChange} />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row form>
                                            <Col md={3}>
                                                <FormGroup>
                                                    <Label for="businessAreas">
                                                        <Trans>Change Business Areas</Trans>
                                                    </Label>
                                                    <Input type="text" name="businessAreas" id="businessAreas" value={brands.brand.businessAreas} onChange={this.handleBusinessAreasChange} />
                                                </FormGroup>
                                            </Col>
                                            <Col md={2}>
                                                <FormGroup>
                                                    <Label for="phone">
                                                        <Trans>Change Phone</Trans>
                                                    </Label>
                                                    <NumberFormat className="form-control" name="phone" id="phone" format="+84 (####) ###-###" mask="_" value={brands.brand.phone} onChange={this.handlePhoneChange} />
                                                </FormGroup>
                                            </Col>
                                            <Col md={4}>
                                                <FormGroup>
                                                    <Label for="location" className=""> <Trans>Location</Trans></Label>
                                                    <Select value={selectedOptionLocation}
                                                        onChange={this.handleOptionLocationChange}
                                                        isMulti
                                                        options={locations}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col md={3}>
                                                <FormGroup>
                                                    <Label for="avatar" className=""> <Trans>Avatar</Trans></Label>
                                                    <Input type="file" name="file" id="avatar" className="form-control" onChange={e => this.setFile(e)} />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Button onClick={this.handleSubmit} disabled={!isDirty} color="primary" className="mt-2"><Trans>Submit</Trans></Button>
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