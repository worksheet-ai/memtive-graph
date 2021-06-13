import React from "react";
import style from "./index.module.scss";

class Center extends React.Component {
  constructor(props) {
    super(props);
  }

  onClick = () => {
    if (this.props.onClick) {
      this.props.onClick();
    }
  };

  render() {
    return (
      <div className={style.Center} onClick={this.onClick.bind(this)}>
        <svg
          width="13px"
          height="13px"
          viewBox="0 0 13 13"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            id="Page-1"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
            strokeLinecap="round"
          >
            <g
              id="center_console"
              transform="translate(-1490.000000, -193.000000)"
              stroke="#8E8E93"
            >
              <g id="Group-6" transform="translate(1490.000000, 193.000000)">
                <g id="Group-2">
                  <line x1="0.5" y1="4.5" x2="0.5" y2="0.5" id="Line"></line>
                  <line x1="4.5" y1="0.5" x2="0.5" y2="0.5" id="Line"></line>
                </g>
                <g
                  id="Group-2"
                  transform="translate(10.500000, 2.500000) scale(-1, 1) translate(-10.500000, -2.500000) translate(8.000000, 0.000000)"
                >
                  <line x1="0.5" y1="4.5" x2="0.5" y2="0.5" id="Line"></line>
                  <line x1="4.5" y1="0.5" x2="0.5" y2="0.5" id="Line"></line>
                </g>
                <g
                  id="Group-2"
                  transform="translate(10.500000, 10.500000) scale(-1, -1) translate(-10.500000, -10.500000) translate(8.000000, 8.000000)"
                >
                  <line x1="0.5" y1="4.5" x2="0.5" y2="0.5" id="Line"></line>
                  <line x1="4.5" y1="0.5" x2="0.5" y2="0.5" id="Line"></line>
                </g>
                <g
                  id="Group-2"
                  transform="translate(2.500000, 10.500000) scale(1, -1) translate(-2.500000, -10.500000) translate(0.000000, 8.000000)"
                >
                  <line x1="0.5" y1="4.5" x2="0.5" y2="0.5" id="Line"></line>
                  <line x1="4.5" y1="0.5" x2="0.5" y2="0.5" id="Line"></line>
                </g>
              </g>
            </g>
          </g>
        </svg>
      </div>
    );
  }
}

export default Center;
