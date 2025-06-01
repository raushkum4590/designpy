"use client"
import React, { useContext, useEffect, useState } from 'react'
import { useConvex } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import { UserDetailContext } from '../../../../context/UserDetailContext'
import Image from 'next/image'
import { Button } from '../../../../@/components/ui/button'
import { Download, Edit, MoreVertical, Loader2, Search, Filter, FileDown, Zap } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../../@/components/ui/dropdown-menu'
import { Input } from '../../../../@/components/ui/input'

function ProjectsPage() {
    const [allDesigns, setAllDesigns] = useState([]);
    const [filteredDesigns, setFilteredDesigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [exporting, setExporting] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('newest');
    const { userDetail } = useContext(UserDetailContext);
    const convex = useConvex();
    const router = useRouter();

    useEffect(() => {
        if (userDetail && userDetail._id) {
            fetchAllDesigns();
        }
    }, [userDetail]);

    useEffect(() => {
        // Filter and sort designs when search term or sort option changes
        let filtered = allDesigns.filter(design => 
            design.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        // Sort designs
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'newest':
                    return new Date(b._creationTime) - new Date(a._creationTime);
                case 'oldest':
                    return new Date(a._creationTime) - new Date(b._creationTime);
                case 'alphabetical':
                    return a.name.localeCompare(b.name);
                case 'size':
                    return (b.width * b.height) - (a.width * a.height);
                default:
                    return 0;
            }
        });

        setFilteredDesigns(filtered);
    }, [allDesigns, searchTerm, sortBy]);

    const fetchAllDesigns = async () => {
        try {
            setLoading(true);
            const result = await convex.query(api.designs.GetUserDesigns, {
                uid: userDetail._id,
            });
            console.log('All user designs:', result);
            setAllDesigns(result || []);
        } catch (error) {
            console.error("Error fetching all designs:", error);
            toast.error("Failed to fetch designs");
            setAllDesigns([]);
        } finally {
            setLoading(false);
        }
    };

    // Function to export design as image (simple export)
    const exportDesign = async (design) => {
        try {
            if (!design.imagePreview) {
                toast.error('No preview image available for this design');
                return;
            }

            const response = await fetch(design.imagePreview);
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = `${design.name || 'design'}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            
            toast.success('Design exported successfully');
        } catch (error) {
            console.error('Failed to export design:', error);
            toast.error('Failed to export design');
        }
    };

    // Advanced export using Fabric.js canvas recreation
    const exportDesignAdvanced = async (design, isHighQuality = false) => {
        try {
            // If there's a preview image, use it as fallback
            if (!design.jsonTemplate && design.imagePreview) {
                await exportDesign(design);
                return;
            }

            if (!design.jsonTemplate) {
                toast.error('No design data available for advanced export');
                return;
            }

            // Dynamically import Fabric.js
            const { Canvas } = await import('fabric');
            
            // Create a temporary canvas
            const tempCanvasElement = document.createElement('canvas');
            tempCanvasElement.width = design.width || 500;
            tempCanvasElement.height = design.height || 500;
            
            const fabricCanvas = new Canvas(tempCanvasElement);
            
            // Load the design from JSON
            await new Promise((resolve, reject) => {
                fabricCanvas.loadFromJSON(design.jsonTemplate, () => {
                    fabricCanvas.renderAll();
                    resolve();
                }, (error) => {
                    console.error('Error loading JSON:', error);
                    reject(error);
                });
            });

            // Export with quality settings
            const multiplier = isHighQuality ? 2 : 1;
            const dataURL = fabricCanvas.toDataURL({
                format: 'png',
                quality: isHighQuality ? 1 : 0.8,
                multiplier: multiplier
            });

            // Download the image
            const link = document.createElement('a');
            link.href = dataURL;
            link.download = `${design.name || 'design'}${isHighQuality ? '_high_quality' : ''}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Clean up
            fabricCanvas.dispose();
            
            toast.success(`Design exported successfully${isHighQuality ? ' in high quality' : ''}`);
        } catch (error) {
            console.error('Advanced export failed:', error);
            // Fallback to simple export
            await exportDesign(design);
        }
    };

    // Export all designs with progress tracking
    const exportAllDesigns = async (isHighQuality = false) => {
        if (filteredDesigns.length === 0) {
            toast.error('No designs to export');
            return;
        }

        setExporting(true);
        toast(`Starting export of ${filteredDesigns.length} designs...`);
        
        let successCount = 0;
        let failedDesigns = [];
        
        for (let i = 0; i < filteredDesigns.length; i++) {
            const design = filteredDesigns[i];
            try {
                // Show progress
                toast(`Exporting design ${i + 1} of ${filteredDesigns.length}: ${design.name}`, {
                    duration: 1000
                });
                
                await exportDesignAdvanced(design, isHighQuality);
                successCount++;
                
                // Add delay to prevent overwhelming the system
                await new Promise(resolve => setTimeout(resolve, 800));
            } catch (error) {
                console.error(`Failed to export design ${design.name}:`, error);
                failedDesigns.push(design.name);
            }
        }
        
        setExporting(false);
        
        // Show final results
        if (successCount === filteredDesigns.length) {
            toast.success(`Successfully exported all ${successCount} designs!`);
        } else {
            toast.warning(`Exported ${successCount} of ${filteredDesigns.length} designs. ${failedDesigns.length} failed.`);
            if (failedDesigns.length > 0) {
                console.log('Failed designs:', failedDesigns);
            }
        }
    };

    // Export ALL designs from database (not just filtered)
    const exportAllUserDesigns = async (isHighQuality = false) => {
        if (allDesigns.length === 0) {
            toast.error('No designs found in your account');
            return;
        }

        setExporting(true);
        toast(`Starting export of ALL ${allDesigns.length} designs from your account...`);
        
        let successCount = 0;
        let failedDesigns = [];
        
        for (let i = 0; i < allDesigns.length; i++) {
            const design = allDesigns[i];
            try {
                // Show progress
                toast(`Exporting design ${i + 1} of ${allDesigns.length}: ${design.name}`, {
                    duration: 1000
                });
                
                await exportDesignAdvanced(design, isHighQuality);
                successCount++;
                
                // Add delay to prevent overwhelming the system
                await new Promise(resolve => setTimeout(resolve, 800));
            } catch (error) {
                console.error(`Failed to export design ${design.name}:`, error);
                failedDesigns.push(design.name);
            }
        }
        
        setExporting(false);
        
        // Show final results
        if (successCount === allDesigns.length) {
            toast.success(`Successfully exported all ${successCount} designs!`);
        } else {
            toast.warning(`Exported ${successCount} of ${allDesigns.length} designs. ${failedDesigns.length} failed.`);
            if (failedDesigns.length > 0) {
                console.log('Failed designs:', failedDesigns);
            }
        }
    };

    return (
        <div className="w-full h-full flex flex-col p-6">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">All Projects</h1>
                    <p className="text-gray-600 mt-1">
                        {loading ? 'Loading...' : `${filteredDesigns.length} design${filteredDesigns.length !== 1 ? 's' : ''} found`}
                    </p>
                </div>
                
                {/* Export All Button */}
                <div className="flex gap-2">
                    <Button
                        onClick={() => exportAllDesigns(false)}
                        disabled={exporting || filteredDesigns.length === 0}
                        className="flex items-center gap-2"
                        variant="outline"
                    >
                        {exporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileDown className="w-4 h-4" />}
                        Export Filtered ({filteredDesigns.length})
                    </Button>
                    
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button 
                                disabled={exporting || allDesigns.length === 0}
                                className="flex items-center gap-2"
                            >
                                {exporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                                Export All ({allDesigns.length})
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => exportAllUserDesigns(false)}>
                                <FileDown className="w-4 h-4 mr-2" />
                                Standard Quality
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => exportAllUserDesigns(true)}>
                                <Zap className="w-4 h-4 mr-2" />
                                High Quality
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Search and Filter Section */}
            <div className="flex gap-4 mb-6">
                <div className="flex-1 relative">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <Input
                        placeholder="Search designs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>
                
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="flex items-center gap-2">
                            <Filter className="w-4 h-4" />
                            Sort: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setSortBy('newest')}>
                            Newest First
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSortBy('oldest')}>
                            Oldest First
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSortBy('alphabetical')}>
                            Alphabetical
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSortBy('size')}>
                            By Size
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Loading State */}
            {loading && (
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                    <span className="ml-2 text-gray-600">Loading your designs...</span>
                </div>
            )}

            {/* Empty State */}
            {!loading && filteredDesigns.length === 0 && (
                <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                    <FileDown className="w-16 h-16 mb-4 text-gray-300" />
                    <h3 className="text-xl font-semibold mb-2">
                        {searchTerm ? 'No designs match your search' : 'No designs found'}
                    </h3>
                    <p className="text-center max-w-md">
                        {searchTerm 
                            ? 'Try adjusting your search term or filters'
                            : 'Create your first design to see it here'
                        }
                    </p>
                </div>
            )}

            {/* Designs Grid */}
            {!loading && filteredDesigns.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredDesigns.map((design, index) => (
                        <div
                            key={design._id}
                            className="group bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 hover:border-blue-300"
                        >
                            {/* Design Preview */}
                            <div className="relative aspect-video bg-gray-100 overflow-hidden">
                                {design.imagePreview ? (
                                    <Image
                                        src={design.imagePreview}
                                        alt={design.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-200"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
                                        <FileDown className="w-12 h-12 text-gray-300" />
                                    </div>
                                )}
                                
                                {/* Hover Overlay with Actions */}
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                    <div className="flex gap-2">
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            onClick={() => router.push(`/workspace/${design._id}`)}
                                            className="flex items-center gap-1"
                                        >
                                            <Edit className="w-4 h-4" />
                                            Edit
                                        </Button>
                                        <Button
                                            size="sm"
                                            onClick={() => exportDesignAdvanced(design)}
                                            className="flex items-center gap-1"
                                        >
                                            <Download className="w-4 h-4" />
                                            Export
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Design Info */}
                            <div className="p-4">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-gray-900 truncate">
                                            {design.name || `Design ${index + 1}`}
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {design.width} × {design.height}px
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            {new Date(design._creationTime).toLocaleDateString()}
                                        </p>
                                    </div>
                                    
                                    {/* Action Menu */}
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="sm" className="p-1">
                                                <MoreVertical className="w-4 h-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => router.push(`/workspace/${design._id}`)}>
                                                <Edit className="w-4 h-4 mr-2" />
                                                Edit Design
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => exportDesign(design)}>
                                                <Download className="w-4 h-4 mr-2" />
                                                Quick Export
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => exportDesignAdvanced(design, false)}>
                                                <FileDown className="w-4 h-4 mr-2" />
                                                Export Standard
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => exportDesignAdvanced(design, true)}>
                                                <Zap className="w-4 h-4 mr-2" />
                                                Export High Quality
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProjectsPage;
