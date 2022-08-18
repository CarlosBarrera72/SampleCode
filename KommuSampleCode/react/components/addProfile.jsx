import React from 'react';
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import debug from 'sabio-debug';
import profile from '../../services/userProfileSerivce';
import frontEndValidation from '../../schema/userProfileSchema';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import FileUploader from '../fileuploader/FileUploader';
//import { SelectionState } from 'draft-js';

const _logger = debug.extend('AddProfile');

function AddProfile() {
    const [formData, setFormData] = useState({
        FirstName: '',
        LastName: '',
        Mi: '',
        AvatarUrl: '',
    });

    const navigate = useNavigate();

    const onHandleUploadSuccess = (data) => {
        _logger('File Upload Success', data.items);
        setFormData((prevState) => {
            const target = { ...prevState };
            target.AvatarUrl = data.items[0].url;
            debugger;
            return target;
        });
    };

    const handleSubmit = (values) => {
        _logger('submit was clicked', values);
        profile.addProfile(values).then(onAddProfileSucces).catch(onAddProfileError);
    };

    const onAddProfileSucces = (response) => {
        _logger('response from add', response);
        navigate('/user/profile');
    };

    const onAddProfileError = (err) => {
        _logger('error from add', err);
    };

    _logger('profile state', formData);
    return (
        <div className="container">
            <div className="row">
                <div className="col" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Formik
                        enableReinitialize={true}
                        initialValues={formData}
                        onSubmit={handleSubmit}
                        validationSchema={frontEndValidation}>
                        <Form style={{ paddingTop: '50px', paddingBottom: '50px' }}>
                            <div className="form-group">
                                <label htmlFor="AvatarUrl">Profile Image</label>
                                <br />
                                <FileUploader onHandleUploadSuccess={onHandleUploadSuccess}></FileUploader>
                            </div>
                            <div className="form-group">
                                <label htmlFor="FirstName">First Name</label>
                                <br />
                                <Field type="text" name="FirstName" className="form-control" />
                                <ErrorMessage name="FirstName" component="div" className="alert alert-danger" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="LastName">Last Name</label>
                                <br />
                                <Field type="text" name="LastName" className="form-control" />
                                <ErrorMessage name="LastName" component="div" className="alert alert-danger" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Mi">Middle Initial</label>
                                <br />
                                <Field type="text" name="Mi" className="form-control" />
                                <ErrorMessage name="Mi" component="div" className="alert alert-danger" />
                            </div>
                            <br />
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </Form>
                    </Formik>
                    <div className="imageUploader"></div>
                </div>
            </div>
        </div>
    );
}

AddProfile.propTypes = {
    currentUser: PropTypes.shape({
        id: PropTypes.number,
        roles: PropTypes.arrayOf(PropTypes.string),
        email: PropTypes.string,
        isLoggedIn: PropTypes.bool,
    }),
};

export default AddProfile;
