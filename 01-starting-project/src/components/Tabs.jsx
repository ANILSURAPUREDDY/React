export default function Tabs({ Children, buttons, ButtonContainer }) {
  return (
    <>
      <ButtonContainer>{buttons}</ButtonContainer>
      {Children}
    </>
  );
}
