import React from "react";
import { Link } from "react-router-dom"


export const StartPage = () => {
  return (
    <>
      <h1>RS Lang</h1>
      <Link to="/login">Log in</Link>
      <br></br>
      <Link to="/registration">Registration</Link>
    </>
  )
}
