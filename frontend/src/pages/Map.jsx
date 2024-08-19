import { BASE_URL, MAP_BOX_PUBLIC_TOKEN, MAP_BOX_SECRET } from '../config';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { useEffect, useRef, useState } from 'react';
import useFetchData from '../hooks/useFetchData';

mapboxgl.accessToken = MAP_BOX_PUBLIC_TOKEN
export default function Map() {

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(81.8463);
    const [lat, setLat] = useState(25.4358);
    const [zoom, setZoom] = useState(9);
    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom,

        });

    });
    const addMarkers = (lat, long) => {
        new mapboxgl.Marker({
            color: "red",
            scale: 0.8
        }).setLngLat([lat, long]).addTo(map.current)

    }
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const {
        data: doctors,
        loading,
        error,
    } = useFetchData(`${BASE_URL}/doctors?query=${debouncedQuery}`);

    const handleSearch = () => {
        setQuery(query.trim());
    };
    useEffect(()=>{
        let interval;
        interval=setInterval(()=>{
           console.log(doctors)
            doctors.map((item)=>{
                addMarkers(item?.lat,item?.long)
            })
        },1000)
    },[])

    useEffect(() => {
        // Debounce the query value after 500ms of inactivity
        const timeoutId = setTimeout(() => {
            setDebouncedQuery(query);
        }, 700);

        // Clean up the timeout
        return () => clearTimeout(timeoutId);
    }, [query]);
    return (
        <div style={{
            height: "100vh"
        }}>
            <div style={{
                height: "100vh"
            }} ref={mapContainer} className="map-container" >

            </div>
        </div>
    );
}