import "./App.css";
import { TypeArea } from "./components/TypeArea";

function App() {
  return (
    <main className="bg-background h-[100vh] w-full flex items-center flex-col">
      <div className="flex flex-col items-start w-full p-12">
        <h1 className="text-white text-4xl font-bold self-start">
          Test your typing speed
        </h1>
      </div>
      <TypeArea />
    </main>
  );
}

export default App;
