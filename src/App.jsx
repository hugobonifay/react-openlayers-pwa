import { OpenLayers } from "./map/OpenLayers"
import { features } from "./map/features"

function App() {
    return <OpenLayers features={features} />
}

export default App
