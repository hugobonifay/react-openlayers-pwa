import { useState, useEffect, useRef } from 'react'
import Map from 'ol/Map'
import View from 'ol/View'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { fromLonLat, transform, transformExtent } from 'ol/proj'
import TileLayer from 'ol/layer/Tile'
import { OSM } from 'ol/source'
import { Overlay } from 'ol'
import { Fill, Stroke, Style, Text } from 'ol/style.js'
import GeoJSON from 'ol/format/GeoJSON.js'
import { singleClick, pointerMove } from 'ol/events/condition.js'
import Select from 'ol/interaction/Select.js'
import CircleStyle from 'ol/style/Circle'
import { Attribution, defaults as defaultControls } from 'ol/control.js'
import { unByKey } from 'ol/Observable'
import { getVectorContext } from 'ol/render'
import { easeOut } from 'ol/easing.js'
import "./OpenLayers.css"

function createStyle(feature) {
    const name = feature.getProperties().name

    return new Style({
        image: new CircleStyle({
            radius: 17,
            fill: new Fill({ color: [69, 39, 116, 0.8] }),
        }),
        text: new Text({
            overflow: true,
            textAlign: "center",
            textBaseline: "middle",
            justify: "center",
            text: [
                name,
                `600 12px/1.2 Arial`,
            ],
            fill: new Fill({ color: "white" }),
            stroke: new Stroke({ color: "black", width: 4 }),
        }),
    })
}

const source = new VectorSource({
    wrapX: false,
})

const vectorLayer = new VectorLayer({
    source: source,
    style: createStyle,
    declutter: true
})

const mapClick = new Select({ 
    condition: singleClick, 
    style: function(feature) {
        const style = createStyle(feature)
        style.getImage().getFill().setColor("rgba(241, 95, 18, 0.8)")
        return style
    } 
})

const mapHover = new Select({ 
    condition: pointerMove, 
    style: function(feature) {
        const style = createStyle(feature)
        style.getImage().getFill().setColor("rgba(0, 0, 0, 1)")
        return style
    } 
})

const attribution = new Attribution({
    collapsible: false,
})

// eslint-disable-next-line
export function OpenLayers({ features }) {
    const [clickedFeature, setClickedFeature] = useState({})
    const mapRef = useRef(null)
    const popupRef = useRef(null)

    useEffect(() => {
        // create map
        const map = new Map({
            target: mapRef.current,
            layers: [new TileLayer({ source: new OSM() }), vectorLayer],
            view: new View({
                // projection: 'EPSG:3857', // default is 'EPSG:3857'
                center: fromLonLat([2.3522, 48.8566]),
                zoom: 12,
                minZoom: 0,
                extent: transformExtent([-5.1, 41.3, 9.6, 51.1], 'EPSG:4326', 'EPSG:3857') // France limited
            }),
            controls: defaultControls({ attribution: false }).extend([attribution]),
        })

        // Paris feature animation
        source.on("addfeature", function (event) {
            const feature = event.feature
            const isParis = feature.getProperties().name === "Paris"

            if (!isParis) {
                return
            }

            const start = Date.now()
            const flashGeom = feature.getGeometry().clone()
            const listenerKey = vectorLayer.on("postrender", animate)
            const duration = 2000

            // eslint-disable-next-line
            function animate(event) {
                const frameState = event.frameState
                const elapsed = frameState.time - start

                if (elapsed >= duration) {
                    unByKey(listenerKey)
                    return
                }

                const vectorContext = getVectorContext(event)
                const elapsedRatio = elapsed / duration
                // radius will be 5 at start and 30 at end.
                const radius = easeOut(elapsedRatio) * 25 + 5
                const opacity = easeOut(1 - elapsedRatio)
            
                const style = new Style({
                    image: new CircleStyle({
                        radius: radius,
                        stroke: new Stroke({
                            color: "red",
                            width: 0.25 + opacity,
                        }),
                    }),
                })
            
                vectorContext.setStyle(style)
                vectorContext.drawGeometry(flashGeom)
                // tell OpenLayers to continue postrender animation
                map.render()
            }
        })

        // add features
        source.addFeatures(new GeoJSON().readFeatures(features))
        
        // Create popup
        const popup = new Overlay({
            element: popupRef.current,
            className: 'ol-overlay-container ol-selectable ol-popup-animation',
            autoPan: {
                animation: {
                    duration: 250,
                },
            },
        })

        map.addOverlay(popup)

        // click on feature 
        map.addInteraction(mapClick)

        map.on("singleclick", function (event) {
            const feature = this.forEachFeatureAtPixel(event.pixel, function(f) { return f })

            if (!feature) {
                popup.setPosition(undefined)
                setClickedFeature({})
                return
            }

            const coordinates = feature.getGeometry().getCoordinates()
            popup.setPosition(coordinates)
            const name = feature.getProperties().name
            const type = feature.getGeometry().getType()
            const lonLat = transform(coordinates, 'EPSG:3857', 'EPSG:4326')
            const longitude = lonLat[0]
            const latitude = lonLat[1]
            setClickedFeature({ name, longitude, latitude, coordinates, type})
        })

        // hover on feature
        map.addInteraction(mapHover)

        map.on("pointermove", function (event) {
            const feature = this.forEachFeatureAtPixel(event.pixel, function(f) { return f })
            this.getTargetElement().style.cursor = feature ? "pointer" : "grab"
        })

        // check size for the attribution
        function checkWindowSize() {
            const small = map.getSize()[0] < 600
            attribution.setCollapsible(small)
            attribution.setCollapsed(small)
        }

        window.addEventListener('resize', checkWindowSize)
        checkWindowSize()

        // This will free the map resources on component unmount. This will solve 
        // the flickering issue people are having using this code.
        return () => {
            map.setTarget(null)
            window.removeEventListener('resize', checkWindowSize)
        }
    }, [features])

    return (
        <div style={{ width: "100%", height: "100%" }}>
            <div ref={mapRef} style={{ height: "100%", width: "100%" }}>
                <div 
                    ref={popupRef}
                    style={{
                        position: "absolute",
                        backgroundColor: "white",
                        boxShadow: "0 6px 20px 9px rgba(0, 0, 0, 0.2)",
                        WebkitBoxShadow: "0 6px 20px 9px rgba(0, 0, 0, 0.2)",
                        padding: "15px",
                        borderRadius: "10px",
                        bottom: "12px",
                        left: "-12px",
                        color: "black"
                    }}
                >
                    <p style={{ fontWeight: 800 }}>{clickedFeature.name}</p>
                    <ul>
                        <li><u>Longitude :</u> {clickedFeature.longitude}</li>
                        <li><u>Latitude :</u> {clickedFeature.latitude}</li>
                        <li>
                            <u>Geometry :</u>
                            <ul>
                                <li><u>Type :</u> {clickedFeature.type}</li>
                                <li><u>Coordinates :</u> {JSON.stringify(clickedFeature.coordinates)}</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}