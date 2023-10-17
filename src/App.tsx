import './App.css';
import MainPage from "./pages/mainPage/mainPage";
import {HTML5Backend} from 'react-dnd-html5-backend';
import {DndProvider} from 'react-dnd';

function App() {

    return (
        // <DndProvider backend={HTML5Backend}>
            <MainPage/>
        // </DndProvider>
    );
}

export default App;
