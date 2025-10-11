export default function HomePage() {
  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="bg-white shadow-lg rounded-lg p-10 text-center max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-teal-800 mb-3">
          Welcome to Dristi Eye Care
        </h1>
        <p className="text-gray-600">
          Your vision, our mission. Book your eye care appointment online today.
        </p>
        {/* <button onClick={() => login("patient")}>Login as Patient</button> */}
      </div>
    </div>
  );
}
