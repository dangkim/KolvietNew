import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';
import NumberFormat from 'react-number-format';

import {
    Button, Form,
    FormGroup, Label,
    Row, Col,
    Card, CardBody,
    CardTitle,
} from 'reactstrap';


import { infActions } from '../../../../_actions';

import { history } from '../../../../_helpers';

class InfluencerUpdateCost extends Component {

    constructor(props) {
        super(props);

        this.state = {
            shareLink: '',
            postImage: '',
            video: '',
            liveStream: '',
            checkIn: '',
            submitted: false,
            influencer: props.influencers.items
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { influencer } = this.state;
        const { dispatch } = this.props;

        if (influencer.shareLink &&
            influencer.postImage &&
            influencer.liveStream &&
            influencer.checkIn &&
            influencer.video) {
            //let obj = JSON.parse(influencer.items);
            const { userName } = this.props.location.state;
            dispatch(infActions.updateInfluencers(influencer, userName));
        }
    }

    componentDidMount() {
        debugger;
        const { dispatch, userName } = this.props;
        dispatch(infActions.getCostByUserName(userName));
    }

    render() {

        const { submitted, influencer } = this.state;

        return (
            <Fragment>
                <TransitionGroup component="div">
                    <CSSTransition timeout={1500} unmountOnExit appear classNames="TabsAnimation">
                        <Card className="main-card mb-3">
                            <CardBody>
                                <CardTitle>
                                    {
                                        <span>Update your value <span className="text-success">Modification is very easy to do using KolViet Framework</span></span>
                                    }
                                </CardTitle>
                                <Form id="updateCost">
                                    <Row form>
                                        <Col md={2}>
                                            <FormGroup>
                                                <Label for="ShareLink" className=""> <span className="text-danger">*</span> Share Link</Label>
                                                <div>
                                                    <NumberFormat className="form-control" id="shareLink" name="shareLink" thousandSeparator={true} suffix={'đ'} value={this.props.influencers.items ? this.props.influencers.items.shareLink : ''} placeholder="Price..." onValueChange={(values) => {
                                                        const { value } = values;
                                                        const influencer = this.props.influencers.items;
                                                        if (influencer) {
                                                            influencer.shareLink = value;
                                                            this.setState({ influencer: influencer })
                                                        }
                                                    }} />
                                                    {submitted && !influencer.shareLink &&
                                                        <div className="help-block" style={{ color: 'red' }}>Price is required</div>
                                                    }
                                                </div>
                                            </FormGroup>
                                        </Col>
                                        <Col md={2}>
                                            <FormGroup>
                                                <Label for="postImage" className="">
                                                    <span className="text-danger">*</span> Post Image
                                                        </Label>
                                                <NumberFormat className="form-control" id="postImage" name="postImage" thousandSeparator={true} suffix={'đ'} value={this.props.influencers.items ? this.props.influencers.items.postImage : ''} placeholder="Price..." onValueChange={(values) => {
                                                    const { value } = values;
                                                    const influencer = this.props.influencers.items;
                                                    if (influencer) {
                                                        influencer.postImage = value;
                                                        this.setState({ influencer: influencer })
                                                    }
                                                }} />
                                                {submitted && !influencer.postImage &&
                                                    <div className="help-block" style={{ color: 'red' }}>Price is required</div>
                                                }
                                            </FormGroup>
                                        </Col>
                                        <Col md={2}>
                                            <FormGroup>
                                                <Label for="video" className="">
                                                    <span className="text-danger">*</span> Video
                                                        </Label>
                                                <NumberFormat className="form-control" id="video" name="video" thousandSeparator={true} suffix={'đ'} value={this.props.influencers.items ? this.props.influencers.items.video : ''} placeholder="Price..." onValueChange={(values) => {
                                                    const { value } = values;
                                                    const influencer = this.props.influencers.items;
                                                    if (influencer) {
                                                        influencer.video = value;
                                                        this.setState({ influencer: influencer })
                                                    }
                                                }} />
                                                {submitted && !influencer.video &&
                                                    <div className="help-block" style={{ color: 'red' }}>Price is required</div>
                                                }
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="checkIn" className="">
                                                    <span className="text-danger">*</span> Check In</Label>
                                                <NumberFormat className="form-control" id="checkIn" name="checkIn" thousandSeparator={true} suffix={'đ'} value={this.props.influencers.items ? this.props.influencers.items.checkIn : ''} placeholder="Price..." onValueChange={(values) => {
                                                    const { value } = values;
                                                    const influencer = this.props.influencers.items;
                                                    if (influencer) {
                                                        influencer.checkIn = value;
                                                        this.setState({ influencer: influencer })
                                                    }
                                                }} />
                                                {submitted && !influencer.checkIn &&
                                                    <div className="help-block" style={{ color: 'red' }}>Price is required</div>
                                                }
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="liveStream" className="">
                                                    <span className="text-danger">*</span> Live Stream</Label>
                                                <NumberFormat className="form-control" id="liveStream" name="liveStream" thousandSeparator={true} suffix={'đ'} value={this.props.influencers.items ? this.props.influencers.items.liveStream : ''} placeholder="Price..." onValueChange={(values) => {
                                                    const { value } = values;
                                                    const influencer = this.props.influencers.items;
                                                    if (influencer) {
                                                        influencer.liveStream = value;
                                                        this.setState({ influencer: influencer })
                                                    }
                                                }} />
                                                {submitted && !influencer.liveStream &&
                                                    <div className="help-block" style={{ color: 'red' }}>Price is required</div>
                                                }
                                            </FormGroup>
                                        </Col>
                                    </Row>
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
    const { influencers } = state;
    return {
        influencers
    };
}

const connectedInfluencerUpdateCost = connect(mapStateToProps)(InfluencerUpdateCost);
export { connectedInfluencerUpdateCost as InfluencerUpdateCost };