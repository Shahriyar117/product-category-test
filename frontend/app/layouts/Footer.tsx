const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-4">
      <div className="container mx-auto">
        <p>
          &copy; {new Date().getFullYear()} My Application. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
