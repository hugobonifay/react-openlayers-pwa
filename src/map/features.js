import { fromLonLat } from "ol/proj";

const featuresLonLat = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [2.3522, 48.8566]
            },
            "properties": {
                "name": "Paris",
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [2.2945, 48.8584]
            },
            "properties": {
                "name": "Tour Eiffel",
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [2.3327, 48.8606]
            },
            "properties": {
                "name": "Le Louvre",
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [2.3206, 48.8582]
            },
            "properties": {
                "name": "Cathédrale Notre-Dame",
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [2.3376, 48.8558]
            },
            "properties": {
                "name": "Musée d'Orsay"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [2.3695, 48.8446]
            },
            "properties": {
                "name": "Panthéon"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [2.3523, 48.8686]
            },
            "properties": {
                "name": "Montmartre"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [2.3266, 48.8716]
            },
            "properties": {
                "name": "Sacré-Cœur"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [2.3583, 48.8546]
            },
            "properties": {
                "name": "Jardin des Tuileries"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [2.2970, 48.8834]
            },
            "properties": {
                "name": "Parc des Buttes-Chaumont"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [2.4024, 48.8644]
            },
            "properties": {
                "name": "Père Lachaise Cemetery"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [2.2814, 48.8661]
            },
            "properties": {
                "name": "Parc de la Villette"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [2.2904, 48.8452]
            },
            "properties": {
                "name": "Quartier Latin"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [2.3674, 48.8462]
            },
            "properties": {
                "name": "Musée Rodin"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [2.3134, 48.8618]
            },
            "properties": {
                "name": "Centre Pompidou"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [2.3049, 48.8469]
            },
            "properties": {
                "name": "Jardin du Luxembourg"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [2.3147, 48.8443]
            },
            "properties": {
                "name": "Église Saint-Sulpice"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [2.3505, 48.8381]
            },
            "properties": {
                "name": "Musée de l'Armée"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [2.3256, 48.8774]
            },
            "properties": {
                "name": "Parc de la Villette"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [2.3232, 48.8455]
            },
            "properties": {
                "name": "Église Saint-Germain-des-Prés"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [2.3468, 48.8658]
            },
            "properties": {
                "name": "Place des Vosges"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [2.3645, 48.8414]
            },
            "properties": {
                "name": "Le Musée de la Chasse et de la Nature"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [2.3514, 48.8608]
            },
            "properties": {
                "name": "Hôtel de Ville"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [2.3503, 48.8640]
            },
            "properties": {
                "name": "Place de la République"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [2.3794, 48.8534]
            },
            "properties": {
                "name": "Bibliothèque Nationale de France"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [2.3125, 48.8357]
            },
            "properties": {
                "name": "Cimetière du Montparnasse"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [2.3285, 48.8391]
            },
            "properties": {
                "name": "Le Musée Carnavalet"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [2.3323, 48.8798]
            },
            "properties": {
                "name": "La Cité des Sciences et de l'Industrie"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [2.3628, 48.8706]
            },
            "properties": {
                "name": "Parc des Buttes-Chaumont"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [2.3393, 48.8470]
            },
            "properties": {
                "name": "Le Quartier du Marais"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [2.3290, 48.8548]
            },
            "properties": {
                "name": "Le Musée de la Chasse et de la Nature"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [2.3332, 48.8776]
            },
            "properties": {
                "name": "La Géode"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [2.3761, 48.8525]
            },
            "properties": {
                "name": "La Cinémathèque Française"
            }
        }
    ]
}

export const features = {
    ...featuresLonLat,
    features: featuresLonLat.features.map(feature => ({
        ...feature,
        geometry: {
            ...feature.geometry,
            coordinates: fromLonLat(feature.geometry.coordinates)
        }
    }))
}