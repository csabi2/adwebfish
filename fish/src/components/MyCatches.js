import React from "react";
import CatchActions from "../actions/CatchActions";
import catchStore from "../store/Catches";
import LocationActions from "../actions/LocationActions";
import {Accordion, Button, Card, Table} from "react-bootstrap";
import constants from "../Constants";


class MyCatches extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            catches: [
                {
                    location: {
                        name: ''
                    }

                }
            ],
            filter: {
                fisherman: constants.default_demo_profile_id
            }
        };
        this.onChangeOfCatches = this.onChangeOfCatches.bind(this);

    }

    onChangeOfCatches(){
        this.setState({
            catches: catchStore._catches,
        });
    }

    componentDidMount() {
        catchStore.addChangeListener(this.onChangeOfCatches);
        LocationActions.getLocations();
        CatchActions.getCatch(this.state.filter);
    }

    componentWillUnmount() {
        catchStore.removeChangeListener(this.onChangeOfCatches);
    }


    render() {

        let tableContent;
        if(this.state.catches.length > 0 ){
            tableContent = this.state.catches.map((item) =>{
                return (
                    <tr id={item.id}>
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
            tableContent = <tr><td colSpan={5} style={{textAlign: "center"}}> <a className={"btn btn-outline-success"} href={"catch"}>Add catch here</a>  </td></tr>;
        }

        return (
            <div id={"mycatches"}>
                <h2>My stuff</h2>

                <table  className={"table table-light table-bordered table-striped"}>
                    <thead>
                    <tr>
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

export default MyCatches;