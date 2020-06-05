import React from "react";
import {Nav, NavDropdown} from "react-bootstrap";
import ProfileActions from "../actions/ProfileActions";
import profile from "../store/ProfileStore";
import constants from "../Constants";
import filter from "../store/CustomFilter";

class MenuRight extends React.Component{
    constructor(props, context) {
        super(props, context);
        this.state={
            id: constants.default_demo_profile_id,
            profile: {
                firstName: 'Loading...',
                lastName: ''
            }
        };
        this.onChangeOfProfile = this.onChangeOfProfile.bind(this);
    }
    onChangeOfProfile(){
        this.setState({
            profile: profile._profile,
        });
    }

    componentDidMount() {
        profile.addChangeListener(this.onChangeOfProfile);
        ProfileActions.getPersonal(this.state);
    }

    componentWillUnmount() {
        profile.removeChangeListener(this.onChangeOfProfile);
    }

    render() {
            return (
                <Nav>
                    <NavDropdown alignRight title={`${this.state.profile.firstName} ${this.state.profile.lastName}`} id="basic-nav-dropdown" >
                        <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                        <NavDropdown.Item href={"/MyCatches"}>My catches</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            );
        }
}

export default MenuRight;

