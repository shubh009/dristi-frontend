export default function Sidebar() {
  return (
    <header className="bg-teal-700 text-white py-4 px-6 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-semibold">Dristi Eye Care/Sidebar</h1>
      <nav className="space-x-4">
        <a href="/" className="hover:underline">
          Home
        </a>
        <a href="/about" className="hover:underline">
          About
        </a>
        <a href="/contact" className="hover:underline">
          Contact
        </a>
        <a href="/login" className="hover:underline">
          Login
        </a>
      </nav>
    </header>
  );
}
