import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";

const FormContainer = styled(motion.div)`
  background-color: white;
  border-radius: 8px;
  box-shadow: var(--shadow);
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledInput = styled.input`
  border: 1px solid #ced4da;
  border-radius: 4px;
  padding: 0.5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;

export default function EditUser() {
  let navigate = useNavigate();

  const { id } = useParams();

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
  });

  const { name, username, email } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/user/${id}`, user);
    navigate("/");
  };

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/user/${id}`);
    setUser(result.data);
  };

  return (
    <div className="container">
      <FormContainer
        className="col-md-6 offset-md-3 p-4 mt-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-center mb-4">Edit User</h2>
        <StyledForm onSubmit={(e) => onSubmit(e)}>
          <div>
            <label htmlFor="name" className="form-label">Name</label>
            <StyledInput
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
          <div>
            <label htmlFor="username" className="form-label">Username</label>
            <StyledInput
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={username}
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="form-label">Email</label>
            <StyledInput
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
          <ButtonContainer>
            <Link className="btn btn-outline-danger" to="/">Cancel</Link>
            <motion.button
              type="submit"
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Submit
            </motion.button>
          </ButtonContainer>
        </StyledForm>
      </FormContainer>
    </div>
  );
}