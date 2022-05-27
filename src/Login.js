import { Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { UserDispatch } from "./App";

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
      <form onSubmit={submitName} style={{ textAlign: "center" }}>
        <TextField
          id="닉네임 설정"
          label="Outlined"
          variant="outlined"
          value={name}
          onChange={settingName}
        />
        <div>
          <Button type="submit">등록하기</Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
