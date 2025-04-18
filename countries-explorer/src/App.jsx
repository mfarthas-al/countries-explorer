import CountryList from "./components/CountryList";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="text-center py-6 bg-white shadow">
        <h1 className="text-4xl font-bold text-blue-600">🌍 Countries Explorer</h1>
      </header>
      <CountryList />
    </div>
  );
}

export default App;
