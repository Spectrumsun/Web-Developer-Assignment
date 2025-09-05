import './index.scss';

import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../../api";
import LoadingDots from '../../components/Loader';
import type { User } from '../../api';
import { AdderKey } from '../../api';
import { useNavigate } from "react-router-dom";

interface UsersListProps {
  pageNumber: number;
  pageSize: number;
}


const Users = () => {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const { data: users, isLoading, error, refetch } = useQuery({
    queryKey: ["users", pageNumber, pageSize], 
    queryFn: () => fetchUsers(pageNumber, pageSize),
  }); 

  const handleSelected = (user: User) => {
    console.log(user);
    navigate(`/posts/${user.id}`)
  } 

  if(isLoading)  {
    return <LoadingDots />;
  }

  console.log(users);
  return (
    <div className="users flex justify-center items-center h-[100vh]">
      <div className="w-[60%]">
          <div className="flex items-start w-full">
            <h1 className="text-[50px] font-bold">Users</h1>
          </div>

          <div className="rounded-3xl">
            <table>
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user: User) => {
                  const street = user.adders?.find(a => a.key === AdderKey.Street)?.value || "";
                  const city = user.adders?.find(a => a.key === AdderKey.City)?.value || "";
                  const state = user.adders?.find(a => a.key === AdderKey.State)?.value || "";
                  const zipcode = user.adders?.find(a => a.key === AdderKey.Zipcode)?.value || "";
                  const address = `${street}, ${state}, ${city}, ${zipcode}`;

                  return (
                    <tr key={user.id} onClick={() => handleSelected(user)}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{address}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
    </div>
  )
};

export default Users;
