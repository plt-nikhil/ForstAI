 "use client";
import Head from "@/components/Head/Head";
import Footer from "@/components/Footer/Footer";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useState } from "react";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(prevState => !prevState);
  };
  return (
    <>
      <Sidebar  isToggled={isToggled} onToggle={handleToggle} ></Sidebar>
        <section  className={isToggled ? 'main_cllose' : 'main'} >
            <Head></Head>
                <div>
                        {children}                    
                </div>
                <Footer />
        </section>       
    </>
  );
}
