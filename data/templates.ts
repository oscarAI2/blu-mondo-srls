
import { Template } from '../types';
import { BLOCKS } from './blocks';

// Safe block finder helper
const findBlock = (id: string) => BLOCKS.find(b => b.id === id) || BLOCKS[0];

export const TEMPLATES: Template[] = [
  {
    id: 'tpl-automation-os',
    name: 'Neural Automation OS',
    description: '工业级云端协作系统。深度集成 Git 仓库同步、Google Drive 资源管理和神经状态看板。',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    blocks: [
      findBlock('alpine-nav-ultra'),
      findBlock('git-repo-monitor'),
      findBlock('drive-asset-explorer'),
      findBlock('tax-bento-analytics')
    ],
    author: {
      name: 'Optimer Cloud',
      avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=cloud'
    },
    stats: { installs: '12.4k', views: '35k', likes: '1.8k' },
    isFeatured: true
  },
  {
    id: 'tpl-alpine-ultra',
    name: 'Alpine Marketing Stack',
    description: '高性能、响应式的现代营销网站架构。整合了流体导航、工业级 Landing Page 和 AI 生成的视觉组件。',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
    blocks: [
      findBlock('alpine-nav-ultra'),
      findBlock('opt-hero-alpha'),
      findBlock('magic-marquee-ultra')
    ],
    author: {
      name: 'Alpine Team',
      avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=alpine'
    },
    stats: { installs: '18.2k', views: '65k', likes: '2.4k' },
    isFeatured: true
  },
  {
    id: 'tpl-taxonomy-neural',
    name: 'Taxonomy Neural Admin',
    description: '工业级管理后台成品，具有全矩阵监控、神经分析看板和实时数据流控制节点。',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    blocks: [
      findBlock('alpine-nav-ultra'),
      findBlock('tax-bento-analytics'),
      findBlock('registry-form-ultra')
    ],
    author: {
      name: 'Taxonomy Dev',
      avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=taxonomy'
    },
    stats: { installs: '9.4k', views: '42k', likes: '1.1k' },
    isFeatured: true
  }
];
