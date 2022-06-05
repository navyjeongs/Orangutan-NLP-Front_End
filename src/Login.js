import { Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { UserDispatch } from "./App";
import image from "./playVideo/orang.jpg";
const Login = () => {
  const dispatch = useContext(UserDispatch); // 전역변수

  const navi = useNavigate();

  const [name, setName] = useState("");

  const submitName = async (e) => {
    e.preventDefault();
    dispatch({ name: name, type: "SET_NAME" });
    navi("/game");
  };

  const settingName = (e) => {
    const { value } = e.target;
    setName(value);
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Orangutan-Filtering</h2>
      <div
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          height: "50vh",
          width: "50%",
          position: "absolute",
          left: "25%",
          top: "25%",
        }}
      ></div>
      <form
        onSubmit={submitName}
        style={{
          textAlign: "center",
          position: "absolute",
          top: "10%",
          left: "40%",
          right: "40%",
        }}
      >
        <TextField
          id="닉네임"
          label="닉네임"
          variant="outlined"
          value={name}
          onChange={settingName}
          required
        />
        <div>
          <Button
            type="submit"
            variant="outlined"
            style={{ margin: "5px 0 0 0" }}
          >
            설정하기
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
