"use client";import {lazy,Suspense} from 'react';const T_product_launch=lazy(()=>import('../../../templates/product-launch/app/view').then(m=>({default:m.TemplateView})));
const T_saas=lazy(()=>import('../../../templates/saas/app/view').then(m=>({default:m.TemplateView})));
const T_analytics=lazy(()=>import('../../../templates/analytics/app/view').then(m=>({default:m.TemplateView})));
const T_projects=lazy(()=>import('../../../templates/projects/app/view').then(m=>({default:m.TemplateView})));
const T_ai_chat=lazy(()=>import('../../../templates/ai-chat/app/view').then(m=>({default:m.TemplateView})));
const T_agency=lazy(()=>import('../../../templates/agency/app/view').then(m=>({default:m.TemplateView})));
const T_portfolio=lazy(()=>import('../../../templates/portfolio/app/view').then(m=>({default:m.TemplateView})));
const T_editorial=lazy(()=>import('../../../templates/editorial/app/view').then(m=>({default:m.TemplateView})));
const T_storefront=lazy(()=>import('../../../templates/storefront/app/view').then(m=>({default:m.TemplateView})));export function TemplatePreview({slug,route,basePath}:{slug:string;route:string;basePath:string}){function render(){switch(slug){case 'product-launch':return <div className="template-root template-product-launch"><T_product_launch route={route} basePath={basePath} assetBase="/assets"/></div>;
case 'saas':return <div className="template-root template-saas"><T_saas route={route} basePath={basePath} assetBase="/assets"/></div>;
case 'analytics':return <div className="template-root template-analytics"><T_analytics route={route} basePath={basePath} assetBase="/assets"/></div>;
case 'projects':return <div className="template-root template-projects"><T_projects route={route} basePath={basePath} assetBase="/assets"/></div>;
case 'ai-chat':return <div className="template-root template-ai-chat"><T_ai_chat route={route} basePath={basePath} assetBase="/assets"/></div>;
case 'agency':return <div className="template-root template-agency"><T_agency route={route} basePath={basePath} assetBase="/assets"/></div>;
case 'portfolio':return <div className="template-root template-portfolio"><T_portfolio route={route} basePath={basePath} assetBase="/assets"/></div>;
case 'editorial':return <div className="template-root template-editorial"><T_editorial route={route} basePath={basePath} assetBase="/assets"/></div>;
case 'storefront':return <div className="template-root template-storefront"><T_storefront route={route} basePath={basePath} assetBase="/assets"/></div>;default:return null}}return <Suspense fallback={<p className="p-8">Loading template…</p>}>{render()}</Suspense>}