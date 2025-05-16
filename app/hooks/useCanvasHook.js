import { useContext } from 'react';
import { CanvasContext } from '../../context/CanvasContext';

export const useCanvasHook = () => {
    const context = useContext(CanvasContext);
    if(!context){
        throw new Error('useCanvasHook must be used within a CanvasProvider')
    }
    return context;
}
