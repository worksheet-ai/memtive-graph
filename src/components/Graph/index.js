import React from "react";
import style from "./index.module.scss";

import Back from "../Back";
import Center from "../Center";
import Zoom from "../Zoom";

import { guidGenerator } from "../utils";
import dagre from "dagre";

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.nodeContainer = React.createRef();
    this.nodeRefs = {};
    this.state = {
      canvasWidth: window.innerWidth,
      canvasHeight: window.innerHeight,
      x_pos: 0,
      y_pos: 0,
      zoom: 1.0,
      ready: false,
      render: false,
      sizes: [],
      layout: {
        nodes: {},
        edges: {},
      },
    };
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  componentDidMount() {
    const nodes = Array.from(this.nodeContainer.current.querySelectorAll("[data-type='node']"))

    console.log(nodes[0])

    this.setState(
      {
        canvasWidth: window.innerWidth,
        canvasHeight: window.innerHeight,
        sizes: [],
        ready: true,
      },
      () => {
        this.renderCanvas();
        window.addEventListener("resize", this.updateDimensions);
      }
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.children !== prevProps.children) {
      this.setState({
        ready: false,
        render: false,
      });
    } else if (!this.state.ready) {
      const nodes = Array.from(this.nodeContainer.current.querySelectorAll("[data-type='node']"));

      this.setState({
        sizes: nodes.map((x) => {
          return x.getBoundingClientRect();
        }),
        ready: true,
      });
    }
  }

  updateDimensions = () => {
    this.setState(
      {
        canvasWidth: window.innerWidth,
        canvasHeight: window.innerHeight,
      },
      () => {
        this.renderCanvas();
      }
    );
  };

  renderCanvas = () => {
    const ctx = this.canvas.current.getContext("2d");

    const centerX = this.canvas.current.width / 2;
    const centerY = this.canvas.current.height / 2;

    const size = 10;
    var side = size * this.state.zoom;

    if (Object.keys(this.state.layout["nodes"]).length != 0) {
      ctx.clearRect(
        0,
        0,
        this.canvas.current.width,
        this.canvas.current.height
      );

      const offsets = this.calculateCenter();
      const domStructure = this.getDOMTree(this.props.children);
      const domIdentifiers = domStructure.map(
        (element) => element.props.identifier
      );
      const edgeIdentifiers = Object.keys(this.state.layout["edges"]).filter(
        (key) =>
          domIdentifiers.includes(
            this.state.layout["edges"][key]["raw"]["v"]
          ) &&
          domIdentifiers.includes(this.state.layout["edges"][key]["raw"]["w"])
      );
      const edgeSizeMap = edgeIdentifiers.map(
        (x) => this.state.layout["edges"][x]
      );

      for (const idx in edgeSizeMap) {
        const edge = edgeSizeMap[idx].edge.points;
        ctx.strokeStyle = "#979797";
        ctx.beginPath();
        ctx.moveTo(
          parseInt(edge[0].x, 10) + offsets.left + this.state.x_pos,
          parseInt(edge[0].y, 10) + offsets.top + this.state.y_pos
        );

        ctx.bezierCurveTo(
          parseInt(edge[1].x, 10) + offsets.left + this.state.x_pos,
          parseInt(edge[1].y, 10) + offsets.top + this.state.y_pos,
          parseInt(edge[1].x, 10) + offsets.left + this.state.x_pos,
          parseInt(edge[1].y, 10) + offsets.top + this.state.y_pos,
          parseInt(edge[2].x, 10) + offsets.left + this.state.x_pos,
          parseInt(edge[2].y, 10) + offsets.top + this.state.y_pos
        );
        ctx.stroke();
      }
    }
  };

  setZoom = (zoom) => {
    this.setState(
      {
        zoom: zoom,
      },
      () => {
        this.renderCanvas();
      }
    );
  };

  resetCoordinates = () => {
    this.setState(
      {
        zoom: 1.0,
        x_pos: 0,
        y_pos: 0,
      },
      () => {
        this.renderCanvas();
      }
    );
  };

  renderZoom = () => {
    if (this.props.zoom) {
      return (
        <div className={style.MotionSpacer}>
          <Zoom setZoom={this.setZoom.bind(this)} zoom={this.state.zoom} />
        </div>
      );
    }
  };

  renderCenter = () => {
    if (this.props.center == undefined || this.props.center) {
      return (
        <div className={style.MotionSpacer}>
          <Center onClick={this.resetCoordinates.bind(this)} />
        </div>
      );
    }
  };

  triggerBack = () => {
    this.setState(
      {
        zoom: 1.0,
        x_pos: 0,
        y_pos: 0,
      },
      () => {
        this.props.triggerBack();
      }
    );
  };

  renderBack = () => {
    if (this.props.triggerBack) {
      return (
        <div className={style.NavigationSpacer}>
          <Back onClick={this.triggerBack.bind(this)} />
        </div>
      );
    }
  };

  renderRootNode = () => {
    if (this.props.triggerRoot) {
      const domStructure = this.getDOMTree(this.props.children);
      var image;
      if (domStructure.length > 0) {
        image = domStructure[0].props.image;
      }
      return (
        <div className={style.NavigationSpacer}>
          <Back
            single={true}
            onClick={this.triggerBack.bind(this)}
            image={image}
          />
        </div>
      );
    }
  };

  getNodeGraph = (root) => {
    return React.Children.map(root, (child) => {
      if (!React.isValidElement(child)) {
        return child;
      }

      if (child.props.children) {
        var processedChildren = this.getNodeGraph(child.props.children);
      }

      if (processedChildren != undefined) {
        return {
          root: child.props.identifier,
          child: processedChildren,
          edges: processedChildren.map((pc) => [
            child.props.identifier,
            pc.root,
          ]),
        };
      } else {
        return {
          root: child.props.identifier,
          child: processedChildren,
        };
      }
    });
  };

  getEdgesGraph = (nodeGraph) => {
    return nodeGraph.flatMap((child) => {
      if (child.edges == undefined) return [];

      return [...child.edges, ...this.getEdgesGraph(child.child)];
    });
  };

  getDOMTree = (root) => {
    return React.Children.map(root, (child) => {
      if (!React.isValidElement(child)) {
        return child;
      }

      if (child.props.children) {
        var processedChildren = this.getDOMTree(child.props.children);
      }

      return [child, processedChildren];
    });
  };

  getLayout = (nodeStructure, edgeGraph) => {
    var g = new dagre.graphlib.Graph();

    g.setGraph({
      rankdir: "LR",
      ranker: "network-simplex",
      marginx: 10,
      marginy: 10,
    });
    g.setDefaultEdgeLabel(function () {
      return {};
    });

    for (const idx in nodeStructure) {
      const struct = nodeStructure[idx];
      g.setNode(struct["node"]["root"], {
        label: struct["dom"]["props"]["text"],
        width: parseInt(struct["sizes"].width, 10) - 6,
        height: parseInt(struct["sizes"].height, 10) - 6,
      });
    }

    for (const idx in edgeGraph) {
      const edges = edgeGraph[idx];
      g.setEdge(edges[0], edges[1]);
    }

    dagre.layout(g);

    const nodeArr = g.nodes().map((v) => {
      return { key: v, val: g.node(v) };
    });

    const nodePoints = nodeArr.reduce(function (map, obj) {
      map[obj.key] = obj.val;
      return map;
    }, {});

    const edgeArray = g.edges().map((e) => {
      const edgeKeys = e["v"] + "-" + e["w"];
      return { key: edgeKeys, val: { edge: g.edge(e), raw: e } };
    });

    const edgePoints = edgeArray.reduce(function (map, obj) {
      map[obj.key] = obj.val;
      return map;
    }, {});

    return {
      nodes: nodePoints,
      edges: edgePoints,
    };
  };

  setNodePosition = (nodes) => {
    const offsets = this.calculateCenter();
    return React.Children.map(nodes, (child) => {
      return (
        <div
          style={{
            position: "absolute",
            top:
              this.state.layout["nodes"][child.props.identifier]["y"] -
              this.state.layout["nodes"][child.props.identifier].height / 2 -
              3 +
              offsets["top"] +
              this.state.y_pos,
            left:
              this.state.layout["nodes"][child.props.identifier]["x"] -
              this.state.layout["nodes"][child.props.identifier].width / 2 -
              3 +
              offsets["left"] +
              this.state.x_pos,
          }}
        >
          {child}
        </div>
      );
    });
  };

  calculateCenter = () => {
    const domStructure = this.getDOMTree(this.props.children);
    const domIdentifiers = domStructure.map(
      (element) => element.props.identifier
    );
    const nodeIdentifiers = Object.keys(this.state.layout["nodes"]).filter(
      (key) => domIdentifiers.includes(key)
    );

    const nodeSizeMap = nodeIdentifiers.map(
      (x) => this.state.layout["nodes"][x]
    );

    const xMin = Math.min(
      ...nodeSizeMap.map((node) => node.x - node.width / 2)
    );
    const yMin = Math.min(
      ...nodeSizeMap.map((node) => node.y - node.height / 2)
    );
    const xMax = Math.max(
      ...nodeSizeMap.map((node) => node.x + node.width / 2)
    );
    const yMax = Math.max(
      ...nodeSizeMap.map((node) => node.y + node.height / 2)
    );

    const width = xMax - xMin;
    const height = yMax - yMin;

    var left = (this.state.canvasWidth - width) / 2 - 10;
    var top = (this.state.canvasHeight - height) / 2 - 10;

    if (top < 100) {
      top = 100;
    }

    if (left < 100) {
      left = 100;
    }

    //   canvasHeight
    // console.log(xMin)
    // console.log(yMin)

    return {
      xMin: xMin,
      yMin: yMin,
      xMax: xMax,
      yMax: yMax,
      width: width,
      height: height,
      left: left,
      top: top,
    };
  };

  checkDomStructure = (domStructure) => {
    return domStructure
      .map((element) => element.props.identifier)
      .every((identifier) =>
        Object.keys(this.state.layout["nodes"]).includes(identifier)
      );
  };

  processNodes = () => {
    const domStructure = this.getDOMTree(this.props.children);

    if (this.nodeContainer.current && !this.state.render) {
      const nodes = Array.from(this.nodeContainer.current.querySelectorAll("[data-type='node']"));

      const sizes = nodes.map((x) => {
        return x.getBoundingClientRect();
      });

      const nodeGraph = this.getNodeGraph(domStructure);
      const edgeGraph = this.getEdgesGraph(nodeGraph);

      const nodeStructure = domStructure.map((ds, i) => {
        return { dom: ds, sizes: sizes[i], node: nodeGraph[i] };
      });

      const layout = this.getLayout(nodeStructure, edgeGraph);

      const updatedLayout = {
        nodes: Object.assign({}, this.state.layout["nodes"], layout["nodes"]),
        edges: Object.assign({}, this.state.layout["edges"], layout["edges"]),
      };

      this.setState({
        render: true,
        layout: updatedLayout,
        sizes: sizes,
      });
    } else if (
      this.nodeContainer.current &&
      this.state.render &&
      this.checkDomStructure(domStructure)
    ) {
      const nodes = Array.from(this.nodeContainer.current.querySelectorAll("[data-type='node']"));

      const sizes = nodes.map((x) => {
        return x.getBoundingClientRect();
      });

      if (sizes.length == this.state.sizes.length) {
        const sizeZip = sizes.map((s, i) => [s, this.state.sizes[i]]);

        if (
          !sizeZip.every(
            (element) =>
              element[0].width == element[1].width &&
              element[0].height == element[1].height
          )
        ) {
          this.setState({
            render: false,
          });
        }
      }

      this.renderCanvas();
      return this.setNodePosition(domStructure);
    } else {
      return domStructure;
    }
  };

  startDrag = (e) => {
    this.setState({
      draggable: true,
    });
  };

  stopDrag = (e) => {
    this.setState({
      draggable: false,
    });
  };

  handleCursor = (e) => {
    if (this.state.draggable) {
      this.setState({
        x_pos: this.state.x_pos + e.movementX,
        y_pos: this.state.y_pos + e.movementY,
      });
    }
  };

  render() {
    return (
      <div
        className={style.Graph}
        onMouseMove={this.handleCursor.bind(this)}
        onMouseDown={this.startDrag.bind(this)}
        onMouseUp={this.stopDrag.bind(this)}
      >
        <div className={style.GraphCanvas}>
          <canvas
            ref={this.canvas}
            width={this.state.canvasWidth}
            height={this.state.canvasHeight}
          />
        </div>
        <div className={style.GraphNodes} ref={this.nodeContainer}>
          {this.processNodes()}
        </div>
        <div className={style.Navigation}>
          {this.renderBack()}
          {this.renderRootNode()}
        </div>
        <div className={style.Motion}>
          {this.renderCenter()}
          {this.renderZoom()}
        </div>
      </div>
    );
  }
}

export default Graph;
