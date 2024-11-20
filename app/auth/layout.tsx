
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="signin_body">    
     {children}  
    </div>
  );
}
