import React from 'react';
import PropTypes from 'prop-types';
import debug from 'sabio-debug';

const _logger = debug.extend('ProfileCard');

function ProfileCard(props) {
    const aProfile = props.profile;
    _logger('profile passed in prop', aProfile);
    return (
        <React.Fragment>
            <div className="container">
                <div className="col-md-3">
                    <div className="row">
                        <div className="card">
                            <img src={aProfile.avatarUrl} className="card-img-top" alt="someoneProfile" />
                            <div className="card-body">
                                <h5 className="card-title">
                                    {aProfile.mi
                                        ? `${aProfile.firstName}, ${aProfile.mi}. ${aProfile.lastName}`
                                        : `${aProfile.firstName}, ${aProfile.lastName}`}
                                </h5>
                                <button type="button" className="btn btn-success" style={{ marginLeft: '5px' }}>
                                    Follow
                                </button>
                                <button type="button" className="btn btn-primary" style={{ marginLeft: '5px' }}>
                                    Message
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

ProfileCard.propTypes = {
    profile: PropTypes.shape({
        id: PropTypes.number.isRequired,
        avatarUrl: PropTypes.string.isRequired,
        userId: PropTypes.number.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string,
        mi: PropTypes.string,
    }),
};

export default ProfileCard;
