import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>

          <div className="app">
            <Nav />
            {children}
          </div>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
