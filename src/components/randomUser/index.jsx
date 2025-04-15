"use client";

import axios from "axios";
import { useEffect, useState } from "react";

import styles from "./randomUser.module.css";

const UserList = () => {
  const url = "https://randomuser.me/api/"; //Link da API externa

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUsers = async () => {
        try {
            setLoading(true)    
            const users = await axios.get(url);
            setUsers(users.data.results);
            setLoading(false);
        } catch (error) {
            console.log("Erro ao gerar um usuário aleatório na API")
            setError(
                "Não foi possível gerar os usuários. Tente novamente mais tarde!"
            );
            setError(false);
        }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
        <div className={styles.loading}>
            Gerando usuário...
        </div>
    )
  }

  if(error) {
    return (
        <div className={styles.error}>
            {error}
        </div>
    )
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Gerador de usuário aleatório</h1>
      <div className={styles.userGrid}>
        {users.map((user) => (
          <div key={user.id} className={styles.userCard}>
           
              <p className={styles.gender}>{user.gender}</p>
              <p className={styles.phone}>{user.phone}</p>
              <p className={styles.email}>{user.email}</p>

          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;