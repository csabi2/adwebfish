import React from "react";
import Select from 'react-select';
import locationStore from "../store/Locations";
import filter from "../store/CustomFilter";

class LocationSelect extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state={
            locations : [],
        };
        this.onLocationChange = this.onLocationChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        locationStore.addChangeListener(this.onLocationChange)
    }

    componentWillUnmount() {
        locationStore.removeChangeListener(this.onLocationChange)
    }

    onLocationChange() {
        this.setState({
            locations: locationStore._locations
        })

    }

    handleChange = (selectedOption) => {
        filter.location = selectedOption ? selectedOption.value : '';
    };

    render() {
        return (
            <Select onChange={this.handleChange}
                    options={locationStore._locations.map(entry => {
                        return {value: entry.id, label: entry.name}
                    })}
                    placeholder={"Select location"}
                    isSearchable={true}
                    isClearable={true}/>
        );
    }
}

export default LocationSelect;