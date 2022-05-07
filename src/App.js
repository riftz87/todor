import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Appbar from './components/Appbar';
import Workspace from './components/Workspace';

function App() {
  return (
    <div className="h-screen flex flex-col">
        <Appbar />
        <Workspace />
    </div>
  );
}

export default App;
