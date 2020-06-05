import React from "react";
import profile from "../store/ProfileStore";
import ProfileActions from "../actions/ProfileActions";
import {Accordion, Card, Table} from "react-bootstrap";
import equipment_items from "../store/EquipmentStore";
import EquipmentItem from "./EquipmentItem";

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            profile :{},
            equipment: []
        };
        this.onChangeOfProfile = this.onChangeOfProfile.bind(this);
        this.onChangeOfEquipment = this.onChangeOfEquipment.bind(this);
    }
    onChangeOfProfile(){
        this.setState({
            profile: profile._profile,
            equipment: profile._equipment
        });
    }

    onChangeOfEquipment(){
        ProfileActions.getProfile(this.state);
    }

    componentDidMount() {
        profile.addChangeListener(this.onChangeOfProfile);
        equipment_items.addChangeListener(this.onChangeOfEquipment);
    }

    componentWillUnmount() {
        profile.removeChangeListener(this.onChangeOfProfile);
        equipment_items.removeChangeListener(this.onChangeOfEquipment);
    }


    render() {
        const profile = this.state.profile;
        const equipment = this.state.equipment;
        console.log(equipment[0]);
        return (
          <div>
              <Card>
                  <Card.Body>
                      <Card.Title>{profile.firstName} {profile.lastName}</Card.Title>
                      <Card.Text>
                        <Table responsive>
                            <tbody>
                                <tr>
                                    <td>Country: </td>
                                    <td>{profile.country}</td>
                                </tr>
                                <tr>
                                    <td>City: </td>
                                    <td>{profile.city}</td>
                                </tr>
                                <tr>
                                    <td>Address: </td>
                                    <td>{profile.address}</td>
                                </tr>
                                <tr>
                                    <td>Email: </td>
                                    <td>{profile.email}</td>
                                </tr>
                                <tr>
                                    <td>Phone: </td>
                                    <td>{profile.telephone}</td>
                                </tr>
                            </tbody>
                        </Table>
                      </Card.Text>
                  </Card.Body>
              </Card>
              <Card>
                  <Card.Body>
                      <Card.Title>Equipment</Card.Title>
                      <Card.Text>
                              <EquipmentItem/>
                      </Card.Text>
                  </Card.Body>
              </Card>
          </div>
        );
    }
}

export default Profile;