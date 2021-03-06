
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';
import {
    Button, ButtonGroup,
    DropdownToggle, Dropdown, DropdownMenu,
    DropdownItem,
} from 'reactstrap';

import {
    Row, Col,
    Card, CardBody,
    CardTitle, Nav, NavItem, NavLink

} from 'reactstrap';

import NumberFormat from 'react-number-format';

class CompareInfluencers extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
        this.state = {
            dropdownOpen: false,
            hoverInf01: false,
            hoverInf02: false
        };

        this.gotoDetail = this.gotoDetail.bind(this);
        this.toggleHoverInf01 = this.toggleHoverInf01.bind(this);
        this.toggleHoverInf02 = this.toggleHoverInf02.bind(this);
    }

    toggleHoverInf01() {
        this.setState({ hoverInf01: !this.state.hoverInf01 })
    }

    toggleHoverInf02() {
        this.setState({ hoverInf02: !this.state.hoverInf02 })
    }

    sendData = (tabIndex, object, index) => {
        // Go to detail tab
        this.props.parentCallback(tabIndex, object, index);
    }

    gotoDetail(index) {
        const { ComparedInfluencers } = this.props;
        const influencer = ComparedInfluencers ? ComparedInfluencers[index] : null;
        debugger;
        //window.scroll(0, 450);
        if (influencer) {
            this.sendData(1, ComparedInfluencers, index);
        }
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    onMouseEnter() {
        this.setState({ dropdownOpen: true });
    }

    onMouseLeave() {
        this.setState({ dropdownOpen: false });
    }

    render() {
        const { ComparedInfluencers } = this.props;

        const strOfReaction1 = ComparedInfluencers.length > 0 ? ComparedInfluencers[0].numberOfReaction : '';
        const strOfComment1 = ComparedInfluencers.length > 0 ? ComparedInfluencers[0].numberOfComment : '';
        const strOfShare1 = ComparedInfluencers.length > 0 ? ComparedInfluencers[0].numberOfShare : '';
        const numberOfReaction1 = strOfReaction1.charAt(strOfReaction1.length - 1) == 'k' ? Number((strOfReaction1.substring(0, strOfReaction1.length - 1))) * 1000 : Number(strOfReaction1);
        const numberOfComment1 = strOfComment1.charAt(strOfComment1.length - 1) == 'k' ? Number((strOfComment1.substring(0, strOfComment1.length - 1))) * 1000 : Number(strOfComment1);
        const numberOfShare1 = strOfShare1.charAt(strOfShare1.length - 1) == 'k' ? Number((strOfShare1.substring(0, strOfShare1.length - 1))) * 1000 : Number(strOfShare1);
        const engagement1 = numberOfReaction1 + (numberOfComment1 * 2) + (numberOfShare1 * 3)

        const strOfReaction2 = ComparedInfluencers.length > 0 ? ComparedInfluencers[1].numberOfReaction : '';
        const strOfComment2 = ComparedInfluencers.length > 0 ? ComparedInfluencers[1].numberOfComment : '';
        const strOfShare2 = ComparedInfluencers.length > 0 ? ComparedInfluencers[1].numberOfShare : '';
        const numberOfReaction2 = strOfReaction2.charAt(strOfReaction2.length - 1) == 'k' ? Number((strOfReaction2.substring(0, strOfReaction2.length - 1))) * 1000 : Number(strOfReaction2);
        const numberOfComment2 = strOfComment2.charAt(strOfComment2.length - 1) == 'k' ? Number((strOfComment2.substring(0, strOfComment2.length - 1))) * 1000 : Number(strOfComment2);
        const numberOfShare2 = strOfShare2.charAt(strOfShare2.length - 1) == 'k' ? Number((strOfShare2.substring(0, strOfShare2.length - 1))) * 1000 : Number(strOfShare2);
        const engagement2 = numberOfReaction2 + (numberOfComment2 * 2) + (numberOfShare2 * 3)

        const subReaction = numberOfReaction1 - numberOfReaction2;
        const subComment = numberOfComment1 - numberOfComment2;
        const subShare = numberOfShare1 - numberOfShare2;
        const subEngagement = engagement1 - engagement2;
        const subFollowers = ComparedInfluencers[0] && ComparedInfluencers[1] && ComparedInfluencers[0].numberOfFollowers && ComparedInfluencers[1].numberOfFollowers ? ComparedInfluencers[0].numberOfFollowers - ComparedInfluencers[1].numberOfFollowers : 0;
        const subPost = ComparedInfluencers[0] && ComparedInfluencers[1] && ComparedInfluencers[0].numberOfPost && ComparedInfluencers[1].numberOfPost ? ComparedInfluencers[0].numberOfPost - ComparedInfluencers[1].numberOfPost : 0;

        var linkStyleInf01;
        var linkStyleInf02;

        if (this.state.hoverInf01) {
            linkStyleInf01 = { color: '#764ba2', cursor: 'pointer' }
        } else {
            linkStyleInf01 = { color: '#000' }
        }

        if (this.state.hoverInf02) {
            linkStyleInf02 = { color: '#764ba2', cursor: 'pointer' }
        } else {
            linkStyleInf02 = { color: '#000' }
        }

        return (
            <Fragment>
                <TransitionGroup component="div">
                    <CSSTransition timeout={1500} unmountOnExit appear classNames="TabsAnimation">
                        <Row>
                            <Col md="12">
                                <Card className="main-card mb-3">
                                    <CardBody>
                                        <CardTitle>
                                            <Row>
                                                <Col md="6">
                                                    <p style={linkStyleInf01} onClick={() => this.gotoDetail(0)} onMouseEnter={this.toggleHoverInf01} onMouseLeave={this.toggleHoverInf01}>{ComparedInfluencers.length > 0 ? ComparedInfluencers[0].fullName : ''}</p>
                                                </Col>
                                                <Col md="6">
                                                    <p style={linkStyleInf02} onClick={() => this.gotoDetail(1)} onMouseEnter={this.toggleHoverInf02} onMouseLeave={this.toggleHoverInf02}>{ComparedInfluencers.length > 0 ? ComparedInfluencers[1].fullName : ''}</p>
                                                </Col>
                                            </Row>

                                        </CardTitle>
                                        <Row>
                                            <Col>
                                                <Nav vertical>
                                                    <NavItem className="nav-item-header">
                                                        Interaction
                                                </NavItem>
                                                    <NavItem>
                                                        <NavLink>
                                                            <i className="nav-link-icon pe-7s-like2"> </i>
                                                            <span>Reactions(Love|Like|Smile..)</span>
                                                            <div className={"ml-auto" + (subReaction > 0 ? " badge-big " : " badge ") + "badge-pill badge-warning"}>
                                                                <NumberFormat value={numberOfReaction1} displayType={'text'} thousandSeparator={true} />
                                                            </div>
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink>
                                                            <i className="nav-link-icon pe-7s-chat"> </i>
                                                            <span>Comments</span>
                                                            <div className={"ml-auto" + (subComment > 0 ? " badge-big " : " badge ") + "badge-pill badge-info"}>
                                                                <NumberFormat value={numberOfComment1} displayType={'text'} thousandSeparator={true} />
                                                            </div>
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink>
                                                            <i className="nav-link-icon pe-7s-share"> </i>
                                                            <span>Share</span>
                                                            <div className={"ml-auto" + (subShare > 0 ? " badge-big " : " badge ") + "badge-pill badge-alternate"}>
                                                                <NumberFormat value={numberOfShare1} displayType={'text'} thousandSeparator={true} />
                                                            </div>
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink>
                                                            <i className="nav-link-icon pe-7s-graph"> </i>
                                                            <span>Engagement</span>
                                                            <div className={"ml-auto" + (subEngagement > 0 ? " badge-big " : " badge ") + "badge-pill badge-danger"}>
                                                                <NumberFormat value={engagement1} displayType={'text'} thousandSeparator={true} />
                                                            </div>
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem className="nav-item-header">
                                                        Activity
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink>
                                                            <i className="nav-link-icon pe-7s-users"> </i>
                                                            <span>Followers</span>
                                                            <div className={"ml-auto" + (subFollowers > 0 ? " badge-big " : " badge ") + "badge-pill badge-success"}>
                                                                <NumberFormat value={ComparedInfluencers.length > 0 ? ComparedInfluencers[0].numberOfFollowers : ''} displayType={'text'} thousandSeparator={true} />
                                                            </div>
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink>
                                                            <i className="nav-link-icon pe-7s-note"> </i>
                                                            <span>Posts</span>
                                                            <div className={"ml-auto" + (subPost > 0 ? " badge-big " : " badge ") + "badge-pill badge-secondary"}>{ComparedInfluencers.length > 0 ? ComparedInfluencers[0].numberOfPost : ''}</div>
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem className="nav-item-divider" />
                                                </Nav>
                                            </Col>
                                            <Col>
                                                <Nav vertical>
                                                    <NavItem className="nav-item-header">
                                                        Interaction
                                                </NavItem>
                                                    <NavItem>
                                                        <NavLink>
                                                            <i className="nav-link-icon pe-7s-like2"> </i>
                                                            <span>Reactions(Love|Like|Smile..)</span>
                                                            <div className={"ml-auto" + (subReaction > 0 ? " badge " : " badge-big ") + "badge-pill badge-warning"}>
                                                                <NumberFormat value={numberOfReaction2} displayType={'text'} thousandSeparator={true} />
                                                            </div>
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink>
                                                            <i className="nav-link-icon pe-7s-chat"> </i>
                                                            <span>Comments</span>
                                                            <div className={"ml-auto" + (subComment > 0 ? " badge " : " badge-big ") + "badge-pill badge-info"}>
                                                                <NumberFormat value={numberOfComment2} displayType={'text'} thousandSeparator={true} />
                                                            </div>
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink>
                                                            <i className="nav-link-icon pe-7s-share"> </i>
                                                            <span>Share</span>
                                                            <div className={"ml-auto" + (subShare > 0 ? " badge " : " badge-big ") + "badge-pill badge-alternate"}>
                                                                <NumberFormat value={numberOfShare2} displayType={'text'} thousandSeparator={true} />
                                                            </div>
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink>
                                                            <i className="nav-link-icon pe-7s-graph"> </i>
                                                            <span>Engagement</span>
                                                            <div className={"ml-auto" + (subEngagement > 0 ? " badge " : " badge-big ") + "badge-pill badge-danger"}>
                                                                <NumberFormat value={engagement2} displayType={'text'} thousandSeparator={true} />
                                                            </div>
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem className="nav-item-header">
                                                        Activity
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink>
                                                            <i className="nav-link-icon pe-7s-users"> </i>
                                                            <span>Followers</span>
                                                            <div className={"ml-auto" + (subFollowers > 0 ? " badge " : " badge-big ") + "badge-pill badge-success"}>
                                                                <NumberFormat value={ComparedInfluencers.length > 0 ? ComparedInfluencers[1].numberOfFollowers : ''} displayType={'text'} thousandSeparator={true} />
                                                            </div>
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem>
                                                        <NavLink>
                                                            <i className="nav-link-icon pe-7s-note"> </i>
                                                            <span>Posts</span>
                                                            <div className={"ml-auto" + (subPost > 0 ? " badge " : " badge-big ") + "badge-pill badge-secondary"}>
                                                                <NumberFormat value={ComparedInfluencers.length > 0 ? ComparedInfluencers[1].numberOfPost : ''} displayType={'text'} thousandSeparator={true} />
                                                            </div>
                                                        </NavLink>
                                                    </NavItem>
                                                    <NavItem className="nav-item-divider" />
                                                </Nav>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row></CSSTransition>
                </TransitionGroup>
            </Fragment>
        );
    }
};

function mapStateToProps(state) {

    const { campaigns, influencers, locations, interestings, jobCategories, jobs, brands } = state;
    //const {brand} = influencers;
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

const connectedCompareInfluencers = connect(mapStateToProps)(CompareInfluencers);
export { connectedCompareInfluencers as CompareInfluencers };