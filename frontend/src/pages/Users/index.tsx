import './index.scss';

import { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import { fetchUsers, fetchUsersCount } from "../../api";
import LoadingDots from '../../components/Loader';
import type { User } from '../../api';
import { AdderKey } from '../../api';
import { useNavigate } from "react-router-dom";
import Pagination from '../../components/Pagination';


const Users = () => {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const { data: users, isLoading, error, refetch } = useQuery({
    queryKey: ["users", pageNumber, pageSize], 
    queryFn: () => fetchUsers(pageNumber, pageSize),
  }); 
  const { data: totalCount } = useQuery({
    queryKey: ["users-count"],
    queryFn: fetchUsersCount,
  });

  const handleSelected = (user: User) => {
    console.log(user);
    navigate(`/posts/${user.id}`)
  } 

  if(isLoading)  {
    return <LoadingDots />;
  }

  console.log(users);
  
  const totalPages = totalCount ? Math.ceil(totalCount / pageSize) : 1;

  return (
    <div className="users flex justify-center items-center mt-[100px]">
      <div className="w-[60%]">
          <div className="flex items-start w-full mb-[20px]">
            <h1 className="text-[60px] font-[500] text-[#181D27]">Users</h1>
          </div>

          <div className="rounded-3xl">
            <table>
              <thead>
                <tr>
                  <th className="text-[#535862] text-[14px] font-[500]">Full Name</th>
                  <th className="text-[#535862] text-[14px] font-[500]">Email</th>
                  <th className="text-[#535862] text-[14px] font-[500]">Address</th>
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
                      <td className="text-[#535862] text-[14px]">{user.name}</td>
                      <td className="text-[#535862] text-[14px]">{user.email}</td>
                      <td className="text-[#535862] text-[14px]">{address}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
  
          <div className="flex justify-end mt-2">
            {totalCount && (
              <Pagination currentPage={pageNumber} totalPages={totalPages} onPageChange={setPageNumber} />
            )}
          </div> 
        </div>
    </div>
  )
};

export default Users;
