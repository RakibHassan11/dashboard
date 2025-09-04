import React from 'react';

const UserDetailPage = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <h1>User Details</h1>
      <p>User ID: {params.id}</p>
    </div>
  );
};

export default UserDetailPage;
