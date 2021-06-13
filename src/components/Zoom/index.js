import React from "react";
import style from "./index.module.scss";

class Zoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: 1.0,
      zoomIncrement: 0.1,
    };
  }

  zoomIn = () => {
    if (this.props.setZoom) {
      const zoom = this.props.zoom ? this.props.zoom : this.state.zoom;
      const zoomIncrement = this.props.zoomIncrement
        ? this.props.zoomIncrement
        : this.state.zoomIncrement;

      this.setState(
        {
          zoom: zoom + zoomIncrement,
        },
        () => {
          this.props.setZoom(zoom + zoomIncrement);
        }
      );
    }
  };

  zoomOut = () => {
    if (this.props.setZoom) {
      const zoom = this.props.zoom ? this.props.zoom : this.state.zoom;
      const zoomIncrement = this.props.zoomIncrement
        ? this.props.zoomIncrement
        : this.state.zoomIncrement;

      this.setState(
        {
          zoom: zoom - zoomIncrement,
        },
        () => {
          this.props.setZoom(zoom - zoomIncrement);
        }
      );
    }
  };

  render() {
    return (
      <div className={style.Zoom}>
        <div className={style.ZoomIn} onClick={this.zoomIn.bind(this)}>
          <div className={style.ZoomPlus}>
            <div className={`${style.ZoomPlusOne} ${style.ZoomPlusLeaf}`}></div>
            <div className={`${style.ZoomPlusTwo} ${style.ZoomPlusLeaf}`}></div>
          </div>
        </div>
        <div className={style.ZoomSpacer}></div>
        <div className={style.ZoomOut} onClick={this.zoomOut.bind(this)}>
          <div className={style.ZoomPlus}>
            <div className={`${style.ZoomMinus} ${style.ZoomPlusLeaf}`}></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Zoom;
