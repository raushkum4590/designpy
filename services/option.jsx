import { ArrowDown, ArrowUp, Blend, BookType, Component, Folder, Home, Image, LayoutDashboard, LayoutDashboardIcon, LayoutTemplate, Minus, Palette, Settings, ShapesIcon, Sparkle, Square, SquareRoundCorner, Trash, Type, Wallet, WalletCardsIcon } from "lucide-react";

import ImageUploadSetting from './../services/components/ImageUploadSetting'
import BackgroundSetting from './../services/components/BackgroundSetting'
import Elements from './../services/components/Elements'

import FillColor from './../services/Shareable/FillColor'
import BorderColor from './../services/Shareable/BorderColor'
import Borderwidth from './../services/Shareable/Borderwidth'
import Opacity from './../services/Shareable/Opacity'
import BorderRadius from './../services/Shareable/BorderRadius'
import AiTransformSetting from './../services/components/AiTransformSetting'  
import TextSetting from './../services/components/TextSetting'
import FontFamiy from './../services/Shareable/FontFamiy'
import TemplateList from './../services/components/TemplateList'

const Workspace = [{
    name:'Home',
    icon:Home,
    path:'/workspace/home',
},
{
    name:'Projects',
    icon:Folder,
    path:'/workspace/projects',
},
{
    name:'Templates',
    icon:LayoutDashboard,
    path:'/workspace/templates',
},
{
    name:'Billing',
    icon:Wallet,
    path:'/workspace/billing',
},
];

export const canvasSizeOtptions=[{
    name:'instagram',
    width:500,
    height:500,
    icon:'/insta.png',
    
},
{
    name:'facebook',
    width:473,
    height:700,
    icon:'/face.jpg',
},
{
    name:'linkedin',
    width:700,
    height:394,
    icon:'/link.jpg',
},
{
    name:'youtube',
    width:700,
    height:394,
    icon:'/you.jpg',
},
{
    name:'banner',
    width:500,
    height:300,
    icon:'/ban.jpg',
}
]

export const  sideBarMenu = [
    {
        name:'Templates',
        icon:LayoutDashboard,
        component:<TemplateList/>,

    },
    {
        name:'Elements',
        icon:ShapesIcon,
        component:<Elements/>,
    },
    {
        name:'Images',
        icon:Image,
        component:<ImageUploadSetting/>,
    },
    {
        name:'Text',
        icon:Type,
        component:<TextSetting/>,
    },
    {
        name:'Backgrounds',
        icon:Component,
        component: <BackgroundSetting/>, 
    },
    {
        name:'AI',
        icon:Sparkle,
        component:<AiTransformSetting/>,
    },
    {
        name:'Setting',
        icon:Settings,
    }

]
export const ShapeList = [
    {
        name: 'Circle',
        icon: '/moon.png'
    },
    {
        name: 'Square',
        icon: '/square.png'
    },
    {
        name: 'Trangle',
        icon: '/trangle.png'
    },
    {
        name: 'Line',
        icon: '/line.png'
    }
]
export const shapesSettingsList = [
    {
        name: 'Fill',
        icon: Palette,
        component:<FillColor/>,
        
    },
    {
        name: 'Stroke Color',
        icon: Square,
        component:<BorderColor/>,
        
    },
    {
        name: 'Stroke Width',
        icon: Minus,
        component:<Borderwidth/>,
       
    },
    {
        name: 'Opacity',
        icon: Blend,
        component:<Opacity/>,
        
    },
    {
        name: 'Rounded Corner',
        icon: SquareRoundCorner,
        component:< BorderRadius/>,
       
    },
   
    // {
    //     name: 'Delete',
    //     icon: Trash
    // }
]

export const AITransformationSettings = [
    {
        name: 'Background Remove',
        command: 'e-bgremove',
        image: '/remove-bg.jpg'
    },
    {
        name: 'Change Background',
        command: 'e-changebg-prompt-snow',
        image: '/change-bg.jpg',
        input: true
    },
    {
        name: 'Generative fill',
        command: 'bg-genfill,w-1000,h-960,cm-pad_resize',
        image: '/generative-fill.png'
    },
    {
        name: 'AI drop shadow',
        command: 'e-dropshadow',
        image: '/shadow.jpeg'
    },
    {
        name: 'Upscale',
        command: 'e-upscale',
        image: '/upscale.png'
    },
    {
        name: 'Smart crop',
        command: 'fo-auto',
        image: '/smartcrop.png'
    },
    {
        name: 'Contrast',
        command: 'e-contrast',
        image: '/e-contrast.png'
    },
    {
        name: 'Grayscale',
        command: 'e-grayscale',
        image: '/grayscale.png'
    },
    {
        name: 'Blur',
        command: 'bl-10',
        image: '/e-blur.png'
    },
    {
        name: 'Flip',
        command: 'e-flip',
        image: '/e-flip.png'
    }
]

export const TextSettingsList = [
    {
        name: 'Fill',
        icon: Palette,
        component: <FillColor />
    },
    {
        name: 'Stroke Color',
        icon: Square,
        component: <BorderColor />
    },
    {
        name: 'Stroke Width',
        icon: Minus,
        component:<Borderwidth/>,
        
    },
    {
        name: 'Opacity',
        icon: Blend,
        component: <Opacity />
    },
    {
        name: 'Font',
        icon: BookType,
        component: <FontFamiy />
    },
    {
        name: 'Bring Front',
        icon: ArrowUp,
    },
    {
        name: 'Move Back',
        icon: ArrowDown,
    },
]

export const FontFamilyList = [
    "Arial",
    "Arial Black",
    "Verdana",
    "Helvetica",
    "Tahoma",
    "Trebuchet MS",
    "Times New Roman",
    "Georgia",
    "Garamond",
    "Courier New",
    "Brush Script MT",
    "Palatino",
    "Bookman",
    "Comic Sans MS",
    "Impact",
    "Lucida Sans Unicode",
    "Geneva",
    "Lucida Console",
]

export default Workspace;