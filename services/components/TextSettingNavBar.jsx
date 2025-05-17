import React, { useEffect, useState } from 'react'
import { TextSettingsList } from '../option';
import { ShapesIcon, Trash, Plus, Minus, Type } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./../../@/components/ui/popover";
import { useCanvasHook } from '../../hooks';

function TextSettingNavBar() {
    const { CanvasEditorStore } = useCanvasHook();
    const [fontSize, setFontSize] = useState(20); // Default font size
    
    // Update font size in the state when text object is selected
    useEffect(() => {
        const updateSelectedTextProperty = () => {
            if (!CanvasEditorStore) return;
            
            const activeObject = CanvasEditorStore.getActiveObject();
            if (activeObject && activeObject.type === 'i-text') {
                setFontSize(activeObject.fontSize || 20);
            }
        };
        
        if (CanvasEditorStore) {
            CanvasEditorStore.on('selection:created', updateSelectedTextProperty);
            CanvasEditorStore.on('selection:updated', updateSelectedTextProperty);
        }
        
        return () => {
            if (CanvasEditorStore) {
                CanvasEditorStore.off('selection:created', updateSelectedTextProperty);
                CanvasEditorStore.off('selection:updated', updateSelectedTextProperty);
            }
        };
    }, [CanvasEditorStore]);
    
    const onDelete = () => {
        const activeObject = CanvasEditorStore.getActiveObject();
        if (activeObject) {
            CanvasEditorStore.remove(activeObject);
            CanvasEditorStore.renderAll();
        }
    }

    // Handle special text operations
    const handleTextOperation = (operation) => {
        const activeObject = CanvasEditorStore.getActiveObject();
        if (!activeObject) return;
        
        switch(operation) {
            case 'Bring Front':
                activeObject.bringToFront();
                break;
            case 'Move Back':
                activeObject.sendToBack();
                break;
            default:
                // For components with popover, do nothing here
                break;
        }
        CanvasEditorStore.renderAll();
    }
    
    // Handle font size changes
    const changeFontSize = (increment) => {
        const activeObject = CanvasEditorStore.getActiveObject();
        if (!activeObject || activeObject.type !== 'i-text') return;
        
        // Calculate new font size (min 8, max 72)
        const newSize = Math.min(Math.max(activeObject.fontSize + increment, 8), 72);
        
        // Update font size
        activeObject.set({ fontSize: newSize });
        
        // Recalculate text wrapping based on new font size
        const baseMaxWidth = 300;
        const text = activeObject.text;
        
        // Adjust width based on font size
        const fontSizeMultiplier = Math.max(1, newSize / 20);
        const updatedMaxWidth = Math.min(baseMaxWidth * fontSizeMultiplier, 500);
        
        // If text is short, make width proportional to text length
        const estimatedTextWidth = text.length * newSize * 0.6;
        const appropriateWidth = Math.min(updatedMaxWidth, Math.max(100, estimatedTextWidth));
        
        activeObject.set({
            width: text.length > 15 ? updatedMaxWidth : appropriateWidth
        });
        
        // Update state and canvas
        setFontSize(newSize);
        CanvasEditorStore.renderAll();
    };

    // Font size control component
    const FontSizeControl = () => (
        <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium">Font Size</h3>
            <div className="flex items-center gap-2">
                <button 
                    className="border rounded-md p-1 hover:bg-gray-100"
                    onClick={() => changeFontSize(-2)}
                >
                    <Minus size={16} />
                </button>
                <span className="font-medium px-2 min-w-[30px] text-center">{fontSize}</span>
                <button 
                    className="border rounded-md p-1 hover:bg-gray-100"
                    onClick={() => changeFontSize(2)}
                >
                    <Plus size={16} />
                </button>
            </div>
        </div>
    );

    return (
        <div className="flex flex-wrap items-center gap-4 p-3 bg-white/50 backdrop-blur-sm rounded-lg shadow-sm">
            {TextSettingsList.map((item, index) => (
                <div
                    key={index}
                    className="flex items-center justify-center hover:scale-110 hover:shadow-md transition-all duration-200 cursor-pointer p-2.5 border border-gray-200 rounded-xl bg-white"
                    onClick={() => !item.component && handleTextOperation(item.name)}
                >
                    {item.component ? (
                        <Popover>
                            <PopoverTrigger asChild>
                                <div className="text-gray-700 hover:text-blue-600 cursor-pointer">
                                    <item.icon strokeWidth={1.5} size={20} />
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className="w-64 p-3 shadow-lg z-50">
                                {item.component}
                            </PopoverContent>
                        </Popover>
                    ) : (
                        <div className="text-gray-700 hover:text-blue-600">
                            <item.icon strokeWidth={1.5} size={20} />
                        </div>
                    )}
                </div>
            ))}
            
            {/* Add Font Size Control */}
            <div className="flex items-center justify-center hover:shadow-md transition-all duration-200 cursor-pointer p-2.5 border border-gray-200 rounded-xl bg-white">
                <Popover>
                    <PopoverTrigger asChild>
                        <div className="text-gray-700 hover:text-blue-600 cursor-pointer">
                            <Type strokeWidth={1.5} size={20} />
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-64 p-3 shadow-lg z-50">
                        <FontSizeControl />
                    </PopoverContent>
                </Popover>
            </div>
            
            <div className="flex items-center justify-center hover:scale-110 hover:shadow-md transition-all duration-200 cursor-pointer p-2.5 border border-red-200 rounded-xl bg-white ml-auto">
                <Trash onClick={onDelete} strokeWidth={1.5} size={20} className="text-red-500 hover:text-red-600" />
            </div>
        </div>
    );
}

export default TextSettingNavBar