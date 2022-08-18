import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import debug from 'sabio-debug';
import UserModal from '../modal/UserModal';
import current from '../../services/userProfileSerivce';
import { getCreateby } from '../../services/listingService';
import { ToastContainer, toast } from 'react-toastify';
import { FaFacebookF, FaGoogle, FaTwitter } from 'react-icons/fa';

const _logger = debug.extend('ProfileCard');

function UserBox(props) {
    const [profile, setProfile] = useState({
        id: 0,
        userId: 1,
        firstName: 'someFirstName',
        lastName: 'someLastName',
        mi: 'SN',
        AvatarUrl: 'https://th.bing.com/th/id/R.833bc16d0f23624f1245633412b024ef?rik=FMvIVRdOCc29ng&pid=ImgRaw&r=0',
        pageIndex: 0,
        pageSize: 5,
    });
    const [listingData, setListingData] = useState({
        id: 0,
        accessType: {},
        bath: 0,
        bedRooms: 0,
        checkInTime: '',
        checkOutTime: '',
        costPerNight: 0,
        costPerWeek: 0,
        createdBy: 0,
        description: '',
        guestCapacity: 0,
        housingType: {},
        shortDescription: '',
        title: '',
    });

    const navigate = useNavigate();

    const currentUser = props.currentUser;
    _logger('Iam current user', currentUser);

    useEffect(() => {
        const currentProfile = current.getCurrentProfile().then(onGetCurrentSuccess).catch(onGetCurrentError);
        _logger(currentProfile);
    }, [profile.firstName]);

    const onGetListtingSuccess = (response) => {
        _logger('Listing respnse', response);
        const listingInfo = response.data.item.pagedItems[0];
        setListingData((prevState) => {
            let ld = { ...prevState };
            ld.id = listingInfo.id;
            ld.accessType = listingInfo.accesType;
            ld.bath = listingInfo.baths;
            ld.bedRooms = listingInfo.bedRooms;
            ld.checkInTime = listingInfo.checkInTime;
            ld.checkOutTime = listingInfo.checkOutTime;
            ld.costPerNight = listingInfo.costPerNight;
            ld.costPerWeek = listingInfo.costPerWeek;
            ld.description = listingInfo.description;
            ld.shortDescription = listingInfo.shortDescription;
            ld.housingType = listingInfo.housingType;

            return ld;
        });
    };

    const onUsersClicked = () => {
        navigate('/view/users');
    };

    _logger('I am listing data', listingData);
    const customId = 'listing-id-yes';

    const onGetListtingErr = (err) => {
        _logger('listing err', err);

        toast.warning('No listing information Please add your listing', { toastId: customId });
    };
    const onGetCurrentSuccess = (response) => {
        const userListing = getCreateby(profile.pageIndex, profile.pageSize, response.data.item.userId)
            .then(onGetListtingSuccess)
            .catch(onGetListtingErr);
        _logger(userListing);
        setProfile((prevState) => {
            _logger('I am response', response);
            const pd = { ...prevState };
            pd.AvatarUrl = response.data.item.avatarUrl;
            pd.firstName = response.data.item.firstName;
            pd.lastName = response.data.item.lastName;
            pd.mi = response.data.item.mi;
            pd.id = response.data.item.id;
            pd.userId = response.data.item.userId;
            _logger('checkout changes', pd);
            return pd;
        });
    };

    _logger('i am current profile', profile);

    const onGetCurrentError = (err) => {
        _logger('I am error', err);
        navigate('/createProfile');
    };
    return (
        <React.Fragment>
            <ToastContainer />
            <div className="NavContainer"></div>
            <div className="imgcontainer" style={{ paddingTop: '50px', paddingInline: '20px' }}>
                <div className="row">
                    <div className="col-3">
                        <Link to={`/listing/view/${listingData.id}`}>
                            <img
                                src="https://i1.wp.com/www.designlike.com/wp-content/uploads/2018/03/new-home-1633889_1920.jpg"
                                className="img-thumbnail"
                                alt=""
                            />
                        </Link>
                    </div>
                    <div className="col-3">
                        <Link to={`/listing/view/${listingData.id}`}>
                            <img
                                src="https://downloadhdwallpapers.in/wp-content/uploads/2018/01/Luxury-Home-at-Night-1920x1200.jpg"
                                className="img-thumbnail"
                                alt=""
                            />
                        </Link>
                    </div>
                    <div className="col-3">
                        <Link to={`/listing/view/${listingData.id}`}>
                            <img
                                src="https://i1.wp.com/www.designlike.com/wp-content/uploads/2018/03/new-home-1633889_1920.jpg"
                                className=" img-thumbnail"
                                alt=""
                            />
                        </Link>
                    </div>
                    <div className="col-3">
                        <Link to={`/listing/view/${listingData.id}`}>
                            <img
                                src="https://downloadhdwallpapers.in/wp-content/uploads/2018/01/Luxury-Home-at-Night-1920x1200.jpg"
                                className="img-thumbnail"
                                alt=""
                            />
                        </Link>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-12" style={{ paddingTop: '50px' }}>
                        <Card className="text">
                            <Card.Body>
                                <div style={{ float: 'right' }}>
                                    <UserModal profile={profile} currentUser={currentUser} setProfile={setProfile} />
                                    <div style={{ paddingTop: '15px' }}>
                                        {currentUser.roles[0] === 'Admin' ? (
                                            <button type="button" className="btn btn-primary" onClick={onUsersClicked}>
                                                View Users
                                            </button>
                                        ) : (
                                            <p></p>
                                        )}
                                    </div>
                                </div>
                                <h4 className="mb-0 mt-2">
                                    <img
                                        src={profile.AvatarUrl}
                                        className="rounded-circle avatar-lg img-thumbnail"
                                        alt={profile.firstName}
                                    />
                                    {listingData.id === 0
                                        ? `${profile.firstName}`
                                        : `${profile.firstName}'s Bedroom & Bath in ${listingData.bedRooms}/${listingData.bath}`}
                                </h4>
                                <div className="text-start mt-3">
                                    <h4 className="font-13 text-uppercase">Listing Description :</h4>
                                    <p className="text-muted font-13 mb-3">{listingData.description}</p>
                                    <p className="text-muted mb-2 font-13">
                                        <strong>Full Name :</strong>
                                        <span className="ms-2">
                                            {!profile.mi
                                                ? `${profile.firstName}, ${profile.lastName}`
                                                : `${profile.firstName}, ${profile.mi}. ${profile.lastName}`}
                                        </span>
                                    </p>

                                    <p className="text-muted mb-2 font-13">
                                        <strong>Mobile :</strong>
                                        <span className="ms-2">(123) 123 1234</span>
                                    </p>

                                    <p className="text-muted mb-2 font-13">
                                        <strong>Email :</strong>
                                        <span className="ms-2 ">{currentUser.email}</span>
                                    </p>

                                    <p className="text-muted mb-1 font-13">
                                        <strong>Location :</strong>
                                        <span className="ms-2">USA</span>
                                    </p>
                                </div>
                                <ul className="social-list list-inline mt-3 mb-0">
                                    <li className="list-inline-item">
                                        <a
                                            href="/"
                                            className="social-list-item border-primary text-primary d-flex align-items-center justify-content-center">
                                            <FaFacebookF />
                                        </a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a
                                            href="/"
                                            className="social-list-item border-danger text-danger d-flex align-items-center justify-content-center">
                                            <FaGoogle />
                                        </a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a
                                            href="/"
                                            className="social-list-item border-info text-info d-flex align-items-center justify-content-center">
                                            <FaTwitter />
                                        </a>
                                    </li>
                                </ul>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-6" style={{ paddingTop: '50px' }}></div>
                </div>
            </div>
        </React.Fragment>
    );
}

UserBox.propTypes = {
    currentUser: PropTypes.shape({
        id: PropTypes.number,
        roles: PropTypes.arrayOf(PropTypes.string),
        email: PropTypes.string,
        isLoggedIn: PropTypes.bool,
    }),
};

export default UserBox;
