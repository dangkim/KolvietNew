import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { createLocations } from '../../../../_models/CommonModels';
//import cx from 'classnames';
//import Autocomplete from 'react-autocomplete'

class GenderSearchBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeSearch: false,
            searchValue: '',
            selectedOptionLocation: {},
            isClearable: true,
        };

        this.handleOptionLocationChange = this.handleOptionLocationChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.keyPressed = this.keyPressed.bind(this);
    }

    handleOptionLocationChange = selectedOptionLocation => {
        debugger;
        const searchValue = selectedOptionLocation ? selectedOptionLocation.value : ''
        this.setState({ selectedOptionLocation });
        this.props.handlerSearchFromParent(searchValue)
    };

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
        const { selectedOptionLocation, isClearable } = this.state
        const options = createLocations();
        return (
            <Fragment>
                <div style={{ minWidth: '120px', marginLeft: '12px' }}>
                    <Select
                        maxMenuHeight={200}
                        isClearable={isClearable}
                        //value={selectedOptionLocation}
                        onChange={this.handleOptionLocationChange}
                        isMulti={false}
                        placeholder="Gender..."
                        options={options} />
                </div>

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

const connectedLocationGenderSearchBox = connect(mapStateToProps)(GenderSearchBox);
export { connectedLocationGenderSearchBox as GenderSearchBox };
//export default SearchBox;