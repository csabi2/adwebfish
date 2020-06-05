import React from "react";
import Select from 'react-select';
import fishermanStore from "../store/FishermanStore";
import filter from "../store/CustomFilter";

class FishermanSelect extends React.Component {

    constructor() {
        super();
        this.state={
            fishermen : []
        };
        this.handleChange = this.handleChange.bind(this);
        this.onFishermanChange = this.onFishermanChange.bind(this);
    }

    componentDidMount() {
        fishermanStore.addChangeListener(this.onFishermanChange)
    }

    componentWillUnmount() {
        fishermanStore.removeChangeListener(this.onFishermanChange)
    }

    onFishermanChange() {
        this.setState({
            locations: fishermanStore._fishermen
        })
    }

    handleChange = (selectedOption) => {
        filter.fisherman = selectedOption ? selectedOption.value : '';
    };

    render() {

        return (
            <Select
                onChange={this.handleChange}
                options={fishermanStore._fishermen.map(entry => {
                return {value: entry.id, label: `${entry.firstName} ${entry.lastName}`}
            })}
                    placeholder={"Select fisherman"}
                    isSearchable={true}
                    isClearable={true}/>
        );
    }
}

export default FishermanSelect;