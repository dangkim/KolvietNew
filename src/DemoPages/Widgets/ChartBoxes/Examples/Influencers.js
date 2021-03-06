import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';

import {
    Row, Col, ButtonGroup,
    Button
} from 'reactstrap';

import { infActions } from '../../../../_actions';
import default_user from '../../../../assets/utils/images/avatars/default_user.jpg';
import Img from 'react-image';
import originalMoment from "moment";
import { extendMoment } from "moment-range";
import 'react-daterange-picker/dist/css/react-calendar.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { history } from '../../../../_helpers';
import { Trans } from 'react-i18next';
import NumberFormat from 'react-number-format';
class Influencers extends Component {
    constructor(props) {
        super(props);
        const moment = extendMoment(originalMoment);

        const today = moment();

        this.state = {
            skip: 0,
            first: 9,
            searchValue: props.SearchValue,
            cSelected: [],
            hasMore: true,
            dateValue: moment.range(today.clone(), today.clone().add(7, "days")),
            confirmedNavigation: false,
            modalVisible: false,
            lastLocation: null,
        };

        this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
        this.handleConfirmNavigationClick = this.handleConfirmNavigationClick.bind(this);
        //this.handleBlockedNavigation = this.handleBlockedNavigation.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.onCheckboxBtnClick = this.onCheckboxBtnClick.bind(this);
        this.sendData = this.sendData.bind(this);
        this.gotoDetail = this.gotoDetail.bind(this);
        this.showModal = this.showModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.createCampaign = this.createCampaign.bind(this);
        this.loadInfinity = this.loadInfinity.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }

