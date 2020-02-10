import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { createGenderSearching } from '../../../../_models/CommonModels';
//import cx from 'classnames';
//import Autocomplete from 'react-autocomplete'

class GenderSearchBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeSearch: false,
            searchValue: '',
            selectedOptionGender: {},
            isClearable: true,
        };

        this.handleOptionGenderChange = this.handleOptionGenderChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.keyPressed = this.keyPressed.bind(this);
    }

    handleOptionGenderChange = selectedOptionGender => {
        const searchValue = selectedOptionGender ? selectedOptionGender.value : ''
        this.setState({ selectedOptionGender });
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
        const { selectedOptionGender, isClearable } = this.state
        const options = createGenderSearching();
        return (
            <Fragment>
                <div style={{ minWidth: '120px', marginLeft: '12px' }}>
                    <Select
                        maxMenuHeight={200}
                        isClearable={isClearable}
                        //value={selectedOptionGender}
                        onChange={this.handleOptionGenderChange}
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
    const { campaigns, influencers, interestings, jobCategories, jobs, brands } = state;
    //const { brand } = influencers;
    return {
        //loggingIn,
        brands,
        jobs,
        jobCategories,
        interestings,
        campaigns,
        influencers
    };
}

const connectedGenderGenderSearchBox = connect(mapStateToProps)(GenderSearchBox);
export { connectedGenderGenderSearchBox as GenderSearchBox };
//export default SearchBox;