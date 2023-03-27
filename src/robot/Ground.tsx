export const Ground = () => {
  return (
    <ground name="ground" width={30} height={30}>
      <standardMaterial name="material">
        <texture url={require(".//asserts/wood.jpg")} uScale={15} vScale={15} />
      </standardMaterial>
    </ground>
  );
};