    handleScroll = () => {
        //debugger;
        const {
            loadInfinity,
            state: {
                hasMore,
            },
        } = this;

        // Bails early if:
        // * there's an error
        // * it's already loading
        // * there's nothing left to load
        if (!hasMore) return;

        // Checks that the page has scrolled to the bottom
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
            loadInfinity();
        }
    };

    loadInfinity() {
        const { dispatch, influencers, FilterInfluencers } = this.props;
        //const influencersLocal = (FilterInfluencers && FilterInfluencers.length > 0) ? FilterInfluencers : influencers;

        const { first } = this.state;
        const influencerItems = (influencers && influencers.items) ? influencers.items : [];
        const hasData = (influencers && (typeof influencers.hasData !== 'undefined')) ? influencers.hasData : true;
        const influencersLocal = (FilterInfluencers && FilterInfluencers.length > 0) ? FilterInfluencers : influencerItems;

        const infItems = influencersLocal;
        //const infItems = influencersLocal.items ? influencersLocal.items : [];

        if (infItems.length < 45 && hasData === true) {

            const { influencers } = this.props;
            if (influencers && influencers.items) {
                if (this.state.cSelected.length > 1) {
                    let items = [];
                    this.state.cSelected.map((item, key) => {
                        items.push(influencers.items[item]);
                    })

                    this.sendData(2, items, null);
                }
                else {
                    debugger;
                    const searchItems = JSON.parse(localStorage.getItem('searchItems'));
                    const selectedLocations = JSON.parse(localStorage.getItem('selectedLocations'));
                    const localSearch = searchItems ? searchItems : []
                    dispatch(infActions.infiniteScrollLoader(infItems, first, infItems.length, localSearch, selectedLocations));
                }
            }
        }
    }

    createCampaign(selected) {
        const { influencers } = this.props;
        const influencer = influencers.items ? influencers.items[selected] : null;
        if (influencer) {
            this.sendData(3, influencers.items, selected);
        }
    }

    sendData = (tabIndex, object, index) => {
        // Back to first tab
        this.props.parentCallback(tabIndex, object, index);
    }

    gotoDetail(selected) {
        const { influencers } = this.props;
        const influencer = influencers.items ? influencers.items[selected] : null;
        window.scroll(0, 450);
        if (influencer) {
            this.sendData(1, influencers.items, selected);
        }
        //history.push('/dashboards/basic');
    }

    onCheckboxBtnClick(selected) {
        const index = this.state.cSelected.indexOf(selected);

        if (index < 0) {
            this.state.cSelected.push(selected);
        } else {
            this.state.cSelected.splice(index, 1);
        }

        this.setState({ cSelected: [...this.state.cSelected] });

        const { influencers } = this.props;
        if (influencers && influencers.items) {
            if (this.state.cSelected.length > 1) {
                let items = [];
                this.state.cSelected.map((item, key) => {
                    items.push(influencers.items[item]);
                })

                this.sendData(2, items, null);
            }
        }
    }

    handleCheckBoxChange(event) {

        const { influencers } = this.props;
        const { selectedInfluencers } = this.state;
        const selectedInfluencersLocal = selectedInfluencers;

        const item = event.target.name;
        const isChecked = event.target.checked;

        this.setState(prevState => ({ checkedInfluencers: prevState.checkedInfluencers.set(item, isChecked) }));

        influencers.items.influencer.map((item, key) => {
            if (item.contentItemId === event.target.name && isChecked == true) {
                selectedInfluencersLocal.push(item);
            }
            else if (item.contentItemId === event.target.name && isChecked == false) {
                selectedInfluencersLocal.splice(selectedInfluencersLocal.indexOf(item), 1);
            }
        });

        this.setState({ selectedInfluencers: selectedInfluencersLocal })
    };

    componentDidMount() {

        const { dispatch, influencers, FilterInfluencers } = this.props;
        const { first, searchValue } = this.state;
        window.addEventListener('scroll', this.handleScroll, true);

        const influencerItems = (influencers && influencers.items) ? influencers.items : [];
        const influencersLocal = (FilterInfluencers && FilterInfluencers.length > 0) ? FilterInfluencers : influencerItems;

        if (!influencers.items) {
            dispatch(infActions.getInfluencersByName(first, 0, searchValue));
        }

    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll, true);
    }

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

    showModal = location => {
        this.setState({
            modalVisible: true,
            lastLocation: location
        })
    };

    closeModal = (callback = () => { }) =>
        this.setState(
            {
                modalVisible: false
            },
            callback
        );

    handleConfirmNavigationClick = () =>
        this.closeModal(() => {
            const { lastLocation } = this.state;
            if (lastLocation) {
                this.setState(
                    {
                        confirmedNavigation: true
                    },
                    () => {
                        history.index = -1;
                        // Navigate to the previous blocked location with your navigate function
                        //history.push(lastLocation.pathname);
                        history.replace({ pathname: lastLocation.pathname })
                    }
                );
            }
        });

    render() {

        const { currentItemCount } = this.state;
        const { influencers, FilterInfluencers } = this.props;

        const influencerItems = (influencers && influencers.items) ? influencers.items : [];
        const influencersLocal = (FilterInfluencers && FilterInfluencers.length > 0) ? FilterInfluencers : influencerItems;

        const infItems = influencersLocal;

        const elements = (influencers && influencers.loading) ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] : [];
        return (
            <Fragment>
                <TransitionGroup component="div">
                    <CSSTransition timeout={1500} unmountOnExit appear classNames="TabsAnimation">
                        <div>
                            {
                                influencers && influencers.loading === false ?
                                    <Row>
                                        {
                                            infItems.map((value, index) => {
                                                const strOfReaction = value && value.numberOfReaction ? value.numberOfReaction : '';
                                                const strOfComment = value && value.numberOfComment ? value.numberOfComment : '';
                                                const strOfShare = value && value.numberOfShare ? value.numberOfShare : '';
                                                const numberOfReaction = strOfReaction.charAt(strOfReaction.length - 1) === 'k' ? Number((strOfReaction.substring(0, strOfReaction.length - 1))) * 1000 : Number(strOfReaction);
                                                const numberOfComment = strOfComment.charAt(strOfComment.length - 1) === 'k' ? Number((strOfComment.substring(0, strOfComment.length - 1))) * 1000 : Number(strOfComment);
                                                const numberOfShare = strOfShare.charAt(strOfShare.length - 1) === 'k' ? Number((strOfShare.substring(0, strOfShare.length - 1))) * 1000 : Number(strOfShare);
                                                const engagement = numberOfReaction + (numberOfComment * 2) + (numberOfShare * 3)

                                                return (
                                                    <Col key={index} md="4">
                                                        <div className="card mb-3 widget-chart">
                                                            <div className="">
                                                                <Img className="rounded-circle" style={{ maxHeight: '120px', maxWidth: '120px' }} src={value.photo.paths} alt="Avatar" />
                                                                {/* <img className="rounded-circle" style={{ maxHeight: '120px', maxWidth: '120px' }} src={value ? value.photo.paths[1] : default_user} /> */}
                                                            </div>
                                                            <div className="widget-numbers-sm">
                                                                {value.fullName}
                                                            </div>
                                                            <div className="widget-numbers">
                                                                <NumberFormat value={engagement} displayType={'text'} thousandSeparator={true} />
                                                            </div>
                                                            <div className="widget-subheading">
                                                                Engagement
                                                            </div>
                                                            <div className="divider" />
                                                            <ButtonGroup>
                                                                <Button color="info" onClick={() => this.gotoDetail(index)}><Trans>Detail</Trans></Button>
                                                                <Button color="success" onClick={() => this.onCheckboxBtnClick(index)}
                                                                    active={this.state.cSelected.includes(index)}><Trans>Compare</Trans></Button>
                                                                <Button color="warning" onClick={() => this.createCampaign(index)}><Trans>Campaign</Trans></Button>
                                                            </ButtonGroup>
                                                        </div>
                                                    </Col>
                                                )
                                            })
                                        }
                                    </Row>
                                    :
                                    <Row>
                                        {
                                            elements.map((value, index) => {
                                                return (
                                                    <Col key={index} md="4">
                                                        <div className="">
                                                            <div className="icon-wrapper rounded-circle">
                                                                <div className="icon-wrapper-bg bg-white opacity-10" />
                                                                <Skeleton circle={true} />
                                                            </div>
                                                            <div className="">
                                                                <SkeletonTheme color="#d1cfcf" highlightColor="#999999">
                                                                    <p>
                                                                        <Skeleton />
                                                                    </p>
                                                                </SkeletonTheme>
                                                            </div>
                                                            <div className="">
                                                                <SkeletonTheme color="#d1cfcf" highlightColor="#999999">
                                                                    <p>
                                                                        <Skeleton />
                                                                    </p>
                                                                </SkeletonTheme>
                                                            </div>
                                                            <div className="widget-description">
                                                                <SkeletonTheme color="#d1cfcf" highlightColor="#999999">
                                                                    <p>
                                                                        <Skeleton count={2} />
                                                                    </p>
                                                                </SkeletonTheme>
                                                            </div>
                                                            <div className="divider" />
                                                        </div>
                                                    </Col>
                                                )
                                            })
                                        }
                                    </Row>
                            }
                        </div>
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

const connectedInfluencers = connect(mapStateToProps)(Influencers);
export { connectedInfluencers as Influencers };
//export default Influencers;
