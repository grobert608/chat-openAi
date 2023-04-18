import "@babylonjs/loaders/glTF";
import { observer } from "mobx-react";
import React, { Suspense, useCallback, useRef } from "react";
import { ILoadedModel, Model } from "react-babylonjs";
import { Animation } from "../domain/animation";
import { useStores } from "../hooks/useStores";

export const RobotModel: React.FC = observer(function Room() {
  const { animationStore } = useStores();
  const { animation } = animationStore;
  const modelRef = useRef<ILoadedModel | null>(null);
  const animationRef = useRef<Animation>(animation);

  const onModelLoaded = useCallback((m: ILoadedModel) => {
    modelRef.current = m;
    m.animationGroups![animationRef.current].start(true);
  }, []);

  React.useEffect(() => {
    const model = modelRef.current;
    const currentAnimation = animationRef.current;
    if (model) {
      model.animationGroups![currentAnimation].stop();
      model.animationGroups![currentAnimation].reset();
      model.animationGroups![animation].start(true);
      animationRef.current = animation;
    }
  }, [animation]);

  return (
    <Suspense fallback={"{Loading..."}>
      <Model
        name="robot-model"
        rootUrl={require(".//asserts/RobotExpressive.glb")}
        sceneFilename=""
        onModelLoaded={onModelLoaded}
      />
    </Suspense>
  );
});
