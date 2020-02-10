import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import Autocomplete from 'react-autocomplete'

class LocationSearchBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeSearch: false,
            searchValue: '',
            value: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.keyPressed = this.keyPressed.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    keyPressed(event) {
        debugger;
        const searchValue = event.value;
        //const { activeSearch, searchValue } = this.state
        if (searchValue) {
            this.props.handlerSearchFromParent(searchValue)
            this.setState({ selectedValue: searchValue });
        }
    }

    render() {
        const { activeSearch, searchValue } = this.state
        return (
            <Fragment>
                <Autocomplete
                    getItemValue={(item) => item.label}
                    items={[
                        { label: 'Male' },
                        { label: 'Hue' },
                        { label: 'Ho Chi Minh' },
                    ]}
                    renderItem={(item, isHighlighted) =>
                        <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                            {item.label}
                        </div>
                    }
                    value={this.state.value}
                    onChange={(event, value) => this.setState({ value })}
                    onSelect={value => { this.setState({ value }); this.props.handlerSearchFromParent(value) }}
                //onSelect={value => this.keyPressed({ value })}
                />
            </Fragment>
        )
    }
}
function mapStateToProps(state) {
    //
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

const connectedLocationSearchBox = connect(mapStateToProps)(LocationSearchBox);
export { connectedLocationSearchBox as LocationSearchBox };
//export default SearchBox;