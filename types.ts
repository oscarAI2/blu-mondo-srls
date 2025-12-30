
// Fix: Added 'Gateway' to the Category union to resolve assignability errors in BLOCKS and App logic
export type Category = 
  | 'All' 
  | 'Blog' | 'Card' | 'CTA' | 'Dashboard' | 'Footer' | 'Gallery' | 'Hero' 
  | 'Navbar' | 'Pricing' | 'Product' | 'Stat' | 'Table' | 'Mobile' | 'Templates' | 'Geo' | 'API' | 'Storage' | 'Link' | 'Docs' | 'Form' | 'Nav' | 'Feedback' | 'Interview' | 'Visuals' | 'Build' | 'Skeleton' | 'StyleGuide' | 'ImageLab' | 'Present' | 'Quality' | 'Interaction' | 'Config' | 'TypeScript' | 'Styling' | 'Orchestra' | 'CrossPlatform' | 'DashboardPro' | 'MicroUtils' | 'Overlay' | 'Scaffold' | 'Inspector' | 'Random' | 'RemoteTesting' | 'Gesture' | 'CloudOps' | 'MessageBox' | 'Toast' | 'SmartGesture' | 'DataVis' | 'Revisioning' | 'SlushBuild' | 'ImageCropper' | 'DatePicker' | 'ReactiveUI' | 'Community' | 'Function' | 'Gateway';

export interface Block {
  id: string;
  name: string;
  category: Exclude<Category, 'All' | 'Templates'>;
  description: string;
  code: string;
  isFree: boolean;
  tags: string[];
  status?: 'on_review' | 'posted' | 'featured';
  author?: {
    name: string;
    avatar: string;
  };
}

export interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  blocks: Block[];
  author?: {
    name: string;
    avatar: string;
  };
  stats?: {
    installs: string;
    views: string;
    likes: string;
  };
  isFeatured?: boolean;
}

export interface PageAssembly {
  id: string;
  name: string;
  blocks: Block[];
}
