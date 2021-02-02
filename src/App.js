import LyricsAppContainer from './pages/LyricsAppContainer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <LyricsAppContainer />
      <ToastContainer hideProgressBar={true}  />
    </>
  );
}

export default App;
