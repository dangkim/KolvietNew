import React, {Fragment} from 'react';
import {
    CSSTransition,
    TransitionGroup,
  } from 'react-transition-group';
import {
    Row, Col,
    Card, CardBody,
    CardTitle
} from 'reactstrap';

import TooltipExampleDark from './TooltipDark';
import TooltipExampleLight from './TooltipLight';


const TooltipsExample = (props) => {
    return (
        <Fragment>
            <TransitionGroup
                component="div"
                transitionName="TabsAnimation"
                transitionAppear={true}
                transitionAppearTimeout={0}
                transitionEnter={false}
                transitionLeave={false}>
                <Row>
                    <Col lg="6">
                        <Card className="main-card mb-3">
                            <CardBody>
                                <CardTitle>Dark Tooltips</CardTitle>
                                <TooltipExampleDark/>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg="6">
                        <Card className="main-card mb-3">
                            <CardBody>
                                <CardTitle>Light Tooltips</CardTitle>
                                <TooltipExampleLight/>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </TransitionGroup>
        </Fragment>
    );
};

export default TooltipsExample;
