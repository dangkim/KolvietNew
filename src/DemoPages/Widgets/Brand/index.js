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
            brandInfo: this.props.brands
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

        this.setState({ submitted: true });

        const { dispatch, brands } = this.props;
        const { brandInfo, selectedOptionLocation } = this.state;

        const brandToUpdate = brandInfo;
        debugger;
        let locationString = '';
        var i;
        for (i = 0; i < selectedOptionLocation.length; i++) {
            locationString += selectedOptionLocation[i].value + ',';
        }
        
        brandToUpdate.location = locationString.substring(0, locationString.length - 1);;

        dispatch(brandActions.updateBrand(brandToUpdate));

    }

    handleOptionLocationChange = selectedOptionLocation => {
        this.setState({ selectedOptionLocation });
    };

    handleBusinessAreasChange(event) {
        const { name, value } = event.target;
        const { brands } = this.props;
        const localBrand = brands.brand;
        localBrand[name] = value
        this.setState({
            brandInfo: localBrand
        });
    }

    handlePhoneChange(event) {
        const { name, value } = event.target;
        const { brands } = this.props;
        const localBrand = brands.brand;
        localBrand[name] = value
        this.setState({
            brandInfo: localBrand
        });
    }

    handleFullNameChange(event) {
        const { name, value } = event.target;
        const { brands } = this.props;
        const localBrand = brands.brand;
        localBrand[name] = value
        this.setState({
            brandInfo: localBrand
        });
    }

    handleBrandNameChange(event) {
        const { name, value } = event.target;
        const { brands } = this.props;
        const localBrand = brands.brand;
        localBrand[name] = value;
        this.setState({
            brandInfo: localBrand
        });
    }

    handleOptionLocationChange = selectedOptionLocation => {
        this.setState({ selectedOptionLocation });
    };

    render() {
        const { brands } = this.props;
        const { selectedOptionLocation, brandInfo, submitted } = this.state;
        const locations = createLocations();
        const isDisabled = JSON.stringify(brandInfo) === "{}";

        return (
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
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label for="businessAreas">
                                                    <Trans>Change Business Areas</Trans>
                                                </Label>
                                                <Input type="text" name="businessAreas" id="businessAreas" value={brands.brand.businessAreas} onChange={this.handleBusinessAreasChange} />
                                            </FormGroup>
                                        </Col>
                                        <Col md={4}>
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
                                    </Row>
                                    <Button onClick={this.handleSubmit} disabled={isDisabled} color="primary" className="mt-2"><Trans>Submit</Trans></Button>
                                    {
                                        brands.loading &&
                                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                    }
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