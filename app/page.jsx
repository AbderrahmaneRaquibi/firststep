'use client';
import { useEffect, useState } from 'react';

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users/getusers');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // Set loading to false once the data is fetched
      }
    };

    // Fetch users when the component mounts
    fetchUsers();

    // Polling every 5 seconds to check for new users
    const intervalId = setInterval(fetchUsers, 5000);

    // Clear the interval when the component unmounts to avoid memory leaks
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to ensure this runs once on mount

  if (loading) {
    return <div>Loading users...</div>; // Show loading text or spinner
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Users List</h1>
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {user.username} - {user.email} - {new Date(user.createdAt).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
