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
    const [lineHeight, setLineHeight] = useState(1.2); // Add line height state
    
    // Update font size in the state when text object is selected
    useEffect(() => {
        const updateSelectedTextProperty = () => {
            if (!CanvasEditorStore) return;
            
            const activeObject = CanvasEditorStore.getActiveObject();
            if (activeObject && activeObject.type === 'i-text') {
                setFontSize(activeObject.fontSize || 20);
                setLineHeight(activeObject.lineHeight || 1.2);
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
        
        // Force text to wrap
        forceTextWrap(activeObject, newSize);
        
        // Update state and canvas
        setFontSize(newSize);
        CanvasEditorStore.renderAll();
    };

    // Helper function to force text wrapping - improved version
    const forceTextWrap = (textObj, fontSize) => {
        // Use a very restrictive width
        const maxWidth = Math.min(150, fontSize * 5);
        
        // Apply even more strict wrapping settings
        textObj.set({
            width: maxWidth,
            textAlign: textObj.textAlign || 'left',
            breakWords: true,
            lockUniScaling: false,
            // Explicitly disable any property that might prevent wrapping
            scaleX: 1,
            scaleY: 1,
        });
        
        // Force canvas to update coordinates and rendering
        textObj.setCoords();
        
        // Additional hack: sometimes slightly changing the text forces a re-wrap
        const originalText = textObj.text;
        textObj.set({ text: originalText + ' ' });
        CanvasEditorStore.renderAll();
        textObj.set({ text: originalText });
        CanvasEditorStore.renderAll();
    };
    
    // New function to change line height
    const changeLineHeight = (increment) => {
        const activeObject = CanvasEditorStore.getActiveObject();
        if (!activeObject || activeObject.type !== 'i-text') return;
        
        // Calculate new line height (min 0.8, max 2.5)
        const newLineHeight = Math.min(Math.max(activeObject.lineHeight + increment, 0.8), 2.5);
        
        // Update line height
        activeObject.set({ lineHeight: newLineHeight });
        
        // Update state and canvas
        setLineHeight(newLineHeight);
        CanvasEditorStore.renderAll();
    };

    // Font size control component
    const FontSizeControl = () => (
        <div className="flex flex-col gap-4">
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
            
            {/* Add line height control */}
            <div className="flex flex-col gap-2">
                <h3 className="text-sm font-medium">Line Spacing</h3>
                <div className="flex items-center gap-2">
                    <button 
                        className="border rounded-md p-1 hover:bg-gray-100"
                        onClick={() => changeLineHeight(-0.1)}
                    >
                        <Minus size={16} />
                    </button>
                    <span className="font-medium px-2 min-w-[30px] text-center">
                        {lineHeight.toFixed(1)}
                    </span>
                    <button 
                        className="border rounded-md p-1 hover:bg-gray-100"
                        onClick={() => changeLineHeight(0.1)}
                    >
                        <Plus size={16} />
                    </button>
                </div>
            </div>
            
            {/* Improved text wrap button with stronger wrapping */}
            <button 
                className="mt-2 w-full bg-blue-50 hover:bg-blue-100 text-blue-600 py-1 px-3 rounded text-sm"
                onClick={() => {
                    const activeObject = CanvasEditorStore.getActiveObject();
                    if (activeObject && (activeObject.type === 'i-text' || activeObject.type === 'textbox')) {
                        // Apply maximum wrapping force
                        const fontSize = activeObject.fontSize || 20;
                        const maxWidth = Math.min(150, fontSize * 5);
                        
                        // Try converting to Textbox if it's IText
                        if (activeObject.type === 'i-text') {
                            const props = activeObject.toObject();
                            props.width = maxWidth;
                            const textbox = new fabric.Textbox(activeObject.text, props);
                            
                            CanvasEditorStore.remove(activeObject);
                            CanvasEditorStore.add(textbox);
                            CanvasEditorStore.setActiveObject(textbox);
                            CanvasEditorStore.renderAll();
                        } else {
                            // For existing Textbox
                            activeObject.set({
                                width: maxWidth,
                                breakWords: true,
                                textAlign: 'left',
                            });
                            
                            // Force re-render with the hack
                            const originalText = activeObject.text;
                            activeObject.set({ text: originalText + ' ' });
                            CanvasEditorStore.renderAll();
                            activeObject.set({ text: originalText });
                            CanvasEditorStore.renderAll();
                        }
                    }
                }}
            >
                Force Text Wrap
            </button>
            
            {/* Add a button to explicitly break text into separate lines */}
            <button 
                className="mt-2 w-full bg-green-50 hover:bg-green-100 text-green-600 py-1 px-3 rounded text-sm"
                onClick={() => {
                    const activeObject = CanvasEditorStore.getActiveObject();
                    if (activeObject && (activeObject.type === 'i-text' || activeObject.type === 'textbox')) {
                        const text = activeObject.text;
                        
                        // Insert line breaks every 15-20 characters at word boundaries
                        const words = text.split(' ');
                        let newText = '';
                        let lineLength = 0;
                        
                        words.forEach(word => {
                            if (lineLength + word.length > 15) {
                                newText += '\n' + word + ' ';
                                lineLength = word.length + 1;
                            } else {
                                newText += word + ' ';
                                lineLength += word.length + 1;
                            }
                        });
                        
                        activeObject.set({ text: newText.trim() });
                        CanvasEditorStore.renderAll();
                    }
                }}
            >
                Manual Line Breaks
            </button>
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