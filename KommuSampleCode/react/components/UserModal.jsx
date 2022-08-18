import React, { useState } from 'react';
import AddUserModal from './AddUserModal';
import debug from 'sabio-debug';
import PropTypes from 'prop-types';

const _logger = debug.extend('UserModal');

function UserModal(props) {
    const [isOpen, setOpen] = useState(false);

    const toggleModal = () => {
        if (!isOpen) {
            setOpen(true);
        } else {
            setOpen(false);
        }
        _logger('toggle clicked', isOpen);
    };
    const userModalProfile = props.profile;
    const currentUser = props.currentUser;
    const updateFunction = props.setProfile;

    return (
        <React.Fragment>
            <button className="btn btn-primary" onClick={toggleModal}>
                Settings
            </button>
            <AddUserModal
                profile={userModalProfile}
                currentUser={currentUser}
                setProfile={updateFunction}
                isOpen={isOpen}
                toggleModal={toggleModal}
            />
        </React.Fragment>
    );
}
UserModal.propTypes = {
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

export default UserModal;
