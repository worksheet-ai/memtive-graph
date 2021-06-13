import React from "react";
import PropTypes from 'prop-types';

import style from "./index.module.scss";

class Node extends React.Component {
  onClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  render() {
    const nodeCSS = this.props.active ? style.NodeActive : style.Node;
    if (this.props.image) {
      return (
        <div
          className={nodeCSS}
          data-identifier={this.props.identifier}
          data-type={"node"}
          onClick={this.onClick.bind(this)}>
          <div className={style.NodeImage}>
            <img className={style.NodeImageElement} src={this.props.image} />
          </div>
          <div className={style.NodeSpacer}></div>
          <div className={style.NodeText}>{this.props.text}</div>
        </div>
      );
    } else {
      return (
        <div
          className={nodeCSS}
          data-identifier={this.props.identifier}
          data-type={"node"}
          onClick={this.onClick.bind(this)}>
          <div className={style.NodeText}>{this.props.text}</div>
        </div>
      );
    }
  }
}

Node.propTypes = {
  text: PropTypes.string.isRequired,
  identifier: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func,
  image: PropTypes.string,
};

export default Node;
