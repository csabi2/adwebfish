import React from "react";
import CatchActions from "../actions/CatchActions";
import catchStore from "../store/Catches";
import Filter from "./Filter";
import LocationActions from "../actions/LocationActions";
import FishermanActions from "../actions/FishermanActions";
import {Accordion, Button, Card, Table} from "react-bootstrap";
import fishermanStore from "../store/FishermanStore";
import locationStore from "../store/Locations";


class CatchList extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            catches: [],
            locations: false,
            fishermen: false
        };
        this.onChangeOfCatches = this.onChangeOfCatches.bind(this);
        this.onChangeOfFishermen = this.onChangeOfFishermen.bind(this);
        this.onChangeOfLocations = this.onChangeOfLocations.bind(this);
    }

    onChangeOfCatches(){
        this.setState({
            catches: catchStore._catches,
        });
    }

    onChangeOfFishermen(){

        this.setState({
            fishermen: true
        });
        console.log(fishermanStore._fishermen);
        if(this.state.locations){
            CatchActions.getCatch(this.state);
        }
    }

    onChangeOfLocations(){

        this.setState({
            locations: true
        });
        console.log(locationStore._locations);
        if(this.state.fishermen){
            CatchActions.getCatch(this.state);
        }
    }

    componentDidMount() {
        catchStore.addChangeListener(this.onChangeOfCatches);
        fishermanStore.addChangeListener(this.onChangeOfFishermen);
        locationStore.addChangeListener(this.onChangeOfLocations);

        LocationActions.getLocations();
        FishermanActions.getAllFisherman();
    }

    componentWillUnmount() {
        catchStore.removeChangeListener(this.onChangeOfCatches);
        locationStore.removeChangeListener(this.onChangeOfLocations);
        fishermanStore.removeChangeListener(this.onChangeOfFishermen);
    }


    render() {

        let tableContent;
        if(this.state.catches.length > 0 ){
            console.log(this.state.catches);
            tableContent = this.state.catches.map((item) =>{
                return (
                    <tr id={item.id}>
                        <td>
                            <Accordion>
                                <Card>
                                    <Card.Header>
                                        <Accordion.Toggle as={Button} variant={"link"} eventKey="0">
                                            {item.fisherman.firstName} {item.fisherman.lastName}
                                        </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body>
                                            <Table responsive>
                                                <tr>
                                                    <td>Country</td>
                                                    <td>{item.fisherman.country}</td>
                                                </tr>
                                                <tr>
                                                    <td>City</td>
                                                    <td>{item.fisherman.city}</td>
                                                </tr>
                                                <tr>
                                                    <td>Address</td>
                                                    <td>{item.fisherman.address}</td>
                                                </tr>
                                                <tr>
                                                    <td>Country</td>
                                                    <td>{item.fisherman.email}</td>
                                                </tr>
                                                <tr>
                                                    <td>Country</td>
                                                    <td>{item.fisherman.telephone}</td>
                                                </tr>
                                            </Table>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                        </td>
                        <td><Accordion>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant={"link"} eventKey="0">
                                        {item.location.name}
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <Table responsive>
                                            <tr>
                                                <td>Coordinates</td>
                                                <td>{item.location.coordinates}</td>
                                            </tr>
                                        </Table>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion></td>
                        <td>{item.timestamp}</td>
                        <td>{item.species}</td>
                        <td>{item.weight} g</td>
                    </tr>
                )
            });
        }
        else {
            tableContent = <tr><td colSpan={5}>No results</td></tr>;
        }

        return (
            <div id={"catches"}>
                <Filter/>
                <table  className={"table table-light table-bordered table-striped"}>
                    <thead>
                    <tr>
                        <th>Fisherman</th>
                        <th>Location</th>
                        <th>Timestamp</th>
                        <th>Species</th>
                        <th>Weight</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tableContent}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default CatchList;