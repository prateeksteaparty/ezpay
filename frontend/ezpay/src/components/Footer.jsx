// components/Footer.jsx
export const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
      <footer className="bg-gray-800 text-white py-4 text-center">
        <p className="text-sm">
          &copy; {currentYear} Pratik Shinde. All Rights Reserved.
        </p>
      </footer>
    );
  };
  