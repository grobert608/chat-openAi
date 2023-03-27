import "@babylonjs/loaders/glTF";
import { observer } from "mobx-react";
import React, { Suspense, useState } from "react";
import { ILoadedModel, Model } from "react-babylonjs";
import { useStores } from "../hooks/useStores";

export const RobotModel: React.FC = observer(function Room() {
  const { animationStore } = useStores();
  const { animation } = animationStore;
  const [model, setModel] = useState<ILoadedModel | null>(null);
  const [currentAnimation, setCurrentAnimation] = useState(animation);

  const onModelLoaded = (m: ILoadedModel) => {
    setModel(m);
  };

  React.useEffect(() => {
    if (model) {
      model.animationGroups![currentAnimation].stop();
      model.animationGroups![currentAnimation].reset();
      model.animationGroups![animation].start(true);
      setCurrentAnimation(animation);
    }
  }, [animation, currentAnimation, model]);

  return (
    <Suspense fallback={"{Loading..."}>
      <Model
        name="robot-model"
        rootUrl={require(".//asserts/RobotExpressive.glb")}
        sceneFilename=""
        onModelLoaded={(e) => onModelLoaded(e)}
      />
    </Suspense>
  );
});
