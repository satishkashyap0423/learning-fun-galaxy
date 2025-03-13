
import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const UserProfile: React.FC = () => {
  const { currentUser, updateUser, theme } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser.name);
  const [age, setAge] = useState(currentUser.age);
  const [type, setType] = useState<'pre-student' | 'student'>(currentUser.type);
  
  const handleSave = () => {
    updateUser({
      name,
      age,
      type
    });
    setIsEditing(false);
  };

  const avatars = ['👦', '👧', '👨', '👩', '🧒', '👶', '🧑'];
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
  
  const getAgeGroupLabel = (type: 'pre-student' | 'student') => {
    return type === 'pre-student' ? 'Pre-Student (Ages 3-5)' : 'Student (Ages 6-8)';
  };
  
  if (isEditing) {
    return (
      <div className={`p-6 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-lg shadow-lg`}>
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
        
        <div className="mb-4 text-center">
          <div className="text-7xl mb-4">{selectedAvatar}</div>
          <div className="flex justify-center gap-2">
            {avatars.map((avatar, index) => (
              <button 
                key={index} 
                onClick={() => setSelectedAvatar(avatar)}
                className={`text-2xl p-2 rounded-full ${selectedAvatar === avatar ? 'bg-blue-100' : ''}`}
              >
                {avatar}
              </button>
            ))}
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-2 border rounded-lg w-full text-black"
          />
        </div>
        
        <div className="mb-4">
          <label className="block font-medium mb-1">Age</label>
          <input
            type="number"
            min={3}
            max={8}
            value={age}
            onChange={(e) => setAge(parseInt(e.target.value))}
            className="px-4 py-2 border rounded-lg w-full text-black"
          />
        </div>
        
        <div className="mb-6">
          <label className="block font-medium mb-1">Learning Level</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as 'pre-student' | 'student')}
            className="px-4 py-2 border rounded-lg w-full text-black"
          >
            <option value="pre-student">Pre-Student (Ages 3-5)</option>
            <option value="student">Student (Ages 6-8)</option>
          </select>
        </div>
        
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-6 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-lg shadow-lg`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Profile</h2>
        <button
          onClick={() => setIsEditing(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Edit
        </button>
      </div>
      
      <div className="flex flex-col items-center mb-6">
        <div className="text-7xl mb-2">{selectedAvatar}</div>
        <h3 className="text-xl font-semibold">{currentUser.name}</h3>
        <p className="text-gray-500">Age: {currentUser.age}</p>
        <p className="text-gray-500">{getAgeGroupLabel(currentUser.type)}</p>
      </div>
      
      <div className="mb-4">
        <h3 className="font-bold mb-2">Learning Progress</h3>
        <div className={`p-4 ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-700'} rounded-lg`}>
          {Object.keys(currentUser.progress).length === 0 ? (
            <p className="text-center text-gray-500">No progress yet. Start learning!</p>
          ) : (
            <div className="space-y-2">
              {Object.entries(currentUser.progress).map(([module, data]) => (
                <div key={module} className="flex justify-between items-center">
                  <span>{module.charAt(0).toUpperCase() + module.slice(1).replace('-', ' ')}</span>
                  <div className="flex">
                    {[...Array(3)].map((_, index) => (
                      <span key={index} className="text-xl">
                        {index < data.stars ? '⭐' : '☆'}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="p-4 bg-green-100 text-green-800 rounded-lg">
        <p className="font-medium">Keep Learning!</p>
        <p className="text-sm mt-1">Complete more activities to earn stars and track your progress.</p>
      </div>
    </div>
  );
};

export default UserProfile;
