import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { observer } from "mobx-react";
import React from "react";
import { Engine, Scene } from "react-babylonjs";
import { RootStoreContext, useStores } from "../hooks/useStores";
import { Ground } from "./Ground";
import { RobotModel } from "./RoborModel";
import "./Room.css"

export const Room: React.FC = observer(function Room() {
  const store = useStores();
  return (
    <div className="room">
      <Engine antialias adaptToDeviceRatio canvasId="babylon-canvas">
        <Scene>
          <freeCamera
            name="camera"
            position={new Vector3(3, 3, 15)}
            rotation={new Vector3(0, Math.PI, 0)}
          />
          <hemisphericLight name="light1" direction={new Vector3(0, 1, 0)} />
          <Ground />
          <RootStoreContext.Provider value={store}>
            <RobotModel />
          </RootStoreContext.Provider>
        </Scene>
      </Engine>
    </div>
  );
});
