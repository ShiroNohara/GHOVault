import React from "react";
import { useNavigate } from "react-router-dom";

const Vault = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-backgroundTint text-white mt-16">
      {/* Navbar Placeholder */}
      <div className="h-16"></div>

      {/* Header */}
      <header className="py-8 text-center">
        <h1 className="text-4xl font-bold text-customPurple mb-4">
          Welcome to GHO Yield Hub
        </h1>
        <p className="text-lg">Stake, Borrow, and Earn with GHOVault</p>
      </header>

      {/* Stake Section */}
      <section className="py-16 bg-shade hover:bg-shade-dark transition duration-300">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-customPurple mb-8">
            Stake with Confidence
          </h2>
          <p className="text-lg mb-8">
            Users can stake their funds securely onto GHOVaults, ensuring their
            assets are well-protected.
          </p>
          {/* Add graphics or illustrations here */}
        </div>
      </section>

      {/* Aave Integration Section */}
      <section className="py-16 hover:bg-shade-light transition duration-300">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-customPurple mb-8">
            Unlock Aave Opportunities
          </h2>
          <p className="text-lg mb-8">
            GHOVaults seamlessly move staked funds to Aave, providing users with
            opportunities to earn more.
          </p>
          {/* Add graphics or illustrations here */}
        </div>
      </section>

      {/* Double Interest Section */}
      <section className="py-16 bg-shade hover:bg-shade-dark transition duration-300">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-customPurple mb-8">
            Earn Double Interest
          </h2>
          <p className="text-lg mb-8">
            Users who lend or stake their money can earn double interest – one
            from Aave and the other from GHOVault.
          </p>
          {/* Add graphics or illustrations here */}
        </div>
      </section>

      {/* Borrowing Section */}
      <section className="py-16 hover:bg-shade-light transition duration-300">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-customPurple mb-8">
            Borrow GHO Token Without Collateral
          </h2>
          <p className="text-lg mb-8">
            Borrowers can easily access GHO tokens without the need for
            traditional collateral, making borrowing efficient and flexible.
          </p>
          {/* Add graphics or illustrations here */}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-center bg-customPurple hover:bg-customPurple-dark transition duration-100">
        <div className="container mx-auto space-y-4">
          <p className="text-lg text-customCyan mb-8">
            Join us on GHO Yield Hub and start your journey to financial
            freedom.
          </p>
          <div className="space-x-4">
            <button
              className="bg-customCyan text-white py-2 px-6 rounded-md border-2 border-customCyan hover:shadow-neonGlow"
              onClick={() => navigate("/stake")}
            >
              Stake
            </button>
            <button
              className="bg-customCyan text-white py-2 px-6 rounded-md border-2 border-customCyan hover:shadow-neonGlow"
              onClick={() => navigate("/borrow")}
            >
              Borrow
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
    </div>
  );
};

export default Vault;
