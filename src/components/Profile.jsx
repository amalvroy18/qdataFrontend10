import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faChartPie, faGears, faHouseLaptop, faPowerOff, faTags } from '@fortawesome/free-solid-svg-icons';
import { serverUrl } from '../services/serverUrl';
import { profileUpdateApi } from '../services/allApi';
import { ListGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function Profile() {
    const [userDetails, setUserDetails] = useState({
        username: "",
        profile: null, // Changed from "" to null for better file handling
    });
    const [existingImage, setExistingImage] = useState("");
    const [preview, setPreview] = useState("");
    const [updateStatus, setUpdateStatus] = useState({});
    const [loading, setLoading] = useState(false); // For user feedback
    const [error, setError] = useState(null); // For error messages

    // Handle file input
    const handleFile = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUserDetails((prevDetails) => ({ ...prevDetails, profile: file }));
            setPreview(URL.createObjectURL(file));
        } else {
            setUserDetails((prevDetails) => ({ ...prevDetails, profile: null }));
            setPreview("");
        }
    };

    // Handle profile update
    const handleUpdate = async () => {
        const { username, profile } = userDetails;

        // Basic validation
        if (!username) {
            alert('Please fill in the username.');
            return;
        }

        const reqBody = new FormData();
        reqBody.append("username", username);

        if (profile) {
            reqBody.append("profile", profile);
        } else if (existingImage) {
            reqBody.append("profile", existingImage);
        }

        const token = sessionStorage.getItem("token");

        if (!token) {
            alert("User is not authenticated.");
            return;
        }

        const reqHeader = {
            "Authorization": `Bearer ${token}`,
        };

        setLoading(true);
        setError(null);

        try {
            const result = await profileUpdateApi(reqBody, reqHeader);
            if (result.status === 200) {
                alert("Profile updated successfully.");
                sessionStorage.setItem("existingUser", JSON.stringify(result.data));
                setUpdateStatus(result.data);
            } else {
                setError(`Update failed: ${result.statusText}`);
                alert(`Update failed: ${result.statusText}`);
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            setError("An error occurred while updating the profile.");
            alert("An error occurred while updating the profile.");
        } finally {
            setLoading(false);
        }
    };

    // Handle user logout
    const logout = () => {
        sessionStorage.removeItem("existingUser");
        sessionStorage.removeItem("token");
        window.location.href = "/";
    };

    // Fetch existing user details on component mount or update
    useEffect(() => {
        const existingUser = sessionStorage.getItem("existingUser");
        if (existingUser) {
            const user = JSON.parse(existingUser);
            setUserDetails({
                username: user.username || "",
                profile: null,
            });
            setExistingImage(user.profile || "");
        }
    }, [updateStatus]);

    // Cleanup the object URL to prevent memory leaks
    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    return (
        <div className='p-4 shadow'>
            <div className="d-flex justify-content-between">
                <h3 style={{ color: 'rgb(52, 190, 245)' }}>Profile</h3>
            </div>

            <div className='d-flex justify-content-center align-items-center flex-column mt-3'>
                <label htmlFor='ProfileImg' style={{ cursor: 'pointer' }}>
                    <input
                        type="file"
                        id='ProfileImg'
                        onChange={handleFile}
                        style={{ display: 'none' }}
                        accept="image/*"
                    />
                    <img
                        src={
                            preview
                                ? preview
                                : existingImage
                                    ? `${serverUrl}/uploads/${existingImage}`
                                    : "https://via.placeholder.com/180"
                        }
                        alt="Profile"
                        width={'140px'}
                        height={'140px'}
                        style={{ borderRadius: '50%', objectFit: 'cover' }}
                    />
                </label>

                <div className='w-100 mt-3'>
                    <div className="mb-3">
                        <input
                            type="text"
                            placeholder='Username'
                            className='form-control rounded-5'
                            value={userDetails.username}
                            onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
                        />
                    </div>

                    <div className="mb-3">
                        <button
                            className='btn btn-success w-100'
                            onClick={handleUpdate}
                            disabled={loading}
                        >
                            {loading ? 'Updating...' : 'Update Profile'}
                        </button>
                    </div>

                    {error && (
                        <div className="mb-3">
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        </div>
                    )}

                    <ListGroup variant="flush">
                    <ListGroup.Item action className="fs-5 d-flex align-items-center justify-content-start">
    <FontAwesomeIcon className="me-3" icon={faGears} />
    <span>Settings</span>
</ListGroup.Item>
<ListGroup.Item action className="fs-5 d-flex align-items-center justify-content-start">
    <FontAwesomeIcon className="me-3" icon={faChartPie} />
    <span>Storage Statistics</span>
</ListGroup.Item>
<ListGroup.Item action className="fs-5 d-flex align-items-center justify-content-start">
    <FontAwesomeIcon className="me-3" icon={faTags} />
    <span>Subscription Plans</span>
</ListGroup.Item>
<ListGroup.Item action className="fs-5 d-flex align-items-center justify-content-start">
    <FontAwesomeIcon className="me-3" icon={faBell} />
    <span>Notifications</span>
</ListGroup.Item>
<ListGroup.Item action className="fs-5 d-flex align-items-center justify-content-start">
    <FontAwesomeIcon className="me-3" icon={faHouseLaptop} />
    <span>Device Management</span>
</ListGroup.Item>

<ListGroup.Item action className="fs-5 text-center">
<Button variant="primary" className='w-100' onClick={logout} >
<FontAwesomeIcon className='me-2' icon={faPowerOff} /> Log Out </Button>
</ListGroup.Item>
</ListGroup>
</div>
</div>
</div>
 );
}

export default Profile;
