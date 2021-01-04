import http from "http";
import path from "path";
import express from "express";

const port: number = Number(process.env.PORT) || 3000;

class App {
  private server: http.Server;
  private port: number;

  constructor(port: number) {
    this.port = port;
    const app = express();

    // Main client script
    app.use(express.static(path.join(__dirname, "../client")));

    // Three.js main library
    app.use(
      "/build/three.module.js",
      express.static(
        path.join(__dirname, "../../node_modules/three/build/three.module.js")
      )
    );

    // Three.js orbit controls
    app.use(
      "/jsm/controls/OrbitControls",
      express.static(
        path.join(
          __dirname,
          "../../node_modules/three/examples/jsm/controls/OrbitControls.js"
        )
      )
    );

    // Three.js FPS display
    app.use(
      "/jsm/libs/stats.module",
      express.static(
        path.join(
          __dirname,
          "../../node_modules/three/examples/jsm/libs/stats.module.js"
        )
      )
    );

    // Three.js GUI module
    app.use(
      "/jsm/libs/dat.gui.module",
      express.static(
        path.join(
          __dirname,
          "../../node_modules/three/examples/jsm/libs/dat.gui.module.js"
        )
      )
    );

    this.server = new http.Server(app);
  }

  public Start() {
    this.server.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}.`);
    });
  }
}

new App(port).Start();
