import { useSession } from "next-auth/react";
import { useState } from "react";
import Banner from "../components/Banner";
import Header from "../components/Header";
import Section from "../components/Section";

export default function Example() {
  const { data: sessionData } = useSession();
  const [visible, setVisible] = useState(true);

  return (
    <div className="min-h-screen">
      <Header />
      <Section />
      {visible && sessionData?.user.role === "USER" && (
        <Banner setVisible={setVisible} />
      )}
    </div>
  );
}
