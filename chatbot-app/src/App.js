import logo from './logo.svg';
import './App.css';
import SideBar from './sidebar/SideBar';
import Chat from './chat/Chat';

function App() {
  return (
    <div className="w-full h-full bg-background flex flex-row border-2 border-blue-400">
      <SideBar />
      <Chat/>
    </div>
  );
}

export default App;
