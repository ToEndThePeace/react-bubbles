import React from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import { axiosWithAuth } from "../utils";

class BubblePage extends React.Component {
  state = {
    colorList: [],
  };
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  componentDidMount() {
    axiosWithAuth()
      .get("/api/colors")
      .then((res) => {
        this.setState({
          colorList: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  setColorList = (obj) => {
    this.setState({
      colorList: obj,
    });
  };

  render() {
    return (
      <>
        <ColorList
          colors={this.state.colorList}
          updateColors={this.setColorList}
        />
        <Bubbles colors={this.state.colorList} />
      </>
    );
  }
}

export default BubblePage;
