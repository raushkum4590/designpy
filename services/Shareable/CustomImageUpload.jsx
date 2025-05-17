import { ImageUp, Loader } from 'lucide-react'
import Image from 'next/image';
import React, { useEffect, useState, useCallback } from 'react'
import { Button } from '../../@/components/ui/button';
import { FabricImage } from 'fabric';
import { useParams } from 'next/navigation';
import { useCanvasHook } from '../../hooks';
import ImageKit from 'imagekit';
import { AITransformationSettings } from '../option';

// Initialize ImageKit outside the component
function CustomImageUpload({ selectedAi }) {
    const [image, setImage] = useState();
    const { designId } = useParams();
    const [loading, setLoading] = useState(false);
    const { CanvasEditorStore } = useCanvasHook() || {};
    const [uploadedImage, setUploadedImage] = useState(null);
    const [transformedImage, setTransformedImage] = useState(null);
    const [isTransforming, setIsTransforming] = useState(false);
    const [originalFile, setOriginalFile] = useState(null);
    
    // Debug the editor store on component mount - simplified
    useEffect(() => {
        if (CanvasEditorStore) {
            console.log("CanvasEditorStore methods:", 
                Object.keys(CanvasEditorStore).filter(key => typeof CanvasEditorStore[key] === 'function'));
        }
    }, [CanvasEditorStore]);
    
    const imagekit = new ImageKit({
        publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
        privateKey: process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY,
        urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT
    });
    
    const applyTransformation = async (imageUrl, aiType) => {
        try {
            if (!imageUrl || !imageUrl.includes(process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT)) {
                console.error("Invalid image URL for transformation");
                return imageUrl;
            }
            
            const selectedTransformation = AITransformationSettings.find(
                transform => transform.name === aiType
            );
            
            if (!selectedTransformation) {
                console.error(`Transformation ${aiType} not found in settings`);
                return imageUrl;
            }
            
            const baseUrl = imageUrl.includes('/tr:') 
                ? imageUrl.substring(0, imageUrl.indexOf('/tr:')) + imageUrl.substring(imageUrl.indexOf('/', imageUrl.indexOf('/tr:') + 4))
                : imageUrl;
                
            const filePath = baseUrl.replace(process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT, '');
            
            const transformedUrl = `${process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}/tr:${selectedTransformation.command}${filePath}`;
            
            console.log(`Applied ${aiType} transformation:`, transformedUrl);
            return transformedUrl;
        } catch (error) {
            console.error(`Error applying ${aiType}:`, error);
            return imageUrl;
        }
    };

    const handleImageUpload = useCallback((file) => {
        if (!file) return;
        setOriginalFile(file);

        const reader = new FileReader();
        reader.onload = (e) => {
            setUploadedImage(e.target.result);
        };
        reader.readAsDataURL(file);
    }, []);

    useEffect(() => {
        const performTransformation = async () => {
            if (selectedAi && image) {
                try {
                    setIsTransforming(true);
                    console.log(`Applying transformation: ${selectedAi.name}`);
                    
                    const processedImageUrl = await applyTransformation(image, selectedAi.name);
                    setTransformedImage(processedImageUrl);
                } catch (error) {
                    console.error('Transformation failed:', error);
                } finally {
                    setIsTransforming(false);
                }
            }
        };

        performTransformation();
    }, [selectedAi, image]);

    useEffect(() => {
        if (image && selectedAi) {
            setTransformedImage(null);
            setIsTransforming(true);
        }
    }, [selectedAi?.name]);

    const onImageUpload = async (event) => {
        try {
            setLoading(true);
            const file = event.target.files[0];
            const imageRef = await imagekit.upload({
                file: file,
                fileName: designId + ".png",
                isPublished: true,
            });
            console.log("Image uploaded successfully:", imageRef);
            console.log("Image URL:", imageRef.url);
            setImage(imageRef?.url);
            handleImageUpload(file);
            setTransformedImage(null);
        } catch (error) {
            console.error("Error uploading image:", error);
        } finally {
            setLoading(false);
        }
    };

    const onAddToCanvas = async () => {
        try {
            const imageToAdd = transformedImage || image;
            
            if (!imageToAdd) {
                console.error("No image available to add to canvas");
                return;
            }
            
            const addImageEvent = new CustomEvent('designipy:addImage', { 
                detail: { imageUrl: imageToAdd }
            });
            window.dispatchEvent(addImageEvent);
            console.log("Dispatched custom event to add image");
            
            if (window.fabricCanvas || window.canvas || window.editorCanvas) {
                const fabricCanvas = window.fabricCanvas || window.canvas || window.editorCanvas;
                console.log("Found global canvas reference");
                
                const imgElement = new Image();
                imgElement.crossOrigin = "anonymous";
                imgElement.src = imageToAdd;
                
                imgElement.onload = function() {
                    try {
                        const fabricImg = new FabricImage(imgElement);
                        fabricImg.scaleToWidth(fabricCanvas.width / 3);
                        
                        fabricImg.set({
                            left: fabricCanvas.width / 2, 
                            top: fabricCanvas.height / 2,
                            originX: 'center',
                            originY: 'center'
                        });
                        
                        fabricCanvas.add(fabricImg);
                        fabricCanvas.renderAll();
                        fabricCanvas.setActiveObject(fabricImg);
                        console.log("Added image via global canvas reference");
                    } catch (err) {
                        console.error("Error adding image via global reference:", err);
                    }
                };
            } else if (CanvasEditorStore) {
                if (typeof CanvasEditorStore.addImage === 'function') {
                    CanvasEditorStore.addImage(imageToAdd);
                    console.log("Added image via CanvasEditorStore.addImage");
                } 
                else if (typeof CanvasEditorStore.addImageURL === 'function') {
                    CanvasEditorStore.addImageURL(imageToAdd);
                    console.log("Added image via CanvasEditorStore.addImageURL");
                }
                else if (typeof CanvasEditorStore.addElement === 'function') {
                    CanvasEditorStore.addElement('image', { src: imageToAdd });
                    console.log("Added image via CanvasEditorStore.addElement");
                }
                else {
                    console.warn("Cannot find suitable method to add image in CanvasEditorStore");
                }
            } else {
                console.error("No canvas reference found in any expected location");
            }
        } catch (error) {
            console.error("Error in onAddToCanvas:", error);
        }
    };

    // Function to download the image
    const downloadImage = async () => {
        try {
            const imageToDownload = transformedImage || image;
            
            if (!imageToDownload) {
                console.error("No image available to download");
                return;
            }
            
            console.log("Downloading image:", imageToDownload);
            
            // Set loading state while downloading
            setLoading(true);
            
            // Fetch the image as a blob to handle cross-origin issues
            const response = await fetch(imageToDownload);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const imageBlob = await response.blob();
            const blobUrl = URL.createObjectURL(imageBlob);
            
            // Create anchor element
            const link = document.createElement('a');
            link.href = blobUrl;
            
            // Set the file name for download
            const fileName = selectedAi 
                ? `${designId}-${selectedAi.name.toLowerCase().replace(/\s+/g, '-')}.png`
                : `${designId}-image.png`;
            
            link.download = fileName;
            
            // Append to document, click, and remove
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Clean up the blob URL
            URL.revokeObjectURL(blobUrl);
            
        } catch (error) {
            console.error("Error downloading image:", error);
            alert("Failed to download image. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const displayImage = transformedImage || image || "";
    
    const handleImageError = (e) => {
        console.error("Error loading image:", e);
        if (transformedImage && image) {
            setTransformedImage(null);
        }
    };

    return (
        <div>
            {!image ? (
                <label htmlFor='upload image' className='bg-gray-300 p-4 flex flex-col items-center
                justify-center rounded-xl'>
                    <ImageUp />
                    <h2 className='text-center text-sm font-semibold'>Upload Custom Image</h2>
                    <input type='file' id='upload image' className='hidden'
                        onChange={onImageUpload} />
                </label>
            ) : (
                <div className="relative">
                    <label htmlFor='upload image'>
                        <Image 
                            src={displayImage} 
                            alt='Image'
                            width={300}
                            height={300}
                            className='w-full h-[150px] rounded-lg object-contain' 
                            onError={handleImageError}
                            unoptimized={true}
                        />
                    </label>
                    {isTransforming && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-lg">
                            <div className="text-white text-center">
                                <Loader className="animate-spin mx-auto mb-2" />
                                <p>Applying {selectedAi?.name}...</p>
                            </div>
                        </div>
                    )}
                </div>
            )}
            
            {image && (
                <div className="flex gap-2">
                    <Button className='flex-1 my-2' size='sm'
                        onClick={onAddToCanvas}
                        disabled={loading || isTransforming}>
                        {(loading || isTransforming) ? <Loader className='animate-spin mr-2' /> : null}
                        Add To Canvas
                    </Button>
                    
                    <Button className='flex-1 my-2' size='sm'
                        onClick={downloadImage}
                        variant="outline"
                        disabled={loading || isTransforming}>
                        {(loading || isTransforming) ? <Loader className='animate-spin mr-2' /> : null}
                        Download
                    </Button>
                </div>
            )}
            
            {selectedAi && image && (
                <div className="mt-2 text-xs text-gray-600">
                    Selected transformation: <span className="font-bold">{selectedAi.name}</span>
                </div>
            )}
        </div>
    );
}

export default CustomImageUpload;