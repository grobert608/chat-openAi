import { Vector3 } from "@babylonjs/core/Maths/math";

export const Ground = () => {
  return (
    <sphere name="sphere" position={new Vector3(0, -10, 0)} diameter={20}>
      <standardMaterial name="material-ground">
        <texture url={require(".//asserts/dirt.jpg")} uScale={15} vScale={15} />
      </standardMaterial>
    </sphere>
  );
};
