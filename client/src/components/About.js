import React, { useContext, useEffect, useState } from "react";
import Alert from "./Alert";

export default function About() {

      const [greet, setGreet] = useState("");
      const [note, setNote] = useState({title: "", description: "", tag: ""});
      const fetchUesr = async () => {
            const response = await fetch(`http://localhost:5000/api/auth/getuser`, {
                  method: "GET",
                  headers: {
                        "Content-Type": "application/json",
                        "auth-token": `${localStorage.getItem('auth')}`,
                  },
            });
            const json = await response.json();
            setGreet(`${json.name}`);
      } 
      useEffect( () => {
            fetchUesr();
      }, []);

  return (
      <>
      <h1>{`Welcome, ${greet}`}</h1>
      </>
  );


}
