import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import {
    Row, Col, Card, CardBody
} from 'reactstrap';
class PageTitleCategory extends Component {

    render() {
        let {
            enablePageTitleIcon,
            heading,
            icon,
        } = this.props;

        return (

            <div className="app-page-title">
                <div className="page-title-wrapper">
                    <div className="page-title-heading">
                    <div className="font-icon-wrapper font-icon-lg">
                                    <i className="pe-7s-filter icon-gradient bg-warm-flame"> </i>
                                </div>
                        {/* <div>
                            <CardBody>
                                <Row>

                                    <Col md="12" className={cx("font-icon-wrapper font-icon-lg", { 'd-none': !enablePageTitleIcon })}>

                                        <i className={icon} />

                                    </Col>
                                </Row>
                            </CardBody>
                        </div> */}


                        {/* <Row>
                            <div>
                                {heading}
                            </div>
                        </Row> */}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    enablePageTitleIcon: state.theme.enablePageTitleIcon,
    enablePageTitleSubheading: state.theme.enablePageTitleSubheading,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PageTitleCategory);