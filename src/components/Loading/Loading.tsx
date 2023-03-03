import React from "react";
import img from "../../assets/img/loading/robot.gif"
type Props = {};

export default function Loading({}: Props) {
  return (
    <div className="w-full h-100vh flex items-center justify-center bg-slate-300">
      <img src={img} alt="Loading..." className="object-cover w-96 h-96 x"/>
    </div>
  );
}
