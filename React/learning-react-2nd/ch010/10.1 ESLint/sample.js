
/*
const gnar = "gnarly";
const info = ({
  file = __filename,
  dir = __dirname
}) => (
  <p>
    {dir}: {file}
  </p>
);
*/

import {useState} from "react";

function gnar() {
  const [nickname, setNickname] = useState("dude");

  return <h1>gnarly</h1>;
}

switch (gnar) {
  default:
    console.log("gnarly")
    break;
}

function Image() {
  return <img src="/img/png" />
}