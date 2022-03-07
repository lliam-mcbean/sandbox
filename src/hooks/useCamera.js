import { useRef } from "react";

export default function useSearch() {
    const cameraPosition = useRef([0, 50, 15])

    return {
        cameraPosition,
    }
}