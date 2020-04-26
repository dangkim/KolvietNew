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
import default_user from '../../../assets/utils/images/avatars/default_user.jpg';
import Avatar from 'react-avatar-edit'

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
            isDirtyUpload: false,
            file: null,
            preview: default_user,
            src: null,
            fileName: ''
        };

        this.onCrop = this.onCrop.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onBeforeFileLoad = this.onBeforeFileLoad.bind(this);
        this.handleBrandNameChange = this.handleBrandNameChange.bind(this);
        this.handleBusinessAreasChange = this.handleBusinessAreasChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleOptionLocationChange = this.handleOptionLocationChange.bind(this);
        this.handleFullNameChange = this.handleFullNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUploadAvatar = this.handleUploadAvatar.bind(this);
        this.base64ImageToBlob = this.base64ImageToBlob.bind(this)
    }

    componentDidMount() {
        const { dispatch } = this.props;
        const brandObj = JSON.parse(localStorage.getItem('brandObj'));
        dispatch(brandActions.getBrandByNameToManage(brandObj.email));
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
    }


    handleUploadAvatar(event) {
        event.preventDefault();
        this.setState({ isDirtyUpload: false });
        const { dispatch, brands } = this.props;
        const { file } = this.state;
        debugger;
        dispatch(brandActions.uploadAvatar(file, brands));
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
            src: e.target.files[0],
            isDirtyUpload: true
        });
    }

    base64ImageToBlob(str, fileName) {
        // extract content type and base64 payload from original string
        var pos = str.indexOf(';base64,');
        var type = str.substring(5, pos);
        var b64 = str.substr(pos + 8);

        // decode base64
        var imageContent = atob(b64);

        // create an ArrayBuffer and a view (as unsigned 8-bit)
        var buffer = new ArrayBuffer(imageContent.length);
        var view = new Uint8Array(buffer);

        // fill the view, using the decoded base64
        for (var n = 0; n < imageContent.length; n++) {
            view[n] = imageContent.charCodeAt(n);
        }

        // convert ArrayBuffer to Blob
        var blob = new Blob([buffer], { type: type });
        const file = new File([blob], fileName, { type: blob.type })
        return file;
    }

    onClose() {
        this.setState({ preview: null })
    }

    onCrop(preview) {
        const { fileName } = this.state;
        this.setState({ preview })
        const file = this.base64ImageToBlob(preview, fileName);
        this.setState({ file: file })

    }

    onBeforeFileLoad(elem) {
        if (elem.target.files[0].size > 300000) {
            alert("File is too big!");
            elem.target.value = "";
        } else {
            this.setState({
                src: elem.target.files[0],
                isDirtyUpload: true,
                fileName: elem.target.files[0].name
            });
        };
    }

    render() {
        const { brands } = this.props;
        const { selectedOptionLocation, isDirtyUpload, isDirty, submitted } = this.state;
        const locations = createLocations();

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
                            <div>
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
                                            <Button onClick={this.handleSubmit} disabled={!isDirty} color="primary" className="mt-2"><Trans>Submit</Trans></Button>
                                        </Form>
                                    </CardBody>
                                </Card>
                                <Card className="main-card mb-3">
                                    <CardBody>
                                        <CardTitle>
                                            {
                                                <span><Trans>Manage your avatar</Trans></span>
                                            }
                                        </CardTitle>
                                        <Form id="register-form">
                                            <Row>
                                                <Col md={6}>
                                                    <Avatar
                                                        width={390}
                                                        height={295}
                                                        onCrop={this.onCrop}
                                                        onClose={this.onClose}
                                                        onBeforeFileLoad={this.onBeforeFileLoad}
                                                        src={this.state.src}
                                                    />
                                                    </Col>
                                                <Col md={3}>
                                                    <img src={this.state.preview} alt="Preview" />
                                                </Col>
                                            </Row>
                                            <Button onClick={this.handleUploadAvatar} disabled={!isDirtyUpload} color="primary" className="mt-2"><Trans>Upload</Trans></Button>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </div>
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