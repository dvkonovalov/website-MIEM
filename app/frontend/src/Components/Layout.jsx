const Layout = ({ children }) => {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          {children}
        </main>
        <footer class="w-full bg-black border border-custom-gray text-white mt-auto p-4 relative">
            <div class="flex justify-between items-center container mx-auto px-4">
                <p class="absolute left-0 text-sm text-white text-gray-400 ml-4">МИЭМ 2024</p>
                <div class="flex justify-center flex-grow">
                </div>
            </div>
        </footer>
      </div>
    );
  };
  
  export default Layout;