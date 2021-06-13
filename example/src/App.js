import React from 'react'

import style from './App.module.scss'
import google from './assets/google.png'

import { Graph, Node } from 'memtive-graph'

import 'memtive-graph/dist/index.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }

  back() {
    window.history.back();
  }

  root() {
    alert("Secondary Back Button Clicked")
  }

  triggerActive() {
    this.setState({
      active: !this.state.active,
    });
  }

  render() {
    return (
      <div className={style.App}>
        <Graph
          triggerBack={this.back.bind(this)}
          triggerRoot={this.root.bind(this)}>
          <Node
            text={"Roam Research"}
            identifier={"9b9ee7be-811d-4213-8756-215e89434b04"}
            active={this.state.active}
            onClick={this.triggerActive.bind(this)}
            image={google}>
            <Node
              text={"Why is it cool"}
              identifier={"98003c4b-8064-4ca6-938a-bb41d66ef5d8"}
              image={google}>
              <Node
                text={"Freedom"}
                identifier={"80dbb137-30b2-4d73-a306-3707e612670d"}
                image={google}></Node>
              <Node
                text={"Peace"}
                identifier={"bc35b345-25f6-43df-8c4e-b441e2c35530"}
                image={google}></Node>
              <Node
                text={"Some More Stuff"}
                identifier={"0414e947-2a68-4462-9c71-d06053fa960b"}
                image={google}>
                <Node
                  text={"This is the answer"}
                  identifier={"ef163570-6eb5-486e-85d3-b1c2a659c7cd"}
                  image={google}></Node>
              </Node>
            </Node>
          </Node>
        </Graph>
      </div>
    )
  }
}

export default App
