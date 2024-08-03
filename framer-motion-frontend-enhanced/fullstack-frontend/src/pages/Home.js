// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import styled from "styled-components";
// import { motion } from "framer-motion";
// import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

// const TableContainer = styled(motion.div)`
//   background-color: white;
//   border-radius: 8px;
//   box-shadow: var(--shadow);
//   overflow: hidden;
// `;

// const StyledTable = styled.table`
//   margin-bottom: 0;
// `;

// const ActionButton = styled(motion.button)`
//   padding: 0.25rem 0.5rem;
//   font-size: 0.875rem;
// `;

// export default function Home() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     loadUsers();
//   }, []);

//   const loadUsers = async () => {
//     const result = await axios.get("http://localhost:8080/users");
//     setUsers(result.data);
//   };

//   const deleteUser = async (id) => {
//     await axios.delete(`http://localhost:8080/user/${id}`);
//     loadUsers();
//   };

//   return (
//     <div className="container">
//       <h1 className="text-center my-5">User Management System</h1>
//       <TableContainer
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <StyledTable className="table table-striped">
//           <thead className="table-dark">
//             <tr>
//               <th scope="col">#</th>
//               <th scope="col">Name</th>
//               <th scope="col">Username</th>
//               <th scope="col">Email</th>
//               <th scope="col">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user, index) => (
//               <motion.tr
//                 key={user.id}
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: index * 0.1 }}
//               >
//                 <th scope="row">{index + 1}</th>
//                 <td>{user.name}</td>
//                 <td>{user.username}</td>
//                 <td>{user.email}</td>
//                 <td>
//                   <Link to={`viewuser/${user.id}`} className="btn btn-info btn-sm me-2">
//                     <FaEye />
//                   </Link>
//                   <Link to={`/edituser/${user.id}`} className="btn btn-warning btn-sm me-2">
//                     <FaEdit />
//                   </Link>
//                   <ActionButton
//                     className="btn btn-danger btn-sm"
//                     onClick={() => deleteUser(user.id)}
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                   >
//                     <FaTrash />
//                   </ActionButton>
//                 </td>
//               </motion.tr>
//             ))}
//           </tbody>
//         </StyledTable>
//       </TableContainer>
//     </div>
//   );
// }


// **************** search user **********************************

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FaEye, FaEdit, FaTrash, FaSearch } from "react-icons/fa";

const TableContainer = styled(motion.div)`
  background-color: white;
  border-radius: 8px;
  box-shadow: var(--shadow);
  overflow: hidden;
`;

const StyledTable = styled.table`
  margin-bottom: 0;
`;

const ActionButton = styled(motion.button)`
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const SearchInput = styled.input`
  padding: 0.5rem 1rem;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 1rem;
  width: 300px;
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #6c757d;
`;

export default function Home() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8080/users");
    setUsers(result.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8080/user/${id}`);
    loadUsers();
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1 className="text-center my-5">User Management System</h1>
      <SearchContainer>
        <div style={{ position: "relative" }}>
          <SearchInput
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchIcon />
        </div>
      </SearchContainer>
      <TableContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <StyledTable className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filteredUsers.map((user, index) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <th scope="row">{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <Link to={`viewuser/${user.id}`} className="btn btn-info btn-sm me-2">
                      View <FaEye />
                    </Link>
                    <Link to={`/edituser/${user.id}`} className="btn btn-warning btn-sm me-2">
                      Edit <FaEdit />
                    </Link>
                    <ActionButton
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteUser(user.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaTrash />
                    </ActionButton>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </StyledTable>
      </TableContainer>
    </div>
  );
}