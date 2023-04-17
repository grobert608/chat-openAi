import "@babylonjs/loaders/glTF";
import { observer } from "mobx-react";
import React, { Suspense, useCallback, useRef } from "react";
import { ILoadedModel, Model } from "react-babylonjs";
import { useStores } from "../hooks/useStores";
import { Animation } from "../domain/animation";

export const RobotModel: React.FC = observer(function Room() {
  const { animationStore } = useStores();
  const { animation } = animationStore;
  // const [model, setModel] = useState<ILoadedModel | null>(null);
  const modelRef = useRef<ILoadedModel | null>(null);
  const animationRef = useRef<Animation>(animation);
  // const [currentAnimation, setCurrentAnimation] = useState(animation);

  const onModelLoaded = useCallback((m: ILoadedModel) => {
    // setModel(m);
    modelRef.current = m;
    m.animationGroups![animationRef.current].start(true);
  }, [modelRef, animationRef]);

  console.log("ROBOT render", animation, animationRef.current);

  React.useEffect(() => {
    console.log("ROBOT effect", animation, animationRef.current);
    const model = modelRef.current;
    const currentAnimation = animationRef.current;
    if (model && currentAnimation !== animation) {
      model.animationGroups![currentAnimation].stop();
      model.animationGroups![currentAnimation].reset();
      model.animationGroups![animation].start(true);
      console.log("ROBOT setCA", animation);
      // setCurrentAnimation(animation);
      animationRef.current = animation;
    }
  }, [animation, animationRef, modelRef]);

  return (
    <Suspense fallback={"Loading..."}>
      <Model
        name="robot-model"
        rootUrl={require(".//asserts/RobotExpressive.glb")}
        sceneFilename=""
        onModelLoaded={onModelLoaded}
      />
    </Suspense>
  );
});
