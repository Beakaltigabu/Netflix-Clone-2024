import React from 'react';
import './ProfileSelect.css';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

const ProfileSelect = ({ onProfileSelect }) => {
    const profiles = [
        { id: 1, name: 'User 1', imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png' },
        { id: 2, name: 'User 2', imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png' },
        { id: 3, name: 'Kids', imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png' },
    ];

    return (
        <div className="profile-select">
            <div className="profile-select__container">
                <h1>Who's watching?</h1>

                <div className="profile-select__profiles">
                    {profiles.map(profile => (
                        <div
                            key={profile.id}
                            className="profile-select__profile"
                            onClick={() => onProfileSelect(profile.id)}
                        >
                            <div className="profile-select__avatar">
                                <img src={profile.imgUrl} alt={profile.name} />
                            </div>
                            <span className="profile-select__name">{profile.name}</span>
                        </div>
                    ))}

                    <div className="profile-select__profile profile-select__add">
                        <div className="profile-select__avatar">
                            <AddIcon />
                        </div>
                        <span className="profile-select__name">Add Profile</span>
                    </div>
                </div>

                <button className="profile-select__manage">
                    <EditIcon /> Manage Profiles
                </button>
            </div>
        </div>
    );
};

export default ProfileSelect;
