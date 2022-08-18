import React, { useCallback } from 'react';
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import debug from 'sabio-debug';
import profile from '../../services/userProfileSerivce';
import frontEndValidation from '../../schema/userProfileSchema';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import FileUploader from '../fileuploader/FileUploader';

const _logger = debug.extend('AddProfile');

function UpdateProfile(props) {
    const currentProfile = props.profile;
    const currentUser = props.currentUser;
    const setProfile = props.setProfile;
    const [formData, setFormData] = useState({
        id: currentProfile.id,
        UserId: currentUser.id,
        FirstName: currentProfile.firstName,
        LastName: currentProfile.lastName,
        mi: currentProfile.mi,
        AvatarUrl: currentProfile.AvatarUrl,
    });

    _logger('modal clicked', currentProfile);

    const onHandleUploadSuccess = (data) => {
        _logger('File Upload Success', data.items);
        setFormData((prevState) => {
            const target = { ...prevState };
            target.AvatarUrl = data.items[0].url;
            return target;
        });
    };

    const handleSubmit = useCallback((values) => {
        _logger('submit was clicked', values);
        profile.updateProfile(values).then(onUpdateProfileSucces).catch(onUpdateProfileError);
        setProfile((prevState) => {
            let pd = { ...prevState };
            pd.firstName = values.FirstName;
            pd.lastName = values.LastName;
            pd.mi = values.mi;
            pd.AvatarUrl = formData.AvatarUrl;
            return pd;
        });
    });

    const customId = 'update-id-yes';
    const newCustomId = 'err-id-yes';

    const onUpdateProfileSucces = (response) => {
        _logger('response from update', response);
        toast.success('Your profile has been updated', { toastId: customId });
    };

    const onUpdateProfileError = (err) => {
        toast.error(err, { toastId: newCustomId });
    };

    _logger('profile state', formData);
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <Formik
                        enableReinitialize={true}
                        initialValues={formData}
                        onSubmit={handleSubmit}
                        validationSchema={frontEndValidation}>
                        <Form>
                            <div className="form-group">
                                <label htmlFor="">Profile Image</label>
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
                                <Field type="text" name="mi" className="form-control" />
                                <ErrorMessage name="mi" component="div" className="alert alert-danger" />
                            </div>
                            <br />
                            <button type="submit" className="btn btn-primary">
                                Update
                            </button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
}

UpdateProfile.propTypes = {
    currentUser: PropTypes.shape({
        id: PropTypes.number,
        roles: PropTypes.arrayOf(PropTypes.string),
        email: PropTypes.string,
        isLoggedIn: PropTypes.bool,
    }),
    profile: PropTypes.shape({
        id: PropTypes.number,
        UserId: PropTypes.number,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        mi: PropTypes.string,
        AvatarUrl: PropTypes.string,
    }),
    setProfile: PropTypes.func,
};

export default UpdateProfile;
