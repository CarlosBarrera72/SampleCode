import React, { useEffect } from 'react';
import { useState } from 'react';
import debug from 'sabio-debug';
import profiles from '../../services/userProfileSerivce';
import ProfileCard from './ProfileCard';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import { Formik, Form, Field } from 'formik';

const _logger = debug.extend('Profile');

function Profiles() {
    const [profileData, setProfileData] = useState({
        profiles: [],
        profilesComponent: [],
        pageIndex: 0,
        pageSize: 4,
        countOfItems: 0,
        current: 1,
    });
    const [query] = useState({ string: '' });

    useEffect(() => {
        const profile = profiles
            .getProfiles(profileData.pageIndex, profileData.pageSize)
            .then(onGetProfileSuccess)
            .catch(onGetProfileErrror);
        _logger('saySomething', profile);
    }, [profileData.pageIndex]);
    const onGetProfileSuccess = (response) => {
        _logger('response', response);
        const profileArray = response.data.item.pagedItems;
        setProfileData((prevState) => {
            const pd = { ...prevState };
            pd.profiles = profileArray;
            pd.profilesComponent = profileArray.map(mapProfile);
            pd.countOfItems = response.data.item.totalCount;
            return pd;
        });
    };

    const onGetProfileErrror = (err) => {
        _logger('err', err);
    };
    _logger('new state', profileData);
    const mapProfile = (aProfile) => {
        return <ProfileCard profile={aProfile} key={aProfile.id} />;
    };

    const onPaginationClicked = (page) => {
        setProfileData((prevState) => {
            let pg = { ...prevState };
            pg.current = page;
            pg.pageIndex = page - 1;
            return pg;
        });
    };

    const handleSearch = (value) => {
        _logger('i am value', value.string);
        profiles
            .searchProfile(profileData.pageIndex, profileData.pageSize, value.string)
            .then(onSearchSuccess)
            .catch(onSearchError);
    };

    const onSearchSuccess = (response) => {
        const profileArray = response.data.item.pagedItems;
        setProfileData((prevState) => {
            const pd = { ...prevState };
            pd.profiles = profileArray;
            pd.profilesComponent = profileArray.map(mapProfile);
            pd.countOfItems = response.data.item.totalCount;
            return pd;
        });
    };

    const onSearchError = (err) => {
        _logger(err);
    };

    _logger('profile state', profileData);
    return (
        <React.Fragment>
            <Formik enableReinitialize={true} initialValues={query} onSubmit={handleSearch}>
                <Form style={{ paddingLeft: '25px', paddingRight: '25px' }}>
                    <div className="form-group">
                        <label htmlFor="string">Search...</label>
                        <br />
                        <Field type="text" name="string" className="form-control" />
                    </div>
                    <br></br>
                    <button type="submit" className="btn btn-primary">
                        Search
                    </button>
                </Form>
            </Formik>
            <container className="Profiles">
                <div
                    className="cardItems"
                    style={{ display: 'flex', flexWrap: 'wrap', paddingTop: '50px', paddingLeft: '25px' }}>
                    <div className="col">
                        <div className=".img-profile">{profileData.profilesComponent}</div>
                    </div>
                </div>
            </container>
            <div className="row"></div>
            <Pagination
                style={{ paddingBottom: '25px' }}
                onChange={onPaginationClicked}
                current={profileData.current}
                pageSize={profileData.pageSize}
                total={profileData.countOfItems}
            />
        </React.Fragment>
    );
}

export default Profiles;
