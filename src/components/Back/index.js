import React from "react";
import style from "./index.module.scss";

class Back extends React.Component {
  onClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  render() {
    if (this.props.single && this.props.image) {
      return (
        <div className={style.BackSingle} onClick={this.onClick.bind(this)}>
          <div className={style.BackContainerSecondSingle}>
            <div className={style.BackLineContainer}>
              <div className={style.BackLineTop}></div>
            </div>
            <div className={style.BackLineContainer}>
              <div className={style.BackLineBottom}></div>
            </div>
          </div>

          <div className={style.BackContainerImage}>
            <div className={style.BackContainerImageSpacer}>
              <img
                className={style.BackContainerImageElement}
                src={this.props.image}
              />
            </div>
          </div>
        </div>
      );
    } else if (this.props.single) {
      return (
        <div className={style.Back} onClick={this.onClick.bind(this)}>
          <div className={style.BackContainerSecond}>
            <div className={style.BackLineContainer}>
              <div className={style.BackLineTop}></div>
            </div>
            <div className={style.BackLineContainer}>
              <div className={style.BackLineBottom}></div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={style.Back} onClick={this.onClick.bind(this)}>
          <div className={style.BackContainerFirst}>
            <div className={style.BackLineContainer}>
              <div className={style.BackLineTop}></div>
            </div>
            <div className={style.BackLineContainer}>
              <div className={style.BackLineBottom}></div>
            </div>
          </div>
          <div className={style.BackContainerSecond}>
            <div className={style.BackLineContainer}>
              <div className={style.BackLineTop}></div>
            </div>
            <div className={style.BackLineContainer}>
              <div className={style.BackLineBottom}></div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Back;
