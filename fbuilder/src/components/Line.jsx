import React from "react";

const Line = ({ x, y }) => {
  var line = {
    type: "line",
    origin: [0, 0],
    end: [{ x }, { y }],
  };

  var circle = {
    type: "circle",
    origin: [0, 0],
    radius: 50,
  };

  var pathObject = { myLine: line, myCircle: circle };

  var model = { paths: pathObject };

  return model;
};

export default Line;
