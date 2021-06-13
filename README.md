# memtive-graph

> Graph visualization tool for history

[![NPM](https://img.shields.io/npm/v/memtive-graph.svg)](https://www.npmjs.com/package/memtive-graph) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Example

Here's an [example](https://worksheet-ai.github.io/memtive-graph/) of the library

## Install

```bash
npm install --save memtive-graph
```

## Usage

```jsx
import React from 'react'

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
    alert("Back Button Clicked")
  }

  root() {
    alert("Root Button Clicked")
  }

  triggerActive() {
    this.setState({
      active: !this.state.active,
    });
  }

  render() {
    return (
      <div style={{
        'width': '100vw',
        'height': '100vh'
      }}>
        <Graph
          triggerBack={this.back.bind(this)}
          triggerRoot={this.root.bind(this)}
          center={true}
          zoom={false}>
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
```

## Components

#### Node

| Props | Required | Type | Default Value | Description |
| --- | --- | --- | --- | --- |
| text | :white_check_mark: | `String` | `<none>` | The text of the node  |
| identifier | :white_check_mark: | `String` | `<none>` | A unique identifier for each node. Note another node may not have the same identifier  |
| active |  | `Boolean` | `false` |  Denotes whether the Node is Active |
| image |  | `String` | `false` |  A source url for a favicon style image for the node |
| onClick |  | `Function` | `<none>` |  The onClickHandler |

#### Graph

| Props | Required | Type | Default Value | Description |
| --- | --- | --- | --- | --- |
| center |  | `Boolean` | `True` | Show the center button  |
| zoom |  | `Boolean` | `False` |  Show the zoom buttons  |
| triggerBack |  | `Function` | `<none>` |  Primary back button |
| triggerRoot |  | `String` | `<none>` |  Secondary back button |

## License

MIT © [abhishekpratapa](https://github.com/abhishekpratapa)
