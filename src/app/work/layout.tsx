import { Hamburger } from "@/util/hamburger/Hamburger";
export default function WorkPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Hamburger />;
    </>
  );
}
