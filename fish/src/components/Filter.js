import React from "react";
import LocationSelect from "./LocationSelect";
import FishermanSelect from "./FishermanSelect";
import CatchActions from "../actions/CatchActions";
import filter from "../store/CustomFilter";

class Filter extends React.Component {



    render() {
        return (
            <form id = "filter">
                <LocationSelect />
                <FishermanSelect />
                <button className="btn btn-outline-success" onClick={(e) => {e.preventDefault(); CatchActions.getCatch(filter)}}>Search</button>
            </form>

        );
    }
}

export default Filter