import "./App.css";
import { TypeArea } from "./components/TypeArea";

function App() {
  return (
    <main className="bg-background h-[100vh] w-full flex items-center flex-col p-12">
      <div className="flex flex-col items-start w-full">
        <h1 className="text-white text-4xl font-bold self-start">
          Test your typing speed
        </h1>
      </div>
      <TypeArea />
    </main>
  );
}

export default App;
