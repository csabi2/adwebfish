import React from "react";
import profile from "../store/ProfileStore";
import {Card, Accordion, Button} from "react-bootstrap";
import EquipmentActions from "../actions/EquipmentActions";

class EquipmentItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            equipment: []
        };
        this.onChangeOfEquipment = this.onChangeOfEquipment.bind(this);
    }
    onChangeOfEquipment(){
        this.setState({
            equipment: profile._equipment
        });
    }


    componentDidMount() {
        profile.addChangeListener(this.onChangeOfEquipment);
        EquipmentActions.getEquipmentItems();
    }

    componentWillUnmount() {
        profile.removeChangeListener(this.onChangeOfEquipment);
    }


    render() {
        const equipment = this.state.equipment;
        return (
            equipment.map((item) => {
                return (
                    <Accordion defaultActiveKey={"-1"}>
                    <Card>
                        <Card.Header>
                            {item.name}<br/>
                            <Accordion.Toggle as={Button} variant={"link"} eventKey={item.id}>
                                More...
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey={item.id}>
                            <Card.Body>
                                <h3>General description</h3>
                                {item.general_description}

                                <h3>My Story</h3>
                                {item.personal_description}
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    </Accordion>
                );
            })
        );
    }
};

export default EquipmentItem;
