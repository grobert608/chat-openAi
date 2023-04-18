import "@babylonjs/core/Helpers/sceneHelpers";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { observer } from "mobx-react";
import React from "react";
import { Engine, Scene, Skybox } from "react-babylonjs";
import { Animation } from "../domain/animation";
import { RootStoreContext, useStores } from "../hooks/useStores";
import { Ground } from "./Ground";
import { RobotModel } from "./RobotModel";
import "./Space.css";

const mainDirection = new Vector3(3, 3, 15);
const zoomDirection = new Vector3(2, 2, 7);

export const Space: React.FC = observer(function Space() {
  const store = useStores();
  const currentAnimation = store.animationStore.animation;

  return (
    <div className="space">
      <Engine antialias adaptToDeviceRatio canvasId="babylon-canvas">
        <Scene>
          <hemisphericLight
            name="light"
            intensity={0.7}
            direction={mainDirection}
          />
          <Skybox
            rootUrl={require("./asserts/Runyon_Canyon_A_2k_cube_specular.dds")}
          />
          <targetCamera
            name="camera"
            position={
              currentAnimation === Animation.Wave
                ? mainDirection
                : zoomDirection
            }
            rotation-y={Math.PI}
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
