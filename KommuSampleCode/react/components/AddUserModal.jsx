import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';
import UpdateProfile from '../userproflies/UpdateProfile';

function AddUserModal(props) {
    const isOpen = props.isOpen;
    const toggle = props.toggleModal;

    const addUserModalProfile = props.profile;
    const currentUser = props.currentUser;
    const updateProfile = props.setProfile;

    return (
        <React.Fragment>
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}>Update Profile</ModalHeader>
                <ModalBody>
                    <UpdateProfile profile={addUserModalProfile} currentUser={currentUser} setProfile={updateProfile} />
                </ModalBody>
                <ModalFooter></ModalFooter>
            </Modal>
        </React.Fragment>
    );
}

AddUserModal.propTypes = {
    isOpen: PropTypes.bool,
    toggleModal: PropTypes.func,
    title: PropTypes.string,
    content: PropTypes.string,
};

AddUserModal.propTypes = {
    profile: PropTypes.shape({
        id: PropTypes.number,
        roles: PropTypes.arrayOf(PropTypes.string),
        email: PropTypes.string,
        isLoggedIn: PropTypes.bool,
    }),
    currentUser: PropTypes.shape({
        id: PropTypes.number,
        roles: PropTypes.arrayOf(PropTypes.string),
        email: PropTypes.string,
        isLoggedIn: PropTypes.bool,
    }),
    setProfile: PropTypes.func,
};
export default AddUserModal;
