import React from "react";
import CatchActions from "../actions/CatchActions";
import LocationActions from "../actions/LocationActions";
import LocationSelect from "./LocationSelect";
import constants from "../Constants";
import filter from "../store/CustomFilter";
import MessageActions from "../actions/MessageActions";


class CatchForm extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state={
            fisherman: constants.default_demo_profile_id,
            species : '',
            weight : ''
        };
    }

    componentDidMount() {
        LocationActions.getLocations();
    }

    handleSubmit(event) {
        event.preventDefault();
        if(this.validateForm()){
            CatchActions.postCatch({
                fisherman: this.state.fisherman,
                location: filter.location,
                species: this.state.species,
                weight: this.state.weight
            });
            this.clearForm();
        }
        else {
            MessageActions.toggleMessage({
                show: true,
                text: 'Please fill all fields!'
            })

        }
    };

    validateForm = () => {
      return this.state.weight && this.state.species && filter.location && filter.location !== '';
    };

    clearForm = () => {
        this.setState({
            location: '',
            species: '',
            weight: ''
        });
    };

    render() {
       return(
           <form id={"catchForm"} >
               <h2>Record Catch</h2>
               <div className="form-group">
                   <label htmlFor="location">Location</label>
                   <LocationSelect/>
               </div>
               <div className="form-group">
                   <label htmlFor="species">Species</label>
                   <input required type="text"  value={this.state.species}  className="form-control" id="species"
                          placeholder="Species of the fish"
                          onChange={(e)=>{
                              this.setState({species : e.target.value});
                          }}/>
               </div>
               <div className="form-group">
                   <label htmlFor="weight">Weight</label>
                   <input required type="number" value={this.state.weight} className="form-control" id="weight"
                          placeholder="Weight of the fish in grams"
                          onChange={(e)=>{
                              this.setState({weight : e.target.value > 0 ? e.target.value : ''});
                          }}/>
               </div>
               <button style={{width: "70%"}} type="submit" className="btn btn-outline-primary" onClick={(e) => this.handleSubmit(e)}>Submit</button>
           </form>
       );
    }
}

export default CatchForm;

