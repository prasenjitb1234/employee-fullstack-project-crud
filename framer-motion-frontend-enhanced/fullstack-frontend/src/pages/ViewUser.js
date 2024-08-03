import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaIdCard } from "react-icons/fa";

const UserCard = styled(motion.div)`
  background-color: white;
  border-radius: 8px;
  box-shadow: var(--shadow);
  padding: 2rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  
  svg {
    margin-right: 1rem;
    color: var(--primary-color);
  }
`;

export default function ViewUser() {
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: ""
  });

  const { id } = useParams();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/user/${id}`);
    setUser(result.data);
  };

  return (
    <div className="container">
      <UserCard
        className="col-md-6 offset-md-3 mt-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-center mb-4">User Details</h2>
        <UserInfo>
          <FaIdCard size={24} />
          <div>
            <strong>ID:</strong> {user.id}
          </div>
        </UserInfo>
        <UserInfo>
          <FaUser size={24} />
          <div>
            <strong>Name:</strong> {user.name}
          </div>
        </UserInfo>
        <UserInfo>
          <FaUser size={24} />
          <div>
            <strong>Username:</strong> {user.username}
          </div>
        </UserInfo>
        <UserInfo>
          <FaEnvelope size={24} />
          <div>
            <strong>Email:</strong> {user.email}
          </div>
        </UserInfo>
        <div className="text-center mt-4">
          <Link className="btn btn-primary" to="/">
            Back to Home
          </Link>
        </div>
      </UserCard>
    </div>
  );
}