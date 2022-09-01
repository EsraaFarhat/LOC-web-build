import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { url } from "../constants";

const useAssignedUsers = (identifierId, token) => {
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { loading: usersLoading, users } = useSelector(
    (state) => state.newUser
  );
  useEffect(() => {
    if (identifierId) {
      fetch(`${url}/api/globalIdentifiers/` + identifierId + "/users", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((resData) => {
          setAssignedUsers(resData.users.map((user) => user.user_id));
          setLoading(false);
        });
    }
  }, [identifierId, token]);

  const onAssignUser = (userId) => {
    if (!assignedUsers.includes(userId)) {
      setAssignedUsers([...assignedUsers, userId]);
    } else {
      setAssignedUsers(assignedUsers.filter((user) => user !== userId));
    }
  };

  return { assignedUsers, onAssignUser, usersLoading, users, loading };
};

export default useAssignedUsers;
