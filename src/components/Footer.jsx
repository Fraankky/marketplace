import { ContactButton } from "./ContactButton";
export const Footer = () => {
  return (
    <footer className="min-h-14 py-6 border-t flex items-center justify-between px-20">
      <p> Agrotrusted Copyright 2024</p>
      {/* <ContactButton label="Halo dunia" /> */}
      <ContactButton>Contact Me</ContactButton>
    </footer>
  );
};
