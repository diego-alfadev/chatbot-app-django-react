import logo from './logo.svg';
import './App.css';
import SideBar from './sidebar/SideBar';
import Chat from './chat/Chat';

// Configure dayjs to use relative time in Spanish
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
dayjs().locale('es')

function App() {
  return (
    <div className="w-full h-full bg-background flex flex-row">
      <SideBar />
      <Chat/>
    </div>
  );
}

export default App;
