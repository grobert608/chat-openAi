import "@babylonjs/core/Helpers/sceneHelpers";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { observer } from "mobx-react";
import React from "react";
import { Engine, Scene, Skybox } from "react-babylonjs";
import { Animation } from "../domain/animation";
import { RootStoreContext, useStores } from "../hooks/useStores";
import { Ground } from "./Ground";
import { RobotModel } from "./RoborModel";
import "./Room.css";

export const Room: React.FC = observer(function Room() {
  const store = useStores();
  const currentAnimation = store.animationStore.animation;

  return (
    <div className="room">
      <Engine antialias adaptToDeviceRatio canvasId="babylon-canvas">
        <Scene>
          <hemisphericLight
            name="light"
            intensity={0.7}
            direction={new Vector3(3, 3, 15)}
          />
          <Skybox
            rootUrl={require(".//asserts/Runyon_Canyon_A_2k_cube_specular.dds")}
          />
          <targetCamera
            name="camera"
            position={
              currentAnimation === Animation.Wave
                ? new Vector3(3, 3, 15)
                : new Vector3(2, 2, 7)
            }
            rotation={new Vector3(0, Math.PI, 0)}
          />
          <Ground />
          <RootStoreContext.Provider value={store}>
            <RobotModel />
          </RootStoreContext.Provider>
        </Scene>
      </Engine>
    </div>
  );
});
